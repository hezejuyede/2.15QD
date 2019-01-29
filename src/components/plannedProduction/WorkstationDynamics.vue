<template>
    <div class="production">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>管工查询</el-breadcrumb-item>
                <el-breadcrumb-item>工位动态</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="productionContent">
            <div class="productionContentTable">
                <div class="tableDiv" v-for="(item,index) in tableData">
                    <div class="tableDivTop">{{item.workStation}}</div>
                    <div class="tableDivBottom">
                        <div class="tableTemplate" v-for="(item,index) in item.table">
                            <div class="tableTemplate-title">{{item.title}}</div>
                            <div class="tableTemplate-number">{{item.number}}</div>
                            <div class="tableTemplate-jd">{{item.jd}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import Modal from '../../common/modal'
    import url from '../../assets/js/URL'

    export default {
        name: 'FactoryCalendar',
        data() {
            return {
                tableData:[]
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
                    this.$router.push("/")
                }
                else {
                    axios.post(" " + url + "/dynamic/getStationDynamicList")
                        .then((res) => {
                            this.tableData = res.data
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            }





        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";
    .production{
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs{
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
            border-bottom: 1px solid @color-bg-hei;
        }
        .productionContent {
            .productionContentTab {
                height: 100px;
                display: flex;
                border-bottom: 1px solid @color-background-d;
                .batchTab{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 1%;

                }
                .operationTab {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .el-button {
                        width: 40%;
                        height: 35px;
                        text-align: center;
                        line-height: 35px;
                        border: none;
                        border-radius: 10%;
                        background-color: @color-blue;
                        color: @color-white;
                        font-size: 16px;
                    }
                }
            }
            .productionContentTable {
                width: 90%;
                margin: 0 auto;
                .tableDiv {
                    border-left: 1px solid @color-background-d;
                    border-top: 1px solid @color-background-d;
                    border-bottom: 1px solid @color-background-d;
                    margin: 20px auto;

                    .tableDivTop {
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-right: 1px solid @color-background-d;
                        font-size: @font-size-large-xxx;
                        color: @color-background-dd;

                    }
                    .tableDivBottom {
                        display: flex;
                        .tableTemplate {
                            width: 25%;
                            height: 150px;
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-direction: column;
                            font-size: @font-size-small;
                            color: @color-background-dd;
                            .tableTemplate-number {
                                width: 100%;
                                height: 33%;
                                border-right: 1px solid @color-background-d;
                                border-bottom: 1px solid @color-background-d;
                                display: flex;
                                align-items: center;
                                justify-content: center;

                            }
                            .tableTemplate-title {
                                width: 100%;
                                height: 33%;
                                background-color: @color-bg-lan;
                                color: @color-white;
                                border-right: 1px solid @color-background-d;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            .tableTemplate-jd {
                                width: 100%;
                                height: 33%;
                                border-right: 1px solid @color-background-d;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }

                        }
                    }
                }

            }




        }

    }



</style>
