export const loginChange = (name, value) => {
    let formData = {};
    formData[name] = value;
    console.log(formData);

    return {
        type: 'LOGIN_CHANGE',
        payload: formData
    };
};

export const login = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        dispatch({ type: 'SET_LOGIN_LOADING' });
        
        const user = getState().login.loginFormData;

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        })
        .catch(err => {
            dispatch(handleLoginError(err));
        });
    }
}

export const handleLoginError = err => {
    return (dispatch, getState) => {
        dispatch({ type: 'LOGIN_ERROR', err });
        dispatch(loginChange('password', ''));
    }
}