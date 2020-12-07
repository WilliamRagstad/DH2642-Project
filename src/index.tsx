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

import { LocationCache } from './lavastore';
import Loaders from './components/loaders/loaders';

const rrfProps = {
	firebase,
	config: {
		userProfile: "users",
		useFirestoreForProfile: true,
	},
	dispatch: store.dispatch,
	createFirestoreInstance
}

LocationCache.Set({ to: window.location.href });

ReactDOM.render(
	<React.Fragment>
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<App />
			</ReactReduxFirebaseProvider>
		</Provider>

		<Loaders />
	</React.Fragment>,
	document.getElementById('root')
);
