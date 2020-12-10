import React from 'react';
import { BrowserRouter as Route, Switch, Redirect } from 'react-router-dom';
import HomeView from './home/home-view';
import PlaylistsView from './playlists/playlists-view';
import LyricsView from './lyrics/lyrics-view';
import SettingsView from "./settings/settings-view";
import SearchView from './search/search-view';

const MainContent = () => {
	return (
		<React.Fragment>
			<Switch>
				<Route path="/app/home">
					<HomeView />
				</Route>

				<Route path="/app/playlists">
					<PlaylistsView />
				</Route>

				<Route path="/app/playlist">
					
				</Route>

				<Route path="/app/lyrics">
					<LyricsView />
				</Route>

				<Route path="/app/settings">
					<SettingsView />
				</Route>

				<Route path="/app/search">
					<SearchView />
				</Route>

				<Route path="/app/" exact>
					<Redirect to="/app/home" />
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default MainContent;