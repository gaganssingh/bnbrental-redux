import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./utility/NavBar/NavBar";
import Home from "./pages/Home/Home";
import SingleFullVenue from "./pages/SingleFullVenue/SingleFullVenue";
import Modal from "./utility/Modal/Modal";
import CityVenues from "./pages/CityVenues/CityVenues";
import "./App.css";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";

class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/" component={NavBar} />
                <Route exact path="/" component={Home} />
                <Route exact path="/venue/:vid" component={SingleFullVenue} />
                <Route exact path="/city/:cityName" component={CityVenues} />
                <Route
                    exact
                    path="/payment-success/:token"
                    component={PaymentSuccess}
                />
                <Route path="/" component={Modal} />
            </Router>
        );
    }
}

export default App;
