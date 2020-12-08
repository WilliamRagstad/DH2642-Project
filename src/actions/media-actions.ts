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
export const setProgress = (progress) => {
    return {
        type: 'SET_PROGRESS',
        payload: progress
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

export const getCurrentMediaData = (service: string) => {
    return (dispatch, getState) => {
        const state = getState();
        switch (state.media.currentlyPlaying.service) {
            case 'spotify':
                validateSpotifyToken().then(() => {   
                    getCurrentSpotifyData();
                }); 
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

export const handleSpotifyError = err => {
    const response = JSON.parse(err.response);
    console.error(response.error.message);
}

export const getCurrentSpotifyData = () => {
    return (dispatch, getState) => {
        validateSpotifyToken().then(() => {
            spotify.getMyCurrentPlayingTrack().then((data: any) => {
                // console.log(data);
                if (data) {
                    let trackData = {
                        service: 'spotify',
                        id: data.item.id,
                        title: data.item.name,
                        album: {
                            id: data.item.album.id,
                            name: data.item.album.name,
                            images: data.item.album.images
                        },
                        artists: [],
                        duration: data.item.duration_ms,
                        progress: data.progress_ms
                    }
                    data.item.album.artists.forEach(artist => {
                        trackData.artists.push({
                            id: artist.id,
                            name: artist.name
                        })
                    })
                    // console.log(trackData);
                    dispatch({type: 'SET_CURRENT_MEDIA', payload: trackData});
                    if (data.is_playing) dispatch({type: 'SET_PLAYING'}); else dispatch({type: 'SET_PAUSED'});
                }
            })
            .catch(handleSpotifyError);
        })
        .catch(console.error);
    }
}