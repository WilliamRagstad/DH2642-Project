import firebase from 'firebase/app';
// import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import config from './firebaseConfig';

firebase.initializeApp(config);
firebase.firestore();

export default firebase;