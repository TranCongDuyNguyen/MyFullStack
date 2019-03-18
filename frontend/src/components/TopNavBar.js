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
    NavLink,
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
                    <span className = "navbar-text mr-3 text-white">
                      <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                  </NavItem>
                  <NavItem >
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
                <Navbar  expand="md" className="mb-5 bg-dark">
                    <Container >
                        <NavbarBrand href="/itemlist" className ="nav-brand">Hello</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                              { isAuthenticated ? authLink : guestLink}
                            </Nav>
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