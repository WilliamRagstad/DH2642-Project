import { useDispatch } from "react-redux";

import { loadFirestoreUserData } from '../../helpers/firebase';
import { connect } from '../../actions/connect-actions';

export function LoadServices() {
    const dispatch = useDispatch();

    loadFirestoreUserData("services", "spotify").then((snapshot) => {
        if (snapshot.exists) {
            const hashdata = snapshot.data();
            hashdata.connected = true;
            dispatch(connect("SPOTIFY", hashdata));
        }
    });
}