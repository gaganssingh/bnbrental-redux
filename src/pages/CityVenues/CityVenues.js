import React, { Component } from "react";
import axios from "axios";

import "./CityVenues.css";
import Spinner from "../../utility/Spinner/Spinner";
import Venues from "../../components/Venues/Venues";

class CityVenues extends Component {
    state = {
        venues: [],
        header: "",
    };

    async componentDidMount() {
        const cityName = this.props.match.params.cityName;
        const url = `${process.env.REACT_APP_API_URL}/venues/city/${cityName}`;
        const response = await axios.get(url);

        this.setState({
            venues: response.data.venues,
            header: response.data.header,
        });
    }
    render() {
        if (!this.state.header) {
            return <Spinner />;
        }

        return (
            <div className="row">
                <Venues venues={this.state.venues} header={this.state.header} />
            </div>
        );
    }
}

export default CityVenues;
