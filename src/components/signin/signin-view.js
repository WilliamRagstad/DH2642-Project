const SigninView = ({onEmail, onPassword, onSignin, errorMessage}) => 
<div>
    <h1>Sign in</h1>
    <input type="email" onChange={e => onEmail(e.target.value)} placeholder="E-mail"></input>
    <input type="password" onChange={e => onPassword(e.target.value)} placeholder="Password"></input>
    <button onClick={e => {
        e.preventDefault();
        onSignin();
    }}>Sign in</button>
    <p>{errorMessage}</p>
</div>;

export default SigninView;