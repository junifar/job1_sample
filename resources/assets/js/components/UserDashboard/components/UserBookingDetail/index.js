import React, { Component } from 'react';
import moment from 'moment';
import DetailFlight from './DetailFlight';
import { Redirect } from "react-router";
import { MyButton } from '../../../_Main';

export default class UserBookingDetail extends Component{
  constructor(props){
    super(props);

    this.state = {
      queue: null,
      noauth: false,
      token: localStorage.getItem("token")
    }
  }

  render(){
    var adults = 0;
    var children = 0;
    var infant = 0;

    if (this.state.token === null) {
      return (
          <Redirect to="/" push={true}/>
      );
    }

    if (this.props.location.state.itinerary === null) {
      return (
          <div className="my-userdashboard-emptybody">
            No Detail Booking Available
          </div>
      );
    }

    if (this.props.location.state.itinerary.dep.passenger.length > 0) {
      this.props.location.state.itinerary.dep.passenger.map((y, index) => {
        if (y.category == 'Adult') {
          adults++;
        }
        if (y.category == 'Children') {
          children++;
        }
        if (y.category == 'Infant') {
          infant++;
        }
      });
    }

    return(
        <div style={{backgroundColor: "#FFFFFF"}}>
          <div className="my-userdashboard-body">
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left">Airline Booking Code : {this.props.location.state.itinerary.id}</td>
                <td className="my-userdashboard-td-right">
                  <MyButton accent queue onClick={() => this.sendReceiptToEmail(this.props.location.state.itinerary.id)}>
                    <div className="my-searchresult-button-title" style={{fontSize: "1.5rem"}}>Send Receipt to Email</div>
                  </MyButton>
                  <MyButton accent queue onClick={() => this.payment(this.props.location.state.itinerary.id)}>
                    <div className="my-searchresult-button-title" style={{fontSize: "1.5rem"}}>Pay</div>
                  </MyButton>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="dropdown-divider"/>
          <div className="my-userdashboard-body">
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-booking-detail-title">Flight Information</td>
              </tr>
              </tbody>
              <tbody style={{border: "1px solid #b3b1b1"}}>
              <DetailFlight itinerary={this.props.location.state.itinerary.dep}/>
              </tbody>
            </table>
          </div>
          <div className="dropdown-divider"/>
          <div className="my-userdashboard-body">
            <div className="my-booking-detail-title" style={{width: "100%", border: "1px solid rgb(179, 177, 177)"}}>Price Details</div>
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left">
                  <span style={{display: "block",  marginBottom: "5px", fontWeight: "bold", fontSize: "17px"}}>Fare Type : Queue </span>
                  { adults > 0 &&
                  <span style={{display: "block",  marginBottom: "5px"}}>Air Travel Fee x{adults} Adult</span>
                  }
                  { children > 0 &&
                  <span style={{display: "block",  marginBottom: "5px"}}>Air Travel Fee x{children} Adult</span>
                  }
                  { infant > 0 &&
                  <span style={{display: "block",  marginBottom: "5px"}}>Air Travel Fee x{infant} Adult</span>
                  }
                  <span><hr/></span>
                  <span style={{display: "block",  marginBottom: "5px", fontWeight: "bold", fontSize: "17px"}}>Total Price </span>
                </td>
                <td className="my-userdashboard-td-right">
                  <span style={{display: "block",  marginBottom: "23px"}}></span>
                  { adults > 0 &&
                  <span style={{display: "block",  marginBottom: "5px"}}>IDR { `${Number(this.props.location.state.itinerary.dep.fare.priceRule.adult).toLocaleString()}`  }</span>
                  }
                  { children > 0 &&
                  <span style={{display: "block",  marginBottom: "5px"}}>IDR { `${Number(this.props.location.state.itinerary.dep.fare.priceRule.child).toLocaleString()}`  }</span>
                  }
                  { infant > 0 &&
                  <span style={{display: "block",  marginBottom: "5px"}}>IDR { `${Number(this.props.location.state.itinerary.dep.fare.priceRule.infant).toLocaleString()}`  }</span>
                  }
                  <span><hr/></span>
                  <span style={{display: "block",  marginBottom: "-5px", fontSize: "20px", color: "rgb(2, 150, 171)"}}>IDR { `${Number(this.props.location.state.itinerary.dep.fare.totalPrice).toLocaleString()}`  }</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="dropdown-divider"/>
          <div className="my-userdashboard-body">
            <div className="my-booking-detail-title" style={{width: "100%", border: "1px solid rgb(179, 177, 177)"}}>Manage Booking</div>
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left1" style={{width: "18%"}}>
                  <span style={{display: "block",  marginBottom: "5px"}}>Travel Booking ID</span>
                </td>
                <td className="my-userdashboard-td-left1">
                  <span style={{display: "block",  marginBottom: "5px", color: "red"}}>{this.props.location.state.itinerary.id}</span>
                </td>
              </tr>
              </tbody>
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left" colSpan="2">
                  <span style={{display: "block",  marginBottom: "5px"}}>Please attach your booking ID when contacting our customer service to better assist you</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>Contact Us</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="dropdown-divider"/>
          <div className="my-userdashboard-body">
            <div className="my-booking-detail-title" style={{width: "100%", border: "1px solid rgb(179, 177, 177)"}}>Important Pre-Flight Info</div>
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left">
                  <span style={{display: "block",  marginBottom: "5px"}}>1. Present e-ticket and valid Id at check-in</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>2. Check-in at least 90 minutes before the departure</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>3. All times shown are local airport time</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="dropdown-divider"/>
          <div className="my-userdashboard-body">
            <div className="my-booking-detail-title" style={{width: "100%", border: "1px solid rgb(179, 177, 177)"}}>Contact Detail</div>
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left1" style={{width: "18%"}}>
                  <span style={{display: "block",  marginBottom: "5px"}}>Name</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>Phone Number</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>Email</span>
                </td>
                <td className="my-userdashboard-td-left1">
                  <span style={{display: "block",  marginBottom: "5px"}}>{ this.props.location.state.itinerary.dep.contact.name }</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>{ this.props.location.state.itinerary.dep.contact.phone }</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>{ this.props.location.state.itinerary.dep.contact.email }</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="dropdown-divider"/>
          <div className="my-userdashboard-body">
            <div className="my-booking-detail-title" style={{width: "100%", border: "1px solid rgb(179, 177, 177)"}}>Passenger Detail</div>
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left1" style={{width: "18%"}}>
                  { this.props.location.state.itinerary.dep.passenger.length > 0 &&
                    this.props.location.state.itinerary.dep.passenger.map((y, index) => {
                      return(
                          <span id={index}>
                            <span style={{display: "block", marginBottom: "5px"}}>
                              <span style={{marginRight: "10px"}}>{index + 1}.</span>
                              <span> Title</span>
                            </span>
                            <span style={{display: "block",  marginBottom: "5px"}}>
                              <span style={{display: "block",  marginBottom: "5px", marginLeft: "23px"}}>Name</span>
                            </span>
                            { y.birthdate != null &&
                              <span style={{display: "block",  marginBottom: "5px"}}>
                              <span style={{display: "block",  marginBottom: "5px", marginLeft: "23px"}}>Birth Date</span>
                              </span>
                            }
                          </span>
                      );
                    })
                  }
                </td>
                <td className="my-userdashboard-td-left1">
                  { this.props.location.state.itinerary.dep.passenger.length > 0 &&
                  this.props.location.state.itinerary.dep.passenger.map((y, index) => {
                    return(
                        <span id={index}>
                          <span style={{display: "block",  marginBottom: "5px"}}>{y.title}</span>
                          <span style={{display: "block",  marginBottom: "5px"}}>{y.name}</span>
                          <span style={{display: "block",  marginBottom: "5px"}}>{y.category}</span>
                          { y.birthdate != null &&
                            <span style={{display: "block",  marginBottom: "5px"}}>{y.birthDate}</span>
                          }
                        </span>
                    );
                  })
                  }
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}



UserBookingDetail.sendReceiptToEmail = (e) => {
  console.log("sendReceiptToEmail :"+e);
  /*const url = '/v1/flight/queue/to-normal';
  const params =  {
    queueId: e
  };
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'WLPS_TOKEN': this.state.token
    }};

  axios.post(url,params,axiosConfig).then((res) => {
    console.log("res"+res.data.data);
    if (res.data.data.length > 0) {
      this.setState({
        queue: res.data.data
      });
    }
  }).catch((error) => {
    switch (+error.response.status) {
      case 401: // Unauthorized
        this.props.openModal("Your session is expired, please do relogin.");
        this.props.history.push('/');
        break;
      default:
        this.props.openModal("Maaf terdapat kesalahan pada server.");

        this.props.history.push('/');
        window.scrollTo(0,0);
    }
  });
*/
}

UserBookingDetail.payment = (e) => {
  this.props.history.push({
    pathname: '/Payment/pay',
    state: {
      booking: this.props.location.state.itinerary,
      token: localStorage.getItem("token")
    }
  });
  window.scroll(0,0);
}