/* eslint-disable react/jsx-no-target-blank */
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
            <div className="spotify-auth">
                <Card className="spotify-auth-card" dark>
                    <CardHeader>Login to Spotify</CardHeader>
                    <a href={`${authEndpoint}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>Login to Spotify</a>
                </Card>
            </div>
        </React.Fragment>
    )
    
};

export default SpotifyAuth;