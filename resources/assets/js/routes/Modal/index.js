import React, { Component } from 'react';
import { Modal as RModal, ModalBody, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Modal extends Component{

  render(){

    var message = this.props.message;
    if (this.props.link){
      //message = <a href={this.props.link}>{this.props.message}</a>
      message = <Link to={this.props.link}>{this.props.message}</Link>
    }

    return(
      <div>
        <RModal isOpen={this.props.isOpen} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
          toggle={this.props.modalToggle} className={this.props.className}>
          { (this.props.title) &&
            <ModalHeader toggle={this.props.modalToggle}>{this.props.title}</ModalHeader>
          }
          <ModalBody>
            {message}
          </ModalBody>
        </RModal>
      </div>
    );
  }
}

Modal.props = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  modalToggle: PropTypes.func,
  title: PropTypes.string,
}
