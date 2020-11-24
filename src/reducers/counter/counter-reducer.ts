import Action from '../../interfaces/action';

const counterReducer = (state = 0, action: Action) => {
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