import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class MenuPayment extends Component{
  render(){
    return(
        <ListGroup>
            <NavLink to="/Payment/pay" className="my-dashboardmenu-link" activeClassName="active">How to pay</NavLink>
            <NavLink to="/Payment/transfer" className="my-dashboardmenu-link" activeClassName="active">Transfer</NavLink>
            <NavLink to="/Payment/creditcard" className="my-dashboardmenu-link" activeClassName="active">Credit Card</NavLink>
            <NavLink to="/Payment/mandiri" className="my-dashboardmenu-link" activeClassName="active">Mandiri ClickPay</NavLink>
        </ListGroup>

    );
  }
}
