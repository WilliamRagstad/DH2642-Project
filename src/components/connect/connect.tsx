import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import firebase from '../../firebase';
import "firebase/firestore";

import { connect } from '../../actions/connect-actions';
import { ISpotify } from '../../interfaces';

import { parseParams } from "../../helpers/parsing";
import { getCurrentUser } from '../../helpers/firebase';

const Connect = ({ match, props, location }) => {
    const service = match.params.service;
    const dispatch = useDispatch();
    const db = firebase.firestore();

    // console.log(match)
    // console.log(location)

    switch (service) {
        case "spotify":
            const hashdata = parseParams(location.hash.slice(1));
            if (hashdata.access_token && hashdata.token_type && hashdata.expires_in) {
                // Save to Cloud Firestore
                getCurrentUser(firebase.auth()).then((user: any) => {
                    db.collection("services").doc("spotify").collection("users").doc(user.uid).set(hashdata).then(function () {
                        hashdata.connected = true;
                        dispatch(connect("SPOTIFY", hashdata as ISpotify));
                    }).catch(console.error)
                })

            }
            break;

        default:
            return <h1>No such service found.</h1>;
    }

    return <Redirect to="/app" />;
}

export default Connect;