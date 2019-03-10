import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container} from 'reactstrap';

    export default class TopNavBar extends Component {
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
              return <div>
                <Navbar color="dark" light expand="md" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">reactstrap</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
                </div>
          }
    }