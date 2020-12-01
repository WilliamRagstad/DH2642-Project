import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// REDUX
import store from './store';
import { Provider } from 'react-redux';

// FIREBASE
import firebase from './firebase';
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from 'redux-firestore';

// CONNECT TO FIRESTORE SAVED SERVICES
import FirebaseLoader from './components/firebase-loader/firebase-loader';

const rrfProps = {
	firebase,
	config: {
		userProfile: "users",
		useFirestoreForProfile: true,
	},
	dispatch: store.dispatch,
	createFirestoreInstance
}


ReactDOM.render(
	<Provider store={store}>
		<FirebaseLoader />
		<ReactReduxFirebaseProvider {...rrfProps}>
			<App />
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root')
);
