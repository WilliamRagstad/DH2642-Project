import React, { useEffect } from 'react';
import { Navigation, MainContent, MediaControls, MediaFrame } from '../index';
import { Card } from 'ui-neumorphism';

// LOAD DATA FROM FIRESTORE
import FirestoreLoader from '../loaders/firestore-loader';
import { useSelector } from 'react-redux';
import IState from '../../interfaces/redux/state';

const Application = () => {
	const album = useSelector((state: IState) => state.media.currentlyPlaying.album)

	useEffect(() => {
		const dragbar = document.getElementById('dragbar');
		const sidebar = document.getElementById('sidebar');
		const drag = e => {
			window.getSelection().removeAllRanges();
			sidebar.style.flexBasis = (e.pageX - dragbar.offsetWidth / 2 - 20) + 'px';
		}
		dragbar.addEventListener('mousedown', () => {
			document.addEventListener('mousemove', drag);
		});
		window.addEventListener('mouseup', () => {
			document.removeEventListener('mousemove', drag);
		});
		return () => {
			dragbar.removeEventListener('mousedown', drag);
			window.removeEventListener('mouseup', drag);
		};
	});

	return (
		<div className="application-container flex-parent flex-column">
			<div className="flex-child flex-parent application-upper">
				<div className="application-sidebar flex-parent flex-column" id="sidebar">
					<div className="application-navigation flex-child">
						<Navigation />
					</div>
					<div className="application-media">
						<MediaFrame />
					</div>
				</div>
				<div className="application-drag-container">
					<div className="dragbar" id="dragbar"></div>
				</div>
				<div className="flex-child application-main">
					<MainContent />
				</div>
			</div>
			<div className="application-controls">
				<MediaControls />
			</div>
		</div>
	);
}

export default Application;