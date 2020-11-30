import React, { useState } from 'react';
import { Card, Button, Divider } from 'ui-neumorphism';
import { ReactComponent as SearchIcon } from '../../images/search-24px.svg';
import { ReactComponent as HomeIcon } from '../../images/home-24px.svg';

const Navigation = () => {
    const [active, setActive] = useState(0);

    return (
        <React.Fragment>
            <Card className="navigation-card" dark>
                <Button dark rounded onClick={() => setActive(0)} active={active == 0}><span className="button-icon-container"><HomeIcon fill="var(--light-bg)"/>&nbsp;</span>Home</Button>
                <Divider dense/>
                <Button dark rounded onClick={() => setActive(1)} active={active == 1}><span className="button-icon-container"><SearchIcon fill="var(--light-bg)"/>&nbsp;</span>Search</Button>
                <Divider dense/>
                <Button dark rounded onClick={() => setActive(2)} active={active == 2}>Playlists</Button>
                <Divider dense/>
                <Button dark rounded onClick={() => setActive(3)} active={active == 3}>Settings</Button>
            </Card>
        </React.Fragment>
    );
}

export default Navigation;