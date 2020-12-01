import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import counterReducer from './counter/counter-reducer';
import loginReducer from './auth/login-reducer';
import signupReducer from './auth/signup-reducer';
import lyricsReducer from './lyrics/lyrics-reducer';

import spotifyReducer from "./connect/spotify-reducer";

const allReducers = combineReducers({
    counterReducer,
    spotifyReducer,
    login: loginReducer,
    signup: signupReducer,
    lyrics: lyricsReducer,
    firebase: firebaseReducer
})

export default allReducers;