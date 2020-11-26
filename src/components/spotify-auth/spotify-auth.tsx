/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import config from '../../spotify-config';
import { Button } from 'ui-neumorphism';
import spotifyIcon from './Spotify_Icon_RGB_Green.png';

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const scopes = [
    'user-read-private',
    'user-read-email' 
]


const SpotifyAuth = () => {
    return (
        <a href={`${authEndpoint}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>
            <Button size="large" rounded dark color="#1ed760"><img alt="" height="24px" src={spotifyIcon}/>&nbsp;&nbsp;Connect to spotify&nbsp;</Button>
        </a>
    )    
};

export default SpotifyAuth;