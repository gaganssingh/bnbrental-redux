import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Login from "../Login/Login";
import openModal from "../../actions/openModal";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            lowerPartOfForm: (
                <button
                    type="button"
                    onClick={this.showInputs}
                    className="sign-up-button"
                >
                    Sign up with email
                </button>
            ),
            email: "",
            password: "",
        };
    }

    changeEmail = (e) => this.setState({ email: e.target.value });
    changePassword = (e) => this.setState({ password: e.target.value });

    showInputs = (e) => {
        e.preventDefault();
        this.setState({
            lowerPartOfForm: (
                <SignupInputFields
                    changeEmail={this.changeEmail}
                    changePassword={this.changePassword}
                    email={this.state.email}
                    password={this.state.password}
                />
            ),
        });
    };

    submitLogin = (e) => {
        e.preventDefault();
        console.log(this.state.email, this.state.password);
    };

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.submitLogin}>
                    <button className="facebook-login">
                        Connect With Facebook
                    </button>
                    <button className="google-login">
                        Connect With Google
                    </button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    {this.state.lowerPartOfForm}
                    <div className="divider"></div>
                    <div>
                        Already have an account?{" "}
                        <span
                            className="pointer"
                            onClick={() => {
                                this.props.openModal("open", <Login />);
                            }}
                        >
                            Log in
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatcher) {
    return bindActionCreators(
        {
            openModal: openModal,
        },
        dispatcher
    );
}

const SignupInputFields = (props) => {
    return (
        <div className="sign-up-wrapper">
            <div className="col m12">
                <div className="input-field" id="email">
                    <div className="form-label">Email</div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={props.email}
                        onChange={props.changeEmail}
                    />
                </div>
            </div>
            <div className="col m12">
                <div className="input-field" id="email">
                    <div className="form-label">Password</div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={props.password}
                        onChange={props.changePassword}
                    />
                </div>
            </div>
            <div className="col m12">
                <button type="submit" className="btn red accent-2">
                    Sign Up!
                </button>
            </div>
        </div>
    );
};

export default connect(null, mapDispatchToProps)(SignUp);
