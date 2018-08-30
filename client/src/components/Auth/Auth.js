import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import {
    addUser,
    loginUser,
    loginUserGoogle,
    loginUserFacebook,
    loginUserTwitter,
    generateBreadCrumbs,
} from '../../actions';
// MaterialComponents
import { Button, Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Progress from '../Progress/Progress';
import './Auth.css';

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

const StyledFormContainer = styled.div`
    border: 2px solid blue;
    margin-top: 110px;
    margin-right: 11.1rem;
`;

const StyledFormCard = styled(Card)`
    border: 1px solid red;
    display: flex;
    flex-direction: row;
    height: 300px;
    width: 800px;
`;

const StyledCardContent = styled(CardContent)`
    border: 1px solid black;
    width: 50%;
    text-align: center;
    font-size: 1.5rem;
`;

class Auth extends Component {
    state = {
        email: '',
        password: '',
        authenticated: {},
        success: true,
    };

    componentDidMount() {
        this.props.user.success === false
            ? this.setState({ success: false })
            : this.setState({ success: true });
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSignUp = e => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            authType: 'signup',
        };
        this.props.addUser(user);
        this.setState({ attempts: this.state.attempts + 1 });
    };

    handleSignIn = e => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            authType: 'signin',
        };
        this.props.loginUser(user);
        this.setState({ attempts: this.state.attempts + 1 });
    };

    handleSignInGoogle = e => {
        this.props.loginUserGoogle();
    };

    handleSignInFacebook = e => {
        this.props.loginUserFacebook();
    };

    handleSignInTwitter = e => {
        this.props.loginUserTwitter();
    };

    handleSignInGoogle = e => {
        this.props.loginUserGoogle();
    };

    handleSignInFacebook = e => {
        this.props.loginUserFacebook();
    };

    handleSignInTwitter = e => {
        this.props.loginUserTwitter();
    };

    render() {
        return (
            <StyledFormContainer>
                {/* <h1 className="Auth_header">Please Sign-in or Sign-up.</h1>
                <div className="flex-column-centered">
                    <Input
                        className="Auth_input"
                        type="email"
                        name="email"
                        autoFocus={true}
                        onChange={this.handleInput}
                        disableUnderline={true}
                    />
                    <Input
                        className="Auth_input"
                        type="password"
                        name="password"
                        onChange={this.handleInput}
                        disableUnderline={true}
                    />
                </div>
                <div className="flex-column-centered">
                    <div className="flex-row-centered">
                        <Button
                            className="Auth_button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSignUp}
                        >
                            Sign-Up
                        </Button>
                        <Button
                            className="Auth_button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSignIn}
                        >
                            Sign-In
                        </Button>
                    </div>
                    <div className="Auth_oauth_section">
                        <Button
                            className="Auth_button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSignInGoogle}
                        >
                            Google Log In
                        </Button>
                        <Button
                            className="Auth_button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSignInFacebook}
                        >
                            Facebook Log In
                        </Button>
                        <Button
                            className="Auth_button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSignInTwitter}
                        >
                            Twitter Log In
                        </Button>
                    </div>
                </div> */}
                <StyledFormCard>
                    <StyledCardContent>Sign In or Sign Up</StyledCardContent>
                    <StyledCardContent>Sign in with social media</StyledCardContent>
                </StyledFormCard>
                <div className="flex-row-centered Auth_prompt-fail">
                    {/* THIS SECTION WILL HANDLE USER AUTH ERROR MESSAGES */}
                    {this.props.user.status === 'FAILED' ? (
                        <p>
                            Authentication failed. Check your email and password and try again.
                            Thank you.
                        </p>
                    ) : this.props.user.status === 'ADDING_USER' ||
                    this.props.user.status === 'LOGGING_IN_USER' ? (
                        <Progress />
                    ) : null}
                </div>
                {this.props.user.authenticated ? <Redirect to="/rocket" /> : null}
            </StyledFormContainer>
        );
    }
}

export default connect(mapStateToProps, {
    addUser,
    loginUser,
    loginUserGoogle,
    loginUserFacebook,
    loginUserTwitter,
    generateBreadCrumbs,
})(Auth);
