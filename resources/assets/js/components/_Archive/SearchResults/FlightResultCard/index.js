import React, {Component} from 'react'
import PropTypes from 'prop-types';

export default class FlightResultCard extends Component {

  static propTypes = {
    price: PropTypes.string,
    wlps_price: PropTypes.string,
    airline_logo: PropTypes.string,
    airline_name: PropTypes.string,
    airport_departure: PropTypes.string,
    airport_departure_code: PropTypes.string,
    airport_arrival: PropTypes.string,
    airport_arrival_code: PropTypes.string,
    airport_transits: PropTypes.array,
    time: PropTypes.string,
    stops: PropTypes.number,
    seatclass: PropTypes.string,
    availability: PropTypes.number
  }

  render(){
    var timesp = this.props.time.split("T");
    var stoptext = "Direct";
    if (this.props.stops > 0) {
      stoptext = this.props.stops + " Stops";
    };
    var airport_transits_output= "";
    if (this.props.airport_transits){
      this.props.airport_transits.forEach((airport, index) => {
        if (index>0){
          airport_transits_output += ", "
        }
        airport_transits_output += airport
      })
    }
    return(
      <div className="flight-result-card">
        <div className="row">
          <div className="flight-result-card__container col-2 col-md-1">
            <img src={this.props.airline_logo} className="img-fluid flight-result-card__img" alt="Responsive" />
          </div>
          <div className="flight-result-card__container col col-md-3">
            <div className="flight-result-card__text">
              <strong>{timesp[1]+"-"+timesp[3]}</strong>
            </div>
            <div className="flight-result-card__subtext show-on-md">
              {this.props.airport_departure_code} to {this.props.airport_arrival_code} • {stoptext}
            </div>
            <div className="flight-result-card__subtext">
              {this.props.airline_name}
            </div>
          </div>
          <div className="flight-result-card__container hide-on-md col col-md-4">
            <div className="flight-result-card__text">
              {this.props.airport_departure_code} to {this.props.airport_arrival_code}
            </div>
            <div className="flight-result-card__subtext">
              {this.props.airport_departure}
            </div>
            <div className="flight-result-card__subtext">
              {this.props.airport_arrival}
            </div>
          </div>
          <div className="flight-result-card__container hide-on-md col col-md-2">
            <div className="flight-result-card__text">
              {stoptext}
            </div>
            <div className="flight-result-card__subtext">
              {airport_transits_output}
            </div>
          </div>
          <div className="flight-result-card__container col col-md-2">
              <div className="flight-result-card__text">
                <strong>IDR {this.props.price}</strong>
              </div>
              <div className="flight-result-card__subtext">
                {this.props.seatclass}
              </div>
          </div>
        </div>
      </div>
    );
  }
};
