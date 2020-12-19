import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { ISpotify } from '../../interfaces';
import { connect } from '../../actions/connect-actions';

import { saveFirestoreUserData } from '../../helpers/firebase';

import spotifyConfig from '../../services/spotify-config';
import { LSDocument } from 'lavastore';

import axios from 'axios';
import spotify from '../../spotify';

const Connect = ({ match, props, location }) => {
    const service = match.params.service;
    const dispatch = useDispatch();

    useEffect(() => {
        connectService(service);
    }, [])

    const connectService = service => {
        switch (service) {
            case "spotify":
                const urlParams = new URLSearchParams(location.search);
                if (urlParams.get('code')) {
                    const code = urlParams.get('code');
                    const sd = new LSDocument('spotify-verifier');
                    sd.Load();
                    const v = (sd.Get() as any)?.verifier;

                    axios.post('https://accounts.spotify.com/api/token', null, {
                        params: {
                            grant_type: 'authorization_code',
                            client_id: spotifyConfig.client_id,
                            code: code,
                            redirect_uri: spotifyConfig.redirect_uri,
                            code_verifier: v,
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                        .then(response => {
                            if (response.status !== 200) {
                                // console.log(response);
                                throw new Error("HTTP error: " + response.status);
                            }
                            return response.data;
                        })
                        .then(data => {
                            spotify.setAccessToken(data.access_token);
                            data.retrieved_at = Math.round(Date.now() / 1000);
                            // Save to Cloud Firestore
                            saveFirestoreUserData("services", "spotify", data).then(() => {
                                data.connected = true;
                                dispatch(connect("SPOTIFY", data as ISpotify));
                            }).catch(console.error)
                        })
                        .catch(err => {
                            console.log(err.response);
                            console.log(err.request);
                            console.log(err.message);
                            console.log('Could not retrieve access key');
                        });

                } else if (urlParams.get('error')) {
                    console.log(urlParams.get('error'));
                }
                break;

            default:
                return <h1>No such service found.</h1>;
        }
    }
    // console.log(match)
    // console.log(location)
    return <Redirect to="/app" />;
}

export default Connect;