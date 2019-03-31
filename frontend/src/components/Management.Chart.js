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
import DriveTempDC from './charts/DriveTempDC';
import MotorTempDC from './charts/MotorTempDC';
import MotorAreaChart from './charts/TorqueAC';

export default class ManagementDoughChart extends Component {

  render() {
    return (
      <div>
        <Container className="parameter-display">
          <Row className="radial-box" >
            <Col md={{ size: 4 }} style={{ marginLeft: "2.5rem" }}>
              <div className="drive-temp-box" >
                <DriveTempDC />
              </div>
            </Col>
            <Col md={{ size: 4 }} style={{ marginLeft: "2.5rem" }}>
              <div className="motor-temp-box"
                style={{ marginBottom: "2rem" }}
              >
                <MotorTempDC />
              </div>
            </Col>
          </Row>

          <Row style={{height: "100%", justifyContent: "center" }} > 
            <Col md="8" >
              <ResponsiveContainer className="motor-area-chart" >
                <MotorAreaChart />
              </ResponsiveContainer>
            </Col>
          </Row>

        </Container>

      </div>
    )
  }
}
