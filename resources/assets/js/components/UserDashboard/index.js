import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Menu, UserBooking, UserBookingDetail, UserProfile, UserQueue, UserQueueDetail, UserPassenger, UserLogout} from './components';

export default class UserDashboard extends Component{

  componentDidMount(){
    // get user booking
    // get user info
    // get
  }

  render(){
    return(
        <BrowserRouter>
      <div className="my-dashboard">
        <div>
          <Menu />
        </div>
        <div className="my-dashboardcontent">
          <Route path="/User/booking" render={(props) => <UserBooking {...props} openModal={this.props.openModal}/>}/>
          <Route path="/User/bookingdetail" component={UserBookingDetail}/>
          <Route path="/User/queue" render={(props) => <UserQueue {...props} openModal={this.props.openModal}/>}/>
          <Route path="/User/queuedetail" component={UserQueueDetail}/>
          <Route path="/User/profile" render={(props) => <UserProfile {...props} openModal={this.props.openModal}/>}/>
          <Route path="/User/passenger" component={UserPassenger}/>
          <Route path="/User/logout" component={UserLogout}/>
        </div>
      </div>
            </BrowserRouter>
    );
  }
}
