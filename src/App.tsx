import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Tooltip, ProgressCircular } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css';

import {
	Counter,
	Signup,
	Login,
	SpotifyAuth
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

			{/* <ProgressCircular indeterminate color='var(--success)' size={36} width={4}/> */}
			<Counter />
			<Login />
			<Signup />
			<SpotifyAuth />

			<Card dark style={{width: "200px", padding: "5px", margin: "5px"}}>
				<h1>Counter {counter}</h1>
				<Tooltip dark left inset content={<div>Increase counter by 5</div>}>
					<Button dark style={{margin: "4px", float: "left"}} onClick={() => dispatch(increment(5))}>+</Button>
				</Tooltip>
				<Tooltip dark right inset content={<div>Decrease counter by 5</div>}>
					<Button dark style={{margin: "4px", float: "right"}} onClick={() => dispatch(decrement(5))}>-</Button>
				</Tooltip>
			</Card>
		</div>
	);
}

export default App;
