<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>入库登记</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>检索入库登记</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="检索出库登记" class="handle-input mr10"
                                  style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 5px">
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

                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">入库</el-button>

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
            <!--入库弹出框 -->
            <el-dialog title="入库" :visible.sync="addVisible" width="40%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="分类">
                        <el-select
                            v-model="fenlei"
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
                    </el-form-item>
                    <el-form-item label="耗材">
                        <el-select
                            v-model="haocai"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择耗材">
                            <el-option
                                v-for="item in haocaiOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入库数量">
                        <el-input v-model="rksl" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
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
    import {getYTime} from '../../assets/js/api'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData: [],
                id: "",


                cols: [],
                tableData: [],
                ckjvData: [],

                select_word: '',

                addVisible: false,


                haocai: "",
                haocaiOptions: [],
                fenlei: '',
                fenleiOptions: [],

                rksl: "",
                examineTime: ""

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
                    let time = getYTime();
                    let times = [];
                    for (let i = 0; i < 2; i++) {
                        times.push(time)
                    }
                    this.examineTime = times;

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
                                    that.loadingShowData(1, that.haocai, that.examineTime);
                                }));
                        }));
                }
            },

            //瞬间加载数据
            loadingShowData(data1, data2, data3) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "rkjlcx"}),
                    axios.post(" " + url + "/devrecord/devRecordList", {"type": data1, "devid": data2, "times": data3})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },

            //出库记录查询
            doSearchCKJV() {
                this.loadingShowData(1, this.haocai, this.examineTime);
            },

            //更改分类更新耗材
            changeFenlei() {
                axios.post(" " + url + "/dev/devList", {"devtypeid": this.fenlei})
                    .then((res) => {
                        if (res.data.length > 0) {
                            this.haocai = res.data[0].id;
                            this.haocaiOptions = res.data;
                            this.loadingShowData(1, this.haocai, this.examineTime);
                        }
                        else {
                            this.haocai="";
                            this.haocaiOptions=[];
                        }

                    });
            },

            //根据耗材查询
            changeSelect() {
                this.loadingShowData(1, this.haocai, this.examineTime);
            },

            //显示入库
            showAdd() {
                this.addVisible = true;
                this.haocai = "";
                this.fenlei = "";
                this.rksl = "";
                this.haocaiOptions=[];
            },

            //进行入库
            doAdd() {
                if (this.haocai && this.fenlei && this.rksl) {
                    axios.post(" " + url + "/devrecord/devRecordAdd",
                        {

                            "inouttype": 1,
                            "devid": this.haocai,
                            "devcount": this.rksl,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(`入库成功`);
                                this.addVisible = false;
                                this.loadingShowData(1, this.haocai, this.examineTime);
                            }
                            else {
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.$message.warning(`输入不能为空`);
                }
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
