import SongsClient from '../helpers/SongsClient';
import Song from '../helpers/Song';
import config from '../genius-config';
const songsClient = new SongsClient(config.cilent_access_token);

// CREATE HELPER FUNCTION TO REMOVE CODE DUPLICATION IF POSSIBLE
export const getCurrentLyrics = () => {
    return (dispatch, getState) => {
        const state = getState();
        const query = state.media.currentlyPlaying.title + " " + state.media.currentlyPlaying.artists[0].name;
        dispatch({ type: 'LYRICS_RESET'});
        dispatch({ type: 'SET_LYRICS_LOADING' });
        dispatch({ type: 'SET_LYRICS_SAME_AS_PLAYING', payload: true });
        songsClient.search(query).then(songs => {
            if (songs.length === 0) {
                dispatch({ type: 'LYRICS_ERROR', payload: "No lyrics found." });
                return;
            }
            const song = {
                id: songs[0].id,
                title: songs[0].featuredTitle,
                artist: songs[0].artist.name,
                url: songs[0].url,
                albumArtUrl: songs[0].image,
            };
            dispatch({ type: 'SET_CURRENT_LYRICS', payload: song });
            // console.log(songs[0]);

            setTimeout(() => songs[0].lyrics(true).then(lyrics => {
                dispatch({ type: 'SET_CURRENT_LYRICS', payload: { lyrics } });
                dispatch({ type: 'LYRICS_SUCCESS' });
                // console.log("Test")
            }).catch(err => {
                dispatch({ type: 'LYRICS_ERROR', payload: "Failed to load lyrics. Try reloading." });
                console.error(err);
            }), 1000);
        }).catch(err => {
            console.error(err);
            dispatch({ type: 'LYRICS_ERROR', payload: "No lyrics found." });
        });
    }
}
export const getLyricsFromId = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LYRICS_RESET'});
        dispatch({ type: 'SET_LYRICS_LOADING' });
        dispatch({ type: 'SET_LYRICS_SAME_AS_PLAYING', payload: false });
        const result: Song = await songsClient.get(id).catch(console.error) as Song;
        // console.log(result);
        const song = {
            id: result.id,
            title: result.featuredTitle,
            artist: result.artist.name,
            url: result.url,
            albumArtUrl: result.image,
        };
        dispatch({ type: 'SET_CURRENT_LYRICS', payload: song });
        setTimeout(() => result.lyrics(true).then(lyrics => {
                dispatch({ type: 'SET_CURRENT_LYRICS', payload: { lyrics } });
                dispatch({ type: 'LYRICS_SUCCESS' });
            })
            .catch(err => {
                dispatch({ type: 'LYRICS_ERROR', payload: "Failed to load lyrics. Try reloading." });
                console.error(err);
            }), 1000);
    }
}

export const searchLyrics = (query) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LYRICS_RESET'});
        dispatch({ type: 'SET_LYRICS_LOADING' });
        dispatch({ type: 'SET_LYRICS_SAME_AS_PLAYING', payload: false });
        const songs = await songsClient.search(query).then(result => {
            // console.log(result)
            dispatch({ type: 'LYRICS_SUCCESS' });
            return result;
        }).catch(console.error);
        let searchResults = [];

        // console.log(songs);
        if (songs) {
            songs.forEach(song => {
                searchResults.push({
                    id: song.id,
                    title: song.featuredTitle,
                    artist: song.artist.name,
                    url: song.url,
                    albumArtUrl: song.image,
                });
            })
            dispatch({ type: 'SET_LYRICS_SEARCH_RESULTS', payload: searchResults })
        }
        else dispatch({ type: 'LYRICS_ERROR', payload: "No results found. Check spelling and try again." });
    }
}

export const resetLyrics = () => {
    return {
        type: 'LYRICS_RESET',
    }
}