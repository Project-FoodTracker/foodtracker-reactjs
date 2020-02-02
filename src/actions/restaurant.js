import Request from '../services/Request';
import {
    RESTAURANT_SUCCESS,
    RESTAURANT_LOADING,
    RESTAURANT_ERRORED,
    RESTAURANT_CLOSED,
    RESTAURANT_OPEN, RESTAURANT_RATING, RESTAURANT_RATINGS,
    RESTAURANT_ADD_RATINGS,
    RESTAURANT_OPEN_RATINGFORM, RESTAURANT_OPEN_FORM, RESTAURANT_ADD
} from '../constants/restaurant';
import Geocoder from "react-native-geocoding";
import config from "../utils/config";

function hasErrored(message) {
    return {
        type: RESTAURANT_ERRORED,
        status: false,
        message: message,
    };
}

function isLoading(bool) {
    return {
        type: RESTAURANT_LOADING,
        isLoading: bool,
        status: true,
    };
}

function success(data) {
    return {
        type: RESTAURANT_SUCCESS,
        isLoading: false,
        data: data,
        status: true,
        message: 'Restaurant successfully loaded',
    };
}

function rating(rating) {
    return {
        type: RESTAURANT_RATING,
        isLoading: false,
        rating: rating,
        status: true,
        message: 'Restaurant rating successfully loaded',
    };
}

function ratings(ratings) {
    return {
        type: RESTAURANT_RATINGS,
        isLoading: false,
        ratings: ratings,
        status: true,
        message: 'Restaurant ratings successfully loaded',
    };
}

export function loadRestaurant(id) {
    return (dispatch) => {
        dispatch(isLoading(true));

        if (!id) {
            dispatch(hasErrored('Error loading restaurant. Please try again.'));
            return;
        }

        let request = new Request();

        request.get('/restaurants/' + id, null, true).then((data) => {
            dispatch(isLoading(false));
            return data;
        }).then((data) => {
            dispatch(success(data));
        }).catch((result) => {
            dispatch(hasErrored(result));
        });
    };
}

export function loadRestaurantRating(id) {
    return (dispatch) => {
        let request = new Request();

        request.get('/ratings/avg/' + id, null, true).then((data) => {
            return data;
        }).then((data) => {
            dispatch(rating(data));
        });
    };
}

export function loadRestaurantRatings(id) {
    return (dispatch) => {
        let request = new Request();

        request.get('/ratings/restaurant/' + id, null, true).then((data) => {
            return data;
        }).then((data) => {
            dispatch(ratings(data));
        });
    };
}

export function openRestaurant() {
    return {
        type: RESTAURANT_OPEN,
        open: true,
        status: true,
    }
}

export function closeRestaurant() {
    return {
        type: RESTAURANT_CLOSED,
        open: false,
        status: true,
        data: null,
    }
}

export function openRatingForm(open) {
    return {
        type: RESTAURANT_OPEN_RATINGFORM,
        ratingFormOpen: open,
    }
}

function addRatingSuccess() {
    return {
        type: RESTAURANT_ADD_RATINGS,
        addedRating: true,
    }
}

export function addRating(restaurant, dish, rating, comment) {
    return (dispatch) => {
        let request = new Request();
        return request.post('/ratings', {
            restaurant: restaurant,
            dish: dish,
            rating: parseInt(rating),
            comment: comment
        }, true).then((data) => {
            dispatch(addRatingSuccess());
        }).catch((reason) => {
            console.log(reason);
        });
    };
}

export function openRestaurantForm(open) {
    return {
        type: RESTAURANT_OPEN_FORM,
        restaurantFormOpen: open,
    }
}

function addRestaurantSuccess() {
    return {
        type: RESTAURANT_ADD,
        addedRestaurant: true,
    }
}

export function addRestaurant(name, street, number, postalCode) {
    return async (dispatch) => {
        let request = new Request();
        let lat = "";
        let lng = "";

        Geocoder.init(config.credentials.googleMaps.key);
        await Geocoder.from(street + " " + number + " " + postalCode + " Österreich").then(json => {
                console.log(json);
                lat = json.results[0].geometry.location.lat;
                lng = json.results[0].geometry.location.lng;
            },
            (error) => {
                console.log(error.code, error.message);
            });

        return request.post('/restaurants', {
            name: name,
            street: street,
            number: number,
            postalCode: postalCode,
            latitude: lat,
            longitude: lng
        }, true).then((data) => {
            dispatch(addRestaurantSuccess());
        }).catch((reason) => {
            console.log(reason);
        });
    };
}
