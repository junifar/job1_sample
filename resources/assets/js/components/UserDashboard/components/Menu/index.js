import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Menu extends Component{
  render(){
    return(
      <div className="my-dashboardmenu">
        <NavLink to="/User/profile" className="my-dashboardmenu-link" activeClassName="active">My Profile</NavLink>
        <NavLink to="/User/booking" className="my-dashboardmenu-link" activeClassName="active">My Booking</NavLink>
        <NavLink to="/User/queue" className="my-dashboardmenu-link" activeClassName="active">My Queue</NavLink>
        <NavLink to="/User/passenger" className="my-dashboardmenu-link" activeClassName="active">Passenger List</NavLink>
        <NavLink to="/User/logout" className="my-dashboardmenu-link" activeClassName="active">Logout</NavLink>
      </div>
    );
  }
}
