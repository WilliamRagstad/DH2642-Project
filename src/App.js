import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Counter, LoadingIndicator } from './components';

import { increment, decrement } from "./actions";

import logo from './logo.svg';
import './App.css';
import './styles/sass/style.scss'

function App() {

	const counter = useSelector(state => state.counterReducer);
	const dispatch = useDispatch();

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
        		</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
        		</a>
			</header>

			<LoadingIndicator />
			<Counter />

			<div>
				<h1>Counter {counter}</h1>
				<button onClick={() => dispatch(increment())}>+</button>
				<button onClick={() => dispatch(decrement())}>-</button>
			</div>
		</div>
	);
}

export default App;
