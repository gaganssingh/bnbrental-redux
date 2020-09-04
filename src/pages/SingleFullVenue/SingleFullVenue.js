import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import swal from "sweetalert";

import openModal from "../../actions/openModal";
import Point from "../../components/Point/Point";
import "./SingleFullVenue.css";
import Login from "../../components/Login/Login";
import loadScript from "../../utilityFunctions/loadScript";

class SingleFullVenue extends Component {
    state = {
        singleVenue: {},
        points: [],
        checkIn: "",
        checkOut: "",
    };

    async componentDidMount() {
        const vId = this.props.match.params.vid;
        const url = `${process.env.REACT_APP_API_URL}/venue/${vId}`;
        const axiosResponse = await axios.get(url);
        const singleVenue = axiosResponse.data;

        const pointsUrl = `${process.env.REACT_APP_API_URL}/points/get`;
        const pointsAxiosResponse = await axios.get(pointsUrl);

        const points = singleVenue.points
            .split(",")
            .map((point) => (
                <Point
                    key={point}
                    pointDesc={pointsAxiosResponse.data}
                    point={point}
                />
            ));
        this.setState({ singleVenue, points });
    }

    changeNumberOfGuests = (e) => {
        this.setState({ numberOfGuests: e.target.value });
    };
    changeCheckIn = (e) => {
        this.setState({ checkIn: e.target.value });
    };
    changeCheckOut = (e) => {
        this.setState({ checkOut: e.target.value });
    };

    reserveNow = async (e) => {
        const startDayMoment = moment(this.state.checkIn);
        const endDayMoment = moment(this.state.checkOut);
        const diffDays = endDayMoment.diff(startDayMoment, "days");

        if (diffDays < 1) {
            swal({
                title: "Check out date must be after the check in date",
                icon: "error",
            });
        } else if (isNaN(diffDays)) {
            swal({
                title: "Please ensure that you have selected valid dates",
                icon: "error",
            });
        } else {
            const pricePerNight = this.state.singleVenue.pricePerNight;
            const totalPrice = pricePerNight * diffDays;

            // Create a script tag to embedd the stripe JS file in the DOM
            // <script type="text/javascript" src=REACT_APP_STRIPE_API_URL></script>
            // MOVED STRIPE LOGIC TO ITS OWN MODULE
            // await new Promise((resolve, reject) => {
            //     const script = document.createElement("script");
            //     script.type = "text/javascript";
            //     script.src = process.env.REACT_APP_STRIPE_API_URL;
            //     script.onload = () => resolve();
            //     document.getElementsByTagName("head")[0].appendChild(script);
            //     console.log("Script has been added to the head");
            // });

            await loadScript();
            const stripe = window.Stripe(process.env.REACT_APP_STRIPE_API_KEY);
            const stripeSessionUrl = `${process.env.REACT_APP_API_URL}/payment/create-session`;
            const data = {
                venueData: this.state.singleVenue,
                totalPrice,
                diffDays,
                pricePerNight,
                checkIn: this.state.checkIn,
                checkOut: this.state.checkOut,
                token: this.props.auth.token,
                currency: "USD",
            };
            const sessionVar = await axios.post(stripeSessionUrl, data);
            // console.log(sessionVar.data);
            stripe
                .redirectToCheckout({
                    sessionId: sessionVar.data.id,
                })
                .then((result) => {
                    console.log(result);
                });
        }
    };

    render() {
        // prettier-ignore
        const { amenities, details, guests, imageUrl, location, pricePerNight, rating, title } = this.state.singleVenue;

        return (
            <div className="row single-venue">
                <div className="col s12 center">
                    <img src={imageUrl} alt={title} />
                </div>
                <div className="col s8 location-details offset-s2">
                    <div className="col s8 left-details">
                        <div className="location">{location}</div>
                        <div className="title">{title}</div>
                        <div className="guests">{guests} guests</div>
                        <div className="divider"></div>
                        {this.state.points}

                        <div className="details">{details}</div>
                        <hr />
                        <div className="details">{amenities}</div>
                    </div>

                    <div className="col s4 right-details">
                        <div className="price-per-day">
                            ${pricePerNight} <span>per day</span>
                        </div>
                        <div className="rating">{rating}</div>
                        <div className="col s6">
                            Check-In
                            <input
                                type="date"
                                name="check-in"
                                id="check-in"
                                onChange={this.changeCheckIn}
                                value={this.state.checkIn}
                            />
                        </div>
                        <div className="col s6">
                            Check-Out
                            <input
                                type="date"
                                name="check-out"
                                id="check-out"
                                onChange={this.changeCheckOut}
                                value={this.state.checkOut}
                            />
                        </div>

                        <div className="col s12">
                            <select
                                name="guests"
                                id="guests"
                                className="browser-default"
                                onChange={this.changeNumberOfGuests}
                                value={this.state.numberOfGuests}
                            >
                                <option value="1">1 Guest</option>
                                <option value="2">2 Guests</option>
                                <option value="3">3 Guests</option>
                                <option value="4">4 Guests</option>
                                <option value="5">5 Guests</option>
                                <option value="6">6 Guests</option>
                                <option value="7">7 Guests</option>
                                <option value="8">8 Guests</option>
                            </select>
                        </div>
                        <div className="col s12 center">
                            {this.props.auth.token ? (
                                <button
                                    onClick={this.reserveNow}
                                    className="btn red accent-2"
                                >
                                    Reserve
                                </button>
                            ) : (
                                <div>
                                    <span
                                        className="text-link"
                                        onClick={() =>
                                            this.props.openModal(
                                                "open",
                                                <Login />
                                            )
                                        }
                                    >
                                        Log in
                                    </span>{" "}
                                    to reserve
                                </div>
                            )}
                        </div>
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

const mapDispatchToProps = (dispatcher) => {
    return bindActionCreators(
        {
            openModal,
        },
        dispatcher
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleFullVenue);
