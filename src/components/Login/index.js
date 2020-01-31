import React, {Component} from 'react';
import './Login.scss';
import {login} from "../../actions/authentication";
import {connect} from "react-redux";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();

        if (this.state.username.length <= 0 || this.state.password.length <= 0) {
            alert("Please enter your user credentials");
            return;
        }

        this.props.login(this.state.username, this.state.password);
    }

    render() {
        return (
            <div className="Login">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-wrapper">
                            <h2>Login</h2>

                            <form onSubmit={this.handleSubmit} className="form-inline">
                                <div className="form-group mb-2">
                                    <input type="text"
                                           onChange={(e) => this.setState({username: e.target.value})}
                                           value={this.state.username}
                                           className="form-control"
                                           placeholder="Username"
                                    />
                                </div>
                                <div className="form-group mb-2 mx-sm-3">
                                    <input type="password"
                                           onChange={(e) => this.setState({password: e.target.value})}
                                           value={this.state.password}
                                           className="form-control"
                                           placeholder="Password"
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
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
)(Login);
