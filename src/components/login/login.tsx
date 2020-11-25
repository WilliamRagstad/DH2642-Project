import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Button, Card, CardHeader, CardContent} from 'ui-neumorphism'

const Login = ({
    loginFormData,
    loginError,
    loginChange,
    login
}) => {

    return (
        <div style={{alignItems: "center"}}>
            <Card style={{padding: "5px", margin: "5px", width: "500px"}}>
                <CardHeader>Sign in</CardHeader>
                <CardContent>
                    <form onSubmit={e => {
                        e.preventDefault();
                        login();
                    }}>
                        <input type="text" name={'email'} value={loginFormData.email} onInput={e => loginChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="E-mail"></input>
                        <input type="password" name={'password'} value={loginFormData.password} onInput={e => loginChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Password"></input>
                        <Button onClick={e => {login()}}>Sign in</Button>
                        <p>{loginError}</p>
                    </form>
                </CardContent>
            </Card>
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