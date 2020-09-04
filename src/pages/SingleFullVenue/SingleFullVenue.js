import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import openModal from "../../actions/openModal";
import Point from "../../components/Point/Point";
import "./SingleFullVenue.css";
import Login from "../../components/Login/Login";

class SingleFullVenue extends Component {
    state = {
        singleVenue: {},
        points: [],
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

    reserveNow = (e) => console.log("RESERVE BUTTON PRESSED");

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
                            <input type="date" name="check-in" id="check-in" />
                        </div>
                        <div className="col s6">
                            Check-Out
                            <input
                                type="date"
                                name="check-out"
                                id="check-out"
                            />
                        </div>

                        <div className="col s12">
                            <select
                                name="guests"
                                id="guests"
                                className="browser-default"
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
