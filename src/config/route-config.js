import { SnippetsFilled, PieChartFilled, PieChartOutlined, ProfileOutlined, FileWordOutlined, FileTextOutlined , BarChartOutlined, WhatsAppOutlined, ExclamationCircleOutlined, IeOutlined, SketchOutlined } from '@ant-design/icons';

const MenuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: SnippetsFilled, // 图标名称,
        children: [ // 子菜单列表
            {
                title: '监控页',
                key: '/monitor',
                icon: 'bars'
            },
            {
                title: '分析页',
                key: '/home',
                icon: 'bars'
            },
            {
                title: '工作台',
                key: '/workbench',
                icon: 'bars'
            }
        ]
    },
    {
        title: '数据录入',
        key: '/data_input',
        icon: PieChartFilled,
        children: [ // 子菜单列表
            {
                title: 'form',
                key: '/form',
                icon: 'bars'
            }
        ]
    },
    {
        title: '数据展示',
        key: '/data_show',
        icon: BarChartOutlined,
        children: [
            {
                title: 'table',
                key: '/table',
                icon: 'bar-chart'
            },
            {
                title: 'timeline ',
                key: '/timeline',
                icon: 'line-chart'
            },
            {
                title: 'descriptions ',
                key: '/descriptions',
                icon: 'line-chart'
            }
        ]
    },
    {
        title: '反馈',
        key: '/feedback',
        icon: WhatsAppOutlined,
        children: [
            {
                title: 'modal',
                key: '/modal1',
                icon: 'bar-chart'
            },
            {
                title: 'notification',
                key: '/notification',
                icon: 'line-chart'
            }
        ]
    },
    {
        title: '图表',
        key: '/charts',
        icon: PieChartOutlined,
        children: [
            {
                title: 'bar',
                key: '/bar',
                icon: 'bar-chart'
            },
            {
                title: 'line',
                key: '/line',
                icon: 'line-chart'
            },
            {
                title: 'pie',
                key: '/pie',
                icon: 'pie-chart'
            }
        ]
    },
    {
        title: '异常页',
        key: '/abnormal',
        icon: ExclamationCircleOutlined,
        children: [
            {
                title: '403',
                key: '/403',
                icon: 'bar-chart'
            },
            {
                title: '404',
                key: '/404',
                icon: 'line-chart'
            },
            {
                title: '500',
                key: '/500',
                icon: 'pie-chart'
            }
        ]
    },
    {
        title: '表单页',
        key: '/form',
        icon: FileTextOutlined,
        children: [
            {
                title: '基础表单',
                key: '/base-form',
                icon: 'bar-chart'
            },
            {
                title: '模态表单',
                key: '/modal-form',
                icon: 'bar-chart'
            },
            {
                title: '分步表单',
                key: '/step-form',
                icon: 'line-chart'
            },
            {
                title: '高级表单',
                key: '/advanced-form',
                icon: 'pie-chart'
            }
        ]
    },
    {
        title: '列表页',
        key: '/list',
        icon: ProfileOutlined,
        children: [
            {
                title: '搜索列表',
                key: '/search-list',
                icon: 'bar-chart'
            },
            {
                title: '查询表格',
                key: '/query-table',
                icon: 'line-chart'
            },
            {
                title: '标准列表',
                key: '/standard-list',
                icon: 'pie-chart'
            },
            {
                title: '卡片列表',
                key: '/card-list',
                icon: 'pie-chart'
            },
            {
                title: '树列表',
                key: '/tree-list',
                icon: 'pie-chart'
            }
        ]
    },
    {
        title: '详情页',
        key: '/detail',
        icon: FileWordOutlined,
        children: [
            {
                title: '基础详情页',
                key: '/base-detail',
                icon: 'bar-chart'
            },
            {
                title: '高级详情页',
                key: '/senior-detail',
                icon: 'line-chart'
            }
        ]
    },
    {
        title: '网盘',
        key: '/webdisk',
        icon: IeOutlined,
        children: [
            {
                title: '管理员管理',
                key: '/administrator',
                icon: 'bar-chart'
            },
            {
                title: '审计日志管理',
                key: '/log',
                icon: 'line-chart'
            },
            {
                title: '收到的共享',
                key: '/myshare',
                icon: 'line-chart'
            },
            {
                title: 'USBKEY',
                key: '/usbkey',
                icon: 'line-chart'
            }
        ]
    },
    {
        title: '加固',
        key: '/firmstor',
        icon: SketchOutlined,
        children: [
            {
                title: '基本信息',
                key: '/baseinfo',
                icon: 'bar-chart'
            },
            {
                title: '保险箱文件恢复',
                key: '/file-recovery',
                icon: 'bar-chart'
            }
        ]
    }
]

export default MenuList