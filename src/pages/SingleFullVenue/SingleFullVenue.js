import React, { Component } from "react";
import axios from "axios";

import "./SingleFullVenue.css";
import Point from "../../components/Point/Point";

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
        const { amenities, details, guests, id, imageUrl, location, pricePerNight, rating, title } = this.state.singleVenue;
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
                            <button
                                onClick={this.reserveNow}
                                className="btn red accent-2"
                            >
                                Reserve
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// amenities: "Wifi"
// details: "Romantic hideaway! This property has the lush beauty and privacy of Hana, without the drive! Only 15-20 minutes to the airport, 10 minutes to beaches, 2 minutes to restaurants and shops...on a private gated property with organic nursery. BEAUTIFUL!"
// guests: 2
// id: 3
// imageUrl: "https://airbnb-clone-prexel-images.s3.amazonaws.com/waypoints/pondhouse.jpg"
// location: " ENTIRE CABIN · ASHFIELD"
// points: "Entire home,Self check-in,Sparkling clean,Superhost"
// pricePerNight: 238
// rating: 4.75
// title: "The Pondhouse - A Magical Place"
// uid: 1

export default SingleFullVenue;
