<template>
    <div class="production">
        <ImportData
            :showImportData="showImportData"
            :listId="id"
            v-on:importDataClose="importDataClose">
        </ImportData>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>管工查询</el-breadcrumb-item>
                <el-breadcrumb-item>生产进度</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="productionContent">
            <div class="productionContentTab">
                <div class="batchTab">
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
                    <el-input v-model="ch" placeholder="请输入船号"></el-input>
                </div>
                <div class="batchTab">
                    <el-input v-model="ygh" placeholder="请输入一贯号"></el-input>
                </div>
                <div class="batchTab">
                    <el-input v-model="code" placeholder="请输入CODE号"></el-input>
                </div>
                <div class="batchTab">
                    <el-input v-model="pie" placeholder="请输入PIE"></el-input>
                </div>
                <div class="operationTab">
                    <el-button type="primary" @click="doSearch">查询</el-button>
                </div>
            </div>
            <div class="productionContentTable">
                <el-table
                    :data="tableData"
                    :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                    border
                    :height="this.tableHeight"
                    @row-click="clickTable"
                    style="width: 95%;margin: 0 auto">
                    <el-table-column
                        prop="shipcode"
                        label="船号"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="pici"
                        label="批次"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="yiguanno"
                        label="一贯号"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="xitong"
                        label="CODE号"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="hou"
                        label="PIE"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="curstationname"
                        label="当前工序"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="当前状态"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import Modal from '../../common/modal'
    import url from '../../assets/js/URL'
    import ImportData from '../../common/jdModal'

    export default {
        name: 'FactoryCalendar',
        data() {
            return {
                ch: "",
                ygh: "",
                code: "",
                pie: "",
                batch: "",
                batchOptions: [],

                cols: [],
                tableData: [],

                showImportData: true,
                id: "",
                tableHeight:Number,


            }
        },
        components: {ImportData},
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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/getPiciList")
                    ])
                        .then(axios.spread(function (batchOptions) {
                            that.batchOptions = batchOptions.data;
                            that.batch = batchOptions.data[0].id;
                            axios.post(" " + url + "/shengchan/getCurStatusList",
                                {
                                    "pici": that.batch,
                                    "shipcode": that.ch,
                                    "yiguanhao": that.ygh,
                                    "xitong": that.code,
                                    "hou": that.pie
                                }
                            )
                                .then((res) => {
                                    that.tableData = res.data
                                })
                                .catch((err) => {
                                    console.log(err)
                                })

                        }));
                }
            },

            //根据屏幕设置Table高度
            setTableHeight() {
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    var H = window.screen.height;
                    this.tableHeight = H - 320 + "px";
                }
                else {
                    var h = document.body.clientHeight;
                    this.tableHeight = h - 320 + "px";
                }

            },

            //点击表格
            clickTable(row, column, cell, event) {
                this.showImportData = false;
                this.id = row.id;
            },

            //进行查询
            doSearch() {
                axios.post(" " + url + "/shengchan/getCurStatusList",
                    {
                        "pici": this.batch,
                        "shipcode": this.ch,
                        "yiguanhao": this.ygh,
                        "xitong": this.code,
                        "hou": this.pie
                    }
                )
                    .then((res) => {
                        this.tableData = res.data
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },


            //关闭消息页面
            importDataClose(val) {
                this.showImportData = val;
            },

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .production {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .productionContent {
            .productionContentTab {
                height: 100px;
                display: flex;
                .batchTab {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 1%;

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
            .productionContentTable {

            }

        }

    }


</style>
