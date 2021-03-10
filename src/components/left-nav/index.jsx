import React, { Component } from 'react'
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import MenuList from '../../config/route-config'
import './index.less'

const { SubMenu } = Menu;

class LeftNav extends Component {
    state = {
        rootSubmenuKeys: [], //只展开当前父级菜单
        openKeys: [], // 默认展开的菜单项
    };

    // 只展开当前父级菜单
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    // 获取左侧菜单
    getMenuNodes = MenuList => {
        const path = this.props.location.pathname;

        return MenuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={<item.icon />}>
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                this.state.rootSubmenuKeys.push(item.key);

                // 查找一个与当前请求路径匹配的子Item
                const childItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
                // 如果存在, 说明当前item的子列表需要打开
                if (childItem) {
                    this.setState({
                        openKeys: [item.key]
                    })
                }

                return (
                    <SubMenu
                        key={item.key}
                        icon={<item.icon />}
                        title={item.title}
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    componentWillMount() {
        this.menuNodes = this.getMenuNodes(MenuList);
    }

    render() {
        /*selectedKeys：控制默认高亮菜单项，defaultOpenKeys、openKeys、onOpenChange：控制菜单展开*/
        return (
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={this.props.location.pathname}
                defaultOpenKeys={this.state.openKeys}
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ height: '100%', borderRight: 0, paddingTop: '60px' }}
            >
                {
                    this.menuNodes
                }
            </Menu>
        )
    }
}

export default withRouter(LeftNav)
