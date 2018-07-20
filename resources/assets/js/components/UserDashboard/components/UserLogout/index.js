import React, { Component } from 'react';
import { Redirect } from "react-router";

export default class UserLogout extends Component{

  render(){
    console.log('in logout');
    localStorage.clear();

    return (
      <Redirect to="/" push={true}/>
    );
  }
}
