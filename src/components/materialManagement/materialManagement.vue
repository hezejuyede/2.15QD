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
                        label: '物料数据',
                        index: "1",
                        children: [
                            {
                                label: '物料数据导入',
                                index: "1-1",
                                url: "/404"
                            },
                            {
                                label: '物料数据管理',
                                index: "1-2",
                                url: "/404"
                            }
                        ]
                    },
                    {
                        label: '托单金物',
                        index: "2",
                        children: [
                            {
                                label: '托单制作',
                                index: "2-1",
                                url: "/ProductionOfGoldSheets"
                            },
                            {
                                label: '托单审批',
                                index: "2-2",
                                url: "/tdApproval"
                            },
                            {
                                label: '托单查询与打印',
                                index: "2-3",
                                url: "/404"
                            },
                            {
                                label: '出库记录（托单金物）',
                                index: "2-4",
                                url: "/404"
                            },
                            {
                                label: '配送跟踪（托单金物）',
                                index: "2-5",
                                url: "/404"
                            },
                            {
                                label: '托单查询与打印',
                                index: "2-6",
                                url: "/404"
                            },
                            {
                                label: '出库记录（托单金物）',
                                index: "2-7",
                                url: "/404"
                            }
                        ]
                    },
                    {
                        label: '注文金物',
                        index: "3",
                        children: [
                            {
                                label: '缺件登记（注文金物）',
                                index: "2-1",
                                url: "/404"
                            },
                            {
                                label: '缺件跟踪（注文金物）',
                                index: "2-2",
                                url: "/404"
                            },
                            {
                                label: '缺件查询（注文金物）',
                                index: "2-3",
                                url: "/zwMetalSearch"
                            }
                        ]
                    },
                    {
                        label: '储品金物',
                        index: "4",
                        children: [
                            {
                                label: '缺件登记（储品金物）',
                                index: "4-1",
                                url: "/404"
                            },
                            {
                                label: '缺件跟踪（储品金物）',
                                index: "4-2",
                                url: "/404"
                            },
                            {
                                label: '缺件查询（储品金物）',
                                index: "4-3",
                                url: "/cpMetalSearch"
                            }
                        ]
                    },
                    {
                        label: '管材出库',
                        index: "5",
                        children: [
                            {
                                label: '管吊单查询',
                                index: "5-1",
                                url: "/pipeOutgoing"
                            }
                        ]
                    },
                    {
                        label: '未引当跟踪',
                        index: "6",
                        children: [
                            {
                                label: '注文品不足',
                                index: "6-1",
                                url: "/404"
                            },
                            {
                                label: '储品不足',
                                index: "6-2",
                                url: "/404"
                            },
                            {
                                label: '注文金物未交货',
                                index: "6-3",
                                url: "/404"
                            },
                            {
                                label: '未引当查询与统计',
                                index: "4-3",
                                url: "/404"
                            }
                        ]
                    },
                    {
                        label: '工位物料管理',
                        index: "7",
                        children: [
                            {
                                label: '加工线工位物料管理',
                                index: "7-1",
                                url: "/404"
                            },
                            {
                                label: '金物担当物料管理',
                                index: "7-2",
                                url: "/404"
                            }
                        ]
                    },
                    {
                        label: '物料报表',
                        index: "8",
                        children: [
                            {
                                label: '物料数据报表',
                                index: "8-1",
                                url: "/404"
                            },
                            {
                                label: '托单金物报表',
                                index: "8-2",
                                url: "/404"
                            },
                            {
                                label: '注文金物报表',
                                index: "8-3",
                                url: "/404"
                            },
                            {
                                label: '储品金物报表',
                                index: "8-4",
                                url: "/404"
                            },
                            {
                                label: '未引当报表',
                                index: "8-5",
                                url: "/404"
                            },
                            {
                                label: '工位物料报表',
                                index: "8-6",
                                url: "/404"
                            }
                        ]
                    },
                    {
                        label: '物料监控',
                        index: "9",
                        children: [
                            {
                                label: '物料监控图',
                                index: "9-1",
                                url: "/404"
                            }
                        ]
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
