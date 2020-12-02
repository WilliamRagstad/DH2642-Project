import Genius, { Song } from 'genius-lyrics';
import config from '../genius-config';
const songsClient = new Genius.SongsClient(config.cilent_access_token);

export const setCurrentLyrics = (query, currentlyPlaying) => {
    return (dispatch, getState) => {
        console.log("test1");
        
        // if (currentlyPlaying) getFirstSong(query);
    }
}

export const getCurrentSong = (query: string) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_LYRICS_LOADING' });
        dispatch({ type: 'SET_LYRICS_SAME_AS_PLAYING', payload: true });
        songsClient.search(query)
        .then(songs => {
            const song = {
                id: songs[0].id,
                title: songs[0].featuredTitle,
                artist: songs[0].artist.name,
                url: songs[0].url,
                albumArtUrl: songs[0].thumbnail,
            }
            dispatch({ type: 'SET_CURRENT_LYRICS', payload: song })
            console.log(songs[0]);

            
            return promiseTimeout(songs[0].lyrics(true), 1000).catch(console.error);
        })
        .then(lyrics => {
            dispatch({ type: 'SET_CURRENT_LYRICS', payload: { lyrics } });
            dispatch({ type: 'LYRICS_SUCCESS' });
            console.log("Loaded lyrics");
        })
        .catch(handleLyricsError);
    }
}

export const getCurrentLyrics = () => {
    return async (dispatch, getState) => {
        const query: string = "See you again Wiz Khalifa";
        dispatch({ type: 'SET_LYRICS_LOADING' });
        dispatch({ type: 'SET_LYRICS_SAME_AS_PLAYING', payload: true });
        const songs = await songsClient.search(query).catch(console.error);
        const song = {
            id: songs[0].id,
            title: songs[0].featuredTitle,
            artist: songs[0].artist.name,
            url: songs[0].url,
            albumArtUrl: songs[0].thumbnail,
        };
        dispatch({ type: 'SET_CURRENT_LYRICS', payload: song });
        console.log(songs[0]);
        setTimeout(() => songs[0].lyrics(true).then(lyrics => {
            dispatch({ type: 'SET_CURRENT_LYRICS', payload: { lyrics } });
            dispatch({ type: 'LYRICS_SUCCESS' });
            console.log("Test")
        })
        .catch(err => {
            dispatch({ type: 'LYRICS_ERROR', payload: "Failed to load lyrics. Try reloading." });
            console.error(err);
        }), 1000);
    }
}

export const searchLyrics = (query: string) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'SET_LYRICS_LOADING' });
        dispatch({ type: 'SET_LYRICS_SAME_AS_PLAYING', payload: false });
        const songs = await songsClient.search(query).then(result => {
            dispatch({ type: 'LYRICS_SUCCESS' });
            return result;
        }).catch(console.error);
        let searchResults = [];
        searchResults.push("Hello");
        if (songs) {
            songs.forEach(song => {
                searchResults.push({
                    id: song.id,
                    title: song.featuredTitle,
                    artist: song.artist.name,
                    url: song.url,
                    albumArtUrl: song.thumbnail,
                });
            })
            dispatch({ type: 'SET_LYRICS_SEARCH_RESULTS', payload: searchResults })
        }
        else dispatch({ type: 'LYRICS_ERROR', payload: "No results found. Check spelling and try again."});
    }
}

export const promiseTimeout = (promise: Promise<any>, time: number) => {
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            reject('Timed out in ' + time + 'ms.');
        }, time);
    })
    return Promise.race([promise, timeout])
}

const getSongs = async (query: string) => {
    const searches = await songsClient.search(query);
    const firstSong = searches[0];
    console.log(firstSong);
    const lyrics = await firstSong.lyrics(true);
    return {
        id: firstSong.id,
        title: firstSong.featuredTitle,
        artist: firstSong.artist.name,
        url: firstSong.url,
        albumArtUrl: firstSong.thumbnail,
        lyrics
    };
}

export const handleLyricsError = err => {
    return (dispatch, getState) => {
        dispatch({ type: 'LYRICS_ERROR', err });
        console.error(err);
    }
}
// export const lyricsTest = () => 
// dispatch({ type: 'LYRICS_SUCCESS', payload: {
//     currentLyrics: {
//         id: song.id,
//         title: title,
//         url: song.url,
//         albumArt: song.albumArt,
//         lyrics: song.lyrics,
//     },
// }})