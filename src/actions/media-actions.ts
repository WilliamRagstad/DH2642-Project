import spotify from '../spotify';
import { parseParams } from '../helpers/parsing';
import { validateSpotifyToken } from '../helpers/spotify';

export const setSpotifyDeviceId = (id: string) => {
    return {
        type: 'SET_SPOTIFY_DEVICE_ID',
        payload: id
    }
}
export const setPlaying = () => {
    return {
        type: 'SET_PLAYING'
    }
}
export const setPaused = () => {
    return {
        type: 'SET_PAUSED'
    }
}

export const pausePlay = (service: string) => {
    return (dispatch, getState) => {
        const isPlaying = getState().media.isPlaying;
        switch (service) {
            case 'spotify':
                validateSpotifyToken().then(() => {
                    if (isPlaying) spotify.pause().then(() => dispatch({type: 'MEDIA_PAUSE'})).catch(handleSpotifyError)
                    else spotify.play().then(() => dispatch({type: 'MEDIA_PLAY'})).catch(handleSpotifyError)
                }).catch(console.error);
                break;
            default:
                console.error('Invalid service.');
                return;
        }
    }
}
export const next = (service: string) => {
    return (dispatch, getState) => {
        switch (service) {
            case 'spotify':
                validateSpotifyToken().then(() => {
                    spotify.skipToNext().then(() => {
                        console.log("Skipped to next");
                    }).catch(handleSpotifyError);
                }).catch(console.error);
                break;
            default:
                console.error('Invalid service.');
                return;
        }
    }
}
export const previous = (service: string) => {
    return (dispatch, getState) => {
        switch (service) {
            case 'spotify':
                validateSpotifyToken().then(() => {
                    spotify.skipToPrevious().then(() => {
                        console.log("Skipped to previous");
                    }).catch(handleSpotifyError)
                }).catch(console.error);
                break;
            default:
                console.error('Invalid service.');
                return;
        }
    }
}

export const setCurrentMedia = (data: any) => {
    return {
        type: 'SET_CURRENT_MEDIA',
        payload: data
    }
}

const handleSpotifyError = err => {
    const response = JSON.parse(err.response);
    console.error(response.error.message);
}