import Request from '../services/Request';
import {
    REGISTER_LOGIN_ERRORED,
    REGISTER_LOGIN_LOADING,
    REGISTER_LOGIN_SUCCESS
} from "../constants/register";

function hasErrored(bool) {
    return {
        type: REGISTER_LOGIN_ERRORED,
        status: bool,
        isLoading: false,
    };
}

function isLoading(bool) {
    return {
        type: REGISTER_LOGIN_LOADING,
        isLoading: bool,
        status: true,
    };
}

function success(data) {
    return {
        type: REGISTER_LOGIN_SUCCESS,
        data: data,
    };
}

export function registration(user, password) {
    return (dispatch) => {
        dispatch(isLoading(true));

        let request = new Request();
        return request.post('/register/', {
            username: user,
            password: password
        }).then((data) => {
            dispatch(isLoading(false));
            dispatch(success(data));
        }).catch((reason) => {
            dispatch(hasErrored(false))
        });
    };
}
