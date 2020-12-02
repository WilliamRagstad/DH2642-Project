import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardContent, TextField, Alert, ProgressCircular} from 'ui-neumorphism';

const Signup = ({
    signupFormData,
    signupError,
    isLoading,
    signupChange,
    signup
}) => {

    return (
        <div className="signup">
            <Card className="signup-card">
                <CardHeader>Create account</CardHeader>
                <Alert flat type="error">{signupError}</Alert>
                <CardContent>
                    <form onSubmit={e => {
                        e.preventDefault();
                        signup();
                    }} noValidate>
                        <TextField className="text-field" rounded type="email" name={'email'} value={signupFormData.email} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="E-mail"></TextField>
                        <TextField className="text-field" rounded type="password" name={'password'} value={signupFormData.password} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Password"></TextField>
                        <TextField className="text-field" rounded type="password" name={'passwordRepeat'} value={signupFormData.passwordRepeat} onInput={e => signupChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} placeholder="Repeat Password"></TextField>
                        <input type="submit" hidden/>
                    </form>
                    {isLoading ? 
                    <ProgressCircular className="signup-progress" indeterminate color='var(--primary)' size={27} width={4}/> :
                    <Button rounded onClick={() => signup()}>Enter</Button>}
                    <p>Already have an account?</p>
                    <Link to="/login">
                        <Button text rounded>Log in</Button>
                    </Link>
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