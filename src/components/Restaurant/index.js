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
                        <div className="col-md-6 text-right rating">
                            {isNaN(this.props.restaurant.rating) ? "nicht bewertet" : Number(this.props.restaurant.rating).toFixed(2)+ " / 5"}
                            <img alt="rating" className="star" src={require('../../assets/img/star.png')}/>
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
                {this.renderOpeningHours()}
                <br/>
                {this.renderDetailsImages()}
                <br/>
                {this.renderRatings()}
            </div>
        )
    }

    renderRatings() {
        if (!this.props.restaurant.ratings) {
            return null;
        }

        let result = [];
        this.props.restaurant.ratings.forEach((data, index) => {
            result.push(
                <div className="col-md-auto" key={index}>
                    <img alt="rating" className="star-mini" src={require('../../assets/img/star.png')}/>
                    {data.rating}: {data.dish} {(data.comment) ? " - " + data.comment : ""}
                </div>
            );
        });

        return (
            <div className="row">
                <div className="col-md-12">
                    <h6>Bewertungen</h6>
                    {result}
                </div>
            </div>
        )
    }

    renderOpeningHours() {
        if (!this.props.restaurant.data.openingHours) {
            return null;
        }

        let result = [];
        Object.entries(this.props.restaurant.data.openingHours).forEach((data, index) => {
            let time = Object(data[1]);
            let from = new Date(time.from);
            let to = new Date(time.to);

            let fromTo = "";
            if(isNaN(from.getHours()) || isNaN(to.getHours())) {
              fromTo = "geschlossen";
            } else {
                fromTo = from.getHours() + ":" + from.getMinutes() + "-" + to.getHours() + ":" + to.getMinutes();
            }

            result.push(
                <div className="col-md-8" key={index}>
                    <span>{data[0]}: </span>
                    <span>{fromTo}</span>
                </div>
            );
        });

        return (
                <div className="row">
                    <div className="col-md-12">
                        <h6>Öffnungszeiten</h6>
                        {result}
                    </div>
                </div>
            )
    }

    renderDetailsImages() {
        if (!this.props.restaurant.data.images) {
            return null;
        }

        let result = [];

        this.props.restaurant.data.images.forEach((data, index) => {

            const url = config.api.imageUrl + data.path + data.fileName;

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
                    {result}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    restaurant: state.restaurant,
    rating: state.rating
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
