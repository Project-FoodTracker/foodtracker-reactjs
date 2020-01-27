import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.scss';
import App from './components/App';
import * as serviceWorker from './utils/serviceWorker';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import reducer from './reducers';

const initState = {};
const store = createStore(reducer, initState, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/test/" component={App}/>
                <Redirect to="/404/" />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
