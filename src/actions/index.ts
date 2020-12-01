import { bindActionCreators } from 'redux';
// import * as counter from './counter-actions';
import * as login from './login-actions';
import * as signup from './signup-actions';
import * as lyrics from './lyrics-actions';

export default function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...login,
            ...signup,
            ...lyrics
        },
        dispatch
    )
}