import React, { Component } from 'react'
import { Steps, Form, Button, Input, Select, Descriptions } from 'antd'
import { Row, Col } from 'antd';
import { Alert } from 'antd';
import { Divider } from 'antd';
import { Result } from 'antd';
import { Typography } from 'antd';

const { Step } = Steps;
const { Text } = Typography;

const { Option } = Select;
const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const ConfirmLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const ConfirmTailLayout = {
    wrapperCol: {
        offset: 6,
        span: 18,
    },
};

export default class StepForm extends Component {
    state = {
        current: 0,
        formRefShowBool: 'block',
        confirmFormRefShowBool: 'none',
        completeContainerShowBool: 'none'
    }

    onFinish = values => {
        console.log(values);
        this.setState({
            formRefShowBool: 'none',
            confirmFormRefShowBool: 'block',
            completeContainerShowBool: 'none',
            current: 1
        })
    };

    onConfirmFinish = values => {
        console.log(values);
        this.setState({
            formRefShowBool: 'none',
            confirmFormRefShowBool: 'none',
            completeContainerShowBool: 'block',
            current: 2
        });
    };

    confirmFormRefPre = () => {
        this.setState({
            formRefShowBool: 'block',
            confirmFormRefShowBool: 'none',
            current: 0
        });
    }

    formRef = React.createRef();
    confirmFormRef = React.createRef();

    render() {
        return (
            <div style={{padding: 15, background: '#FFFFFF'}}>
                <Steps current={this.state.current}>
                    <Step title="填写转账信息" />
                    <Step title="确认转账信息" />
                    <Step title="完成" />
                </Steps>

                <div style={{ paddingTop: 50, display: this.state.formRefShowBool }}>
                    <Form {...layout}
                        ref={this.formRef}
                        name="control-ref"
                        onFinish={this.onFinish}
                        initialValues={{
                            PayAccount: 'ant-design@alipay.com',
                            AccountType: '支付宝',
                            AccountName: 'ant-design@alipay.com',
                            CollectionAccount: 'Alex',
                            AmountOfMoney: 50
                        }}
                    >
                        <Form.Item label="付款账户" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="PayAccount"
                                style={{ display: 'inline-block', width: '60%' }}
                                rules={[
                                    {
                                        required: true,
                                        message: "付款账户不能为空"
                                    },
                                ]}
                            >
                                <Select
                                    onChange={this.onGenderChange}
                                >
                                    <Option value="1">ant-design@alipay.com</Option>
                                </Select>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="收款账户" style={{ marginBottom: 0 }}>
                            <Input.Group compact>
                                <Form.Item
                                    style={{ display: 'inline-block', width: '20%' }}
                                    name="AccountType"
                                    rules={[
                                        {
                                            required: true,
                                            message: "账户类型不能为空"
                                        }
                                    ]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        <Option value="1">支付宝</Option>
                                        <Option value="2">银行账户</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="AccountName"
                                    style={{ display: 'inline-block', width: '40%' }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "收款账户不能为空"
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                        <Form.Item label="收款人姓名" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="CollectionAccount"
                                style={{ display: 'inline-block', width: '60%', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "收款人姓名不能为空"
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_()（）\u4e00-\u9fa5]{1,32}$/,
                                        message: "收款人姓名为1至32位汉字、字母、数字、下划线或中英文括号"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: '20%' }}
                            >
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="转账金额" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="AmountOfMoney"
                                style={{ display: 'inline-block', width: '60%', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "转账金额不能为空"
                                    },
                                    {
                                        pattern: /^[1-9][0,9]+$/,
                                        message: "转账金额为数字"
                                    },
                                ]}
                            >
                                <Input prefix="￥" />
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: '20%' }}
                            >
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                下一步
                    </Button>
                        </Form.Item>
                    </Form>
                </div>

                <div style={{ paddingTop: 50, display: this.state.confirmFormRefShowBool }}>
                    <Row>
                        <Col span={8} offset={8}>
                            <Alert message="确认转账后，资金将直接打入对方账户，无法退回。" type="info" showIcon closable />
                            <Descriptions
                                column={1}
                                style={{ marginTop: 15 }}
                            >
                                <Descriptions.Item label="付款账户">ant-design@alipay.com</Descriptions.Item>
                                <Descriptions.Item label="收款账户">test@example.com</Descriptions.Item>
                                <Descriptions.Item label="收款人姓名">Alex</Descriptions.Item>
                                <Descriptions.Item label="转账金额">500元</Descriptions.Item>
                            </Descriptions>

                            <Divider />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={8} offset={8}>
                            <Form {...ConfirmLayout}
                                ref={this.confirmFormRef}
                                name="confirm-control-ref"
                                onFinish={this.onConfirmFinish}
                                initialValues={{

                                }}
                            >
                                <Form.Item
                                    label="支付密码"
                                    name="PayPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: "支付密码不能为空"
                                        }
                                    ]}>
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item {...ConfirmTailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        提交
                                </Button>
                                    <Button style={{ marginLeft: 15 }} onClick={() => this.confirmFormRefPre()}>
                                        上一步
                                </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>

                <div style={{ paddingTop: 15, display: this.state.completeContainerShowBool }}>
                    <Result
                        status="success"
                        title="操作成功"
                        subTitle="预计两小时内到账"
                        extra={[
                            <Button type="primary" key="console">
                                再转一笔
                            </Button>,
                            <Button key="buy">查看账单</Button>,
                        ]}
                    />

                    <Row>
                        <Col span={8} offset={8}>
                            <Descriptions
                                column={1}
                                style={{ marginTop: 15 }}
                            >
                                <Descriptions.Item label="付款账户">ant-design@alipay.com</Descriptions.Item>
                                <Descriptions.Item label="收款账户">test@example.com</Descriptions.Item>
                                <Descriptions.Item label="收款人姓名">Alex</Descriptions.Item>
                                <Descriptions.Item label="转账金额">500元</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
