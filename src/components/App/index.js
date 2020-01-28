import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadRestaurants} from "../../actions/restaurants";
import './App.scss';

class App extends Component {

    componentDidMount() {
        this.props.loadRestaurants();
    }

    render() {

        console.log(this.props);

        return (
            <div className="App">
                APP
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
