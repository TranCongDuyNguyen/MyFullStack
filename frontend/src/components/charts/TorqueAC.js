import React, { Component } from 'react'
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area
} from 'recharts';
import io from "socket.io-client";


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
        <AreaChart width={630} height={250} data={this.state.data}
          padding={{ top: 20, right: 0, left: 0, bottom: 0 }}
          margin={{ top: 0, right: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
         
          </defs>
          <text fill="#FFF" x={325} y={260} >Time (s)</text>
          <text fill="#FFF" x={0} y={-20} >Torque (N/m)</text>
          <XAxis dataKey="time" tick={{ stroke: 'white', fontSize: "small!important"}} />
          <YAxis tick={{ stroke: 'white' }} />

          <Tooltip offset={0} />
          <Area type="monotone" dataKey="torque" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      
        </AreaChart>
      </div>
    )
  }

  componentDidMount() {
    socket.on("apiTorque", function (dataBuffer) {
      console.log(dataBuffer);
      this.setState((state) => {
          return {
            data: dataBuffer
          }
      });
  }.bind(this));
  }

  componentWillUnmount() {
    socket.disconnect();
};
}
