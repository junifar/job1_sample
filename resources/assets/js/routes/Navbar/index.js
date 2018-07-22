import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './Login';
import { Navbar as RNavbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse } from 'reactstrap'

export default class Navbar extends Component {

  constructor(props){
    super(props);

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  refreshNavbar = (user, token) => {
    this.props.onLoginState(user, token);
  }

  render(){
    console.log("navbar user :"+this.props.user);
    return(
      <div>
        <RNavbar className="wlps-navbar" fixed="top" expand="md">
            <Link className='navbar-brand' to='/'><img className="navbar-brand-icon" src="/images/icon.png" style={{height: "78px", marginTop: "-32px"}}/></Link>
            <NavbarToggler onClick={this.toggle}><i className="material-icons">menu</i></NavbarToggler>

            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    { (this.props.user) &&
                    <NavItem>
                        <Link to='/user/booking' className='nav-link'>My Booking</Link>
                    </NavItem>
                    }
                    <NavItem>
                        <NavLink href="/Service">Help</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            ID
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                ID (Bahasa Indonesia)
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                EN (English)
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            IDR
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                Indonesia Rupiah
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                US Dollar
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>

                        { !(this.props.user) &&

                        <Login openModal={this.props.openModal} refreshNavbar={this.refreshNavbar}/>
                        }
                        { (this.props.user) &&
                        <Link to='/user/profile' className='nav-link'>
                            {this.props.user.name}
                            <div className="my-logindropdown-label-icon"><i className="material-icons">arrow_drop_down</i></div>
                        </Link>
                        }

                    </NavItem>
                </Nav>
            </Collapse>
        </RNavbar>
      </div>
    )
  }
}

