import React, {Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import { Button, Form } from '../../components';
import { signinForm } from './signinForm';

class Signin extends Component {

    state = {
        //isSignup: false,
    };

    componentDidMount() {
        
    }

    submitHandler = (state) => {
        this.props.onAuth(state.email.value, state.password.value);
    }

    render() {
        return(
            <div>   

                <div>
                    <h3>SIGN IN</h3>
                    <p>Hello, welcome to Macro Tracker, Sign in and start tracking your macros!</p>
                </div>

                <Form
                    formState={signinForm}
                    onSubmit={this.submitHandler}
                    onAuthStart={this.props.onAuthStart}
                    buttonTitle='SIGN IN'
                    loginFailed={this.props.error}
                />
                <Button>Forgot Password</Button>

                <div>
                    <Button onClick={ () => this.props.history.push('/signup')}>Sign up</Button>
                    <p>Terms and Conditions</p>
                </div>

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
        onAuth: (email, pass) => dispatch(actions.auth(email, pass)),
        onAuthStart: () => dispatch(actions.authStart()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Signin);