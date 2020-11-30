import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PlaylistView from '../playlist/playlist-view';
import LyricsView from '../lyrics/lyrics-view';

function Maincontent() {
    return (
        <React.Fragment>
          <Router>
            <Switch>
              <Route path="/app/home">

              </Route>
              
              <Route path="/app/playlist">
                <PlaylistView/>
              </Route>

              <Route path="/app/lyrics">
                <LyricsView/>
              </Route>

              <Route path="/app/settings">

              </Route>

              <Route path="/app/search">

              </Route>

              <Route path="/app/" exact>
                <Redirect to="/app/lyrics"/>
              </Route>
            </Switch>
          </Router> 
        </React.Fragment>
    );
}

export default Maincontent;