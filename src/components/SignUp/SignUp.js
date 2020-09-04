import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import swal from "sweetalert";

import Login from "../Login/Login";
import openModal from "../../actions/openModal";
import regAction from "../../actions/regAction";

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

    submitLogin = async (e) => {
        e.preventDefault();

        const url = `${process.env.REACT_APP_API_URL}/users/signup`;
        const data = {
            email: this.state.email,
            password: this.state.password,
        };

        const response = await axios.post(url, data);

        // Creating alert
        if (response.data.msg === "userExists") {
            swal({
                title: "Email already in use",
                text: "A user with that email already exists!",
                icon: "error",
            });
        } else if (response.data.msg === "invalidData") {
            swal({
                title: "Invalid email or password",
                text: "Please provide a valid email and password",
                icon: "error",
            });
        } else if (response.data.msg === "userAdded") {
            swal({
                title: "Account created successfully",
                text: "Your account has been successfully created.",
                icon: "success",
            });

            this.props.regAction(response.data);
        }
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatcher) => {
    return bindActionCreators(
        {
            openModal,
            regAction,
        },
        dispatcher
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
