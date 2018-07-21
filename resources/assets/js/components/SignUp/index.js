import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form } from 'reactstrap';

import { Input, Button } from '../_Main';

class SignUp extends Component{

  static propTypes = {
    openModal: PropTypes.func
  }

  constructor(props){
    super(props);

    this.state={
      name: '',
      username: '',
      email: '',
      phone: '',
      birth_date: '',
      password: '',
      password_confirmation: '',
    };
  }

  // *** State Modifiers ***

    onNameChange = (e) => {
      this.setState({
        name: e.target.value
      });
    }

    onUsernameChange = (e) => {
      this.setState({
        username: e.target.value
      });
    }

    onEmailChange = (e) => {
      this.setState({
        email: e.target.value
      });
    }

    onPhoneChange = (e) => {
      this.setState({
        phone: e.target.value
      });
    }

    onBirthDateChange = (e) => {
      this.setState({
        birth_date: e.target.value
      });
    }

    onPasswordChange = (e) => {
      this.setState({
        password: e.target.value
      });
    }

    onPasswordConfirmationChange = (e) => {
      this.setState({
        password_confirmation: e.target.value
      });
    }

  // *** Actions ***

    onSignUp = () => {
      // Config for register request
      // Not included yet: { this.state.phone, this.state.birth_date, this.state.password_confirmation}
      var config = {
        method: 'post',
        url: '/auth',
        data: {
          name: this.state.name,
          nickname: this.state.username,
          email: this.state.email,
          password: this.state.password,
        }
      }

      axios(config).then((res) => {
        // *** Register Successfull ***

          // Open popup to tell user register successfull
          this.props.openModal(`User ${this.state.email} registered succesfully.`);

          // Redirect to login page
          this.props.history.push({
            pathname: '/login'
          });
          window.scroll(0,0);

      }).catch((error) => {
        // *** Register Failed ***

          // Open popup to tell user register fail
          this.props.openModal(`We cannot registering your account. ${error}`);
      });
    }

  // *** Render ***

  render(){
    return(
      <div className="garuda-login">
        <div  className="garuda-login-container">

          <div className="garuda-login-card-container">
            <div className="garuda-login-card">
              <div className="garuda-login-card-top">
                <div className="garuda-login-picture">
                  <div className="garuda-login-title">DAFTAR</div>
                </div>
              </div>

              <div className="garuda-login-card-mid">
                <Form className="garuda-login-form">
                  <Input className="my-auth-input" placeholder="Username" type="text" onChange={this.onUsernameChange} value={this.state.username}/>
                  <Input className="my-auth-input" placeholder="Full Name" type="text" onChange={this.onNameChange} value={this.state.name}/>
                  <Input className="my-auth-input" placeholder="Email" type="text" onChange={this.onEmailChange} value={this.state.email}/>
                  <Input className="my-auth-input" placeholder="Password" type="password" onChange={this.onPasswordChange} value={this.state.password}/>
                  <Input className="my-auth-input" placeholder="Password Confirmation" type="password" onChange={this.onPasswordConfirmationChange} value={this.state.password_confirmation}/>
                  <Input className="my-auth-input" placeholder="Phone" type="text" onChange={this.onPhoneChange} value={this.state.phone}/>
                  <Input className="my-auth-input" placeholder="Birthday" type="string" onChange={this.onBirthDateChange} value={this.state.birth_date}/>
                </Form>
              </div>
            </div>
            <div className="garuda-login-card button" onClick={this.onSignUp}>
              <span>Daftar</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

withRouter(SignUp);
export default SignUp;
