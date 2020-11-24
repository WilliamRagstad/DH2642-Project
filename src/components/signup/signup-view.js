import React from "react";

const Signup = ({ onEmail, onPassword, onSignup, password, errorMessage }) =>
    <div>
        <h1>Sign up</h1>
        <form onSubmit={e => {
            e.preventDefault();
            onSignup();
        }}>
            <input type="email" onChange={e => onEmail(e.target.value)} placeholder="E-mail"></input>
            <input type="password" onChange={e => onPassword(e.target.value)} placeholder="Password"></input>
            <input type="submit" value="Sign up" />
            <p>{errorMessage}</p>
        </form>
    </div>;

export default Signup;