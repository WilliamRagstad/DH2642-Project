import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
import { signOut } from "./actions/login-actions";

function App() {

	const counter = useSelector((state: any) => state.counterReducer);
	const dispatch = useDispatch();
	const isLogged = useSelector((state: any) => state.firebase.auth.uid);

	return (
		<Router>
			<Switch>
				<Route path="/login" render={() => (
					!isLogged ? <Login /> : <Redirect to="/"/>
				)}/>
				<Route path="/signup" render={() => (
					!isLogged ? <Signup /> : <Redirect to="/"/>
				)}/>
				<Route path="/spotify-auth">	
					<SpotifyAuth />
				</Route>
				<Route path="/">
					<div className="flexparent">
						{(isLogged) ? <Button dark onClick={() => {
							dispatch(signOut());
						}}>Sign out</Button> : <Redirect to="/login" />}
						<Counter />

						<Card dark style={{width: "200px", padding: "5px"}}>
							<h1>Counter {counter}</h1>
							<Tooltip dark left inset content={<div>Increase counter by 5</div>}>
								<Button dark style={{margin: "4px", float: "left"}} onClick={() => dispatch(increment(5))}>+</Button>
							</Tooltip>
							<Tooltip dark right inset content={<div>Decrease counter by 5</div>}>
								<Button dark style={{margin: "4px", float: "right"}} onClick={() => dispatch(decrement(5))}>-</Button>
							</Tooltip>
						</Card>
					</div>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
