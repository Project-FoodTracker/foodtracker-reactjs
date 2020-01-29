import React, {Component} from 'react';
import './Header.scss';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="row">
                    <div className="col-md-4">
                        <div className="brand-logo">
                            Project Foodtracker
                        </div>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="input-zip-search form-control" placeholder="Postleitzahl"/>
                    </div>
                    <div className="col-md-4 text-right">
                        <div className="user-info">
                            <div className="user-name">
                                John Doe
                            </div>
                            <div className="user-image">
                                <img alt="user" src={require('../../assets/img/user-placeholder.png')}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
