import React from 'react';
import { Card, CardHeader, Divider } from 'ui-neumorphism';

const LyricsView = () => {
    const lyrics = (
        "It's been a long day without you, my friend\nAnd I'll tell you all about it when I see you again\nWe've come a long way from where we began\nOh, I'll tell you all about it when I see you again\nWhen I see you again\n\nDamn, who knew?\nAll the planes we flew, good things we been through\nThat I'd be standing right here talking to you\n'Bout another path, I know we loved to hit the road and laugh\nBut something told me that it wouldn't last\nHad to switch up, look at things different, see the bigger picture\nThose were the days, hard work forever pays\nNow I see you in a better place (see you in a better place)\nUh"
    );

    return (
        <React.Fragment>
            <Card className="lyrics-view-card" dark inset rounded>
                <CardHeader>Song name</CardHeader>
                <Divider dense/>
                <Card className="lyrics-container" dark>
                    {lyrics}
                </Card>
            </Card>
        </React.Fragment>
    )
}

export default LyricsView;