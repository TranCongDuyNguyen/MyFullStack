import React, { Component } from 'react'
import {
    Container,
    Row,
    Col
} from "reactstrap";
import classNames from "classnames";

import TorqueDC from '../charts/TorqueDC';
import CurrentDC from '../charts/CurrentDC';
import DriveTempDC from '../charts/DriveTempDC';
import MotorTempDC from '../charts/MotorTempDC';
import PowerDC from '../charts/PowerDC';
import CurrentTC from '../charts/CurrentTC';
import TorqueTC from '../charts/TorqueTC';
import "../CSS/MonitorPageStyle.css";

export default class MonitorPage extends Component {
    state = {
        isHideTor: false,
        isHideCur: false,
        isHideMotorT: false,
        isHideDriveT: false,
        isHidePower: false
    }
    onDeleteCur = () => {
        if (this.state.isHideCur) {
            this.setState({
                isHideCur: !this.state.isHideCur
            })
        }
    }
    onAddCur = () => {
        if (!this.state.isHideCur) {
            this.setState({
                isHideCur: !this.state.isHideCur
            })
        }
    }
    onDeleteTor = () => {
        if (this.state.isHideTor) {
            this.setState({
                isHideTor: !this.state.isHideTor
            })
        }
    }
    onAddTor = () => {
        if (!this.state.isHideTor) {
            this.setState({
                isHideTor: !this.state.isHideTor
            })
        }
    }
    render() {
        let { isHideCur, isHideDriveT, isHideMotorT, isHidePower, isHideTor } = this.state;
        let curState = classNames({
            "tc-box": true,
            "hide": !isHideCur
        })
        let torState = classNames({
            "tc-box": true,
            "hide": !isHideTor
        })
        return (
            <div style={{
                background: "linear-gradient(0deg, #29323c 0%, #485563 100%)",
                padding: "1em 1em 1em 1em"
            }}>
                <Container className="motor-1-dc" >
                    <Row>
                        <Col md="6" className="leftside"></Col>
                        <Col md="6" className="rightside">
                            <Row className="current-and-torque">
                                <div className="current-box" >
                                    <CurrentDC />
                                    <div className="trend-button"
                                        onClick={this.onAddCur}>
                                        <i className="fas fa-chart-line"
                                            style={{
                                                margin: "0 auto",
                                                fontSize: "1.5em"
                                            }}
                                        ></i>
                                    </div>
                                </div>
                                <div className="torque-box">
                                    <TorqueDC />
                                    <div className="trend-button"
                                        onClick={this.onAddTor}>
                                        <i className="fas fa-chart-line"
                                            style={{
                                                margin: "0 auto",
                                                fontSize: "1.5em"
                                            }}
                                        ></i>
                                    </div>
                                </div>
                            </Row>
                            <Row className="thermal">
                                <div className="motorT-box" >
                                    <MotorTempDC />
                                </div>
                                <div className="driveT-box">
                                    <DriveTempDC />
                                </div>
                            </Row>
                            <Row className="otime-and-setting">
                                <div className="power-box" >
                                    <PowerDC />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                <Container className="motor-2-dc" >
                    <Row>
                        <Col md="6">
                            <div className={curState}>
                                <button className="exit-button"
                                    onClick={this.onDeleteCur}>&times;</button>
                                <CurrentTC />
                            </div>
                        </Col>
                        <Col md="6">
                        <div className={torState}>
                                <button className="exit-button"
                                    onClick={this.onDeleteTor}>&times;</button>
                                <TorqueTC />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
