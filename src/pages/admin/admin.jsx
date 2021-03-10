import React, { Component } from 'react'
import { Layout } from 'antd'
import { Route, Redirect, Switch } from 'react-router-dom'
import LeftNav from '../../components/left-nav/'
import HeaderCom from '../../components/header/'
import HomeCom from '../home/home'
import MonitorCom from '../home/monitor.jsx'
import WorkbenchCom from '../home/workbench.jsx'
import LineCom from '../charts/line'
import BarCom from '../charts/bar'
import PieCom from '../charts/pie'
import FormCom from '../data-input/form'
import TableCom from '../data-show/table'
import TabsCom from '../data-show/tabs'
import CardCom from '../data-show/card'
import TimelineCom from '../data-show/timeline'
import DescriptionsCom from '../data-show/descriptions'
import EmptyCom from '../data-show/empty'
import NotificationCom from '../feedback/notification'
import ModalCom from '../feedback/modal'
import ResultCom from '../feedback/result'
import Com403 from '../abnormal/403'
import Com404 from '../abnormal/404'
import Com500 from '../abnormal/500'
import BaseForm from '../form/base-form'
import ModalForm from '../form/modal-form'
import StepForm from '../form/step-form'
import AdvancedForm from '../form/advanced-form'
import SearchList from '../list/search-list'
import QueryTable from '../list/query-table'
import StandardList from '../list/standard-list'
import CardList from '../list/card-list'
import TreeList from '../list/tree-list'
import baseDetail from '../detail/base-detail'
import seniorDetail from '../detail/senior-detail'
import Administrator from '../webdisk/administrator'
import Log from '../webdisk/log'
import Myshare from '../webdisk/myshare'
import Usbkey from '../webdisk/usbkey'
import Baseinfo from '../firmstor/baseinfo'
import FileRecovery from '../firmstor/file-recovery'
import './admin.less'

const { Content, Sider } = Layout;

export default class Admin extends Component {
    state = {
        collapsed: false
    };

    // 控制菜单左右缩放
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        if (Number(localStorage['token']) === 0) {
            // 自动跳转到登陆(在render()中)
            return <Redirect to='/login' />;
        }

        // const loginOut = e => {
        //     e.preventDefault();
        //     localStorage['token'] = 0;
        //     this.props.history.replace("/login"); // this.props.history.replace("/login")写到render之外会有问题，此时组件需要用withRouter包装
        // }

        return (
            <Layout style={{ height: '100%' }}>
                <HeaderCom/>
                <Layout style={{ height: '100%' }}>
                    {/*collapsible、collapsed、onCollapse：控制整个菜单的左右收缩*/}
                    <Sider width={200} style={{ background: '#000000' }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <LeftNav />
                    </Sider>
                    <Layout className="site-layout" style={{ paddingTop: 64 }}>
                        <Content
                            className="main-content"
                            style={{overflowX: 'hidden'}}
                        >
                            <Switch>
                                <Route path="/home" component={HomeCom}></Route>
                                <Route path="/monitor" component={MonitorCom}></Route>
                                <Route path="/workbench" component={WorkbenchCom}></Route>
                                <Route path="/line" component={LineCom}></Route>
                                <Route path="/bar" component={BarCom}></Route>
                                <Route path="/pie" component={PieCom}></Route>
                                <Route path="/form" component={FormCom}></Route>
                                <Route path="/table" component={TableCom}></Route>
                                <Route path="/tabs" component={TabsCom}></Route>
                                <Route path="/card" component={CardCom}></Route>
                                <Route path="/timeline" component={TimelineCom}></Route>
                                <Route path="/descriptions" component={DescriptionsCom}></Route>
                                <Route path="/modal1" component={ModalCom}></Route>
                                <Route path="/empty" component={EmptyCom}></Route>
                                <Route path="/result" component={ResultCom}></Route>
                                <Route path="/notification" component={NotificationCom}></Route>
                                <Route path="/403" component={Com403}></Route>
                                <Route path="/404" component={Com404}></Route>
                                <Route path="/500" component={Com500}></Route>
                                <Route path="/base-detail" component={baseDetail}></Route>
                                <Route path="/senior-detail" component={seniorDetail}></Route>
                                <Route path="/administrator" component={Administrator}></Route>
                                <Route path="/log" component={Log}></Route>
                                <Route path="/myshare" component={Myshare}></Route>
                                <Route path="/usbkey" component={Usbkey}></Route>
                                <Route path="/baseinfo" component={Baseinfo}></Route>
                                <Route path="/file-recovery" component={FileRecovery}></Route>
                                <Route path="/base-form" component={BaseForm}></Route>
                                <Route path="/modal-form" component={ModalForm}></Route>
                                <Route path="/step-form" component={StepForm}></Route>
                                <Route path="/advanced-form" component={AdvancedForm}></Route>
                                <Route path="/search-list" component={SearchList}></Route>
                                <Route path="/query-table" component={QueryTable}></Route>
                                <Route path="/standard-list" component={StandardList}></Route>
                                <Route path="/card-list" component={CardList}></Route>
                                <Route path="/tree-list" component={TreeList}></Route>
                                <Redirect to="/home" />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}