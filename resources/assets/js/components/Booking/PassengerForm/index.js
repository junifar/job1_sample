import React, { Component } from 'react';
import moment from 'moment';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';
import { Input, Button } from '../../_Main';
import Dropdown from '../../_Main/Dropdown/Dropdown';
import VirtualizedSelect from 'react-virtualized-select';

export default class PassengerForm extends Component{

  static propTypes = {
    index: PropTypes.number,
    onFullNameChange: PropTypes.func,
    onDateOfBirthChange: PropTypes.func,
    passenger_type: PropTypes.string,
    title: PropTypes.string,
    full_name: PropTypes.string,
    date_of_birth: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      title: "Title",
      day: "Tanggal",
      month: "Bulan",
      year: "Tahun",
      names: {},
    };
  }

  onPassTitleChange = (e) => {
    this.setState({
      title: e.target.innerHTML
    });

    this.props.onTitleChange(e.target.innerHTML);
  }

  onDayChange = (e) => {
    this.setState({
      day: e.target.innerHTML
    });
  }

  onMonthChange = (e) => {
    this.setState({
      month: e.target.innerHTML
    });
  }

  onYearChange = (e) => {
    this.setState({
      year: e.target.innerHTML
    });

    this.props.onDateOfBirthChange(this.state.day + "-" + this.state.month + "-" + e.target.innerHTML);
  }

  updateQuery = (value) => {
    // Assume minimal 1 character before request to server
    if(value.length >= 1){
      this.setState({
        query: value
      });

      // Create timeout to give user time to type
      clearTimeout(this.triggerRequest);
      this.triggerRequest = setTimeout(this.requestName(value), 200);
    }
  }

  requestName = (value) => {
    const params =  {
      "keyword" : value,
      "perPage" : 1000
    };

    const url = '/v1/user/my/saved-passenger';

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'WLPS_TOKEN': localStorage.getItem('token')
      }};

    axios.post(url,params,axiosConfig).then((res) => {
      // *** Success Get Airport ***
      res.data.data.forEach((pass, index) => {
        var namesOption = this.state.names;
        namesOption[pass.id] = `${pass.name}`;
        this.setState({
          names: namesOption
        });

      });

    }).catch((error) => {
      console.log('err :'+error.response.status);
      switch (error.response.status) {
        case 401: // Unauthorized
          this.props.openModal("Your session is gone, please do relogin");
          break;
        default:
          this.props.openModal("Your session is gone, please do relogin");
      }

    });

    clearTimeout(this.triggerRequest); // Set timout for interval 200ms while witing user to type
  };

  render(){    
    var label_passenger = "";
    switch (this.props.passenger_type) {
      case "adults":
        label_passenger="Adult";
        break;
      case "children":
        label_passenger="Children";
        break;
      case "infants":
        label_passenger="Infant";
        break;
      default:
    }

    var dayArr = [];
    for (let i = 1; i < 32; i++) {
      dayArr.push(i);
    }

    var monthArr = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Npvember", "Desember"];

    var yearArr = [];
    var year = moment().format("YYYY");

    if (this.props.passenger_type == 'children') {
      for (let i = (year-2); i >= (year-12); i--) {
        yearArr.push(i);
      }
    } else if (this.props.passenger_type == 'infants') {
      for (let i = year; i >= (year-2); i--) {
        yearArr.push(i);
      }
    }

    var arrayOfName = [];
    for (var key in this.state.names) {
      var name = {value: key, label: this.state.names[key]}
        arrayOfName.push(name);
    }


    return(
        <div className="garuda-login-card">
          {!this.props.review &&
          <div className="my-booking-card-top">
            <div className="my-booking-detail-title">{label_passenger} {this.props.index+1}</div>
          </div>
          }

          {this.props.review &&
          <div className="my-booking-card-top">
            <div className="my-booking-detail-title">{this.props.index+1}. {this.props.full_name}</div>
            <div className="my-booking-detail-title-edit">Edit</div>
          </div>
          }

          {!this.props.review &&
          <div className="garuda-login-card-mid">
            <Form className="garuda-login-form">
              { (this.props.passenger_type == "adults") &&
              <Dropdown color="link" size="lg" header={this.state.title} items={["MR", "MRS", "MS"]}
                        onChange={this.onPassTitleChange}/>
              }
              { (this.props.passenger_type == "children") &&
              <Dropdown color="link" size="lg" header={this.state.title} items={["MSTR", "MISS"]}
                        onChange={this.onPassTitleChange}/>
              }
              <div className="my-auth-input-label">Full Name - As on ID card/passport/driving license</div>
              <Select name="select-category" options={arrayOfName} onInputChange={this.updateQuery} value={this.props.full_name} onChange={(e) => this.props.onFullNameChange(e.label)} clearable={true}/>
              {/*
              <VirtualizedSelect
                  name="full-name"
                  placeholder="Full Name"
                  value={this.props.full_name}
                  onChange={(e) => this.props.onFullNameChange(e)}
                  searchable
                  clearable={false}
                  simpleValue
                  options={arrayOfName}
                  onInputChange={this.updateQuery}
                  noResultsText=""
              />*/}
              { !(this.props.passenger_type == "adults") &&
              <div>
                <Dropdown color="link" size="lg" header={this.state.day} items={dayArr}
                          onChange={this.onDayChange}/>
                <Dropdown color="link" size="lg" header={this.state.month} items={monthArr}
                          onChange={this.onMonthChange}/>
                <Dropdown color="link" size="lg" header={this.state.year} items={yearArr}
                          onChange={this.onYearChange}/>
              </div>
              }
            </Form>
          </div>
          }
        </div>
    );
  }
}
