import { IServiceWrapper, ITrack } from '../interfaces';
import { songLength, validateSpotifyToken } from '../helpers/spotify';
import spotify from '../spotify';

class SpotifyService implements IServiceWrapper {
    apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    Search(dispatch: any, query: string, limit: number) {
        validateSpotifyToken().then(async () => {
            const songs = await spotify.searchTracks(query, { limit: limit }).then(result => {
                if (result.tracks.items.length >= 1) {
                    dispatch({ type: 'SEARCH_SUCCESS' });
                    return result;
                }
                else {
                    dispatch({ type: 'SEARCH_ERROR', payload: "No results found. Check spelling and try again." })
                    return result;
                }
            }).catch(console.error);

            if (songs) {
                let searchResults = [] as ITrack[];
                songs.tracks.items.forEach(song => {
                    searchResults.push({
                        id: song.id,
                        title: song.name,
                        artist: song.artists[0].name,
                        album: song.album.name,
                        length: songLength(song.duration_ms),
                        albumArtUrl: song.album.images[0].url,
                        service: 'spotify'
                    });
                });
                dispatch({ type: 'ADD_SEARCH_RESULTS', payload: searchResults });
            }
        });
    }

}

export default SpotifyService;