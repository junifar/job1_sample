import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import PropTypes from 'prop-types';
import { Row, Col} from 'reactstrap';

import FlightForm from './FlightForm';
import SearchResult from './SearchResult';
import Carousel from './Carousel';
import HeaderRequesting from './FlightForm/HeaderRequesting';

import { bindActionCreators } from 'redux';
import * as ItinerariesActionCreators from '../../actions/itineraries';

class Home extends Component {

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
    itineraries: PropTypes.array,
    user: PropTypes.object,
    openModal: PropTypes.func,
    openRequesting: PropTypes.func,
    token: PropTypes.string
  }

  constructor(props){
    super(props);

    this.state = {
      requesting: false,
      received: false,
      seat_class: "Economy Class",
      adults: 1
    }
  }

  // *** State Modifiers ***
    onChangeItineraries = (itin) => {
      this.setState({
        itineraries: itin
      });
    }

    onChangeRequesting = (val) => {
      this.setState({
        requesting: val
      });
    }

    onChangeReceived = (val) => {
      this.setState({
        received: val
      });

      this.props.history.push({
        pathname: '/searchresult',
        state: {
          itineraries: this.props.itineraries,
          seat_class: this.state.seat_class,
          adults: this.state.adults,
          children: this.state.children,
          infants: this.state.infants
        }
      });
      window.scrollTo(0, 0);
    }

    onChangeSeatClass = (val) => {
      this.setState({
        seat_class: val
      });
    }

    onChangeAdult = (val) => {
      this.setState({
        adults: val
      });
    }

    onChangeChildren = (val) => {
      this.setState({
        children: val
      });
    }

    onChangeInfant = (val) => {
      this.setState({
        infants: val
      });
    }

  // *** Render ***

  render(){
    return(
      <div className="home">
        <div className="home-body">
          <div>
            <div className="my-userdashboard-body">
              <table className="my-userdashboard-table">
                <tbody>
                <tr className="my-userdashboard-tr">
                  <td className="home-body-left">
                    <Carousel
                        items={[
                      {index: 0, caption: 'QUEUE TO GET LOWER PRICE', subcaption: 'With Flylist.ID we can either buy flight tickets directlu or queue to get a lower price near departure time, if tickets are still available', src: '/images/queue002.jpeg'},
                      {index: 1, caption: 'WATCH PROBABILITY STATUS', subcaption: 'While queueing, observe your chance to get the ticket. You might want to stop waiting and buy ticket with normal price if you have low probability', src: '/images/queue002.jpeg'},
                      {index: 2, caption: 'PAY ONE YOU GET SEAT OFFER', subcaption: 'Starting from 24-hour prior to departure, system will after available seats to the people queueing. Once you receive sear offer, you have until one hour to pay before seat is offered to someone else', src: '/images/queue002.jpeg'}
                      ]}>
                    </Carousel>
                  </td>
                  <td className="home-body-right">
                    <FlightForm
                        onChangeItineraries={this.onChangeItineraries}
                        onChangeRequesting={this.onChangeRequesting}
                        onChangeReceived={this.onChangeReceived}
                        onChangeSeatClass={this.onChangeSeatClass}
                        onChangeAdult={this.onChangeAdult}
                        onChangeChildren={this.onChangeChildren}
                        onChangeInfant={this.onChangeInfant}
                        requesting={this.state.requesting}
                        received={this.state.received}
                        openModal={this.props.openModal}
                        openRequesting={this.props.openRequesting}
                        originName={this.props.originName}
                    />
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    );
  }
};

// *** Redux State To Props ***

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
    itineraries: state.itineraries
  }
);

export default connect(mapStateToProps)(Home);
