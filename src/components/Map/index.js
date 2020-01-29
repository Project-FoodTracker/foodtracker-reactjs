import React, {Component} from 'react';
import {Map as GoogleMap, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Map.scss';
import config from "../../utils/config";
import {loadRestaurants} from "../../actions/restaurants";
import {connect} from "react-redux";

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: {
                lat: 47.0631116,
                lng: 15.4341873,
            }
        };
    }

    componentDidMount() {
        this.props.loadRestaurants();
        this.setCurrentLocation();
    }

    setCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                        location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }
                    }
                );
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
        );
    }

    render() {
        console.log(this.props);
        return (
            <div className="Map">
                <GoogleMap
                    google={this.props.google}
                    zoom={14}
                    initialCenter={this.state.location}
                    center={this.state.location}
                >

                </GoogleMap>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    restaurants: state.restaurants,
});

const mapDispatchToProps = {
    loadRestaurants: loadRestaurants,
};

Map = GoogleApiWrapper({
    apiKey: config.credentials.googleMaps.key,
})(Map);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Map);

