import React, { Component } from 'react';
import moment from 'moment';
import { Button, MyButton, Input } from '../_Main';
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
      showForm: false
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
          <SearchInfo itineraries={this.props.location.state.itineraries} seat_class={this.props.location.state.seat_class} adults={this.props.location.state.adults} children={this.props.location.state.children}
                      infants={this.props.location.state.infants} toggleShowForm={this.toggleShowForm}/>
          { this.state.showForm &&
            <FlightForm />
          }
          <table className="my-searchresult-table">
            { (this.props.location.state.itineraries.length > 0) &&
            <tbody>
            <ResultHeader
                seat_class={this.props.location.state.seat_class}/>

            { this.props.location.state.itineraries.map((itinerary, index) => {
              return(
                  <tr>
                    <td colSpan="7">
                      <table style={{width: "100%", backgroundColor: "#FFFFFF",  border: "1px solid #dddddd"}}>
                      <FlightCard
                          key={`FlightCard${index}`}
                          aircraft={itinerary.aircraft}
                          origin_iata={itinerary.origin.iata}
                          destination_iata={itinerary.destination.iata}
                          origin={itinerary.origin.name}
                          destination={itinerary.destination.name}
                          departure_date={moment(itinerary.departureTime)}
                          arrival_date={moment(itinerary.arrivalTime)}
                          normal_fare={(itinerary.fare == null ? null : itinerary.fare.totalPrice)}
                          wlps_fare={(itinerary.wlpsFare == null ? null : itinerary.wlpsFare.totalPrice)}
                          duration={itinerary.duration}
                          trip={itinerary.flightType}
                          currency="IDR"
                          facility="20kg baggage"
                          itinerarty_type="normal"
                          seat_class={this.props.location.state.seat_class}
                          onClick={(e) => this.onClickFlightCard(itinerary, e)}
                      />
                      <tr>
                        <td colSpan="6" style={{ paddingLeft: "110px"}}><hr/></td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <table>
                            <tr>
                              <td style={{padding: "0px 10px 20px 10px"}}>
                                <span style={{display: "flex", width: "25px", height: "25px"}}>
                                <img src="https://www.gstatic.com/flights/airline_logos/70px/GA.png" className="img-fluid flight-result-card__img" alt="Responsive" />
                                  </span>
                                <span style={{display: "flex"}}>Garuda</span>
                                <span style={{display: "flex"}}>{this.props.location.state.seat_class}</span>
                              </td>
                              <td>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td>
                          <span className="my-booking-detail-time" style={{display: "flex"}}>{moment(itinerary.departureTime).format("HH:mm")}</span>
                          <span className="my-booking-detail-time" style={{display: "flex"}}>{moment(itinerary.departureTime).format("dddd, DD MMM")}</span>
                          <span className="my-booking-detail-time" style={{display: "flex"}}>{itinerary.duration}</span>
                          <span className="my-booking-detail-time" style={{display: "flex"}}>{moment(itinerary.arrivalTime).format("HH:mm")}</span>
                          <span className="my-booking-detail-time" style={{display: "flex"}}>{moment(itinerary.arrivalTime).format("dddd, DD MMM")}</span>
                        </td>
                        <td colSpan="2">
                          sfdsasdsa
                        </td>
                        <td colSpan="2">
                          sfdsasdsa
                        </td>
                      </tr>
                    </table>
                    </td>
                  </tr>
              );
            })
            }
            </tbody>
            
            }
          </table>
            </div>
      </div>
    );
  }
}
