import React, { Component } from 'react'
import { Row, Col, Card, Button, Space, Spin, Table, Pagination, Modal, Form, Input, Select, Checkbox, DatePicker } from 'antd'
import { FileAddOutlined, AppstoreOutlined, SearchOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Option } = Select

const createModalFormLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}

export default class log extends Component {
    state = {
        selectedRowKeys: [], // 表格选择项Keys
        selectedRows: [], // 表格选择项Rows
        tableColumns: [],
        tableData: [],
        total: 0,
        tableLoading: false,
        createModalVisible: false, // 创建管理员 modal
        isShowAdvance: false
    }

    // 按钮组
    onCreateAdministrator = () => {
        this.setState({
            createModalVisible: true
        });
    }

    /**
     * 表格
     */
    getTableColumns = () => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                width: 30,
            },
            {
                title: '标题',
                dataIndex: 'title',
                width: 500,
            },
            {
                title: '内容',
                dataIndex: 'content'
            },
        ]
    }

    getTableData = (pageNumber, pageSize) => {
        this.setState({
            tableLoading: true
        })

        axios.get(`/article/all/?pageSize=${pageSize}&pageNumber=${pageNumber}&sortName=id&sortOrder=desc&_=1595230808893`).then((resp) => {
            let ajaxData = [];
            for (let i = 0; i < resp.data.rows.length; i++) {
                ajaxData.push({
                    key: resp.data.rows[i].id,
                    id: resp.data.rows[i].id,
                    title: resp.data.rows[i].title,
                    content: resp.data.rows[i].content
                });
            }

            this.setState({
                tableData: ajaxData,
                total: resp.data.total,
                tableLoading: false
            })

        }, (err) => {
            console.log(err);
            this.setState({
                tableLoading: false
            })
        });
    }

    onTableSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        console.log('selectedRows changed: ', selectedRows);
        this.setState({ selectedRowKeys, selectedRows });
    };

    onChange = (pageNumber, pageSize) => {
        this.pageNum = pageNumber;
        let thisCurrent = Number(pageNumber) === 0 ? 1 : pageNumber;
        this.getTableData(thisCurrent, pageSize);
    }

    /**
     * 创建modal
     */
    createModalHandCancel = () => {
        this.setState({
            createModalVisible: false
        });
    }

    // 创建modal中表单
    createModalForm = React.createRef();

    onIsShowAdvance = e => {
        this.setState({
            isShowAdvance: e.target.checked
        })
    }

    onStartTimeChange = (date, dateString) => {
        console.log(date, dateString);
    }

    onEndTimeChange = (date, dateString) => {
        console.log(date, dateString);
    }

    /**
     * 钩子函数
     */
    componentWillMount() {
        this.tableColumns = this.getTableColumns();
    }

    componentDidMount() {
        this.getTableData(1, 5);
    }

    render() {
        // 控制表格选择
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onTableSelectChange
        };

        return (
            <div>
                <Card>
                    <Row>
                        <Col span={24}>
                            <Row style={{ marginBottom: 15 }}>
                                <Col span={16}>
                                    <Space size={15}>
                                        <Button type="primary" ghost icon={<FileAddOutlined />} onClick={() => this.onCreateAdministrator()}>日志检索</Button>
                                        <Button type="primary" ghost icon={<AppstoreOutlined />}>全部</Button>
                                    </Space>
                                </Col>
                                <Col span={8}>
                                    <Input placeholder="搜索" suffix={<SearchOutlined />} />
                                </Col>
                            </Row>

                            <Spin spinning={this.state.tableLoading} tip="加载中......" size="large">
                                <Table
                                    onRow={record => {
                                        return {
                                            onClick: event => { console.log(record) }, // 点击行
                                            onDoubleClick: event => { },
                                            onContextMenu: event => { },
                                            onMouseEnter: event => { }, // 鼠标移入行
                                            onMouseLeave: event => { },
                                        };
                                    }}
                                    rowSelection={rowSelection}
                                    columns={this.tableColumns}
                                    dataSource={this.state.tableData}
                                    pagination={{
                                        current: this.pageNum,
                                        total: this.state.total,
                                        pageSizeOptions: [5, 10, 20, 50, 100],
                                        defaultPageSize: 5,
                                        showSizeChanger: true,
                                        showQuickJumper: true,
                                        showTotal: (total, range) => `共 ${total} 条`,
                                        onChange: this.onChange
                                    }}
                                    bordered
                                />
                            </Spin>

                        </Col>
                    </Row>
                </Card>

                <Modal
                    title="日志检索"
                    visible={this.state.createModalVisible}
                    width={660}
                    onOk={this.createModalHandleOk}
                    onCancel={this.createModalHandCancel}
                    okText="确认"
                    cancelText="取消"
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <Form {...createModalFormLayout} ref={this.createModalForm} labelAlign="left">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="关键字">
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item style={{ textAlign: 'right' }} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                                    <Checkbox onChange={e => this.onIsShowAdvance(e)} checked={this.state.isShowAdvance}>高级</Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="日志类型：">
                                    <Select defaultValue="所有" style={{ width: '100%' }}>
                                        <Option value="所有">所有</Option>
                                        <Option value="管理员操作">管理员操作</Option>
                                        <Option value="用户操作" disabled>
                                            用户操作
                                        </Option>
                                        <Option value="系统日志">系统日志</Option>
                                        <Option value="其它日志">其它日志</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="操作结果">
                                    <Select defaultValue="所有" style={{ width: '100%' }}>
                                        <Option value="所有">所有</Option>
                                        <Option value="成功">成功</Option>
                                        <Option value="失败">失败</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="操作者">
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="操作对象">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="开始时间">
                                    <DatePicker onChange={() => this.onStartTimeChange()} style={{ width: '100%' }} placeholder="开始时间" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="结束时间">
                                    <DatePicker onChange={() => this.onEndTimeChange()} style={{ width: '100%' }} placeholder="结束时间" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24} style={this.state.isShowAdvance ? {} : { display: "none" }}>
                            <Col span={12}>
                                <Form.Item label="操作大类：">
                                    <Select defaultValue="所有" style={{ width: '100%' }}>
                                        <Option value="所有">所有</Option>
                                        <Option value="管理员操作">管理员操作</Option>
                                        <Option value="用户操作" disabled>
                                            用户操作
                                        </Option>
                                        <Option value="系统日志">系统日志</Option>
                                        <Option value="其它日志">其它日志</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="操作小类：">
                                    <Select defaultValue="所有" style={{ width: '100%' }}>
                                        <Option value="所有">所有</Option>
                                        <Option value="成功">成功</Option>
                                        <Option value="失败">失败</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}
