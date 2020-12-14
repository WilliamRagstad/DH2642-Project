import React, { useState, useEffect, useRef } from 'react';
import SpotifyPlayer from './spotify-player';
import { IconButton, Card, ProgressLinear, Subtitle2, Subtitle1 } from 'ui-neumorphism';
import IState from '../../interfaces/redux/state';
import { connect } from 'react-redux';
import actions from '../../actions';
import { PlayIcon, PauseIcon, NextIcon, PreviousIcon, ShuffleIcon, RepeatIcon, RepeatOneIcon } from '../../components/icons/icons';
import spotify from '../../spotify';
import { validateSpotifyToken } from '../../helpers/spotify';
import { songLength } from '../../actions/search-actions';
import spotifyIcon from '../../images/Spotify_Icon_RGB_Green.png';
import youtubeIcon from '../../images/youtube_icon.png';
import { ReactComponent as VolumeUpIcon } from "../../images/volume_up-24px.svg";
import { ReactComponent as VolumeDownIcon } from "../../images/volume_down-24px.svg";
import { ReactComponent as VolumeOffIcon } from "../../images/volume_off-24px.svg";
import { ReactComponent as VolumeMuteIcon } from "../../images/volume_mute-24px.svg";
import youtube from '../../youtube-player';

const MediaControls = ({
    isLoggedIn,
    isConnectedToSpotify,
    spotifyToken,
    mediaData,
    isPlaying,
    mediaProgress,
    mediaDuration,
    service,
    shuffle,
    repeat,
    volume,
    pausePlay,
    setPlaying,
    setProgress,
    getCurrentSpotifyData,
    seekMedia,
    setShuffle,
    toggleRepeat,
    setVolume
}) => {
    const [barProgress, setBarProgress] = useState(0);
    const [barVolume, setBarVolume] = useState(volume); // %
    const [mainVolume, setMainVolume] = useState(volume);
    const [progressTime, setProgressTime] = useState("0:00");
    const [progressTimeLeft, setProgressTimeLeft] = useState("-0:00");

    let barChanging = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying && !barChanging.current) {
                if (service === 'spotify') {
                    setProgress(mediaProgress + 1000);
                    setBarProgress((mediaProgress / mediaDuration) * 100);
                    setProgressTime(songLength(mediaProgress));
                    setProgressTimeLeft("-" + songLength(mediaDuration - mediaProgress));
                }
                if (service === 'youtube') {
                    const ytTime = youtube.player.getMediaReferenceTime() * 1000;
                    const ytDuration = mediaDuration;
                    setProgress(ytTime)
                    setBarProgress((ytTime / ytDuration) * 100);
                    setProgressTime(songLength(ytTime));
                    setProgressTimeLeft("-" + songLength(ytDuration - ytTime));
                }
            }
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, service, mediaProgress, barChanging, mediaDuration]);

    useEffect(() => {
        const progressbar = document.getElementsByClassName('media-progress')[0];
        let progress = 0, proportion = 0;
        const changeProgress = e => {
            if (!barChanging.current) barChanging.current = true;
            let bounds = progressbar.getBoundingClientRect();
            let left = e.clientX - bounds.left;
            let right = bounds.right - e.clientX;
            proportion = (left / (left + right));
            if (proportion >= 0 && proportion <= 1) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mediaDuration]);

    useEffect(() => {
        const volumeBar = document.getElementsByClassName('media-volume')[0];
        let volumeValue = 0, proportion = 0, volumeChanging = false;
        const changeVolume = e => {
            if (!volumeChanging) volumeChanging = true;
            let bounds = volumeBar.getBoundingClientRect();
            let left = e.clientX - bounds.left;
            let right = bounds.right - e.clientX;
            proportion = (left / (left + right));
            if (proportion >= 0 && proportion <= 1) {
                volumeValue = Math.round(proportion * 100);
                setBarVolume(volumeValue);
                setMainVolume(volumeValue);
            }
        }
        const moveVolume = e => {
            changeVolume(e);
        }
        const clickVolume = e => {
            changeVolume(e);
            document.addEventListener('mousemove', moveVolume);
        }
        const volumeRelease = () => {
            if (volumeChanging) {
                volumeChanging = false;
                setBarVolume(volumeValue);
                setVolume(volumeValue);
            }
            document.removeEventListener('mousemove', moveVolume);
        }
        volumeBar.addEventListener('mousedown', clickVolume);
        window.addEventListener('mouseup', volumeRelease);
        return () => {
            volumeBar.removeEventListener('mousedown', clickVolume);
            window.removeEventListener('mouseup', volumeRelease);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mute = () => {
        if (barVolume <= 1) {
            setBarVolume(mainVolume);
            setVolume(mainVolume);
        } else {
            setBarVolume(0);
            setVolume(0);
        }
    }

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
    // const getCurrentMediaData = (service) => {
    //     switch (service) {
    //         case 'spotify':
    //             getCurrentSpotifyData();
    //             break;
    //         default:
    //             console.error('Invalid service.');
    //             return;
    //     }
    // }

    return (
        <React.Fragment>
            {isLoggedIn && isConnectedToSpotify && <SpotifyPlayer />}
            <Card className="media-controls fill-element flex-parent">
                <div className="media-controls-left flex-parent flex-align-center">
                    <img className="service-icon" src={(service === 'spotify') ? spotifyIcon : (service === 'youtube' ? youtubeIcon : '')} alt="" height="16px" />
                    <div>
                        <Subtitle1 className="flex-parent flex-align-center">
                           
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
                        <IconButton rounded active={repeat > 0} onClick={({ value, event }) => {
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
                    <IconButton rounded size="small" onClick={() => mute()} className="volume-icon">{
                        barVolume > 60 ? <VolumeUpIcon fill='var(--g-text-color-light)' /> : (
                            barVolume > 20 ? <VolumeDownIcon fill='var(--g-text-color-light)' /> : (
                                barVolume > 1 ? <VolumeMuteIcon fill='var(--g-text-color-light)' /> : <VolumeOffIcon fill='var(--g-text-color-light)' />
                            )
                        )
                    }</IconButton>
                    <ProgressLinear className="media-volume flex-child" value={barVolume}></ProgressLinear>
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
        spotifyToken: state.spotify.access_token,
        mediaData: state.media,
        isPlaying: state.media.isPlaying,
        mediaProgress: state.media.currentlyPlaying.progress,
        mediaDuration: state.media.currentlyPlaying.duration,
        service: state.media.currentlyPlaying.service,
        shuffle: state.media.currentlyPlaying.shuffle,
        repeat: state.media.currentlyPlaying.repeat,
        volume: state.media.currentlyPlaying.volume
    }
}

export default connect(mapStateToProps, actions)(MediaControls);