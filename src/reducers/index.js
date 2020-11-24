import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import counterReducer from './counter/counter-reducer';
import loggedReducer from './logged/isLogged-reducer';

const allReducers = combineReducers({
    counterReducer,
    loggedReducer,
    firebase: firebaseReducer
})

export default allReducers;