import { bindActionCreators } from 'redux';
// import * as counter from './counter-actions';
import * as login from './login-actions';
import * as signup from './signup-actions';
import * as lyrics from './lyrics-actions';
import * as media from './media-actions';
import * as search from './search-actions';

export default function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...login,
            ...signup,
            ...lyrics,
            ...media,
            ...search
        },
        dispatch
    )
}