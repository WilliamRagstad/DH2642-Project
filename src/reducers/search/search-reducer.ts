import { IAction } from "../../interfaces";

const initialState = {
    searchQuery: "",
    isLoading: false,
    searchError: "",
    searchResults: []
}

const searchReducer = (state = initialState, action: IAction) => {
    let newState: any;
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            newState = {
                ...state,
                searchQuery: action.payload
            };
            return newState;
        case 'ADD_SEARCH_RESULTS':
            newState = {
                ...state,
                searchResults: [...state.searchResults, ...action.payload]
            }
            return newState;
        case 'CLEAR_SEARCH_RESULTS':
            newState = {
                ...state,
                searchResults: []
            }
            return newState;
        case 'SET_SEARCH_LOADING':
            newState = {
                ...state,
                searchError: null,
                isLoading: true,
            };
            return newState;
        case 'SEARCH_SUCCESS':
            newState = {
                ...state,
                searchError: null,
                isLoading: false
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