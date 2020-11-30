import React, { useState } from 'react';
import { Card, Divider, Tab, Tabs, TabItem, TabItems} from 'ui-neumorphism';

function Maincontent() {
    const [active, setActive] = useState(0);

    const tabItems = (
      <TabItems className="tab" value={active}>
        <TabItem className="tab" dark>
          <Card className="main-content-card" dark rounded>
            <h1>Playlist name</h1>
            <Divider dense/>
            <p>Playlist items</p>
          </Card>
        </TabItem>
        <TabItem dark>
          <Card dark rounded>
            <h1>Song name</h1>
            <Divider dense/>
            <p>Song lyrics</p>
          </Card>
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