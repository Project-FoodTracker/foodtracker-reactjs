import React, {Component} from 'react';
import {Map as GoogleMap, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Map.scss';
import config from "../../utils/config";
import {loadRestaurants} from "../../actions/restaurants";
import {connect} from "react-redux";
import {loadRestaurant, openRestaurant, closeRestaurant} from "../../actions/restaurant";

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: {
                lat: 47.0631116,
                lng: 15.4341873,
            }
        };

        this.onMarkerClick = this.onMarkerClick.bind(this);
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

    async onMarkerClick(id) {
        if (this.props.restaurant.open) {
            this.props.closeRestaurant();

            setTimeout(async () => {
                await this.props.loadRestaurant(id);
                this.props.openRestaurant();
            }, 500);
        } else {
            await this.props.loadRestaurant(id);
            this.props.openRestaurant();
        }
    }

    render() {
        if (!this.props.restaurants.status) {
            alert(this.props.restaurants.message);
        }

        let location = this.state.location;
        if (this.props.restaurant.data && this.props.restaurant.open && this.props.restaurant.data.latitude && this.props.restaurant.data.longitude) {
            location = {
                lat: this.props.restaurant.data.latitude,
                lng: this.props.restaurant.data.longitude,
            }
        }

        return (
            <div className="Map">
                <GoogleMap
                    mapTypeControl={false}
                    google={this.props.google}
                    zoom={14}
                    initialCenter={this.state.location}
                    center={location}
                >
                    {this.renderMarker()}
                </GoogleMap>
            </div>
        );
    }

    renderMarker() {
        if (!this.props.restaurants.data || this.props.restaurants.data.length <= 0) {
            return null;
        }

        let result = [];
        this.props.restaurants.data.forEach((data, index) => {
            if (!data.latitude || !data.longitude) {
                return;
            }

            result.push(
                <Marker
                    key={"marker-" + data.id}
                    title={data.name}
                    name={data.name}
                    position={{
                        lat: data.latitude,
                        lng: data.longitude,
                    }}
                    onClick={() => this.onMarkerClick(data.id)}
                />
            );
        });

        return result;
    }
}

const mapStateToProps = state => ({
    restaurants: state.restaurants,
    restaurant: state.restaurant,
});

const mapDispatchToProps = {
    loadRestaurants: loadRestaurants,
    loadRestaurant: loadRestaurant,
    openRestaurant: openRestaurant,
    closeRestaurant: closeRestaurant,
};

Map = GoogleApiWrapper({
    apiKey: config.credentials.googleMaps.key,
})(Map);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Map);

