import React from 'react';
import config from '../../spotify-config';
import { Card, CardHeader } from 'ui-neumorphism'

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const scopes = [
    'user-read-private',
    'user-read-email' 
]


const SpotifyAuth = () => {
    return (
        <React.Fragment>
            <Card style={{margin: "5px", padding: "5px"}}>
                <CardHeader>Login to Spotify</CardHeader>
                <a href={`${authEndpoint}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>Login to Spotify</a>
            </Card>
        </React.Fragment>
    )
    
};

export default SpotifyAuth;