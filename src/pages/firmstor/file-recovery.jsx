import React, { Component } from 'react'
import { Card, Button, Spin, Table, Pagination } from 'antd'
import { Modal, Form, Input, InputNumber, Select, Checkbox, Radio } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import axios from 'axios'
import CheckboxGroup from 'antd/lib/checkbox/Group'

const editModalFormLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}

const fileRecoveryModalFormLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 19
    }
}

export default class fileRecovery extends Component {
    state = {
        selectedRowKeys: [], // 表格选择项Keys
        selectedRows: [], // 表格选择项Rows
        tableColumns: [],
        tableData: [],
        total: 0,
        tableLoading: false,
        editModalVisible: false, // 编辑管理员 modal
        editModalFormInitValues: {}, // 编辑管理员 modal 表单初始值
        fileRecoveryModalVisible: false, // 远程文件恢复 modal
        gateWays: ['eth0', 'eth1', 'eth2', 'eth3', 'eth4', 'eth5']
    }

    /**
     * 表格
     */
    getTableColumns = () => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                width: 60,
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
            {
                title: '编辑',
                dataIndex: 'edit',
                width: 80,
                render: (text, record, index) => {
                    return (<Button type="primary" ghost icon={<EditOutlined />} size="small" onClick={() => this.onEditAdministrator(text, record, index)} style={{ border: 0 }}></Button>)
                }
            }
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

    //  分页用
    onChange = (pageNumber, pageSize) => {
        this.pageNum = pageNumber;

        let thisCurrent = Number(pageNumber) === 0 ? 1 : pageNumber;
        this.getTableData(thisCurrent, pageSize);
    }

    onEditAdministrator = (text, record, index) => {
        this.setState({
            editModalVisible: true
        });

        this.setState({
            editModalFormInitValues: {
                editModalFormUserName: 'admin01',
                editModalFormAccountName: 'admin01',
                editModalFormUserSpace: 1,
                editModalFormServer: 'mmj',
                editModalFormIsShare: 'no',
                editModalFormDescribe: record.content
            }
        })
    }

    /**
    * 编辑modal
    */

    editModalForm = React.createRef();

    editModalHandleOk = () => {
        this.editModalForm.current.validateFields()
            .then(values => {
                this.editModalForm.current.resetFields();
                this.setState({
                    editModalVisible: false
                })
                console.log("表单元素值：");
                console.log(values);
            })
            .catch(error => {
                console.log(error);
            })
    }

    editModalHandCancel = () => {
        this.setState({
            editModalVisible: false
        });
    }

    /**
    * 远程文件恢复modal
    */
    fileRecoveryModalForm = React.createRef();

    fileRecoveryModalHandleOk = () => {
        this.fileRecoveryModalForm.current.validateFields()
            .then(values => {
                this.fileRecoveryModalForm.current.resetFields();
                this.setState({
                    fileRecoveryModalVisible: false
                })
                console.log("表单元素值：");
                console.log(values);
            })
            .catch(error => {
                console.log(error);
            })
    }

    fileRecoveryModalHandCancel = () => {
        this.setState({
            fileRecoveryModalVisible: false
        });
    }

    onFileRecovery = () => {
        this.setState({
            fileRecoveryModalVisible: true
        })
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
                <Card title="保险箱文件恢复" extra={<Button type="primary" ghost size="small" onClick={() => this.onFileRecovery()}>远程文件恢复</Button>}>
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
                </Card>

                <Modal
                    title="编辑"
                    visible={this.state.editModalVisible}
                    width={600}
                    onOk={this.editModalHandleOk}
                    onCancel={this.editModalHandCancel}
                    okText="确认"
                    cancelText="取消"
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <Form
                        {...editModalFormLayout}
                        ref={this.editModalForm}
                        labelAlign="left"
                        initialValues={this.state.editModalFormInitValues}
                    >
                        <Form.Item
                            label="用户名"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="editModalFormUserName"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "不能为空"
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_()（）\u4e00-\u9fa5]{1,32}$/,
                                        message: "为1至32位汉字、字母、数字、下划线或中英文括号"
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="为1至32位汉字、字母、数字、下划线或中英文括号"
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(25% - 8px)' }}
                            >
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="姓名"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="editModalFormAccountName"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "不能为空"
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_()（）\u4e00-\u9fa5]{1,32}$/,
                                        message: "为1至32位汉字、字母、数字、下划线或中英文括号"
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="为1至32位汉字、字母、数字、下划线或中英文括号"
                                    maxLength={32}
                                />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="个人空间配额"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="editModalFormUserSpace"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "不能为空"
                                    },
                                    {
                                        pattern: /^(([1-9]\d?)|(100))$/,
                                        message: "为1-100之间整数"
                                    },
                                ]}>
                                <InputNumber
                                    placeholder="1-100之间整数"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(25% - 8px)' }}
                            >
                                G
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="editModalFormPassword"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "不能为空"
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_]{6,32}$/,
                                        message: "为6至32位字母、数字或者下划线"
                                    },
                                ]}>
                                <Input.Password
                                    placeholder="为6至32位字母、数字或者下划线"
                                    maxLength={32}
                                />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="存储服务器"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="editModalFormServer"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "不能为空"
                                    },
                                ]}
                            >
                                <Select placeholder="请选择">
                                    <Select.Option value="mmj">MMJ</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="是否可中心共享"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="editModalFormIsShare"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "不能为空"
                                    },
                                ]}
                            >
                                <Radio.Group >
                                    <Radio value="yes">是</Radio>
                                    <Radio value="no">否</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="描述" style={{ marginBottom: 0 }}>
                            <Form.Item name="editModalFormDescribe" style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}>
                                <Input.TextArea rows={4} maxLength={128}></Input.TextArea >
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="远程文件恢复"
                    visible={this.state.fileRecoveryModalVisible}
                    width={600}
                    onOk={this.fileRecoveryModalHandleOk}
                    onCancel={this.fileRecoveryModalHandCancel}
                    okText="确认"
                    cancelText="取消"
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <Form
                        {...fileRecoveryModalFormLayout}
                        ref={this.fileRecoveryModalForm}
                        labelAlign="left"
                    >
                        <Form.Item
                            style={{ marginBottom: 5, color: '#999999' }}
                        >
                            配置日志记录的级别，高于设定级别的日志将不会记录。
                        </Form.Item>
                        <Form.Item
                            label="日志级别"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="fileRecoveryModalFormLevel"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "不能为空"
                                    }
                                ]}
                            >
                                <Select
                                    placeholder="请选择"
                                >
                                    <Select.Option value="all">所有</Select.Option>
                                    <Select.Option value="notice">通知</Select.Option>
                                    <Select.Option value="info">信息</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(25% - 8px)' }}
                            >
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: 5, color: '#999999' }}
                        >
                            配置日志的自动转储条件，系统将根据转储策略进行日志转储。
                        </Form.Item>
                        <Form.Item
                            label="转储条件"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="fileRecoveryModalFormCondition"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "不能为空"
                                    }
                                ]}
                            >
                                <Select
                                    placeholder="请选择"
                                >
                                    <Select.Option value="days">转存天数</Select.Option>
                                    <Select.Option value="logs">日志条数</Select.Option>
                                    <Select.Option value="size">空间大小</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="可选网关"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="fileRecoveryModalFormGateways"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "不能为空"
                                    }
                                ]}
                            >
                                <CheckboxGroup>
                                    {
                                        this.state.gateWays.map((item, index) => (<Checkbox value={item} key={index}>{item}</Checkbox>))
                                    }
                                </CheckboxGroup>
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
