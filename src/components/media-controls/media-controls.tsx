import React from 'react';
import SpotifyPlayer from './spotify-player';
import { IconButton, Card, Button, ProgressLinear, Subtitle2, Subtitle1, ToggleButton } from 'ui-neumorphism';
import IState from '../../interfaces/redux/state';
import { connect } from 'react-redux';
import actions from '../../actions';
import { PlayIcon, PauseIcon, NextIcon, PreviousIcon, ShuffleIcon, RepeatIcon, DevicesIcon } from '../../components/icons/icons';

const MediaControls = ({
    isLoggedIn,
    isConnectedToSpotify,
    mediaData,
    pausePlay,
    previous,
    next,
}) => {
    const service = mediaData.currentlyPlaying.service;

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
                        <ProgressLinear className="media-progress flex-child" value={50}></ProgressLinear>
                    </div>
                </div>
                <div className="media-controls-right flex-parent flex-align-center">
                        <Button>A button</Button>
                        <IconButton>
                            <DevicesIcon fill="var(--g-text-color-light)"/>
                        </IconButton>
                </div>
            </Card>
        </React.Fragment>        
    )
}

const mapStateToProps = (state: IState) => {
    return {
        isLoggedIn: state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty,
        isConnectedToSpotify: state.spotify.connected,
        mediaData: state.media
    }
}

export default connect(mapStateToProps, actions)(MediaControls);