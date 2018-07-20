import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ResultHeader extends Component{

  render(){
    return(
      <tr className="my-searchresult-row header">
        <th className="my-searchresult-column"></th>
        <th className="my-searchresult-column">Departure</th>
        <th className="my-searchresult-column">Arrival</th>
        <th className="my-searchresult-column">Duration</th>
        <th className="my-searchresult-column">Facility</th>
        { this.props.seat_class == 'Economy' &&
          <th className="my-searchresult-column priceheader">Queue Fare</th>
        }
        <th className="my-searchresult-column priceheader">Normal Fare</th>
      </tr>
    );
  }
}

ResultHeader.propTypes = {
    seat_class: PropTypes.string
};