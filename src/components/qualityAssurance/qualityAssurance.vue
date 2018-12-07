<template>
    <div class="qualityAssurance">
        <main ref="indexDiv" id="indexDiv">
            <div class="indexDiv-top ">
                <div class="indexDiv-top-left fl"></div>
                <div class="indexDiv-top-center fl">质量管理</div>
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
        name: 'qualityAssurance',
        data() {
            return {
                num: Number,
                navBarData: [
                    {
                        icon: "iconfont icon-shigupanding",
                        label: '质量评定',
                        id: "3",
                        url: "/SecurityManagement"
                    },
                    {
                        icon: "iconfont icon-quexian",
                        label: ' 缺陷记录',
                        id: "1",
                        url: "/"
                    },
                    {
                        icon: "iconfont icon-fanxiu",
                        label: '返修记录',
                        id: "2",
                        url: "/ProductionScheduling"
                    },

                    {
                        icon: "iconfont icon-youhuiquanguanli-",
                        label: '工位不具合反馈',
                        id: "4",
                        url: "/QualityAssurance"
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
    .qualityAssurance{
        width: 100%;
        height: 100%;
        background-color: @color-white;
    }

    .indexDiv-top {
        height: 50px;
        margin-bottom: 20px;
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
            margin-left:6%;
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
            }

            .icon-quexian {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #3EC455;

            }
            .icon-fanxiu{
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #d93f30;

            }
            .icon-shigupanding {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: cadetblue;

            }
            .icon-youhuiquanguanli- {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: hotpink;

            }

        }
    }


</style>

