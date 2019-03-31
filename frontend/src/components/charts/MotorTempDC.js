import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from "socket.io-client";

import DoughnutChart from './DoughnutChart';
import { getMotor } from '../../actions/motorAction';


const socket = io('http://localhost:5000');

class MotorTempDC extends Component {

    state = {
        data: [
            {
                name: "Current",
                amp: 50,
                fill: '#d0ed57'
            },
            {
                name: "Ref",
                refKey: 100,
                fill: '#0000'
            }
        ]
    }
    newData = JSON.parse(JSON.stringify(this.state.data)); //deep clone

    render() {
        const {data} = this.state; 
        return (
            <div>
                <DoughnutChart data={data.concat([])} Tkey="amp"></DoughnutChart>
                {/* <div className="text">{data[0].amp.toString().slice(0,4)}%</div>
                <RadialBarChart
                    height={230}
                    width={230}
                    innerRadius="50%"
                    outerRadius="80%"
                    startAngle={360}
                    endAngle={0}
                    data={data}
                    barSize={120}
                    barCategoryGap={1}
                >
                    <RadialBar minAngle={15}
                        clockWise={true}
                        dataKey={"refKey"} />
                    <RadialBar minAngle={15}
                        clockWise={true}
                        dataKey={"amp"}
                    />
                    
                </RadialBarChart> */}
            </div>
        )
    }

    componentDidMount() {
        this.props.getMotor();

        socket.on("apiMotorData", function (motorObj) {
            this.newData[0].amp = motorObj.amp;
            // this.setState((state) => {
            //     return {
            //         data: state.data
            //     }
            // });
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

MotorTempDC.propTypes = {
    getMotor: PropTypes.func.isRequired,
    motor: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return { motor: state.motor };
}


export default connect(mapStateToProps, { getMotor })(MotorTempDC);