import React, { Component } from 'react'
import { Result, Button } from 'antd';

export default class Comp403 extends Component {
    render() {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary">Back Home</Button>}
                style={{background: '#FFFFFF'}}
            />
        )
    }
}
