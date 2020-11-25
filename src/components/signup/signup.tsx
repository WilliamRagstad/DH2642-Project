import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Button, Card, CardHeader, CardContent, TextField, Tooltip} from 'ui-neumorphism'

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
        <div style={{alignItems: "center"}}>
            <Card style={{padding: "5px", margin: "5px", width: "300px"}}>
                <CardHeader>Sign up</CardHeader>
                <CardContent>
                    <form onSubmit={e => {
                        e.preventDefault();
                        signup();
                    }}>
                        <TextField type="text" name={'email'} value={signupFormData.email} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="E-mail"></TextField>
                        <TextField type="password" name={'password'} value={signupFormData.password} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Password"></TextField>
                        <TextField type="password" name={'passwordRepeat'} value={signupFormData.passwordRepeat} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Repeat Password"></TextField>
                        <Tooltip right content={<div>Click to sign up</div>}>
                            <Button onClick={e => {signup()}}>Sign up</Button>
                        </Tooltip>
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