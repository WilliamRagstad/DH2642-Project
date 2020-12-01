import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardContent, CardAction, CardHeader, Divider, TextField, ProgressLinear, Subtitle1, H4 } from 'ui-neumorphism';
import actions from '../../../actions';

const LyricsView = ({
    sameAsPlaying,
    currentLyrics,
    isLoading,
    lyricsError,
    setCurrentLyrics
}) => {    
    const [query, setQuery] = useState("");
    // search when user stops typing
    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            if (query) setCurrentLyrics(query, false);
        }, 500);
        
        return () => clearTimeout(typingTimeout);
    }, [query, setCurrentLyrics]);

    const { 
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
                        <Button onClick={() => setCurrentLyrics("See you again Wiz Khalifa", true)} dark depressed active={sameAsPlaying}>Currently playing</Button>
                        <span>OR</span>
                        <TextField dark bordered placeholder="Search for song..." className="lyrics-search-field" hideExtra onInput={e => setQuery((e.target as HTMLInputElement).value)} type="text"></TextField>
                    </div>
                {/* <Divider dense/> */}
                <ProgressLinear indeterminate={isLoading} color='var(--primary)' value={0} height={6}/>
                <CardContent className="lyrics-container">
                    
                    <Card className="float-item lyrics-content" dark>
                        <CardContent className="">
                            <H4>{title}</H4>
                            <Subtitle1 secondary style={{ marginBottom: '12px' }}>
                                {artist}
                            </Subtitle1>
                            {lyrics}
                        </CardContent>

                        { url ? <CardAction>
                            <Button text color='var(--primary)'>
                                <a href={url} rel="noreferrer" target="_blank">Source</a>
                            </Button>
                        </CardAction> : ""}
                    </Card>
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
        lyricsError: state.lyrics.lyricsError
    }
}

export default connect(mapStateToProps, actions)(LyricsView);