import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardHeader, CardContent, Table, Divider, CardMedia, Subtitle1, Subtitle2, IconButton } from 'ui-neumorphism';
import actions from '../../../actions';
import IState from '../../../interfaces/redux/state';
import spotifyIcon from '../../../images/Spotify_Icon_RGB_Green.png';
import youtubeIcon from '../../../images/youtube_icon.png';
import { HomeIcon } from '../../icons/icons';
import { Redirect, Link } from 'react-router-dom';

const Playlists = ({
    match,
    connectedToSpotify,
    spotifyPlaylists,
    getSpotifyPlaylists
}) => {



    const playlistService = match.params.service;
    console.log(playlistService);

    return (
        <React.Fragment>
            <Card className="view-card float-container flex-parent flex-column" inset rounded>
            <CardHeader>{(playlistService === 'mixed') ? 'SoundBundle ' :(playlistService === 'spotify' && connectedToSpotify) ? 'Spotify ' : (playlistService === 'youtube') ? 'YouTube ' : <Redirect to="/app/playlists" />}Playlists</CardHeader>
            <div><Divider className="playlists-divider" dense /></div>
            <div className="playlists-container">
                <CardContent className="playlists-content flex-parent flex-column">
                    { (playlistService === 'spotify' && connectedToSpotify && spotifyPlaylists !== undefined && spotifyPlaylists.length > 0) ? (
                        <div className="playlists-container">
                        {spotifyPlaylists.map(playlist => (
                                <Link key={playlist.id} to={`/app/playlists/spotify/${playlist.id}`} className="playlists-item">
                                    <img src={playlist.image} alt=""/>
                                    <div className="playlists-item-text">
                                        <h4>
                                            {playlist.name}
                                        </h4>
                                        <p>
                                            Created by {playlist.owner.name}
                                        </p>
                                    </div>
                                </Link>
                        ))}
                        </div>
                    ) : ''}
                </CardContent>
            </div> 
            </Card>
        </React.Fragment>
    )
}

const mapsStateToProps = (state: IState) => {
    return {
        connectedToSpotify: state.spotify.connected,
        spotifyPlaylists: state.media.playlists.spotify,
    }
}

export default connect(mapsStateToProps, actions)(Playlists);