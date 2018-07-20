import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';

import { MyButton } from '../../../_Main';

export default class FlightCard extends Component{

  render(){
    var departure_time = moment(this.props.departure_date);
    var arrival_time = moment(this.props.arrival_date);
    var duration = moment.duration(arrival_time.diff(departure_time));
    return(
      <tr className="my-searchresult-row">
        <td className="my-searchresult-column airlinelogo">
          <img src="https://www.gstatic.com/flights/airline_logos/70px/GA.png" className="img-fluid flight-result-card__img" alt="Responsive" />
        </td>
        <td className="my-searchresult-column">
          <p className="my-searchresult-text">{departure_time.format("HH:mm")}</p>
          <p className="my-searchresult-subtext">{`${this.props.origin} (${this.props.origin_iata})`}</p>
        </td>
        <td className="my-searchresult-column">
          <p className="my-searchresult-text">{arrival_time.format("HH:mm")}</p>
          <p className="my-searchresult-subtext">{`${this.props.destination} (${this.props.destination_iata})`}</p>
        </td>
        <td className="my-searchresult-column">
          <p className="my-searchresult-text">{`${duration.get('hours')}h ${duration.get('minutes')}m`}</p>
          <p className="my-searchresult-subtext">{this.props.trip}</p>
        </td>
        <td className="my-searchresult-column">
          <p className="my-searchresult-subtext">{this.props.facility}</p>
        </td>
          { this.props.seat_class == 'Economy' &&
              <td className="my-searchresult-column pricetag">
              <MyButton outline accent queue onClick={() => this.onClick("QUEUE")}>
              <div className="my-searchresult-button-title"> Masuk Antrian </div>
              <div> { `${this.props.currency} ${this.props.wlps_fare}` } </div>
              <div className="my-searchresult-button-subtext"> Lebih Hemat 50% </div>
              </MyButton>
              </td>
          }
        <td className="my-searchresult-column pricetag">
          <MyButton onClick={() => this.onClick("")}>
            <div className="my-searchresult-button-title">BOOKING SEKARANG</div>
            <div> { `${this.props.currency} ${this.props.normal_fare}` } </div>
          </MyButton>
        </td>
      </tr>
    );
  }
}



FlightCard.propTypes = {
    departure_date: momentPropTypes.momentObj,
    arrival_date: momentPropTypes.momentObj,
    origin: PropTypes.string,
    destination: PropTypes.string,
    origin_iata: PropTypes.string,
    destination_iata: PropTypes.string,
    trip: PropTypes.string,
    normal_fare: PropTypes.string,
    wlps_fare: PropTypes.string,
    facility: PropTypes.string,
    seat_class: PropTypes.string,
    onClick: PropTypes.func
};

FlightCard.onClick = (e) => {
    this.props.onClick(e);
}