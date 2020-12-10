import React, { useState, useEffect, useRef } from 'react';
import SpotifyPlayer from './spotify-player';
import { IconButton, Card, ProgressLinear, Subtitle2, Subtitle1, ToggleButton } from 'ui-neumorphism';
import IState from '../../interfaces/redux/state';
import { connect } from 'react-redux';
import actions from '../../actions';
import { PlayIcon, PauseIcon, NextIcon, PreviousIcon, ShuffleIcon, RepeatIcon, RepeatOneIcon, DevicesIcon } from '../../components/icons/icons';
import spotify from '../../spotify';
import { validateSpotifyToken } from '../../helpers/spotify';
import { songLength } from '../../actions/search-actions';
import spotifyIcon from '../../images/Spotify_Icon_RGB_Green.png';

const MediaControls = ({
    isLoggedIn,
    isConnectedToSpotify,
    mediaData,
    isPlaying,
    mediaProgress,
    mediaDuration,
    service,
    shuffle,
    repeat,
    pausePlay,
    setPlaying,
    setProgress,
    getCurrentSpotifyData,
    seekMedia,
    setShuffle,
    toggleRepeat
}) => {
    const [barProgress, setBarProgress] = useState(0);
    const [progressTime, setProgressTime] = useState("0:00");
    const [progressTimeLeft, setProgressTimeLeft] = useState("-0:00");

    let barChanging = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying && !barChanging.current) {
                setProgress(mediaProgress + 1000);
                setBarProgress((mediaProgress / mediaDuration) * 100);
                setProgressTime(songLength(mediaProgress));
                setProgressTimeLeft("-" + songLength(mediaDuration - mediaProgress));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying, service, mediaProgress, barChanging]);

    useEffect(() => {
        const progressbar = document.getElementsByClassName('media-progress')[0];
        let progress = 0, proportion = 0;
        const changeProgress = e => {
            if (!barChanging.current) barChanging.current = true;
            let bounds = progressbar.getBoundingClientRect();
            let left = e.clientX - bounds.left;
            let right = bounds.right - e.clientX;
            proportion = (left / (left + right));
            if (proportion >= 0 && proportion < 1) {
                progress = (mediaDuration * (proportion * 100)) / 100;
                setProgressTime(songLength(progress));
                setProgressTimeLeft("-" + songLength(mediaDuration - progress));
                setBarProgress(proportion * 100);
            }
        }
        const moveProgress = e => {
            changeProgress(e);
        }
        const clickProgress = e => {
            changeProgress(e);
            document.addEventListener('mousemove', moveProgress);
        }
        const progressRelease = () => {
            if (barChanging.current) {
                barChanging.current = false;
                console.log('Seeked to ' + progress);
                setProgress(progress);
                seekMedia(Math.floor(progress));
            }
            document.removeEventListener('mousemove', moveProgress);
        }
        progressbar.addEventListener('mousedown', clickProgress);
        window.addEventListener('mouseup', progressRelease);
        return () => {
            progressbar.removeEventListener('mousedown', clickProgress);
            window.removeEventListener('mouseup', progressRelease);
        }
    }, [mediaDuration]);

    const next = async (service: string) => {
        switch (service) {
            case 'spotify':
                await validateSpotifyToken().then(() => {
                    spotify.skipToNext().then(() => {
                        console.log("Skipped to next");
                        if (!isPlaying) setPlaying();
                        setProgress(0);
                    }).catch(console.error);
                    // setTimeout(() => {
                    //     getCurrentMediaData(service);
                    // }, 1000)
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
                                console.log("Skipped to previous");
                                if (!isPlaying) setPlaying();
                                setProgress(0);
                            })
                            .catch(console.error);
                    else spotify.seek(0);
                    // setTimeout(() => {
                    //     getCurrentMediaData(service);
                    // }, 1000)
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
                        <Subtitle1 className="flex-parent flex-align-center">
                            {(service === 'spotify') && <img src={spotifyIcon} alt="" height="16px" />}&nbsp;
                            {mediaData.currentlyPlaying.title}
                        </Subtitle1>

                        <Subtitle2>{mediaData.currentlyPlaying.artists.map((artist, index) => <span key={`artist_${index}`}>{(index ? ', ' : '') + artist.name}</span>)}</Subtitle2>
                    </div>
                </div>
                <div className="media-controls-center flex-child">
                    <div className="media-controls-center-buttons flex-parent flex-align-center flex-justify-center">
                        <IconButton rounded active={shuffle} onClick={({ value, event }) => {
                            setShuffle(service, !shuffle);
                        }}>
                            <ShuffleIcon fill={shuffle ? 'var(--primary)' : 'var(--g-text-color-light)'} />
                        </IconButton>
                        <IconButton disabled={!service} text={false} rounded size="small" onClick={() => {
                            previous(service);
                        }}>
                            <PreviousIcon fill="var(--g-text-color-light)" />
                        </IconButton>
                        <IconButton disabled={!service} text={false} rounded size="large" onClick={() => {
                            pausePlay(service);
                        }}>{mediaData.isPlaying ? <PauseIcon fill="var(--g-text-color-light)" /> : <PlayIcon fill="var(--g-text-color-light)" />}</IconButton>
                        <IconButton disabled={!service} text={false} rounded size="small" onClick={() => {
                            next(service);

                        }}>
                            <NextIcon fill="var(--g-text-color-light)" />
                        </IconButton>
                        <IconButton rounded active={repeat} onClick={({ value, event }) => {
                            toggleRepeat(service, repeat);
                        }}>
                            {repeat > 1 ?
                                <RepeatOneIcon fill={repeat ? 'var(--primary)' : 'var(--g-text-color-light)'} /> :
                                <RepeatIcon fill={repeat ? 'var(--primary)' : 'var(--g-text-color-light)'} />}
                        </IconButton>
                    </div>
                    <div className="flex-parent flex-justify-center flex-align-center">
                        <div className="time-left">{progressTime}</div>
                        <ProgressLinear className={`media-progress flex-child ${!mediaData.currentlyPlaying.id ? 'disabled' : ''}`} value={barProgress}></ProgressLinear>
                        <div className="time-right">{progressTimeLeft}</div>
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
        mediaDuration: state.media.currentlyPlaying.duration,
        service: state.media.currentlyPlaying.service,
        shuffle: state.media.currentlyPlaying.shuffle,
        repeat: state.media.currentlyPlaying.repeat
    }
}

export default connect(mapStateToProps, actions)(MediaControls);