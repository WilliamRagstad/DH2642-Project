import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, Divider, TextField } from 'ui-neumorphism';

const SearchView = () => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            console.log(typingTimeout + ": Searched " + query)
            // perform search here
        }, 300);
        
        return () => clearTimeout(typingTimeout);
    }, [query]);

    return (
        <React.Fragment>
            <Card className="view-card float-container" dark inset rounded>
                <CardHeader>Search</CardHeader>
                <form onSubmit={e => {
                    e.preventDefault();
                    console.log("Search form submitted")
                }}>
                    <div className="flex-parent flex-align-center search-form" spellCheck="false">
                        <TextField dark bordered placeholder="Search for song..." className="search-field" hideExtra onInput={e => setQuery((e.target as HTMLInputElement).value)} type="text"></TextField>
                        <Button dark>Search</Button>
                    </div>
                    <input type="submit" hidden />
                </form>
                <Divider dense/>
                <CardContent>
                    <Card className="float-item" dark>
                        
                    </Card>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default SearchView;