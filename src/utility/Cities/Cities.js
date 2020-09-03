import React from "react";

import City from "../City/City";
import Slider from "../Slider/Slider";

const Cities = ({ cities, header }) => {
    const renderedCities = cities.map((city) => (
        <div className="col s3" key={city.id}>
            <City city={city} />
        </div>
    ));

    return (
        <div className="cities-wrapper">
            <h1 className="main-header-text">{header}</h1>
            <Slider elements={renderedCities} />
        </div>
    );
};

export default Cities;
