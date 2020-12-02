import firebase from '../firebase';
import "firebase/firestore";

const db = firebase.firestore();

export function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
}

export function saveFirestoreUserData(collection: string, doc: string, data: any) {
    return getCurrentUser(firebase.auth()).then((user: any) => db.collection(collection).doc(doc).collection("users").doc(user.uid).set(data))
}
export function loadFirestoreUserData(collection: string, doc: string) {
    return getCurrentUser(firebase.auth()).then((user: any) => db.collection(collection).doc(doc).collection("users").doc(user.uid).get())
}