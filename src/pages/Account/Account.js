import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";
import { Route } from "react-router-dom";

import AccountSideBar from "../../utility/AccountSideBar/AccountSideBar";
import Bookings from "../../utility/Bookings/Bookings";
import ChangePassword from "../../utility/ChangePassword/ChangePassword";
import "./Account.css";

class Account extends Component {
    state = {
        pastBookings: [],
        upcomingBookings: [],
    };

    async componentDidMount() {
        const accountUrl = `${process.env.REACT_APP_API_URL}/users/getBookings`;
        const data = {
            token: this.props.auth.token,
        };
        const response = await axios.post(accountUrl, data);
        let pastBookings = [],
            upcomingBookings = [];
        response.data.forEach((booking) => {
            const today = moment();
            const checkOutDate = moment(booking.checkOut);
            const diffDays = checkOutDate.diff(today, "days");
            if (diffDays < 0) {
                pastBookings.push(booking);
            } else {
                upcomingBookings.push(booking);
            }
        });

        this.setState({
            pastBookings,
            upcomingBookings,
        });
    }

    render() {
        const { pastBookings, upcomingBookings } = this.state;
        return (
            <div className="account container-fluid">
                <AccountSideBar />
                <div className="row">
                    <div className="col s8 offset-s3">
                        <Route
                            exact
                            path="/account"
                            render={() => (
                                <h1>Choose an option on the left!</h1>
                            )}
                        />
                        <Route
                            exact
                            path="/account/reservations/confirmed"
                            render={() => (
                                <Bookings
                                    type="upcoming"
                                    bookings={upcomingBookings}
                                    token={this.props.auth.token}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/account/reservations/past"
                            render={() => (
                                <Bookings type="past" bookings={pastBookings} />
                            )}
                        />
                        <Route
                            exact
                            path="/account/change-pass"
                            component={ChangePassword}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(Account);
