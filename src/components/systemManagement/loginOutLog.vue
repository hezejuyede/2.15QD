<template>
    <div class="loginOutLog">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>日志管理</el-breadcrumb-item>
                <el-breadcrumb-item>登录日志</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="loginOutLogContent">
            <div class="loginOutLogContentTab">
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
            <div class="loginOutLogContentTable">
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
                username:"",
                cols: [],
                tableData: [],
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
                const Info = JSON.stringify(userInfo);
                this.username = Info.username;
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
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "login"}),
                        axios.post(" " + url + "/log/showLoginLog", {
                            "time": this.examineTime,
                            "loginname": this.username
                        })
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
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
                if (this.examineTime) {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "login"}),
                        axios.post(" " + url + "/log/showLoginLog", {
                            "time": this.examineTime,
                            "loginname": this.username
                        })
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
                    this.message = "请选择查询时间";
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
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .loginOutLog {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
            border-bottom: 1px solid@color-F0;
        }
        .loginOutLogContent {
            .loginOutLogContentTab {
                height: 80px;
                display: flex;
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
            .loginOutLogTable {
                padding-top: 10px;
            }

        }

    }


</style>
