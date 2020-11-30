import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Divider } from 'ui-neumorphism';
import { ReactComponent as SearchIcon } from '../../images/search-24px.svg';
import { ReactComponent as HomeIcon } from '../../images/home-24px.svg';
import { ReactComponent as SettingsIcon } from '../../images/settings-24px.svg';
import { ReactComponent as PlaylistIcon } from '../../images/playlist-24px.svg';
import { ReactComponent as LyricsIcon } from '../../images/lyrics-24px.svg';

const Navigation = () => {
    const [active, setActive] = useState(0);

    return (
        <React.Fragment>
            <Card className="navigation-card" dark>
                <Link to="/app/home">
                    <Button dark rounded onClick={() => setActive(0)} active={active === 0}><span className="button-icon-container"><HomeIcon fill="var(--light-bg)"/>&nbsp;</span>Home</Button>
                </Link>
                <Divider dense/>
                <Link to="/app/search">
                    <Button dark rounded onClick={() => setActive(1)} active={active === 1}><span className="button-icon-container"><SearchIcon fill="var(--light-bg)"/>&nbsp;</span>Search</Button>
                </Link>
                <Divider dense/>
                <Link to="/app/playlist">
                    <Button dark rounded onClick={() => setActive(2)} active={active === 2}><span className="button-icon-container"><PlaylistIcon fill="var(--light-bg)"/>&nbsp;</span>Playlists</Button>
                </Link>
                <Divider dense/>
                <Link to="/app/lyrics">
                    <Button dark rounded onClick={() => setActive(3)} active={active === 3}><span className="button-icon-container"><LyricsIcon fill="var(--light-bg)"/>&nbsp;</span>Lyrics</Button>
                </Link>
                <Divider dense/>
                <Link to="/app/settings">
                    <Button dark rounded onClick={() => setActive(4)} active={active === 4}><span className="button-icon-container"><SettingsIcon fill="var(--light-bg)"/>&nbsp;</span>Settings</Button>
                </Link>
            </Card>
        </React.Fragment>
    );
}

export default Navigation;