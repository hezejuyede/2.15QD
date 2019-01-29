import Vue from 'vue';
import Router from 'vue-router';

//主页相关路由
import Index from '../components/index/index'
import Message from '../components/index/messageIndex'

//计划排产相关路由



//生产管理路由
import PlannedProduction from '../components/plannedProduction/PlannedProduction'
//船型管理
import ShipType from '../components/plannedProduction/ShipType'

//特别流程管数据导入
import TBImport from '../components/plannedProduction/TBImport'

//管加工数据导入
import InformationImport from '../components/plannedProduction/GJGImport'

//数据查询
import ImportDataQuery from '../components/plannedProduction/ImportDataQuery'

//工序管理
import WorkingProcedure from '../components/plannedProduction/WorkingProcedure'
//工艺路线管理路由
import ProcessRoute from '../components/plannedProduction/ProcessRoute'
//工作日历路由
import FactoryCalendar from '../components/plannedProduction/FactoryCalendar'
//资源模型路由
import ResourceModel from '../components/plannedProduction/ResourceModel'
//班次管理
import ShiftManagement from '../components/plannedProduction/ShiftManagement'


//排产路由
import Production from '../components/plannedProduction/Production'
//任务派发
import Distribute from '../components/plannedProduction/Distribute'
//生产进度
import ProductionSchedule from '../components/plannedProduction/ProductionSchedule'
//工位查询
import WorkstationDynamics from '../components/plannedProduction/WorkstationDynamics'

//任务调度
import TaskScheduling from '../components/plannedProduction/TaskScheduling'

//物料配送路由

//生成工序计划路由

//计划派工路由

//计划调度路由

//查询路由


//物料管理
import MaterialManagement from '../components/materialManagement/materialManagement'

import ProductionMonitoring from '../components/productionMonitoring/productionMonitoring'

import DigitalSignage from '../components/productionMonitoring/DigitalSignage'

import QualityAssurance from '../components/qualityAssurance/qualityAssurance'


import SystemManagement from '../components/systemManagement/systemManagement';


import SecurityManagement from '../components/securityManagement/securityManagement';


import PersonnelManagement from '../components/personnelManagement/personnelManagement';


//质量管理
import ExceptionQuery from '../components/qualityAssurance/exceptionQuery';



//人员管理
import PersonnelSetting from '../components/personnelManagement/PersonnelSetting';


//人员管理
import ForReference from '../components/materialManagement/ForReference';



//系统管理
import OperationLog from '../components/systemManagement/operationLog';





Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Index'
        },
        {
            path: '/',
            component: resolve => require(['../common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/Index',
                    component: Index,
                    meta: {title: '系统首页'}
                },
                {
                    path: '/Message',
                    component: Message,
                    meta: {title: '消息中心'}
                },
                {
                    path: '/PlannedProduction',
                    component: PlannedProduction,
                    meta: {title: '生产管理'},
                    children: [
                        {
                            path: '/ShipType',
                            component: ShipType,
                            meta: {title: '船型管理'}
                        },
                        {
                            path: '/InformationImport',
                            component: InformationImport,
                            meta: {title: '信息导入'}
                        },
                        {
                            path: '/TBImport',
                            component: TBImport,
                            meta: {title: '特别流程管数据导入'}
                        },
                        {
                            path: '/WorkingProcedure',
                            component: WorkingProcedure,
                            meta: {title: '工序管理'}
                        },
                        {
                            path: '/ProcessRoute',
                            component: ProcessRoute,
                            meta: {title: '工艺路线'}
                        },
                        {
                            path: '/FactoryCalendar',
                            component: FactoryCalendar,
                            meta: {title: '工厂日历'}
                        },
                        {
                            path: '/ResourceModel',
                            component: ResourceModel,
                            meta: {title: '资源模型'}
                        },
                        {
                            path: '/Production',
                            component: Production,
                            meta: {title: '排产路由'}
                        },
                        {
                            path: '/Distribute',
                            component: Distribute,
                            meta: {title: '任务派发'}
                        },
                        {
                            path: '/ProductionSchedule',
                            component: ProductionSchedule,
                            meta: {title: '生产进度'}
                        },
                        {
                            path: '/WorkstationDynamics',
                            component: WorkstationDynamics,
                            meta: {title: '工位动态'}
                        },
                        {
                            path: '/ShiftManagement',
                            component: ShiftManagement,
                            meta: {title: '班次管理'}
                        },
                        {
                            path: '/ImportDataQuery',
                            component: ImportDataQuery,
                            meta: {title: '导入数据查询'}
                        },
                        {
                            path: '/ResourceModel',
                            component: ResourceModel,
                            meta: {title: '资源模型'}
                        },
                        {
                            path: '/TaskScheduling',
                            component: TaskScheduling,
                            meta: {title: '任务调度'}
                        }
                    ]
                },
                {
                    path: '/MaterialManagement',
                    component: MaterialManagement,
                    meta: {title: '物料管理'}
                },
                {
                    path: '/ForReference',
                    component: ForReference,
                    meta: {title: '为引当'}
                },
                {
                    path: '/ProductionMonitoring',
                    component: ProductionMonitoring,
                    meta: {title: '生产监视'}
                },
                {
                    path: '/PersonnelManagement',
                    component: PersonnelManagement,
                    meta: {title: '人员管理'},
                    children: [
                        {
                            path: '/PersonnelSetting',
                            component: PersonnelSetting,
                            meta: {title: '人员设定'}
                        }
                    ]
                },
                {
                    path: '/QualityAssurance',
                    component: QualityAssurance,
                    meta: {title: '质量管理'},
                    children: [
                        {
                            path: '/ExceptionQuery',
                            component: ExceptionQuery,
                            meta: {title: '异常查询'}
                        }
                    ]
                },
                {
                    path: '/SystemManagement',
                    component: SystemManagement,
                    meta: {title: '系统管理'},
                    children: [
                        {
                            path: '/OperationLog',
                            component: OperationLog,
                            meta: {title: '运行日志'}
                        },
                        {
                            path: '/InformationImport',
                            component: InformationImport,
                            meta: {title: '信息导入'}
                        }
                    ]
                },
                {
                    path: '/SecurityManagement',
                    component: SecurityManagement,
                    meta: {title: '安全管理'}
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/errPage/404.vue'], resolve),
                    meta: {title: '404'}
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/errPage/403.vue'], resolve),
                    meta: {title: '403'}
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/indexLogin/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        },
        {
            path: '/DigitalSignage',
            component: DigitalSignage
        }

    ]
})
