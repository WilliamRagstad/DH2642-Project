import spotify from '../spotify';
import { validateSpotifyToken } from '../helpers/spotify';

export const setSpotifyDeviceId = (id: string) => {
    return {
        type: 'SET_SPOTIFY_DEVICE_ID',
        payload: id
    }
}
export const setPlaying = () => {
    return {
        type: 'MEDIA_PLAY'
    }
}
export const setPaused = () => {
    return {
        type: 'MEDIA_PAUSE'
    }
}
export const setProgress = (progress) => {
    return {
        type: 'SET_PROGRESS',
        payload: progress
    }
}
export const setShuffle = (service: string, shuffle: boolean) => {
    return (dispatch, getState) => {
        const state = getState();
        switch (service) {
            case 'spotify':
                validateSpotifyToken().then(() => {
                    spotify.setShuffle(shuffle)
                        .then(() => {
                            dispatch({type: 'SET_CURRENT_MEDIA', payload: {
                                shuffle: shuffle
                            }})
                        })
                })
                break;
        
            default:
                break;
        }
        
    }
}
export const toggleRepeat = (service: string, repeat: number) => {
    return (dispatch, getState) => {
        switch (service) {
            case 'spotify':
                validateSpotifyToken().then(() => {
                    let repeatVal;
                    if (repeat === 0) {
                        repeat = 1;
                        repeatVal = 'context';
                    }
                    else if (repeat === 1) {
                        repeat = 2;
                        repeatVal = 'track';
                    }
                    else {
                        repeat = 0;
                        repeatVal = 'off';
                    }
                    spotify.setRepeat(repeatVal)
                        .then(() => {
                            dispatch({type: 'SET_CURRENT_MEDIA', payload: {
                                repeat
                            }})
                        })
                })
                break;
        
            default:
                break;
        }
        
    }
}
export const seekMedia = (progress: number) => {
    return (dispatch, getState) => {
        const state = getState();
        const service = state.media.currentlyPlaying.service;
        switch (service) {
            case 'spotify':
                validateSpotifyToken().then(() => {
                    spotify.seek(progress)
                        .catch(console.error);
                })
                break;
            default:
                console.error('Invalid service.');
                return;
        }
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
                if (data && data.currently_playing_type !== "unknown") {
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
            .catch(console.error);
        })
        .catch(console.error);
    }
}