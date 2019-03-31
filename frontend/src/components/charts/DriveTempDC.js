import React, { Component } from 'react'
import io from "socket.io-client";

import DoughnutChart from './DoughnutChart';

const socket = io('http://localhost:5000');

export default class DriveTempDC extends Component {
    state = {
        data: [
            {
                "name": "Voltage",
                "vol": 100,
                "fill": '#ffc658'
            },
            {
                "name": "Ref",
                "refKey": 100,
                "fill": '#0000  '
            }
        ]
    }
    newData = JSON.parse(JSON.stringify(this.state.data)); //deep clone

    render() {
        const { data } = this.state;
        return (
            <div>
                <DoughnutChart data={data.concat([])} dataKey="vol"></DoughnutChart>
            </div>
        )
    }

    componentDidMount() {
        socket.emit("subscribeMotorData"); // get cycled-data from server
        socket.on("apiTData", function (motorObj) {
            this.newData[0].vol = motorObj.vol;
            this.setState((state) => {
                return {
                    data: this.newData
                }
            });
        }.bind(this));
    };

    componentWillUnmount() {
        socket.disconnect();
    };

}
