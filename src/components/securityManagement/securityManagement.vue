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
                        label: '上岗离岗提醒',
                        index: "1",
                        children: [
                            {
                                label: '登录安全提醒',
                                index: "1-1",
                                url: "/SecurityManagement/LoginSecurityAlert"
                            },
                            {
                                label: '离岗安全确认',
                                index: "2-1",
                                url: "/SecurityManagement/liganganquanqueren"
                            }
                        ]
                    },
                    {
                        label: '安全提醒推送',
                        index: "2",
                        children: [
                            {
                                label: '提醒内容制作与发布',
                                index: "2-1",
                                url: "/SecurityManagement/tixingnrirongzhizuofabu"
                            },
                            {
                                label: '提醒内容手动发布',
                                index: "2-2",
                                url: "/SecurityManagement/anquanyaodianneirongshougong"
                            },
                            {
                                label: '安全提醒的查询与统计',
                                index: "2-3",
                                url: "/SecurityManagement/anquantixingchaxuntongji"
                            }
                        ]
                    },
                    {
                        label: '安全基准学习',
                        index: "3",
                        children: [
                            {
                                label: '安全基准上传',
                                index: "3-1",
                                url: "/SecurityManagement/anquanjizhunshangchuan"
                            },
                            {
                                label: '学习指示下达',
                                index: "3-2",
                                url: "/SecurityManagement/anquanxuexizhibaoxiada"
                            },
                            {
                                label: '学习报告统计',
                                index: "3-3",
                                url: "/SecurityManagement/anquanxuexibaogaotongji"
                            }
                        ]
                    },
                    {
                        label: '安全记录',
                        index: "4",
                        children: [
                            {
                                label: '安全记录分类',
                                index: "4-1",
                                url: "/SecurityManagement/anquanjilvfenlei"
                            },
                            {
                                label: '安全记录登记',
                                index: "4-2",
                                url: "/SecurityManagement/anquanjilvdengji"
                            },
                            {
                                label: '安全记录查询与统计',
                                index: "4-3",
                                url: "/SecurityManagement/anquanjilvchaxuntongji"
                            },
                        ]
                    },
                    {
                        label: '安全报表',
                        index: "5",
                        children: [
                            {
                                label: '安全提醒报表',
                                index: "5-1",
                                url: "/SecurityManagement/anquantixingbaobiao"
                            },
                            {
                                label: '安全基准报表',
                                index: "5-2",
                                url: "/SecurityManagement/anquanjizhunbaobiao"
                            },
                            {
                                label: '安全记录报表',
                                index: "5-3",
                                url: "/SecurityManagement/anquanjilvbaobiao"
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

