import React from 'react';
import SpotifyPlayer from './spotify-player';
import { Card } from 'ui-neumorphism';
import { useSelector } from 'react-redux';
import IState from '../../interfaces/redux/state';

const MediaControls = () => {

    const isLoggedIn = useSelector((state: IState) => state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty);
    const isConnectedToSpotify = useSelector((state: IState) => state.spotify.connected);

    return (
        <React.Fragment>
            <Card className="fill-element">
                {isLoggedIn && isConnectedToSpotify && <SpotifyPlayer/>}
            </Card>
        </React.Fragment>        
    )
}
export default MediaControls;