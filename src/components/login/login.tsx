import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Button, Card, CardHeader, CardContent, TextField, Tooltip, Alert, ProgressCircular } from 'ui-neumorphism'

const Login = ({
    loginFormData,
    loginError,
    isLoading,
    loginChange,
    login
}) => {

    return (
        <div style={{alignItems: "center"}}>
            <Card dark style={{padding: "5px", margin: "5px", width: "300px"}}>
                <CardHeader>Sign in</CardHeader>
                <Alert flat type="error">{loginError}</Alert>
                <CardContent>
                    <form onSubmit={e => {
                        e.preventDefault();
                        login();
                    }}>
                        <TextField dark type="text" name={'email'} value={loginFormData.email} onInput={e => loginChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="E-mail"></TextField>
                        <TextField dark type="password" name={'password'} value={loginFormData.password} onInput={e => loginChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Password"></TextField>
                        <Tooltip dark right content={<div>Click to sign in</div>}>
                        {isLoading ? 
                        <ProgressCircular dark  indeterminate color='var(--success)' size={27} width={4}/> :
                        <Button dark onClick={e => {login()}}>Sign in</Button>}
                        </Tooltip>
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