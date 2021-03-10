import React from 'react'
import { Form, Button, Input, InputNumber, Select, Checkbox, Radio } from 'antd'

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

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default class FormCom extends React.Component {
    state = {
        value: 0,
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    formRef = React.createRef();

    onFinish = values => {
        console.log(values);
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    render() {
        return (<>
            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish} style={{background: '#FFFFFF', paddingTop: 15, paddingBottom: 15}}>
                <Form.Item label="账号" style={{ marginBottom: 0}}>
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
                        <InputNumber style={{ width: 160, marginRight: 15 }} placeholder="1-100之间整数"/>
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
                        <InputNumber style={{ width: 160, marginRight: 15 }} placeholder="1-100之间整数"/>
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
                            onChange={this.onGenderChange}
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
                            onChange={this.onGenderChange}
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
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </>)
    }
}