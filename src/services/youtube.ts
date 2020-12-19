import { songLength } from '../helpers/spotify';
import { IServiceWrapper, ITrack } from '../interfaces';

class YouTubeService implements IServiceWrapper {
    apiKey: string;
    endpoint = "https://youtube.googleapis.com/youtube/v3/search?";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    // https://developers.google.com/youtube/v3/docs/search/list
    Search(dispatch: any, query: string, limit: number, onDone: () => void) {
        fetch(this.endpoint + new URLSearchParams({
            part: encodeURI(['snippet', 'id'] as any),
            key: this.apiKey,
            q: query,
            maxResults: limit
        } as any)).then(r => r.json()).then(data => {
            if (data.error || (data.items && data.items.length === 0)) {
                onDone();
                return;
            }
            let searchResults = [] as ITrack[];
            data.items.forEach(video => {
                searchResults.push({
                    id: video.id.videoId,
                    title: video.snippet.title,
                    artist: video.snippet.channelTitle,
                    album: video.snippet.thumbnails.default,
                    length: songLength(Math.random() * 200000 + 100000), // https://stackoverflow.com/a/38348286/5698805
                    albumArtUrl: video.snippet.thumbnails.high,
                    service: 'youtube'
                });
            });
            dispatch({ type: 'ADD_SEARCH_RESULTS', payload: searchResults });
            onDone()
        }).catch(e => {
            console.error(e)
            onDone()
        })
    }

}

export default YouTubeService;