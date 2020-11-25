import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Button, Card, CardHeader, CardContent} from 'ui-neumorphism'

const Signup = ({
    signupFormData,
    signupError,
    signupChange,
    signup
}) => {

    return (
        <div style={{alignItems: "center"}}>
            <Card style={{padding: "5px", margin: "5px", width: "650px"}}>
                <CardHeader>Sign up</CardHeader>
                <CardContent>
                    <form onSubmit={e => {
                        e.preventDefault();
                        signup();
                    }}>
                        <input type="text" name={'email'} value={signupFormData.email} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="E-mail"></input>
                        <input type="password" name={'password'} value={signupFormData.password} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Password"></input>
                        <input type="password" name={'passwordRepeat'} value={signupFormData.passwordRepeat} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Repeat Password"></input>
                        <Button onClick={e => {signup()}}>Sign up</Button>
                        <p>{signupError}</p>
                    </form>
                </CardContent>
            </Card>
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