import React, { Component } from 'react'
import io from "socket.io-client";

import DoughnutChart from './DoughnutChart';

const socket = io('http://localhost:5000');

export default class DriveTempDC extends Component {
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
    newData = JSON.parse(JSON.stringify(this.state.data)); //deep clone

    render() {
        const { data } = this.state;
        return (
            <div>
                <DoughnutChart data = {data.concat([])} Tkey = "vol"></DoughnutChart>
                {/* <div className="text">{data[0].vol.toString().slice(0, 4)}%</div>
                <RadialBarChart height={230}
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
                        dataKey={"vol"}
                    />
                </RadialBarChart> */}
            </div>
        )
    }

    componentDidMount() {
        socket.emit("subscribeMotorData"); // get cycled-data from server
        socket.on("apiMotorData", function (motorObj) {
            this.newData[0].vol = motorObj.vol;
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
