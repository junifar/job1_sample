import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form } from 'reactstrap';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActionCreators from '../../actions/user';

import { Input, Button } from '../_Main';

import Api from '../../scripts/Api';

class Login extends Component{

  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      err: "",
      error: false
    }
  }

  // *** Render ***

  render(){
    const { dispatch } = this.props;

    return(
      <div className="garuda-login">
        <div  className="garuda-login-container">
          <div className="garuda-login-card-container">
            <div className="garuda-login-card">
              <div className="garuda-login-card-top">
                <div className="garuda-login-picture">
                  <div className="garuda-login-title">PROFIL</div>
                </div>
              </div>

              <div className="garuda-login-card-mid">
                <Form className="garuda-login-form">
                  <Input placeholder="Email" type="text" className="garuda-login-input" value={this.state.email} onChange={this.onEmailChange}/>
                  <Input placeholder="Password" type="password" className="" value={this.state.password} onChange={this.onPasswordChange}/>
                </Form>
                <p>{this.state.error && <strong>{this.state.err}</strong>}</p>
                <Link to='/ForgotPassword'><Button link>Lupa Password</Button></Link>
              </div>
            </div>
            <div className="garuda-login-card button" onClick={this.onLogin}>
              <span>
                <span>Masuk</span>
              </span>
            </div>
          </div>

          <div className="garuda-login-with">
            <Link to="/signup"><Button register>Daftar</Button></Link>
            <p className="garuda-login-card-divider">ATAU GUNAKAN</p>
            <Button facebook>Masuk dengan <strong>facebook</strong></Button>
            <Button googleplus>Masuk dengan <strong>Google+</strong></Button>
          </div>
        </div>
      </div>
    );
  }
}



  // *** State Modifiers ***

  Login.onEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  Login.onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

// *** Actions ***

Login.onLogin =  () => {
    var error = false;
    var err = "";
    if (this.state.email == "") {
      err = '^Please enter your email address.';
      error = true;
    } else if (this.state.password == "") {
      err = '^Please enter your password.';
      error = true;
    }
    
    this.setState({
      err: err,
      error: error
    });

    // Request sign in
    if (!error) {
      const url = '/v1/user/login';
      const urlUser = '/v1/user/my';
      const params = {
        username: this.state.email,
        password: this.state.password
      };

      const loginUser = bindActionCreators(userActionCreators.login, this.props.dispatch);

      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      // request to server
      axios.post(url, params, axiosConfig).then((res) => {
        // *** Sign In Successfull ***
        // Setting header/token for next request
        if (res.data.status) {
          const token = res.data.data[0];
          axiosConfig = {
            headers: {
              'Content-Type': 'application/json',
              'WLPS_TOKEN': token
            }
          };
          //var user = Api.parseHeader(res, this.props.user);
          axios.post(urlUser, params, axiosConfig).then((res1) => {
            if (res1.data.status) {
              loginUser(res1.data.data[0]);
              this.props.onLoginState(this.props.user, token);
              // Back to Home
              this.props.history.push({
                pathname: '/'
              });
              window.scroll(0, 0);
            } else {
              this.props.openModal(`We cannot find your account.`);
            }
          }).catch((error) => {
            // *** Sign In Failed ***
            this.props.openModal(`We cannot find your account. ${error}`);
          });
        } else {
          this.props.openModal(`We cannot find your account. ${res.data.message}`);
        }

      }).catch((error) => {
        // *** Sign In Failed ***
        this.props.openModal(`We cannot registering your account. ${error}`);
      });
    }
  }

// *** Redux State To Props ***

const mapStateToProps = state => (
  {
    user: state.user
  }
);

export default connect(mapStateToProps)(Login);
