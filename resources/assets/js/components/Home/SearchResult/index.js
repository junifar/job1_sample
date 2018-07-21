import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// Component
import FlightCard from './FlightCard';
import ResultHeader from './ResultHeader';

export default class SearchResult extends Component {

  static propTypes = {
    itineraries: PropTypes.array,
    requesting: PropTypes.bool,
    onClick: PropTypes.func,
    seat_class: PropTypes.string,
    openModal: PropTypes.func,
    user: PropTypes.object,
    token: PropTypes.string
  }

  onClickFlightCard = (itinerary, itinerary_type) => {
    if (!this.props.user) {
      this.props.openModal("Untuk melanjutkan silahkan anda Login terlebih dahulu.","/login");
    } else {
      this.props.history.push({
        pathname: '/booking',
        state: {
          itinerary: itinerary,
          itinerary_type: itinerary_type,
          user: this.props.user,
          token: this.props.token
        }
      });
      window.scrollTo(0, 0);
    }
  }

  render(){
    console.log("param :"+this.props.location.state.params);
    return(
      <table className="my-searchresult-table">
        { (this.props.itineraries.length > 0) &&
          <tbody>
            <ResultHeader
                seat_class={this.props.seat_class}/>
            { this.props.itineraries.map((itinerary, index) => {
              return(
                <FlightCard
                  key={`FlightCard${index}`}
                  aircraft={itinerary.aircraft}
                  origin_iata={itinerary.origin.iata}
                  destination_iata={itinerary.destination.iata}
                  origin={itinerary.origin.name}
                  destination={itinerary.destination.name}
                  departure_date={moment(itinerary.departureTime)}
                  arrival_date={moment(itinerary.arrivalTime)}
                  normal_fare={Number(itinerary.fare.totalPrice).toLocaleString()}
                  // should be wlps_fare, for temporary we use normal fare
                  wlps_fare={Number(itinerary.fare.totalPrice).toLocaleString()}
                  currency="IDR"
                  facility="20kg baggage"
                  itinerarty_type="normal"
                  seat_class={this.props.seat_class}
                  onClick={(e) => this.onClickFlightCard(itinerary, e)}
                />
              );
            })
            }
          </tbody>
        }
      </table>
    );
  }
}
