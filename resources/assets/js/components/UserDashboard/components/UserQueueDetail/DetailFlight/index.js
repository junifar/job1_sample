import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class DetailFlight extends Component{

  static propTypes = {
    itinerary: PropTypes.object
  };

  render(){
    var departure_time = moment(this.props.itinerary.departureTime);
    var arrival_time = moment(this.props.itinerary.arrivalTime);
    var duration = moment.duration(arrival_time.diff(departure_time));
    return(
      <div className="my-booking-detail" style={{width: "100%", boxShadow: "none", margin: "0px"}}>
        <div className="my-booking-detail-title">
          <p>Booking Summary</p>
        </div>
        <div className="my-booking-detail-content">
          <div className="my-booking-detail-content-header">
            <div className="my-booking-detail-content-header-title">
              <p>{this.props.itinerary.origin.city}<i className="material-icons">arrow_forward</i> {this.props.itinerary.destination.city}</p>
            </div>
          </div>
          <div className="my-booking-detail-content-body">
            <div className="my-booking-detail-inner-header">
              <div className="my-booking-detail-inner-header-title">
                {moment(this.props.itinerary.departureTime).format("dddd, DD MMM YYYY")}
              </div>
              <div className="my-searchresult-column airlinelogo">
                <img src="https://www.gstatic.com/flights/airline_logos/70px/GA.png" className="img-fluid flight-result-card__img" alt="Responsive" />
              </div>
              <div className="my-booking-detail-inner-header-title">
                Garuda
              </div>
              <div className="my-booking-detail-inner-header-title">
                {this.props.seat_class}
              </div>
            </div>
            <div className="my-booking-detail-inner-body">
              <div className="my-booking-detail-inner">
                <div>
                  <div className="my-booking-detail-time">{moment(this.props.itinerary.departureTime).format("HH:mm")}</div>
                  <div className="my-booking-detail-time">{moment(this.props.itinerary.departureTime).format("dddd, DD MMM")}</div>
                  <div style={{height:'50px'}}></div>
                  <div className="my-booking-detail-time">{moment(this.props.itinerary.arrivalTime).format("HH:mm")}</div>
                  <div className="my-booking-detail-time">{moment(this.props.itinerary.arrivalTime).format("dddd, DD MMM")}</div>
                </div>
              </div>
              <div className="my-booking-detail-inner">
                <div className="my-booking-detail-info-container">
                  <div>
                    <div className="my-booking-detail-airport">{this.props.itinerary.origin.city}</div>
                    <div className="my-booking-detail-airport">{this.props.itinerary.origin.name}</div>
                    <div style={{height:'50px'}}></div>
                    <div className="my-booking-detail-airport">{this.props.itinerary.destination.city}</div>
                    <div className="my-booking-detail-airport">{this.props.itinerary.destination.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
