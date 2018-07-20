import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Form from './Form';


export default class Body extends Component {

  static propTypes = {
    requestFlights: PropTypes.func,
  }

  render(){
    return(
      <div className="garuda-form-body">
        <Form
          requestFlights={this.props.requestFlights}/>
      </div>
    );
  }
}
