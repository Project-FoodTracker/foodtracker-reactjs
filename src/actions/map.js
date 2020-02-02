import Geocoder from "react-native-geocoding";
import config from "../utils/config";

export function setLocation(postalCode) {
    return (dispatch) => {
        Geocoder.init(config.credentials.googleMaps.key);
        Geocoder.from(postalCode + " Österreich").then(json => {
            console.log(json);
            let loc = json.results[0].geometry.location;
            dispatch(success(loc));
        },
        (error) => {
            console.log(error.code, error.message);
        });
    }
}

function success(data) {
    return {
        type: 'LOCATION_SET',
        location: data
    };
}
