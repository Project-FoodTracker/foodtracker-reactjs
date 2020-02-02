import React, {Component} from 'react';
import './RestaurantForm.scss';
import {
    loadRestaurant,
    openRestaurant,
    closeRestaurant,
    openRatingForm,
    addRating,
    loadRestaurantRatings,
    loadRestaurantRating, addRestaurant, openRestaurantForm
} from "../../actions/restaurant";
import {connect} from "react-redux";
import {loadRestaurants} from "../../actions/restaurants";

class RestaurantForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            street: "",
            number: "",
            postalCode: "",
            openingHours: null,
            images: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.openRestaurant = this.openRestaurant.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.name.length <= 0 ||
            this.state.street.length <= 0 ||
            this.state.number.length <= 0 ||
            this.state.postalCode.length <= 0) {
            alert("Please enter all data");
            return;
        }

        this.props.addRestaurant(
            this.state.name,
            this.state.street,
            this.state.number,
            this.state.postalCode,
        ).then(data => {
            this.openRestaurant(false);
        });

        this.state.name = "";
        this.state.street = "";
        this.state.number = "";
        this.state.cpostalCode = "";
    }

    openRestaurant(bool) {
        this.props.loadRestaurants();
        this.props.openRestaurantForm(bool);
    }

    render() {
        return (
            <div className={"RestaurantForm " + (this.props.restaurant.restaurantFormOpen ? 'is--open' : 'is--closed')}>
                <h1>Neues Restaurant hinzufügen</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text"
                               onChange={(e) => this.setState({name: e.target.value})}
                               value={this.state.name}
                               className="form-control"
                               placeholder="Name"
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                               onChange={(e) => this.setState({street: e.target.value})}
                               value={this.state.street}
                               className="form-control"
                               placeholder="Straße"
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                               onChange={(e) => this.setState({number: e.target.value})}
                               value={this.state.number}
                               className="form-control"
                               placeholder="Hausnummer"
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                               onChange={(e) => this.setState({postalCode: e.target.value})}
                               value={this.state.postalCode}
                               className="form-control"
                               placeholder="PLZ"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-3">Restaurant hinzufügen</button>
                        <button type="button" className="btn btn-outline-info"
                                onClick={() => this.openRestaurant(false)}>Schließen
                        </button>
                    </div>
                </form>

            </div>
        );
    }

}

const mapStateToProps = state => ({
    restaurant: state.restaurant
});

const mapDispatchToProps = {
    loadRestaurants: loadRestaurants,
    addRestaurant: addRestaurant,
    openRestaurantForm: openRestaurantForm,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RestaurantForm);
