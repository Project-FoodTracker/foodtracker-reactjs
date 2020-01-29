import React, {Component} from 'react';
import './Restaurant.scss';
import {loadRestaurant, openRestaurant, closeRestaurant} from "../../actions/restaurant";
import {connect} from "react-redux";
import config from "../../utils/config";

class Restaurant extends Component {
    render() {
        return (
            <div className={"Restaurant " + (this.props.restaurant.open ? 'is--open' : 'is--closed')}>
                <div className="row">
                    <div className="col-md-12">
                        {this.renderDetails()}
                    </div>
                </div>
            </div>
        );
    }

    renderDetails() {
        if (this.props.restaurant.isLoading) {
            return (
                <div className="text-center">Loading...</div>
            );
        }

        if (!this.props.restaurant.data || this.props.restaurant.data.length <= 0) {
            return (
                <div className="alert alert-info">Error. Please try again.</div>
            );
        }

        return (
            <div className="details">
                <div className="title-wrapper">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="title">{this.props.restaurant.data.name}</h1>
                        </div>
                        <div className="col-md-6 text-right">
                            Bewertung
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="address">
                            <span className="street">{this.props.restaurant.data.street}</span>
                            <span className="number">{this.props.restaurant.data.number},</span>
                            <span className="postal-code">{this.props.restaurant.data.postalCode}</span>
                            <span className="country">{this.props.restaurant.data.country}</span>
                        </div>
                    </div>
                </div>
                {this.renderDetailsImages()}
            </div>
        )
    }

    renderDetailsImages() {
        if (!this.props.restaurant.data.images) {
            return null;
        }

        let result = [];

        this.props.restaurant.data.images.forEach((data, index) => {

            const url = config.api.imageUrl + data.path.replace("./", "/") + data.fileName;

            result.push(
                <div className="col-md-6" key={"image-" + index}>
                    <img src={url} className="img-fluid" alt={"image" + index}/>
                </div>
            );
        });

        return (
            <div className="row">
                <div className="col-md-12">
                    <h6>Bilder</h6>
                    <div className="row">
                        {result}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    restaurant: state.restaurant,
});

const mapDispatchToProps = {
    loadRestaurant: loadRestaurant,
    openRestaurant: openRestaurant,
    closeRestaurant: closeRestaurant,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Restaurant);
