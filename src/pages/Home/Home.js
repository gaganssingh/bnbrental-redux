import React, { Component } from "react";
import axios from "axios";

import SearchBox from "./SearchBox";
import Spinner from "../../utility/Spinner/Spinner";
import Activities from "../../components/Activities/Activities";
import Cities from "../../components/Cities/Cities";
import Venues from "../../components/Venues/Venues";
import "./Home.css";

class Home extends Component {
    state = {
        cities: [],
        europeCities: {},
        asiaCities: {},
        exoticCities: {},
        activities: [],
        venues: {},
        superHostVenues: {},
    };

    async componentDidMount() {
        // CITIES ENDPOINTS
        // build urls for all endpoints
        const citiesUrl = `${process.env.REACT_APP_API_URL}/cities/recommended`;
        const europeCitiesUrl = `${process.env.REACT_APP_API_URL}/cities/europe`;
        const asiaCitiesUrl = `${process.env.REACT_APP_API_URL}/cities/asia`;
        const exoticCitiesUrl = `${process.env.REACT_APP_API_URL}/cities/exotic`;

        const citiesPromises = [];
        citiesPromises.push(axios.get(citiesUrl));
        citiesPromises.push(axios.get(europeCitiesUrl));
        citiesPromises.push(axios.get(asiaCitiesUrl));
        citiesPromises.push(axios.get(exoticCitiesUrl));
        Promise.all(citiesPromises).then((data) => {
            const recommendedCities = data[0].data;
            const europeCities = data[1].data;
            const asiaCities = data[2].data;
            const exoticCities = data[3].data;

            this.setState({
                cities: recommendedCities,
                europeCities,
                asiaCities,
                exoticCities,
            });
        });

        // ACTIVITIES ENDPOINTS
        const activitiesUrl = `${process.env.REACT_APP_API_URL}/activities/today`;
        const activities = await axios.get(activitiesUrl);
        this.setState({ activities: activities.data });

        // VENUES ENDPOINT
        const venuesUrl = `${process.env.REACT_APP_API_URL}/venues/recommended`;
        const superHostVenuesUrl = `${process.env.REACT_APP_API_URL}/venues/superHost`;
        const venuesPromises = [];
        venuesPromises.push(axios.get(venuesUrl));
        venuesPromises.push(axios.get(superHostVenuesUrl));
        Promise.all(venuesPromises).then((data) => {
            this.setState({
                venues: data[0].data,
                superHostVenues: data[1].data,
            });
        });
    }

    render() {
        if (this.state.cities.length === 0 || !this.state.venues.venues) {
            return <Spinner />;
        }

        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="home col s12">
                            <div className="upper-fold">
                                <SearchBox history={this.props.history} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid lower-fold">
                    <div className="row">
                        <div className="col s12">
                            <Cities
                                cities={this.state.cities}
                                header="Recommended Cities For You"
                            />
                        </div>

                        <div className="col s12">
                            <Activities
                                activities={this.state.activities}
                                header="Today in your area"
                            />
                        </div>

                        <div className="col s12">
                            <Cities
                                cities={this.state.europeCities.cities}
                                header={this.state.europeCities.header}
                            />
                        </div>

                        <div className="col s12">
                            <Venues
                                venues={this.state.venues.venues}
                                header={this.state.venues.header}
                            />
                        </div>

                        <div className="col s12">
                            <Cities
                                cities={this.state.asiaCities.cities}
                                header={this.state.asiaCities.header}
                            />
                        </div>

                        <div className="col s12">
                            <Venues
                                venues={this.state.superHostVenues.venues}
                                header={this.state.superHostVenues.header}
                            />
                        </div>

                        <div className="col s12">
                            <Cities
                                cities={this.state.exoticCities.cities}
                                header={this.state.exoticCities.header}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
