// import Request from '../services/Request';
import {RESTAURANTS_SUCCESS, RESTAURANTS_LOADING, RESTAURANTS_ERRORED} from '../constants/restaurants';

function hasErrored(message) {
    return {
        type: RESTAURANTS_ERRORED,
        status: false,
        message: message,
    };
}

function isLoading(bool) {
    return {
        type: RESTAURANTS_LOADING,
        isLoading: bool,
        status: true,
    };
}

function success(data) {
    return {
        type: RESTAURANTS_SUCCESS,
        isLoading: false,
        data: data,
        status: true,
        message: 'Restaurants successfully loaded',
    };
}

export function loadRestaurants(params = null) {
    return (dispatch) => {
        dispatch(isLoading(true));

        // todo: remove testdata
        setTimeout(() => {
            dispatch(success([
                {
                    title: 'Testdata'
                },
                {
                    title: 'Testdata2'
                }
            ]))
        }, 2000);

        // todo: implement request
        // let request = new Request();
        //
        // request.get('/restaurants/', params, true).then((data) => {
        //     dispatch(isLoading(false));
        //     return data;
        // }).then((data) => {
        //     dispatch(success(data));
        // }).catch((result) => {
        //     dispatch(hasErrored(result));
        // });
    };
}
