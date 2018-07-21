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
        this.props.history.push({
            pathname: '/Payment/transferdetail'
        });
        window.scroll(0,0);
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
