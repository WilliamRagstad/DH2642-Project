const config = {
    client_id: '96f3635ee7d946b9b1d83359d9bb7e7e',
    client_secret: '155fdac7cf3a4763aa0f20294ba01a4a',
    redirect_uri: 'http://localhost:3000/connect/spotify/',
    scopes: [
        'user-read-recently-played',
        'user-top-read',
        'user-read-playback-position',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'app-remote-control',
        'streaming',
        'playlist-modify-public',
        'playlist-modify-private',
        'playlist-read-private',
        'playlist-read-collaborative',
        'user-library-modify',
        'user-library-read',
        'user-read-email',
        'user-read-private',
        'user-read-email',
        'user-follow-modify',
        'user-follow-read',
    ]
}
export default config;