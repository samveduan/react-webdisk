import React, { Component } from 'react'
import { Card } from 'antd';

export default class card extends Component {
    render() {
        return (
            <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: "100%" }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        )
    }
}