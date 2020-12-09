import React, { useState, useEffect } from 'react';
import SpotifyPlayer from './spotify-player';
import { IconButton, Card, ProgressLinear, Subtitle2, Subtitle1, ToggleButton } from 'ui-neumorphism';
import IState from '../../interfaces/redux/state';
import { connect } from 'react-redux';
import actions from '../../actions';
import { PlayIcon, PauseIcon, NextIcon, PreviousIcon, ShuffleIcon, RepeatIcon, DevicesIcon } from '../../components/icons/icons';
import spotify from '../../spotify';
import { validateSpotifyToken } from '../../helpers/spotify';
import { songLength } from '../../actions/search-actions';

const MediaControls = ({
    isLoggedIn,
    isConnectedToSpotify,
    mediaData,
    isPlaying,
    mediaProgress,
    mediaDuration,
    pausePlay,
    setPlaying,
    setProgress,
    getCurrentSpotifyData
}) => {
    const [barProgress, setBarProgress] = useState(0);
    const [progressTime, setProgressTime] = useState("0:00");
    const service = mediaData.currentlyPlaying.service;

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying) {
                setProgress(mediaProgress + 1000);
                setBarProgress((mediaProgress / mediaDuration) * 100);
                const time = songLength(mediaProgress);
                setProgressTime(time);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying, service, mediaProgress]);

    useEffect(() => {
        // window.addEventListener('nexttrack', () => {
        //     console.log("media next");
        //     next(service);
        // })
        // window.addEventListener('previoustrack', () => {
        //     console.log("media prev");
        //     previous(service);
        // })
        // window.addEventListener('pause', () => {
        //     console.log("media pause");
        //     pausePlay(service);
        // })
        // window.addEventListener('play', () => {
        //     console.log("media play");
        //     pausePlay(service);
        // })
        
    }, [])

    const next = async (service: string) => {
        switch (service) {
            case 'spotify':
                await validateSpotifyToken().then(() => {
                    spotify.skipToNext().then(() => {
                        console.log("Skipped to next");
                        if (!isPlaying) setPlaying();
                        setProgress(0);
                    }).catch(console.error);
                    setTimeout(() => {
                        console.log("later")
                        getCurrentMediaData(service);
                    }, 1000)
                }).catch(console.error);                
                
                break;
            default:
                console.error('Invalid service.');
                return;
        }
    }
    const previous = async (service: string) => {
        switch (service) {
            case 'spotify':
                await validateSpotifyToken().then(() => {
                    if (mediaProgress < 3000)
                        spotify.skipToPrevious()
                        .then(() => {
                            console.log("Skipped to next");
                            if (!isPlaying) setPlaying();
                            setProgress(0);
                        })
                        .catch(console.error);
                    else spotify.seek(0)
                        .then(response => {
                            setProgress(0);
                            console.log(response);
                        })
                    setTimeout(() => {
                        console.log("later")
                        getCurrentMediaData(service);
                    }, 1000)
                }).catch(console.error);                
                
                break;
            default:
                console.error('Invalid service.');
                return;
        }
    }
    const getCurrentMediaData = (service) => {
        switch (service) {
            case 'spotify':
                getCurrentSpotifyData();
                break;
            default:
                console.error('Invalid service.');
                return;
        }
    }


    return (
        <React.Fragment>
            {isLoggedIn && isConnectedToSpotify && <SpotifyPlayer />}
            <Card className="media-controls fill-element flex-parent">
                <div className="media-controls-left flex-parent flex-align-center">
                    <div>
                        <Subtitle1>{mediaData.currentlyPlaying.title}</Subtitle1>
                        
                        <Subtitle2>{mediaData.currentlyPlaying.artists.map(artist => <span key={artist.id}>{artist.name}&nbsp;</span>)}</Subtitle2>
                    </div>
                </div>
                <div className="media-controls-center flex-child">
                    <div className="media-controls-center-buttons">
                        <ToggleButton value='1'>
                            <ShuffleIcon fill="var(--g-text-color-light)"/>
                        </ToggleButton>
                        <IconButton disabled={!service} text={false} rounded size="small" onClick={() => {
                            previous(service);
                        }}>
                            <PreviousIcon fill="var(--g-text-color-light)"/>
                        </IconButton>
                        <IconButton disabled={!service} text={false} rounded size="large" onClick={() => {
                            pausePlay(service);
                        }}>{mediaData.isPlaying ? <PauseIcon fill="var(--g-text-color-light)"/> : <PlayIcon fill="var(--g-text-color-light)"/>}</IconButton>
                        <IconButton disabled={!service} text={false} rounded size="small" onClick={() => {
                            next(service);
                            
                        }}>
                            <NextIcon fill="var(--g-text-color-light)"/>
                        </IconButton>
                        <ToggleButton value='2'>
                            <RepeatIcon fill="var(--g-text-color-light)"/>
                        </ToggleButton>
                    </div>
                    <div className=" flex-parent flex-justify-space-evenly">
                        {progressTime}
                        <ProgressLinear className="media-progress flex-child" value={barProgress}></ProgressLinear>
                    </div>
                </div>
                <div className="media-controls-right flex-parent flex-align-center">
                        {/* <Button>A button</Button>
                        <IconButton>
                            <DevicesIcon fill="var(--g-text-color-light)"/>
                        </IconButton> */}
                </div>
            </Card>
        </React.Fragment>        
    )
}

const mapStateToProps = (state: IState) => {
    return {
        isLoggedIn: state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty,
        isConnectedToSpotify: state.spotify.connected,
        mediaData: state.media,
        isPlaying: state.media.isPlaying,
        mediaProgress: state.media.currentlyPlaying.progress,
        mediaDuration: state.media.currentlyPlaying.duration
    }
}

export default connect(mapStateToProps, actions)(MediaControls);