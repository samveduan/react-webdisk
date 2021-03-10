import React, { Component } from 'react'
import { Row, Col, Card, Tabs } from 'antd'

const { TabPane } = Tabs;

export default class usr extends Component {
    callback = key => {
        console.log(key);
    }

    render() {
        return (
            <div>
                <Row gutter={24}>
                    <Col span={4}>
                        table
                    </Col>
                    <Col span={20}>
                        <Card>
                            <Tabs defaultActiveKey="1" onChange={() => this.callback()}>
                                <TabPane tab="文章" key="1">
                                    Content of Tab Pane 1
                                </TabPane>
                                <TabPane tab="应用" key="2">
                                    Content of Tab Pane 2
                                </TabPane>
                                <TabPane tab="项目" key="3">
                                    Content of Tab Pane 3
                                </TabPane>
                            </Tabs>

                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}