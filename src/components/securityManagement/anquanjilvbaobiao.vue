<template>
    <div class="editorTemplate">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>安全管理</el-breadcrumb-item>
                <el-breadcrumb-item>安全记录报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="editorTemplate-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <el-input v-model="select_word" placeholder="筛选记录查询" class="handle-input mr10" style="width: 150px"></el-input>
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
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>生产线</span>
                        <span>:</span>
                        <el-select
                            style="width: 120px"
                            v-model="line"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSCX"
                            placeholder="选择生产线">
                            <el-option
                                v-for="item in lineOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>工位</span>
                        <span>:</span>
                        <el-select
                            style="width: 120px"
                            v-model="select"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in selectOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary"   @click="doSearch">查询</el-button>
                    <el-button type="success"   @click="importExcel">导出</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:' rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                              border
                              height="400"
                              id="rebateSetTable"
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
    import {getNowTime} from '../../assets/js/api'


    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,



                cols: [],
                tableData: [],

                select_word: '',

                examineTime:"",


                line: '',
                lineOptions: [],

                select:"",
                selectOptions: [],



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
                            that.select= workStation.data[0].id;
                            that.selectOptions = workStation.data;
                            that.loadingShowData(1)

                        }));
                }
            },

            //根据下拉显示数据
            loadingShowData(data){
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "anquanjilvbaobiao"}),
                    axios.post(" " + url + "/sysconfig/showNoticeList", {"id": data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },

            //更改生产线
            changeSCX() {
                axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line})
                    .then((res) => {
                        if (res.data ==="-1") {
                            this.select = "";
                            this.selectOptions = [];
                        }
                        else {
                            this.select = res.data[0].id;
                            this.selectOptions = res.data;
                        }
                    });
            },


            //查询
            doSearch(){
                if (this.select) {
                    this.loadingShowData(this.select)
                }
                else {
                    this.message = "请选择要查询的工位";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }

            },

            //导出Excel
            importExcel(){
                let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
                /* get binary string as output */
                let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '安全记录报表.xlsx');
                } catch (e)
                {
                    if (typeof console !== 'undefined')
                        console.log(e, wbout)
                }
                return wbout
            }


        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .editorTemplate {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .editorTemplate-content {
            .handle-box {
                height: 80px;
                line-height: 80px;
                padding-left: 20px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width: 100px;
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
        .container {
            .containerDivTop{
                padding-left: 10%;
                .containerDivTop1{
                    height: 50px;
                    display: flex;
                    align-items: center;
                }
                .containerDivTop2{
                    height: 50px;
                    display: flex;
                    align-items: center;
                }
                .containerDivTop3{
                    height: 50px;
                    display: flex;
                    align-items: center;
                }
            }
            .containerDiv {
                width: 100%;
                height: 100%;
                .quill-editor {
                    border-bottom: 1px solid @color-bg-hei;
                }
                .containerDivBtn {
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .el-button {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 30%;
                        height: 35px;
                        margin-left: 2%;
                        cursor: pointer;
                    }
                }
            }
        }
    }


</style>
