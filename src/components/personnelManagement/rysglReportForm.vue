<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
                <el-breadcrumb-item>人员上岗率报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索上岗率</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索上岗率" class="handle-input mr10"></el-input>
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
                    <el-button type="primary" @click="doSearch">查询报表</el-button>
                    <el-button type="success" @click="importPrinting">导出Excel</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              :height="this.tableHeight"
                              id="rebateSetTable"
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

                batch: "",
                batchOptions: [],

                select_word: '',
                examineTime: "",
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
                    let time = getNowTime();
                    let times = [];
                    for (let i = 0; i < 2; i++) {
                        times.push(time)
                    }
                    this.examineTime = times;

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
            loadingShowData(data) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "rysglbbtj"}),
                    axios.post(" " + url + "/wuliao/jinwuZhuwenpinList", {"time": data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },


            //根据时间查询
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

            }
            ,

            //导出打印
            importPrinting(){
                let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
                /* get binary string as output */
                let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '人员上岗率报表.xlsx');
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
