import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FlightResultCard from './FlightResultCard'

export default class SearchResults extends Component {

  static propTypes = {
    itineraries: PropTypes.array,
    requesting: PropTypes.bool
  }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render(){
    var flights = [];
    for (var i = 0; i < 5; i++){
      flights.push(
        <FlightResultCard
          key={i}
          price="9,999,999"
          wlps_price="4,545,454"
          airline_name="Garuda Indonesia"
          airline_logo="https://www.gstatic.com/flights/airline_logos/70px/GA.png"
          time={"2018-02-15T08:00" + "T" + "2018-02-15T18:00"}
          airport_departure="Soekarno-Hatta International"
          airport_departure_code="CGK"
          airport_arrival="John F Kennedy International"
          airport_arrival_code="JFK"
          stops={2}
          seatclass="Economy"
          availability={34}
        />
      );
    }
    return(
      <div className="search-results">
        {flights}
      </div>
    );
    if (this.props.itineraries.length > 0){
      return(
        <div className="search-results">
          {
            this.props.itineraries.map((itinerary, index) => {
              var seatclasstext = itinerary.outbound[0].seat_class.charAt(0).toUpperCase() + itinerary.outbound[0].seat_class.slice(1).toLowerCase();
              var wlpsprice = Math.floor(parseInt(itinerary.price.total_fare.split(".")[0], 10)/2)
              return(
                <FlightResultCard
                  key={index}
                  price={this.numberWithCommas(itinerary.price.total_fare.split(".")[0])}
                  wlps_price={this.numberWithCommas(wlpsprice)}
                  airline_name={itinerary.outbound[0].airline}
                  airline_logo={itinerary.outbound[0].airline_logo}
                  time={itinerary.outbound[0].departure_date + "T" + itinerary.outbound[0].arrival_date}
                  airport_departure={itinerary.outbound[0].departure_airport.airport_name}
                  airport_departure_code={itinerary.outbound[0].departure_airport.airport}
                  airport_arrival={itinerary.outbound[itinerary.outbound.length-1].arrival_airport.airport_name}
                  airport_arrival_code={itinerary.outbound[itinerary.outbound.length-1].arrival_airport.airport}
                  stops={itinerary.outbound.length-1}
                  seatclass={seatclasstext}
                  availability={itinerary.outbound[0].availability}
                />
              );
            })
          }
        </div>
      );
    }else if(this.props.requesting){
      return(
        <div className="search-results_waiting">
          Wait for us to retrieve your flights request...
        </div>
      );
    }else{
      return(
        <div></div>
      );
    }
  }
};
