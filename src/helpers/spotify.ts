import axios from 'axios';
import { saveFirestoreUserData } from './firebase';
import ISpotify from '../interfaces/services/spotify';
import spotifyConfig from '../spotify-config';
import store from '../store';

export const validateSpotifyToken = (spotifyData: ISpotify) => {
    if (Math.round(Date.now() / 1000) - spotifyData.expires_in > spotifyData.retrieved_at) {
        axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: spotifyData.refresh_token,
                client_id: spotifyConfig.client_id
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            if (response.status !== 200) {
                throw new Error("HTTP error: " + response.status);
            }
            return response.data
        })
        .then(data => {
            data.retrieved_at = Math.round(Date.now() / 1000);
            saveFirestoreUserData("services", "spotify", data)
            .then(function() {
                store.dispatch({type: 'SPOTIFY_UPDATE', payload: data as ISpotify});
            })
            .catch(console.error);
        })
        .catch(err => {
            console.log(err.response);
            console.log(err.request);
            console.log(err.message);
            console.log('Could not refresh access key');
            return false;
        })
    }
    return true;
}