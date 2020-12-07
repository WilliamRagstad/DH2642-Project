import React from "react";
import { useHistory } from 'react-router-dom';
import { getCurrentUser } from "../../helpers/firebase";
import { AppDocument, LocationCache } from "../../lavastore";
import firebase from 'firebase/app';
import { useDispatch } from "react-redux";
import { changeUI } from "../../helpers/ui";
import { update_ui } from "../../actions/ui";

function UILoader() {
    const dispatch = useDispatch();
    // Load theme from local storage before catching up with firestore state. Replaced with shorthand version
    AppDocument.DocumentPath("cache/ui")?.PassTo(ui => {
        changeUI(ui);
        dispatch(update_ui(ui));
    });
    return <React.Fragment />;
}

function LocalstoreLoader() {
    const history = useHistory();

    getCurrentUser(firebase.auth()).then(user => {
        // App has loaded page based on auth.
        // Redirect if a desired localtion is stored in lavastore
        const to = (LocationCache.Get() as any)?.to as string;
        if (to !== undefined && window.location.href !== to) {
            debugger
            const path = to.replace(window.location.origin, '');
            history.push(path);
        }
        LocationCache.Set({});
    })

    return <React.Fragment />;
}

function LavastoreLoader() {
    return <React.Fragment>
        <LocalstoreLoader />
        <UILoader />
    </React.Fragment>;
}
export default LavastoreLoader;