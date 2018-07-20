import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Body from './Body';

export default class GarudaForm extends Component {

  static propTypes = {
    requestFlights: PropTypes.func,
  }

  render(){
    return(
      <div className="garuda-form-container">

        <Header />
        <Body requestFlights={this.props.requestFlights}/>

      </div>
    );
  }
}
