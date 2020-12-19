import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardHeader, CardContent, Table, Divider, CardMedia, Subtitle1, Subtitle2 } from 'ui-neumorphism';
import actions from '../../../actions';
import IState from '../../../interfaces/redux/state';
import soundBundleIcon from '../../../images/soundBundle.png';
import spotifyIcon from '../../../images/Spotify_Icon_RGB_Green.png';
import youtubeIcon from '../../../images/youtube_icon.png';
import { Link } from 'react-router-dom';
import SpotifyAuth from '../../spotify-auth/spotify-auth';

function createItem(title, artist, album, length) {
    return { title, artist, album, length };
}

const PlaylistsView = ({
    connectedToSpotify,
    spotifyPlaylists,
    getSpotifyPlaylists,
    playContext
}) => {
    const headers = [
        { text: 'Title', align: 'left', value: 'title' },
        { text: 'Artist', align: 'right', value: 'artist' },
        { text: 'Album', align: 'right', value: 'album' },
        { text: 'Length', align: 'right', value: 'length' }
    ]

    const items = [
        createItem("song 1", "artist 1", "album 1", "length 1"),
        createItem("song 2", "artist 2", "album 2", "length 2")
    ]

    return (
        <React.Fragment>
            <Card className="view-card float-container flex-parent flex-column" inset rounded>
                <CardHeader>Playlists</CardHeader>
                <div><Divider className="playlists-divider" dense /></div>
                <div className="playlists-container">
                    <CardContent className="playlists-content flex-parent flex-column">
                        <div className="playlists-category">
                            <div className="playlists-category-header">
                                <img src={soundBundleIcon} alt="" height="24px" />
                                <span className="playlists-category-title">SoundBundle Mixed Playlists</span>
                                {false &&
                                    <Link to="/app/playlists/mixed">
                                        <Button color="var(--primary)" text>Show All</Button>
                                    </Link>}
                            </div>
                            <Divider dense />
                            Under construction.
                            <div className="playlists-preview-container">

                            </div>

                        </div>
                        <div className="playlists-category">
                            <div className="playlists-category-header">
                                <img src={spotifyIcon} alt="" height="24px" />
                                <span className="playlists-category-title">
                                    Spotify Playlists
                                </span>
                                {connectedToSpotify ?
                                    <Link to="/app/playlists/spotify">
                                        <Button color="var(--primary)" text>Show All</Button>
                                    </Link> : ''}
                            </div>
                            <Divider dense />
                            {connectedToSpotify ? (spotifyPlaylists !== undefined && spotifyPlaylists.length > 0) ? (
                                <div className="playlists-preview-container playlists-items">
                                    {spotifyPlaylists.map(playlist => (
                                        <Link key={playlist.id} to={`/app/playlists/spotify/${playlist.id}`} className="playlists-item">
                                            <img src={playlist.image} alt="" className="no-select" />
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
                            ) : '' : 'Connect to Spotify at Settings > Services to view Spotify playlists'
                            }
                        </div>
                        {true ? <div className="playlists-category">
                            <div className="playlists-category-header">
                                <img src={youtubeIcon} alt="" height="24px" />
                                <span className="playlists-category-title">
                                    YouTube Playlists
                                </span>
                                { /* <Link to="/app/playlists/youtube">
                                    <Button color="var(--primary)" text>Show All</Button>
                        </Link> */ }
                            </div>
                            <Divider dense />
                            Under construction. Video player can be tested with these examples:
                            <div className="playlists-preview-container playlists-items">

                            </div>
                            <Button onClick={() => {
                                playContext('youtube', { videoId: 'dQw4w9WgXcQ' })
                            }}>Test video 1</Button>
                            &nbsp;&nbsp;
                            <Button onClick={() => {
                                playContext('youtube', { videoId: 'kJQP7kiw5Fk' })
                            }}>Test video 2</Button>
                        </div> : ''}

                        {/* <Table className="float-item" items={items} headers={headers}/> */}
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

export default connect(mapsStateToProps, actions)(PlaylistsView);