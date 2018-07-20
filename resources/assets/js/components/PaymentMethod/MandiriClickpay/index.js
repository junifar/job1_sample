import React , { Component } from 'react';
import { Form } from 'reactstrap';
import axios from 'axios';

import { Input, Button } from '../../_Main';

export default class mandiriclickpay extends Component{

  constructor(props){
    super(props);

    this.state = {
      debit_card: "",
      token: ""
    }
  }

  render(){
    return(
      <div className="garuda-login">
        <div  className="garuda-login-container">
          <div className="garuda-login-card-container">
            <div className="garuda-login-card my-mandiriclickpay">
              <div className="garuda-login-card-top">
                <div className="garuda-login-picture">
                  <div className="garuda-login-title">MANDIRI CLICKPAY</div>
                </div>
              </div>

              <div className="garuda-login-card-mid">
                <Form className="garuda-login-form">
                  <Input placeholder="Nomor Kartu Debit" type="text" className="garuda-login-input" value={this.state.debit_card} onChange={this.onDebitChange}/>
                  <Input placeholder="Token" type="password" className="" value={this.state.token} onChange={this.onTokenChange}/>
                </Form>
              </div>
            </div>
            <div className="garuda-login-card button my-mandiriclickpay-button" onClick={this.payment}>
              <span>Bayar</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



mandiriclickpay.onDebitChange = (e) => {
  this.setState({
    debit_card: e.target.value
  });
}

mandiriclickpay.onTokenChange = (e) => {
  this.setState({
    token: e.target.value
  });
}

mandiriclickpay.payment = () => {
  //var booking = "bookings/"+this.props.location.state.booking.booking.id;
  console.log('data send :'+this.props.location.state.booking.id+'-'+this.props.location.state.booking.invoiceNumber);
  console.log('data send :'+this.props.location.state.booking.payment);
  
  var dataSend = {
    bookingId : this.props.location.state.booking.id,
    invoiceNumber :this.props.location.state.booking.invoiceNumber,
    method : 1,
    cardNumber : this.state.debit_card, //4616999900000028
    authorizationCode : "000000",
    amount : this.props.location.state.booking.payment
  };
  var url = "/v1/flight/payment";

  console.log(dataSend);
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'WLPS_TOKEN': localStorage.getItem("token")
  }};

  axios.post(url, dataSend, axiosConfig).then((res) => {
    console.log(res.data);
  }).catch((error) => {
    console.log(error);
  });
}
