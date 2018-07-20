import React , { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import DetailFlight from '../Booking/DetailFlight';

export default class PaymentMethod extends Component{

  // directPayment = (user, Booking) => {
  //   var user = "users/"+user;
  //   var booking = "bookings/"+booking;
  //   var dataSend = {
  //     payment_method: "mandiriclickpay",
  //   	debit_card: 0,
  //   	token: ""
  //   }
  //
  //   axios({
  //     url: `/api/v1/${user}/${booking}/make_direct_payment`,
  //     method: 'post',
  //     data: dataSend
  //   });
  // }

  render(){
    return(
      <div className="my-paymentmethod">
        { (this.props.location.state) &&
          <DetailFlight
            itinerary={this.props.location.state.itinerary}/>
        }

        <div className="my-paymentmethod-group">
          <div className="my-paymentmethod-group-title">Harga Total</div>
          <div className="my-paymentmethod-group-card">
            <div className="my-paymentmethod-group-card-text">{(this.props.location.state) && `IDR ${this.props.location.state.total_price}`}</div>
            <div className="my-paymentmethod-group-card-subtext">Harga sudah termasuk pajak</div>
          </div>
        </div>

        <div className="my-paymentmethod-group">
          <div className="my-paymentmethod-group-title">Pilih Metode Pembayaran</div>
          <div className="my-paymentmethod-group-list">
            <button className="my-paymentmethod-group-listitem">
              <div className="my-paymentmethod-group-listitem-name">Transfer</div>
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
            <button className="my-paymentmethod-group-listitem">
              <div className="my-paymentmethod-group-listitem-name">Kartu Kredit</div>
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
            <button className="my-paymentmethod-group-listitem" onClick={this.directPayment}>
              <div className="my-paymentmethod-group-listitem-name">Mandiri Clickpay</div>
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
          </div>

        </div>
      </div>
    );
  }
}

PaymentMethod.directPayment = () => {
  if(this.props.location.state){
    this.props.history.push({
      pathname: '/paymentmethod/mandiriclickpay',
      state: {
        booking: this.props.location.state.booking,
        adults: this.props.location.state.adults,
        children: this.props.location.state.children,
        infants: this.props.location.state.infants,
        contact: this.props.location.state.contact,
        total_price: this.props.location.state.total_price
      }
    });
  }
}
