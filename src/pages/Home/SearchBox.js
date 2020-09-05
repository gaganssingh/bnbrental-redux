import React, { Component } from "react";

import "./SearchBox.css";

class SearchBox extends Component {
    state = {
        where: "",
        checkIn: "",
        checkOut: "",
        guests: 0,
    };

    changeWhere = (e) => this.setState({ where: e.target.value });
    changeCheckIn = (e) => this.setState({ checkIn: e.target.value });
    changeCheckOut = (e) => this.setState({ checkOut: e.target.value });
    changeGuests = (e) => this.setState({ guests: e.target.value });

    submitSearch = (e) => {
        e.preventDefault();
        this.props.history.push(`/search/${this.state.where}`);
    };

    render() {
        return (
            <div className="home-search-box col m4">
                <h1>Book unique places to stay and things to do.</h1>

                <form className="search-box-form" onSubmit={this.submitSearch}>
                    {/* Input box for location name */}
                    <div className="col m12">
                        <div className="form-label">Where</div>
                        <div className="input-field" id="where">
                            <input
                                type="text"
                                className="browser-default"
                                placeholder="Anywhere"
                                value={this.state.where}
                                onChange={this.changeWhere}
                            />
                        </div>
                    </div>

                    {/* Date picker for check in date */}
                    <div className="col m6">
                        <div className="form-label">Check-In</div>
                        <div className="input-field" id="check-in">
                            <input
                                type="date"
                                className="browser-default"
                                value={this.state.checkIn}
                                onChange={this.changeCheckIn}
                            />
                        </div>
                    </div>
                    {/* Date picker for check out date */}
                    <div className="col m6">
                        <div className="form-label">Check-Out</div>
                        <div className="input-field" id="check-in">
                            <input
                                type="date"
                                className="browser-default"
                                value={this.state.checkOut}
                                onChange={this.changeCheckOut}
                            />
                        </div>
                    </div>

                    {/* Number box for entering no. of guests */}
                    <div className="col m12">
                        <div className="form-label">Guests</div>
                        <div className="input-field" id="where">
                            <input
                                type="number"
                                className="browser-default"
                                placeholder="Number of guests"
                                value={this.state.guests}
                                onChange={this.changeGuests}
                            />
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="col m12 submit-btn">
                        <div className="input-field" id="submit-btn">
                            <input
                                className="btn-large waves-effect waves-light red accent-2"
                                type="submit"
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBox;
