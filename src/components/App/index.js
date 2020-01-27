import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadRestaurants} from "../../actions/restaurants";
import logo from '../../assets/img/logo.svg';
import './App.scss';

class App extends Component {

    componentDidMount() {
        this.props.loadRestaurants();
    }

    render() {

        console.log(this.props);

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    restaurants: state.restaurants,
});

const mapDispatchToProps = {
    loadRestaurants: loadRestaurants,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
