import React, { Component } from 'react';
import axios from "axios";
import { Alert, Form, Input, Button } from 'reactstrap';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            newKeys: {
                name: "",
                age: ""
            },
            users: {
                name: "",
                age: ""
            }
        }
        this.onChange = this.onChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    onKeyUp(event){
        let { newKeys, users } = this.state;
        let text = event.target.value;
        if (event.keyCode === 13){
            text = text.trim();
            if(!text){
                return; 
            }
            this.setState({
                newKeys: {
                    ...newKeys,
                    [event.target.name]: ""
                },
                users: {
                    ...users,
                    [event.target.name]: text
                }
            })
        }
    }

    onChange(event){
        this.setState({
            newKeys:{
                ...this.state.newKeys,
                [event.target.name]: event.target.value
            }
        })
    }

    render(){
        let { newKeys, users } = this.state; 
        return <div>
            <Form>
                <Input type = "text" 
                    placeholder = "Type something"
                    name = "name"
                    onKeyUp = {this.onKeyUp} 
                    onChange = {this.onChange}
                    value = {newKeys.name}>
                </Input>
                <Input type = "text" 
                    placeholder = "Type something"
                    name = "age"
                    onKeyUp = {this.onKeyUp} 
                    onChange = {this.onChange}
                    value = {newKeys.age}>
                </Input>
                <Button>Submit</Button>
            </Form>
             
        </div>
    }
}