<template>
    <div class="PlannedProduction">
        <main id="indexDiv">
            <div class="indexDiv-top ">
                <div class="indexDiv-top-left fl"></div>
                <div class="indexDiv-top-center fl">计划排产</div>
                <div class="indexDiv-top-right fl"></div>
            </div>
            <div class="indexDiv-bottom clearfix">
                <div class="nav-div fl" v-for="(item,index) in navBarData"
                     @click="goToNavBar(index,item.url)">
                    <div class="indexDivText">
                        <i :class=" item.icon"></i>
                        <span>{{item.label}}</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script type="text/ecmascript-6">


    export default {
        name: 'PlannedProduction',
        data() {
            return {
                navBarData: [
                    {
                        icon: "iconfont icon-chuan1",
                        label: ' 船型设置',
                        id: "1",
                        url: "/ShipType"
                    },
                    {
                        icon: "iconfont icon-linecar111",
                        label: '工序管理',
                        id: "2",
                        url: "/WorkingProcedure"
                    },
                    {
                        icon: "iconfont icon-rizhi",
                        label: '工艺路线',
                        id: "3",
                        url: "/ProcessRoute"
                    },
                    {
                        icon: "iconfont icon-zhilianganquan",
                        label: '工作日历',
                        id: "4",
                        url: "/FactoryCalendar"
                    },
                    {
                        icon: "iconfont icon-moxing",
                        label: '资源模型',
                        id: "5",
                        url: "/ResourceModel"
                    },
                    {
                        icon: "iconfont icon-daoru-tianchong",
                        label: ' 信息导入',
                        id: "1",
                        url: "/InformationImport"
                    },
                    {
                        icon: "iconfont icon-xiafashuju",
                        label: '任务发行',
                        id: "8",
                        url: "/Planned"
                    },
                    {
                        icon: "iconfont icon-tiaodu",
                        label: '计划调度',
                        id: "9",
                        url: "/WorksheetPlanning"
                    },
                    {
                        icon: "iconfont icon-chaxun",
                        label: '计划查询',
                        id: "11",
                        url: "/"
                    }
                ]
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
                const userInfo = sessionStorage.getItem("userInfo");
                if (userInfo === null) {

                }
                else {


                }
            },
            //点击前往那个子组件
            goToNavBar(index, url) {
                this.$router.push(url);
            }


        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .PlannedProduction {
        width: 100%;
        height: 100%;
        background-color: @color-white;
    }

    .indexDiv-top {
        height: 50px;
        .indexDiv-top-left {
            height: 1px;
            width: 5%;
            margin-top: 25px;
            background-color: #303133;
        }
        .indexDiv-top-center {
            width: 10%;
            margin-top: 15px;
            text-align: center;
        }
        .indexDiv-top-right {
            height: 1px;
            width: 85%;
            margin-top: 25px;
            background-color: #303133;
        }
    }

    .indexDiv-bottom {
        width: 70%;
        margin-top: 20px;
        .nav-div {
            width: 15%;
            margin-left: 6%;
            height: 100px;
            margin-bottom: 5%;
            text-align: center;
            cursor: pointer;
            border:1px solid @color-background-dd;
            box-shadow: 2px 2px 1px @color-background-dd;
            border-radius: 10%;
            .indexDivText {
                margin-top: 20px;
                width: 100%;
                height: 60px;
                line-height: 30px;
            }
            i {
                display: block;
                font-size: 200%;
                margin-bottom: 5px;
            }
            span {
                display: block;
                color: @color-background-dddd;
            }
            .icon-chuan1{
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #3a8ee6;
            }
            .icon-daoru-tianchong {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #ffcd32;

            }
            .icon-linecar111 {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #3EC455;

            }
            .icon-rizhi {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #d93f30;

            }
            .icon-zhilianganquan {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: cadetblue;

            }
            .icon-moxing {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: chartreuse;

            }
            .icon-gouwuche-copy {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: deeppink;

            }
            .icon-dingdan {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: brown;

            }
            .icon-xiafashuju {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: blueviolet;
            }
            .icon-tiaodu {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: chocolate;

            }
            .icon-change {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: darkmagenta;

            }
            .icon-chaxun {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: hotpink;

            }

        }
    }


</style>
