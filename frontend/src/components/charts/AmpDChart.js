import React, { Component } from 'react'
import {connect} from 'react-redux';
import {  RadialBarChart,
  RadialBar } from 'recharts';
import PropTypes from 'prop-types';

import '../CSS/Management.DCStyle.css';

import {getMotor} from '../../actions/motorAction';

class AmpDChart extends Component {
    state = {
        data: [
            {
            "name": "Current",
            "amp": 50,
            "fill": '#d0ed57'
            },
            {
            "name": "Ref",
            "refKey": 100,
            "fill": '#0000  '
            }
        ]
    }
    componentDidMount(){
      let i = 0;
      this.props.getMotor();
      console.log(i++);
    }

    render() {
      const { motors } = this.props.motor;
      console.log(this.props.motor);
      //console.log(motors);
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
                      dataKey={"amp"}
                      />
             
          </RadialBarChart>
      </div>
    )
  }
}

AmpDChart.propTypes = {

}

const mapStateToProps = state => {
  return {motor: state.motor};
}
    


export default connect(mapStateToProps, {getMotor})(AmpDChart);