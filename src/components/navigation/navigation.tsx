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
    function color(activeNr) {
        if (active === activeNr) return 'var(--primary)';
        return 'var(--g-text-color-light)';
    }

    return (
        <React.Fragment>
            <Card className="navigation-card">
                <Link to="/app/home">
                    <Button rounded onClick={() => setActive(0)} active={active === 0} color={color(0)}><span className="button-icon-container"><HomeIcon fill={color(0)} />&nbsp;</span>Home</Button>
                </Link>
                <Divider dense />
                <Link to="/app/search">
                    <Button rounded onClick={() => setActive(1)} active={active === 1} color={color(1)}><span className="button-icon-container"><SearchIcon fill={color(1)} />&nbsp;</span>Search</Button>
                </Link>
                <Divider dense />
                <Link to="/app/playlist">
                    <Button rounded onClick={() => setActive(2)} active={active === 2} color={color(2)}><span className="button-icon-container"><PlaylistIcon fill={color(2)} />&nbsp;</span>Playlists</Button>
                </Link>
                <Divider dense />
                <Link to="/app/lyrics">
                    <Button rounded onClick={() => setActive(3)} active={active === 3} color={color(3)}><span className="button-icon-container"><LyricsIcon fill={color(3)} />&nbsp;</span>Lyrics</Button>
                </Link>
                <Divider dense />
                <Link to="/app/settings">
                    <Button rounded onClick={() => setActive(4)} active={active === 4} color={color(4)}><span className="button-icon-container"><SettingsIcon fill={color(4)} />&nbsp;</span>Settings</Button>
                </Link>
            </Card>
        </React.Fragment>
    );
}

export default Navigation;