import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import momentPropTypes from 'react-moment-proptypes';
import axios from 'axios';

import * as FormActionCreators from '../../../../actions/form';

class HeaderResult extends Component{

  static propTypes = {
    departure_date: momentPropTypes.momentObj,
    arrival_date: momentPropTypes.momentObj,
    origin: PropTypes.string,
    destination: PropTypes.string,
    originName: PropTypes.string,
    destinationName: PropTypes.string,
    originAirport: PropTypes.string,
    destinationAirport: PropTypes.string,
    adults: PropTypes.number,
    children: PropTypes.number,
    infants: PropTypes.number,
    seat_class: PropTypes.string
  }

  constructor(props){
    super(props);

    this.state = {
      originAirports: {},
      destinationAirports: {}
    }

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
    }};

    this.getOriginAirports(axiosConfig);
    this.getDestinationAirports(axiosConfig);
  }

  getOriginAirports = (header) => {
    const params =  {
        "code" : this.props.origin,
        "perPage" : 1000
    };  

    axios.post('/v1/flight/airport', params, header)
    .then((res) => {
      if (res.data != null && res.data.data.length > 0) {
          this.setState({
            originAirports: res.data.data[0]
          });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  getDestinationAirports = (header) => {
    const params =  {
        "code" : this.props.destination,
        "perPage" : 1000
    };
    axios.post('/v1/flight/airport', params, header)
    .then((res) => {
      if (res.data != null && res.data.data.length > 0) {
          this.setState({
            destinationAirports: res.data.data[0]
          });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render(){
    return(
      <div className="my-headerresult">
        <div>
          { (this.state.originAirports.iata) &&
            <div className="my-headerresult-title">{this.state.originAirports.city} ({this.state.originAirports.iata}) - {this.state.originAirports.name} <i className="material-icons">arrow_forward</i> {this.state.destinationAirports.city} ({this.state.destinationAirports.iata}) - {this.state.destinationAirports.name}</div>
          }
        </div>
        <div>
          <span>{this.props.departure_date.format("dddd, D MMM YYYY")} • {this.props.adults} Adults, {this.props.children} Children, {this.props.infants} Infants • {this.props.seat_class}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    departure_date: state.form.departure_date,
    arrival_date: state.form.arrival_date,
    origin: state.form.origin,
    destination: state.form.destination,
    originName: state.form.originName,
    destinationName: state.form.destinationName,
    originAirport: state.form.originAirport,
    destinationAirport: state.form.destinationAirport,
    adults: state.form.adults,
    children: state.form.children,
    infants: state.form.infants
  }
);

export default connect(mapStateToProps)(HeaderResult);
