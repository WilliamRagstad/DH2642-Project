import React from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../helpers/firebase";
import firebase from 'firebase/app';

import { AppDocument, LocationCache } from "../../lavastore";
import { changeUI } from "../../helpers/ui";
import { update_ui } from "../../actions/ui";
import { LSHelpers as LSH } from "lavastore";

function UILoader() {
    const dispatch = useDispatch();
    // Load theme from local storage before catching up with firestore state. Replaced with shorthand version
    AppDocument.DocumentPath("cache/ui")?.PassTo(ui => {
        if (LSH.HasFields(ui)) {
            changeUI(ui);
            dispatch(update_ui(ui));
        }
    });
    return <React.Fragment />;
}

function LocationLoader() {
    const history = useHistory();

    getCurrentUser(firebase.auth()).then(user => {
        // App has loaded page based on auth.
        // Redirect if a desired location is stored in lavastore
        const to = (LocationCache.Get() as any)?.to as string;
        if (to !== undefined && window.location.href !== to && history !== undefined) {
            const path = to.replace(window.location.origin, '');
            debugger
            history.push(path);
        }
        LocationCache.Set({});
    })

    return <React.Fragment />;
}

function LavastoreLoader() {

    UILoader();
    LocationLoader();

    return <React.Fragment />;
}
export default LavastoreLoader;