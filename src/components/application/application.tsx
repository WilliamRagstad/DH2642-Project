import React, { useEffect } from 'react';
import { Navigation } from '../index';
import { MainContent } from '../index';
import { Card } from 'ui-neumorphism';

const Application = () => {

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
			<div className="flex-child flex-parent">
				<div className="application-sidebar flex-parent flex-column" id="sidebar">
					<div className="application-navigation flex-child">
						<Navigation />
					</div>
					<div className="application-media">
						<Card inset dark className="application-media-card">
							<img className="fill-element" alt="" src="https://videoplayer.telvue.com/assets/placeholder_media_for_white_background-a025e5387e2313b21b205ed928e7419816588314b7bf740bf6bc660282663f97.png" />
						</Card>
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
				<Card className="fill-element" dark>
					
				</Card>
			</div>
		</div>
	);
}

export default Application;