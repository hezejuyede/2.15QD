<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>物料管理</el-breadcrumb-item>
                <el-breadcrumb-item>物料数据报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>智能检索物料数据</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索物料数据" style="width: 200px" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>批次</span>
                        <span>:</span>
                        <el-select
                            v-model="batch"
                            style="width: 150px"
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
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>工位</span>
                        <span>:</span>
                        <el-select
                            v-model="workStation"
                            style="width: 150px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in workStationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" @click="doSearch">查询报表</el-button>
                    <el-button type="success" @click="importPrinting">导出Excel</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              id="rebateSetTable"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
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
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'
    import Modal from '../../common/modal'
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

                batch: "",
                batchOptions: [],
                workStation: "",
                workStationOptions: [],

                select_word: '',


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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/getPiciList"),
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""})
                    ])
                        .then(axios.spread(function (batch,workStation) {
                            that.batchOptions = batch.data;
                            that.batch = batch.data[0].id;
                            that.workStation = workStation.data[1].id;
                            that.workStationOptions = workStation.data;
                            that.loadingShowData(that.batch);
                        }));
                }
            },

            //瞬间加载数据
            loadingShowData(data1,data2) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "gongweiwuliaobaobiao"}),
                    axios.post(" " + url + "/wuliao/jinwuZhuwenpinList", {"pici": data1,"stationid":data2})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },


            //查询
            doSearch() {
                if (this.batch) {
                    this.loadingShowData(this.batch,this.workStation)
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


            //导出打印
            importPrinting(){
                let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
                /* get binary string as output */
                let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '物料数据报表.xlsx');
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
            .red {
                color: #ff0000;
            }

        }
    }


</style>
