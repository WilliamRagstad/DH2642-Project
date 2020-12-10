import React from 'react';
import { useDispatch } from 'react-redux';
import { connect } from '../../actions/connect-actions';
import { update_ui } from '../../actions/ui';
import { loadFirestoreUserData } from '../../helpers/firebase';


function LoadAppFirestore() {
    const dispatch = useDispatch();

    loadFirestoreUserData("app", "ui").then((snapshot) => {
        if (snapshot && snapshot.exists) dispatch(update_ui(snapshot.data()))
    });
}

function LoadServices() {
    const dispatch = useDispatch();

    loadFirestoreUserData("services", "spotify").then((snapshot) => {
        if (snapshot && snapshot.exists) {
            const hashdata = snapshot.data();
            hashdata.connected = true;
            dispatch(connect("SPOTIFY", hashdata));
        }
    });
}

function FirestoreLoader() {

    LoadAppFirestore();
    LoadServices();

    return <React.Fragment />;
}

export default FirestoreLoader;