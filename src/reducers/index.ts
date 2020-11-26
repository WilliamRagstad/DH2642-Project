import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import counterReducer from './counter/counter-reducer';
import loginReducer from './auth/login-reducer';
import signupReducer from './auth/signup-reducer';

import spotifyReducer from "./connect/spotify-reducer";

const allReducers = combineReducers({
    counterReducer,
    spotifyReducer,
    login: loginReducer,
    signup: signupReducer,
    firebase: firebaseReducer
})

export default allReducers;