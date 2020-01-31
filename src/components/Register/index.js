import React, {Component} from 'react';
import './Register.scss';
import {registration} from "../../actions/register";
import {connect} from "react-redux";

class Register extends Component {

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

        this.props.registration(this.state.username, this.state.password);
    }

    renderInfo() {

        console.log(this.props);
        if (!this.props.register.status && !this.props.register.isLoading && !this.props.register.registered) {
            return (
                <div className="alert alert-danger">Registration failed. Please try again.</div>
            )
        }

        if (this.props.register.status && this.props.register.registered) {
            return (
                <div className="alert alert-info">Registration successful. Try to login in.</div>
            )
        }
    }

    render() {
        return (
            <div className="Register mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-wrapper">

                            <h2>Register</h2>

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
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </form>
                        </div>
                        {this.renderInfo()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    register: state.register,
});

const mapDispatchToProps = {
    registration: registration,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Register);
