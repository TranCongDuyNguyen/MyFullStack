import React, { Component } from 'react'
import io from "socket.io-client";

import DoughnutChart from './DoughnutChart';

export default class CurrentDC extends Component {
    state = {
        data: [
            {
                name: "Power",
                power: 50
            },
            {
                name: "Ref",
                refKey: 100
            }
        ],
        flash: false
    }
    newData = JSON.parse(JSON.stringify(this.state.data)); //deep clone

    render() {
        const { data } = this.state;
        return (
            <div className="power-dc">
                <DoughnutChart data={data.concat([])}
                    dataKey="power"
                    threshold={60}
                    offset={20}
                    colorId="power"
                    startGradColor="#84fab0"
                    endGradColor="#8fd3f4"
                    theUnit = "W"
                    flash={this.state.flash}>
                </DoughnutChart>
            </div>
        )
    }

    componentDidMount() {
        this.socket = io("http://localhost:5000", { transports: ['websocket'] }).connect();
        this.socket.emit("subscribeMotorData"); // get cycled-data from server
        this.socket.on("apiDCData", function (motorObj) {
            this.newData[0].power = motorObj.power;
            this.setState((state) => {
                return {
                    data: this.newData
                }
            });
            if(motorObj.power > 80) {
                this.setState({
                    flash: !this.state.flash
                })
            }
        }.bind(this));
    };

    componentWillUnmount() {
       this.socket.disconnect();
       this.socket.on("connect_error", function(error) {
        console.log(error);
        this.socket.disconnect();
    })
    };

}
