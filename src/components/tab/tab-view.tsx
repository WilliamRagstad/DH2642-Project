import React, { useState } from 'react';
import { Card, Tab, Tabs, TabItem, TabItems} from 'ui-neumorphism';

function TabView() {
    const [active, setActive] = useState(0);

    const tabItems = (
      <TabItems className="tab flex-child" value={active} style={{height: "100%"}}>
        <TabItem className="tabitem">

        </TabItem>
        <TabItem className="tabitem">

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
        
    )
}

export default TabView;