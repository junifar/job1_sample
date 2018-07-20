import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ResultHeader extends Component{

    render(){
        return(
            <div className="my-booking-detail-content">
                <div className="my-booking-detail-content-header">
                    <div className="my-booking-detail-content-header-title">
                        <p>{this.props.itinerary.origin.city} ({this.props.itinerary.origin.iata})<i className="material-icons">arrow_forward</i> {this.props.itinerary.destination.city} ({this.props.itinerary.destination.iata})</p>
                    </div>
                    <div className="my-booking-detail-content-header-date">
                        {moment(this.props.itinerary.departureTime).locale('id').format("dddd, D MMMM YYYY")} • {this.props.adults} Adults, {this.props.children > 0 ? this.props.children + 'Children' : ''}, {this.props.infants > 0 ? this.props.infants + 'Infants' : ''} • {this.props.seat_class}
                    </div>
                </div>
            </div>
        );
    }
}


ResultHeader.propTypes = {
    seat_class: PropTypes.string
};
