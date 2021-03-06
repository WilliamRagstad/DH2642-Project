import axios from 'axios';
import { saveFirestoreUserData } from './firebase';
import ISpotify from '../interfaces/services/spotify';
import spotifyConfig from '../services/spotify-config';
import store from '../store';
import spotify from '../spotify';

export const validateSpotifyToken = async () => {
    const state: any = store.getState();
    const spotifyData = state.spotify

    if (Math.round(Date.now() / 1000) - spotifyData.expires_in > spotifyData.retrieved_at) {
        await axios.post('https://accounts.spotify.com/api/token', null, {
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
                spotify.setAccessToken(data.access_token);
                data.retrieved_at = Math.round(Date.now() / 1000);
                saveFirestoreUserData("services", "spotify", data)
                    .then(() => {
                        store.dispatch({ type: 'SPOTIFY_UPDATE', payload: data as ISpotify });
                        console.log("Spotify token refreshed.")
                    })
                    .catch(console.error);
            })
            .catch(err => {
                console.log(err.response);
                console.log(err.request);
                console.log(err.message);
                console.log('Could not refresh access key.');
                return false;
            })
    }
    return true;
}

export function songLength(duration) {
    let seconds: any = ((duration / 1000) % 60).toFixed(0);
    let minutes: number = Math.abs((((duration / 1000) - seconds) / 60));

    if (seconds >= 60) {
        seconds -= 60;
        minutes += 1;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes.toFixed(0) + ":" + seconds;
}
