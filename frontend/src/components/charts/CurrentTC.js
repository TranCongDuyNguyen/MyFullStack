import React, { Component } from 'react'
import io from "socket.io-client";

import TrendChart from './TrendChart';

export default class MotorAreaChart extends Component {
    state = {
        data: [{
            time: 0,
            amp: 0
        }]
    }

    render() {
        return (
            <div>
                <TrendChart data={this.state.data}
                    dataKey="amp"
                    yAxisName="Current (A)"
                    customColor="#45F0DF"
                    colorId="currentTC"></TrendChart>
            </div>
        )
    }

    componentDidMount() {
        this.socket = io("http://localhost:5000", {transports: ['websocket']});
        this.socket.on("apiAmpere", function (ampereBuffer) {
            console.log(ampereBuffer);
            this.setState((state) => {
                return {
                    data: ampereBuffer
                }
            });
        }.bind(this));
    }

    componentWillUnmount() {
        this.socket.disconnect();
        this.socket.on("connect_error", function(error) {
            console.log(error);
            this.socket.disconnect();
        })
    };
}
