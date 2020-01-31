import Request from '../services/Request';
import {
    RESTAURANT_SUCCESS,
    RESTAURANT_LOADING,
    RESTAURANT_ERRORED,
    RESTAURANT_CLOSED,
    RESTAURANT_OPEN
} from '../constants/restaurant';

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
