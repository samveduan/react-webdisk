import React, { Component } from 'react'
import { Statistic, Row, Col, Card, Table, Radio, Button, Space, Menu, Dropdown, Progress, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './standard-list.less'

const { Search } = Input;

export default class standardList extends Component {
    state = {
        tableData: []
    }

    getMenu = () => {
        return (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        编辑
                </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                        删除
                </a>
                </Menu.Item>
            </Menu>
        )
    }

    getColumns = () => {
        return [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: '所有人',
                dataIndex: 'owner',
                key: 'owner',
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time',
            },
            {
                title: '进度',
                key: 'process',
                dataIndex: 'process',
                render: process => Number(process) <= 60 ? <Progress percent={process} status="active" /> : <Progress percent={process} status="exception" />
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Button type="link" size='small'>编辑</Button>
                        <Dropdown overlay={this.menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                更多 <DownOutlined />
                            </a>
                        </Dropdown>
                    </Space>
                ),
            },
        ];
    }

    getTableData = () => {
        return [
            {
                key: '1',
                name: 'John Brown',
                owner: '付小小',
                start_time: '2020-09-18 14:37',
                process: 20,
            },
            {
                key: '2',
                name: 'Jim Green',
                owner: '曲丽丽',
                start_time: '2020-09-18 12:37',
                process: 76,
            },
            {
                key: '3',
                name: 'Joe Black',
                owner: '林东东',
                start_time: '2020-09-18 12:37',
                process: 81,
            },
        ];
    }

    componentWillMount() {
        this.menu = this.getMenu();
        this.tableColumns = this.getColumns();
    }

    componentDidMount() {
        this.setState({
            tableData: this.getTableData()
        })
    }

    render() {
        return (
            <div>
                <Row className="statistic">
                    <Col span={8}>
                        <Statistic title="我的待办" value={'8个任务'} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="本周任务平均处理时间" value={'32分钟'} precision={2} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="本周完成任务数" value={'24个任务'} precision={2} />
                    </Col>
                </Row>

                <Card title="基本列表"
                    extra={<><Radio.Group defaultValue="a">
                        <Radio.Button value="a">全部</Radio.Button>
                        <Radio.Button value="b">进行中</Radio.Button>
                        <Radio.Button value="c">等待中</Radio.Button>
                    </Radio.Group>
                        <Search
                            placeholder="请输入"
                            onSearch={value => console.log(value)}
                            style={{ marginLeft: 15, width: 200 }}
                        /></>} style={{ width: '100%' }}
                >
                    <Table columns={this.tableColumns} dataSource={this.state.tableData} />
                </Card>
            </div>
        )
    }
}
