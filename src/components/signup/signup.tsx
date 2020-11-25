import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

/**
 ** Depricated Component
 * ====================
 * Storing local data like current values of input elements
 * should be done in component level, and more globally shared
 * stated should be utilizing Redux.
 */

const Signup = ({
    signupFormData,
    signupError,
    signupChange,
    signup
}) => {

    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={e => {
                e.preventDefault();
                signup();
            }}>
                <input type="text" name={'email'} value={signupFormData.email} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="E-mail"></input>
                <input type="password" name={'password'} value={signupFormData.password} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Password"></input>
                <input type="password" name={'passwordRepeat'} value={signupFormData.passwordRepeat} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Repeat Password"></input>
                <input type="submit" value="Sign up" />
                <p>{signupError}</p>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        signupFormData: state.signup.signupFormData,
        signupError: state.signup.signupError,
        isLoading: state.signup.isLoading
    }
}

export default connect(mapStateToProps, actions)(Signup);