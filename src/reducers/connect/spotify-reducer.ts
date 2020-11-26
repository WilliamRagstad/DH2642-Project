import { IAction } from "../../interfaces";

const initialState = {
    access_token: "",
    token_type: "",
    expires_in: null
}

const spotifyReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case 'CONNECTED_SPOTIFY':
            return action.payload;

        default:
            return state;
    }
}

export default spotifyReducer;