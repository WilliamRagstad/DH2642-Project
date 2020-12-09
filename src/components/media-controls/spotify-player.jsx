import React from 'react';
import Script from 'react-load-script';
import { connect, useDispatch } from 'react-redux';
import actions from '../../actions';
import { validateSpotifyToken } from '../../helpers/spotify';
import spotify from '../../spotify';

class SpotifyPlayer extends React.Component {

	constructor(props) {
		super(props);
		this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
		this.handleLoadFailure = this.handleLoadSuccess.bind(this);
		this.cb = this.cb.bind(this);
		this.dispatch = useDispatch;
	}

	componentDidMount() {
		window.onSpotifyWebPlaybackSDKReady = () => {
			this.handleLoadSuccess();
		};
	}

	handleLoadSuccess() {
		this.setState({ scriptLoaded: true });
		const token = this.props.spotifyData.access_token;
		validateSpotifyToken(this.props.spotifyData);
		
		spotify.setAccessToken(token);
		spotify.getMyCurrentPlayingTrack().then(console.log);
		this.props.getCurrentSpotifyData();

		const player = new window.Spotify.Player({
			name: 'SoundBundle Web Player',
			getOAuthToken: cb => { cb(token); }
		});

		// Error handling
		player.addListener('initialization_error', ({ message }) => { console.error(message); });
		player.addListener('authentication_error', ({ message }) => { console.error(message); });
		player.addListener('account_error', ({ message }) => { console.error(message); });
		player.addListener('playback_error', ({ message }) => { console.error(message); });

		// Playback status updates
		player.addListener('player_state_changed', state => {
			// console.log(state);
			setTimeout(() => {
				if (state) {
					if (state.position === 0) 
						this.props.getCurrentSpotifyData();
					this.props.setProgress(state.position);
					if (state.paused && this.props.mediaData.isPlaying) {
						this.props.setPaused();
					} else if (!state.paused && !this.props.mediaData.isPlaying) {
						this.props.setPlaying();
					}
					const track = state.track_window.current_track;
					if (track.id !== this.props.mediaData.currentlyPlaying.id) {
						let trackData = {
							service: 'spotify',
							id: track.id,
							title: track.name,
							album: {
								id: track.album.id,
								name: track.album.name,
								images: track.album.images
							},
							artists: [],
							duration: track.duration_ms,
						}
						track.artists.forEach(artist => {
							trackData.artists.push({
								id: artist.id,
								name: artist.name
							})
						})
						this.props.setCurrentMedia(trackData);
					}
				}
				else if (state === null) {
					spotify.transferMyPlayback([this.props.mediaData.spotifyDeviceId]);
				}
				
			}, 100);
		});

		// Ready
		player.addListener('ready', ({ device_id }) => {
			console.log('Ready with Device ID', device_id);
			this.props.setSpotifyDeviceId(device_id);
			setTimeout(() => {
				spotify.transferMyPlayback([device_id]);
			}, 1000);
		});

		// Not Ready
		player.addListener('not_ready', ({ device_id }) => {
			console.log('Device ID has gone offline', device_id);
		});

		// Connect to the player!
		player.connect();
	}

	cb(token) {
		return (token);
	}

	handleScriptCreate() {
		this.setState({ scriptLoaded: false });
		console.log("Script created");
	}

	handleScriptError() {
		this.setState({ scriptError: true });
		console.log("Script error");
	}

	handleScriptLoad() {
		this.setState({ scriptLoaded: true });
		console.log("Script loaded");
	}

	render() {
		return (
			<Script
				url="https://sdk.scdn.co/spotify-player.js"
				onCreate={this.handleScriptCreate.bind(this)}
				onError={this.handleScriptError.bind(this)}
				onLoad={this.handleScriptLoad.bind(this)}
			/>
		);
	}
}
const mapStateToProps = state => {
	return {
		spotifyData: state.spotify,
		mediaData: state.media

	}
}
export default connect(mapStateToProps, actions)(SpotifyPlayer);