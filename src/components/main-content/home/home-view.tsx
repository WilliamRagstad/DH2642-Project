import React from 'react';
import { Card, CardContent, CardHeader, Divider } from 'ui-neumorphism';
import soundbundleIcon from '../../../images/soundBundle.png';

const HomeView = () => {
    return (
        <React.Fragment>
            <Card className="view-card flex-parent flex-column float-container" inset rounded>
                <CardHeader>
                    SoundBundle
                </CardHeader>
                <Divider dense/>
                <CardContent className="home-container">
                    <Card className="home-view-card float-item">
                        <CardHeader className="home-view-card-header">
                            <img className="home-img" src={soundbundleIcon} alt={""}/>
                            <h5>Welcome to Soundbundle, a streaming platform for collecting music from various sources.</h5>
                        </CardHeader>
                        <Divider dense/>
                        <CardContent>
                            <h2>About</h2>
                            <p>
                                SoundBundle is our DH2642 HT20-1 Interaktionsprogrammering och dynamiska webben project, 
                                which is an neumorphic web app providing a platform for searching and listening to music 
                                from various sources with full support for lyrics.
                                <br/><br/>
                                Read more in our <a rel="noreferrer" href="https://docs.google.com/document/d/1utB0_hyB3Sd4W2NWbWYI2HrTHzZCfNOXKaQLORdG7q4/edit?usp=sharing" target="_blank">project specification</a>
                            </p>
                            <Divider dense/>
                            <h2>Features</h2>
                            <ul>
                                <li>Modern and minimalistic design</li>
                                <li>High usability</li>
                                <li>Support for the latest services</li>
                                <li>Robust TypeScript codebase</li>
                            </ul>
                            <Divider dense/>
                            <h2>Page explanation</h2>
                            <div className="page-container">
                                <h3>Home</h3>
                                <p>
                                    This is where you are now, use the buttons to the left and you can then navigate to different pages.
                                </p>
                                <h3>Search</h3>
                                <p>
                                    Here you can search for songs from various sources,
                                    just choose a service and input a query to search.
                                </p>
                                <h3>Playlists</h3>
                                <p>
                                    This is where you can view your playlists from different services 
                                    and also make playlists mixing tracks from different services into one.
                                </p>
                                <h3>Lyrics</h3>
                                <p>
                                    This page is where you can find lyrics for songs.
                                    You can either view lyrics for the song you are currently playing 
                                    or search for a different songs lyrics.
                                </p>
                                <h3>Settings</h3>
                                <p>
                                    Here you can change settings for the website. You can find visual settings and user settings here, 
                                    this is also where you connect to services such as spotify. 
                                    <br/>
                                    IMPORTANT: you need a spotify premium account to be able to connect to spotify. 
                                </p>
                            </div>
                            
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default HomeView;