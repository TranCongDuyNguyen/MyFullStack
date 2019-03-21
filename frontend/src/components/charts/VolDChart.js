import React, { Component } from 'react'
import {  RadialBarChart,
  RadialBar } from 'recharts';

import '../CSS/Management.DCStyle.css';


export default class VolDChart extends Component {
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
    render() {
    return (
      <div>
        <RadialBarChart height={230}
                          width={230}
                          innerRadius="50%" 
                          outerRadius="80%"
                          startAngle={360} 
                          endAngle={0}
                          data = {this.state.data}
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
}
