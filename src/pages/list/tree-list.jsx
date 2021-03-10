import React, { Component } from 'react'
import { Row, Col, Card, Tree, Table, Spin, Pagination, Button, Space, Input } from 'antd'
import { FileAddOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios'
const { DirectoryTree } = Tree;

export default class TreeList extends Component {
    state = {
        selectedRowKeys: [], // 表格选择项Keys
        selectedRows: [], // 表格选择项Rows
        tableLoading: false,
        tableData: [],
        total: 0
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
    };

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };

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

    // 获取表格数据
    getData = (pageNumber, pageSize) => {
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
     * 钩子函数
     */
    componentWillMount() {
        this.TableColumns = this.getTableColumns();
        this.treeData = this.getTreeData();
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

        return (
            <div>
                <Card style={{ width: '100%' }}>
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
                                        <Button type="primary" ghost icon={<FileAddOutlined />}>创建</Button>
                                        <Button type="primary" ghost icon={<EditOutlined />}>编辑</Button>
                                        <Button type="primary" ghost icon={<DeleteOutlined />}>删除</Button>
                                    </Space>
                                </Col>
                                <Col span={8}>
                                    <Input style={{ float: 'right', width: 200 }} suffix={<SearchOutlined />} placeholder="搜索"></Input>
                                </Col>
                            </Row>
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
                                    bordered>
                                </Table>
                            </Spin>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
