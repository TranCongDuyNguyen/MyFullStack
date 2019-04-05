import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';

import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import Login from './auth/Login';
import './CSS/NavBarStyle.css';
import TrendIcon from '../images/trending.svg';

class TopNavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLink = (
      <>
        <NavItem>
          <span className="navbar-text text-white align-center">
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem className="ml-3">
          <Logout />
        </NavItem>
      </>
    )

    const guestLink = (
      <>
        <NavItem>
          <Login />
        </NavItem>
        <NavItem>
          <RegisterModal />
        </NavItem>
      </>
    )

    return <div>
      <Navbar expand="md" className="navbar navbar-expand-md navbar-dark bg-dark">
        <Container >


          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="mr-auto mb-auto">
              <NavbarBrand className="nav-brand mr-auto"
                style={{
                  color: "#FFF", paddingTop: "0.5em",
                  left: "2em", top: "0em",
                  position: "absolute"
                }}>
                <svg width="60" height="60">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(2,170,176,1)" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="rgba(0,205,172,1)" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <circle cx="30" cy="30" r="30" fill="url(#grad1)" >

                  </circle>
                  <text fill="#FCFCFC" x="50%" y="60%" textAnchor="middle" stroke="#ffd166"
                    style={{ fontSize: "1.2rem" }}>SCADA</text>
                </svg>

              </NavbarBrand>
              <NavItem style={{ margin: "auto 0" }}>
                <NavLink href="/" style={{ color: "#FFF" }}>
                  <i className="fas fa-home" style={{ margin: "0 auto", fontSize: "1.5em" }}></i>
                  Home
                </NavLink>
              </NavItem>
              <NavItem style={{ margin: "auto 0" }}>
                <NavLink href="/monitor" style={{ color: "#FFF", paddingLeft: "0" }}>
                  <img src={TrendIcon} alt=""></img>
                  Monitor
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>

            <UncontrolledDropdown nav-brand="true" inNavbar className="col-md-1">
              <DropdownToggle caret>
                Options
                          </DropdownToggle>
              <DropdownMenu left="true">
                <DropdownItem tag="a" href="/itemlist" active>
                  Item
                            </DropdownItem>
                <DropdownItem tag="a" href="/management" active>
                  Management
                            </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                            </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

          </Collapse>



        </Container>
      </Navbar>
    </div>
  }
}

TopNavBar.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TopNavBar)