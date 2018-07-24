import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Menu, UserBooking, UserBookingDetail, UserProfile, UserQueue, UserQueueDetail, UserPassenger, UserLogout} from './components';

export default class UserDashboard extends Component{

  componentDidMount(){
    // get user booking
    // get user info
    // get
  }

  render(){
    return(
        <div className="container garuda-top-margin">
            <BrowserRouter>
            <div class="row">
                <div class="col-md-4">
                    <Menu/>
                </div>
                <div className="col-md-8">
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
        </div>
    );
  }
}
