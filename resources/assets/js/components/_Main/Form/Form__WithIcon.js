import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Form__WithIcon extends Component{

  static propTypes = {
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    array_of_value: PropTypes.array,
    dark: PropTypes.bool,
    inactive: PropTypes.bool,
    select: PropTypes.bool,
    date: PropTypes.bool,
    type: PropTypes.string
  }

  render(){
    let formtype = (<input type={this.props.type} className="form-control wlps-form-control" placeholder={this.props.placeholder} value={this.props.value} />);
    let iconclass = "material-icons ";
    if (this.props.select){
      formtype = (<select className="form-control wlps-form-control">
        {this.props.array_of_value.map((value, index) => {
          return(
            <option key={index}>{value}</option>
          );
        })}
      </select>);
    }

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
