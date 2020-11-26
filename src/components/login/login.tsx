import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardContent, TextField, Alert, ProgressCircular } from 'ui-neumorphism'

const Login = ({
    loginFormData,
    loginError,
    isLoading,
    loginChange,
    login
}) => {

    return (
        <div style={{alignItems: "center", textAlign: "center"}}>
            <Card dark style={{padding: "5px", margin: "5px auto", width: "300px"}}>
                <CardHeader>Log in</CardHeader>
                <Alert flat type="error">{loginError}</Alert>
                <CardContent>
                    <form onSubmit={e => {
                        e.preventDefault();
                        login();
                    }} noValidate>
                        <TextField className="text-field" dark rounded type="email" name={'email'} value={loginFormData.email} onInput={e => loginChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="E-mail" style={{}}></TextField>
                        <TextField className="text-field" dark rounded type="password" name={'password'} value={loginFormData.password} onInput={e => loginChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Password"></TextField>
                        <input type="submit" hidden/>
                    </form>
                    
                    {isLoading ? 
                        <ProgressCircular dark indeterminate color='var(--primary)' size={27} width={4} style={{margin: "auto"}}/> :
                        <Button dark rounded onClick={() => login()}>Log in</Button>}
                    <p>First time around?</p>
                    <Link to="signup">
                        <Button dark rounded text >
                            Create account
                        </Button>
                    </Link>
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