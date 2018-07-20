import React, { Component } from 'react';
import { Form } from 'reactstrap';

import { Input, Button } from '../_Main';

export default class ForgotPassword extends Component{
  render(){
    return(
      <div className="garuda-login">
        <div  className="garuda-login-container">
          <div className="garuda-login-card-container">
            <div className="garuda-login-card">
              <div className="garuda-login-card-top">
                <div className="garuda-login-picture">
                  <div className="garuda-login-title">LUPA PASSWORD</div>
                  <p className="garuda-login-subtitle">Tenang, kami akan membantu anda mengakses akunmu kembali. Masukkan email yang anda gunakan.</p>
                </div>
              </div>

              <div className="garuda-login-card-mid">
                <Form className="garuda-login-form">
                  <Input placeholder="Email" type="text"/>
                </Form>
              </div>
            </div>
            <div className="garuda-login-card button">
              <span>Reset Password</span>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
