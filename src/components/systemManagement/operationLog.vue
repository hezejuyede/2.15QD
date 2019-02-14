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
                        <el-select
                            v-model="batch"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择批次">
                            <el-option
                                v-for="item in batchOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                </div>
                <div class="batchTab">
                    <div class="normalTab">
                        <el-select
                            v-model="logType"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请查询的日志">
                            <el-option
                                v-for="item in logTypeOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="timeTab">
                    <el-date-picker
                        v-model="examineTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="operationTab">
                    <button @click="doSearch">查询</button>
                </div>
            </div>
            <div class="operationLogContentTable">
                <el-table class="tb-edit"
                          :data="tableData"
                          :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'14px'}"
                          border
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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/getPiciList"),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "6"})
                    ])
                        .then(axios.spread(function (batchOptions, logTypeOptions) {
                            that.batchOptions = batchOptions.data;
                            that.logTypeOptions = logTypeOptions.data;
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
                            } else {
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
            padding-top: 10px;
            height: 450px;
            padding-bottom: 10px;
            overflow-y: auto;
            .operationLogContentTab {
                height: 100px;
                display: flex;
                border-bottom: 1px solid @color-background-d;
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
