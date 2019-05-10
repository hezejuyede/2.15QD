<template>
    <div class="production">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>管工查询</el-breadcrumb-item>
                <el-breadcrumb-item>工位动态</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="productionContent">
            <div class="handle-box">
                <label style="margin-right: 10px;margin-left: 10px">
                    <span>选择批次</span>
                    <span>:</span>
                    <el-select
                        v-model="batch"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择批次">
                        <el-option
                            v-for="item in batchOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </label>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="doSearch">查询</el-button>
            </div>
            <div class="contentDiv">
                <div class="productionContentTable clearfix">
                    <div class="productionContentTableLeft fl">
                        {{batch}}
                    </div>
                    <div class="productionContentTableRight fr">
                        <div class="tableDiv" v-for="(item,index) in tableData">
                            <div class="tableDivTop">{{item.workStation}}</div>
                            <div class="tableDivBottom">
                                <div class="tableTemplate" v-for="(item1,index) in item.table"  @click="showModal(index,item1.stationid)">
                                    <div class="tableTemplate-title">{{item1.title}}</div>
                                    <div class="tableTemplate-number">{{item1.number}}</div>
                                    <div class="tableTemplate-jd">{{item1.jd}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--新增弹出框 -->
        <el-dialog title="工位列表" :visible.sync="excelVisible" width="100%" :fullscreen="true" :center="true"
                   @close='closeDialog'>
            <el-table
                class="tb-edit"
                :data="tableData2"
                :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'14px'}"
                border
                height="600"
                highlight-current-row
                style="width: 98%;margin: auto">
                <template v-for="(col ,index) in cols">
                    <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                </template>
            </el-table>
        </el-dialog>
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
                tableData: [],
                batch: "",
                batchOptions: [],
                excelVisible: false,
                cols: [],
                tableData2: [],
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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/getPiciList"),
                    ])
                        .then(axios.spread(function (select) {
                            that.batchOptions = select.data;
                            that.batch = select.data[0].id;
                            that.loadingShowData(that.batch);
                        }));
                }
            },

            //瞬间加载数据
            loadingShowData(data) {
                axios.post(" " + url + "/dynamic/getStationDynamicList", {"pici": data})
                    .then((res) => {
                        this.tableData = res.data
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },


            //进行查询
            doSearch() {
                if (this.batch) {
                    this.loadingShowData(this.batch)
                }
                else {
                    this.message = "查询批次不能为空";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },


            //显示表格
            showModal(index,stationid) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "gwdtbt"}),
                    axios.post(" " + url + "/dynamic/getStationDynamicListDetail", {
                        "pici": this.batch,
                        "stationid": stationid,
                        "type": index+1
                    })
                ])
                    .then(axios.spread(function (title, table) {
                        that.excelVisible = true;
                        that.cols = title.data;
                        that.tableData2 = table.data.data;
                    }));
            },

            //弹框关闭重新加载数据
            closeDialog() {
                this.loadingShowData(this.batch)
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .production {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
            border-bottom: 1px solid @color-bg-hei;
        }
        .productionContent {
            .handle-box {
                height: 80px;
                line-height: 80px;
                padding-left: 50px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width: 100px;
                    height: 30px;
                }
            }
            .contentDiv {
                height: 550px;
                overflow: auto;
            }
        ;

            .productionContentTable {
                height: 450px;
                line-height: 244px;
                margin-top: 10px;
                .productionContentTableLeft {
                    width: 10%;
                    height: 450px;
                    line-height: 450px;
                    text-align: center;
                    font-size: @font-size-large;

                }
                .productionContentTableRight {
                    width: 90%;
                    .tableDiv {
                        width: 24%;
                        float: left;
                        border-left: 1px solid @color-background-d;
                        border-top: 1px solid @color-background-d;
                        border-bottom: 1px solid @color-background-d;
                        margin: 10px 0.25%;
                        .tableDivTop {
                            height:50px;
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
                                cursor: pointer;
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
                                    background-color: @color-F0;
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
