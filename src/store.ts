import { createStore } from 'redux';
import allReducers from "./reducers";

const store = createStore(
	allReducers,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;