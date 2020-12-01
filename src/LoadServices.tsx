import React from 'react';
import { useDispatch } from "react-redux";
import firebase from './firebase';
import "firebase/firestore";

import { ISpotify } from './interfaces';
import { connect } from './actions/connect-actions';
import { getCurrentUser } from './helpers/firebase';

function LoadServices() {
    const dispatch = useDispatch();
    const db = firebase.firestore();

    getCurrentUser(firebase.auth()).then((user: any) => {
        db.collection("services").doc("spotify").collection("users").doc(user.uid).get().then((querySnapshot) => {
            if (querySnapshot.exists) {
                const hashdata = querySnapshot.data();
                hashdata.connected = true;
                dispatch(connect("SPOTIFY", hashdata as ISpotify));
            }
        });
    })
    return <span></span>;
}

export default LoadServices;