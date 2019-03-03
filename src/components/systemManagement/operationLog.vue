<template>
    <div class="operationLog">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>日志管理</el-breadcrumb-item>
                <el-breadcrumb-item>运行日志</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="operationLogContent">
            <div class="operationLogContentTab">
                <div class="normalTab">
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>批次</span>
                        <span>:</span>
                        <el-select
                            v-model="batch"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            style="width: 150px"
                            placeholder="请输入或者选择批次">
                            <el-option
                                v-for="item in batchOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>

                </div>
                <div class="batchTab">
                    <div class="normalTab">
                        <label style="margin-right: 10px;margin-left: 10px">
                            <span>日志类型</span>
                            <span>:</span>
                            <el-select
                                v-model="logType"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                style="width: 150px"
                                placeholder="查询的日志">
                                <el-option
                                    v-for="item in logTypeOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                                </el-option>
                            </el-select>
                        </label>

                    </div>
                </div>
                <div class="timeTab">
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>选择查询时间</span>
                        <span>:</span>
                        <el-date-picker
                            v-model="examineTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </label>
                </div>
                <div class="operationTab">
                    <button @click="doSearch">查询</button>
                </div>
            </div>
            <div class="operationLogContentTable">
                <el-table class="tb-edit"
                          :data="tableData"
                          :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                          border
                          height="400"
                          highlight-current-row
                          style="width: 98%;margin: auto">
                    <template v-for="(col ,index) in cols">
                        <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                    </template>
                </el-table>
            </div>
        </div>
        <Modal :msg="message"
               :isHideModal="HideModal"></Modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'
    import Modal from '../../common/modal'
    import {getNowTime} from '../../assets/js/api'
    export default {
        name: 'FactoryCalendar',
        data() {
            return {
                message: '',
                HideModal: true,


                cols: [],
                tableData: [],

                batch: '',
                batchOptions: [],
                logType: "",
                logTypeOptions: "",
                examineTime: ""
            }
        },
        components: {Modal},
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
                    let time = getNowTime();
                    let times = [];
                    for (let i = 0; i < 2; i++) {
                        times.push(time)
                    }
                    this.examineTime =times;


                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/getPiciList"),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "6"})
                    ])
                        .then(axios.spread(function (batchOptions, logTypeOptions) {
                            that.batchOptions = batchOptions.data;
                            that.logTypeOptions = logTypeOptions.data;
                            that.batch=batchOptions.data[0].id;
                            that.logType=logTypeOptions.data[0].indexno;
                            axios.all([
                                axios.post(" " + url + "/sys/showTableTitle", {"name": 'rizhi'}),
                                axios.post(" " + url + "/log/showLog", {"pici": that.batch,"type":that.logType,"time":that.examineTime})
                            ])
                                .then(axios.spread(function (title, table) {
                                    if (table.data !== "-1") {
                                        that.cols = title.data;
                                        that.tableData = table.data;
                                    }
                                    else {
                                        that.cols = title.data;
                                        that.tableData = [];
                                    }
                                }));
                        }));


                }
            },


            //进行查询
            doSearch() {
                if (this.batch && this.logType &&this.examineTime) {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": 'rizhi'}),
                        axios.post(" " + url + "/log/showLog", {"pici": this.batch,"type":this.logType,"time":this.examineTime})
                    ])
                        .then(axios.spread(function (title, table) {
                            if (table.data !== "-1") {
                                that.cols = title.data;
                                that.tableData = table.data;
                            }
                            else {
                                that.cols = title.data;
                                that.tableData = [];
                            }
                        }));
                }
                else {
                    this.message = "请选择日志和批次和时间";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }

            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less"j>
    @import "../../assets/less/base";

    .operationLog {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .operationLogContent {
            .operationLogContentTab {
                height: 100px;
                display: flex;
                .normalTab {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .batchTab {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                }
                .timeTab {
                    flex: 2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .operationTab {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    button {
                        width: 50%;
                        height: 35px;
                        text-align: center;
                        line-height: 35px;
                        border: none;
                        border-radius: 10%;
                        background-color: @color-blue;
                        color: @color-white;
                        font-size: 16px;
                        margin-left: 5%;
                    }
                }
            }
            .operationLogTable {
                padding-top: 10px;
            }

        }

    }


</style>
