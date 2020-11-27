import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { connect } from '../../actions/connect-actions';
import { ISpotify } from '../../interfaces';

const Connect = ({ match, props, location }) => {
    const service = match.params.service;
	const dispatch = useDispatch();
    // console.log(match)
    // console.log(location)

    switch (service) {
        case "spotify":
            const data: ISpotify = location.hash.slice(1).split('&').reduce((obj, item) => {
                const i = item.split('=');
                return {
                    ...obj,                                     // Concat with result object
                    [i[0]]: !isNaN(i[1]) ? Number(i[1]) : i[1]  // Cast right hand side to a number if it is a raw number, else string
                }
            }, {});
            if (!data.access_token || !data.token_type || !data.expires_in) return <h1>Invalid service parameters</h1>;
            dispatch(connect("SPOTIFY", data));
            break;
    
        default:
            return <h1>No such service found.</h1>;
    }

    return <Redirect to="/app"/>; // <h1>You are connecting to {service}...</h1>;
}

export default Connect;