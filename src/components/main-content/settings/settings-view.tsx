import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, Divider, Tab, Tabs, TabItem, TabItems, Button, Switch, ToggleButtonGroup, ToggleButton, RadioGroup, Radio, IconButton, Dialog } from 'ui-neumorphism';
import SpotifyAuth from "../../spotify-auth/spotify-auth";
import { useDispatch } from 'react-redux';
import { signOut } from "../../../actions/login-actions";
import { disconnect } from '../../../actions/connect-actions';
import { IState } from '../../../interfaces';
import { applyThemePrimary, applyThemeDark, applyLanguage } from '../../../helpers/ui';

import { ReactComponent as CheckIcon } from '../../../images/check-24px.svg';
import { ReactComponent as CrossIcon } from '../../../images/close-24px.svg';
import { ReactComponent as LensIcon } from '../../../images/lens-24px.svg';
import { deleteFirestoreUserData } from '../../../helpers/firebase';

const SettingsView = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [dialogState, setDialogState] = useState({});

    const dispatch = useDispatch();
    const current_ui = useSelector((state: IState) => state.ui);

    const spotifyState = useSelector((state: IState) => state.spotify);

    // Helper functions
    function connectedText(guard, service) {
        return guard ?
            <span><CheckIcon fill="var(--success)" className="label-icon" />&nbsp;&nbsp;You are connected to {service}!</span> :
            <span><CrossIcon fill="var(--error)" className="label-icon" />&nbsp;&nbsp;You are not connected to {service}</span>
    }

    function disconnectButton(service: string, onDisconnect: ((event) => any)) {
        return <React.Fragment>
            <IconButton rounded onClick={() => setDialogState({ [service]: true })}><CrossIcon fill='var(--error)' /></IconButton>
            <Dialog visible={dialogState[service]} minWidth={300}>
                <Card className='pa-4'>
                    <CardHeader>Are you sure?</CardHeader>
                    <CardContent>
                        <p className="ma-v-16">Are you sure that you want to disconnect <b>{service}</b> <br /> from your services?</p>
                        <div className="setting-separated">
                            <Button onClick={e => {
                                setDialogState({ [service]: false });
                                onDisconnect(e);
                            }}>
                                <CrossIcon fill='var(--error)' />&nbsp;
                                                            Disconnect
                                                        </Button>
                            <Button onClick={() => setDialogState({ [service]: false })}>
                                <CheckIcon fill='var(--success)' />&nbsp;
                                                            Keep
                                                        </Button>
                        </div>
                    </CardContent>
                </Card>
            </Dialog>
        </React.Fragment>
    }


    return (
        <React.Fragment>
            <Card className="view-card float-container" inset rounded>
                <CardHeader>
                    Settings
                </CardHeader>
                <Tabs className="card-margin card-tabs-margin" rounded value={activeTab}>
                    <Tab onClick={() => setActiveTab(0)}>Preferences</Tab>
                    <Tab onClick={() => setActiveTab(1)}>Services</Tab>
                    <Tab onClick={() => setActiveTab(2)}>Account</Tab>
                    {/*<Tab onClick={() => setActiveTab(3)}>Privacy</Tab>*/}
                </Tabs>
                <Divider dense className="card-margin" />
                <TabItems className="tab flex-child" value={activeTab} style={{ height: "70vh" }}>
                    <TabItem className="tab-item float-container">
                        <Card className="float-item">
                            <CardHeader>Preferences</CardHeader>
                            <CardContent>
                                {/*<div className="setting-separated">
                                    Select language
                                    <RadioGroup vertical value={current_ui.language || 'en'} color='var(--primary)' className="radio-group" onChange={e => applyLanguage(e.value, current_ui)}>
                                        <Radio value='en' label='English' />
                                        <Radio value='se' label='Swedish' />
                                    </RadioGroup>
                                </div>*/}
                                <div className="setting-separated">
                                    Dark theme
                                    <Switch color='var(--primary)' checked={current_ui.theme.dark} onClick={e => applyThemeDark(e.target.checked, current_ui)} />
                                </div>
                                <div className="setting-separated">
                                    Primary color
                                    <ToggleButtonGroup mandatory value={current_ui.theme.primary}>
                                        <ToggleButton rounded value='blue' onClick={() => applyThemePrimary('blue', current_ui)}>
                                            <LensIcon fill="var(--theme-blue)" className="label-icon" />
                                        </ToggleButton>
                                        <ToggleButton rounded value='orange' onClick={() => applyThemePrimary('orange', current_ui)}>
                                            <LensIcon fill="var(--theme-orange)" className="label-icon" />
                                        </ToggleButton>
                                        <ToggleButton rounded value='green' onClick={() => applyThemePrimary('green', current_ui)}>
                                            <LensIcon fill="var(--theme-green)" className="label-icon" />
                                        </ToggleButton>
                                        <ToggleButton rounded value='red' onClick={() => applyThemePrimary('red', current_ui)}>
                                            <LensIcon fill="var(--theme-red)" className="label-icon" />
                                        </ToggleButton>
                                        <ToggleButton rounded value='pink' onClick={() => applyThemePrimary('pink', current_ui)}>
                                            <LensIcon fill="var(--theme-pink)" className="label-icon" />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </CardContent>
                        </Card>
                    </TabItem>
                    <TabItem className="tab-item float-container">
                        <Card className="float-item">
                            <CardHeader>Connect to Services</CardHeader>
                            <CardContent>
                                <div className="setting-separated">
                                    {connectedText(spotifyState.connected, "Spotify")}

                                    <div>
                                        <SpotifyAuth enabled={!spotifyState.connected} />
                                        {spotifyState.connected && disconnectButton("Spotify", () => {
                                            deleteFirestoreUserData("services", "spotify");
                                            dispatch(disconnect("SPOTIFY"));
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabItem>
                    <TabItem className="tab-item float-container">
                        <Card className="float-item card-margin-large">
                            <CardHeader>User</CardHeader>
                            <CardContent>
                                <Button rounded onClick={() => dispatch(signOut())}>Sign out</Button>
                            </CardContent>
                        </Card>
                        {/*<Card className="float-item">
                            <CardHeader>Access</CardHeader>
                        </Card>*/}
                    </TabItem>
                    {/*<TabItem className="tab-item float-container">
                        <Card className="float-item">
                            <CardHeader>Privacy Settings</CardHeader>
                        </Card>
                    </TabItem>*/}
                </TabItems>
            </Card>
        </React.Fragment>
    )
}

export default SettingsView;