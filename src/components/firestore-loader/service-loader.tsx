import { useDispatch } from "react-redux";
import firebase from '../../firebase';
import "firebase/firestore";

import { ISpotify } from '../../interfaces';
import { connect } from '../../actions/connect-actions';
import { getCurrentUser } from '../../helpers/firebase';

export function LoadServices() {
    const dispatch = useDispatch();
    const db = firebase.firestore();

    getCurrentUser(firebase.auth()).then((user: any) => {
        if (!user) return;
        db.collection("services").doc("spotify").collection("users").doc(user.uid).get().then((snapshot) => {
            if (snapshot.exists) {
                const hashdata = snapshot.data();
                hashdata.connected = true;
                dispatch(connect("SPOTIFY", hashdata as ISpotify));
            }
        });
    })
}