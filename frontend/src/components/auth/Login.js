import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authAction';
import {clearErrors} from '../../actions/errorAction';
import {withRouter} from 'react-router-dom';


class Login extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        errors: {}
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            // Check for register error
            if(error.id === 'LOGIN_FAIL')
             this.setState({ errors: error.msgs })
            else 
            this.setState({ errors: {} });
        }

        //If authenticated, close modal
        if (this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            };
        };

    }


    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        //Create user obj
        const {  email, password } = this.state;
        const newUser = {  email, password };
        //Attempt to log gin
        this.props.login(newUser);
    }

    render() {
        return <div>
            <NavLink onClick={this.toggle} href="#">
                Log In
            </NavLink>

            <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup> {/*replace for <div> instead*/}
                               
                                <Label for="email">Email</Label>
                                <Input  
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="Your email"
                                        className = "mb-1"
                                        onChange={this.onChange}>
                                </Input>

                                { this.state.errors.email  ? <FormText color="danger"
                                                                    className ="mb-1 ml-1">
                                                                    <strong>{ this.state.errors.email }</strong>
                                                            </FormText> : null}   

                                <Label for="password">Password</Label>
                                <Input  
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Your password"
                                        className = "mb-1"
                                        onChange={this.onChange}>
                                </Input>
                                
                                { this.state.errors.password  ? <FormText color="danger"
                                                                    className ="mb-1 ml-1">
                                                                    <strong>{ this.state.errors.password }</strong>
                                                            </FormText> : null}                                   
                                <Button
                                        color="dark"
                                        style={{marginTop: '2rem'}}
                                        block>
                                    Log in
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
            </Modal>

        </div>
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool, //can be null so not required
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect( mapStateToProps, {login, clearErrors} )(Login);