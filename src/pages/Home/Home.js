import React, { Component } from "react";
import axios from "axios";

import "./Home.css";
import SearchBox from "./SearchBox";
import Spinner from "../../utility/Spinner/Spinner";
import Cities from "../../utility/Cities/Cities";

class Home extends Component {
    state = {
        cities: [],
        europeCities: {},
        asiaCities: {},
        exoticCities: {},
    };

    async componentDidMount() {
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
    }

    render() {
        if (this.state.cities.length === 0) {
            return <Spinner />;
        }

        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="home col s12">
                            <div className="upper-fold">
                                <SearchBox />
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
                            <Cities
                                cities={this.state.europeCities.cities}
                                header={this.state.europeCities.header}
                            />
                        </div>

                        <div className="col s12">
                            <Cities
                                cities={this.state.asiaCities.cities}
                                header={this.state.asiaCities.header}
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
