import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import momentPropTypes from 'react-moment-proptypes';
import { Button, FormGroup, Label, Row, Col } from 'reactstrap';
import 'react-dates/initialize';
import VirtualizedSelect from 'react-virtualized-select';
import { SingleDatePicker } from 'react-dates';

import DropdownSearch from '../../_Main/DropdownSearch/DropdownSearch';
import { bindActionCreators } from 'redux';
import * as ItinerariesActionCreators from '../../../actions/itineraries';
import { Progress } from 'reactstrap';

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
      progress: 1
    };
  }

  updateOrigin = (value) => {
    this.setState({
      origin: value
    });
  }

  updateDestination = (value) => {
    this.setState({
      destination: value
    });
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

  updateNonstop = (value) => {
    var isnonstop = false;
    switch (value) {
      case "Return":
        isnonstop = false;
        break;
      case "One-Way":
        isnonstop = true;
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

  requestFlights = () => {
    var isnonstop = "false";
    if (this.state.nonstop) {
      isnonstop = "true";
    }
    /*var properties = "?";
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
      });*/

    this.props.onChangeRequesting(true);
    if (!this.state.origin) {
      this.props.openModal("Choose the origin flight.");
      this.props.onChangeRequesting(false);
      return;
    }

    if (!this.state.destination) {
      this.props.openModal("Choose the destination flight.");
      this.props.onChangeRequesting(false);
      return;
    }

    // Redux data init
    const updateItineraries = bindActionCreators(ItinerariesActionCreators.updateItineraries, this.props.dispatch);

    const params =  {
      origin: this.state.origin,
      destination: this.state.destination,
      departureDate: this.state.departure_date.format("YYYY-MM-DD"),
      adults: this.state.adults,
      children: this.props.children,
      infants: this.props.infants
    };

    const url = '/v1/flight/search';
    this.setState({progress: 1});
    this.interval = setInterval(this.loadingProgress, 100);

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // requesting to api
    axios.post(url, params, axiosConfig).then((res) => {
      this.setState({progress: 100});
      clearInterval(this.interval);
      if (res.data.status == 'false') {
        this.props.openModal("Flight not found.");
      } else {
        // *** Success Request Flight ***
        if (res.data.data[0] == null) {
          this.props.openModal("Flight not found.");
        } else {
          updateItineraries(res.data.data[0].dep);
        }
      }

      this.props.onChangeRequesting(false);
      this.props.openRequesting(false);
      this.props.onChangeReceived(true);
    }).catch((error) => {
      // *** Failed Request Flight ***
      this.props.onChangeRequesting(false);
      this.props.openRequesting(false);
      this.props.openModal("Maaf terdapat kesalahan pada server.");
    });
  };

  loadingProgress = () => {
    this.setState({
      progress: this.state.progress + 10 * (1 / this.state.progress)
    });

    if (this.state.progress > 100) {
      clearInterval(this.interval);
    }
  }

  updateQuery = (value) => {
    // Assume minimal 3 character before request to server
    if(value.length >= 3){
      this.setState({
        query: value
      });

      // Create timeout to give user time to type
      clearTimeout(this.triggerRequest);
      this.triggerRequest = setTimeout(this.requestAirports(value), 200);
    }
  }

  // *** Actions ***
  requestAirports = (val) => {
    const params =  {
      "keyword" : val,
      "perPage" : 1000
    };

    const url = '/v1/flight/airport';

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }};

    axios.post(url,params,axiosConfig).then((res) => {
      // *** Success Get Airport ***
      res.data.data.forEach((airport, index) => {
        var citiesOption = this.state.airports;
        citiesOption[airport.iata] = `${airport.city} | ${airport.iata}`;
        this.setState({
          airports: citiesOption
        });

      });

    }).catch((error) => {
      // *** Failed Get Airport ***
      //this.props.openModal("Maaf terdapat kesalahan pada server.");
    });

    clearTimeout(this.triggerRequest); // Set timout for interval 200ms while witing user to type
  };

  render(){
    var portal = false;
    if (window.innerWidth <= 768) {
      portal = true;
    }

    var arrayOfAirports = [];
    for (var key in this.state.airports) {
      var airport = {value: key, label: this.state.airports[key]}
      arrayOfAirports.push(airport);
    }

    return(
      <div className="flight-form-searchresult-rev">
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
                      placeholder="Origin"
                      value={this.state.origin}
                      onChange={this.updateOrigin}
                      searchable
                      clearable={false}
                      simpleValue
                      options={arrayOfAirports}
                      onInputChange={this.updateQuery}
                      noResultsText=""
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
                      options={arrayOfAirports}
                      onInputChange={this.updateQuery}
                      noResultsText=""
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
                    displayFormat="DD MMM YYYY"
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
                    displayFormat="DD MMM YYYY"
                    id="arrival_date"
                    withPortal={portal}
                    isOutsideRange={(day) => day.isBefore(this.state.departure_date)}
                  />
              </FormGroup>
              <Button className="wlps-search-btn wlps-search-btn-rev" color="danger" onClick={this.requestFlights}><span className="wlps-form-icon"><i className="material-icons" style={{color:"#FFFFFF"}}>search</i></span><span className="wlps-search-label">SEARCH</span></Button>
            </Row>
          </Col>
          <Col xs="12" className="wlps-search-container">

          </Col>
        </Row>
          { (this.state.progress > 1 && this.state.progress < 100) &&
          <div className="my-headerrequesting">
              <div className="my-headerrequesting-title">Searching.. {this.state.progress.toFixed(0)} %</div>
              <Progress animated color="info" max="100" value={this.state.progress}/>
          </div>
          }
      </div>
    );
  }
}
