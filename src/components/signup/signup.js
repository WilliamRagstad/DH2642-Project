import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import SignupView from './signup-view';

const Signup = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const firebase = useFirebase();

    const signupWithEmail = () => {
        if (password)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user);
            setErrorMessage(null);
        })
        .catch(err => {
            console.error(err);
            setErrorMessage(err.message);
        })
    }

    return React.createElement(SignupView, {
        onEmail: email => setEmail(email),
        onPassword: password => setPassword(password),
        onSignup: () => signupWithEmail(),
        errorMessage
    });
}
export default Signup;