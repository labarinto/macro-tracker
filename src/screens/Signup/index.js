import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signupForm } from './signupForm';
import { Form } from '../../components';
import * as actions from '../../store/actions';

class Signup extends Component {

    state = {
        
    }

    submitHandler = (state) => {
        const signupData = {name: state.name.value};
        this.props.onAuth(state.email.value, state.password.value, signupData);

    }

    render() {

        return (
            <div>

                <div>
                    <h3>SIGN UP</h3>
                    <p>Hello, welcome to Macro Tracker, Sign up and start tracking your macros!</p>
                </div>

                <Form
                    formState={signupForm}
                    onSubmit={this.submitHandler}
                    onAuthStart={this.props.onAuthStart}
                    buttonTitle='SIGN UP'
                    loginFailed={this.props.error}
                />
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        error: state.auth.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, isSignup) => dispatch(actions.auth(email, pass, isSignup)),
        onAuthStart: () => dispatch(actions.authStart()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Signup);