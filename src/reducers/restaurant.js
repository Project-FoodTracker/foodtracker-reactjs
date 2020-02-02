import {
    RESTAURANT_ERRORED,
    RESTAURANT_LOADING,
    RESTAURANT_SUCCESS,
    RESTAURANT_OPEN,
    RESTAURANT_CLOSED, RESTAURANT_RATING, RESTAURANT_RATINGS,
    RESTAURANT_ADD_RATINGS,
    RESTAURANT_OPEN_RATINGFORM, RESTAURANT_ADD, RESTAURANT_OPEN_FORM
} from '../constants/restaurant';

const initialState = {
    isLoading: false,
    status: true,
    data: null,
    message: null,
    open: false,
    rating: 0.0,
    ratings: null,
    ratingFormOpen: false,
    addedRating: false,
    restaurantFormOpen: false,
    addedRestaurant: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RESTAURANT_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading,
                status: action.status,
                data: action.data,
                message: action.message,
                rating: action.rating
            };

        case RESTAURANT_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case RESTAURANT_ERRORED:
            return {
                ...state,
                status: action.status,
                message: action.message,
            };

        case RESTAURANT_OPEN:
            return {
                ...state,
                open: action.open,
                status: action.status,
            };

        case RESTAURANT_CLOSED:
            return {
                ...state,
                open: action.open,
                data: action.data,
                status: action.status,
            };

        case RESTAURANT_RATING:
            return {
                ...state,
                status: action.status,
                isLoading: action.isLoading,
                rating: action.rating
            };

        case RESTAURANT_RATINGS:
            return {
                ...state,
                status: action.status,
                isLoading: action.isLoading,
                ratings: action.ratings
            };

        case RESTAURANT_ADD_RATINGS:
            return {
                ...state,
                addedRating: action.addedRating,
            };

        case RESTAURANT_OPEN_RATINGFORM:
            return {
                ...state,
                ratingFormOpen: action.ratingFormOpen,
            };

        case RESTAURANT_ADD:
            return {
                ...state,
                addedRestaurant: action.addedRestaurant,
            };

        case RESTAURANT_OPEN_FORM:
            return {
                ...state,
                restaurantFormOpen: action.restaurantFormOpen,
            };

        default:
            return state;
    }
}
