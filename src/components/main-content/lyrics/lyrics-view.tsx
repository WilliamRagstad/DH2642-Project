import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, Divider, TextField } from 'ui-neumorphism';

import { searchSong, getLyrics } from 'genius-lyrics-api';
import config from '../../../genius-config';

const options = {
    apiKey: config.cilent_access_token,
    title: '',
    artist: '',
    optimizeQuery: true
}
// searchSong(options)
//     .then(searchResult => {
//         console.log(`
//         ${searchResult[0].id}
//         ${searchResult[0].title}
//         ${searchResult[0].albumArt}`);
//         getLyrics(searchResult[0].url)
//         .then(lyrics => {
//             console.log(`${lyrics}`);
//         })
//         .catch(console.error);
        
//     })

const LyricsView = () => {
    
    const [query, setQuery] = useState("");

    // search when user stops typing
    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            console.log(typingTimeout + ": Searched " + query)
            // perform search here
        }, 300);
        
        return () => clearTimeout(typingTimeout);
    }, [query]);

    const text = (
        "It's been a long day without you, my friend\nAnd I'll tell you all about it when I see you again\nWe've come a long way from where we began\nOh, I'll tell you all about it when I see you again\nWhen I see you again\n\nDamn, who knew?\nAll the planes we flew, good things we been through\nThat I'd be standing right here talking to you\n'Bout another path, I know we loved to hit the road and laugh\nBut something told me that it wouldn't last\nHad to switch up, look at things different, see the bigger picture\nThose were the days, hard work forever pays\nNow I see you in a better place (see you in a better place)\nUh"
    );

    return (
        <React.Fragment>
            <Card className="lyrics-view-card flex-parent flex-column float-container" dark inset rounded>
                <CardHeader>Lyrics</CardHeader>
                <form onSubmit={e => {
                    e.preventDefault();
                    console.log("Lyrics form submitted")
                }}>
                    <div className="flex-parent flex-align-center lyrics-search-form" spellCheck="false">
                        <Button dark depressed active>Currently playing</Button>
                        <span>OR</span>
                            <TextField dark bordered placeholder="Search for song..." className="lyrics-search-field" hideExtra onInput={e => setQuery((e.target as HTMLInputElement).value)} type="text"></TextField>
                            <Button dark>Search</Button>
                    </div>
                    <input type="submit" hidden />
                </form>
                <Divider dense/>
                <CardContent className="lyrics-container">
                    <Card className="flex-child float-item" dark>
                        {text}
                    </Card>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default LyricsView;