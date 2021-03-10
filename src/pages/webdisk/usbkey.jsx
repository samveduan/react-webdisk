import React, { Component } from 'react'
import { Card } from 'antd'
import { notification } from 'antd'

export default class usbkey extends Component {
    /**
     * USBKEY控件相关
     */
    plugin = () => {
        return document.getElementById('plugin0');
    }

    //根据索引号获取商密key容器名
    getActiveContainer = idx => {
        var rdict = { 'ret': true, "errMsg": "", "container": "" };
        var containers = "";
        try {
            if (this.plugin().valid) {
                var reqtype = 0x2001;
                var json_param = { "reqtype": reqtype };
                //var jsondata=JSON.parse(json_param);
                var jsondata = JSON.stringify(json_param);
                var result = this.plugin().KpfplgService(jsondata);
                var resultdata = JSON.parse(result);
                var containers = resultdata['return']['value'];
                if (containers != "") {
                    if (containers.indexOf("&") > 0) {
                        var container_arr = containers.split("&");
                        rdict['container'] = container_arr[idx];
                    } else {
                        rdict['container'] = containers;
                    }
                } else {
                    rdict['container'] = "";
                }
            } else {
                rdict['ret'] = false;
                rdict['errMsg'] = "控件加载失败,请检验控件是否安装成功";
            }

        } catch (e) {
            rdict['ret'] = false;
            rdict['errMsg'] = '控件调用错误：' + e.message;
        }
        return rdict;
    }

    //初始化key信息结构体
    kbmGetHand = (userid, pin, devno, clvl, container, flag, ualias) => {//flag:0：自定义，1：证书CN，2：证书SN）
        var rdict = { 'ret': true, "errMsg": "", "hand": 0 };
        try {
            if (this.plugin().valid) {
                var reqtype = 0x2002;
                var param = {
                    "userpin": pin,
                    "devno": devno,
                    "level": parseInt(clvl),
                    "containername": container
                };
                var json_param = { "reqtype": reqtype, "param": param };
                var jsondata = JSON.stringify(json_param);
                var result = this.plugin().KpfplgService(jsondata);
                var resultdata = JSON.parse(result);
                if (resultdata['return']['errorcode'] != 0) {
                    rdict['ret'] = false;
                    rdict['errMsg'] = resultdata['return']['errormsg'];
                } else {
                    rdict['hand'] = resultdata['return']['value'];
                }
            } else {
                rdict['ret'] = false;
                rdict['errMsg'] = "控件加载失败,请检验控件是否安装成功";
            }
        } catch (e) {
            rdict['ret'] = false;
            rdict['errMsg'] = '控件调用错误：' + e.message;
        }
        return rdict;
    }

    //获取SN信息  hand：key信息结构体
    kbmGetSN = hand => {
        var rdict = { 'ret': true, "errMsg": "", "sn": "" };
        try {
            if (this.plugin().valid) {
                var reqtype = 0x2004;
                var param = { "keyinfo": hand, "infotype": 12 };
                var json_param = { "reqtype": reqtype, "param": param };
                var jsondata = JSON.stringify(json_param);
                var result = this.plugin().KpfplgService(jsondata);
                var resultdata = JSON.parse(result);
                if (resultdata['return']['errorcode'] != 0) {
                    rdict['ret'] = false;
                    rdict['errMsg'] = "获取SN失败," + resultdata['return']['errormsg'];
                } else {
                    rdict['sn'] = resultdata['return']['value'];
                }
            } else {
                rdict['ret'] = false;
                rdict['errMsg'] = "控件加载失败,请检验控件是否安装成功";
            }

        } catch (e) {
            rdict['ret'] = false;
            rdict['errMsg'] = '获取CN失败，控件调用错误：' + e.message;
        }
        return rdict;
    }

    //获取CN信息  hand：key信息结构体
    kbmGetCN = hand => {
        var rdict = { 'ret': true, "errMsg": "", "cn": "" };
        try {
            if (this.plugin().valid) {
                var reqtype = 0x2004;
                var param = { "keyinfo": hand, "infotype": 14 };
                var json_param = { "reqtype": reqtype, "param": param };
                var jsondata = JSON.stringify(json_param);
                var result = this.plugin().KpfplgService(jsondata);
                var resultdata = JSON.parse(result);
                if (resultdata['return']['errorcode'] != 0) {
                    rdict['ret'] = false;
                    rdict['errMsg'] = "获取CN失败," + resultdata['return']['errormsg'];
                } else {
                    rdict['cn'] = resultdata['return']['value'];
                }
            } else {
                rdict['ret'] = false;
                rdict['errMsg'] = "控件加载失败,请检验控件是否安装成功";
            }

        } catch (e) {
            rdict['ret'] = false;
            rdict['errMsg'] = '获取CN失败，控件调用错误：' + e.message;
        }
        return rdict;
    }

    //获取商用key证书  0：加密证书 1:签名证书
    getCertBase64 = (hand, ctype) => {
        var rdict = { 'ret': true, "errMsg": "", "cert": "" };
        try {
            if (this.plugin().valid) {
                var reqtype = 0x2004;
                var infotype = 7;//加密证书
                if (ctype == 1) {
                    infotype = 8;
                }
                var param = { "keyinfo": hand, "infotype": infotype };
                var json_param = { "reqtype": reqtype, "param": param };
                var jsondata = JSON.stringify(json_param);
                var result = this.plugin().KpfplgService(jsondata);
                var resultdata = JSON.parse(result);
                if (resultdata['return']['errorcode'] != 0) {
                    rdict['ret'] = false;
                    rdict['errMsg'] = "获取证书信息失败," + resultdata['return']['errormsg'];
                } else {
                    rdict['cert'] = resultdata['return']['value'];
                }
            } else {
                rdict['ret'] = false;
                rdict['errMsg'] = "控件加载失败,请检验控件是否安装成功";
            }

        } catch (e) {
            rdict['ret'] = false;
            rdict['errMsg'] = '获取证书失败，控件调用错误：' + e.message;
        }
        return rdict;
    }

    componentDidMount() {
        let KbmActivex = this.plugin();
        let userid = "user01";
        let pin = '111111';
        let devno = 0;
        let clvl = 1;
        let container = "";
        let flag = 0;
        let ualias = "user01";

        if (clvl === 1) {
            container = this.getActiveContainer(0).container;
        } else {
            container = "";
        }

        let kbmGetHandReturn = this.kbmGetHand(userid, pin, devno, clvl, container, flag, ualias);
        let hand;
        let sn;
        let cn;
        let cert64;
        let cert64_ret;

        if (kbmGetHandReturn.ret) {
            hand = kbmGetHandReturn.hand;
            sn = this.kbmGetSN(hand).sn;
            cn = this.kbmGetCN(hand).cn;
            cert64_ret = this.getCertBase64(hand, 1);

            if (!cert64_ret['ret']) {
                notification['error']({
                    message: '错误提示',
                    description: cert64_ret['errMsg'],
                })
                return false;
            } else {
                cert64 = cert64_ret['cert']; // 签名
            }
        } else {
            notification['error']({
                message: '错误提示',
                description: kbmGetHandReturn.errMsg
            })
            return false;
        }
    }

    render() {
        return (
            <div>
                <object id="plugin0" type="application/x-kpfplugin" width="0" height="0" style={{position: 'absolute', left: 0, top: 0}}>
                    <param name="onload" value="pluginLoaded" />
                </object>

                <Card title="USBKEY">

                </Card>
            </div>
        )
    }
}
