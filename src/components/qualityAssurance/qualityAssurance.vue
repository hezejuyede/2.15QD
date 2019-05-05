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
                        label: '不具合跟踪',
                        index: "1",
                        children: [
                           /* {
                                label: '设计不具合异常',
                                index: "1-1",
                                url: "/404"
                            },
                            {
                                label: '图面工艺不具合异常',
                                index: "1-2",
                                url: "/404"
                            },
                            {
                                label: ' 产品不具合异常',
                                index: "1-3",
                                url: "/404"
                            },
                            {
                                label: '前道工序不具合异常',
                                index: "1-4",
                                url: "/404"
                            },*/
                            {
                                label: '不具合查询与统计',
                                index: "1-5",
                                url: "/QualityAssurance/ExceptionQuery"
                            }
                        ]
                    },
                    {
                        label: '误作跟踪',
                        index: "2",
                        url: "/404",
                        /*children: [
                            {
                                label: '客户反馈的误作',
                                index: "2-1",
                                url: "/404"
                            },
                            {
                                label: "加工线内部误作",
                                index: "2-2",
                                url: "/404"
                            },
                            {
                                label: '误作查询与统计',
                                index: "2-3",
                                url: "/404"
                            }
                        ]*/
                    },
                    {
                        label: '船东船级意见反馈',
                        index: "3",
                        url: "/404",
                       /* children: [
                            {
                                label: '船东意见反馈',
                                index: "3-1",
                                url: "/404"
                            },
                            {
                                label: '船级意见反馈',
                                index: "3-2",
                                url: "/404"
                            }
                        ]*/
                    },
                    {
                        label: '作业工位质量记录',
                        index: "4",
                        url: "/404",
                      /*  children: [
                            {
                                label: '常规自检记录',
                                index: "4-1",
                                url: "/404"
                            },
                            {
                                label: '工作管精度管理记录',
                                index: "4-1",
                                url: "/404"
                            },
                            {
                                label: '质量记录查询与统计',
                                index: "4-1",
                                url: "/404"
                            }
                        ]*/
                    },
                    {
                        label: '质量提醒推送',
                        index: "5",
                        url: "/404",
                        children: [
                            {
                                label: '作业者要点内容',
                                index: "5-1",
                                url: "/QualityAssurance/OperatorMainPoints"
                            },
                           /* {
                                label: '质量提醒查阅',
                                index: "5-2",
                                url: "/404"
                            },
                            {
                                label: '质量提醒的修改与撤销',
                                index: "5-3",
                                url: "/404"
                            }
                            ,
                            {
                                label: '质量提醒的查询与统计',
                                index: "5-4",
                                url: "/404"
                            }*/
                        ]
                    },
                    {
                        label: '质量基准学习',
                        index: "6",
                        url: "/404",
                      /*  children: [
                            {
                                label: '作业基准上传',
                                index: "6-1",
                                url: "/404"
                            },
                            {
                                label: '学习指示下达',
                                index: "6-2",
                                url: "/404"
                            },
                            {
                                label: '学习报告统计',
                                index: "6-3",
                                url: "/404"
                            }
                        ]*/

                    },
                    {
                        label: '质量报表',
                        index: "7",
                        url: "/404",
                       /* children: [
                            {
                                label: '不具合报表',
                                index: "7-1",
                                url: "/404"
                            },
                            {
                                label: '误作报表',
                                index: "7-2",
                                url: "/404"
                            },
                            {
                                label: '船东船级意见报表',
                                index: "7-3",
                                url: "/404"
                            },
                            {
                                label: '质量提醒报表',
                                index: "7-2",
                                url: "/404"
                            },
                            {
                                label: '质量记录报表',
                                index: "7-3",
                                url: "/404"
                            },
                            {
                                label: '质量提醒报表',
                                index: "7-2",
                                url: "/404"
                            },
                            {
                                label: '质量基准报表',
                                index: "7-3",
                                url: "/404"
                            }
                        ]*/
                    },
                    {
                        label: '质量监控',
                        index: "8",
                        url: "/404",
                       /* children: [
                            {
                                label: '质量监控综合地图',
                                index: "8-1",
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
                div:nth-child(3){
                    flex: 1.2;
                    text-align: center;
                }
                div:nth-child(4){
                    flex: 1.2;
                    text-align: center;
                }

            }

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

