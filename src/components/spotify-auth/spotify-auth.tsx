import React from 'react';
import config from '../../spotify-config';

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const scopes = [
    'user-read-private',
    'user-read-email' 
]


const SpotifyAuth = () => {
    return (
        <React.Fragment>
            <h1>Login to Spotify</h1>
            <a href={`${authEndpoint}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>Login to Spotify</a>
        </React.Fragment>
    )
    
};

export default SpotifyAuth;