import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    RadialBarChart,
    RadialBar
} from 'recharts';
import PropTypes from 'prop-types';

import '../CSS/Management.DCStyle.css';

import { getMotor } from '../../actions/motorAction';

class AmpDChart extends Component {

    state = {
        data: [
            {
                name: "Current",
                amp: 0,
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

    componentDidMount() {
        this.props.getMotor();
        this.props.socket.emit("subscribeTimer", 3000); // get cycled-data from server
    }

    componentDidUpdate() {
        
        this.props.socket.on("dataFromApi", motorObj => {
            this.newData[0].amp = motorObj.amp;
            console.log(motorObj);
            this.setState((state, props) => ({
                data: this.newData
            }))
        } )
       
    }

    componentWillUnmount() {
        this.props.socket.disconnect();
    }

    //update amp from DB
    // componentWillReceiveProps(nextProps) {
    //     const {motor} = nextProps
    //     if ( (motor !== this.props.motor) && (motor.motors.length !==0) ) {
    //         this.newData[0].amp = motor.motors[0].amp
    //         this.setState((state, props) => ({
    //             data: this.newData
    //         }))
    //     }
    // }



    render() {

        return (
            <div>
                <RadialBarChart
                    ref={(ref) => this.chart = ref}
                    height={230}
                    width={230}
                    innerRadius="50%"
                    outerRadius="80%"
                    startAngle={360}
                    endAngle={0}
                    data={this.state.data}
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

                </RadialBarChart>
            </div>
        )
    }
}

AmpDChart.propTypes = {
    getMotor: PropTypes.func.isRequired,
    motor: PropTypes.object.isRequired 
}

const mapStateToProps = state => {
    return { motor: state.motor };
}



export default connect(mapStateToProps, { getMotor })(AmpDChart);