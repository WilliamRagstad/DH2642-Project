import Action from '../interfaces/action';

export const increment = (n): Action => {
    return {
        type: 'INCREMENT',
        payload: n
    }
}

export const decrement = (n): Action => {
    return {
        type: 'DECREMENT',
        payload: n
    }
}