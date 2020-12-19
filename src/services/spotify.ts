import { IServiceWrapper, ITrack } from '../interfaces';
import { songLength, validateSpotifyToken } from '../helpers/spotify';
import spotify from '../spotify';

class SpotifyService implements IServiceWrapper {
    apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    Search(dispatch: any, query: string, limit: number, onDone: () => void) {
        validateSpotifyToken().then(() => {
            spotify.searchTracks(query, { limit: limit }).then(result => {
                if (result.tracks.items.length >= 1) {
                    let searchResults = [] as ITrack[];
                    result.tracks.items.forEach(song => {
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
                else dispatch({ type: 'SEARCH_ERROR', payload: "No results found. Check spelling and try again." })
                onDone();
            }).catch(e => {
                console.error(e);
                onDone();
            });
        });
    }

}

export default SpotifyService;