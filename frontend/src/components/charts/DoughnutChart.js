import React, { Component } from 'react'
import {  RadialBarChart,
          RadialBar } from 'recharts';

export default class DoughnutChart extends Component {

  render() {
    let {data} = this.props;
    return (
      <div>
     
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
                      dataKey={"dataKey"}
                      />
             
          </RadialBarChart>
        
      </div>
    )
  }
}
