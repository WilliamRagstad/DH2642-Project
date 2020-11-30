import React from 'react';
import { Card, CardContent, CardHeader, Divider } from 'ui-neumorphism';

const HomeView = () => {
    return (
        <React.Fragment>
            <Card className="home-view-card" dark inset rounded>
                <CardHeader>
                    SoundBundle
                </CardHeader>
                <Divider dense/>
                <CardContent>
                    Hello and welcome to SoundBundle.<br/>
                    Here you can gather and make playlist from spotify and/or youtube.<br/>
                    You can even look at lyrics for a wide range of songs.
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default HomeView;