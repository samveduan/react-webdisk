import React, { Component } from 'react'
import { Result, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import './failure.less'

const { Paragraph, Text } = Typography;

export default class failure extends Component {
    render() {
        return (
            <Result
                status="error"
                title="提交失败"
                className="result-container"
                subTitle="请核对并修改以下信息后，再重新提交。"
                extra={[
                    <Button type="primary" key="console">
                        修改返回
                    </Button>
                ]}
            >
                <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            您提交的内容有如下错误:
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> 您的账户已被冻结. <a>立即解冻 &gt;</a>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> 您的账户还不具备申请资格. <a>立即升级 &gt;</a>
                    </Paragraph>
                </div>
            </Result>
        )
    }
}
