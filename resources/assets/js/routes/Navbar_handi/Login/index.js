import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../../../actions/user';
import Api from '../../../scripts/Api';
import { Input, Button } from '../../../components/_Main';
import PropTypes from 'prop-types';
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

export default class Login extends Component{  

  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      err: "",
      error: false,
      isOpen: false
    }
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  responseFacebook = (response) => {
    console.log('fb :'+response.status);
  }

  responseGoogle = (response) => {
    console.log('google :'+response);
  }


  onLogin =  () => {
    var error = false;
    var err = "";
    if (this.state.email == "") {
      err = 'Please enter your email address';
      error = true;
    } else if (this.state.password == "") {
      err = 'Please enter your password';
      error = true;
    }

    this.setState({
      err: err,
      error: error
    });

    // Request sign in
    if (!error) {
      err = "Sorry we couldn't find an account with that email";

      const url = '/v1/user/login';
      const urlUser = '/v1/user/my';
      const params = {
        username: this.state.email,
        password: this.state.password
      };

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
          axios.post(urlUser, params, axiosConfig).then((res1) => {
            if (res1.data.status) {
              this.props.refreshNavbar(res1.data.data[0], token);
              this.toggleOpen();
              window.scroll(0, 0);
            } else {
              this.setState({
                err: true,
                error: error
              });
            }
          }).catch((error1) => {
            // *** Sign In Failed ***
            this.setState({
              err: true,
              error: error
            });
          });
        } else {
          this.setState({
            err: true,
            error: error
          });
        }
      }).catch((error1) => {
        // *** Sign In Failed ***
        this.setState({
          err: true,
          error: error
        });
      });
    }
  }

  render(){
    
    return(
      <div className="my-logindropdown">
        <div className="my-logindropdown-label" onClick={this.toggleOpen}>
          <div className="nav-link">Login/Signup</div>
        </div>
        <div className={`my-logindropdown-popup ${this.state.isOpen ? "" : "hide"}`}>
          <div className="my-logindropdown-popup-container">
            <div className="my-logindropdown-popup-item">
              <div className="garuda-login">
                <div  className="garuda-login-container">
                  <div className="garuda-login-card-container">
                    <div className="garuda-login-card">
                      <div className="garuda-login-title">Log in to your account</div>

                      <div className="garuda-login-card-mid">
                        <Form className="garuda-login-form">
                          <div className="garuda-login-input-title">Email</div>
                          <Input placeholder="Email" type="text" className="garuda-login-input" value={this.state.email} onChange={this.onEmailChange}/>
                          <div className="garuda-login-input-title">
                            <span style={{float: 'left'}}>Password</span>
                            <span style={{float: 'right'}}>
                              <Link to='/ForgotPassword' style={{color: '#2AA1B2', fontWeight: 'bold'}}>Forgot Password</Link>
                            </span>
                          </div>
                          <Input placeholder="Password" type="password" className="garuda-login-input" value={this.state.password} onChange={this.onPasswordChange}/>
                        </Form>
                      </div>
                    </div>
                    { this.state.error &&
                      <div className="garuda-login-error">
                        <span className="text-danger">{this.state.err}</span>
                      </div>
                    }
                    <div className="garuda-login-card">
                      <div onClick={this.onLogin} className="garuda-button garuda-login-submit">
                        <strong>Log in</strong>
                      </div>
                    </div>
                    <div className="garuda-login-card">
                      <div onClick={this.onLogin} className="garuda-button divider">
                        Or login with
                      </div>
                    </div>
                    <div className="my-logindropdown-popup-button">
                      <div className="my-logindropdown-popup-button-item">
                        <FacebookLogin
                            //appId="1088597931155576"
                            appId="1004573656391113"
                            autoLoad={true}
                            fields="name,email,picture"
                            scope="public_profile,user_friends,user_actions.books"
                            textButton="facebook"
                            size="small"
                            //onClick={componentClicked}
                            callback={this.responseFacebook}                            
                            render={renderProps => (
                              <Button facebook onClick={renderProps.onClick}></Button>
                            )}
                        />
                      </div>
                      <div className="my-logindropdown-popup-button-item">
                        <GoogleLogin
                            //clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            clientId="532909145357-cbnu8sm56c02i0jo22c64mvofe8hp0nn.apps.googleusercontent.com"
                            buttonText="GOOGLE"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            style={{backgroundColor: "#4285f4", color: "#FFFFFF", fontSize: "18px", padding: "0.4em", textAlign: "center", fontWeight: "normal",
                                  marginTop: "0", marginBottom: "0.5em", width: "140px"}}
                        />
                      </div>
                    </div>
                    <div className="garuda-login-card">
                      <div className="garuda-button register">
                        Don't have account?<Link to="/signup" style={{color: 'darkred'}}> Register here</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
