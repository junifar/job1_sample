import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Form__Autocomplete extends Component{

  static propTypes = {
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    dark: PropTypes.bool,
    inactive: PropTypes.bool
  }

  constructor(){
    super();
    this.state = {
      shown: false,
      list_show: [],
      value: ''
    };
  }

  onValueChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  render(){
    let formtype = (<input type="text" className="form-control wlps-form-control" placeholder={this.props.placeholder} value={this.state.value} onChange={this.onValueChange}/>);
    let iconclass = "material-icons ";
    if (this.props.dark){
      iconclass += "md-dark "
    }
    if (this.props.icon){
      iconclass += "md-inactive "
    }
    return(
      <div className="input-group">
        <div className="input-group-prepend">
          <i className={iconclass}>{this.props.icon}</i>
        </div>
        {formtype}
      </div>
    );
  }
}
