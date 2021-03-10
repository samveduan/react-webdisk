import React, { Component } from 'react'
import { Result, Button } from 'antd';
import { Steps } from 'antd';
import { Row, Col } from 'antd';
import { Descriptions } from 'antd';
import './success.less'

const { Step } = Steps;

export default class Success extends Component {
    render() {
        return (
            <div>
                <Result
                    status="success"
                    title="提交成功"
                    subTitle="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
                    className="result-container"
                    extra={[
                        <Button type="primary" key="console">
                            返回列表
                        </Button>,
                        <Button key="buy">查看项目</Button>
                    ]}
                />

                <Row className="result-row">
                    <Col span={24} style={{ padding: 20}}>
                        <Descriptions title="项目名称" style={{paddingBottom: 15}}>
                            <Descriptions.Item label="项目 ID">23421</Descriptions.Item>
                            <Descriptions.Item label="负责人">曲丽丽</Descriptions.Item>
                            <Descriptions.Item label="生效时间">2016-12-12 ~ 2017-12-12</Descriptions.Item>
                        </Descriptions>
                        <Steps progressDot current={1}>
                            <Step title="Finished" description="This is a description." />
                            <Step title="In Progress" description="This is a description." />
                            <Step title="Waiting" description="This is a description." />
                        </Steps></Col>
                </Row>


            </div>
        )
    }
}
