<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>计划排产</el-breadcrumb-item>
                <el-breadcrumb-item>导入数据审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索按钮</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索按钮" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>批次</span>
                        <span>:</span>
                        <el-select
                            v-model="batch"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSelect"
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in batchOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" @click="doSearchData">查询</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              height="500"
                              border
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'15px'}"
                              :span-method="arraySpanMethod"
                              :cell-style="{fontSize:'12px'}"
                              ref="moviesTable"
                              style="width: 99%;margin: 0 auto">
                        <template v-for="(col ,index) in cols">
                            <el-table-column
                                align="center"
                                width="85"
                                v-if="col.prop==='pici'"
                                :prop="col.prop" >
                                <template scope="scope">
                                    {{ scope.row.pici }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                align="center"
                                width="70"
                                v-if="col.prop==='gongwei'"
                                :prop="col.prop" >
                                <template scope="scope">
                                    {{ scope.row.gongwei }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                align="center"
                                width="85"
                                v-if="col.prop==='zuoyezhe'"
                                :prop="col.prop" >
                                <template scope="scope">
                                    {{ scope.row.zuoyezhe }}
                                    <el-table-column
                                        align="center"
                                        width="85"
                                        v-if="col.prop==='zuoyezhe'"
                                        :prop="col.prop" >
                                        <template scope="scope">
                                            {{ scope.row.zuoyezhe }}
                                        </template>
                                    </el-table-column>
                                </template>
                            </el-table-column>
                            <el-table-column
                                align="center"
                                v-if="col.prop==='tongji'"
                                :prop="col.prop" >
                                <template scope="scope">
                                    {{ scope.row.tongji }}
                                </template>
                            </el-table-column>
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

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,

                id: "",


                cols: [
                    {"prop": "pici", "label": "批次"},
                    {"prop": "gongwei", "label": "工位"},
                    {"prop": "zuoyezhe", "label": "作业者"},
                    {"prop": "tongji", "label": "统计"},
                ],
                tableData: [
                    {
                    "pici":2019,
                    "gongwei": "切断",
                    "zuoyezhe": "qieduan",
                    "tongji": "1323"
                },
                    {
                        "pici": 2019,
                        "gongwei": "切断",
                        "zuoyezhe": "qieduan",
                        "tongji": "1323"
                    },
                    {
                        "pici": 2019,
                        "gongwei": "切断",
                        "zuoyezhe": "qieduan",
                        "tongji": "1323"
                    },
                    {
                        "pici": 2019,
                        "gongwei": "切断",
                        "zuoyezhe": "qieduan",
                        "tongji": "1323"
                    },
                ],

                select_word: '',

                batch: "",
                batchOptions: [],

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
                    ])
                        .then(axios.spread(function (select) {
                            that.batch = select.data[0].id;
                            that.batchOptions = select.data;
                            that.loadingShowData(1);
                        }));
                }
            },

            //瞬间加载数据
            loadingShowData(data) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "jgxqan"}),
                    axios.post(" " + url + "/padShow/buttonList", {"id": data})
                ])
                    .then(axios.spread(function (title, table) {
                        /*that.cols = title.data;
                        that.tableData = table.data.data;*/
                    }));
            },

            //根据工位选择
            changeSelect() {
                this.loadingShowData(this.workStation)
            },

            //进行查询
            doSearchData() {
            },

            arraySpanMethod(){

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
