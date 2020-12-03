import { StorageDocument } from "./helpers/storage";
import { changeUI } from "./helpers/ui";

const AppDocument = new StorageDocument("app");
AppDocument.Load();

export default AppDocument;

export function LoadAppCache() {
    // Load theme from local storage before catching up with firestore state. Replaced with shorthand version
    AppDocument.DocumentPath("cache/ui")?.PassTo(changeUI);
}