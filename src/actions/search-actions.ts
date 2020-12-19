import { SearchService } from '../interfaces';
import { ServiceProvider } from '../services/index';

export const searchTrack = (services: SearchService, query: string) => {
    return (dispatch, getState) => {
        if (services === SearchService.None) {
            dispatch({ type: 'SEARCH_ERROR', payload: "Invalid service, try again." });
            return;
        }
        let servicesRemaining = 0;
        const serviceDone = () => {
            if (--servicesRemaining === 0) dispatch({ type: 'SEARCH_SUCCESS' });
        }
        dispatch({ type: 'SET_SEARCH_LOADING' });
        dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
        if (services & SearchService.Spotify) { servicesRemaining++; ServiceProvider.Spotify.Search(dispatch, query, 10, serviceDone); }
        if (services & SearchService.YouTube) { servicesRemaining++; ServiceProvider.YouTube.Search(dispatch, query, 10, serviceDone); }
    }
}