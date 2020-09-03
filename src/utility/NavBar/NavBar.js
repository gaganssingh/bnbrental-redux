import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import openModal from "../../actions/openModal";

import "./NavBar.css";

class NavBar extends Component {
    render() {
        // Change background color of NavBar depending
        // on the page user is visiting
        let navColor = "transparent";
        if (this.props.location.pathname !== "/") {
            navColor = "black";
        }

        return (
            <div className="container-fluid nav">
                <div className="row">
                    <nav className={navColor}>
                        <div className="nav-wrapper">
                            <Link to="/" className="left">
                                airbnb
                            </Link>
                            <ul id="nav-mobile" className="right">
                                <li>
                                    <Link to="/">English (US)</Link>
                                </li>
                                <li>
                                    <Link to="/">$ USD</Link>
                                </li>
                                <li>
                                    <Link to="/">Become a host</Link>
                                </li>
                                <li>
                                    <Link to="/">Helo</Link>
                                </li>
                                <li>
                                    <Link to="/">Sign up</Link>
                                </li>
                                <li
                                    onClick={() =>
                                        this.props.openModal("open", "Log in")
                                    }
                                >
                                    Log in
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatcher) => {
    return bindActionCreators(
        {
            openModal: openModal,
        },
        dispatcher
    );
};

export default connect(null, mapDispatchToProps)(NavBar);
