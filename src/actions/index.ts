import { bindActionCreators } from 'redux';
// import * as counter from './counter-actions';
import * as login from './login-actions';

export default function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...login
        },
        dispatch
    )
}