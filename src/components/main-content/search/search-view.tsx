import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, ProgressLinear, Table, TextField, ToggleButton, ToggleButtonGroup } from 'ui-neumorphism';
import actions from '../../../actions';
import { connect } from 'react-redux';
import spotifyIcon from '../../../images/Spotify_Icon_RGB_Green.png';
import youtubeIcon from '../../../images/youtube_icon.png';

const SearchView = ({
    isLoading,
    searchError,
    searchResults,
    searchTrack
}) => {
    const [query, setQuery] = useState("");
    const [service, setService] = useState("");

    const headers = [
        { text: 'Title', align: 'left', value: 'title' },
        { text: 'Artist', align: 'right', value: 'artist' },
        { text: 'Album', align: 'right', value: 'album' },
        { text: 'Length', align: 'right', value: 'length' }
    ]

    return (
        <React.Fragment>
            <Card className="view-card float-container" inset rounded>
                <CardHeader>Search</CardHeader>
                <div className="flex-parent flex-align-center search-form" spellCheck="false">
                    <form autoComplete="off" onClick={e => {
                        e.preventDefault();
                        if (query) searchTrack(service, query);
                    }}>
                        <TextField bordered placeholder="Search for song..." className="search-field" hideExtra onInput={e => setQuery((e.target as HTMLInputElement).value.trim())} type="text"></TextField>

                        <input type="submit" hidden />
                    </form>
                    <ToggleButtonGroup multiple>
                        <ToggleButton className="search-toggleButtons" value='spotify' onClick={() => {
                            if (service === "youtube")
                                setService("both");
                            else if (service === "both")
                                setService("youtube");
                            else if (service === "spotify")
                                setService("");
                            else setService("spotify");
                        }}>
                            <img alt="" height="24px" src={spotifyIcon} />
                        </ToggleButton>
                        <ToggleButton className="search-toggleButtons" value='youtube' onClick={() => {
                            if (service === "spotify")
                                setService("both");
                            else if (service === "both")
                                setService("spotify");
                            else if (service === "youtube")
                                setService("");
                            else setService("youtube");
                        }}>
                            <img alt="" height="24px" src={youtubeIcon} />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Button onClick={() => {
                        if (query) searchTrack(service, query);
                    }}>Search</Button>
                </div>
                <ProgressLinear indeterminate={isLoading} color='var(--primary)' value={0} height={6} />
                <CardContent>
                    {searchError && !isLoading ? <Card className="float-item">{searchError}</Card> : <Table className="float-item card-table search-table" items={searchResults} headers={headers} />}
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        isLoading: state.search.isLoading,
        searchError: state.search.searchError,
        searchResults: state.search.searchResults,
    }
}

export default connect(mapStateToProps, actions)(SearchView);