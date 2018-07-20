import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FormActionCreators from '../../../../../actions/form';
import moment from 'moment';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Button } from 'reactstrap';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

class Form extends Component {

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
    seat_class: PropTypes.string,
    requestFlights: PropTypes.func,
  }

  constructor(props){
    super(props);

    this.state={
      cities: [],
    };

    this.requestCities();
  }

  requestCities = () => {
    fetch("/v1/cities")
      .then(response => response.json())
      .then(data => {
        this.setState({
          cities: data.results
        })
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render(){

    var citiesOption = [];
    this.state.cities.forEach((city, index) => {
      citiesOption.push({value: city.code, label: city.name});
    });
    var portal = false;
    if (window.innerWidth <= 768) {
      portal = true;
    }

    const { dispatch } = this.props;
    const updateOrigin = bindActionCreators(FormActionCreators.updateOrigin, dispatch);
    const updateDestination = bindActionCreators(FormActionCreators.updateDestination, dispatch);
    // const updateOriginName = bindActionCreators(FormActionCreators.updateOriginName, dispatch);
    // const updateDestinationName = bindActionCreators(FormActionCreators.updateDestinationName, dispatch);
    // const updateOriginCities = bindActionCreators(FormActionCreators.updateOriginCities, dispatch);
    // const updateDestinationCities = bindActionCreators(FormActionCreators.updateDestinationCities, dispatch);
    const updateDepartureDate = bindActionCreators(FormActionCreators.updateDepartureDate, dispatch);
    // const updateArrivalDate = bindActionCreators(FormActionCreators.updateArrivalDate, dispatch);
    const updateAdultsNumbers = bindActionCreators(FormActionCreators.updateAdultsNumbers, dispatch);
    const updateChildrenNumbers = bindActionCreators(FormActionCreators.updateChildrenNumbers, dispatch);
    const updateInfantsNumbers = bindActionCreators(FormActionCreators.updateInfantsNumbers, dispatch);
    const updateSeatClass = bindActionCreators(FormActionCreators.updateSeatClass, dispatch);

    return(
      <div>
        <div className="garuda-form">
          <div className="garuda-form-group">
            <div className="garuda-form-content">
              <span className="wlps-form-icon"><i className="material-icons">flight_takeoff</i></span>
                <VirtualizedSelect
                  name="select-asal"
                  placeholder="Asal"
                  value={this.props.origin}
                  onChange={updateOrigin}
                  searchable
                  clearable={false}
                  simpleValue
                  options={citiesOption}
                />
            </div>



            <div className="garuda-form-content">
              <span className="wlps-form-icon"><i className="material-icons">flight_land</i></span>
                <VirtualizedSelect
                  name="select-tujuan"
                  placeholder="Tujuan"
                  value={this.props.destination}
                  onChange={updateDestination}
                  searchable
                  clearable={false}
                  simpleValue
                  options={citiesOption}
                />
            </div>
          </div>

          <div className="garuda-form-group">
            <div className="garuda-form-content">
              <span className="wlps-form-icon"><i className="material-icons">date_range</i></span>
                <SingleDatePicker
                  date={this.props.departure_date}
                  onDateChange={updateDepartureDate}
                  focused={this.state.departure_focused}
                  onFocusChange={({ focused }) => this.setState({ departure_focused: focused })}
                  placeholder="Tanggal Pergi"
                  numberOfMonths={1}
                  hideKeyboardShortcutsPanel={true}
                  displayFormat="ddd, D MMM"
                  withPortal={portal}
                />
            </div>
          </div>

          <div className="garuda-form-group">
            <div className="garuda-form-content">
              <span className="wlps-form-icon"><i className="material-icons">people</i></span>
              <div className="garuda-form-counter">
                <div className="garuda-form-counter-label">
                  <span>Dewasa (11 Tahun ke-atas)</span>
                </div>
                <div className="garuda-form-counter-action">
                  <span onClick={() => {updateAdultsNumbers(this.props.adults-1)}}><i className="material-icons">remove_circle</i></span>
                  <span>{this.props.adults}</span>
                  <span onClick={() => {updateAdultsNumbers(this.props.adults+1)}}><i className="material-icons">add_circle</i></span>
                </div>
              </div>
            </div>

            <div className="garuda-form-content">
              <span className="wlps-form-icon"><i className="material-icons">child_care</i></span>
              <div className="garuda-form-counter">
                <div className="garuda-form-counter-label">
                  <span>Anak (2-11 Tahun)</span>
                </div>
                <div className="garuda-form-counter-action">
                  <span onClick={() => {updateChildrenNumbers(this.props.children-1)}}><i className="material-icons">remove_circle</i></span>
                  <span>{this.props.children}</span>
                  <span onClick={() => {updateChildrenNumbers(this.props.children+1)}}><i className="material-icons">add_circle</i></span>
                </div>
              </div>
            </div>

            <div className="garuda-form-content">
              <span className="wlps-form-icon"><i className="material-icons">child_friendly</i></span>
              <div className="garuda-form-counter">
                <div className="garuda-form-counter-label">
                  <span>Bayi (2 Tahun ke-bawah)</span>
                </div>
                <div className="garuda-form-counter-action">
                  <span onClick={() => {updateInfantsNumbers(this.props.infants-1)}}><i className="material-icons">remove_circle</i></span>
                  <span>{this.props.infants}</span>
                  <span onClick={() => {updateInfantsNumbers(this.props.infants+1)}}><i className="material-icons">add_circle</i></span>
                </div>
              </div>
            </div>
          </div>

          <div className="garuda-form-group">
            <div className="garuda-form-content">
              <span className="wlps-form-icon"><i className="material-icons">airline_seat_recline_normal</i></span>
                <VirtualizedSelect
                  name="select-kelas"
                  placeholder="Kelas"
                  value={this.props.seat_class}
                  onChange={updateSeatClass}
                  searchable
                  clearable={false}
                  simpleValue
                  options={[{value: 'Economy', label: 'Kelas Ekonomi'},{value: 'Business', label: 'Kelas Bisnis'},{value: 'First-class', label: 'First-Class'}]}
                />
            </div>
          </div>


          <div>Asal: {this.props.origin}</div>
          <div>Tujuan: {this.props.destination}</div>
          <div>Tanggal pergi: {moment(this.props.departure_date).format("YYYY-MM-DD")}</div>
          <div>Dewasa: {this.props.adults}</div>
          <div>Anak: {this.props.children}</div>
          <div>Bayi: {this.props.infants}</div>
          <div>Kelas: {this.props.seat_class}</div>
          <div className="garuda-form-button-container">
            <Button className="garuda-form-button" onClick={this.props.requestFlights}>Cari Antrian Penerbangan</Button>
          </div>

        </div>
      </div>
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
  }
);

export default connect(mapStateToProps)(Form);
