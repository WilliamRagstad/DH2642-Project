import React from 'react';
import Spotify from "./spotify";

const Connect = ({ match, props, location }) => {
    const service = match.params.service;
    // console.log(match)
    // console.log(location)

    switch (service) {
        case "spotify":
            const data = location.hash.slice(1).split('&').reduce((obj, item) => {
                const i = item.split('=');
                return {
                    ...obj,                                     // Concat with result object
                    [i[0]]: !isNaN(i[1]) ? Number(i[1]) : i[1]  // Cast right hand side to a number if it is a raw number, else string
                }
            }, {});
            if (!data.access_token || !data.token_type || !data.expires_in) return <h1>Invalid service parameters</h1>;
            Spotify(data.access_token, data.token_type, data.expires_in);
            break;
    
        default:
            return <h1>No such service found.</h1>;
    }

    return <h1>You are connecting to {service}...</h1>;
}

export default Connect;