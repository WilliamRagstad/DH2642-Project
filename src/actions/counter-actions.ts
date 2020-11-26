import { IAction } from '../interfaces';

export const increment = (n): IAction => {
    return {
        type: 'INCREMENT',
        payload: n
    }
}

export const decrement = (n): IAction => {
    return {
        type: 'DECREMENT',
        payload: n
    }
}