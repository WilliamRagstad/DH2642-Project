import React from 'react';

const Application = () => {
    return (
        <div className="application-container flex-parent flex-column">
            <div className="flex-child flex-parent">
                <div className="application-sidebar flex-parent flex-column">
                    <div className="application-navigation flex-child">
                        <Card inset bordered className="fill-element" dark></Card>
                    </div>
                    <div className="application-media-frame">
                        <img className="fill-element" alt="" src="https://i.ytimg.com/vi/vhl9wWLv2Yo/maxresdefault.jpg"/>
                    </div>
                </div>
                <div className="flex-child application-main">
                    <Card bordered className="fill-element" dark></Card>
                </div>
            </div>
            <div className="application-controls">
                <Card bordered className="fill-element" dark></Card>
            </div>
        </div>
    );
}

export default Application;