import React from "react";
import Venue from "../Venue/Venue";

import "./Venues.css";

const Venues = (props) => {
    const venues = props.venues.map((venue) => (
        <div key={venue.id} className="col m6 l3">
            <Venue venue={venue} />
        </div>
    ));

    return (
        <div className="venues">
            <h1 className="main-header-text">{props.header}</h1>
            {venues}
        </div>
    );
};

export default Venues;
