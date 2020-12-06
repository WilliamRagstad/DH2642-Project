import { IAction, ISpotify } from "../../interfaces";

const initialState: ISpotify = {
    connected: false,
    access_token: "",
    token_type: "",
    scope: "",
    expires_in: null,
    refresh_token: ""
}

const spotifyReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case 'CONNECTED_SPOTIFY':
            return action.payload || initialState; // Fallback if undefined payload
        default:
            return state;
    }
}

export default spotifyReducer;