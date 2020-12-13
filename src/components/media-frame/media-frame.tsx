import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'ui-neumorphism';
import actions from '../../actions';
import YouTube from 'react-youtube';
import IState from '../../interfaces/redux/state';

export const MediaFrame = () => {
    const ytOptions: any = {
        width: "100%",
        height: "400px",
        playerVars: {
            autoplay: 1,
            controls: 1,
            disablekb: 0,
            loop: 0,
            modestbranding: 1,
            playlist: null,

        }
    }

    const ytOnReady = (event) => {
        console.log(event.target);
    }
    const ytOnEnd = (event) => {
        console.log(event.target);
        event.target.showVideoInfo()
    }

    return (
        <Card elevation={2} className="application-media-card media-container">
            
            {/* <img className="fill-element no-select" alt="" src={album.images[0].url} /> */}
            <YouTube id="youtube-player" className="media-youtube-player"
                videoId="dQw4w9WgXcQ"
                opts={ytOptions}
                onReady={ytOnReady}
                onEnd={ytOnEnd}
            />
        </Card>
    );
}

const mapStateToProps = (state: IState) => {
    return {
        currentlyPlaying: state.media.currentlyPlaying,
    }
}

export default connect(null, actions)(MediaFrame);