import React, { Component } from 'react'
import { Row, Col, Card, Descriptions, Progress } from 'antd'

export default class baseinfo extends Component {
    render() {
        return (
            <Row gutter={24}>
                <Col span={12}>
                    <Card title="系统信息">
                        <Descriptions column={{ xs: 1, sm: 1, md: 1 }} bordered>
                            <Descriptions.Item label="主机名称">KPF001</Descriptions.Item>
                            <Descriptions.Item label="硬件版本号">v2.0</Descriptions.Item>
                            <Descriptions.Item label="软件发行号">v3.0.2.1</Descriptions.Item>
                            <Descriptions.Item label="研制单位">中央军委办公厅第五十一研究所</Descriptions.Item>
                            <Descriptions.Item label="产品名称">MZS006B高速网络存储密码机</Descriptions.Item>
                            <Descriptions.Item label="系统时间">2天7小时59分33秒</Descriptions.Item>
                            <Descriptions.Item label="运行时间">2天7小时59分33秒</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="分区信息">
                        <Descriptions column={{ xs: 1, sm: 1, md: 1 }} bordered>
                            <Descriptions.Item label="系统分区"> <Progress percent={30} /></Descriptions.Item>
                            <Descriptions.Item label="配置分区"><Progress percent={82} strokeColor="#FF0000" /></Descriptions.Item>
                            <Descriptions.Item label="日志分区"><Progress percent={70} strokeColor="#ffbc3a" /></Descriptions.Item>
                            <Descriptions.Item label="元数据区"><Progress percent={100} /></Descriptions.Item>
                            <Descriptions.Item label="备份分区"><Progress percent={70} status="exception" /></Descriptions.Item>
                            <Descriptions.Item label="数据分区"><Progress percent={30} /></Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        )
    }
}
