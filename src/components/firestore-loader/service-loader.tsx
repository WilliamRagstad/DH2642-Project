import { useDispatch } from "react-redux";
import firebase from '../../firebase';
import "firebase/firestore";

import { ISpotify } from '../../interfaces';
import { connect } from '../../actions/connect-actions';
import { loadFirestoreUserData } from '../../helpers/firebase';

export function LoadServices() {
    const dispatch = useDispatch();

    loadFirestoreUserData("services", "spotify").then((snapshot) => {
        if (snapshot.exists) {
            const hashdata = snapshot.data();
            hashdata.connected = true;
            dispatch(connect("SPOTIFY", hashdata as ISpotify));
        }
    });
}