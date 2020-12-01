import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, Divider, Tab, Tabs, TabItem, TabItems } from 'ui-neumorphism';
import SpotifyAuth from "../../spotify-auth/spotify-auth";
import { IState } from '../../../interfaces';

const SettingsView = () => {
    const [active, setActive] = useState(0);
    const spotifyConnected = useSelector((state: IState) => state.spotifyReducer.connected);

    return (
        <React.Fragment>
            <Card className="view-card float-container" dark inset rounded>
                <CardHeader>
                    Settings
                </CardHeader>
                <Tabs className="card-margin" rounded value={active}>
                    <Tab dark onClick={() => setActive(0)}>Preferences</Tab>
                    <Tab dark onClick={() => setActive(1)}>Services</Tab>
                    <Tab dark onClick={() => setActive(2)}>Account</Tab>
                    <Tab dark onClick={() => setActive(3)}>Privacy</Tab>
                </Tabs>
                <Divider dense className="card-margin" />
                <TabItems className="tab flex-child" value={active} style={{ height: "100%" }}>
                    <TabItem className="tab-item">
                        <Card className="float-item" dark>
                            <CardHeader>Preferences</CardHeader>
                            <CardContent>
                                Select language:
                            </CardContent>
                        </Card>
                    </TabItem>
                    <TabItem className="tab-item float-container">
                        <Card className="float-item" dark>
                            <CardHeader>Connect to Services</CardHeader>
                            <CardContent>
                                <div className="setting-separated">
                                    <p>{spotifyConnected ? "✔️ You are connected to spotify!" : "❌ You are not connected to spotify."}</p>
                                    <SpotifyAuth />
                                </div>
                            </CardContent>
                        </Card>
                    </TabItem>
                    <TabItem className="tab-item float-container">
                        <Card className="float-item card-margin-large" dark>
                            <CardHeader>User</CardHeader>
                        </Card>
                        <Card className="float-item" dark>
                            <CardHeader>Access</CardHeader>
                        </Card>
                    </TabItem>
                    <TabItem className="tab-item float-container">
                        <Card className="float-item" dark>
                            <CardHeader>Privacy Settings</CardHeader>
                        </Card>
                    </TabItem>
                </TabItems>
            </Card>
        </React.Fragment>
    )
}

export default SettingsView;