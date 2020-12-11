import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader, Divider, Table, Button, IconButton } from 'ui-neumorphism';
import actions from '../../../actions';
import IState from '../../../interfaces/redux/state';
import spotifyIcon from '../../../images/Spotify_Icon_RGB_Green.png';
import youtubeIcon from '../../../images/youtube_icon.png';
import { PlayIcon } from '../../icons/icons';
import { songLength } from '../../../actions/search-actions';
import { Link } from 'react-router-dom';

const createItem = (title, artists, album, duration) => {
    return { title, artists, album, duration }
}

const Playlists = ({
    match,
    connectedToSpotify,
    activePlaylist,
    getSpotifyPlaylist
}) => {
    
    const playlistService = match.params.service;
    const playlistId = match.params.id;
    const tableHeaders = useRef(null);
    const tableItems = useRef(null);

    useEffect(() => {
        switch (playlistService) {
            case 'spotify':
                tableHeaders.current = [
                    {text: 'Title', value: 'title'},
                    {text: 'Artist', value: 'artist'},
                    {text: 'Album', value: 'album'},
                    {text: 'Length', value: 'duration'}
                ];
                if (!activePlaylist || playlistId !== activePlaylist.id) getSpotifyPlaylist(playlistId);
                break;
            default:
                break;
        }
    }, [playlistService, playlistId])

    const playPlaylist = (playlistService, playlistId) => {
        console.log('Playing');
    }

    return (
        <React.Fragment>
            <Card className="view-card float-container flex-parent flex-column" inset>
                <CardHeader className="playlist-header">
                    {playlistService === 'spotify' ? <img src={spotifyIcon} alt="" height="24px"/> : ''}
                    <span>{activePlaylist.name}</span>
                    <Button onClick={() => playPlaylist(playlistService, playlistId)} color='var(--primary)'>Play</Button>
                </CardHeader>
                <CardContent>
                    {activePlaylist.description + ' Created by ' + activePlaylist.owner.name}
                </CardContent>
                <div><Divider className="playlists-divider" dense /></div>
                <div className="playlist-list flex-child flex-parent flex-column">
                    {activePlaylist.tracks ? (playlistService === 'spotify' ? activePlaylist.tracks.map(track => { return (
                            <div className="playlist-track flex-child" key={ track.id }>
                                <div className="playlist-track-play">
                                    <IconButton size="small">
                                        <PlayIcon fill='var(--g-text-color-light)'/>
                                    </IconButton>
                                </div>
                                <div className="playlist-track-title">{ track.title }</div>
                                <div className="playlist-track-secondary">{ track.artists.map((artist, index) => {
                                    return (index ? ', ' : '') + artist.name
                                })}</div>
                                <div className="playlist-track-tertiary">{track.album.name}</div>
                                <div className="playlist-track-duration">{songLength(track.duration)}</div>
                            </div>
                    )}) : 'Empty playlist.') : 'Invalid service.'}
                </div>
            </Card>
        </React.Fragment>
    )
}

const mapsStateToProps = (state: IState) => {
    return {
        connectedToSpotify: state.spotify.connected,
        activePlaylist: state.media.playlists.active,
    }
}

export default connect(mapsStateToProps, actions)(Playlists);