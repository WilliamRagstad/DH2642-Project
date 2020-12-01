import { IAction } from "../../interfaces";
import { changePrimary } from '../../helpers/ui';

const initialState = {
    theme: {
        dark: true,
        primary: "blue"
    }
}

const uiReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case 'UI_UPDATE':
            changePrimary(action.payload.theme.primary)
            return action.payload;
        default:
            return state;
    }
}

export default uiReducer;