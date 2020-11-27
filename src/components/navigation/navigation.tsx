import React from 'react';
import { Card, Button, Divider } from 'ui-neumorphism';
import { ReactComponent as SearchIcon } from '../../images/search-24px.svg';
import { ReactComponent as HomeIcon } from '../../images/home-24px.svg';

const Navigation = () => {
    return (
        <React.Fragment>
            <Card className="navigation-card" dark>
                <Button dark rounded><span className="button-icon-container"><HomeIcon fill="var(--light-bg)"/>&nbsp;</span>Home</Button>
                <Button dark rounded><span className="button-icon-container"><SearchIcon fill="var(--light-bg)"/>&nbsp;</span>Search</Button>
                <Divider dense/>
                <Button dark rounded>Playlists</Button>
                <Divider dense/>
                <Button dark rounded>Settings</Button>
            </Card>
        </React.Fragment>
    );
}

export default Navigation;