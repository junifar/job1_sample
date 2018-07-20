import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';
import { Input, Button } from '../../_Main';
import Dropdown from '../../_Main/Dropdown/Dropdown';

export default class ContactForm extends Component{

  constructor(props) {
    super(props);

    this.state = {
      title: "Title",
      edit_contact: false
    };
  }


  render(){
    console.log("review :"+this.props.review);
    console.log("edit contact :"+!this.state.edit_contact);
    return(
      <div>
        <div className="my-booking-left">
          <div  className="my-booking-left-container">

            <div className="garuda-login-card-container">
              <div className="garuda-login-card">
                <div className="my-booking-card-top">
                  <div className="my-booking-detail-title">Contact Details</div>
                  { (this.props.review && !this.state.edit_contact) &&
                    <div className="my-booking-detail-title-edit"><div onClick={this.editContact} className="my-booking-button-edit garuda-button">
                      Edit
                    </div></div>
                  }
                </div>
                { (this.props.review && !this.state.edit_contact) &&
                <div className="garuda-login-card-mid">
                  <div className="my-auth-input-label">
                    <table style={{width: "100%"}}>
                      <tbody>
                      <tr>
                        <td>Full Name</td>
                        <td>Phone Number</td>
                        <td>Email</td>
                      </tr>
                      <tr>
                        <td>{this.props.user.name}</td>
                        <td>{this.props.user.phone}</td>
                        <td>{this.props.user.email}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                }
                { (!this.props.review || this.state.edit_contact) &&
                <div className="garuda-login-card-mid">
                  <Form className="garuda-login-form">
                    <Dropdown color="link" size="lg" header={this.state.title} items={["MR", "MRS", "MS"]}
                              onChange={this.onTitleStateChange}/>
                    <div className="my-auth-input-label">Full Name - As on ID card/passport/driving license</div>
                    <Input className="my-auth-input" placeholder="Nama Lengkap" type="text"
                           onChange={(e) => this.props.onNameChange(e.target.value)} value={this.props.user.name}/>
                    <div style={{display: "flex"}}>
                      <div className="my-auth-input-label" style={{width: "50%"}}>Phone Number - e.g +6281234567</div>
                      <div className="my-auth-input-label">Email - e.g email@example.com</div>
                    </div>
                    <div style={{display: "flex"}}>
                      <Input className="my-auth-input-50" placeholder="Nomor Ponsel" type="text"
                             onChange={(e) => this.props.onPhoneChange(e.target.value)} value={this.props.user.phone}/>
                      <Input className="my-auth-input-50" style={{width: "50%"}} placeholder="Email" type="text"
                             onChange={(e) => this.props.onEmailChange(e.target.value)} value={this.props.user.email}/>
                    </div>
                  </Form>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



ContactForm.propTypes = {
    onEmailChange: PropTypes.func,
    onReemailChange: PropTypes.func,
    onPhoneChange: PropTypes.func,
    onTitleChange: PropTypes.func,
    email: PropTypes.string,
    reemail: PropTypes.string,
    phone: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    onNameChange: PropTypes.func
}

ContactForm.onTitleStateChange = (e) => {
    this.setState({
        title: e.target.innerHTML
    });

    this.props.onContactTitleChange(e.target.innerHTML);
}

ContactForm.editContact = () => {
    this.setState({
        edit_contact: !this.state.edit_contact
    });
}