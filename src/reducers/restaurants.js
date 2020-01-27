import {
    RESTAURANTS_ERRORED,
    RESTAURANTS_LOADING,
    RESTAURANTS_SUCCESS,
} from '../constants/restaurants';

const initialState = {
    isLoading: false,
    status: true,
    data: [],
    message: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RESTAURANTS_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading,
                status: action.status,
                data: action.data,
                message: action.message,
            };

        case RESTAURANTS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case RESTAURANTS_ERRORED:
            return {
                ...state,
                status: action.status,
                message: action.message,
            };

        default:
            return state;
    }
}
