import React, { Component } from 'react'

import './CSS/LedStyle.css';

export default class Led extends Component {
    render() {
        const {customColor, customOfShadow, customShadowText} = this.props;
        return (
            <div className="container-box">
                <div className="led-box">
                    <div style={{
                        margin: "0 auto",
                        width: "2em",
                        height: "2em",
                        backgroundColor: `${customColor}`,
                        borderRadius: "50%",
                        boxShadow: `${customOfShadow}`
                    }}></div>
                    <br/>
                    <p style={{boxShadow: `${customShadowText}`}}>{this.props.children}</p>
                </div>
            </div >
        )
    }
}
