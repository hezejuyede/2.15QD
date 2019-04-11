<template>
    <div class="production">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>管工查询</el-breadcrumb-item>
                <el-breadcrumb-item>工位动态</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="productionContent">
           <div class="contentDiv">
               <div class="productionContentTable clearfix">
                   <div class="productionContentTableLeft fl">
                       20190411
                   </div>
                   <div class="productionContentTableRight fr">
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
            .contentDiv{
               height: 550px;
                overflow: auto;
            };

            .productionContentTable {
                height: 244px;
                background-color: @color-F0;
                line-height: 244px;
                margin-top: 10px;
                .productionContentTableLeft{
                    width: 10%;
                    height:244px;
                    line-height: 244px;
                    text-align: center;
                    font-size: @font-size-large;
                }
                .productionContentTableRight{
                    width: 90%;
                    .tableDiv {
                        width: 16%;
                        float: left;
                        border-left: 1px solid @color-background-d;
                        border-top: 1px solid @color-background-d;
                        border-bottom: 1px solid @color-background-d;
                        margin: 10px  0.25%;
                        .tableDivTop {
                            height: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-right: 1px solid @color-background-d;
                            font-size: @font-size-large;
                            color: @color-background-dd;

                        }
                        .tableDivBottom {
                            display: flex;
                            .tableTemplate {
                                width: 25%;
                                height: 80px;
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                                font-size: @font-size-small-s;
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
                                    background-color: @color-bg-lv;
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

    }



</style>
