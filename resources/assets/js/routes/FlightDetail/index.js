import React, { Component } from 'react';
import { Modal as RModal, ModalBody, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';

export default class FlightDetail extends Component{

  static props = {
    isOpen: PropTypes.bool,
    flight: PropTypes.object,
    modalToggle: PropTypes.func,
  }

  render(){
    return(
      <div>
        <RModal isOpen={this.props.isOpen} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
          toggle={this.props.modalToggle} className={this.props.className}>
          <ModalBody>
            Hello
          </ModalBody>
        </RModal>
      </div>
    );
  }
}
