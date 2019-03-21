import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container} from 'reactstrap';

import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import Login from './auth/Login';
import './CSS/NavBarStyle.css';

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

          render(){
              const { isAuthenticated, user } = this.props.auth;

              const authLink = (
                <>
                  <NavItem>
                    <span className = "navbar-text text-white align-center">
                      <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                  </NavItem>
                  <NavItem className = "ml-3">
                    <Logout/>
                  </NavItem>
                </>
              )

              const guestLink = (
                <>
                  <NavItem>
                    <Login/>
                  </NavItem>
                  <NavItem>
                    <RegisterModal/>
                  </NavItem>
                </>
              )

              return <div>
                <Navbar  expand="md" className="navbar navbar-expand-md navbar-dark mb-5 bg-dark">
                    <Container >
                        <NavbarBrand href="/" className ="nav-brand">Home</NavbarBrand>

                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar={true}>
                            <Nav className="ml-auto" navbar>
                              { isAuthenticated ? authLink : guestLink}
                            </Nav>
                        </Collapse>

                        <UncontrolledDropdown nav-brand ="true" inNavbar className = "col-md-1">
                          <DropdownToggle caret>
                            Options
                          </DropdownToggle>
                          <DropdownMenu left="true">
                            <DropdownItem tag ="a" href ="/itemlist" active>
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