import React from 'react';
import { Card, Button } from 'ui-neumorphism';

const Sidebar = () => {
    return (
        <React.Fragment>
            <div className="navigation">
                <Card className="navigation-card" dark>
                    <Button dark>Home</Button>
                    <Button dark>Your library</Button>
                    <Button dark>Settings</Button>
                </Card>
            </div>
        </React.Fragment>
    );
}

export default Sidebar;