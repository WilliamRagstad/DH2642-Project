import { IAction, ISpotify } from '../interfaces';

export const connect = (service: string, data: ISpotify): IAction => {
    return {
        type: 'CONNECTED_' + service.toUpperCase(),
        payload: data
    }
}