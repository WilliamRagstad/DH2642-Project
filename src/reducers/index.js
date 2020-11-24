import { combineReducers } from 'redux';
import counterReducer from './counter/counter-reducer';
import loggedReducer from './logged/isLogged-reducer';

const allReducers = combineReducers({
    counterReducer, loggedReducer
})

export default allReducers;