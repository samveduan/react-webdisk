import React, { Component } from 'react';
import { Modal, Form, Input, Button, InputNumber, Select, Checkbox, Radio } from 'antd';

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

export default class ModalForm extends Component {
    state = {
        visible: false
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    handleOk = () => {
        this.formRef.current.validateFields().then(values => {
            this.formRef.current.resetFields();
            this.setState({
                visible: false
            })
            console.log(values);
        })
        .catch(error => {
            console.log(error);
        })
    }

    handCancel = () => {
        this.setState({
            visible: false
        });
    }

    // 表单相关
    formRef = React.createRef(); // 定义一个表单

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    创建
        	    </Button>

                <Modal
                    title="创建"
                    visible={this.state.visible}
                    width={660}
                    onOk={this.handleOk}
                    onCancel={this.handCancel}
                    okText="确认"
                    cancelText="取消"
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <Form {...layout} ref={this.formRef} name="control-ref" preserve={false}>
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
            </div>
        )
    }
}
