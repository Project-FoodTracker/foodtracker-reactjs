import React, {Component} from 'react';
import {login} from "../../actions/authentication";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import AuthenticationService from "../../services/Authentication";
import Login from "../../components/Login";
import Register from "../../components/Register";

class Authentication extends Component {

    componentDidMount() {
        // this.props.login("test", "test2");
    }

    render() {
        if (AuthenticationService.isLoggedIn()) {
            return (<Redirect to="/"/>);
        }

        return (
            <div className="screen screen-Authentication">
                <div className="container">
                    <Login />
                    <hr />
                    <Register />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authentication: state.authentication,
});

const mapDispatchToProps = {
    login: login,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Authentication);
