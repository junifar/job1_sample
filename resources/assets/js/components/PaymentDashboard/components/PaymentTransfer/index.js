import React, { Component } from 'react';
import { MyButton } from '../../../_Main';

export default class PaymentTransfer extends Component{
    constructor(props){
        super(props);

        this.state = {
            openBca: false,
            openFinpay: false
        }
    }

    openBca = () => {
        this.setState({
            openBca: !this.state.openBca,
            openFinpay: false
        });
    }

    openFinpay = () => {
        this.setState({
            openFinpay: !this.state.openFinpay,
            openBca: false
        });
    }

    sendPayment = (e) => {
        var dataSend = {
            bookingId : this.props.booking.id,
            invoiceNumber :this.props.booking.invoiceNumber,
            method : 3,
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
                this.props.history.push({
                    pathname: '/Payment/transferdetail',
                    state: {
                        paymentCode: res.data.data[0].paymentCode,
                        timeLimit: this.props.booking.timeLimit
                    }
                });
                window.scroll(0,0);
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

    render(){
    return(
        <div className="my-paymentdashboard">
          <div className="my-paymentdashboard-title-transfer">
            Transfer
          </div>
          <div className="my-paymentdashboard-body-transfer">
              <table className="my-userdashboard-table">
                  <tbody>
                  <tr className="my-paymentdashboard-tr" onClick={this.openBca}>
                      <td className="my-userdashboard-td-left"><input type="radio" name="transfer_bca" value="BCA" checked={this.state.openBca}/>BCA</td>
                      <td className="my-userdashboard-td-right">
                          Logo BCA
                      </td>
                  </tr>
                  <hr/>
                  { this.state.openBca &&
                      <span>
                  <tr className="my-paymentdashboard-tr">
                      <td colSpan="2"><span style={{color: "accent"}}>Payment Condition</span></td>
                  </tr>
                  <tr className="my-paymentdashboard-tr">
                      <td className="my-userdashboard-td-left">
                          <span>1. Lorem ipsum</span>
                          <br/>
                          <span>2. Lorem ipsum</span>
                      </td>
                      <td className="my-userdashboard-td-right">
                          <MyButton accent onClick={this.sendPayment.bind(this,"bca")}>Pay</MyButton>
                      </td>
                  </tr>
                      </span>
                  }
                  </tbody>
              </table>
          </div>
            <div className="my-paymentdashboard-body-transfer">
                <table className="my-userdashboard-table">
                    <tbody>
                    <tr className="my-paymentdashboard-tr" onClick={this.openFinpay}>
                        <td className="my-userdashboard-td-left"><input type="radio" name="transfer_finpay" value="Finpay" checked={this.state.openFinpay}/>Finpay</td>
                        <td className="my-userdashboard-td-right">
                            Logo Finpay
                        </td>
                    </tr>
                    <hr/>
                    { this.state.openFinpay &&
                    <span>
                  <tr className="my-paymentdashboard-tr">
                      <td colSpan="2"><span style={{color: "accent"}}>Payment Condition</span></td>
                  </tr>
                  <tr className="my-paymentdashboard-tr">
                      <td className="my-userdashboard-td-left">
                          <span>1. Lorem ipsum</span>
                          <br/>
                          <span>2. Lorem ipsum</span>
                      </td>
                      <td className="my-userdashboard-td-right">
                          <MyButton accent onClick={this.sendPayment.bind(this,"finpay")}>Pay</MyButton>
                      </td>
                  </tr>
                      </span>
                    }
                    </tbody>
                </table>
            </div>
        </div>

    );
  }
}
