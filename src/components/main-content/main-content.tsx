import React, { useState } from 'react';
import { Card, Tab, Tabs, TabItem, TabItems} from 'ui-neumorphism';
import PlaylistView from '../playlist/playlist-view';
import LyricsView from '../lyrics/lyrics-view';

function MainContent() {
    const [active, setActive] = useState(0);

    const tabItems = (
      <TabItems className="tab flex-child" value={active} style={{height: "100%"}}>
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
            <Card className="main-content-card flex-parent flex-column" dark>
                <Tabs rounded value={active}>
                    <Tab dark onClick={()=> setActive(0)}>Playlist</Tab>
                    <Tab dark onClick={()=> setActive(1)}>Lyrics</Tab>
                </Tabs>
                {tabItems}
            </Card>
        </React.Fragment>
    );
}

export default MainContent;