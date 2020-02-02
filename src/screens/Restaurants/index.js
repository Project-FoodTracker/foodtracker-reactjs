import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Header from "../../components/Header";
import Map from "../../components/Map";
import Restaurant from "../../components/Restaurant";
import Authentication from "../../services/Authentication";
import RatingForm from "../../components/RatingForm";

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
                <RatingForm/>
            </div>
        );
    }
}

export default Restaurants;
