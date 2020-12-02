import { saveFirestoreUserData } from "./firebase";

/*
 
  dP""b8 88     88 888888 88b 88 888888 
 dP   `" 88     88 88__   88Yb88   88   
 Yb      88  .o 88 88""   88 Y88   88   
  YboodP 88ood8 88 888888 88  Y8   88   
 
*/

export function changeThemePrimary(color: string) {
	document.body.style.setProperty("--primary", `var(--theme-${color})`);
	document.body.style.setProperty("--primary-dark", `var(--theme-${color}-dark)`);
	document.body.style.setProperty("--primary-light", `var(--theme-${color}-light)`);
}
export function changeThemeDark(enabled: boolean) {
	if (enabled) {
		document.body.classList.remove("theme-dark");
		document.body.classList.add("theme-light");
	}
	else {
		document.body.classList.remove("theme-light");
		document.body.classList.add("theme-dark");
	}
}
export function changeUI(ui: any) {
	changeThemePrimary(ui.theme.primary);
	changeThemeDark(ui.theme.dark);
}
/*
 
 888888 88 88""Yb 888888 88""Yb    db    .dP"Y8 888888 
 88__   88 88__dP 88__   88__dP   dPYb   `Ybo." 88__   
 88""   88 88"Yb  88""   88""Yb  dP__Yb  o.`Y8b 88""   
 88     88 88  Yb 888888 88oodP dP""""Yb 8bodP' 888888 
 
*/

export function applyThemePrimary(color: string, current_ui: any) {
	changeThemePrimary(color);
	current_ui.theme.primary = color;
	saveFirestoreUserData("app", "ui", current_ui);
}

export function applyThemeDark(enabled: boolean, current_ui: any) {
	changeThemeDark(enabled);
	current_ui.theme.dark = enabled;
	saveFirestoreUserData("app", "ui", current_ui);
}

export function applyLanguage(code: string, current_ui: any) {
	current_ui.language = code;
	saveFirestoreUserData("app", "ui", current_ui);
}