import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import counterReducer from './counter/counter-reducer';
import loggedReducer from './logged/isLogged-reducer';
import loginReducer from './auth/login-reducer';

const allReducers = combineReducers({
    counterReducer,
    loggedReducer,
    login: loginReducer,
    firebase: firebaseReducer
})

export default allReducers;