/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import config from '../../spotify-config';
import { Button } from 'ui-neumorphism';
import spotifyIcon from './Spotify_Icon_RGB_Green.png';

export const authEndpoint = 'https://accounts.spotify.com/authorize?';
const scopes = [
    'user-read-private',
    'user-read-email'
]

const SpotifyAuth = ({ enabled = true }) => {
    const url = authEndpoint + new URLSearchParams({
        client_id: config.client_id,
        response_type: "token",
        redirect_uri: encodeURI(config.redirect_uri),
        scope: scopes.join("%20"),
        show_dialog: "false"
    });
    return <a href={enabled ? url : null}>
        <Button size="large" rounded color="#1ed760" disabled={!enabled}><img alt="" height="24px" src={spotifyIcon} />&nbsp;&nbsp;Connect to spotify&nbsp;</Button>
    </a>
};

export default SpotifyAuth;