import React, {Component} from 'react';
import { Form as RForm, FormGroup, Input as RInput } from 'reactstrap';
import PropTypes from 'prop-types';

export default class Input extends Component{
  render(){
    return(
        <input
              type={this.props.type}
              value={this.props.value}
              className={`my-input ${this.props.className}`}
              checked={this.props.checked}
              disabled={this.props.disabled}
              name={this.props.name}
              placeholder={this.props.placeholder}
              required={this.props.required}
              onChange={this.props.onChange}
          />
    );
  }
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: "text",
};
