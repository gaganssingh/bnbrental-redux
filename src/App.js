import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./utility/NavBar/NavBar";
import Home from "./pages/Home/Home";

class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/" component={NavBar} />
                <Route exact path="/" component={Home} />
            </Router>
        );
    }
}

export default App;
