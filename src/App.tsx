import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Button, Card, Tooltip } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css';

import {
	Application,
	Counter,
	Signup,
	Login,
	Connect
} from './components';

import { increment, decrement } from "./actions/counter-actions";

import './styles/sass/style.scss';
import { IState } from './interfaces';

function App() {

	const counter = useSelector((state: IState) => state.counterReducer);
	const isLoggedIn = useSelector((state: IState) => state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty);
	const dispatch = useDispatch();

	return (
		<Router>
			<Switch>
				<Route path="/counters">
					<div className="flexparent">
						<Counter />
						<Card style={{ width: "200px", padding: "5px" }}>
							<h1>Counter {counter}</h1>
							<Tooltip left inset content={<div>Decrease counter by 5</div>}>
								<Button style={{ margin: "4px", float: "left" }} onClick={() => dispatch(decrement(5))}>-</Button>
							</Tooltip>
							<Tooltip right inset content={<div>Increase counter by 5</div>}>
								<Button style={{ margin: "4px", float: "right" }} onClick={() => dispatch(increment(5))}>+</Button>
							</Tooltip>
						</Card>
					</div>
				</Route>


				<Route path="/" exact>
					<Redirect to="/login" />
				</Route>
				<Route path="/login" render={() => (
					isLoggedIn ? <Redirect to="/app/home" /> : <Login />
				)} />
				<Route path="/signup" render={() => (
					isLoggedIn ? <Redirect to="/app/home" /> : <Signup />
				)} />
				<Route path="/connect/:service([a-z]+)" component={Connect} />
				<Route path="/app" render={() => (
					isLoggedIn ? <Application /> : <Redirect to="/login" />
				)} />
			</Switch>
		</Router>
	);
}

export default App;
