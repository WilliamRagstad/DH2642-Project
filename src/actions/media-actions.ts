import spotify from '../spotify';
import { validateSpotifyToken } from '../helpers/spotify';
import youtube from '../youtube-player';

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
export const seekMedia = (progressMS: number) => {
    return (dispatch, getState) => {
        const state = getState();
        const service = state.media.currentlyPlaying.service;
        switch (service) {
            case 'spotify':
                validateSpotifyToken().then(() => {
                    spotify.seek(progressMS)
                        .catch(console.error);
                })
                break;
            case 'youtube':
                if (youtube.player) {
                    youtube.player.seekTo(progressMS / 1000);
                    dispatch({type: 'SET_PROGRESS'})
                }
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
            case 'youtube':
                if (youtube.player) {
                    if (isPlaying) {
                        youtube.player.pauseVideo();
                        dispatch({type: 'MEDIA_PAUSE'});
                    }
                    else {
                        youtube.player.playVideo();
                        dispatch({type: 'MEDIA_PLAY'});
                    }
                }
                break;
            default:
                console.error('Invalid service.');
                return;
        }
    }
}

export const playContext = (service: string, {
    context = null,
    uris = null,
    offset = null,
    videoId = null
}) => {
    return (dispatch, getState) => {
        const state = getState()
        const isPlaying = state.media.isPlaying;
        const currentService = state.media.currentlyPlaying.service;
        
        switch (service) {
            case 'spotify':
                validateSpotifyToken().then(() => {
                    if (context || uris) {
                        let options: any = {};
                        if (context) options.context_uri = ('spotify:' + context);
                        if (offset) options.offset = {
                            uri: ('spotify:' + offset)
                        };
                        if (uris) {
                            options.uris = [];
                            uris.forEach(uri => {
                                options.uris.push('spotify:' + uri)
                            });
                        }
                        // console.log(options);
                        spotify.play(options)
                        .then(() => {
                            dispatch({type: 'SET_CURRENT_MEDIA', payload: {service: 'spotify'}})
                            console.log('Started playing ' + context + ' on Spotify');
                        })
                        .catch(handleSpotifyError);
                    }
                }).catch(console.error);
                break;
            case 'youtube':
                if (videoId) {
                    let data = {
                        service: 'youtube',
                        id: videoId,
                    }
                    dispatch({type: 'SET_CURRENT_MEDIA', payload: data});
                    dispatch({type: 'MEDIA_PLAY'});
                    youtube.player.playVideo();
                }
                break;
            default:
                break;
        }
        if (isPlaying && currentService !== service) {
            switch (currentService) {
                case 'spotify':
                    validateSpotifyToken().then(() => {
                        spotify.pause().then(() => console.log('Paused Spotify'))
                        .catch(handleSpotifyError);
                    })
                    .catch(console.error);
                    break;
                case 'youtube':
                    youtube.player.stopVideo();
                    break;
                default:
                    break;
            }
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
export const getSpotifyPlaylists = () => {
    return (dispatch, getState) => {
        validateSpotifyToken().then(() => {
            spotify.getUserPlaylists().then((data: any) => {
                let playlists = [];
                data.items.forEach(item => {
                    const playlist = {
                        id: item.id,
                        name: item.name,
                        owner: {
                            id: item.owner.id,
                            name: item.owner.display_name
                        },
                        description: item.description,
                        image: item.images[0].url,
                        trackCount: item.tracks.total,
                    }
                    playlists.push(playlist);
                });
                dispatch({type: 'SET_SPOTIFY_PLAYLISTS', payload: playlists})
                // console.log(data);
            })
            .catch(console.error);
        })
    }
}
export const getSpotifyPlaylist = (id: string) => {
    return (dispatch, getState) => {
        validateSpotifyToken().then(() => {
            spotify.getPlaylist(id).then((data: any) => {
                // console.log(data);
                let tracks = [];
                let totalDuration = 0;
                data.tracks.items.forEach(item => {
                    let trackData = ({
                        id: item.track.id,
                        title: item.track.name,
                        album: {
                            id: item.track.album.id,
                            name: item.track.album.name,
                            images: item.track.album.images
                        },
                        artists: [],
                        duration: item.track.duration_ms,
                    })
                    item.track.artists.forEach(artist => {
                        trackData.artists.push({
                            id: artist.id,
                            name: artist.name
                        })
                    });
                    tracks.push(trackData);
                    totalDuration += item.track.duration_ms;
                });
                const playlist = {
                    service: 'spotify',
                    id: id,
                    name: data.name,
                    description: data.description,
                    owner: {
                        id: data.owner.id,
                        name: data.owner.display_name
                    },
                    tracks,
                    totalDuration
                }
                dispatch({type: 'SET_ACTIVE_PLAYLIST', payload: playlist})

                
            })
            .catch(console.error);
        })
    }
}

export const setVolume = (volume) => {
    return (dispatch, getState) => {
        const state = getState();
        const service = state.media.currentlyPlaying.service;
        switch (service) {
            case 'spotify':
                validateSpotifyToken().then(() => {
                    spotify.setVolume(volume).then(() => {
                        dispatch({type: 'SET_CURRENT_MEDIA', payload: {volume}});
                        console.log('Set volume to ' + (volume));
                    })
                    .catch(handleSpotifyError);
                })
                .catch(console.error);
                break;
            default:
                break;
        }
    }
}