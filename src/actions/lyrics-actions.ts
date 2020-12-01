import Genius from 'genius-lyrics';
import config from '../genius-config';
const songsClient = new Genius.SongsClient(config.cilent_access_token);

export const setCurrentLyrics = (query, currentlyPlaying) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_LYRICS_LOADING' });
        dispatch({ type: 'SET_LYRICS_SAME_AS_PLAYING', payload: currentlyPlaying })
        
        getSong(query).then(song => {
            dispatch({ type: 'LYRICS_SUCCESS', payload: song });
        })
        .catch(handleLyricsError);
    }
}

const getSong = async (query: string) => {
    const searches = await songsClient.search(query);
    const firstSong = searches[0];
    console.log(firstSong);
    const lyrics = await firstSong.lyrics();
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