import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import SigninView from './signin-view';

const Signin = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const firebase = useFirebase();

    const signInWithEmail = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(console.log)
        .catch(err => setErrorMessage(err.message));
    }

    return React.createElement(SigninView, {
        onEmail: email => setEmail(email),
        onPassword: password => setPassword(password),
        onSignin: () => signInWithEmail(),
        errorMessage
    });
}

export default Signin;