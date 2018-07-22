import React, { Component } from 'react';
import { Input, InputMask1, MyButton } from '../../../_Main';

export default class PaymentCreditCard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            fullname: "",
            validuntil: "",
            cvv: "",
            nameoncard: ""
        };
    }

    tofinnet = () => {
        console.log("to finnet payment :"+this.props.booking);
        const url = '/v1/flight/payment';
         const params =  {
             bookingId : this.props.booking.id,
             method : 2,
             invoiceNumber : this.props.booking.invoiceNumber,
             amount : this.props.booking.amount
         };
         let axiosConfig = {
         headers: {
         'Content-Type': 'application/json',
         'WLPS_TOKEN': this.props.token
         }};

         axios.post(url,params,axiosConfig).then((res) => {
         console.log("res"+res.data.data);

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

    /*onFullNameChange = (e) => {
        this.setState({
            fullname: e
        });
    }

    onValidUntilChange = (e) => {
        this.setState({
            validuntil: e
        });
    }

    onNameOnCardChange = (e) => {
        this.setState({
            nameoncard: e
        });
    }

    onCvvChange = (e) => {
        this.setState({
            cvv: e
        });
    }*/

  render(){
      this.tofinnet();
    return(
        <div className="col-md-12">
            <div className="my-paymentdashboard-title">
                Credit card
            </div>
            <div className="my-paymentdashboard-body">
                <div className="my-auth-input-label">Full Name</div>
                <Input className="my-auth-input-95" placeholder="Full Name" type="text"
                       onChange={(e) => this.onFullNameChange(e.target.value)} value={this.state.fullname}/>
                <div className="my-auth-input-label">Valid Until</div>
                <Input className="my-auth-input-95" placeholder="Valid Until" type="text"
                       onChange={(e) => this.onValidUntilChange(e.target.value)} value={this.state.validuntil}/>
                <div className="my-auth-input-label">3-Digit CCV</div>
                <InputMask1 className="my-auth-input-95" placeholder="Full Name" type="text" mask="999"
                       onChange={(e) => this.onCvvChange(e.target.value)} value={this.state.cvv}/>
                <div className="my-auth-input-label">Name on Card</div>
                <Input className="my-auth-input-95" placeholder="Name on Card" type="text"
                       onChange={(e) => this.onNameOnCardChange(e.target.value)} value={this.state.nameoncard}/>
                <div className="my-paymentdashboard-button">
                    <MyButton accent onClick={this.sendPayment}>Pay</MyButton>
                </div>
            </div>
        </div>
    );
  }
}
