import React from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, Divider } from 'ui-neumorphism';
import actions from '../../../actions';
import IState from '../../../interfaces/redux/state';
import spotifyIcon from '../../../images/Spotify_Icon_RGB_Green.png';
import youtubeIcon from '../../../images/youtube_icon.png';

const Playlists = ({
    match,
    connectedToSpotify,
}) => {



    const playlistService = match.params.service;
    const playlistId = match.params.id;
    console.log(playlistService);

    return (
        <React.Fragment>
            <Card className="view-card float-container flex-parent flex-column" inset rounded>
            <CardHeader>{playlistService.charAt(0).toUpperCase() + playlistService.slice(1)} Playlist {playlistId}</CardHeader>
            <div><Divider className="playlists-divider" dense /></div>
            
            </Card>
        </React.Fragment>
    )
}

const mapsStateToProps = (state: IState) => {
    return {
        connectedToSpotify: state.spotify.connected
    }
}

export default connect(mapsStateToProps, actions)(Playlists);