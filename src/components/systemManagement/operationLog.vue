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
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </label>
                </div>
                <div class="operationTab">
                    <el-button type="primary" @click="doSearch">查询</el-button>
                </div>
            </div>
            <div class="operationLogContentTable">
                <el-table class="tb-edit"
                          :data="tableData"
                          :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                          border
                          :height="this.tableHeight"
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
    import {getNowTime,getLestWeekTime} from '../../assets/js/api'
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
                examineTime: "",
                tableHeight:Number,

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
                    this.setTableHeight();
                    let nowTime = getNowTime();
                    let lestWeekTime= getLestWeekTime();
                    let times = [];
                    times.push(lestWeekTime);
                    times .push(nowTime);
                    this.examineTime = times;


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
            //根据屏幕设置Table高度
            setTableHeight() {
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    var H = window.screen.height;
                    this.tableHeight = H - 300 + "px";
                }
                else {
                    var h = document.body.clientHeight;
                    this.tableHeight = h - 300 + "px";
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
            border-bottom: 1px solid@color-F0;
        }
        .operationLogContent {
            .operationLogContentTab {
                height: 80px;
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
                    .el-button {
                        width: 130px;
                        height: 35px;
                    }
                }
            }
            .operationLogTable {
                padding-top: 10px;
            }

        }

    }


</style>
