import React, { Component } from 'react'
import { Result, Button } from 'antd';

export default class ResultCom extends Component {
    render() {
        return (
            <Result
                status="500"
                title="500"
                subTitle="服务器内部错误"
                extra={<Button type="primary">返回</Button>}
            />
        )
    }
}
