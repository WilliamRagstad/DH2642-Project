import { getFirebase } from 'react-redux-firebase';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from "./reducers";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	allReducers, composeEnhancers(applyMiddleware(thunk.withExtraArgument({getFirebase})))
);

export default store;