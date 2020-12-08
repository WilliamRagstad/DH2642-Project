import { IAction } from "../../interfaces";

const initialState = {
    searchQuery: "",
    isLoading: false,
    searchError: "",
    searchResults: []
}

const searchReducer = (state = initialState, action : IAction) => {
    let newState : any;
    switch(action.type) {
        case 'SET_SEARCH_QUERY':
            newState = {
                ...state,
                searchQuery: action.payload
            };
            return newState;
        case 'SET_SEARCH_RESULTS':
            newState = {
                ...state,
                searchResults: action.payload
            }
            return newState;
        case 'SET_SEARCH_LOADING':
            newState = {
                ...state,
                isLoading: true,
            };
            return newState;
        case 'SEARCH_SUCCESS':
            newState = {
                ...state,
                isLoading: false,
                searchError: null
            };
            return newState;
        case 'SEARCH_ERROR':
            newState = {
                ...state,
                searchError: action.payload,
                isLoading: false
            };
            return newState;
        default:
            return state;
    }
}

export default searchReducer;