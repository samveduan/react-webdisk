import React, { Component } from 'react'
import { Row, Col, Layout, Menu, Modal, Dropdown, Button } from 'antd';
import { Badge } from 'antd';
import { withRouter } from 'react-router-dom'
import { ExclamationCircleOutlined, DownOutlined, BellOutlined, LoginOutlined } from '@ant-design/icons';
import logo from './images/logo.svg'
import './index.less'

const { Header } = Layout;
const { confirm } = Modal;

class HeaderCom extends Component {
    loginOut = e => {
        e.preventDefault();
        let _this = this;
        confirm({
            title: '确定退出系统吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                localStorage['token'] = 0;
                setTimeout(function () {
                    _this.props.history.replace("/login");
                }, 1000)
            },
            onCancel() {
                console.log('Cancel');
            },
            okText: '确定',
            cancelText: '取消'
        });
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item icon={<LoginOutlined/>}>
                    <a target="_blank" rel="noopener noreferrer" href="#" onClick={this.loginOut}>
                        退出
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', paddingLeft: '20px' }}>
                <Row>
                    <Col span={10}><div className="logo"><img src={logo} />React Ant Design管理系统</div></Col>
                    <Col span={2} offset={12} style={{ textAlign: 'right' }}>
                        <Badge count={15} size='small' offset={[-15, -5]} showZero overflowCount={10} title={15}>
                            <BellOutlined style={{ color: '#1890ff', cursor: 'pointer', marginRight: 30 }} />
                        </Badge>
                        <Dropdown overlay={menu} trigger={['hover']}>
                            <a className="ant-dropdown-link" href="#" onClick={e => e.preventDefault()}>
                                admin <DownOutlined />
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default withRouter(HeaderCom);
