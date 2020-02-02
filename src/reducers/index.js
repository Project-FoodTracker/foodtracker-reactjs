import {combineReducers} from 'redux';
import restaurants from './restaurants';
import restaurant from './restaurant';
import authentication from './authentication';
import register from './register';
import map from './map.js';

export default combineReducers({
    restaurants,
    restaurant,
    authentication,
    register,
    map,
});
