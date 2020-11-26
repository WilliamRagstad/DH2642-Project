import { IAction } from "../../interfaces";

const counterReducer = (state = 0, action: IAction) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + action.payload;

        case 'DECREMENT':
            return state - action.payload;

        default:
            return state;
    }
}

export default counterReducer;