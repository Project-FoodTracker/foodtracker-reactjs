import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Header from "../../components/Header";
import Map from "../../components/Map";
import Restaurant from "../../components/Restaurant";
import Authentication from "../../services/Authentication";

class Restaurants extends Component {


    render() {
        if (!Authentication.isLoggedIn()) {
            return (<Redirect to="/login/"/>);
        }

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
