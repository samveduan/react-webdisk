import React from 'react'
import { Row, Col, Table, Pagination, notification, Space, Button, Spin } from 'antd'
import axios from 'axios'

export default class TableCom extends React.Component {
    state = {
        tableData: [],
        selectedRowKeys: [], // 表格选择项Keys
        selectedRows: [], // 表格选择项Rows
        total: 0, // for Pagination,
        tableLoading: true
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

    handleDeleteArticle() {
        if (this.state.selectedRowKeys.length === 0) {
            notification['error']({
                message: '错误提示',
                description:
                    '请选择要删除的内容！',
            });
        } else {
            notification['success']({
                message: '正确提示',
                description:
                    `将要删除${JSON.stringify(this.state.selectedRowKeys)}`,
            });
        }
    }

    // 获取表格数据
    getData(pageNumber, pageSize) {
        this.setState({
            tableLoading: true
        })

        axios.get(`/article/all/?pageSize=${pageSize}&pageNumber=${pageNumber}&sortName=id&sortOrder=desc&_=1595230808893`).then((resp) => {
            console.log("all data:");
            console.log(resp);
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
    };

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
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onTableSelectChange
        };

        return (<>
            <Row style={{ paddingBottom: 15 }}>
                <Col span={24}><Space size="small"><Button type="primary" ghost>添加</Button><Button type="primary" ghost onClick={() => this.handleDeleteArticle()}>删除</Button></Space></Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Spin spinning={this.state.tableLoading} tip="加载中..." size="large">
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
                        >
                        </Table>
                    </Spin>
                </Col>
            </Row>
        </>);
    }
}