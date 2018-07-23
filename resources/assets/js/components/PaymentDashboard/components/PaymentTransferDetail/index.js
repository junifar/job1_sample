import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from "react-router";
import { MyButton } from '../../../_Main';

export default class PaymentTransferDetail extends Component{
  constructor(props){
    super(props);

    this.state = {
      queue: null,
      noauth: false,
      token: localStorage.getItem("token")
    }
  }

  sendReceiptToEmail = (e) => {
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

  render(){
/*
    if (this.state.token === null) {
      return (
          <Redirect to="/" push={true}/>
      );
    }
*/
    return(
        <div style={{backgroundColor: "#FFFFFF"}}>
          <div className="my-userdashboard-body">
            <div className="my-booking-detail-title" style={{width: "100%", border: "1px solid rgb(179, 177, 177)"}}>Pay Before</div>
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left">
                  <span style={{display: "block",  marginBottom: "5px", fontWeight: "bold", fontSize: "17px"}}>{this.props.location.state.timeLimit} today </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="dropdown-divider"/>
          <div className="my-userdashboard-body">
            <div className="my-booking-detail-title" style={{width: "100%", border: "1px solid rgb(179, 177, 177)"}}>Transfer To</div>
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left1" style={{width: "18%"}}>
                  <span style={{display: "block",  marginBottom: "5px"}}>Account Number</span>
                </td>
                <td className="my-userdashboard-td-left1">
                  <span style={{display: "block",  marginBottom: "5px", color: "red"}}>{this.props.location.state.paymentCode}</span>
                </td>
              </tr>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left1" style={{width: "18%"}}>
                  <span style={{display: "block",  marginBottom: "5px"}}>Account Holder Name</span>
                </td>
                <td className="my-userdashboard-td-left1">
                  <span style={{display: "block",  marginBottom: "5px", color: "red"}}>Copy</span>
                </td>
              </tr>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left1" style={{width: "18%"}}>
                  <span style={{display: "block",  marginBottom: "5px"}}>Total Amount</span>
                </td>
                <td className="my-userdashboard-td-left1">
                  <span style={{display: "block",  marginBottom: "5px", color: "red"}}>Copy</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="dropdown-divider"/>
          <div className="my-userdashboard-body">
            <div className="my-booking-detail-title" style={{width: "100%", border: "1px solid rgb(179, 177, 177)"}}>Payment Completed ?</div>
            <table className="my-userdashboard-table">
              <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left">
                  <span style={{display: "block",  marginBottom: "5px"}}>We will send your receipt and e-ticket to your email address once your payment is completed</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}
