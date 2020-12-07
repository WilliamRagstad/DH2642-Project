import React, { useEffect, useState } from 'react';
import config from '../../spotify-config';
import { Button } from 'ui-neumorphism';
import spotifyIcon from './Spotify_Icon_RGB_Green.png';
import { LSDocument } from 'lavastore';

export const authEndpoint = 'https://accounts.spotify.com/authorize?';
const scopes = [
    'user-read-private',
    'user-read-email',
    'streaming'
]

const dec2hex = dec => {
    return ("0" + dec.toString(16).substr(-2))
}
const generateCodeVerifier = () => {
    let array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
}
const sha256 = plain => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
}
const base64urlencode = a => {
    let str = "";
    let bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}
const generateCodeChallengeFromVerifier = async v => {
    let hashed = await sha256(v);
    let base64encoded = base64urlencode(hashed);
    return base64encoded;
}

const SpotifyAuth = ({ enabled = true }) => {
    const [challenge, setChallenge] = useState(null);
    useEffect(() => {
        const v = generateCodeVerifier();
        const sd = new LSDocument('spotify-verifier');

        console.log("Set v: " + v);
        generateCodeChallengeFromVerifier(v)
            .then(ch => {
                setChallenge(ch)
                console.log(ch);
                sd.Set({
                    verifier: v,
                    challenge: ch
                })
            })
    }, [])

    const url = authEndpoint + new URLSearchParams({
        client_id: config.client_id,
        response_type: "code",
        redirect_uri: config.redirect_uri,
        code_challenge_method: "S256",
        code_challenge: challenge,
        scope: scopes.join("%20"),
        show_dialog: "false"
    });
    return <a href={enabled && challenge ? url : null}>
        <Button size="large" rounded color="#1ed760" disabled={!enabled}><img alt="" height="24px" src={spotifyIcon} />&nbsp;&nbsp;Connect to spotify&nbsp;</Button>
    </a>
};

export default SpotifyAuth;