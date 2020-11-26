import React from 'react';
import { Card, Button, Divider } from 'ui-neumorphism';

const Sidebar = () => {
    return (
        <React.Fragment>
            <div className="navigation">
                <Card className="navigation-card" dark>
                    <Button dark rounded>Home</Button>
                    <Divider dense/>
                    <Button dark rounded>Playlists</Button>
                    <Divider dense/>
                    <Button dark rounded>Settings</Button>
                </Card>
            </div>
        </React.Fragment>
    );
}

export default Sidebar;