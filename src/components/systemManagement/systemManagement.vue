<template>
    <div class="systemManagement">
        <div ref="indexDiv" id="indexDiv">
            <div class="indexDiv-top ">
                <div class="indexDiv-top-left fl"></div>
                <div class="indexDiv-top-center fl">系统管理</div>
                <div class="indexDiv-top-right fl"></div>
            </div>
            <div class="indexDiv-bottom clearfix">
                <div class="nav-div fl" v-for="(item,index) in navBarData" @click="goToNavBar(index,item.url)">
                    <div class="indexDivText">
                        <i :class=" item.icon"></i>
                        <span>{{item.label}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">


    export default {
        name: 'systemManagement',
        data() {
            return {

                navBarData: [
                    {
                        icon: "iconfont icon-quanxian",
                        label: '权限管理',
                        id: "1",
                        url: "/"
                    },
                    {
                        icon: "iconfont icon-note",
                        label: '日志管理',
                        id: "2",
                        url: "/ProductionScheduling"
                    },
                    {
                        icon: "iconfont icon-jiekou",
                        label: '系统接口',
                        id: "3",
                        url: "/SecurityManagement"
                    },
                    {
                        icon: "iconfont icon-chaxun",
                        label: '查询',
                        id: "4",
                        url: "/ProductionScheduling"
                    }
                ]

            }
        },
        components: {},
        mounted() {


        },
        created() {


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


        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .systemManagement {
        width: 100%;
        height: 100%;
        background-color: @color-white;
    }

    .indexDiv-top {
        height: 20px;
        margin-bottom:50px;
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
            border: 1px solid @color-background-dd;
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
            }
            .icon-quanxian {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #ffcd32;

            }
            .icon-note {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #3EC455;

            }
            .icon-jiekou {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: deeppink;

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
