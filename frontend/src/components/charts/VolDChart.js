import React, { Component } from 'react'
import {  RadialBarChart,
  RadialBar } from 'recharts';
import io from "socket.io-client";

import '../CSS/Management.DCStyle.css';

const socket = io('http://localhost:5000');

export default class VolDChart extends Component {
    state = {
        data: [
            {
            "name": "Voltage",
            "vol": 50,
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
    const {data} = this.state;
    return (
      <div>
        <div className="text">{data[0].vol.toString().slice(0,4)}%</div>
        <RadialBarChart height={230}
                          width={230}
                          innerRadius="50%" 
                          outerRadius="80%"
                          startAngle={360} 
                          endAngle={0}
                          data = {data}
                          barSize = {120}
                          barCategoryGap = {1}
          >
            <RadialBar minAngle={15} 
                      clockWise={true} 
                      dataKey={"refKey"}/>
            <RadialBar minAngle={15} 
                      clockWise={true} 
                      dataKey={"vol"}
                      />       
          </RadialBarChart>
      </div>
    )
  }

  componentDidMount() {
    socket.emit("subscribeMotorData"); // get cycled-data from server
    socket.on("apiMotorData", function (motorObj) {
        this.newData[0].vol = motorObj.vol;
        this.setState((state) => {
            return {
                data: state.data.slice()
            }
        });
        this.setState((state) => {
            return {
                data: this.newData
            }
        });
    }.bind(this));
    console.log(this.state.data[0].vol);
};

componentWillUnmount() {
    socket.disconnect();
};
  
}
