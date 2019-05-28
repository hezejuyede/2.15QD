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

//管加工数据导入审核
import DataImportAudit from '../components/plannedProduction/dataImportAudit'

//数据查询
import ImportDataQuery from '../components/plannedProduction/ImportDataQuery'

//工序管理
import WorkingProcedure from '../components/plannedProduction/WorkingProcedure'

//工位负荷监测
import LoadMonitoring from '../components/plannedProduction/LoadMonitoring'


//工艺路线管理路由
import ProcessRoute from '../components/plannedProduction/ProcessRoute'
//工作日历路由
import FactoryCalendar from '../components/plannedProduction/FactoryCalendar'
//资源模型路由
import ResourceModel from '../components/plannedProduction/ResourceModel'
//班次管理
import ShiftManagement from '../components/plannedProduction/ShiftManagement'

//生产调度日志
import ProductionSchedulingLog  from '../components/plannedProduction/ProductionSchedulingLog';

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

//托单金物制作
import ProductionOfGoldSheets from '../components/materialManagement/productionOfGoldSheets.vue'

//托单金物审批
import tdApproval from '../components/materialManagement/tdApproval.vue'

//出库查询（托单金物）
import tdjwOuOfStock from '../components/materialManagement/tdjwOuOfStock'

//配送查询（托单金物）
import tdjwDelivery from '../components/materialManagement/tdjwDelivery'



//注文金物缺件登记
import zwMissingRegistration from '../components/materialManagement/zwMissingRegistration.vue'

//注文金物查询
import zwMetalSearch from '../components/materialManagement/zwMetalSearch.vue'


//储品金物缺件登记
import cPMissingRegistration from '../components/materialManagement/cPMissingRegistration'

//储品金物查询
import cpMetalSearch from '../components/materialManagement/cpMetalSearch.vue'

//管材出库查询
import pipeOutgoing from '../components/materialManagement/pipeOutgoing.vue'



//储品金物报表
import cPReportForm from '../components/materialManagement/cPReportForm.vue'

//托单金物报表
import tDJWReportForm from '../components/materialManagement/tDJWReportForm.vue'

//注文金物报表
import zWReportForm from '../components/materialManagement/zwReportForm.vue'

//物料报表
import wlReportForm from '../components/materialManagement/wlReportForm'
//为引当报表
import wydReportForm from '../components/materialManagement/wydReportForm'

//工位报表
import gwReportForm from '../components/materialManagement/gwReportForm'






//设备管理路由
import ProductionMonitoring from '../components/productionMonitoring/productionMonitoring'

//点检不良率报表
import djblvReportForm from '../components/productionMonitoring/djblvReportForm.vue'

//设备归属报表
import sbgsReportForm from '../components/productionMonitoring/sbgsReportForm'

//设备故障率报表
import sbgzvReportForm from '../components/productionMonitoring/sbgzvReportForm.vue'

//点检项目设定
import InspectionItemSetting from '../components/productionMonitoring/InspectionItemSetting.vue'

//工位点检记录
import workStationInspectionRecord from '../components/productionMonitoring/workStationInspectionRecord'

//点检记录查询与统计
import djjjSearchTj from '../components/productionMonitoring/djjjSearchTj'

//定义耗材
import  dingyihancaiku from '../components/productionMonitoring/dingyihancaiku'


//定义分类
import  dingyifenlei from '../components/productionMonitoring/dingyifenlei'







import zgsjStatistics from '../components/personnelManagement/zgsjStatistics'


import QualityAssurance from '../components/qualityAssurance/qualityAssurance'


import SystemManagement from '../components/systemManagement/systemManagement';


import SecurityManagement from '../components/securityManagement/securityManagement';


import PersonnelManagement from '../components/personnelManagement/personnelManagement';




//质量管理
import ExceptionQuery from '../components/qualityAssurance/exceptionQuery';


//部门管理
import DepartmentManagement from '../components/personnelManagement/departmentManagement';

//人员管理
import PersonnelSetting from '../components/personnelManagement/PersonnelSetting';

//岗位管理
import PostManagement from '../components/personnelManagement/postManagement';

//角色管理
import RoleManagement from '../components/personnelManagement/roleManagement';

//资质设定
import QualificationSetting from '../components/personnelManagement/QualificationSetting'


//人员资质设定
import personnelQualificationSetting from '../components/personnelManagement/personnelQualificationSetting.vue';

//资质查询与统计
import QualificationQueryAndStatistics from '../components/personnelManagement/QualificationQueryAndStatistics.vue';

//上离岗异常统计
import zGTimeStatistics from '../components/personnelManagement/zGTimeStatistics';

//在岗时间查询和统计
import sLGYCStatistics from '../components/personnelManagement/shanggangshijianchaxun.vue';

//人员工作记录查询
import rYGZJVCX from '../components/personnelManagement/rYGZJVCX.vue';

//人员不良记录统计
import rYBLJVTJ from '../components/personnelManagement/rYBLJVTJ.vue';

//人员作业效率跟踪
import rYZYXLGZ from '../components/personnelManagement/rYZYXLGZ.vue';


