import React , { Component } from 'react';
import PropTypes from 'prop-types';

export default class MyButton extends Component{

  static propTypes = {
    onClick: PropTypes.func
  }

  render(){
    var classStyle = "my-button-primary";
    if (this.props.outline){
      classStyle += "-outline";
    }
    if (this.props.accent){
      classStyle += " accent";
    }
    if (this.props.disabled){
      classStyle += " disabled";
    }

    return(
      <div onClick={this.props.onClick} className={classStyle} style={{marginRight: "10px"}}>
        {this.props.children}
      </div>
    );
  }
}
