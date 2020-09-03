import React from "react";
import City from "../City/City";

const Cities = ({ cities }) => {
    return cities.map((city) => (
        <div className="col s3">
            <City key={city.id} city={city} />
        </div>
    ));
};

export default Cities;
