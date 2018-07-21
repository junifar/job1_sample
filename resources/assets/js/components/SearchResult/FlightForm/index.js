import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
    import momentPropTypes from 'react-moment-proptypes';
  import { Button, FormGroup, Label, Row, Col } from 'reactstrap';
import 'react-dates/initialize';
import VirtualizedSelect from 'react-virtualized-select';
import { SingleDatePicker } from 'react-dates';

import DropdownSearch from '../../_Main/DropdownSearch/DropdownSearch';

export default class FlightForm extends Component{

  static propTypes = {
    origin_value: PropTypes.string,
    destination_value: PropTypes.string,
    departure_date: momentPropTypes.momentObj,
    arrival_date: momentPropTypes.momentObj,
    adult_value: PropTypes.number,
    children_value: PropTypes.number,
    infants_onseat_value: PropTypes.number,
    infants_onlap_value: PropTypes.number,
    seat_class: PropTypes.string,
    onChangeItineraries: PropTypes.func,
    onChangeRequesting: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      departure_date: this.props.departure_date,
      arrival_date: this.props.arrival_date,
      departure_focused: false,
      arrival_focused: false,
      airports: [],
      origin: "",
      destination: "",
      adults: 1,
      children: 0,
      infants_onseat: 0,
      infants_onlap: 0,
      nonstop: false,
      trip: "Round Trip",
      seat_class: "Economy Class",
      query: "",
    };
  }

  updateOrigin = (value) => {
    this.setState({
      origin: value
    });
    console.log(value);
  }

  updateDestination = (value) => {
    this.setState({
      destination: value
    });
    console.log(value);
  }

  updateAdults = (e) => {
    this.setState({
      adults: parseInt(e.target.innerHTML, 10)
    });
  }

  updateSeatClass = (e) => {
    this.setState({
      seat_class: e.target.innerHTML
    });
  }

  updateQuery = (value) => {
    if (this.triggerRequest){
      clearTimeout(this.triggerRequest);
    }
    this.setState({
      query: value
    });
    this.triggerRequest = setTimeout(this.requestAirports, 200);
  }

  updateNonstop = (value) => {
    var isnonstop = false;
    switch (value) {
      case "Round Trip":
        isnonstop = false;
        break;
      case "One-way":
        isnonstop = true;
        break;
      case "Multi-city":
        isnonstop = false;
        break;
      default:
        break;
    }
    this.setState({
      nonstop: isnonstop
    });
  }

  updateTrip = (e) => {
    this.setState({
      trip: e.target.innerHTML
    });
    this.updateNonstop(e.target.innerHTML);
  }

  requestAirports = () => {
    axios({
      method: 'post',
      url: '/api/v1/users',
      params: {
        query: this.state.query
      }
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  };

  requestFlights = () => {
    this.props.onChangeRequesting(true);
    var isnonstop = "false";
    if (this.state.nonstop) {
      isnonstop = "true";
    }
    var properties = "?";
    properties += "origin=" + this.state.origin;
    properties += "&destination=" + this.state.destination;
    properties += "&departure_date=" + this.state.departure_date.format("YYYY-MM-DD");
    properties += "&arrival_date=" + this.state.arrival_date.format("YYYY-MM-DD");
    properties += "&adults=" + this.state.adults;
    properties += "&nonstop=" + isnonstop;
    properties += "&seat_class=" + this.state.seat_class;
    properties += "&currency=IDR";
    fetch("/v1/itineraries"+properties)
      .then(response => response.json())
      .then(data => {
        this.props.onChangeItineraries(data.results);
        this.props.onChangeRequesting(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render(){
    var portal = false;
    if (window.innerWidth <= 768) {
      portal = true;
    }
    var citiesOption = []
    this.state.airports.forEach((airport, index) => {
      citiesOption.push({value: airport.iata, label: `${airport.city} | ${airport.iata}`});
    });
    return(
      <div className="flight-form-searchresult">
        <div className="flight-form__header">
          <DropdownSearch color="link" size="sm" header={this.state.adults + " Passengers"} items={["1", "2", "3", "4", "5", "6"]} onChange={this.updateAdults}/>
          <DropdownSearch color="link" size="sm" header={this.state.seat_class} items={["Economy Class", "Business Class", "First Class"]} onChange={this.updateSeatClass}/>
        </div>
        <Row className="flight-form__body_searchresult">
          <Col xs="12" md="6" className="flight-form__place">
            <Row>
              <FormGroup className="wlps-form-group col flight-form__searchresult">
                <span className="wlps-form-icon"><i className="material-icons" style={{color:"white"}}>place</i></span>
                  <VirtualizedSelect
                    name="select-origin"
                    placeholder="From"
                    value={this.state.origin}
                    onChange={(val) => console.log(val)}
                    searchable
                    clearable={false}
                    simpleValue
                    options={citiesOption}
                  />
              </FormGroup>
              <FormGroup className="wlps-form-group col flight-form__searchresult">
                  <VirtualizedSelect
                    name="select-destination"
                    placeholder="Where to?"
                    value={this.state.destination}
                    onChange={this.updateDestination}
                    searchable
                    simpleValue
					clearable={false}
                    options={citiesOption}
                  />
              </FormGroup>
            </Row>
          </Col>
          <Col xs="12" md="6" className="flight-form__date_searchresult">
            <Row>
              <FormGroup className="wlps-form-group col flight-form__searchresult">
                <Label for="departure_date" hidden>Departure Date</Label>
                <span className="wlps-form-icon"><i className="material-icons" style={{color:"white"}}>date_range</i></span>
                  <SingleDatePicker
                    date={this.state.departure_date}
                    onDateChange={date => this.setState({ departure_date: date })}
                    focused={this.state.departure_focused}
                    onFocusChange={({ focused }) => this.setState({ departure_focused: focused })}
                    placeholder="When you go?"
                    numberOfMonths={2}
                    hideKeyboardShortcutsPanel={true}
                    displayFormat="ddd, D MMM"
                    id="departure_date"
                    withPortal={portal}
                  />
              </FormGroup>
              <FormGroup className="wlps-form-group col flight-form__searchresult">
                <Label for="arrival_date" hidden>Arrival Date</Label>
                  <SingleDatePicker
                    date={this.state.arrival_date}
                    onDateChange={date => this.setState({ arrival_date: date })}
                    focused={this.state.arrival_focused}
                    onFocusChange={({ focused }) => this.setState({ arrival_focused: focused })}
                    placeholder="Return?"
                    numberOfMonths={2}
                    hideKeyboardShortcutsPanel={true}
                    displayFormat="ddd, D MMM"
                    id="arrival_date"
                    withPortal={portal}
                    showClearDate={true}
                  />
              </FormGroup>
              <Button className="wlps-search-btn" color="danger" onClick={this.requestFlights}><span className="wlps-form-icon"><i className="material-icons" style={{color:"#FFFFFF"}}>search</i></span><span className="wlps-search-label">SEARCH</span></Button>
            </Row>
          </Col>
          <Col xs="12" className="wlps-search-container">

          </Col>
        </Row>
      </div>
    );
  }
}
