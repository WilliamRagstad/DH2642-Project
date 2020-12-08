import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, ProgressLinear, Table, TextField } from 'ui-neumorphism';
import actions from '../../../actions';
import { connect } from 'react-redux';

const SearchView = ({
    isLoading,
    searchError,
    searchResults,
    searchTrack
}) => {
    const [query, setQuery] = useState("");

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
                <form autoComplete="off" onSubmit={e => {
                    e.preventDefault();
                    if (query) searchTrack(query);
                }}>
                    <div className="flex-parent flex-align-center search-form" spellCheck="false">
                        <TextField bordered placeholder="Search for song..." className="search-field" hideExtra onInput={e => setQuery((e.target as HTMLInputElement).value.trim())} type="text"></TextField>
                        <Button onClick={() => {
                            if (query) searchTrack(query);
                        }}>Search</Button>
                    </div>
                    <input type="submit" hidden />
                </form>
                <ProgressLinear indeterminate={isLoading} color='var(--primary)' value={0} height={6}/>
                <CardContent>
                    <Table className="float-item" noHeaders items={searchResults} headers={headers}/>
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