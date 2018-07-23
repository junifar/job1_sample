import React, { Component } from 'react';
import { Redirect } from "react-router";

export default class UserLogout extends Component{

  handleLogout = async event => {
    //await Auth.signOut();
    localStorage.clear();
    //this.userHasAuthenticated(false);

    this.props.history.push("/");
  }

  render(){
    console.log('in logout');

    this.handleLogout();
    return (<Redirect push to="/"/>);
  }
}
