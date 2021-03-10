import React, { Component } from 'react'
import { Descriptions, Badge, Table, Typography } from 'antd';
import './base-detail.less'

const { Title } = Typography;

const return_goods_columns = [
  {
    title: '商品编号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '商品条码',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: '单价',
    key: 'price',
    dataIndex: 'price'
  },
  {
    title: '数量（件）',
    key: 'number',
    dataIndex: 'number'
  },
  {
    title: '金额',
    key: 'account',
    dataIndex: 'account'
  }
];

const return_goods_data = [
  {
    key: '1',
    id: '1234561',
    name: '矿泉水 550ml',
    code: '12421432143214321',
    price: '2.00',
    number: 1,
    account: '2.00'
  },
  {
    key: '2',
    id: '1234562',
    name: '凉茶 300ml',
    code: '12421432143214322',
    price: '3.00',
    number: 1,
    account: '3.00'
  },
  {
    key: '3',
    id: '1234563',
    name: '好吃的薯片',
    code: '12421432143214323',
    price: '7.00',
    number: 2,
    account: '7.00'
  },
];

const columns = [
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

const data = [
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

export default class baseDetail extends Component {
  render() {
    return (
      <div style={{ padding: 20, background: '#FFFFFF' }}>
        <Descriptions title="退款申请" bordered>
          <Descriptions.Item label="取货单号">1000000000</Descriptions.Item>
          <Descriptions.Item label="状态">已取货</Descriptions.Item>
          <Descriptions.Item label="销售单号">1234123421</Descriptions.Item>
          <Descriptions.Item label="子订单">3214321432</Descriptions.Item>
        </Descriptions>

        <Descriptions title="用户信息" bordered style={{ paddingBottom: 15 }}>
          <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>
          <Descriptions.Item label="联系电话">18100000000</Descriptions.Item>
          <Descriptions.Item label="常用快递">菜鸟仓储</Descriptions.Item>
          <Descriptions.Item label="取货地址">浙江省杭州市西湖区万塘路18号</Descriptions.Item>
          <Descriptions.Item label="备注">无</Descriptions.Item>
        </Descriptions>

        <Title style={{ fontSize: 16, marginBottom: 20 }}>退货商品</Title>
        <Table columns={return_goods_columns} dataSource={return_goods_data} bordered />

        <Title style={{ fontSize: 16, marginBottom: 20 }}>退货进度</Title>
        <Table columns={columns} dataSource={data} bordered />
      </div>
    )
  }
}