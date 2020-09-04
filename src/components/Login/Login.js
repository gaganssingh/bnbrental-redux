import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import swal from "sweetalert";

import openModal from "../../actions/openModal";
import SignUp from "../SignUp/SignUp";
import regAction from "../../actions/regAction";
import "./Login.css";

class Login extends Component {
    state = {
        email: "",
        password: "",
    };
    changeEmail = (e) => this.setState({ email: e.target.value });
    changePassword = (e) => this.setState({ password: e.target.value });

    submitLogin = async (e) => {
        e.preventDefault();

        const loginUser = {
            email: this.state.email,
            password: this.state.password,
        };

        const url = `${process.env.REACT_APP_API_URL}/users/login`;
        const response = await axios.post(url, loginUser);
        console.log(response.data);

        if (response.data.msg === "loggedIn") {
            swal({
                title: "Login successfull",
                text: "You have successfully logged in",
                icon: "success",
            });
            this.props.regAction(response.data);
        } else if (response.data.msg === "badPass") {
            swal({
                title: "Login failed",
                text: "Invalid email or password. Please try again.",
                icon: "error",
            });
        } else if (response.data.msg === "noEmail") {
            swal({
                title: "Login failed",
                text: "A user with that email address does not exist",
                icon: "error",
            });
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
                    <input
                        type="email"
                        className="browser-default"
                        placeholder="Email address"
                        onChange={(e) => this.changeEmail(e)}
                    />
                    <input
                        type="password"
                        className="browser-default"
                        placeholder="Password"
                        onChange={(e) => this.changePassword(e)}
                    />
                    <button className="sign-up-button">Login</button>
                    <div className="divider"></div>
                    <div>
                        Don't have an account?{" "}
                        <span
                            className="pointer"
                            onClick={() => {
                                this.props.openModal("open", <SignUp />);
                            }}
                        >
                            Sign up
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatcher) => {
    return bindActionCreators(
        {
            openModal,
            regAction,
        },
        dispatcher
    );
};

export default connect(null, mapDispatchToProps)(Login);
