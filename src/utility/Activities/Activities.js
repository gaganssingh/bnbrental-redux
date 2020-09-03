import React, { Component } from "react";
import Activity from "../Activity/Activity";

class Activities extends Component {
    render() {
        const activities = this.props.activities.map((activity) => (
            <div className="col s2" key={activity.id}>
                <Activity activity={activity} />
            </div>
        ));
        return (
            <div className="activities">
                <h1 className="main-header-text">{this.props.header}</h1>
                {activities}
            </div>
        );
    }
}

export default Activities;
