import {
    REGISTER_LOGIN_SUCCESS,
    REGISTER_LOGIN_LOADING,
    REGISTER_LOGIN_ERRORED
} from '../constants/register';

const initialState = {
    isLoading: false,
    status: true,
    registered: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_LOGIN_SUCCESS:
            return {
                ...state,
                registered: action.data,
            };

        case REGISTER_LOGIN_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case REGISTER_LOGIN_ERRORED:
            return {
                ...state,
                isLoading: action.isLoading,
                status: action.status,
            };

        default:
            return state;
    }
}
