import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardHeader, CardContent, Table, Divider, CardMedia, Subtitle1, Subtitle2 } from 'ui-neumorphism';
import actions from '../../../actions';
import IState from '../../../interfaces/redux/state';
import soundBundleIcon from '../../../images/soundBundle.png';
import spotifyIcon from '../../../images/Spotify_Icon_RGB_Green.png';
import youtubeIcon from '../../../images/youtube_icon.png';
import { Link } from 'react-router-dom';

function createItem(title, artist, album, length) {
    return { title, artist, album, length };
}

const PlaylistsView = ({
    connectedToSpotify,
    spotifyPlaylists,
    getSpotifyPlaylists
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
                                <Link to="/app/playlists/mixed">
                                    <Button color="var(--primary)" text>Show All</Button>
                                </Link>
                            </div>
                            <Divider dense />
                            <div className="playlists-preview-container">
                            </div>

                        </div>
                        {connectedToSpotify ? <div className="playlists-category">
                            <div className="playlists-category-header">
                                <img src={spotifyIcon} alt="" height="24px" />
                                <span className="playlists-category-title">
                                    Spotify Playlists
                                </span>
                                <Link to="/app/playlists/spotify">
                                    <Button color="var(--primary)" text>Show All</Button>
                                </Link>
                            </div>
                            <Divider dense />
                            {(spotifyPlaylists !== undefined && spotifyPlaylists.length > 0) ? (
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
                            ) : ''}
                        </div> : ''}
                        {true ? <div className="playlists-category">
                            <div className="playlists-category-header">
                                <img src={youtubeIcon} alt="" height="24px" />
                                <span className="playlists-category-title">
                                    YouTube Playlists
                                </span>
                                <Link to="/app/playlists/youtube">
                                    <Button color="var(--primary)" text>Show All</Button>
                                </Link>
                            </div>
                            <Divider dense />
                            <div className="playlists-preview-container playlists-items">
                            </div>
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