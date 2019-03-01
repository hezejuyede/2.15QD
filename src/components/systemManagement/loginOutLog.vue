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
                    <button @click="doSearch">查询</button>
                </div>
            </div>
            <div class="loginOutLogContentTable">
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
                username:"",
                cols: [],
                tableData: [],
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
                const Info = JSON.stringify(userInfo);
                this.username = Info.username;
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
        }
        .loginOutLogContent {
          margin-top: 10px;
            .loginOutLogContentTab {
                height: 100px;
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
            .loginOutLogTable {
                padding-top: 10px;
            }

        }

    }


</style>
