<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>出入库查询与统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>检索出入库记录</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="检索出入库记录" class="handle-input mr10"
                                  style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>分类</span>
                        <span>:</span>
                        <el-select
                            v-model="fenlei"
                            style="width: 120px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeFenlei"
                            placeholder="请选择分类">
                            <el-option
                                v-for="item in fenleiOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>耗材</span>
                        <span>:</span>
                        <el-select
                            style="width: 120px"
                            v-model="haocai"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSelect"
                            placeholder="请选择耗材">
                            <el-option
                                v-for="item in haocaiOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="success" icon="delete" class="handle-del mr10" @click="doSearchCKJV">查询</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
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

                select_word: '',



                haocai: "",
                haocaiOptions: [],
                fenlei: '',
                fenleiOptions: [],
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
                        axios.post(" " + url + "/devType/devTypeList"),
                    ])
                        .then(axios.spread(function (fenlei) {
                            that.fenleiOptions = fenlei.data;
                            that.fenlei = fenlei.data[0].id;
                            axios.all([
                                axios.post(" " + url + "/dev/devList", {"devtypeid": that.fenlei}),
                            ])
                                .then(axios.spread(function (haocai) {
                                    that.haocaiOptions = haocai.data;
                                    that.haocai = haocai.data[0].id;
                                    that.loadingShowData(that.haocai);
                                }));
                        }));
                }
            },

            //瞬间加载数据
            loadingShowData(data1) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "crkdj"}),
                    axios.post(" " + url + "/devrecord/devRecordListAll", {"devid": data1})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },

            //出库记录查询
            doSearchCKJV() {
                this.loadingShowData(this.haocai);
            },
            //更改分类
            changeFenlei(){
                axios.post(" " + url + "/dev/devList", {"devtypeid": this.fenlei})
                    .then((res)=>{
                        if(res.data.length>0){
                            this.haocaiOptions = res.data;
                            this.haocai = res.data[0].id;
                            this.loadingShowData(this.haocai);
                        }
                        else {
                            this.haocaiOptions=[];
                            this.haocai="";
                        }

                    })
                    .catch((err)=>{
                        console.log(err)
                    })

            },

            //更改耗材
            changeSelect(){
                this.loadingShowData(this.haocai);
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
            .red {
                color: #ff0000;
            }

        }
    }


</style>
