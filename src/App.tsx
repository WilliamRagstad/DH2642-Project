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
	SpotifyAuth,
	Connect
} from './components';

import { increment, decrement } from "./actions/counter-actions";

import './App.css';
import './styles/sass/style.scss'
import { signOut } from "./actions/login-actions";

function App() {

	const counter = useSelector((state: any) => state.counterReducer);
	const isLoggedIn = useSelector((state: any) => state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty);
	const dispatch = useDispatch();

	return (
		<Router>
			<Switch>
				<Route path="/counters">
					<div className="flexparent">
						<Counter />
						<Card dark style={{width: "200px", padding: "5px"}}>
							<h1>Counter {counter}</h1>
							<Tooltip dark right inset content={<div>Decrease counter by 5</div>}>
								<Button dark style={{margin: "4px", float: "left"}} onClick={() => dispatch(decrement(5))}>-</Button>
							</Tooltip>
							<Tooltip dark left inset content={<div>Increase counter by 5</div>}>
								<Button dark style={{margin: "4px", float: "right"}} onClick={() => dispatch(increment(5))}>+</Button>
							</Tooltip>
						</Card>
					</div>
				</Route>


				<Route path="/login" render={() => (
					!isLoggedIn ? <Login /> : <Redirect to="/app"/>
				)}/>
				<Route path="/signup" render={() => (
					!isLoggedIn ? <Signup /> : <Redirect to="/app"/>
				)}/>
				<Route path="/spotify-auth">
					<SpotifyAuth />
				</Route>
				<Route path="/connect/:service([a-z]+)" component={Connect} />
				<Route path="/app"render={() => (
					isLoggedIn ? <Application /> : <Redirect to="/login"/>
				)}/>
				<Route path="/">
					<Redirect to="/login" />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
