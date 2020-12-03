import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardContent, CardHeader, TextField, ProgressLinear, Subtitle1 } from 'ui-neumorphism';
import actions from '../../../actions';

const LyricsView = ({
    sameAsPlaying,
    currentLyrics,
    isLoading,
    lyricsError,
    searchResults,
    getCurrentLyrics,
    getLyricsFromId,
    searchLyrics
}) => {    
    const [query, setQuery] = useState("");
    // search when user stops typing
    // useEffect(() => {
    //     const typingTimeout = setTimeout(() => {
    //         // if (query) setCurrentLyrics(query, false);
    //     }, 500);
        
    //     return () => clearTimeout(typingTimeout);
    // }, [query, setCurrentLyrics]);

    const {
        id,
        title,
        artist,
        url,
        albumArtUrl,
        lyrics
    } = currentLyrics;

    return (
        <React.Fragment>
            <Card className="view-card flex-parent flex-column float-container" inset rounded>
                <CardHeader>Lyrics</CardHeader>
                    <div className="flex-parent flex-align-center lyrics-search-form" spellCheck="false">
                        <Button onClick={() => getCurrentLyrics()} depressed active={sameAsPlaying}>Currently playing</Button>
                        <span>OR</span>
                        <form autoComplete="off" onSubmit={e => {
                            e.preventDefault();
                            if (query) searchLyrics(query);
                        }}>
                            <TextField bordered placeholder="Search for song..." className="lyrics-search-field" hideExtra onInput={e => setQuery((e.target as HTMLInputElement).value.trim())} type="text"></TextField>
                        </form>
                        <Button onClick={() => {
                            if (query) searchLyrics(query);
                        }}>Search</Button>
                    </div>
                <ProgressLinear indeterminate={isLoading} color='var(--primary)' value={0} height={6}/>
                <CardContent className="lyrics-container">
                    { id ? 
                    <Card className="float-item lyrics-content">
                        <CardHeader>
                            {title} { url ? <Button text color='var(--primary)'>
                                <a href={url} rel="noreferrer" target="_blank">Source</a>
                            </Button> : ""}
                            <Subtitle1 secondary>{artist}</Subtitle1>
                        </CardHeader>
                        <CardContent>
                            {lyricsError && !isLoading ?
                            <React.Fragment>
                                {lyricsError} &nbsp;
                                <Button depressed onClick={() => getLyricsFromId(id)}>Reload</Button>
                            </React.Fragment>
                            : lyrics}
                        </CardContent>
                    </Card>
                    : searchResults.length >= 1 && 
                    <div className="lyrics-result-container flex-parent">
                        {searchResults.map(song => (
                                <div key={song.id} onClick={() => getLyricsFromId(song.id)} className="lyrics-result-item">
                                    <img src={song.albumArtUrl} alt=""/>
                                    <div className="lyrics-result-text">
                                        <h4 className="title"><span>{song.title}</span></h4>
                                        <p><span>{song.artist}</span></p>
                                    </div>                                    
                                </div>
                            )
                        )}
                    </div>
                    }
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        sameAsPlaying: state.lyrics.sameAsPlaying,
        currentLyrics: state.lyrics.currentLyrics,
        isLoading: state.lyrics.isLoading,
        lyricsError: state.lyrics.lyricsError,
        searchResults: state.lyrics.searchResults
    }
}

export default connect(mapStateToProps, actions)(LyricsView);