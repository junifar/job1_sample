import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { MyButton } from '../../_Main';

export default class SearchInfo extends Component {

  static propTypes = {
    toggleShowForm: PropTypes.func,
    originCity: PropTypes.string,
    originAirport: PropTypes.string,
    originAirportCode: PropTypes.string,
    destinationCity: PropTypes.string,
    destinationAirport: PropTypes.string,
    destinationAirportCode: PropTypes.string,
    departure_date: momentPropTypes.momentObj,
    adults: PropTypes.number,
    children: PropTypes.number,
    infants: PropTypes.number,
    seat_class: PropTypes.string,
  };

  render(){
    var passengerInfo = this.props.adults + " Adult"
    if(this.props.children && this.props.children > 0){
      passengerInfo += ", "+this.props.children+" Children"
    }
    if(this.props.infants && this.props.infants > 0){
      passengerInfo += ", "+this.props.infants+" Infant"
    }
    
    return(
      <div className="garuda-searchinfo">
        <div className="garuda-searchinfo-container">
          <div>
            <div className="garuda-searchinfo-item">
              <div className="garuda-searchinfo-text">{this.props.itineraries[0].origin.city} ({this.props.itineraries[0].origin.iata}) - {this.props.itineraries[0].origin.name}</div>
              <div className="garuda-searchinfo-icon"><i className="material-icons">arrow_forward</i></div>
              <div className="garuda-searchinfo-text">{this.props.itineraries[0].destination.city} ({this.props.itineraries[0].destination.iata}) - {this.props.itineraries[0].destination.name}</div>
            </div>
            <div className="garuda-searchinfo-item">
              <div className="garuda-searchinfo-info">{moment(this.props.departure_date).format('dddd, DD MMM YYYY')}    |    {passengerInfo}     |    {this.props.seat_class}</div>
            </div>
          </div>
          <div className="change_search_button">
          <MyButton onClick={this.props.toggleShowForm}>
            <div className="garuda-searchinfo-button">Change Search</div>
          </MyButton>
          </div>
        </div>
      </div>
    );
  }
}
