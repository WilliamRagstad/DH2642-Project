import React, { useState } from 'react';
import { Button, Card, CardHeader, ProgressLinear, TextField, ToggleButton, ToggleButtonGroup, IconButton, Caption } from 'ui-neumorphism';
import actions from '../../../actions';
import { connect, useSelector } from 'react-redux';
import spotifyIcon from '../../../images/Spotify_Icon_RGB_Green.png';
import youtubeIcon from '../../../images/youtube_icon.png';
import { PlayIcon, PauseIcon, TimeIcon } from '../../icons/icons';
import { IState, ITrack, SearchService } from '../../../interfaces';
import { AppDocument } from '../../../lavastore';
import { isString } from 'util';

function searchServicesToArray(searchServices: SearchService) {
    const results = []
    Object.entries(SearchService).forEach(([key, value]: [string, string]) => {
        if (!isNaN(Number(key)) && (searchServices & Number(key))) {
            results.push(value.toLowerCase())
        }
    })
    return results;
}

const SearchView = ({
    isLoading,
    searchError,
    searchResults,
    searchTrack,
    currentlyPlaying,
    isPlaying,
    playContext,
    pausePlay
}) => {
    const [query, setQuery] = useState("");

    const [spotifyConnected, youtubeConnected] = useSelector((state: IState) => [state.spotify.connected, true]);

    let searchServices = (AppDocument.DocumentPath("cache/search")?.Get() as any)?.services as SearchService ?? SearchService.None;
    function toggleService(service: SearchService) {
        searchServices ^= service; // XOR Toggles a bit in a byte
        AppDocument.SetPath("cache/search", { services: searchServices });
    }

    return (
        <React.Fragment>
            <Card className="view-card float-container flex-parent flex-column" inset rounded>
                <CardHeader>Search</CardHeader>
                <div className="flex-parent flex-align-center search-form" spellCheck="false">
                    <form autoComplete="off" onClick={e => {
                        e.preventDefault();
                        if (query) searchTrack(searchServices, query);
                    }}>
                        <TextField bordered placeholder="Search for song..." className="search-field" hideExtra onInput={e => setQuery((e.target as HTMLInputElement).value.trim())} type="text"></TextField>

                        <input type="submit" hidden />
                    </form>
                    <ToggleButtonGroup multiple value={searchServicesToArray(searchServices)}>
                        <ToggleButton className="search-toggleButtons" value='spotify' disabled={!spotifyConnected} onClick={() => toggleService(SearchService.Spotify)}>
                            <img alt="" height="24px" src={spotifyIcon} />
                        </ToggleButton>
                        <ToggleButton className="search-toggleButtons" value='youtube' disabled={!youtubeConnected} onClick={() => toggleService(SearchService.YouTube)}>
                            <img alt="" height="24px" src={youtubeIcon} />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Button onClick={() => {
                        if (query) searchTrack(searchServices, query);
                    }}>Search</Button>
                </div>
                <ProgressLinear indeterminate={isLoading} color='var(--primary)' value={0} height={6} />
                <div className="playlist-list flex-parent flex-column">
                    {searchError ? searchError : ''}
                    {searchResults[0] ? <div className="playlist-track playlist-track-captions flex-child">
                        <div className="playlist-track-action">
                        </div>
                        <div className="playlist-track-title">
                            <Caption>Title</Caption>
                        </div>
                        <div className="playlist-track-secondary"><Caption>Artist</Caption></div>
                        <div className="playlist-track-tertiary"><Caption>Album</Caption></div>
                        <div className="playlist-track-quaternary"><Caption>Service</Caption></div>
                        <div className="playlist-track-duration">
                            <TimeIcon fill="var(--g-text-color-light" />
                        </div>
                    </div> : ''}
                    {searchResults ? searchResults.map((track: ITrack) => {
                        return (
                            <div className={`playlist-track${track.id === currentlyPlaying.id ? ' playlist-track-active' : ''}`} key={track.id}>
                                <div className="playlist-track-action">
                                    {track.id !== currentlyPlaying.id ?
                                        <IconButton className="playlist-track-play-context" size="small" rounded onClick={() => {
                                            let data = {};
                                            if (track.service === 'spotify') data = { uris: [`track:${track.id}`] };
                                            else if (track.service === 'youtube') data = { videoId: track.id };
                                            playContext(track.service, data)
                                        }}>
                                            <PlayIcon fill='var(--g-text-color-light)' />
                                        </IconButton> :
                                        <IconButton className="playlist-track-pauseplay" size="small" rounded onClick={() => pausePlay(currentlyPlaying.service)}>
                                            {isPlaying ?
                                                <PauseIcon fill='var(--g-text-color-light)' /> :
                                                <PlayIcon fill='var(--g-text-color-light)' />
                                            }
                                        </IconButton>
                                    }
                                </div>
                                <div className="playlist-track-title">{track.title}</div>
                                <div className="playlist-track-secondary">{track.artist}</div>
                                <div className="playlist-track-tertiary">{typeof track.album === 'string' ? track.album : <img src={track.album.url} height="30" />}</div>
                                <div className="playlist-track-quaternary">{
                                    track.service === 'spotify' ? <img alt="" height="20px" src={spotifyIcon} /> : <img alt="" height="20px" src={youtubeIcon} />
                                }</div>
                                <div className="playlist-track-duration">{track.length}</div>
                            </div>
                        )
                    }) : 'Invalid service.'}
                </div>
                {/* <CardContent>
                    {searchError && !isLoading ? <Card className="float-item">{searchError}</Card> : <Table className="float-item card-table search-table" items={searchResults} headers={headers} />}
                </CardContent> */}
            </Card>
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        isLoading: state.search.isLoading,
        searchError: state.search.searchError,
        searchResults: state.search.searchResults,
        currentlyPlaying: state.media.currentlyPlaying.id,
        isPlaying: state.media.isPlaying,
    }
}

export default connect(mapStateToProps, actions)(SearchView);