import React, { Component } from 'react'
import { Row, Col, Card, Tree, Button, Space, Spin, Table, Pagination, Modal, Form, Input, InputNumber, Select, Checkbox, Radio } from 'antd'
import { notification } from 'antd'
import { FileAddOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import axios from 'axios'

const { DirectoryTree } = Tree

const createModalFormLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}

const editModalFormLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}

export default class administrator extends Component {
    state = {
        selectedRowKeys: [], // 表格选择项Keys
        selectedRows: [], // 表格选择项Rows
        tableColumns: [],
        tableData: [],
        total: 0,
        tableLoading: false,
        createModalVisible: false, // 创建管理员 modal
        isUsbkey: false,
        editModalVisible: false, // 编辑管理员 modal
        editModalFormInitValues: {} // 编辑管理员 modal 表单初始值
    }

    /**
     * 按钮组
     */
    onCreateAdministrator = () => {
        this.setState({
            createModalVisible: true
        });
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

    onDeleteAdministrators = () => {
        let len = this.state.selectedRowKeys.length;

        if (len === 0) {
            notification['error']({
                message: '错误提示',
                description: '请选择要删除的管理员！',
            })
        } else {
            console.log(this.state.selectedRowKeys);
        }
    }

    /**
     * 树
     */
    getTreeData = () => {
        return [
            {
                title: '机构一',
                key: '0-0',
                children: [
                    {
                        title: '用户一',
                        key: '0-0-0',
                        isLeaf: true,
                    },
                    {
                        title: '用户二',
                        key: '0-0-1',
                        isLeaf: true,
                    },
                    {
                        title: '用户三',
                        key: '0-0-2',
                        isLeaf: true,
                    },
                    {
                        title: '用户四',
                        key: '0-0-3',
                        isLeaf: true,
                    },
                    {
                        title: '用户五',
                        key: '0-0-4',
                        isLeaf: true,
                    },
                    {
                        title: '用户六',
                        key: '0-0-5',
                        isLeaf: true,
                    },
                ],
            },
            {
                title: '机构二',
                key: '0-1',
                children: [
                    {
                        title: '用户七',
                        key: '0-1-0',
                        isLeaf: true,
                    },
                    {
                        title: '用户八',
                        key: '0-1-1',
                        isLeaf: true,
                    },
                    {
                        title: '用户九',
                        key: '0-1-2',
                        isLeaf: true,
                    },
                    {
                        title: '用户十',
                        key: '0-1-3',
                        isLeaf: true,
                    },
                ],
            },
        ];
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    onCheck = (checkedKeys, info) => {
        console.log('checked', checkedKeys, info);
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

    onShowSizeChange = (current, size) => {

    }

    /**
     * 创建modal
      */
    createModalForm = React.createRef();

    createModalHandleOk = () => {
        this.createModalForm.current.validateFields()
            .then(values => {
                this.createModalForm.current.resetFields();
                this.setState({
                    createModalVisible: false
                })
                console.log("表单元素值：");
                console.log(values);
            })
            .catch(err => {
                console.log(err);
            })
    }

    createModalHandCancel = () => {
        this.setState({
            createModalVisible: false,
            isUsbkey: false
        });
    }

    onIsUsbkey = e => {
        this.setState({
            isUsbkey: e.target.checked
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
     * 生命周期函数
     */
    componentWillMount() {
        this.treeData = this.getTreeData();
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
                    <Row gutter={24}>
                        <Col span={4} style={{ border: '1px solid #f0f0f0' }}>
                            <DirectoryTree
                                defaultExpandedKeys={['0-0-0', '0-0-1']}
                                defaultSelectedKeys={['0-0-0', '0-0-1']}
                                defaultCheckedKeys={['0-0-0', '0-0-1']}
                                onSelect={this.onSelect}
                                onCheck={this.onCheck}
                                treeData={this.treeData}
                            />
                        </Col>

                        <Col span={20}>
                            <Row style={{ marginBottom: 15 }}>
                                <Col span={16}>
                                    <Space size={15}>
                                        <Button type="primary" ghost icon={<FileAddOutlined />} onClick={() => this.onCreateAdministrator()}>创建</Button>
                                        <Button type="primary" ghost icon={<DeleteOutlined />} onClick={() => this.onDeleteAdministrators()}>删除</Button>
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
                                    style={{ marginBottom: 15 }}
                                />
                            </Spin>
                        </Col>
                    </Row>
                </Card>

                <Modal
                    title="创建"
                    visible={this.state.createModalVisible}
                    width={600}
                    onOk={this.createModalHandleOk}
                    onCancel={this.createModalHandCancel}
                    okText="确认"
                    cancelText="取消"
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <Form {...createModalFormLayout} ref={this.createModalForm} labelAlign="left">
                        <Form.Item
                            label="用户名"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="createModalFormUserName"
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
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(25% - 8px)' }}
                            >
                                <Checkbox onChange={e => this.onIsUsbkey(e)} checked={this.state.isUsbkey}>USBKEY</Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="姓名"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="createModalFormAccountName"
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
                                name="createModalFormUserSpace"
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
                            label="私密空间配额"
                            style={this.state.isUsbkey ? { marginBottom: 0 } : { marginBottom: 0, display: 'none' }}
                        >
                            <Form.Item
                                name="createModalFormPrivateSpace"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={this.state.isUsbkey ? [
                                    {
                                        required: true,
                                        message: "不能为空"
                                    },
                                    {
                                        pattern: /^(([1-9]\d?)|(100))$/,
                                        message: "为1-100之间整数"
                                    },
                                ] : []}>
                                <InputNumber
                                    placeholder="1-100之间整数"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="证书级别"
                            style={this.state.isUsbkey ? { marginBottom: 0 } : { marginBottom: 0, display: 'none' }}
                        >
                            <Form.Item
                                name="createModalFormLevel"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={this.state.isUsbkey ? [
                                    {
                                        required: true,
                                        message: "不能为空"
                                    },
                                ] : []}
                            >
                                <Select placeholder="请选择">
                                    <Select.Option value="1">一级</Select.Option>
                                    <Select.Option value="2">二级</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="PIN码"
                            style={this.state.isUsbkey ? { marginBottom: 0 } : { marginBottom: 0, display: 'none' }}
                        >
                            <Form.Item
                                name="createModalFormPin"
                                style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}
                                rules={this.state.isUsbkey ? [
                                    {
                                        required: true,
                                        message: "不能为空"
                                    }
                                ] : []}>
                                <Input.Password
                                />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="createModalFormPassword"
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
                                name="createModalFormServer"
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
                                name="createModalFormIsShare"
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
                            <Form.Item name="createModalFormDescribe" style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginRight: 15 }}>
                                <Input.TextArea rows={4} placeholder="最多只能输入128个字符，超过部分会自动截断" maxLength={128}></Input.TextArea >
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Modal>

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
            </div>
        )
    }
}