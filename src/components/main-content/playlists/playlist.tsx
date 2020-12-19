import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader, Divider, Table, Button, IconButton, Subtitle2, Subtitle1, Caption } from 'ui-neumorphism';
import actions from '../../../actions';
import IState from '../../../interfaces/redux/state';
import spotifyIcon from '../../../images/Spotify_Icon_RGB_Green.png';
import youtubeIcon from '../../../images/youtube_icon.png';
import { PlayIcon, PauseIcon, TimeIcon } from '../../icons/icons';
import { songLength } from '../../../helpers/spotify';

const createItem = (title, artists, album, duration) => {
    return { title, artists, album, duration }
}

const Playlists = ({
    match,
    connectedToSpotify,
    activePlaylist,
    currentlyPlaying,
    isPlaying,
    getSpotifyPlaylist,
    pausePlay,
    playContext,
    
}) => {

    const playlistService = match.params.service;
    const playlistId = match.params.id;

    useEffect(() => {
        switch (playlistService) {
            case 'spotify':
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
            <Card className="view-card flex-parent flex-column" inset>
                <CardHeader className="playlist-header">
                    {playlistService === 'spotify' ? <img src={spotifyIcon} alt="" height="24px" /> : ''}
                    <span>{activePlaylist.name}</span>
                    <Button onClick={() => playContext(playlistService, {context: `playlist:${playlistId}`})} color='var(--primary)'>Play</Button>
                </CardHeader>
                <CardContent>
                    <Subtitle1>
                        {activePlaylist.description}
                    </Subtitle1>
                    <Subtitle2>
                        {'Created by ' + activePlaylist.owner.name}
                    </Subtitle2>
                </CardContent>
                <div><Divider className="playlists-divider" dense /></div>
                <div className="playlist-list flex-parent flex-column">
                    <div className="playlist-track playlist-track-captions flex-child">
                        <div className="playlist-track-action">
                        </div>
                        <div className="playlist-track-title">
                            <Caption>Title</Caption>
                        </div>
                        <div className="playlist-track-secondary"><Caption>Artist</Caption></div>
                        <div className="playlist-track-tertiary"><Caption>Album</Caption></div>
                        <div className="playlist-track-duration">
                            <TimeIcon fill="var(--g-text-color-light"/>
                        </div>
                    </div>
                    {activePlaylist.tracks ? (playlistService === 'spotify' ? activePlaylist.tracks.map(track => { return (
                            <div className={`playlist-track${track.id === currentlyPlaying.id && playlistService === currentlyPlaying.service ? ' playlist-track-active' : ''}`} key={ track.id }>
                                <div className="playlist-track-action">
                                    { track.id !== currentlyPlaying.id ?
                                    <IconButton className="playlist-track-play-context" size="small" rounded onClick={() => playContext(playlistService, {context: `playlist:${playlistId}`, offset: `track:${track.id}`})}>
                                        <PlayIcon fill='var(--g-text-color-light)'/>
                                    </IconButton> :
                                    <IconButton className="playlist-track-pauseplay" size="small" rounded onClick={() => pausePlay(playlistService)}>
                                        { isPlaying ? 
                                            <PauseIcon fill='var(--g-text-color-light)'/> :
                                            <PlayIcon fill='var(--g-text-color-light)'/>
                                        }
                                    </IconButton>
                                    }
                                </div>
                                <div className="playlist-track-title">{track.title}</div>
                                <div className="playlist-track-secondary">{track.artists.map((artist, index) => {
                                    return (index ? ', ' : '') + artist.name
                                })}</div>
                                <div className="playlist-track-tertiary">{track.album.name}</div>
                                <div className="playlist-track-duration">{songLength(track.duration)}</div>
                            </div>
                        )
                    }) : 'Empty playlist.') : 'Invalid service.'}
                </div>
            </Card>
        </React.Fragment>
    )
}

const mapsStateToProps = (state: IState) => {
    return {
        connectedToSpotify: state.spotify.connected,
        activePlaylist: state.media.playlists.active,
        currentlyPlaying: state.media.currentlyPlaying,
        isPlaying: state.media.isPlaying
    }
}

export default connect(mapsStateToProps, actions)(Playlists);