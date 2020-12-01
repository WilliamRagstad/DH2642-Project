import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, Divider, Table, TextField } from 'ui-neumorphism';

function createItem(title, artist, album, length) {
    return { title, artist, album, length };
}

const SearchView = () => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            console.log(typingTimeout + ": Searched " + query)
            // perform search here
        }, 300);
        
        return () => clearTimeout(typingTimeout);
    }, [query]);

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
            <Card className="view-card float-container" dark inset rounded>
                <CardHeader>Search</CardHeader>
                <form onSubmit={e => {
                    e.preventDefault();
                    console.log("Search form submitted")
                }}>
                    <div className="flex-parent flex-align-center search-form" spellCheck="false">
                        <TextField dark bordered placeholder="Search for song..." className="search-field" hideExtra onInput={e => setQuery((e.target as HTMLInputElement).value)} type="text"></TextField>
                        <Button dark>Search</Button>
                    </div>
                    <input type="submit" hidden />
                </form>
                <Divider dense/>
                <CardContent>
                    <Table className="float-item" dark noHeaders items={items} headers={headers}/>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default SearchView;