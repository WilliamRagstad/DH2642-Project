import { useDispatch } from "react-redux";
import firebase from '../../firebase';
import "firebase/firestore";

import { getCurrentUser } from '../../helpers/firebase';
import { update_ui } from '../../actions/ui';

export function LoadApp() {
	const dispatch = useDispatch();
	const db = firebase.firestore();

	getCurrentUser(firebase.auth()).then((user: any) => {
		if (!user) return;
		db.collection("app").doc("ui").collection("users").doc(user.uid).get().then((snapshot) => {
			if (snapshot.exists) dispatch(update_ui(snapshot.data()))
		});
	})
}