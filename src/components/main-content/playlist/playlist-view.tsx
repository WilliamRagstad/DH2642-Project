import React from 'react';
import { Card, CardHeader, CardContent, Table, Divider } from 'ui-neumorphism';

function createItem(title, artist, album, length) {
    return { title, artist, album, length };
}

const PlaylistView = () => {
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
            <Card className="playlist-view-card" dark inset rounded>
                <CardHeader>Playlist name</CardHeader>
                <Divider dense/>
                <CardContent>
                    <Table dark items={items} headers={headers}/>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default PlaylistView;