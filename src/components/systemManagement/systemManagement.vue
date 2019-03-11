<template>
    <div class="plannedProduction">
        <div class="plannedProduction-nav">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <div  v-for="(item,index) in navBarData"  :class="{'navDivColor':index === num}">
                    <el-submenu :index="item.index">
                        <template slot="title">{{item.label}}</template>
                        <div class="" v-for="(item ,index) in item.children" @click=" handleSelect(item.index,item.url)">
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
                num:0,
                navBarData: [
                    {
                        label: '日志管理',
                        index: "1",
                        children: [
                            {
                                label: '运行日志',
                                index: "1-1",
                                url: "/OperationLog"
                            },
                            {
                                label: '登录日志',
                                index: "1-2",
                                url: "/LoginOutLog"
                            }
                        ]
                    },
                    {
                        label: '系统配置',
                        index: "2",
                        children: [
                            {
                                label: '字典管理',
                                index: "2-1",
                                url: "/DictionaryMaintenance"
                            },
                            {
                                label: '表头维护',
                                index: "2-2",
                                url: "/HeaderMaintenance"
                            },
                            {
                                label: '作业记录',
                                index: "2-3",
                                url: "/ListDetails"
                            },
                            {
                                label: '按钮配置',
                                index: "2-3",
                                url: "/ButtonConfiguration"
                            },
                            {
                                label: '详情头部配置',
                                index: "2-4",
                                url: "/DetailsTextConfiguration"
                            },
                            {
                                label: '筛选条件配置',
                                index: "2-5",
                                url: "/ScreeningConditionsConfiguration"
                            },
                            {
                                label: '执行端表头配置',
                                index: "2-6",
                                url: "/ExecuteHeaderConfiguration"
                            }
                        ]
                    },
                    {
                        label: '接口管理',
                        index: "3",
                        children: []
                    },
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
                let Num = parseInt(index.substr(0,1));
                this.num = Num-1;
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
            .plannedProduction-nav{
                width: 1200px;
            }
            .plannedProduction-content{
                width: 1200px;
            }
        }

    }


</style>

