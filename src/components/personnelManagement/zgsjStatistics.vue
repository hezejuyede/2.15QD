<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
                <el-breadcrumb-item>在岗时间统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>筛选人员</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选人员" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>部门</span>
                        <span>:</span>
                        <el-select
                            v-model="dept"
                            style="width: 150px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择部门">
                            <el-option
                                v-for="item in deptOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
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
                    <el-button  type="primary" @click="doSearchPerson">查询</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
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
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData: [],
                examineTime: "",

                cols: [],
                tableData: [],

                deptOptions: [],
                dept: "",


                select_word: '',
                tableHeight:Number,


            }
        },
        computed: {
            //模糊检索
            tables: function () {
                var search = this.select_word;
                if (search) {
                    return this.tableData.filter(function (dataNews) {
                        return Object.keys(dataNews).some(function (key) {
                            return String(dataNews[key]).indexOf(search) > -1
                        })
                    })
                }
                return this.tableData
            }
        },
        components: {Modal},
        mounted() {


        },
        created() {
            this.getAdminState();
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
                        axios.post(" " + url + "/sysconfig/deptList"),
                    ])
                        .then(axios.spread(function (dept) {
                            that.deptOptions = dept.data;
                            that.dept = dept.data[3].id;
                            that.loadingShowData(that.dept, that.examineTime);
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

            //瞬间加载数据
            loadingShowData(data1, data2) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "zgsjtj"}),
                    axios.post(" " + url + "/timeTongji/userTimesum", {"deptid": data1, "times": data2,})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },


            //进行人员查询
            doSearchPerson() {
                this.loadingShowData(this.dept, this.examineTime);
            },

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .template {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .template-content {
            .handle-box {
                height: 80px;
                line-height: 80px;
                padding-left: 50px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width: 130px;
                    height: 35px;
                }
            }
            .del-dialog-cnt {
                font-size: 16px;
                text-align: center
            }
            .table {
                width: 100%;
                font-size: 14px;
            }
        }
    }
</style>
