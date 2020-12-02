import React from "react";

const SigninView = ({ onEmail, onPassword, onSignin, errorMessage }) =>
    <div>
        <h1>Sign in</h1>
        <form onSubmit={e => {
            e.preventDefault();
            onSignin();
        }}>
            <input type="email" onChange={e => onEmail(e.target.value)} placeholder="E-mail"></input>
            <input type="password" onChange={e => onPassword(e.target.value)} placeholder="Password"></input>
            <input type="submit" value="Sign in" />
            <p>{errorMessage}</p>
        </form>
    </div>;

export default SigninView;