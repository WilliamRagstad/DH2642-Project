import { useDispatch } from "react-redux";

import { loadFirestoreUserData } from '../../helpers/firebase';
import { update_ui } from '../../actions/ui';

export function LoadApp() {
	const dispatch = useDispatch();

	loadFirestoreUserData("app", "ui").then((snapshot) => {
		if (snapshot.exists) dispatch(update_ui(snapshot.data()))
	});
}