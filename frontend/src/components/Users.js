import React, { Component } from 'react';
import axios from "axios";

export default class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        axios.get('/api/users')
        .then((res) => {
            this.setState({
                users: res.data
            }, () => console.log(this.state.users))
        })
    }

    render(){
        let { users } = this.state;
        return <div>
            {users.map((user) => (<div>{user.name}</div>))}
        </div>
    }

}