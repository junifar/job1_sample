import React, { Component } from 'react';
import { Input, InputMask1, MyButton } from '../../../_Main';
import PropTypes from 'prop-types';

export default class PaymentMandiri extends Component{


    constructor(props) {
        super(props);

        this.state = {
            debitcard: "",
            mandiritoken: ""
        };
    }



  render(){
    return(
        <div className="my-paymentdashboard">
          <div className="my-paymentdashboard-title">
            Mandiri Clickpay
          </div>
          <div className="my-paymentdashboard-body">
              <div className="my-auth-input-label">Debit Card Number</div>
              <InputMask1 className="my-auth-input-95" placeholder="Debit Card Number" type="debit" mask="9999-9999-9999-9999"
                  onChange={(e) => this.onDebitCardChange(e.target.value)} value={this.state.debitcard}/>
              <div className="my-auth-input-label">Token Response</div>
              <Input className="my-auth-input-95" placeholder="Token Response" type="text"
                 onChange={(e) => this.onTokenChange(e.target.value)} value={this.state.mandiritoken}/>
              <div className="my-paymentdashboard-button">
                  <MyButton accent onClick={this.sendPayment}>Pay</MyButton>
              </div>
          </div>
            <div className="my-paymentdashboard-title">
                How to Get Token Response
            </div>
          <div className="my-paymentdashboard-body">
            <div className="my-paymentdashboard-body-item">
              1. Activate Mandiri Token by pressing
            </div>
            <div className="my-paymentdashboard-body-item">
              2. Enter your Mandiri Token password
            </div>
            <div className="my-paymentdashboard-body-item">
              3. Press 3 when "APPLI" shows
            </div>
            <div className="my-paymentdashboard-body-item">
              4. Enter your last 10-digit debit card number, then press "icon" for 3s
            </div>
            <div className="my-paymentdashboard-body-item">
              5. Enter transaction amount <b>25000</b>, then press "icon" for 3s
            </div>
              <div className="my-paymentdashboard-body-item">
                  6. Enter transaction number "transaction number" then press "icon" for 3s
              </div>
              <div className="my-paymentdashboard-body-item">
                  7. Enter the code from your Mandiri Token to the <b>Token Response</b> field
              </div>
          </div>
        </div>
    );
  }
}

PaymentMandiri.propTypes = {
    debitcard: PropTypes.string
}

PaymentMandiri.onDebitCardChange = (e) => {
    this.setState({
        debitcard: e
    });
}

PaymentMandiri.onTokenChange = (e) => {
    this.setState({
        mandiritoken: e
    });
}

PaymentMandiri.sendPayment = () => {
    var cardnumber = this.state.debitcard.replace(/-/g,"");
    var dataSend = {
        bookingId : this.props.booking.id,
        invoiceNumber :this.props.booking.invoiceNumber,
        method : 1,
        cardNumber : cardnumber, //4616999900000028
        authorizationCode : this.state.mandiritoken, //"000000"
        amount : this.props.booking.payment
    };
    var url = "/v1/flight/payment";

    console.log(dataSend);
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'WLPS_TOKEN': this.props.token
        }};

    axios.post(url, dataSend, axiosConfig).then((res) => {
        if (res.data.status) {
            this.props.openModal("Success.");
        } else {
            this.props.openModal("Failed :."+(res.data.message == null ? '' : res.data.message));
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
