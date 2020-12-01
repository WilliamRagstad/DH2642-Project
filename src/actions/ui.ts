import { IAction } from '../interfaces';

export const update_ui = (data: any): IAction => {
    return {
        type: 'UI_UPDATE',
        payload: data
    }
}