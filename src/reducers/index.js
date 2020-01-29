import {combineReducers} from 'redux';
import restaurants from './restaurants';
import restaurant from './restaurant';

export default combineReducers({
    restaurants,
    restaurant,
});
