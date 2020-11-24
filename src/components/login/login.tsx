import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

const Login = ({
    loginFormData,
    loginError,
    loginChange,
    login
}) => {

    return (
        <div>
            <h1>Sign in</h1>
            <form onSubmit={e => {
                e.preventDefault();
                login();
            }}>
                <input type="text" name={'email'} value={loginFormData.email} onInput={e => loginChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="E-mail"></input>
                <input type="password" name={'password'} value={loginFormData.password} onInput={e => loginChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Password"></input>
                <input type="submit" value="Sign in" />
                <p>{loginError}</p>
            </form>
        </div>
    );
}
    
const mapStateToProps = state => {
    return {
        loginFormData: state.login.loginFormData,
        loginError: state.login.loginError,
        isLoading: state.login.isLoading
    }
}

export default connect(mapStateToProps, actions)(Login);