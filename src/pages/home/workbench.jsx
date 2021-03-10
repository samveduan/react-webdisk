import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'antd';
import { Typography } from 'antd'
import { List, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import avatar from './images/avatar.png'
import './workbench.less'

const { Title, Paragraph, Text } = Typography;

const cardList = [{
    title: 'Alipay',
    img: 'antd.png',
    describe: '那是一种内在的东西，他们到达不了，也无法触及的.',
    group: '科学搬砖组',
    time: '9天前'
}, {
    title: 'Angular',
    img: 'ai.png',
    describe: '希望是一个好东西，也许是最好的，好东西是不会消亡.',
    group: '科学搬砖组',
    time: '9天前'
}, {
    title: 'Ant Design',
    img: 'alipay.png',
    describe: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆.',
    group: '科学搬砖组',
    time: '9天前'
}, {
    title: 'Ant Design Pro',
    img: 'bootstrap.png',
    describe: '那时候我只会想自己想要什么，从不想自己拥有什么.',
    group: '科学搬砖组',
    time: '9天前'
}, {
    title: 'Bootstrap',
    img: 'pro.png',
    describe: '凛冬将至.',
    group: '科学搬砖组',
    time: '9天前'
}, {
    title: 'React',
    img: 'react.png',
    describe: '生命就像一盒巧克力，结果往往出人意料.',
    group: '科学搬砖组',
    time: '9天前'
}];

const data = [
    {
        title: '曲丽丽 在 高逼格设计天团 新建项目 六月迭代',
    },
    {
        title: '付小小 在 高逼格设计天团 新建项目 六月迭代',
    },
    {
        title: '林东东 在 中二少女团 新建项目 六月迭代',
    },
    {
        title: '周星星 将 5 月日常迭代 更新至已发布状态',
    },
    {
        title: '朱偏右 在 工程效能 发布了 留言',
    },
    {
        title: '乐哥 在 程序员日常 新建项目 品牌迭代',
    }
];

const groupData = [{
    img: 'antd.png',
    title: '科学搬砖组'
},
{
    img: 'ai.png',
    title: '全组都是吴彦祖'
},
{
    img: 'alipay.png',
    title: '中二少女团'
},
{
    img: 'bootstrap.png',
    title: '程序员日常'
},
{
    img: 'pro.png',
    title: '高逼格设计天团'
},
{
    img: 'react.png',
    title: '骗你来学计算机'
}];

export default class workbench extends Component {
    getCardList = cardList => {
        return cardList.map((value, index) => {
            return (<Card.Grid className="grid-style" key={index}>
                <Title level={5} className="grid-title"><img src={require('./images/' + value.img)} /> {value.title}</Title>
                <Paragraph className="grid-paragraph">{value.describe}</Paragraph>
                <Paragraph className="grid-paragraph"><Text>{value.group}</Text> <Text className="grid-time">{value.time}</Text></Paragraph>
            </Card.Grid>)
        })
    }

    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={17}>
                        <Card title="进行中的项目" extra={<a>全部项目</a>}>
                            {this.getCardList(cardList)}
                        </Card>

                        <div style={{ height: 15, clear: 'both' }}></div>

                        <Card title="进行中的项目">
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={avatar} />}
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="9 天前"
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col span={7}>
                        <Card title="快速开始 / 便捷导航">
                            <Button type='text' className="navButton">操作一</Button>
                            <Button type='text' className="navButton">操作二</Button>
                            <Button type='text' className="navButton">操作三</Button>
                            <Button type='text' className="navButton">操作四</Button>
                            <Button type='text' className="navButton">操作五</Button>
                            <Button type='primary' ghost size='small' icon={<PlusOutlined />}>添加</Button>
                        </Card>

                        <div style={{ height: 15 }}></div>

                        <Card title="团队">
                            <List
                                dataSource={groupData}
                                renderItem={item => (
                                    <List.Item className="groupCardList">
                                        <img src={require('./images/' + item.img)} /> {item.title}
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
