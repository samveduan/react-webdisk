import React, { Component } from 'react';
import { Card, Steps, Descriptions, Badge, Table, Empty } from 'antd';

const { Step } = Steps;

export default class seniorDetail extends Component {
    state = {
        noTitleKey: 'article',
        contentListNoTitle: {}
    };

    // for table
    getColumns = () => {
        return [
            {
                title: '时间',
                dataIndex: 'date',
                key: 'date'
            },
            {
                title: '当前进度',
                dataIndex: 'process',
                key: 'process'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: n => n == 0 ? <Badge status="processing" text="进行中" /> : <Badge status="success" text="成功" />
            },
            {
                title: '操作员ID',
                key: 'operator',
                dataIndex: 'operator'
            },
            {
                title: '耗时',
                key: 'time_consuming',
                dataIndex: 'time_consuming'
            }
        ];
    }

    // for tab
    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };

    getTabListNoTitle = () => {
        return  [
            {
                key: 'article',
                tab: '操作日志一'
            },
            {
                key: 'app',
                tab: '操作日志二'
            },
            {
                key: 'project',
                tab: '操作日志三'
            }
        ];
    }

    componentWillMount(){
        this.tabListNoTitle = this.getTabListNoTitle();
        this.tableColumns = this.getColumns();
    }

    componentDidMount() {
        this.table_data1 = [
            {
                key: '1',
                date: '2017-10-01 14:10',
                process: '联系客户',
                status: 0,
                operator: '取货员 ID1234',
                time_consuming: '5mins'
            },
            {
                key: '2',
                date: '2017-10-01 14:05',
                process: '取货员出发',
                status: 1,
                operator: '取货员 ID1234',
                time_consuming: '1h'
            },
            {
                key: '3',
                date: '2017-10-01 13:05',
                process: '取货员接单',
                status: 1,
                operator: '取货员 ID1234',
                time_consuming: '5mins'
            }
        ];

        this.table_data2 = [
            {
                key: '1',
                date: '2018-10-01 14:10',
                process: '联系客户',
                status: 0,
                operator: '取货员 ID1234',
                time_consuming: '5mins'
            },
            {
                key: '2',
                date: '2018-10-01 14:05',
                process: '取货员出发',
                status: 1,
                operator: '取货员 ID1234',
                time_consuming: '1h'
            },
            {
                key: '3',
                date: '2018-10-01 13:05',
                process: '取货员接单',
                status: 1,
                operator: '取货员 ID1234',
                time_consuming: '5mins'
            }
        ];

        this.table_data3 = [
            {
                key: '1',
                date: '2019-10-01 14:10',
                process: '联系客户',
                status: 0,
                operator: '取货员 ID1234',
                time_consuming: '5mins'
            },
            {
                key: '2',
                date: '2019-10-01 14:05',
                process: '取货员出发',
                status: 1,
                operator: '取货员 ID1234',
                time_consuming: '1h'
            },
            {
                key: '3',
                date: '2019-10-01 13:05',
                process: '取货员接单',
                status: 1,
                operator: '取货员 ID1234',
                time_consuming: '5mins'
            }
        ];

        this.state.contentListNoTitle = {
            article: <Table columns={this.tableColumns} dataSource={this.table_data1} bordered />,
            app: <Table columns={this.tableColumns} dataSource={this.table_data2} bordered />,
            project: <Table columns={this.tableColumns} dataSource={this.table_data3} bordered />
        };

        this.setState({
            noTitleKey: 'article'
        });
    }

    render() {
        return (
            <div>
                <Card title="流程进度" style={{ width: '100%', marginBottom: 20 }}>
                    <Steps current={1}>
                        <Step title="Finished" description="This is a description." />
                        <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
                        <Step title="Waiting" description="This is a description." />
                    </Steps>
                </Card>

                <Card title="用户信息" style={{ width: '100%', marginBottom: 20 }}>
                    <Descriptions>
                        <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>
                        <Descriptions.Item label="会员卡号">32943898021309809423</Descriptions.Item>
                        <Descriptions.Item label="身份证">3321944288191034921</Descriptions.Item>
                        <Descriptions.Item label="联系方式">18112345678</Descriptions.Item>
                        <Descriptions.Item label="联系地址">
                            曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
                        </Descriptions.Item>
                    </Descriptions>

                    <Descriptions title="信息组">
                        <Descriptions.Item label="某某数据">725</Descriptions.Item>
                        <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
                        <Descriptions.Item label="某某数据">725</Descriptions.Item>
                        <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
                    </Descriptions>
                </Card>


                <Card title="用户近半年来电记录" style={{ width: '100%', marginBottom: 20 }}>
                    <Empty />
                </Card>

                <Card
                    style={{ width: '100%' }}
                    tabList={this.tabListNoTitle}
                    activeTabKey={this.state.noTitleKey}
                    tabBarExtraContent={<a href="#">More</a>}
                    onTabChange={key => {
                        this.onTabChange(key, 'noTitleKey');
                    }}
                >
                    {this.state.contentListNoTitle[this.state.noTitleKey]}
                </Card>
            </div>
        )
    }
}