//人员资质报表
import ryzzReportForm from '../components/personnelManagement/ryzzReportForm.vue';

//人员上岗率报表
import rysglReportForm from '../components/personnelManagement/rysglReportForm.vue';

//不良记录报表
import bljlReportForm from '../components/personnelManagement/bljlReportForm.vue';

//人员效率报表
import ryxlReportForm from '../components/personnelManagement/ryxlReportForm.vue';

//人员总体绩效评估报表
import ryztjxpgReportForm from '../components/personnelManagement/ryztjxpgReportForm.vue';

//人员动态分布图
import StaffDynamics from '../components/personnelManagement/StaffDynamics.vue';




//系统管理
import OperationLog from '../components/systemManagement/operationLog';
import LoginOutLog from '../components/systemManagement/loginOutLog';
import DictionaryMaintenance from '../components/systemManagement/dictionaryMaintenance';
import HeaderMaintenance from '../components/systemManagement/headerMaintenance';
import LoginSecurityAlert from '../components/securityManagement/loginSecurityAlert';
import OperatorMainPoints from '../components/qualityAssurance/operatorMainPoints';
import ListDetails from '../components/systemManagement/listDetails';


import ButtonConfiguration from '../components/systemManagement/ButtonConfiguration'
import DetailsTextConfiguration from '../components/systemManagement/DetailsTextConfiguration'
import ScreeningConditionsConfiguration from '../components/systemManagement/ScreeningConditionsConfiguration'
import ExecuteHeaderConfiguration from '../components/systemManagement/ExecuteHeaderConfiguration'

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
                            path: '/LoadMonitoring',
                            component: LoadMonitoring,
                            meta: {title: '工位负荷监测'}
                        },
                        {
                            path: '/ProductionSchedulingLog',
                            component: ProductionSchedulingLog,
                            meta: {title: '工位负荷监测'}
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
                            path: '/DataImportAudit',
                            component: DataImportAudit,
                            meta: {title: '导入数据审核'}
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
                    meta: {title: '物料管理'},
                    children: [
                        {
                            path: '/ProductionOfGoldSheets',
                            component: ProductionOfGoldSheets,
                            meta: {title: '脱单金物制作'}
                        },
                        {
                            path: '/tdApproval',
                            component: tdApproval,
                            meta: {title: '脱单金物审批'}
                        },
                        {
                            path: '/tdjwOuOfStock',
                            component: tdjwOuOfStock,
                            meta: {title: '出库查询（托单金物）'}
                        },
                        {
                            path: '/tdjwDelivery',
                            component: tdjwDelivery,
                            meta: {title: '配送查询（托单金物）'}
                        },
                        {
                            path: '/zwMissingRegistration',
                            component:zwMissingRegistration,
                            meta: {title: '注文金物缺件登记'}
                        },
                        {
                            path: '/zwMetalSearch',
                            component: zwMetalSearch,
                            meta: {title: '注文金物查询'}
                        },
                        {
                            path: '/cPMissingRegistration',
                            component:cPMissingRegistration,
                            meta: {title: '储品金物缺件登记'}
                        },
                        {
                            path: '/cpMetalSearch',
                            component: cpMetalSearch,
                            meta: {title: '储品金物查询'}
                        },
                        {
                            path: '/pipeOutgoing',
                            component: pipeOutgoing,
                            meta: {title: '管材出库'}
                        },
                        {
                            path: '/wlReportForm',
                            component: wlReportForm,
                            meta: {title: '物料数据报表'}
                        },
                        {
                            path: '/cPReportForm',
                            component: cPReportForm,
                            meta: {title: '储品金物报表'}
                        },
                        {
                            path: '/tDJWReportForm',
                            component: tDJWReportForm,
                            meta: {title: '托单金物报表'}
                        },
                        {
                            path: '/zWReportForm',
                            component: zWReportForm,
                            meta: {title: '注文金物报表'}
                        },
                        {
                            path: '/wydReportForm',
                            component: wydReportForm,
                            meta: {title: '未引当报表'}
                        },
                        {
                            path: '/gwReportForm',
                            component: gwReportForm,
                            meta: {title: '工位物料报表'}
                        }
                    ]
                },
                {
                    path: '/ProductionMonitoring',
                    component: ProductionMonitoring,
                    meta: {title: '设备管理'},
                    children: [

                        {
                            path: 'InspectionItemSetting',
                            component:InspectionItemSetting,
                            meta: {title: '点检项目设定'}
                        },
                        {
                            path: 'workStationInspectionRecord',
                            component:workStationInspectionRecord,
                            meta: {title: '工位点检记录'}
                        },
                        {
                            path: 'djjjSearchTj',
                            component:djjjSearchTj,
                            meta: {title: '点检记录查询与统计'}
                        },

                        {
                            path: 'dingyihancaiku',
                            component:dingyihancaiku,
                            meta: {title: '定义耗材'}
                        },
                        {
                            path: 'dingyifenlei',
                            component:dingyifenlei,
                            meta: {title: '定义分类'}
                        },

                        {
                            path: 'sbgsReportForm',
                            component: sbgsReportForm,
                            meta: {title: '设备归属报表'}
                        },
                        {
                            path: 'djblvReportForm',
                            component: djblvReportForm,
                            meta: {title: '点检不良率报表'}
                        },
                        {
                            path: 'sbgzvReportForm',
                            component: sbgzvReportForm,
                            meta: {title: '设备故障率报表'}
                        }
                    ]
                },
                {
                    path: '/PersonnelManagement',
                    component: PersonnelManagement,
                    meta: {title: '人员管理'},
                    children: [
                        {
                            path: '/DepartmentManagement',
                            component: DepartmentManagement,
                            meta: {title: '部门管理'}
                        },
                        {
                            path: '/PersonnelSetting',
                            component: PersonnelSetting,
                            meta: {title: '人员设定'}
                        },
                        {
                            path: '/PostManagement',
                            component: PostManagement,
                            meta: {title: '岗位管理'}
                        },
                        {
                            path: '/RoleManagement',
                            component: RoleManagement,
                            meta: {title: '角色管理'}
                        },
                        {
                            path: '/QualificationSetting',
                            component: QualificationSetting,
                            meta: {title: '资质设定'}
                        },
                        {
                            path: '/personnelQualificationSetting',
                            component: personnelQualificationSetting,
                            meta: {title: '人员资质设定'}
                        },
                        {
                            path: '/QualificationQueryAndStatistics',
                            component: QualificationQueryAndStatistics,
                            meta: {title: '资质查询与统计'}
                        },
                        {
                            path: '/sLGYCStatistics',
                            component: sLGYCStatistics,
                            meta: {title: '在岗时间查询'}
                        },
                        {
                            path: '/zGTimeStatistics',
                            component: zGTimeStatistics,
                            meta: {title: '上离岗异常统计'}
                        },
                        {
                            path: '/zgsjStatistics',
                            component: zgsjStatistics,
                            meta: {title: '在岗时间统计'}
                        },
                        {
                            path: '/rYGZJVCX',
                            component: rYGZJVCX,
                            meta: {title: '人员工作记录查询'}
                        },
                        {
                            path: '/rYBLJVTJ',
                            component: rYBLJVTJ,
                            meta: {title: '人员不良记录统计'}
                        },
                        {
                            path: '/rYZYXLGZ',
                            component: rYZYXLGZ,
                            meta: {title: '人员作业效率跟踪'}
                        },
                        {
                            path: '/ryzzReportForm',
                            component: ryzzReportForm,
                            meta: {title: '人员资质报表'}
                        },
                        {
                            path: '/rysglReportForm',
                            component: rysglReportForm,
                            meta: {title: '人员上岗率报表'}
                        },
                        {
                            path: '/bljlReportForm',
                            component: bljlReportForm,
                            meta: {title: '不良记录报表'}
                        },
                        {
                            path: '/ryxlReportForm',
                            component: ryxlReportForm,
                            meta: {title: '人员效率报表'}
                        },
                        {
                            path: '/ryztjxpgReportForm',
                            component: ryztjxpgReportForm,
                            meta: {title: '人员总体绩效评估报表'}
                        },
                        {
                            path: '/StaffDynamics',
                            component: StaffDynamics,
                            meta: {title: '人员动态分布图'}
                        }
                    ]
                },
                {
                    path: '/QualityAssurance',
                    component: QualityAssurance,
                    meta: {title: '质量管理'},
                    children: [
                        {
                            path: 'ExceptionQuery',
                            component: ExceptionQuery,
                            meta: {title: '异常查询'}
                        },
                        {
                            path: 'OperatorMainPoints',
                            component: OperatorMainPoints,
                            meta: {title: '作业者要点内容'}
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
                            path: '/LoginOutLog',
                            component: LoginOutLog,
                            meta: {title: '系统登录退出'}
                        },
                        {
                            path: '/DictionaryMaintenance',
                            component: DictionaryMaintenance,
                            meta: {title: '字典维护'}
                        },
                        {
                            path: '/HeaderMaintenance',
                            component: HeaderMaintenance,
                            meta: {title: '表头维护'}
                        },
                        {
                            path: '/ButtonConfiguration',
                            component: ButtonConfiguration,
                            meta: {title: '按钮配置'}
                        },
                        {
                            path: '/DetailsTextConfiguration',
                            component: DetailsTextConfiguration,
                            meta: {title: '详情头部配置'}
                        },
                        {
                            path: '/ScreeningConditionsConfiguration',
                            component: ScreeningConditionsConfiguration,
                            meta: {title: '筛选条件配置'}
                        },
                        {
                            path: '/ListDetails',
                            component: ListDetails,
                            meta: {title: '作业记录'}
                        },
                        {
                            path: '/ExecuteHeaderConfiguration',
                            component: ExecuteHeaderConfiguration,
                            meta: {title: '执行端表头配置'}
                        }
                    ]
                },
                {
                    path: '/SecurityManagement',
                    component: SecurityManagement,
                    meta: {title: '安全管理'},
                    children: [
                        {
                            path: '/LoginSecurityAlert',
                            component: LoginSecurityAlert,
                            meta: {title: '登录安全提醒'}
                        }
                    ]
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
        }
    ]
})
