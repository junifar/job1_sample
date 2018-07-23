import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FormActionCreators from '../../actions/form';
import * as userActionCreators from '../../actions/user';
import { Row, Col, Form } from 'reactstrap';
import { Input, Button, MyButton } from '../_Main';
import DetailFlight from './DetailFlight';
import PassengerForm from './PassengerForm';
import ContactForm from './ContactForm';

import Api from '../../scripts/Api';

class Booking extends Component{

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
    itinerary: PropTypes.object,
    itinerary_type: PropTypes.string,
    token: PropTypes.string
  };

  constructor(props){
    super(props);

    this.ADULTS = "adults";
    this.CHILDREN = "children";
    this.INFANTS = "infants";

    if (this.props.location.state.user) {
      this.state = {
        adults: [],
        children: [],
        infants: [],
        title: "MR",
        name: this.props.location.state.user.name,
        phone: this.props.location.state.user.phone,
        email: this.props.location.state.user.email,
        review: false,
        isChecked: false
      };
    }

    // Initialization
    for (var i = 0; i<this.props.adults; i++){
      var pass = {
        title: "",
        first_name: "",
        last_name: "",
        full_name: "",
        date_of_birth: ""
      }
      this.state.adults.push(pass);
    }
    for (var i = 0; i<this.props.children; i++){
      var pass = {
        title: "",
        first_name: "",
        last_name: "",
        full_name: "",
        date_of_birth: ""
      }
      this.state.children.push(pass);
    }
    for (var i = 0; i<this.props.infants; i++){
      var pass = {
        first_name: "",
        last_name: "",
        full_name: "",
        date_of_birth: ""
      }
      this.state.infants.push(pass);
    }
  }

  // *** Actions ***
  // Parse state on form to data of passengers
  formToArrayOfPassenger = () => {
    var passengerData = [];

    for(var i = 0; i < this.state.adults.length; i++){
      passengerData.push({
        category: "Adult",
        name: this.state.adults[i].full_name,
        title: this.state.adults[i].title
      });
    }

    for(var i = 0; i < this.state.children.length; i++){
      console.log('the title :'+this.state.children[i].title);
      passengerData.push({
        category: "Child",
        name: this.state.children[i].full_name,
        title: this.state.children[i].title,
        birtDate: this.state.children[i].date_of_birth
      });
    }

    for(var i = 0; i < this.state.infants.length; i++){
      passengerData.push({
        category: "Infant",
        name: this.state.infants[i].full_name,
        title: this.state.infants[i].title,
        birtDate: this.state.infants[i].date_of_birth
      });
    }

    return passengerData;
  }

  // Create body json for request to booking
  formToParameterRequest = () => {
    var passengerData = this.formToArrayOfPassenger();
    //this.props.location.state.itinerary.probability = this.props.location.state.itinerary.probability.value;

    var dataSend = {
      searchLogId: this.props.location.state.itinerary.searchLogId,
      number: this.props.location.state.itinerary.number,
      flightNumber: this.props.location.state.itinerary.flightNumber,
      contact: {
        title: this.state.title,
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      },
      passengers: passengerData
    }
    return dataSend;
  }

  // Request for booking
  sendBookFlightRequest = () => {
    const url = '/v1/flight/booking';
    const params = this.formToParameterRequest(); 

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'WLPS_TOKEN': this.props.location.state.token
    }};

    axios.post(url,params,axiosConfig).then((res) => {
      if (res.data.status) {
        this.props.history.push({
          pathname: '/payment',
          state: {
            booking: res.data.data[0],
            token: localStorage.getItem('token')
          }
        });
        window.scrollTo(0,0);
      } else {
        this.props.openModal("Ada kesalah sistem, silahkan coba beberapa saat lagi.");
      }
    }).catch((error) => {
      console.log('err :'+error.status);
      switch (error.status) {
        case 401: // Unauthorized
          this.props.openModal("Anda perlu mendaftar/masuk sebagai pengguna untuk dapat menggunakan fitur ini.");
          break;
        default:
          this.props.openModal("Maaf terdapat kesalahan pada server.");
      }
    });
  }

  sendQueueBookFlightRequest = () => {
    const url = '/v1/flight/queue';
    const params = this.formToParameterRequest();

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'WLPS_TOKEN': this.props.location.state.token
      }};

    axios.post(url,params,axiosConfig).then((res) => {
      if (res.data.status) {
        this.props.openModal("Queue Success");
        this.props.history.push({
          pathname: '/user/queue'
        });
        window.scrollTo(0,0);
      } else {
        this.props.openModal("Ada kesalah sistem, silahkan coba beberapa saat lagi.");
      }
    }).catch((error) => {
      console.log('err :'+error);
      switch (error.status) {
        case 401: // Unauthorized
          this.props.openModal("Anda perlu mendaftar/masuk sebagai pengguna untuk dapat menggunakan fitur ini.");
          break;
        default:
          this.props.openModal("Maaf terdapat kesalahan pada server.");
      }
    });
  }

  // *** State Modifiers ***
  // Go to review
  goToReview = () => {
    this.setState({
      review: true
    });
  }

    onEmailChange = (value) => {
      this.setState({
        email: value
      });
    }

    onReemailChange = (value) => {
      this.setState({
        reemail: value
      });
    }

    onPhoneChange = (value) => {
      this.setState({
        phone: value
      });
    }

    onContactNameChange = (value) => {
      this.setState({
        name: value
      });
    }

    onContactTitleChange = (value) => {
      this.setState({
        title: value
      });
    }

    onTitleChange = (pass, index, value) => {
      switch (pass) {
        case this.ADULTS:
          this.state.adults[index].title = value;
          break;
        case this.CHILDREN:
          this.state.children[index].title = value;
          break;
        default:
          break;
      }
      this.setState(this.state);
    }

    onFirstNameChange = (pass, index, value) => {
      switch (pass) {
        case this.ADULTS:
          this.state.adults[index].first_name = value;
          break;
        case this.CHILDREN:
          this.state.children[index].first_name = value;
          break;
        case this.INFANTS:
          this.state.infants[index].first_name = value;
          break;
        default:
          break;
      }
      this.setState(this.state);
    }

    onLastNameChange = (pass, index, value) => {
      switch (pass) {
        case this.ADULTS:
          this.state.adults[index].last_name = value;
          break;
        case this.CHILDREN:
          this.state.children[index].last_name = value;
          break;
        case this.INFANTS:
          this.state.infants[index].last_name = value;
          break;
        default:
          break;
      }
      this.setState(this.state);
    }

    onFullNameChange = (pass, index, value) => {
      console.log("pass :"+value);
      switch (pass) {
        case this.ADULTS:
          this.state.adults[index].full_name = value;
          break;
        case this.CHILDREN:
          this.state.children[index].full_name = value;
          break;
        case this.INFANTS:
          this.state.infants[index].full_name = value;
          break;
        default:
          break;
      }
      this.setState(this.state);
    }

    onDateOfBirthChange = (pass, index, value) => {
      switch (pass) {
        case this.ADULTS:
          this.state.adults[index].date_of_birth = value;
          break;
        case this.CHILDREN:
          this.state.children[index].date_of_birth = value;
          break;
        case this.INFANTS:
          this.state.infants[index].date_of_birth = value;
          break;
        default:
          break;
      }
      this.setState(this.state);
    }

    continues = () => {
      console.log("in continue");
    }

  // *** Render ***
  render(){
    return(
      <div className="my-booking">
        <div className="my-booking-flightdetail">
          <Row>
            <Col xs="6" md="8">
              <ContactForm
                  onEmailChange={this.onEmailChange}
                  onReemailChange={this.onReemailChange}
                  onPhoneChange={this.onPhoneChange}
                  onNameChange={this.onContactNameChange}
                  onContactTitleChange={this.onContactTitleChange}
                  user={this.props.location.state.user}
                  review={this.state.review}
              />

              <div>
                <div className="my-booking-left">
                  <div  className="my-booking-left-container">

                    <div className="garuda-login-card-container">
                      <div className="garuda-login-card">
                        <div className="my-booking-card-top">
                          <div className="my-booking-detail-title">Passenger Details</div>
                        </div>

                        <div className="garuda-login-card-mid">

                          { this.state.adults.map((adult, index) => {
                            return(
                                <PassengerForm
                                    key={`adultform${index}`}
                                    index={index}
                                    onTitleChange={(value) => this.onTitleChange(this.ADULTS, index, value)}
                                    onFullNameChange={(value) => this.onFullNameChange(this.ADULTS, index, value)}
                                    onDateOfBirthChange={(value) => this.onDateOfBirthChange(this.ADULTS, index, value)}
                                    onPassengerTitleChange={(value) => this.onPassengerTitleChange(this.ADULTS, index, value)}
                                    title={adult.title}
                                    full_name={adult.full_name}
                                    date_of_birth={adult.date_of_birth}
                                    passenger_type={this.ADULTS}
                                    review={this.state.review}
                                    openModal={this.props.openModal}
                                />
                            );
                          })
                          }

                          { this.state.children.map((child, index) => {
                            return(
                                <PassengerForm
                                    key={`childform${index}`}
                                    index={index}
                                    onTitleChange={(value) => this.onTitleChange(this.CHILDREN, index, value)}
                                    onFullNameChange={(value) => this.onFullNameChange(this.CHILDREN, index, value)}
                                    onDateOfBirthChange={(value) => this.onDateOfBirthChange(this.CHILDREN, index, value)}
                                    title={child.title}
                                    full_name={child.full_name}
                                    date_of_birth={child.date_of_birth}
                                    passenger_type={this.CHILDREN}
                                    review={this.state.review}
                                    openModal={this.props.openModal}
                                />
                            );
                          })
                          }

                          { this.state.infants.map((infant, index) => {
                            return(
                                <PassengerForm
                                    key={`infantform${index}`}
                                    index={index}
                                    onTitleChange={(value) => this.onTitleChange(this.INFANTS, index, value)}
                                    onFullNameChange={(value) => this.onFullNameChange(this.INFANTS, index, value)}
                                    onDateOfBirthChange={(value) => this.onDateOfBirthChange(this.INFANTS, index, value)}
                                    full_name={infant.full_name}
                                    date_of_birth={infant.date_of_birth}
                                    passenger_type={this.INFANTS}
                                    review={this.state.review}
                                    openModal={this.props.openModal}
                                />
                            );
                          })
                          }

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="my-booking-left">
                  <div  className="my-booking-left-container">
                    <div className="garuda-login-card-container">
                      <div className="garuda-login-card">
                        <div className="my-booking-card-top">
                          <div className="my-booking-detail-title">Price Details</div>
                        </div>

                        <div className="garuda-login-card-mid">
                          <div className="my-auth-input-label">
                            <table style={{width: "95%", marginLeft: "5px"}}>
                              <tbody>
                              { this.props.location.state.adults > 0 &&
                              <tr>
                                <td style={{textAlign: "left"}}>Garuda (Adult) x{this.props.location.state.adults}</td>
                                { this.props.location.state.itinerary_type != 'QUEUE' &&
                                <td style={{textAlign: "right"}}>
                                  IDR { (this.props.location.state.itinerary.fare.priceRule.adult != null ? `${Number(this.props.location.state.itinerary.fare.priceRule.adult).toLocaleString()}` : `0`) }</td>
                                }
                                { this.props.location.state.itinerary_type == 'QUEUE' &&
                                <td style={{textAlign: "right"}}>
                                  IDR { (this.props.location.state.itinerary.wlpsFare.priceRule.adult != null ? `${Number(this.props.location.state.itinerary.wlpsFare.priceRule.adult).toLocaleString()}` : `0`) }</td>
                                }
                              </tr>
                              }
                              { this.props.location.state.children > 0 &&
                              <tr>
                                <td style={{textAlign: "left"}}>Garuda (Children) x{this.props.location.state.children}</td>
                                { this.props.location.state.itinerary_type != 'QUEUE' &&
                                <td style={{textAlign: "right"}}>
                                  IDR { (this.props.location.state.itinerary.fare.priceRule.child != null ? `${Number(this.props.location.state.itinerary.fare.priceRule.child).toLocaleString()}` : `0`) }</td>
                                }
                                { this.props.location.state.itinerary_type == 'QUEUE' &&
                                <td style={{textAlign: "right"}}>
                                  IDR { (this.props.location.state.itinerary.wlpsFare.priceRule.child != null ? `${Number(this.props.location.state.itinerary.wlpsFare.priceRule.child).toLocaleString()}` : `0`) }</td>
                                }
                              </tr>
                              }
                              { this.props.location.state.infants > 0 &&
                              <tr>
                                <td style={{textAlign: "left"}}>Garuda (Infant) x{this.props.location.state.infants}</td>
                                { this.props.location.state.itinerary_type != 'QUEUE' &&
                                <td style={{textAlign: "right"}}>
                                  IDR { (this.props.location.state.itinerary.fare.priceRule.infant != null ? `${Number(this.props.location.state.itinerary.fare.priceRule.infant).toLocaleString()}` : `0`) }</td>
                                }
                                { this.props.location.state.itinerary_type == 'QUEUE' &&
                                <td style={{textAlign: "right"}}>
                                  IDR { (this.props.location.state.itinerary.wlpsFare.priceRule.infant != null ? `${Number(this.props.location.state.itinerary.wlpsFare.priceRule.infant).toLocaleString()}` : `0`) }</td>
                                }
                              </tr>
                              }
                              <tr>
                                <td style={{textAlign: "left"}}>Baggage (20kg) </td>
                                <td style={{textAlign: "right"}}>IDR { `0` }</td>
                              </tr>
                              <tr>
                                <td style={{textAlign: "left"}}>Admin Fee </td>
                                { this.props.location.state.itinerary_type != 'QUEUE' &&
                                <td style={{textAlign: "right"}}>
                                  IDR { (this.props.location.state.itinerary.fare.adminFee != null ? `${Number(this.props.location.state.itinerary.fare.adminFee).toLocaleString()}` : `0`) }</td>
                                }

                                { this.props.location.state.itinerary_type == 'QUEUE' &&
                                <td style={{textAlign: "right"}}>
                                  IDR { (this.props.location.state.itinerary.wlpsFare.adminFee != null ? `${Number(this.props.location.state.itinerary.wlpsFare.adminFee).toLocaleString()}` : `0`) }</td>
                                }
                              </tr>
                              <tr>
                                <td style={{textAlign: "left"}}>Discount </td>
                                { this.props.location.state.itinerary_type != 'QUEUE' &&
                                <td style={{textAlign: "right"}}>IDR { (this.props.location.state.itinerary.fare.discount != null ? `${Number(this.props.location.state.itinerary.fare.discount).toLocaleString()}` : `0`) }</td>
                                }

                                { this.props.location.state.itinerary_type == 'QUEUE' &&
                                <td style={{textAlign: "right"}}>IDR { (this.props.location.state.itinerary.wlpsFare.discount != null ? `${Number(this.props.location.state.itinerary.wlpsFare.discount).toLocaleString()}` : `0`) }</td>
                                }
                              </tr>
                              <tr>
                                <td style={{textAlign: "left"}}>Total Price</td>
                                { this.props.location.state.itinerary_type != 'QUEUE' &&
                                <td style={{textAlign: "right"}}>
                                  IDR { (this.props.location.state.itinerary.fare.totalPrice != null ? `${Number(this.props.location.state.itinerary.fare.totalPay).toLocaleString()}` : `0`) }</td>
                                }

                                { this.props.location.state.itinerary_type == 'QUEUE' &&
                                <td style={{textAlign: "right"}}>
                                  IDR { (this.props.location.state.itinerary.wlpsFare.totalPrice != null ? `${Number(this.props.location.state.itinerary.wlpsFare.totalPay).toLocaleString()}` : `0`) }</td>
                                }
                              </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              { this.props.location.state.itinerary_type == 'QUEUE' &&
              <div>
                <div className="my-booking-left">
                  <div  className="my-booking-left-container">
                    <div className="garuda-login-card-container">
                      <div className="garuda-login-card">
                        <div className="my-booking-card-top">
                          <div className="my-booking-detail-title">Terms & Condition</div>
                        </div>

                        <div className="garuda-login-card-mid">
                          <div className="my-auth-input-label">
                            <table style={{width: "95%", marginLeft: "5px"}}>
                              <tbody>
                              <tr>
                                <td style={{textAlign: "left"}}>1. Lorem ipsum bla bla</td>
                              </tr>
                              <tr>
                                <td style={{textAlign: "left"}}>2. Lorem ipsum bla bla</td>
                              </tr>
                              <tr>
                                <td style={{textAlign: "left"}}>3. Lorem ipsum bla bla</td>
                              </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> }
            </Col>
            <Col xs="6" md="4">
              { this.props.location.state.itinerary &&
              <DetailFlight
                  itinerary={this.props.location.state.itinerary}
                  adults={this.props.adults}
                  children={this.props.children}
                  infants={this.props.infants}
                  seat_class={this.props.seat_class}/>
              }
            </Col>
          </Row>
          { !this.state.review &&
          <div className="my-booking-body my-booking-button">
            { this.props.location.state.itinerary_type == 'QUEUE' &&
                <div style={{display: "flex", marginLeft: "-330px"}}>
                  <div style={{marginRight: "89px"}}>
                    <div>By clicking the button, you agree to WLPS's Terms & Conditions.</div>
                    <div>You wont be able to change your booking details once you proceed to payment</div>
                  </div>
                  <div>
                    <MyButton accent onClick={this.sendQueueBookFlightRequest}>Enter Queue</MyButton>
                  </div>
                </div>}
            { this.props.location.state.itinerary_type == '' &&
            <MyButton accent onClick={this.goToReview}>Continue</MyButton>}
          </div>
          }
          { this.state.review &&
          <div className="my-booking-body my-booking-button">
            { this.props.location.state.itinerary_type == '' &&
            <div>
                <div>You wont be able to change your booking details once you proceed to payment</div>

              <MyButton accent onClick={this.sendBookFlightRequest}>Continue to Payment</MyButton>
            </div> }
          </div>
          }
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
    user: state.user,
    token: state.token
  }
);

export default connect(mapStateToProps)(Booking);
