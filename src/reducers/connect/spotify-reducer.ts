import { IAction, ISpotify } from "../../interfaces";

const initialState: ISpotify = {
    connected: false,
    access_token: "",
    token_type: "",
    scope: "",
    expires_in: null,
    refresh_token: "",
    retrieved_at: null
}

const spotifyReducer = (state = initialState, action: IAction) => {
    let newState;
    switch (action.type) {
        case 'CONNECTED_SPOTIFY':
            return action.payload || initialState; // Fallback if undefined payload
        case 'SPOTIFY_UPDATE':
            newState = {
                ...state,
                ...action.payload
            }
            return newState;
        default:
            return state;
    }
}

export default spotifyReducer;