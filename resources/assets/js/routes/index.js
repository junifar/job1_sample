import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../actions/user';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import { Booking, Home, SearchResult, Faq, ForgotPassword, Login, NotFound, PaymentMethod, SignUp, UserDashboard, FlightDetail, PaymentDashboard } from '../components';
import MandiriClickpay from '../components/PaymentMethod/MandiriClickpay';
import HeaderRequesting from '../components/Home/FlightForm/HeaderRequesting';
import Navbar from './Navbar';
import Modal from './Modal';
import PropTypes from 'prop-types';
// import FlightDetail as ModalFlightDetail from './FlightDetail';

export default class Routes extends React.Component {

  static propTypes = {
    user: PropTypes.string,
    token: PropTypes.string
  }

  constructor(props){
    super(props);

    this.state = {
      modal: {
        open: false,
        message: '',
        link: '',
        title: 'Information'
      },
      modal_flight_detail: {
        open: false,
        flight: {}
      },
      modal_header_requesting: {
        open: false
      },
      user: JSON.parse(localStorage.getItem('user')),
      token: localStorage.getItem('token')
    };
  }

  // onToggleModalFlightDetail = () => {
  //   var value = !this.state.flight_detail.open;
  //   this.setState({
  //     modal_flight_detail: {
  //       open: value,
  //       isBlur: value
  //     }
  //   });
  // }

  onToggleHeaderRequesting = () => {
       var value = !this.state.modal_header_requesting.open;
       this.setState({
         modal_header_requesting: {
           open: value,
           //isBlur: value
         }
       });
     }

  onToggleModal = () => {
    this.setState({
      modal: {
        open: !this.state.modal.open,
        message: this.state.modal.message
      }
    });
  }

  openModal = (message, link, title) => {
    var new_link = null;
    if (link) {
      new_link = link
    }

    this.setState({
      modal: {
        open: true,
        message: message,
        link: new_link,
        title: title
      }
    });
  }

  openHeaderRequesting = (op) => {
    this.setState({
      modal_header_requesting: {
        open: op
      }
    })
  }

  onLoginState = (user, token) => {
    //var hours = 24; // Reset when storage is more than 24hours
    var minutes = 5; // Reset when storage using minutes
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');

    if (setupTime == null) {
      localStorage.setItem('setupTime', now);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      if(now-setupTime > minutes*60*1000) {
        this.openModal("Session anda sudah habis, silahkan Login kembali.");
        localStorage.clear();
        window.scroll(0, 0);
      } else {
        localStorage.setItem('setupTime',now);
      }
    }

    this.setState({
      user: user,
      token: token
    });
  }

  checkSetupTime = (token) => {
    var minutes = 5; // Reset when storage using minutes
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (token && setupTime && now-setupTime > minutes*60*1000) {
      this.openModal("Session anda sudah habis, silahkan Login kembali.");
      this.setState({
        user: null,
        token: null
      });
      localStorage.clear();
      window.scroll(0, 0);
    } else {
      localStorage.setItem('setupTime',now);
    }
  }

  // openModalFlightDetail = (flight) => {
  //   this.setState({
  //     modal_flight_detail: {
  //       open: true,
  //       flight: flight,
  //       isBlur: true
  //     }
  //   });
  // }

  render(){
    // if (this.props.history.location.state.openModal) {
    //   this.onSignedUpSuccess(this.props.history.location.state.messageModal);
    // }
    var containerClass = ""
    // if(this.state.flight_detail.open){
    //   containerClass = "blur";
    // }
    if (localStorage.getItem('token')) {
      this.checkSetupTime(localStorage.getItem('token'));
    }

    return (
      <BrowserRouter>
        <div>
          <HeaderRequesting isOpen={this.state.modal_header_requesting.open} modalToggle={this.onToggleHeaderRequesting}/>
          <Modal isOpen={this.state.modal.open} link={this.state.modal.link} message={this.state.modal.message} modalToggle={this.onToggleModal}/>
          {/* <ModalFlightDetail isOpen={this.state.flight_detail.open} flight={this.state.flight_detail.flight} modalToggle={this.onToggleFlightDetail}/> */}
          <div className={`my-routes-container ${containerClass}`}>
            <Navbar openModal={this.openModal} onLoginState={this.onLoginState} user={this.state.user}/>
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} openFlightDetail={this.openFlightDetail} openModal={this.openModal} openRequesting={this.openHeaderRequesting} user={this.state.user} token={this.state.token}/>} />
              <Route exact path="/Search" component={SearchResult} />
              <Route exact path="/Faq" component={Faq} />
              <Route exact path="/Login" render={(props) => <Login {...props} openModal={this.openModal} onLoginState={this.onLoginState}/>}/>
              <Route exact path="/ForgotPassword" component={ForgotPassword} />
              <Route exact path="/PaymentMethod" component={PaymentMethod} />
              <Route exact path="/PaymentMethod/mandiriclickpay" component={MandiriClickpay} />
              <Route exact path="/SignUp" render={(props) => <SignUp {...props} openModal={this.openModal}/>}/>
              <Route exact path="/Booking" render={(props) => <Booking {...props} openModal={this.openModal} user={this.state.user}/>}/>
              <Route exact path="/SearchResult" render={(props) => <SearchResult {...props} openModal={this.openModal} user={this.state.user}/>}/>
              <Route exact path="/FlightDetail" render={(props) => <FlightDetail {...props} openModal={this.openModal}/>}/>
              <Route path="/User" render={(props) => <UserDashboard {...props} openModal={this.openModal} token={this.state.token}/>}/>
              <Route path="/Payment" render={(props) => <PaymentDashboard {...props} openModal={this.openModal}/>}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
