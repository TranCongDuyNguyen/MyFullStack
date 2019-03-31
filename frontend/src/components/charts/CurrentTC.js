import React, { Component } from 'react'
import io from "socket.io-client";

import TrendChart from './TrendChart';

const socket = io('http://localhost:5000');

export default class MotorAreaChart extends Component {
    state = {
        data: [{
            time: 0,
            ampere: 0
        }]
    }

    render() {
        return (
            <div>
                <TrendChart data={this.state.data}
                    dataKey="ampere"
                    yAxisName="Current (A)"
                    customColor="#FF9F1C"
                    colorId="current"></TrendChart>
            </div>
        )
    }

    componentDidMount() {
        socket.on("apiAmpere", function (ampereBuffer) {
            console.log(ampereBuffer);
            this.setState((state) => {
                return {
                    data: ampereBuffer
                }
            });
        }.bind(this));
    }

    componentWillUnmount() {
        socket.disconnect();
    };
}
