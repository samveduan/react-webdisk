import React, { Component } from 'react'
import { Row, Col, Form, Input, Card, Button } from 'antd';
import { Tooltip, InputNumber, Table, Pagination } from 'antd';
import { Modal } from 'antd';
import { PageHeader } from 'antd';
import { Spin } from 'antd';
import { PlusOutlined, RedoOutlined, ColumnHeightOutlined, SettingOutlined, FullscreenOutlined } from '@ant-design/icons';
import axios from 'axios'
import './query-table.less'

export default class queryTable extends Component {
    state = {
        tableLoading: true,
        tableData: [],
        total: 0,
        selectedRowKeys: [], // 选择的行的key
        selectedRows: [], // 选择的行的数据
        createRuleModal_Visible: false
    }

    /**
     * 搜索表单
     */
    formRef = React.createRef()

    formRef_onFinish = () => {
        this.formRef.current.validateFields()
            .then(values => {
                console.log(values);
            })
            .catch(info => {
                console.log(info);
            })
    }

    formRef_onreSet = () => {
        this.formRef.current.resetFields();
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

    getData(pageNumber, pageSize) {
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
        });
    }

    onTableSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        console.log('selectedRows changed: ', selectedRows);
        this.setState({ selectedRowKeys, selectedRows });
    };

    onChange = (pageNumber, pageSize) => {
        this.pageNum = pageNumber;
        this.getData(pageNumber, pageSize);
    }

    /**
     * 新建规则modal
     */
    createRuleForm = React.createRef()

    createRuleForm_HandleOpen = () => {
        this.setState({
            createRuleModal_Visible: true
        })
    }

    createRuleForm_HandleOk = () => {
        this.createRuleForm.current.validateFields()
            .then(values => {
                console.log(values);
                this.setState({
                    createRuleModal_Visible: false
                })
                this.createRuleForm.current.resetFields();
            })
            .catch(error => {
                console.log(error)
            })
    }

    createRuleForm_HandleCancel = () => {
        this.createRuleForm.current.resetFields();
        this.setState({
            createRuleModal_Visible: false
        })
    }

    /**
     * 钩子函数
     */
    componentWillMount() {
        this.TableColumns = this.getTableColumns();
    }

    componentDidMount() {
        this.getData(1, 5);
    }

    render() {
        // 控制表格选择
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onTableSelectChange
        };

        const extraButton = (<span>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => this.createRuleForm_HandleOpen()}>新建</Button>
            <Tooltip title="刷新"><Button icon={<RedoOutlined />} style={{ border: 0 }}></Button></Tooltip>
            <Tooltip title="密度"><Button icon={<ColumnHeightOutlined />} style={{ border: 0 }}></Button></Tooltip>
            <Tooltip title="列设置"><Button icon={<SettingOutlined />} style={{ border: 0 }}></Button></Tooltip>
            <Tooltip title="全屏"><Button icon={<FullscreenOutlined />} style={{ border: 0 }}></Button></Tooltip>
        </span>)

        return (
            <div>
                <PageHeader
                    onBack={() => null}
                    title="查询表格"
                    subTitle=""
                    className="pageHeader"
                />

                <Form
                    name="advanced_search"
                    ref={this.formRef}
                    className="ant-advanced-search-form"
                >
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item
                                name='ruleName'
                                label='规则名称'
                                rules={[{
                                    required: true,
                                    message: '请输入规则名称!'
                                }]}
                            >
                                <Input placeholder="请输入规则名称" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name='describe'
                                label='描述'
                                rules={[{
                                    required: true,
                                    message: '请输入描述!'
                                }]}
                            >
                                <Input placeholder="请输入描述" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name='serverUses'
                                label='服务调用次数'
                                rules={[{
                                    required: true,
                                    message: '请输入服务调用次数!'
                                }]}
                            >
                                <InputNumber min={0} placeholder="请输入服务调用次数" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={6} style={{ textAlign: 'right' }}>
                            <Button onClick={() => this.formRef_onreSet()}>重置</Button>
                            <Button type='primary' style={{ marginLeft: 15 }} onClick={() => this.formRef_onFinish()}>查询</Button>
                        </Col>
                    </Row>
                </Form>

                <Card title="查询表格" extra={extraButton} style={{ width: '100%' }}>
                    <Spin spinning={this.state.tableLoading} tip='加载中...' size='large'>
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
                            columns={this.TableColumns}
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
                            onRow={record => {
                                return {
                                    onClick: event => { console.log(record) },
                                    onDoubleClick: event => { console.log(event) }
                                }
                            }}
                        >
                        </Table>
                    </Spin>
                </Card>

                <Modal
                    title="新建规则"
                    visible={this.state.createRuleModal_Visible}
                    onOk={this.createRuleForm_HandleOk}
                    onCancel={this.createRuleForm_HandleCancel}
                    okText='确认'
                    cancelText='取消'
                >
                    <Form
                        layout='vertical'
                        ref={this.createRuleForm}
                    >
                        <Form.Item
                            label="规则名称"
                            name='createRuleForm_Name'
                            rules={[{
                                required: true,
                                message: '规则名称不能为空'
                            },
                            {
                                pattern: /^[a-zA-Z0-9_()（）\u4e00-\u9fa5]{1,32}$/,
                                message: "规则名称为1至32位汉字、字母、数字、下划线或中英文括号"
                            }]}
                        >
                            <Input placeholder="请输入规则名称" />
                        </Form.Item>
                        <Form.Item
                            label="描述"
                            name='createRuleForm_Describe'
                        >
                            <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}