import React, {Component} from 'react';
import Header from "../../components/Header";
import Map from "../../components/Map";

class Restaurants extends Component {

    render() {
        return (
            <div className="screen screen-Restaurants">
                <Header/>
                <Map/>
            </div>
        );
    }
}

export default Restaurants;
