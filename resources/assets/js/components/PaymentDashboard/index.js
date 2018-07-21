import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MenuPayment, PaymentPay, PaymentTransfer, PaymentTransferDetail, PaymentCreditCard, PaymentMandiri } from './components';
import PropTypes from 'prop-types';

export default class PaymentDashboard extends Component{

    static propTypes = {
        booking: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            booking: this.props.location.state.booking,
            token: this.props.location.state.token
        };
    }

  componentDidMount(){
    // get user booking
    // get user info
    // get
  }

  render(){
    return(
      <div className="my-dashboard">
        <div>
          <MenuPayment />
        </div>
        <div className="my-dashboardcontent">
            <Redirect exact from="/" to="/Payment/pay" />
            <Route path="/Payment/pay" component={PaymentPay}/>
            <Route path="/Payment/transfer" component={PaymentTransfer}/>
            <Route path="/Payment/transferDetail" component={PaymentTransferDetail}/>
            <Route path="/Payment/creditcard" render={(props) => <PaymentCreditCard {...props} openModal={this.props.openModal} booking={this.state.booking} token={this.state.token}/>}/>
            <Route path="/Payment/mandiri" render={(props) => <PaymentMandiri {...props} openModal={this.props.openModal} booking={this.state.booking} token={this.state.token}/>}/>
        </div>
      </div>
    );
  }
}
