<template>
    <div class="materialManagement">
        <main ref="indexDiv" id="indexDiv">
            <div class="indexDiv-top ">
                <div class="indexDiv-top-left fl"></div>
                <div class="indexDiv-top-center fl">物料管理</div>
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
        </main>
    </div>
</template>
<script type="text/ecmascript-6">


    export default {
        name: 'materialManagement',
        data() {
            return {
                navBarData: [
                    {
                        icon: "iconfont icon-zhunbeiliangchan",
                        label: '物料准备',
                        id: "1",
                        url: "/MaterialManagement"
                    },
                    {
                        icon: "iconfont icon-ccgl-chukucaozuo-1",
                        label: '物料出库',
                        id: "3",
                        url: "/MaterialManagement"
                    },
                    {
                        icon: "iconfont icon-peisong2",
                        label: '物料配送',
                        id: "2",
                        url: "/MaterialManagement"
                    },
                    {
                        icon: "iconfont icon-genzong",
                        label: '领料追踪',
                        id: "4",
                        url: "/MaterialManagement"
                    },
                    {
                        icon: "iconfont icon-zhizuo",
                        label: '托单制作',
                        id: "3",
                        url: "/Warehousing"
                    },
                    {
                        icon: "iconfont icon-shenhe",
                        label: '托单审核',
                        id: "3",
                        url: "/Warehousing"
                    },
                    {
                        icon: "iconfont icon-fahang_on",
                        label: '托单发行',
                        id: "3",
                        url: "/Warehousing"
                    },
                    {
                        icon: "iconfont icon-zhuizong",
                        label: '托单追踪',
                        id: "3",
                        url: "/Warehousing"
                    },
                    {
                        icon: "iconfont icon-wei",
                        label: '为引当',
                        id: "4",
                        url: "/MaterialManagement"
                    },
                    {
                        icon: "iconfont icon-chaxun",
                        label: '查询',
                        id: "5",
                        url: "/MaterialManagement"
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
    .materialManagement{
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
            margin-left: 6%;
            height: 100px;
            margin-bottom: 5%;
            border:1px solid @color-background-dd;
            box-shadow: 2px 2px 1px @color-background-dd;
            text-align: center;
            cursor: pointer;
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

            .icon-zhunbeiliangchan {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #3EC455;

            }
            .icon-peisong2 {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #d93f30;

            }
            .icon-ccgl-chukucaozuo-1 {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: deeppink;

            }
            .icon-fahang_on {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: orangered;
            }
            .icon-shenhe {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #00d1b2;
            }
            .icon-zhizuo {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: orangered;
            }
            .icon-genzong {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: #3a8ee6;

            }
            .icon-chaxun {
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
                color: hotpink;

            }
            .icon-wei{
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
               color: #f56c6c;
            }
            .icon-zhuizong{
                display: block;
                font-size: 400%;
                margin-bottom: 20px;
               color: #07c4a8;
            }

        }
    }


</style>
