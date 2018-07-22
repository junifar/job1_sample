import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ItinerariesActionCreators from '../../../actions/itineraries';
import * as FormActionCreators from '../../../actions/form';
import * as UsersActionCreators from '../../../actions/user';

import { Button, FormGroup, Label, Row, Col } from 'reactstrap';
import VirtualizedSelect from 'react-virtualized-select';
import "react-virtualized-select/styles.css";
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

import Dropdown from '../../_Main/Dropdown/Dropdown';
import { Input } from '../../_Main';
import HeaderResult from './HeaderResult';
import HeaderRequesting from './HeaderRequesting';
import PassengerDropdown from './PassengerDropdown';

class FlightForm extends Component{

  static propTypes = {
    onChangeItineraries: PropTypes.func,
    onChangeRequesting: PropTypes.func,
    onChangeReceived: PropTypes.func,
    onChangeSeatClass: PropTypes.func,
    requesting: PropTypes.bool,
    received: PropTypes.bool,
    openModal: PropTypes.func,
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
    seat_class: PropTypes.string,
    requestFlights: PropTypes.func,
    showArvDate:PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      departure_focused: false,
      arrival_focused: false,
      airports: {},
      airports1: {},
      nonstop: false,
      trip: "One-Way",
      seat_class: "Economy Class",
      query: "",
      showArvDate: false,
      adults: 1,
      children: 0,
      infants: 0
    };
  }

  // *** State Modifiers ***

    updatePassenger = (a, e) => {
      if (e < 1) {
        if (a == 'adults') {
          e = 1;
        } else {
          e = 0;
        }
      } else if (e > 6) {
        e = 6;
      }

      if (a == 'adults') {
        this.props.onChangeAdult(e);
        this.setState({
          adults: parseInt(e, 10)
        });
      } else if (a == 'children') {
        this.props.onChangeChildren(e);
        this.setState({
          children: parseInt(e, 10)
        });
      } else {
        this.props.onChangeInfant(e);
        this.setState({
          infants: parseInt(e, 10)
        });
      }
    }

    updateSeatClass = (e) => {
      // set props of seat class
      this.props.onChangeSeatClass(e.target.innerHTML);
      this.setState({
        seat_class: e.target.innerHTML
      });
    }

    updateNonstop = (value) => {
      var isnonstop = false;
      switch (value) {
        case "Return":
          isnonstop = false;
          this.setState({showArvDate: true});
          break;
        case "One-Way":
          isnonstop = true;
          this.setState({showArvDate: false});
          break;
        case "Multi-city":
          isnonstop = false;
          this.setState({showArvDate: false});
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
    requestAirports = (value) => {
      const params =  {
          "keyword" : value,
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

    requestFlights = () => {
      // Requesting state for loading

      if (!this.props.origin) {
        this.props.openModal("Choose the origin flight.");
        this.props.onChangeRequesting(false);
        return;
      }

      if (!this.props.destination) {
        this.props.openModal("Choose the destination flight.");
        this.props.onChangeRequesting(false);
        return;
      }

      const params =  {
        //itineraries: {},
        origin: this.props.origin,
        destination: this.props.destination,
        departureDate: this.props.departure_date.format("YYYY-MM-DD"),
        seatclass: this.state.seat_class,
        adults: this.state.adults,
        children: this.state.children,
        infants: this.state.infants
      };

      if (this.state.trip == 'Return') {
        params.returnDate = this.props.arrival_date.format("YYYY-MM-DD")
      }

      this.props.onChangeRequesting(true, params);

      // Redux data init
      /*const updateItineraries = bindActionCreators(ItinerariesActionCreators.updateItineraries, this.props.dispatch);

      const params =  {
          origin: this.props.origin,
          destination: this.props.destination,
          departureDate: this.props.departure_date.format("YYYY-MM-DD"),
          adults: this.props.adults,
          children: this.props.children,
          infants: this.props.infants
      };

      const url = '/v1/flight/search';

      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      // requesting to api
      axios.post(url, params, axiosConfig).then((res) => {
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
*/
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

    const { dispatch } = this.props;
    const updateOrigin = bindActionCreators(FormActionCreators.updateOrigin, dispatch);
    const updateDestination = bindActionCreators(FormActionCreators.updateDestination, dispatch);
    const updateDepartureDate = bindActionCreators(FormActionCreators.updateDepartureDate, dispatch);
    const updateArrivalDate = bindActionCreators(FormActionCreators.updateArrivalDate, dispatch);

    return(
        <Row className="flight-form__body">
            <Col xs="12" md="12" className="flight-form__place">
              <Row>
                  <FormGroup className="wlps-form-group col flight-form__origin">
                      <span className="wlps-form-icon"><i className="material-icons fas fa-plane-departure"></i></span>
                      <VirtualizedSelect
                          name="select-origin"
                          placeholder="Origin"
                          value={this.props.origin}
                          onChange={updateOrigin}
                          searchable
                          clearable={false}
                          simpleValue
                          options={arrayOfAirports}
                          onInputChange={this.updateQuery}
                          noResultsText=""
                      />
                  </FormGroup>
              </Row>
              <Row>
                  <FormGroup className="wlps-form-group col flight-form__destination">
                      <span className="wlps-form-icon"><i className="material-icons fas fa-plane-arrival"></i></span>
                      <VirtualizedSelect
                          name="select-destination"
                          placeholder="Destination"
                          value={this.props.destination}
                          onChange={updateDestination}
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
            <Col xs="12" className="flight-form__date">
                <Row>
                    <Col xs="12" md="6">
                        <FormGroup className="wlps-form-group col flight-form__origin">
                            <span className="wlps-form-icon"><i className="material-icons fas fa-calendar-alt"></i></span>
                            <SingleDatePicker
                                date={this.props.departure_date}
                                onDateChange={updateDepartureDate}
                                focused={this.state.departure_focused}
                                onFocusChange={({ focused }) => this.setState({ departure_focused: focused })}
                                placeholder="When you go?"
                                numberOfMonths={2}
                                hideKeyboardShortcutsPanel={true}
                                displayFormat="DD MMM YYYY"
                                withPortal={portal}
                                id="departure_date"
                                anchorDirection="right"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" style={{display:(this.state.showArvDate ? '' : 'none')}}>
                        <FormGroup className="wlps-form-group col flight-form__origin">
                            <span className="wlps-form-icon"><i className="material-icons fas fa-calendar-alt"></i></span>
                            <SingleDatePicker
                                date={this.props.arrival_date}
                                onDateChange={updateArrivalDate}
                                focused={this.state.arrival_focused}
                                onFocusChange={({ focused }) => this.setState({ arrival_focused: focused })}
                                placeholder="Return?"
                                numberOfMonths={2}
                                hideKeyboardShortcutsPanel={true}
                                displayFormat="DD MMM YYYY"
                                withPortal={portal}
                                id="arrival_date"
                                anchorDirection="right"
                                isOutsideRange={(day) => day.isBefore(this.props.departure_date)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Col>
            <Col xs="12" className="flight-form__date">
                <Row>
                    <Col xs="6" md="6">
                        <FormGroup className="wlps-form-group col flight-form__origin">
                            <span className="wlps-form-icon"><i className="material-icons fas fa-plane"></i></span>
                            <Dropdown color="black" size="lg" header={this.state.trip} items={["One-Way", "Return"]} onChange={this.updateTrip}/>
                        </FormGroup>
                    </Col>
                    <Col xs="6" md="6">
                        <FormGroup className="wlps-form-group col flight-form__origin">
                            <span className="wlps-form-icon"><i className="material-icons fas fa-hand-holding-usd"></i></span>
                            <Dropdown color="black" size="lg" header={this.state.seat_class} items={["Economy Class", "Business Class", "First Class"]} onChange={this.updateSeatClass}/>
                        </FormGroup>
                    </Col>
                </Row>
            </Col>
            <Col xs="12" md="12" className="flight-form__place">
                <Row>
                    <Col xs="2" md="2">
                        <span className="wlps-form-icon"><img className="navbar-brand-icon" src="/images/adults.jpg"/></span>
                    </Col>
                    <Col xs="7" md="6">
                        <div className="my-passengerhome-popup-item-label">Adults (>11 years)</div>
                    </Col>
                    <Col xs="3" md="4">
                        <div className="my-passengerhome-popup-item-counter pull-right">
                        {/*<Col xs="12" md="12">*/}
                            <div className="my-passengerhome-popup-item-counter-in clickable" onClick={() => this.updatePassenger('adults', this.state.adults-1)}><i className="material-icons">remove</i></div>
                            <div className="my-passengerhome-popup-item-counter-in" style={{paddingTop: "1em"}}>{this.state.adults}</div>
                            <div className="my-passengerhome-popup-item-counter-in clickable" onClick={() => this.updatePassenger('adults', this.state.adults+1)}><i className="material-icons">add</i></div>
                        {/*</Col>*/}
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col xs="12" md="12" className="flight-form__place">
                <Row>
                    <Col xs="2" md="2">
                        <span className="wlps-form-icon" style={{paddingLeft: "1.3em"}}><img className="navbar-brand-icon" src="/images/children.jpg"/></span>
                    </Col>
                    <Col xs="7" md="6">
                        <div className="my-passengerhome-popup-item-label">Children (2-11 years)</div>
                    </Col>
                    <Col xs="3" md="4">
                        <div className="my-passengerhome-popup-item-counter pull-right">
                            <div className="my-passengerhome-popup-item-counter-in clickable" onClick={() => this.updatePassenger('children', this.state.children-1)}><i className="material-icons">remove</i></div>
                            <div className="my-passengerhome-popup-item-counter-in" style={{paddingTop: "1em"}}>{this.state.children}</div>
                            <div className="my-passengerhome-popup-item-counter-in clickable" onClick={() => this.updatePassenger('children', this.state.children+1)}><i className="material-icons">add</i></div>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col xs="12" md="12" className="flight-form__place">
                <Row>
                    <Col xs="2" md="2">
                        <span className="wlps-form-icon"><img className="navbar-brand-icon" src="/images/infant.jpg"/></span>
                    </Col>
                    <Col xs="7" md="6">
                        <div className="my-passengerhome-popup-item-label">Infant ({'<'}2 years)</div>
                    </Col>
                    <Col xs="3" md="4">
                        <div className="my-passengerhome-popup-item-counter pull-right">
                            <div className="my-passengerhome-popup-item-counter-in clickable" onClick={() => this.updatePassenger('infants', this.state.infants-1)}><i className="material-icons">remove</i></div>
                            <div className="my-passengerhome-popup-item-counter-in" style={{paddingTop: "1em"}}>{this.state.infants}</div>
                            <div className="my-passengerhome-popup-item-counter-in clickable" onClick={() => this.updatePassenger('infants', this.state.infants+1)}><i className="material-icons">add</i></div>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col xs="12" md="12" className="flight-form__place">
                <Row>
                    <Button className="wlps-search-btn" color="danger" onClick={this.requestFlights}>
                        <span>Search flight</span>
                    </Button>
                </Row>
            </Col>
        </Row>
    );
  }
}

const mapStateToProps = state => (
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
    infants: state.form.infants,
    seat_class: state.form.seat_class,
    user: state.user
  }
);

export default connect(mapStateToProps)(FlightForm);
