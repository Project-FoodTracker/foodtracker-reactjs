import React, {Component} from 'react';
import App from "../../components/App";
import Header from "../../components/Header";

class Restaurants extends Component {

    render() {
        return (
            <div className="screen screen-Restaurants">
                <Header/>
                <App/>
            </div>
        );
    }
}

export default Restaurants;
