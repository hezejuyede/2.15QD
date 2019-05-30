<template>
    <div class="productionMonitoring">
        <div class="productionMonitoring-nav">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <div v-for="(item,index) in navBarData" :class="{'navDivColor':index === num}">
                    <el-submenu :index="item.index">
                        <template slot="title">{{item.label}}</template>
                        <div class="" v-for="(item ,index) in item.children"
                             @click=" handleSelect(item.index,item.url)">
                            <el-menu-item :index="item.index">{{item.label}}</el-menu-item>
                        </div>
                    </el-submenu>
                </div>
            </el-menu>
        </div>
        <div class="productionMonitoring-content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">


    export default {
        name: 'productionMonitoring',
        data() {
            return {
                num: 0,
                navBarData: [
                    {
                        label: '设备点检',
                        index: "1",
                        children: [
                            {
                                label: '点检项目设定',
                                index: "1-1",
                                url: "/ProductionMonitoring/xingmusheding"
                            },
                            {
                                label: '关联设备设定',
                                index: "1-1",
                                url: "/ProductionMonitoring/guanlianshebeisheding"
                            },
                            {
                                label: '工位点检项目设定',
                                index: "1-3",
                                url: "/ProductionMonitoring/InspectionItemSetting"
                            },
                            {
                                label: '工位点检记录',
                                index: "1-4",
                                url: "/ProductionMonitoring/workStationInspectionRecord"
                            },
                            {
                                label: '点检记录查询与统计',
                                index: "1-5",
                                url: "/ProductionMonitoring/djjjSearchTj"
                            }
                        ]
                    },
                    {
                        label: '耗材与备件管理',
                        index: "2",
                        children: [
                            {
                                label: '定义分类名称',
                                index: "2-1",
                                url: "/ProductionMonitoring/dingyifenlei"
                            },
                            {
                                label: '定义耗材名称',
                                index: "2-2",
                                url: "/ProductionMonitoring/dingyihancaiku"
                            },
                            {
                                label: '入库登记',
                                index: "2-3",
                                url: "/ProductionMonitoring/rukudengji"
                            },
                            {
                                label: '出库登记',
                                index: "2-4",
                                url: "/ProductionMonitoring/chukudengji"
                            },
                            {
                                label: '出入库查询与统计',
                                index: "2-4",
                                url: "/ProductionMonitoring/churukuchaxuntongji"
                            }
                        ]
                    },
                    {
                        label: '设备故障跟踪',
                        index: "3",
                        children: [
                            {
                                label: '设备故障处理跟踪',
                                index: "3-1",
                                url: "/ProductionMonitoring/shebeiguzhangchuligenzong"
                            }
                        ]
                    },
                    {
                        label: '设备报表',
                        index: "4",
                        children: [
                            {
                                label: '设备归属报表',
                                index: "4-1",
                                url: "/ProductionMonitoring/sbgsReportForm"
                            },
                            {
                                label: '点检不良率报表',
                                index: "4-2",
                                url: "/ProductionMonitoring/djblvReportForm"
                            },
                            {
                                label: '设备故障率报表',
                                index: "4-3",
                                url: "/ProductionMonitoring/sbgzvReportForm"
                            }
                        ]
                    },
                    {
                        label: '设备监控',
                        index: "5",
                        children: [
                            {
                                label: '设备状态实时监控图',
                                index: "5-1",
                                url: "/ProductionMonitoring/shebeizhuangtaishishijiankongtu"
                            }
                        ]
                    }
                ],
                activeIndex: '1',
            }
        },
        components: {},
        mounted() {

        },

        created() {
            this.getAdminState()
        },
        methods: {

            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                const userInfo = localStorage.getItem("userInfo");
                if (userInfo === null) {

                }
                else {
                    this.$router.push(this.navBarData[0].children[0].url);
                }
            },
            //点击前往那个子组件
            goToNavBar(index, url) {
                this.$router.push(url);
            },

            //点击导航前往哪一个页面
            handleSelect(index, url) {
                let Num = parseInt(index.substr(0, 1));
                this.num = Num - 1;
                this.$router.push(url);
            }


        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .productionMonitoring {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .productionMonitoring-nav {
            width: 100%;
            height: 10%;
            .el-menu-demo {
                display: flex;
                > div {
                    flex: 1;
                    text-align: center;
                }
                div:nth-child(3) {
                    flex: 1.2;
                    text-align: center;
                }
                div:nth-child(4) {
                    flex: 1.2;
                    text-align: center;
                }

            }

        }
        .productionMonitoring-content{
            margin-bottom: 50px;
        }

    }

    .navDivColor {
        background-color: @color-background-d;
    }

    @media only screen and (max-width: 1200px) {
        .plannedProduction {
            width: 1200px;
            .plannedProduction-nav {
                width: 1200px;
            }
            .plannedProduction-content {
                width: 1200px;
            }
        }

    }


</style>


