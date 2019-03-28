<template>
    <div class="plannedProduction">
        <div class="plannedProduction-nav">
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
        <div class="plannedProduction-content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">


    export default {
        name: 'plannedProduction',
        data() {
            return {
                num: 0,
                navBarData: [
                    {
                        label: '人员权限设置',
                        index: "1",
                        children: [
                            {
                                label: '部门设定',
                                index: "1-1",
                                url: "/DepartmentManagement"
                            },
                            {
                                label: '角色设定',
                                index: "1-2",
                                url: "/RoleManagement"
                            },
                            {
                                label: '岗位设定',
                                index: "1-3",
                                url: "/PostManagement"
                            },
                            {
                                label: '人员设定',
                                index: "1-4",
                                url: "/PersonnelSetting"
                            },
                        ]
                    },
                    {
                        label: '上岗资质管理',
                        index: "2",
                        url: "/404",
                      /*  children: [
                            {
                                label: '人员资质设定',
                                index: "2-1",
                                url: "/404"
                            },
                            {
                                label: "加工线内部误作",
                                index: "2-2",
                                url: "/404"
                            }
                        ]*/
                    },
                    {
                        label: '人员绩效跟踪',
                        index: "3",
                        url: "/404",
                      /*  children: [
                            {
                                label: '人员工作记录查询',
                                index: "3-1",
                                url: "/404"
                            },
                            {
                                label: '人员不良记录统计',
                                index: "3-2",
                                url: "/404"
                            },
                            {
                                label: '人员作业效率跟踪',
                                index: "3-3",
                                url: "/404"
                            }
                        ]*/
                    },
                    {
                        label: '人员报表',
                        index: "4",
                        url: "/404",
                        /*children: [
                            {
                                label: '人员资质报表',
                                index: "4-1",
                                url: "/404"
                            },
                            {
                                label: '人员上岗率报表',
                                index: "4-2",
                                url: "/404"
                            },
                            {
                                label: '不良记录报表',
                                index: "4-3",
                                url: "/404"
                            },
                            {
                                label: '人员效率报表',
                                index: "4-4",
                                url: "/404"
                            },
                            {
                                label: '人员总体绩效评估报表',
                                index: "4-5",
                                url: "/404"
                            }
                        ]*/
                    },
                    {
                        label: '人员监控',
                        index: "5",
                        url: "/404",
                    /*    children: [
                            {
                                label: '人员动态分布图',
                                index: "5-1",
                                url: "/404"
                            }
                        ]*/
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

    .plannedProduction {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .plannedProduction-nav {
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
        .plannedProduction-content{
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


