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
                    <el-table
                        :data="tableData"
                        height="640"
                        :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                        style="width: 100%;border: 1px solid #303133">
                        <el-table-column
                            align="center"
                            prop="pici"
                            label=""
                            width="100">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="gongwei"
                            label=""
                            width="100">
                        </el-table-column>
                        <el-table-column  v-for="(item,index) in titleData"  align="center" :label="item.zye">
                            <el-table-column
                                align="center"
                                :prop="item.tdsp"
                                :header-cell-style="{background:'red',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                                label="待审批">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                :prop="item.tysp"
                                label="已审批">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column align="center" label="统计">
                            <el-table-column
                                align="center"
                                prop="ctzs"
                                label="出图总数">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="ysp"
                                label="已审批">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="dsp"
                                label="待审批">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="wdr"
                                label="未导入">
                            </el-table-column>
                        </el-table-column>
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


                titleData: [
                    {"zye": "作业者A","tdsp":"tdsp","tysp":"tysp"},
                    {"zye": "作业者B","tdsp":"tdsp2","tysp":"tysp2"},
                    {"zye": "作业者C","tdsp":"tdsp3","tysp":"tysp3"},
                    {"zye": "作业者D","tdsp":"tdsp4","tysp":"tysp4"},
                    {"zye": "作业者E","tdsp":"tdsp5","tysp":"tysp5"},
                ],
                tableData: [
                    {
                        "pici": "20190426",
                        "gongwei": "切断",
                        "tdsp": '1',
                        "tysp": "1",
                        "tdsp2": '2',
                        "tysp2": "2",
                        "tdsp3": '3',
                        "tysp3": "3",
                        "tdsp4": '4',
                        "tysp4": "4",
                        "tdsp5": '5',
                        "tysp5": "5",
                        "ctzs": "1",
                        "ysp":"2",
                        "dsp":"3",
                        "wdr":"4"

                    },
                    {
                        "pici": "20190426",
                        "gongwei": "短管焊",
                        "tdsp": '11',
                        "tysp": "11",
                        "tdsp2": '22',
                        "tysp2": "22",
                        "tdsp3": '33',
                        "tysp3": "33",
                        "tdsp4": '44',
                        "tysp4": "44",
                        "tdsp5": '55',
                        "tysp5": "55",
                        "ctzs": "1",
                        "ysp":"2",
                        "dsp":"3",
                        "wdr":"2"
                    },
                    {
                        "pici": "20190426",
                        "gongwei": "直管焊",
                        "tdsp": '111',
                        "tysp": "111",
                        "tdsp2": '222',
                        "tysp2": "222",
                        "tdsp3": '333',
                        "tysp3": "333",
                        "tdsp4": '444',
                        "tysp4": "444",
                        "tdsp5": '555',
                        "tysp5": "555",
                        "ctzs": "1",
                        "ysp":"2",
                        "dsp":"3",
                        "wdr":"3"
                    },
                    {
                        "pici": "20190426",
                        "gongwei": "大阻焊",
                        "tdsp": '1111',
                        "tysp": "1111",
                        "tdsp2": '2222',
                        "tysp2": "2222",
                        "tdsp3": '3333',
                        "tysp3": "3333",
                        "tdsp4": '4444',
                        "tysp4": "4444",
                        "tdsp5": '5555',
                        "tysp5": "5555",
                        "ctzs": "1",
                        "ysp":"2",
                        "dsp":"3",
                        "wdr":"4"
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

            dSP(){

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
