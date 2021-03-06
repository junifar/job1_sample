import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dropdown as RDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class DropdownSearch extends Component{

  static propTypes = {
    header: PropTypes.string,
    items: PropTypes.array,
    size: PropTypes.string,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      value: this.props.header
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render(){
    return(
      <RDropdown className="wlps-dropdown-search" group isOpen={this.state.dropdownOpen} size={this.props.size} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.props.header}
        </DropdownToggle>
        <DropdownMenu>
          {
            this.props.items.map((item, index) => {
              return(
                <DropdownItem key={index} onClick={this.props.onChange}>{item}</DropdownItem>
              );
            })
          }
        </DropdownMenu>
      </RDropdown>
    );
  }


}
