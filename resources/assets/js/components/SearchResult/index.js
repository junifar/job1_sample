import React, { Component } from 'react';
import moment from 'moment';
import { Button, MyButton, Input } from '../_Main';
import { bindActionCreators } from 'redux';
import { Progress } from 'reactstrap';
import * as ItinerariesActionCreators from '../../actions/itineraries';

// Component
import FlightCard from './FlightCard';
import FlightForm from './FlightForm';
import FlightHeader from './FlightHeader';
import ResultHeader from './ResultHeader';
import SearchInfo from '../Home/SearchInfo';
import DetailFlight from '../Booking/DetailFlight';

export default class SearchResult extends Component{

  constructor(props){
    super(props);

    this.state = {
      showForm: false,
      requesting: false,
      received: false,
      dep_itineraries: {},
      ret_itineraries: {},
      progress: 1
    }
  }

  onChangeRequesting = (val) => {
    this.setState({
      requesting: val
    });
  }

  requestFlights = () => {
     const params =  {
       origin: this.props.location.state.origin,
       destination: this.props.location.state.destination,
       departureDate: this.props.location.state.departureDate,
       adults: this.props.location.state.adults,
       children: this.props.location.state.children,
       infants: this.props.location.state.infants
     };
    let serviceClass = "eco";
    if (this.props.location.state.seatclass == 'Business Class') {
      params.serviceClass = "exe";
    } else if (this.props.location.state.seatclass == 'First Class') {
      serviceClass = "1st";
    }

      if (this.props.location.state.returnDate) {
        params.returnDate = this.props.location.state.returnDate;
      }

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
           if (res.data.data[0].dep) {
             this.setState({dep_itineraries: res.data.data[0].dep});
           }
           if (res.data.data[0].ret) {
             this.setState({ret_itineraries: res.data.data[0].ret});
           }
          }
        }

       /*this.props.onChangeRequesting(false);
       this.props.openRequesting(false);
       this.props.onChangeReceived(true);*/
     }).catch((error) => {
       // *** Failed Request Flight ***
       /*this.props.onChangeRequesting(false);
       this.props.openRequesting(false);
       this.props.openModal("Maaf terdapat kesalahan pada server.");*/
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

  onClickFlightCard = (itinerary, itinerary_type) => {
    if (!localStorage.getItem("user")) {
      this.props.openModal("Untuk melanjutkan silahkan anda Login terlebih dahulu.","/login");
    } else {
      this.props.history.push({
        pathname: '/booking',
        state: {
          itinerary: itinerary,
          itinerary_type: itinerary_type,
          user: JSON.parse(localStorage.getItem("user")),
          token: localStorage.getItem("token"),
          adults: this.props.location.state.adults,
          children: this.props.location.state.children,
          infants: this.props.location.state.infants
        }
      });
      window.scrollTo(0, 0);
    }
  }

  toggleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render(){
    if (this.props.location.state.search) {
      this.requestFlights();
      this.props.location.state.search = false;
    }

    return(
      <div className="my-searchresult-container">

        <div className="col" style={{backgroundColor: "#ffffff", width:"20%"}}>
          <div>
            &nbsp;
          </div>
          <div style={{marginTop: "114px", paddingTop: "20px", paddingBottom: "8px"}}>
            <b style={{fontSize: "13px"}}>Filter</b>
          </div>
          <div>
            <div className="my-searchresult-left-column">
              <label>No. of transit</label>
              <br/>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value="direct" label="Direct"/>Direct
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value="1transit"/>1 Transit</label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value="2transit"/>2+ Transit</label>
              </div>
              <label>Time of Departure</label>
              <br/>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value="morning_dept"/>Morning (00:00 - 12:00)</label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value="afternoon_dept"/>Afternoon (12:00 - 18:00)</label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value="night_dept"/>Night (18:00 - 24:00)</label>
              </div>
              <label>Time of Arrival</label>
              <br/>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value="morning_arrv"/>Morning (00:00 - 12:00)</label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value="afternoon_arrv"/>Afternoon (12:00 - 18:00)</label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value="night_arrv"/>Night (18:00 - 24:00)</label>
              </div>
              <label>Price</label>
              <br/>
              <label style={{fontSize: "8px", fontWeight: "normal"}}>IDR 567.000 - IDR 967.000</label>
              <div id="slider-range"></div>
              <br/>
              <label>Airline</label>
              <br/>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value="garuda"/>Garuda Indonesia</label>
              </div>
              <br/>
              <MyButton accent onClick={() => this.onClick()}>
                <div className="my-searchresult-button-title">Apply Filter</div>
              </MyButton>
            </div>
          </div>
        </div>

        <div className="my-searchresult">
          Choose Departure Flight
          { this.state.dep_itineraries && (this.state.dep_itineraries.length > 0) &&
          <SearchInfo itineraries={this.state.dep_itineraries}
                      seat_class={this.props.location.state.seatclass} adults={this.props.location.state.adults}
                      children={this.props.location.state.children}
                      infants={this.props.location.state.infants} toggleShowForm={this.toggleShowForm}/>
          }
          { this.state.showForm &&
            <FlightForm onChangeRequesting={this.onChangeRequesting}/>
          }
          { (this.state.progress > 1 && this.state.progress < 100) &&
          <div className="my-headerrequesting">
            <div className="my-headerrequesting-title">Searching.. {this.state.progress.toFixed(0)} %</div>
            <Progress animated color="info" max="100" value={this.state.progress}/>
          </div>
          }
          <table className="my-searchresult-table">
            <tbody>
            <ResultHeader seat_class={this.props.location.state.seatclass}/>

            { this.state.dep_itineraries && (this.state.dep_itineraries.length > 0) && this.state.dep_itineraries.map((itinerary, index) => {
              return(
                  <tr key={`Dep${index}`}>
                    <td colSpan="7">
                      <table style={{width: "100%", backgroundColor: "#FFFFFF",  border: "1px solid #dddddd"}}>
                      <FlightCard
                          key={`FlightCardDep${index}`}
                          aircraft={itinerary.aircraft}
                          origin_iata={itinerary.origin.iata}
                          destination_iata={itinerary.destination.iata}
                          origin={itinerary.origin.name}
                          destination={itinerary.destination.name}
                          origin_city={itinerary.origin.city}
                          destination_city={itinerary.destination.city}
                          departure_date={moment(itinerary.departureTime)}
                          arrival_date={moment(itinerary.arrivalTime)}
                          normal_fare={(itinerary.fare == null ? null : itinerary.fare.totalPrice)}
                          wlps_fare={(itinerary.wlpsFare == null ? null : itinerary.wlpsFare.totalPrice)}
                          duration={itinerary.duration}
                          trip={itinerary.flightType}
                          currency="IDR"
                          facility="20kg baggage"
                          itinerarty_type="normal"
                          seat_class={this.props.location.state.seatclass}
                          onClick={(e) => this.onClickFlightCard(itinerary, e)}
                      />
                    </table>
                    </td>
                  </tr>
              );
            })
            }

            { this.state.ret_itineraries && (this.state.ret_itineraries.length > 0) && this.state.ret_itineraries.map((itinerary, index) => {
              return(
                  <tr key={`Ret${index}`}>
                    <td colSpan="7">
                      <table style={{width: "100%", backgroundColor: "#FFFFFF",  border: "1px solid #dddddd"}}>
                        <FlightCard
                            key={`FlightCardRet${index}`}
                            aircraft={itinerary.aircraft}
                            origin_iata={itinerary.origin.iata}
                            destination_iata={itinerary.destination.iata}
                            origin={itinerary.origin.name}
                            destination={itinerary.destination.name}
                            origin_city={itinerary.origin.city}
                            destination_city={itinerary.destination.city}
                            departure_date={moment(itinerary.departureTime)}
                            arrival_date={moment(itinerary.arrivalTime)}
                            normal_fare={(itinerary.fare == null ? null : itinerary.fare.totalPrice)}
                            wlps_fare={(itinerary.wlpsFare == null ? null : itinerary.wlpsFare.totalPrice)}
                            duration={itinerary.duration}
                            trip={itinerary.flightType}
                            currency="IDR"
                            facility="20kg baggage"
                            itinerarty_type="normal"
                            seat_class={this.props.location.state.seatclass}
                            onClick={(e) => this.onClickFlightCard(itinerary, e)}
                        />
                      </table>
                    </td>
                  </tr>
              );
            })
            }
            </tbody>
          </table>
            </div>
      </div>
    );
  }
}
