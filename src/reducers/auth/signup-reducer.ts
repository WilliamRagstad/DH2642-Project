import { IAction } from "../../interfaces";

const initialState = {
    signupFormData: {
        email: "",
        password: "",
        passwordRepeat: ""
    },
    isLoading: false,
    signupError: null,
    signoutError: null
}

const signupReducer = (state = initialState, action: IAction) => {
    let newState;
    switch (action.type) {
        case 'SIGNUP_CHANGE':
            newState = {
                ...state,
                signupFormData: { ...state.signupFormData, ...action.payload }
            };
            return newState;
        case 'SIGNUP_SUCCESS':
            newState = {
                ...state,
                signupError: null,
                signupFormData: {
                    email: '',
                    password: '',
                    passwordRepeat: '',
                },
                isLoading: false
            };
            return newState;
        case 'SIGNUP_ERROR':
            newState = {
                ...state,
                signupError: action.err.message,
                isLoading: false
            };
            return newState;
        case 'SET_SIGNUP_LOADING':
            newState = {
                ...state,
                isLoading: true,
                signupError: null
            };
            return newState;
        case 'HIDE_SIGNUP_ERROR':
            newState = {
                ...state,
                signupError: null
            };
            return newState;
        default:
            return state;
    }
}

export default signupReducer;