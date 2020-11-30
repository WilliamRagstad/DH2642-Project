import React, { useState } from 'react';
import { Card, Tab, Tabs, TabItem, TabItems} from 'ui-neumorphism';
import PlaylistView from '../playlist/playlist-view';
import LyricsView from '../lyrics/lyrics-view';

function Maincontent() {
    const [active, setActive] = useState(0);

    const tabItems = (
      <TabItems className="tab" value={active} style={{height: "85vh"}}>
        <TabItem className="tabitem">
          <PlaylistView/>
        </TabItem>
        <TabItem className="tabitem">
          <LyricsView/>
        </TabItem>
      </TabItems>
    );

    return (
        <React.Fragment>
            <Card className="main-content-card" dark>
                <Tabs rounded value={active}>
                    <Tab dark onClick={()=> setActive(0)}>Playlist</Tab>
                    <Tab dark onClick={()=> setActive(1)}>Lyrics</Tab>
                </Tabs>
                {tabItems}
            </Card>
        </React.Fragment>
    );
}

export default Maincontent;