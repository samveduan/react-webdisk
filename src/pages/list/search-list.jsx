import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './search-list.less'
const { Meta } = Card;

export default class searchList extends Component {
    state = {
        value: 1
    }

    getTagList = TagList => {
        return TagList.map((item, index) => {
            return (
                <Col span={6} className="row-col" key={index}>
                    <Card
                        style={{ width: '100%' }}
                        hoverable={true}
                        cover={
                            <img
                                alt={item.title}
                                src={require('./images/' + item.img)}
                            />
                        }
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            title={item.title}
                            description={item.description}
                        />
                    </Card>
                </Col>)
        })
    }

    render() {
        const TagList = [{
            title: "Alipay",
            description: "那是一种内在的东西， 他们到达不了，也无法触及的",
            img: '1.png'
        }, {
            title: "Angular",
            description: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
            img: '3.png'
        }, {
            title: "Ant Design",
            description: "生命就像一盒巧克力，结果往往出人意料",
            img: '5.png'
        }, {
            title: "Ant Design Pro",
            description: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
            img: '6.png'
        }, {
            title: "Ant Design",
            description: "生命就像一盒巧克力，结果往往出人意料",
            img: '1.png'
        }, {
            title: "Ant Design Pro",
            description: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
            img: '3.png'
        }, {
            title: "Alipay",
            description: "那是一种内在的东西， 他们到达不了，也无法触及的",
            img: '5.png'
        }, {
            title: "Angular",
            description: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
            img: '6.png'
        }];

        return (
            <><Row gutter={24}>
                {this.getTagList(TagList)}
            </Row>
            </>
        )
    }
}