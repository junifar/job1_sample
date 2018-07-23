import React, { Component } from 'react';
import moment from 'moment';
import DetailFlight from './DetailFlight';
import { Redirect } from "react-router";
import { MyButton } from '../../../_Main';
import { Modal as RModal, ModalBody, ModalHeader } from 'reactstrap';

export default class UserQueueDetail extends Component{
  constructor(props){
    super(props);

    this.state = {
      queue: null,
      noauth: false,
      token: localStorage.getItem("token"),
      isOpen: false
    }
  }

  requestLeaveQueue = (e) => {
    this.props.openModal("Leave Queue.");
    const url = '/v1/flight/my/queue/cancel';
    const params =  {
      queueId: e
    };
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'WLPS_TOKEN': this.state.token
      }};

    axios.post(url,params,axiosConfig).then((res) => {
      if (res.data.data.length > 0) {
        console.log("res"+res.data.data);
        console.log("leave queue");
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
  }

  requestSwitchToNormal = (e) => {
    this.setState({ isOpen: true });
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
      console.log("res"+res.data.data.status);
      /*if (res.data.data.length > 0) {
        this.setState({
          queue: res.data.data
        });
      }*/
    /*}).catch((error) => {
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
    });*/

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
            No Detail Queue Available
          </div>
      );
    }

    if (this.props.location.state.itinerary.passenger.length > 0) {
      this.props.location.state.itinerary.passenger.map((y, index) => {
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
        <div>
        <div>
          <RModal isOpen={this.state.isOpen} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalBody>
              <span>test</span>
            </ModalBody>
          </RModal>
        </div>

        <div style={{backgroundColor: "#FFFFFF"}}>
          <div className="my-userdashboard-body">
            <div className="my-booking-detail-title" style={{width: "100%", border: "1px solid rgb(179, 177, 177)"}}>Queue Status</div>
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left1" style={{width: "18%"}}>
                  <span style={{display: "block",  marginBottom: "5px"}}>Queue ID</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>Status</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>Probability</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>Sales Time</span>
                </td>
                <td className="my-userdashboard-td-left1">
                  <span style={{display: "block",  marginBottom: "5px"}}>{this.props.location.state.itinerary.queueNumber}</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>{this.props.location.state.itinerary.statusDesc}</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>{this.props.location.state.itinerary.probability}</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>Sales Time</span>
                </td>
              </tr>
              </tbody>
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left"></td>
                <td className="my-userdashboard-td-right" style={{ display: "flex", float: "right"}}>
                  <MyButton outline accent queue onClick={() => this.requestLeaveQueue(this.props.location.state.itinerary.queueId)}>
                    <div className="my-searchresult-button-title" style={{fontSize: "1.5rem", marginRight: "10px"}}>Leave Queue</div>
                  </MyButton>
                  <MyButton accent queue onClick={() => this.requestSwitchToNormal(this.props.location.state.itinerary.queueId)}>
                    <div className="my-searchresult-button-title" style={{fontSize: "1.5rem"}}>Switch To Normal</div>
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
              <DetailFlight itinerary={this.props.location.state.itinerary}/>
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
                  <span style={{display: "block",  marginBottom: "5px"}}>IDR { `${Number(this.props.location.state.itinerary.wlpsFare.priceRule.adult).toLocaleString()}`  }</span>
                  }
                  { children > 0 &&
                  <span style={{display: "block",  marginBottom: "5px"}}>IDR { `${Number(this.props.location.state.itinerary.wlpsFare.priceRule.child).toLocaleString()}`  }</span>
                  }
                  { infant > 0 &&
                  <span style={{display: "block",  marginBottom: "5px"}}>IDR { `${Number(this.props.location.state.itinerary.wlpsFare.priceRule.infant).toLocaleString()}`  }</span>
                  }
                  <span><hr/></span>
                  <span style={{display: "block",  marginBottom: "-5px", fontSize: "20px", color: "rgb(2, 150, 171)"}}>IDR { `${Number(this.props.location.state.itinerary.wlpsFare.totalPrice).toLocaleString()}`  }</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="dropdown-divider"/>
          <div className="my-userdashboard-body">
            <div className="my-booking-detail-title" style={{width: "100%", border: "1px solid rgb(179, 177, 177)"}}>Payment</div>
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left1" style={{width: "18%"}}>
                  <span style={{display: "block",  marginBottom: "5px"}}>Payment Status</span>
                </td>
                <td className="my-userdashboard-td-left1">
                  {this.props.location.state.itinerary.payment === null &&
                  <span style={{display: "block",  marginBottom: "5px", color: "red"}}>Not Paid</span>
                  }
                  {this.props.location.state.itinerary.payment != null &&
                  <span style={{display: "block",  marginBottom: "5px", color: "red"}}>{ this.props.location.state.itinerary.payment }</span>
                  }
                </td>
              </tr>
              </tbody>
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left" colSpan="2">
                  <span style={{display: "block",  marginBottom: "5px"}}>Available Payment Method</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>* Internet Banking (Mandiri Clickpay, KlikBCA, e-pay BRI)</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>* Credit Card (Visa, Master, JCB)</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>* Debit Card</span>
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
                  <span style={{display: "block",  marginBottom: "5px"}}>{ this.props.location.state.itinerary.contact.name }</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>{ this.props.location.state.itinerary.contact.phone }</span>
                  <span style={{display: "block",  marginBottom: "5px"}}>{ this.props.location.state.itinerary.contact.email }</span>
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
                  { this.props.location.state.itinerary.passenger.length > 0 &&
                    this.props.location.state.itinerary.passenger.map((y, index) => {
                      return(
                          <span>
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
                  { this.props.location.state.itinerary.passenger.length > 0 &&
                  this.props.location.state.itinerary.passenger.map((y, index) => {
                    return(
                        <span>
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
        </div>
    );
  }
}
