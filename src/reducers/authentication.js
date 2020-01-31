import {
    AUTHENTICATION_LOGIN_SUCCESS,
    AUTHENTICATION_LOGIN_LOADING,
    AUTHENTICATION_LOGIN_ERRORED,
    AUTHENTICATION_LOGOUT_SUCCESS,
} from '../constants/authentication';

const initialState = {
    isLoading: false,
    status: false,
    loggedIn: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATION_LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: action.data,
            };

        case AUTHENTICATION_LOGIN_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case AUTHENTICATION_LOGIN_ERRORED:
            return {
                ...state,
                isLoading: action.isLoading,
                status: action.status,
            };

        case AUTHENTICATION_LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
}
