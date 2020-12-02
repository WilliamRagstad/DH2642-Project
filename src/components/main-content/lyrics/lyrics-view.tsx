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
    setCurrentLyrics,
    getCurrentLyrics,
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
            <Card className="view-card flex-parent flex-column float-container" dark inset rounded>
                <CardHeader>Lyrics</CardHeader>
                    <div className="flex-parent flex-align-center lyrics-search-form" spellCheck="false">
                        <Button onClick={() => getCurrentLyrics()} dark depressed active={sameAsPlaying}>Currently playing</Button>
                        <span>OR</span>
                        <form onSubmit={e => {
                            e.preventDefault();
                            if (query) searchLyrics(query);
                        }}>
                            <TextField dark bordered placeholder="Search for song..." className="lyrics-search-field" hideExtra onInput={e => setQuery((e.target as HTMLInputElement).value.trim())} type="text"></TextField>
                        </form>
                        <Button dark onClick={() => {
                            if (query) searchLyrics(query);
                        }}>Search</Button>
                    </div>
                <ProgressLinear indeterminate={isLoading} color='var(--primary)' value={0} height={6}/>
                <CardContent className="lyrics-container">
                    { id ? 
                    <Card className="float-item lyrics-content" dark>
                        <CardHeader>
                            {title} { url ? <Button text color='var(--primary)'>
                                <a href={url} rel="noreferrer" target="_blank">Source</a>
                            </Button> : ""}
                            <Subtitle1 secondary>{artist}</Subtitle1>
                            {albumArtUrl ? <img alt="" src={albumArtUrl} height="100px"/> : ""}
                        </CardHeader>
                        <CardContent>
                            {lyricsError ?
                            <React.Fragment>
                                {lyricsError} &nbsp;
                                <Button depressed dark onClick={() => getCurrentLyrics()}>Reload</Button>
                            </React.Fragment>
                            : lyrics}
                        </CardContent>
                    </Card>
                    : searchResults.length >= 1 ? JSON.stringify(searchResults) : ""}
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