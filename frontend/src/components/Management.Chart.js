import React, { Component } from 'react'
import {
    Container,
    Row,
    Col
} from 'reactstrap';

import './CSS/Management.ChartStyle.css';
import VolDChart from './charts/VolDChart';
import AmpDChart from './charts/AmpDChart';

export default class ManagementDoughChart extends Component {
 
  render() {
    return (
      <div>
        <Container className="parameter-display">
          <Row style={{width: "100%"}}>
            <Col md="9">
            
            </Col>
            <Col md="3">
              <button className = "current-box gradient-box" style={{paddingBottom: "6rem" ,marginBottom: "2rem"}}>
                  <VolDChart/>
                  <div className="text">15%</div>
                  
                
              </button>
              <button className = "voltage-box gradient-box" style={{paddingBottom: "6rem"}}>
                  <AmpDChart/>
                  <div className="text">15%</div>
                
              </button>
            </Col>
            
          </Row>
        </Container>
        
      </div>
    )
  }
}
