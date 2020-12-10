import IAction from '../../interfaces/redux/action';

const initialState = {
    spotifyDeviceId: "",
    isPlaying: false,
    currentlyPlaying: {
        service: "",
        id: "",
        title: "",
        album: {
            id: "",
            name: "",
            images: [{
                url: "https://videoplayer.telvue.com/assets/placeholder_media_for_white_background-a025e5387e2313b21b205ed928e7419816588314b7bf740bf6bc660282663f97.png"
            }]
        },
        artists: [],
        duration: 0,
        progress: 0,
        shuffle: false,
        repeat: 0,
    },
    playlists: {
        spotify: [],
    },
}

const mediaReducer = (state = initialState, action: IAction) => {
    let newState : any;
    switch (action.type) {
        case 'MEDIA_PLAY':
            newState = {
                ...state,
                isPlaying: true
            }
            return newState
        case 'MEDIA_PAUSE':
            newState = {
                ...state,
                isPlaying: false
            }
            return newState
        case 'SET_PROGRESS':
            newState = {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    progress: action.payload
                }
            }
            return newState;
        case 'SET_SPOTIFY_DEVICE_ID':
            newState = {
                ...state,
                spotifyDeviceId: action.payload
            }
            return newState;
        case 'SET_CURRENT_MEDIA':
            newState = {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    ...action.payload
                }
            }
            return newState;
        case 'SET_SPOTIFY_PLAYLISTS':
            newState = {
                ...state,
                playlists: {
                    ...state.playlists,
                    spotify: action.payload,
                } 
            }
            return newState;
        default:
            return state;
    }
}

export default mediaReducer;