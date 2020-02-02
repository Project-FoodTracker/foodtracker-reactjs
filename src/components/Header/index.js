import React, {Component} from 'react';
import './Header.scss';
import {STORE_USER_NAME} from "../../services/Authentication";
import {setLocation} from "../../actions/map";
import {logout} from "../../actions/authentication";
import {connect} from "react-redux";

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            postalCode: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        logout();
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.state.postalCode.length === 4) {
            this.props.setLocation(this.state.postalCode);
        } else {
            alert("Please enter a valid postal code (e.g. 3100)");
        }
    }

    render() {
        return (
            <div className="Header">
                <div className="row">
                    <div className="col-md-4">
                        <div className="brand-logo">
                            Project Foodtracker
                        </div>
                    </div>
                    <div  className="col-md-4">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text"
                                   onChange={(e) => this.setState({postalCode: e.target.value})}
                                   value={this.state.postalCode}
                                   className="input-zip-search form-control"
                                   placeholder="Postleitzahl"/>
                        </form>
                    </div>
                    <div className="col-md-4 text-right">
                        <div className="user-info">
                            <div className="user-name">
                                {localStorage.getItem(STORE_USER_NAME)}
                            </div>
                            <div className="user-image">
                                <img alt="user" src={require('../../assets/img/user-placeholder.png')}/>
                            </div>
                            <a className="btn btn-danger" href="/" onClick={this.handleLogout}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    locationSet: state.locationSet,
});

const mapDispatchToProps = {
    setLocation: setLocation,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
