import { SearchService } from '../interfaces';
import { ServiceProvider } from '../services/index';

export const searchTrack = (services: SearchService, query: string) => {
    return (dispatch, getState) => {
        if (services === SearchService.None) {
            dispatch({ type: 'SEARCH_ERROR', payload: "Invalid service, try again." });
            return;
        }
        dispatch({ type: 'SET_SEARCH_LOADING' });
        dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
        if (services & SearchService.Spotify) ServiceProvider.Spotify.Search(dispatch, query, 10);
        if (services & SearchService.YouTube) ServiceProvider.YouTube.Search(dispatch, query, 10);
    }
}