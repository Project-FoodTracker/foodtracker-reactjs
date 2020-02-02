const initialState = {
    location: {
        lat: 47.0631116,
        lng: 15.4341873,
    }
};

export default function (state = initialState, action) {
    return {
        ...state,
        location: action.location
    }
}

