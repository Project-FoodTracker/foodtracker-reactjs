import React, {Component} from 'react';
import './RatingForm.scss';
import {
    loadRestaurant,
    openRestaurant,
    closeRestaurant,
    openRatingForm,
    addRating,
    loadRestaurantRatings,
    loadRestaurantRating
} from "../../actions/restaurant";
import {connect} from "react-redux";

class RatingForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dish: "",
            rating: "",
            comment: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadRatings = this.loadRatings.bind(this);
        this.openRating = this.openRating.bind(this);
    }

    componentDidMount() {
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.props.restaurant.data.id.length <= 0 ||
            this.state.dish.length <= 0 ||
            this.state.rating.length <= 0 ||
            this.state.comment.length <= 0) {
            alert("Please enter all data");
            return;
        }

        this.props.addRating(
            this.props.restaurant.data.id,
            this.state.dish,
            this.state.rating,
            this.state.comment,
        ).then(data => {
            this.loadRatings();
        });

        this.state.dish = "";
        this.state.rating = "";
        this.state.comment = "";
    }

    loadRatings() {
        this.props.loadRestaurantRatings(this.props.restaurant.data.id);
        this.props.loadRestaurantRating(this.props.restaurant.data.id);
        this.props.openRatingForm(false);
    }

    openRating(bool) {
        this.props.openRatingForm(bool);
    }

    render() {
        return (
            <div className={"RatingForm " + (this.props.restaurant.ratingFormOpen ? 'is--open' : 'is--closed')}>
                <h1>Neue Bewertung hinzufügen</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text"
                               onChange={(e) => this.setState({dish: e.target.value})}
                               value={this.state.dish}
                               className="form-control"
                               placeholder="Gericht"
                        />
                    </div>
                    <div className="form-group">
                        <input type="number"
                               onChange={(e) => this.setState({rating: e.target.value})}
                               value={this.state.rating}
                               className="form-control"
                               placeholder="Bewertung"
                               min="1"
                               max="5"
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                               onChange={(e) => this.setState({comment: e.target.value})}
                               value={this.state.comment}
                               className="form-control"
                               placeholder="Kommentar"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-3">Bewertung hinzufügen</button>
                        <button type="button" className="btn btn-outline-info"
                                onClick={() => this.openRating(false)}>Schließen
                        </button>
                    </div>
                </form>

            </div>
        );
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
    openRatingForm: openRatingForm,
    addRating: addRating,
    loadRestaurantRatings: loadRestaurantRatings,
    loadRestaurantRating: loadRestaurantRating,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RatingForm);
