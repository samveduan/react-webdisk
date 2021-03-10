import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Avatar } from 'antd';
import './card-list.less'

const { Meta } = Card;

export default class cardList extends Component {
    getCardList = cardList => {
        return cardList.map((value, index) => {
            return (<Col span="6" style={{ marginBottom: 24 }} key={index}>
                <Card
                    style={{ width: '100%' }}
                    hoverable={true}
                >
                    <Meta
                        avatar={<Avatar src={require("./images/" + value.img)} />}
                        title={value.title}
                        description={value.description}
                    />
                    <Row className="cardRow"><Col span={12}>操作一</Col><Col span={12}>操作二</Col></Row>
                </Card>
            </Col>);
        })
    }

    render() {
        const cardList = [{
            title: "Alipay",
            description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一",
            img: 'bootstrap.png'
        }, {
            title: "Angular",
            description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一",
            img: 'alipay.png'
        }, {
            title: "Ant Design",
            description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一",
            img: 'react.png'
        }, {
            title: "Ant Design Pro",
            description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一",
            img: 'pro.png'
        }, {
            title: "Ant Design",
            description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一",
            img: 'ai.png'
        }, {
            title: "Ant Design Pro",
            description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一",
            img: 'bootstrap.png'
        }, {
            title: "Alipay",
            description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一",
            img: 'alipay.png'
        }, {
            title: "Angular",
            description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一的",
            img: 'ai.png'
        }];

        return (
            <div>
                <Row gutter={24}>
                    {this.getCardList(cardList)}
                </Row>
            </div>
        )
    }
}
