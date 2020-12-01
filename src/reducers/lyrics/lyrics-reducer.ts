import { IAction } from "../../interfaces";

const initialState = {
    sameAsPlaying: false,
    searchQuery: "",
    currentLyrics: {
        id: null,
        title: "",
        artist: "",
        url: "",
        albumArtUrl: "",
        lyrics: "",
    },
    isLoading: false,
    lyricsError: null
}

const lyricsReducer = (state = initialState, action : IAction) => {
    let newState : any;
    switch (action.type) {
        case 'SET_LYRICS_QUERY':
            newState = {
                ...state,
                searchQuery: action.payload
            };
            return newState;
        case 'SET_LYRICS_SAME_AS_PLAYING':
            newState = {
                ...state,
                sameAsPlaying: action.payload
            };
            return newState;
        case 'SET_CURRENT_LYRICS':
            newState = {
                ...state,
                currentLyrics: { ...state.currentLyrics, ...action.payload }
            };
            return newState;
        case 'SET_LYRICS_LOADING':
            newState = {
                ...state,
                isLoading: true,
            };
            return newState;
        case 'LYRICS_SUCCESS':
            newState = {
                ...state,
                currentLyrics: { ...state.currentLyrics, ...action.payload },
                isLoading: false,
                lyricsError: null
            };
            return newState;
        case 'LYRICS_ERROR':
            newState = {
                ...state,
                lyricsError: action.payload,
                isLoading: false
            };
            return newState;
        case 'HIDE_LYRICS_ERROR':
                newState = {
                    ...state,
                    lyricsError: null
                };
                return newState;
        default:
            return state;
    }
}

export default lyricsReducer;