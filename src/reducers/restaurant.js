import {
    RESTAURANT_ERRORED,
    RESTAURANT_LOADING,
    RESTAURANT_SUCCESS,
    RESTAURANT_OPEN,
    RESTAURANT_CLOSED,
} from '../constants/restaurant';

const initialState = {
    isLoading: false,
    status: true,
    data: null,
    message: null,
    open: false,
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

        default:
            return state;
    }
}
