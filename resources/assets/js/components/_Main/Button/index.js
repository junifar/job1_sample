import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component{

  static propTypes = {
    onClick: PropTypes.func,
    name: PropTypes.string,
    link: PropTypes.bool,
    outline: PropTypes.bool,
    facebook: PropTypes.bool,
    googleplus: PropTypes.bool,
    register: PropTypes.bool,
    accentc: PropTypes.bool,
    noshadow: PropTypes.bool,
  };

  render(){
    var classStyle = "garuda-button";
    if (this.props.link){
      classStyle = classStyle+" link";
    }
    if (this.props.outline){
      classStyle = classStyle+" outline";
    }
    if (this.props.register){
      classStyle = classStyle+" register";
    }
    if (this.props.facebook){
      classStyle = classStyle+" facebook";
    }
    if (this.props.googleplus){
      classStyle = classStyle+" googleplus";
    }
    if (this.props.accentc){
      classStyle = classStyle+" accentc";
    }
    if (this.props.noshadow){
      classStyle = classStyle+" noshadow";
    }
    return(
      <div onClick={this.props.onClick} className={classStyle}>
        {this.props.children}
      </div>
    );
  }
}
