import spotify from '../spotify';
import { validateSpotifyToken } from '../helpers/spotify';

export const searchTrack = (service: string, query: string) => {
    return (dispatch, getstate) => {
        switch (service) {
            case 'spotify':
                spotifySearch(dispatch, query, 10);
                break;

            case 'youtube':
                dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] })
                break;

            case 'both':
                spotifySearch(dispatch, query, 3);
                break;

            default:
                dispatch({ type: 'SEARCH_ERROR', payload: "Invalid service, try again." })
                break;
        }

    }
}

function spotifySearch(dispatch: any, query: string, limit: number) {
    validateSpotifyToken().then(async () => {
        dispatch({ type: 'SET_SEARCH_LOADING' });
        const songs = await spotify.searchTracks(query, { limit: limit }).then(result => {
            dispatch({ type: 'SEARCH_SUCCESS' });
            return result;
        }).catch(console.error);

        let searchResults = [];
        if (songs) {
            songs.tracks.items.forEach(song => {
                searchResults.push({
                    id: song.id,
                    title: song.name,
                    artist: song.artists[0].name,
                    album: song.album.name,
                    length: songLength(song.duration_ms),
                    albumArtUrl: song.album.images[0].url,
                });
            });
            dispatch({ type: 'SET_SEARCH_RESULTS', payload: searchResults });
        }
        else
            dispatch({ type: 'SEARCH_ERROR', payload: "No results found. Check spelling and try again." });
    });
}

export function songLength(duration) {
    let seconds: any = ((duration / 1000) % 60).toFixed(0);
    let minutes: number = Math.abs((((duration / 1000) - seconds) / 60));

    if (seconds >= 60) {
        seconds -= 60;
        minutes += 1;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes.toFixed(0) + ":" + seconds;
}
