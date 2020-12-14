import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Card } from 'ui-neumorphism';
import actions from '../../actions';
import YouTube from 'react-youtube';
import IState from '../../interfaces/redux/state';
import youtube from '../../youtube-player';

export const MediaFrame = ({
    isPlaying,
    currentlyPlaying,
    service,
    setCurrentMedia,
    pausePlay
}) => {
    const videoId = useRef("");

    const ytOptions: any = {
        playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 0,
            loop: 0,
            modestbranding: 1,
            playlist: null,
        }
    }

    const ytOnReady = (event) => {
        youtube.setPlayer(event.target);
        console.log("YouTube player ready");
        console.log(event.target);
        if (isPlaying) youtube.player.playVideo();
    }
    const ytOnEnd = (event) => {
        console.log("Video ended");
        if (isPlaying && currentlyPlaying.repeat === 0) {
            pausePlay(service);
        }
    }
    const ytOnState = (event) => {
        if (isPlaying) {
            youtube.player.playVideo();
        }
        const videoData = youtube.player.getVideoData();
        if (videoData.title && videoData.author && videoId.current !== currentlyPlaying.id) {
            videoId.current = currentlyPlaying.id;
            setCurrentMedia({
                title: videoData.title,
                album: {},
                artists: [{
                    name: videoData.author,
                }],
                duration: youtube.player.getDuration() * 1000,
            })
        }        
    }

    return (
        <Card elevation={2} className={`application-media-card media-container`}>
            
            
            <div className={`${service === 'youtube' ? 'media-video' : 'media-album'}`}>
                {service === 'spotify' && currentlyPlaying.album ? <img className="no-select" alt="" src={currentlyPlaying.album.images[0].url} /> : ''}
                <YouTube id="youtube-player" className={`media-youtube-player ${service !== 'youtube' ? 'hidden' : ''}`}
                    videoId={currentlyPlaying.service === 'youtube' ? currentlyPlaying.id : ''}
                    opts={ytOptions}
                    onReady={ytOnReady}
                    onEnd={ytOnEnd}
                    onStateChange={ytOnState}
                />
            </div>
        </Card>
    );
}

const mapStateToProps = (state: IState) => {
    return {
        isPlaying: state.media.isPlaying,
        currentlyPlaying: state.media.currentlyPlaying,
        service: state.media.currentlyPlaying.service
    }
}

export default connect(mapStateToProps, actions)(MediaFrame);