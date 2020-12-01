import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, Divider, Tab, Tabs, TabItem, TabItems, Button, Switch, ToggleButtonGroup, ToggleButton, RadioGroup, Radio } from 'ui-neumorphism';
import SpotifyAuth from "../../spotify-auth/spotify-auth";
import { useDispatch } from 'react-redux';
import { signOut } from "../../../actions/login-actions";
import { IState } from '../../../interfaces';
import { applyPrimary } from '../../../helpers/ui';

import { ReactComponent as CheckIcon } from '../../../images/check-24px.svg';
import { ReactComponent as CrossIcon } from '../../../images/close-24px.svg';
import { ReactComponent as LensIcon } from '../../../images/lens-24px.svg';

function connectedText(guard, service) {
    return guard ?
        <span><CheckIcon fill="var(--success)" className="label-icon" /> You are connected to {service}!</span> :
        <span><CrossIcon fill="var(--error)" className="label-icon" /> You are not connected to {service}</span>
}

const SettingsView = () => {
    const [active, setActive] = useState(0);
    const dispatch = useDispatch();
    const spotifyConnected = useSelector((state: IState) => state.spotifyReducer.connected);
    const current_ui = useSelector((state: IState) => state.ui);

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
                    <TabItem className="tab-item float-container">
                        <Card className="float-item" dark>
                            <CardHeader>Preferences</CardHeader>
                            <CardContent>
                                <div className="setting-separated">
                                    Select language
                                    <RadioGroup vertical dark value='en' color='var(--primary)' className="radio-group">
                                        <Radio value='en' label='English' />
                                        <Radio value='se' label='Swedish' />
                                    </RadioGroup>
                                </div>
                                <div className="setting-separated">
                                    Dark theme
                                    <Switch dark color='var(--primary)' checked />
                                </div>
                                <div className="setting-separated">
                                    Primary color
                                    <ToggleButtonGroup mandatory dark value={current_ui.theme.primary}>
                                        <ToggleButton value='blue' onClick={() => applyPrimary('blue', current_ui)}>
                                            <LensIcon fill="var(--theme-blue)" className="label-icon" />
                                        </ToggleButton>
                                        <ToggleButton value='orange' onClick={() => applyPrimary('orange', current_ui)}>
                                            <LensIcon fill="var(--theme-orange)" className="label-icon" />
                                        </ToggleButton>
                                        <ToggleButton value='green' onClick={() => applyPrimary('green', current_ui)}>
                                            <LensIcon fill="var(--theme-green)" className="label-icon" />
                                        </ToggleButton>
                                        <ToggleButton value='red' onClick={() => applyPrimary('red', current_ui)}>
                                            <LensIcon fill="var(--theme-red)" className="label-icon" />
                                        </ToggleButton>
                                        <ToggleButton value='pink' onClick={() => applyPrimary('pink', current_ui)}>
                                            <LensIcon fill="var(--theme-pink)" className="label-icon" />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </CardContent>
                        </Card>
                    </TabItem>
                    <TabItem className="tab-item float-container">
                        <Card className="float-item" dark>
                            <CardHeader>Connect to Services</CardHeader>
                            <CardContent>
                                <div className="setting-separated">
                                    {connectedText(spotifyConnected, "Spotify")}
                                    <SpotifyAuth enabled={!spotifyConnected} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabItem>
                    <TabItem className="tab-item float-container">
                        <Card className="float-item card-margin-large" dark>
                            <CardHeader>User</CardHeader>
                            <CardContent>
                                <Button dark onClick={() => dispatch(signOut())}>Sign out</Button>
                            </CardContent>
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