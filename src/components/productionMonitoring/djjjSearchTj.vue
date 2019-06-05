<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>点检记录查询与统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <el-input v-model="select_word" placeholder="检索点检记录" class="handle-input mr10" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>时间</span>
                        <span>:</span>
                        <el-date-picker
                            style="width: 240px"
                            v-model="examineTime"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </label>
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>生产线</span>
                        <span>:</span>
                        <el-select
                            style="width: 150px"
                            v-model="line"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSCX"
                            placeholder="请选择生产线">
                            <el-option
                                v-for="item in lineOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>工位</span>
                        <span>:</span>
                        <el-select
                            style="width: 150px"
                            v-model="workStation"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSelect"
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in workStationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>设备</span>
                        <span>:</span>
                        <el-select
                            style="width: 150px"
                            v-model="shebei"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择设备">
                            <el-option
                                v-for="item in shebeiOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="doSearch">查询</el-button>
                    <el-button type="success" icon="delete" class="handle-del mr10" @click="importExcel">导出</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <el-table-column
                            align="center"
                            prop="intime"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="shebeiname"
                            label="设备">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="bujianname"
                            label="明细">
                            <template scope="scope">
                                <el-button
                                    type="success"
                                    style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                                    @click="showMx(scope.row.id)">
                                    明细
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <!--点检明细 -->
            <el-dialog  :visible.sync="mxVisible" :fullscreen="true" :center="true">
                <div class="djDiv">
                    <el-table class="tb-edit"
                              :data="mxData"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                              border
                              height="600"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <template v-for="(col ,index) in mxCols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </el-dialog>

            <Modal :msg="message"
                   :isHideModal="HideModal"></Modal>
        </div>


    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'
    import Modal from '../../common/modal'
    import {getNowTime} from '../../assets/js/api'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData:[],
                id:"",


                cols: [],
                tableData: [],

                select_word: '',

                mxVisible:false,


                workStation:"",
                workStationOptions:[],
                line: '',
                lineOptions: [],
                examineTime:"",
                shebei: "",
                shebeiOptions: [],

                mxData:[],
                mxCols:[],
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
                    let time = getNowTime();
                    let times = [];
                    for (let i = 0; i < 2; i++) {
                        times.push(time)
                    }
                    this.examineTime = times;

                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                    ])
                        .then(axios.spread(function (line, workStation) {
                            that.lineOptions = line.data;
                            that.line = line.data[0].indexno;
                            that.workStation = workStation.data[0].id;
                            that.workStationOptions = workStation.data;
                            axios.all([
                                axios.post(" " + url + "/shebei/shebeiList", {
                                    "jiagongxian": that.line,
                                    "stationid": that.workStation
                                })
                            ])
                                .then(axios.spread(function (shebei) {
                                    that.shebei = shebei.data[0].id;
                                    that.shebeiOptions = shebei.data;
                                    that.loadingShowData(that.shebei,that.examineTime)
                                }));
                        }));

                }
            },

            //瞬间加载数据
            loadingShowData(data1,data2) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "zxdsbdjjlcx"}),
                    axios.post(" " + url + "/shebei/getShebeiRecord", {"id": data1,"times":data2})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },

            changeSCX(){
                axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line})
                    .then((res) => {
                        if (res.data ==="-1") {
                            this.workStation = "";
                            this.workStationOptions = [];
                            this.shebei = "";
                            this.shebeiOptions = [];
                        }
                        else {
                            this.workStation = res.data[0].id;
                            this.workStationOptions = res.data;
                            this.changeSelect();
                        }
                    });
            },

            //根据工位选择
            changeSelect() {
                axios.post(" " + url + "/shebei/shebeiList", {"jiagongxian": this.line, "stationid": this.workStation})
                    .then((res) => {
                        if (res.data.length > 0) {
                            this.shebei = res.data[0].id;
                            this.shebeiOptions = res.data;
                            this.changeSB();
                        }
                        else {
                            this.shebei = "";
                            this.shebeiOptions = [];
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            doSearch(){
                if (this.shebei) {
                    this.loadingShowData(this.shebei,this.examineTime)
                }
                else {
                    this.message = "请选择设备和时间";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //查看明细
            showMx(id) {
                this.mxVisible = true;
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "zxdsbdjjlcx"}),
                    axios.post(" " + url + "/shebei/getShebeiRecordDetail", {"id": id})
                ])
                    .then(axios.spread(function (title, table) {
                        that.mxCols = title.data;
                        that.mxData = table.data.data;
                    }));
            },

            //显示新增
            importExcel(){


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
                line-height:80px;
                padding-left: 20px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width:100px;
                    height: 30px;
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
