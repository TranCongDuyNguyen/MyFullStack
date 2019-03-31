import React, { Component } from 'react'
import io from "socket.io-client";

import TrendChart from './TrendChart';

const socket = io('http://localhost:5000');

export default class MotorAreaChart extends Component {
  state = {
    data: [{
      time: 0,
      torque: 0
    }]
  }

  render() {
    return (
      <div>
        <TrendChart data={this.state.data}
          dataKey="torque"
          yAxisName="Torque (N/m)"
          customColor="#8884d8"
          colorId="torque"></TrendChart>
      </div>
    )
  }

  componentDidMount() {
    socket.on("apiTorque", function (torqueBuffer) {

      this.setState((state) => {
        return {
          data: torqueBuffer
        }
      });
    }.bind(this));
  }

  componentWillUnmount() {
    socket.disconnect();
  };
}
