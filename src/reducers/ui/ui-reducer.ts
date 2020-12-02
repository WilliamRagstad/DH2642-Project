import { IAction } from "../../interfaces";
import { changeUI } from '../../helpers/ui';

const initialState = {
    theme: {
        dark: false,
        primary: "blue"
    },
    language: 'en'
}

const uiReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case 'UI_UPDATE':
            changeUI(action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default uiReducer;