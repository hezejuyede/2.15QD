import Vue from 'vue';
import Router from 'vue-router';

//主页相关路由
import Index from '../components/index/index'
import Message from '../components/index/message'

//计划排产相关路由

//计划排产主页路由
import PlannedProduction from '../components/plannedProduction/PlannedProduction'
//船型管理
import ShipType from '../components/plannedProduction/ShipType'
//信息导入
import InformationImport from '../components/plannedProduction/InformationImport'
//工序管理
import WorkingProcedure from '../components/plannedProduction/WorkingProcedure'
//工艺路线管理路由
import ProcessRoute from '../components/plannedProduction/ProcessRoute'
//工作日历路由
import FactoryCalendar from '../components/plannedProduction/FactoryCalendar'
//资源模型路由
import ResourceModel from '../components/plannedProduction/ResourceModel'
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


//生产执行模块


//生产模块登陆页面
import ProductionExecutionLogin from '../components/productionExecution/ProductionExecutionLogin'


import ProductionExecution from '../components/productionExecution/ProductionExecution'


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
                    path: '/ShipType',
                    component: ShipType,
                    meta: {title: '船型管理'}
                },
                {
                    path: '/PlannedProduction',
                    component: PlannedProduction,
                    meta: {title: '计划排产'}
                },
                {
                    path: '/InformationImport',
                    component: InformationImport,
                    meta: {title: '信息导入'}
                },
                {
                    path: '/WorkingProcedure',
                    component:WorkingProcedure,
                    meta: {title: '工序管理'}
                },
                {
                    path: '/ProcessRoute',
                    component:ProcessRoute,
                    meta: {title: '工艺路线'}
                },
                {
                    path: '/FactoryCalendar',
                    component: FactoryCalendar,
                    meta: {title: '工厂日历'}
                },
                {
                    path: '/ResourceModel',
                    component:ResourceModel,
                    meta: {title: '资源模型'}
                },
                {
                    path: '/MaterialManagement',
                    component: MaterialManagement,
                    meta: {title: '物料管理'}
                },
                {
                    path: '/ProductionMonitoring',
                    component: ProductionMonitoring,
                    meta: {title: '生产监视'}
                },
                {
                    path: '/PersonnelManagement',
                    component: PersonnelManagement,
                    meta: {title: '人员管理'}
                },
                {
                    path: '/QualityAssurance',
                    component: QualityAssurance,
                    meta: {title: '质量管理'}
                },
                {
                    path: '/SystemManagement',
                    component: SystemManagement,
                    meta: {title: '系统管理'}
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
        },
        {
            path: '/productionExecution',
            component: ProductionExecution
        },
        {
            path: '/ProductionExecutionLogin',
            component: ProductionExecutionLogin
        },
    ]
})
