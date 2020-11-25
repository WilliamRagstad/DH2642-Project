import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Button, Card, CardHeader, CardContent, TextField, Tooltip} from 'ui-neumorphism'

const Login = ({
    loginFormData,
    loginError,
    loginChange,
    login
}) => {

    return (
        <div style={{alignItems: "center"}}>
            <Card style={{padding: "5px", margin: "5px", width: "300px"}}>
                <CardHeader>Sign in</CardHeader>
                <CardContent>
                    <form onSubmit={e => {
                        e.preventDefault();
                        login();
                    }}>
                        <TextField type="text" name={'email'} value={loginFormData.email} onInput={e => loginChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="E-mail"></TextField>
                        <TextField type="password" name={'password'} value={loginFormData.password} onInput={e => loginChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Password"></TextField>
                        <Tooltip right content={<div>Click to sign in</div>}>
                            <Button onClick={e => {login()}}>Sign in</Button>
                        </Tooltip>
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