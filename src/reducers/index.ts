import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import { IState } from '../interfaces';

import counterReducer from './counter/counter-reducer';
import loginReducer from './auth/login-reducer';
import signupReducer from './auth/signup-reducer';
import lyricsReducer from './lyrics/lyrics-reducer';

import spotifyReducer from "./connect/spotify-reducer";
import uiReducer from './ui/ui-reducer';

const allReducers = combineReducers({
    counterReducer,
    spotifyReducer,
    login: loginReducer,
    signup: signupReducer,
    firebase: firebaseReducer,
    lyrics: lyricsReducer,
    ui: uiReducer
} as IState)

//! Warning: When adding new reducers to allReducers, update IState in src/interfaces/redux/state.ts

export default allReducers;