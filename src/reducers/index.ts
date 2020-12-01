import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import counterReducer from './counter/counter-reducer';
import loginReducer from './auth/login-reducer';
import signupReducer from './auth/signup-reducer';
import lyricsReducer from './lyrics/lyrics-reducer';

import spotifyReducer from "./connect/spotify-reducer";
import { IState } from '../interfaces';

const allReducers = combineReducers({
    counterReducer,
    spotifyReducer,
    login: loginReducer,
    signup: signupReducer,
    lyrics: lyricsReducer,
    firebase: firebaseReducer
} as IState)

//! Warning: When adding new reducers to allReducers, update IState in src/interfaces/redux/state.ts

export default allReducers;