import React, {Component} from 'react';
import Header from "../../components/Header";
import Map from "../../components/Map";
import Restaurant from "../../components/Restaurant";

class Restaurants extends Component {

    render() {
        return (
            <div className="screen screen-Restaurants">
                <Header/>
                <Map/>
                <Restaurant/>
            </div>
        );
    }
}

export default Restaurants;
