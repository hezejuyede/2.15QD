<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>物料管理</el-breadcrumb-item>
                <el-breadcrumb-item>出库查询（托单金物）</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>智能检索托单金物出库</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能托单金物出库"  style="width: 150px"  class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>船号</span>
                        <span>:</span>
                        <el-input v-model="chunhao" placeholder="船号"  style="width: 100px"  class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>托单号</span>
                        <span>:</span>
                        <el-input v-model="tuodanhao" placeholder="托单号"  style="width: 100px"  class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>行番</span>
                        <span>:</span>
                        <el-input v-model="hangfan" placeholder="行番"  style="width: 100px"  class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>管理区分</span>
                        <span>:</span>
                        <el-input v-model="glqf" placeholder="管理区分"  style="width: 100px"  class="handle-input mr10"></el-input>
                    </label>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="doSearch">出库查询</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
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

                chunhao:"",
                tuodanhao:"",
                hangfan:"",
                glqf:""

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
                    this.loadingShowData( this.chunhao, this.tuodanhao, this.hangfan, this.glqf);
                }
            },

            //瞬间加载数据
            loadingShowData(data1,data2,data3,data4,) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "zwjwcx"}),
                    axios.post(" " + url + "/wuliao/jinwuZhuwenpinList", {"chunhao": data1,"tuodanhao": data2,"hangfan": data3,"glqf": data4})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },


            //根据时间查询
            doSearch() {
                this.loadingShowData( this.chunhao, this.tuodanhao, this.hangfan, this.glqf);
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

