import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActionCreators from '../../actions/user';

import Api from '../../scripts/Api';

class FlightDetail extends Component{

  // booking id
  // request to server bookings/ticket

  componentDidMount(){
    this.requestDetail();
  }

  render(){
    return(
      <div className="my-flightdetail">
        FlightDetail
      </div>
    );
  }
}

// *** Redux State To Props ***

FlightDetail.requestDetail = () => {
    console.log("requesting");
    const config = {
        method: 'get',
        headers: this.props.user,
        url: `/api/v1/bookings/${this.props.location.state.bookingid}/ticket`
    }
    axios(config)
        .then((res) => {
            console.log(res);
            var user = Api.parseHeader(res, this.props.user);
            console.log(user);
            const loginUser = bindActionCreators(userActionCreators.login, this.props.dispatch);
            loginUser(user);        // save header as redux state
        });
}

const mapStateToProps = state => (
  {
    user: state.user
  }
);

export default connect(mapStateToProps)(FlightDetail);
