import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Menu extends Component{
  render(){
    return(
        <ListGroup>
            <ListGroupItem className="my-dashboardmenu-link" tag="a" href="/User/profile">My Profile</ListGroupItem>
            <ListGroupItem className="my-dashboardmenu-link" tag="a" href="/User/booking">My Booking</ListGroupItem>
            <ListGroupItem className="my-dashboardmenu-link" tag="a" href="/User/queue">My Queue</ListGroupItem>
            <ListGroupItem className="my-dashboardmenu-link" tag="a" href="/User/passenger">Passenger List</ListGroupItem>
            <ListGroupItem className="my-dashboardmenu-link" tag="a" href="/User/logout">Logout</ListGroupItem>
        </ListGroup>
    );
  }
}
