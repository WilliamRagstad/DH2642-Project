import React from 'react';
import { Card, Button, Divider } from 'ui-neumorphism';

const Navigation = () => {
    return (
        <React.Fragment>
            <Card className="navigation-card" dark>
                <Button dark rounded>Home</Button>
                <Divider dense/>
                <Button dark rounded>Playlists</Button>
                <Divider dense/>
                <Button dark rounded>Settings</Button>
            </Card>
        </React.Fragment>
    );
}

export default Navigation;