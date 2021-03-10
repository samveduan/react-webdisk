import React, { Component } from 'react'
import { Table, Pagination, Card, Modal, Button, Form, Input, InputNumber, Select, Checkbox, Radio, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react'
import axios from 'axios'

const { Option } = Select;
const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    }
};

export default class Home extends Component {
    state = {
        chartData: [
            ['2019-10-10', 200],
            ['2019-10-11', 400],
            ['2019-10-12', 650],
            ['2019-10-13', 500],
            ['2019-10-14', 250],
            ['2019-10-15', 300],
            ['2019-10-16', 450],
            ['2019-10-17', 300],
            ['2019-10-18', 200]
        ],
        selectedRowKeys: [], // 表格选择项Keys
        selectedRows: [], // 表格选择项Rows
        tableData: [],
        total: 0, // for Pagination
        columns: [
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
        ],
        addModalVisible: false
    };

    getSalesVolumeChartData = (chartData) => {
        return {
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '30%']
            },
            visualMap: {
                type: 'piecewise',
                show: false,
                dimension: 0,
                seriesIndex: 0,
                pieces: [{
                    gt: 1,
                    lt: 3,
                    color: 'rgba(0, 180, 0, 0.5)'
                }, {
                    gt: 5,
                    lt: 7,
                    color: 'rgba(0, 180, 0, 0.5)'
                }]
            },
            series: [
                {
                    type: 'line',
                    smooth: 0.6,
                    symbol: 'none',
                    lineStyle: {
                        color: 'green',
                        width: 5
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        label: { show: false },
                        data: [
                            { xAxis: 1 },
                            { xAxis: 3 },
                            { xAxis: 5 },
                            { xAxis: 7 }
                        ]
                    },
                    areaStyle: {},
                    data: chartData
                }
            ]
        };
    }

    onTableSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        console.log('selectedRows changed: ', selectedRows);
        this.setState({ selectedRowKeys, selectedRows });
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    /**
     * 表格
     */

    // 获取表格数据
    getData(pageNumber, pageSize) {
        axios.get(`/article/all/?pageSize=${pageSize}&pageNumber=${pageNumber}&sortName=id&sortOrder=desc&_=1595230808893`).then((resp) => {
            let ajaxData = [];
            for (let i = 0; i < resp.data.rows.length; i++) {
                ajaxData.push({
                    key: resp.data.rows[i].id,
                    id: resp.data.rows[i].id,
                    title: resp.data.rows[i].title,
                    content: resp.data.rows[i].content,
                });
            }

            this.setState({
                tableData: ajaxData,
                total: resp.data.total
            })

        }, (err) => {
            console.log(err);
        });
    }

    onChange = (pageNumber, pageSize) => {
        this.pageNum = pageNumber;
        this.getData(pageNumber, pageSize);
    };

    /**
     * 添加modal
     */

    // for modal
    showAddModal = () => {
        this.setState({
            addModalVisible: true
        })
    }

    addModalHandleOk = e => {
        this.addModalFormRef.current.validateFields()
            .then(values => {
                this.addModalFormRef.current.resetFields();
                this.setState({
                    addModalVisible: false
                });
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    addModalHandCancel = e => {
        this.addModalFormRef.current.resetFields();
        this.setState({
            addModalVisible: false
        })
    }

    // 表单相关
    addModalFormRef = React.createRef(); // 定义一个表单

    /**
     * 钩子函数
     */

    componentDidMount() {
        this.getData(1, 5);

        setInterval(() => {
            let chartData1 = Math.ceil(Math.random() * 100);
            let chartData2 = Math.ceil(Math.random() * 100);
            let chartData3 = Math.ceil(Math.random() * 100);
            let chartData4 = Math.ceil(Math.random() * 100);
            let chartData5 = Math.ceil(Math.random() * 100);
            let chartData6 = Math.ceil(Math.random() * 100);
            let chartData7 = Math.ceil(Math.random() * 100);
            let chartData8 = Math.ceil(Math.random() * 100);
            let chartData9 = Math.ceil(Math.random() * 100);
            let chartData = [
                ['2019-10-10', chartData1],
                ['2019-10-11', chartData2],
                ['2019-10-12', chartData3],
                ['2019-10-13', chartData4],
                ['2019-10-14', chartData5],
                ['2019-10-15', chartData6],
                ['2019-10-16', chartData7],
                ['2019-10-17', chartData8],
                ['2019-10-18', chartData9]
            ];

            this.setState({ chartData });
        }, 1000)
    }

    render() {
        // 控制表格选择
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onTableSelectChange
        };

        return (<>
            <Card
                title="Smoothed Line Chart"
            >
                <ReactEcharts option={this.getSalesVolumeChartData(this.state.chartData)}></ReactEcharts>
            </Card>

            <div style={{ height: 15 }}></div>

            <Card title="Default size card" extra={<Button type="primary" ghost size="small" icon={<PlusOutlined />} onClick={this.showAddModal}>添加</Button>} style={{ width: '100%' }}>
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
                    columns={this.state.columns}
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
                >
                </Table>

                <Modal
                    title="创建"
                    visible={this.state.addModalVisible}
                    width={660}
                    onOk={this.addModalHandleOk}
                    onCancel={this.addModalHandCancel}
                    okText="确认"
                    cancelText="取消"
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <Form {...layout} ref={this.addModalFormRef} name="control-ref" preserve={false}>
                        <Form.Item label="账号" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="account"
                                style={{ display: 'inline-block', width: 'calc(80% - 8px)', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "账号不能为空"
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_()（）\u4e00-\u9fa5]{1,32}$/,
                                        message: "账号为1至32位汉字、字母、数字、下划线或中英文括号"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(20% - 8px)' }}
                            >
                                <Checkbox>USBKEY</Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="姓名" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="name"
                                style={{ display: 'inline-block', width: 'calc(80% - 8px)' }}
                                rules={[
                                    {
                                        required: true,
                                        message: "姓名不能为空"
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_()（）\u4e00-\u9fa5]{1,32}$/,
                                        message: "姓名为1至32位汉字、字母、数字、下划线或中英文括号"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="个人空间配额">
                            <Form.Item
                                name="space"
                                noStyle
                                rules={[{
                                    required: true,
                                    message: "个人空间配额不能为空"
                                }, {
                                    type: 'number',
                                    min: 1,
                                    max: 100,
                                    message: "个人空间配额为1-100之间整数"
                                }
                                ]}
                            >
                                <InputNumber style={{ width: 160, marginRight: 15 }} placeholder="1-100之间整数" />
                            </Form.Item>
                        G
                </Form.Item>
                        <Form.Item label="私密空间配额">
                            <Form.Item
                                name="private"
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: "私密空间配额不能为空"
                                    }, {
                                        type: 'number',
                                        min: 1,
                                        max: 100,
                                        message: "私密空间配额为1-100之间整数"
                                    }
                                ]}
                            >
                                <InputNumber style={{ width: 160, marginRight: 15 }} placeholder="1-100之间整数" />
                            </Form.Item>
                        G
                </Form.Item>
                        <Form.Item label="证书级别" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="level"
                                style={{ display: 'inline-block', width: 'calc(80% - 8px)' }}
                                rules={[
                                    {
                                        required: true,
                                        message: "证书级别不能为空"
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="请选择证书级别"
                                    allowClear
                                >
                                    <Option value="1">一级</Option>
                                    <Option value="2">二级</Option>
                                </Select>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="存储服务器" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="server"
                                style={{ display: 'inline-block', width: 'calc(80% - 8px)' }}
                                rules={[
                                    {
                                        required: true,
                                        message: "存储服务器不能为空"
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="请选择存储服务器"
                                    allowClear
                                >
                                    <Option value="1">服务器一</Option>
                                    <Option value="2">服务器二</Option>
                                </Select>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            name="share"
                            label="是否允许中心共享"
                            rules={[
                                {
                                    required: true,
                                    message: "中心共享不能为空"
                                },
                            ]}
                        >
                            <Radio.Group name="radiogroup">
                                <Radio value={1}>是</Radio>
                                <Radio value={0}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="描述" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="describe"
                                style={{ display: 'inline-block', width: 'calc(80% - 8px)' }}
                                rules={[
                                    {
                                        pattern: /^[a-zA-Z0-9_()（），。,.\u4e00-\u9fa5]{0,128}$/,
                                        message: '描述只能为汉字、字母、数字、下划线或中英文逗号、句号和括号'
                                    }
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </>
        )
    }
}