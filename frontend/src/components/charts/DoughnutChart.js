import React, { Component } from 'react'
import {
    RadialBarChart,
    RadialBar
} from 'recharts';

export default class DoughnutChart extends Component {
    render() {
        const { data, dataKey } = this.props;
        return (
            <div>
                <div className="text">{data[0][dataKey].toString().slice(0, 4)}%</div>
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
                        dataKey={dataKey}
                    />
                </RadialBarChart>
            </div>
        )
    }


}
