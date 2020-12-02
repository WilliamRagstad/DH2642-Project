import { IAction, ISpotify } from "../../interfaces";

const initialState: ISpotify = {
    connected: false,
    access_token: "",
    token_type: "",
    expires_in: null
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