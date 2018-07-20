import React, { Component } from 'react';

export default class PaymentPay extends Component{
  render(){
    return(
        <div className="my-paymentdashboard">
          <div className="my-paymentdashboard-title">
            How to Pay
          </div>
          <div className="my-paymentdashboard-body">
            <div className="my-paymentdashboard-body-item">
              1. Choose the selected payment
            </div>
            <div className="my-paymentdashboard-body-item">
              2. Pay before the time limit
            </div>
            <div className="my-paymentdashboard-body-item">
              3. Upload your payment proof for validation
            </div>
            <div className="my-paymentdashboard-body-item">
              4. Wait us for validate your payment
            </div>
            <div className="my-paymentdashboard-body-item">
              5. Download your e-ticket
            </div>
          </div>
        </div>
    );
  }
}
