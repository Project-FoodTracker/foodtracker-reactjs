import {combineReducers} from 'redux';
import restaurants from './restaurants';
import restaurant from './restaurant';
import authentication from './authentication';

export default combineReducers({
    restaurants,
    restaurant,
    authentication,
});
