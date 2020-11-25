import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

import {
	Counter,
	Signup,
	LoadingIndicator,
	Login
} from './components';

import { increment, decrement } from "./actions/counter-actions";

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

			<Card style={{width: "170px", padding: "10px"}}>
				<h1>Counter {counter}</h1>
				<Button style={{margin: "4px"}} onClick={() => dispatch(increment(5))}>+</Button>
				<Button style={{margin: "4px"}} onClick={() => dispatch(decrement(5))}>-</Button>
			</Card>
		</div>
	);
}

export default App;
