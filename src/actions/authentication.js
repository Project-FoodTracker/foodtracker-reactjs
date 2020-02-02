import Authentication from '../services/Authentication';
import {
    AUTHENTICATION_LOGIN_ERRORED,
    AUTHENTICATION_LOGIN_LOADING,
    AUTHENTICATION_LOGIN_SUCCESS,
} from "../constants/authentication";

function loginHasErrored(bool) {
    return {
        type: AUTHENTICATION_LOGIN_ERRORED,
        status: bool,
        isLoading: false,
    };
}

function loginIsLoading(bool) {
    return {
        type: AUTHENTICATION_LOGIN_LOADING,
        isLoading: bool,
        status: true,
    };
}

function loginSuccess(data) {
    return {
        type: AUTHENTICATION_LOGIN_SUCCESS,
        data: data,
    };
}

export function login(user, password) {
    return (dispatch) => {
        dispatch(loginIsLoading(true));

        Authentication.logIn(user, password)
            .then(data => {
                console.log(data);
                dispatch(loginIsLoading(false));
                return data;
            })
            .then((data) => dispatch(loginSuccess(data)))
            .catch(() => dispatch(loginHasErrored(true)));
    };
}

export function logout() {
    localStorage.clear();
    window.location.reload(true);
}
