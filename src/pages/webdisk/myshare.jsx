import React, { Component } from 'react'
import { Card, Tabs, Button } from 'antd';
import {RedoOutlined} from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react'

const { TabPane } = Tabs;

export default class myshare extends Component {
    callback = key => {
        console.log(key);
    }

    getDataSource = () => {
        return [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];
    }

    getColumns = () => {
        return [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
        ];
    }

    /**
     * 图表
     */
    getElectricityChartData = () => {
        return {
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '15%',
                containLabel: true
            },
            title: {
                text: '一天用电量分布'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} W'
                },
                axisPointer: {
                    snap: true
                }
            },
            visualMap: {
                show: false,
                dimension: 0,
                pieces: [{
                    lte: 6,
                    color: 'green'
                }, {
                    gt: 6,
                    lte: 8,
                    color: 'red'
                }, {
                    gt: 8,
                    lte: 14,
                    color: 'green'
                }, {
                    gt: 14,
                    lte: 17,
                    color: 'red'
                }, {
                    gt: 17,
                    color: 'green'
                }]
            },
            series: [
                {
                    name: '用电量',
                    type: 'line',
                    smooth: true,
                    data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
                    markArea: {
                        data: [[{
                            name: '早高峰',
                            xAxis: '07:30'
                        }, {
                            xAxis: '10:00'
                        }], [{
                            name: '晚高峰',
                            xAxis: '17:30'
                        }, {
                            xAxis: '21:15'
                        }]]
                    }
                }
            ]
        };
    }

    getBarChartData = () => {
        return {
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '10%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: ['蒸发量', '降水量', '平均温度']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '水量',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            series: [
                {
                    name: '蒸发量',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name: '降水量',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name: '平均温度',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        };

    }

    getSalesVolumeChartData = () => {
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
                    data: [
                        ['2019-10-10', 200],
                        ['2019-10-11', 400],
                        ['2019-10-12', 650],
                        ['2019-10-13', 500],
                        ['2019-10-14', 250],
                        ['2019-10-15', 300],
                        ['2019-10-16', 450],
                        ['2019-10-17', 300],
                        ['2019-10-18', 100]
                    ]
                }
            ]
        };
    }

    componentWillMount() {
        this.columns = this.getColumns();
        this.dataSource = this.getDataSource();
    }

    render() {
        let operations = (<Button type="primary" ghost size="small" icon={<RedoOutlined/>}>刷新</Button>);
        return (
            <Card>
                <Tabs defaultActiveKey="1" onChange={key => this.callback(key)} tabBarExtraContent={operations}>
                    <TabPane tab="电量" key="1">
                        <ReactEcharts option={this.getElectricityChartData()}></ReactEcharts>
                    </TabPane>
                    <TabPane tab="降水量" key="2">
                        <ReactEcharts option={this.getBarChartData()}></ReactEcharts>
                    </TabPane>
                    <TabPane tab="销售额" key="3">
                        <ReactEcharts option={this.getSalesVolumeChartData()}></ReactEcharts>
                    </TabPane>
                </Tabs>
            </Card>
        )
    }
}
