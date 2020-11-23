import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import config from './firebaseConfig';

firebase.initializeApp(config);

export default firebase;