import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import "./PaymentSuccess.css";

class PaymentSuccess extends Component {
    render() {
        return (
            <div>
                <h1>PaymentSuccess</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(PaymentSuccess);
