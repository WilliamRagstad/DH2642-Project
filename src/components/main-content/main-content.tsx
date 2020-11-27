import React from 'react';
import { Card, Divider, Tab, Tabs, TabItem, TabItems} from 'ui-neumorphism';

function Maincontent() {

    const tabItems = (
      <TabItems className="tab" value={0}>
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
                <Tabs rounded value={0}>
                    <Tab dark>Playlist</Tab>
                    <Tab dark>Lyrics</Tab>
                </Tabs>
                {tabItems}
            </Card>
        </React.Fragment>
    );
}

export default Maincontent;