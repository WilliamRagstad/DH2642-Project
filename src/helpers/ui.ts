import { useSelector } from 'react-redux';
import firebase from '../firebase';
import "firebase/firestore";

import { getCurrentUser } from './firebase';
import { IState } from '../interfaces';


export function changePrimary(color: string) {
	document.body.style.setProperty("--primary", `var(--theme-${color})`);
}

function uiSyncFirebase(current_ui: any) {
	const db = firebase.firestore();
	getCurrentUser(firebase.auth()).then((user: any) => {
		db.collection("app").doc("ui").collection("users").doc(user.uid).set(current_ui);
	})
}

export function applyPrimary(color: string, current_ui: any) {
	changePrimary(color);
	current_ui.theme.primary = color;
	uiSyncFirebase(current_ui);
}
