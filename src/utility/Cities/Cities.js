import React from "react";

import City from "../City/City";
import Slider from "../Slider/Slider";

const Cities = ({ cities }) => {
    const renderedCities = cities.map((city) => (
        <div className="col s3">
            <City key={city.id} city={city} />
        </div>
    ));

    return <Slider elements={renderedCities} />;
};

export default Cities;
