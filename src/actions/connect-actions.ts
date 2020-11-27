import { IAction } from '../interfaces';

export const connect = (service: string, data: any): IAction => {
    return {
        type: 'CONNECTED_' + service,
        payload: data
    }
}