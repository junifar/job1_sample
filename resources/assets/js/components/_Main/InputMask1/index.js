import React, {Component} from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

export default class InputMask1 extends Component{

  static propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    mask: PropTypes.string
  };

  static defaultProps = {
    type: "text",
  };

  render(){
    return(
      <Input
        type={this.props.type}
        value={this.props.value}
        className={`my-input ${this.props.className}`}
        checked={this.props.checked}
        disabled={this.props.disabled}
        name={this.props.name}
        placeholder={this.props.placeholder}
        required={this.props.required}
        onChange={this.props.onChange}
        mask={this.props.mask}
        maskChar=" "
        tag={InputMask}
      />
    );
  }
}
