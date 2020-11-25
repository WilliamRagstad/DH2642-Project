export const signupChange = (name, value) => {
    let formData = {};
    formData[name] = value;

    return {
        type: 'SIGNUP_CHANGE',
        payload: formData
    };
};

export const signup = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        dispatch({ type: 'SET_SIGNUP_LOADING' });
        
        const user = getState().signup.signupFormData;

        if (user.password === user.passwordRepeat) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS' });
            })
            .catch(err => {
                dispatch({ type: 'SIGNUP_ERROR', err });
            });            
        }
        else {
            dispatch({ type: 'SIGNUP_ERROR', err: { message: "Passwords do not match" } });
            dispatch(signupChange('password', ''));
            dispatch(signupChange('passwordRepeat', ''));
        }
    }
};