import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import allReducers from "./reducers";
import { Provider } from 'react-redux';

// FIREBASE
import firebase from 'firebase-app';
import 'firebase/database';
import 'firebase/auth';
const firebaseConfig = {
	apiKey: "AIzaSyCurCsMsxjroxfjgt6LpCLhH2pfbgasIvI",
	authDomain: "fir-project-e91a1.firebaseapp.com",
	databaseURL: "https://fir-project-e91a1.firebaseio.com",
	projectId: "fir-project-e91a1",
	storageBucket: "fir-project-e91a1.appspot.com",
	messagingSenderId: "276910270015",
	appId: "1:276910270015:web:6026bc8036de178db63a8a"
};
firebase.initializeApp(firebaseConfig);




const store = createStore(
	allReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
