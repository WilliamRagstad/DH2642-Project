import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	Counter,
	Signup,
	LoadingIndicator,
	Login
} from './components';

import { increment, decrement } from "./actions/counter-actions";
// @ts-ignore
// import logo from '../assets/logo.svg';
import './App.css';
import './styles/sass/style.scss'

function App() {

	const counter = useSelector((state: any) => state.counterReducer);
	const dispatch = useDispatch();

	return (
		<div className="App">
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
        		</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
        		</a>
			</header> */}

			<LoadingIndicator />
			<Counter />
			<Login />
			<Signup />

			<div>
				<h1>Counter {counter}</h1>
				<button onClick={() => dispatch(increment(5))}>+</button>
				<button onClick={() => dispatch(decrement(5))}>-</button>
			</div>
		</div>
	);
}

export default App;
