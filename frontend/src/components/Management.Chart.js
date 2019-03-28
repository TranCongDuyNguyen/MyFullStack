import React, { Component } from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import {
  ResponsiveContainer
} from 'recharts';

import './CSS/Management.ChartStyle.css';
import VolDChart from './charts/VolDChart';
import AmpDChart from './charts/AmpDChart';
import MotorAreaChart from './charts/MotorAreaChart';

export default class ManagementDoughChart extends Component {

  render() {
    return (
      <div>
        <Container className="parameter-display">
          <Row style={{ width: "100%" }}>
            <Col  md="6">
            <div className="current-box"
                style={{ marginBottom: "2rem" }}
              >
                <AmpDChart/>
              </div>
            </Col>
            <Col md="6">
              <div className="voltage-box" >
                <VolDChart/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
            <ResponsiveContainer className = "motor-area-chart">
              <MotorAreaChart />
            </ResponsiveContainer>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}
