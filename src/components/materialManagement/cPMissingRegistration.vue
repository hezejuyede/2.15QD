<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>物料管理</el-breadcrumb-item>
                <el-breadcrumb-item>缺件登记（储品金物）</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索储品金物清单</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索储品金物清单" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>选择批次</span>
                        <span>:</span>
                        <el-select
                            v-model="batch"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="是否补货">
                            <el-option
                                v-for="item in batchOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" @click="doSearch">查询储品金物</el-button>
                    <el-button type="success" @click="showAdd">缺件登记</el-button>
                    <el-button type="warning" @click="showReplenishment">补货</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              :height="this.tableHeight"
                              @select-all="selectAll"
                              @select="selectList"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <el-table-column
                            type="selection"
                            width="30">
                        </el-table-column>
                        <template v-for="(col ,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>

                </div>
              <!--  <div class="" style="display: flex;align-items: center;justify-content: center;margin-top: 10px">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="currentChange"
                        @next-click="nextClick"
                        @prev-click="prevClick"
                        :total="pageNum">
                    </el-pagination>
                </div>-->
            </div>

            <Modal :msg="message"
                   :isHideModal="HideModal"></Modal>
        </div>
        <!--新增弹出框 -->
        <el-dialog title="缺件数量统计" :visible.sync="addVisible" width="40%">
            <el-form ref="form"  label-width="100px">
                <el-form-item label="缺件数量">
                    <el-input v-model="qjNumber" type="number"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>
        <!--补货弹出框 -->
        <el-dialog title="补货" :visible.sync="replenishmentVisible" width="40%">
            <el-form ref="form"  label-width="100px">
                <el-form-item label="是否补货">
                    <el-select
                        v-model="replenishment"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择工位">
                        <el-option
                            v-for="item in replenishmentOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="replenishmentVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doReplenishment" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>
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
                listData: [],
                buhuoState:[],
                batch: "",
                batchOptions: [],
                qjNumber: "",
                select_word: '',
                addVisible: false,
                replenishmentVisible:false,
                page:1,
                pageNum:100,

                replenishment:"",
                replenishmentOptions:[{"name": "已补货", "id": "2"}, {"name": "未补货", "id": "1"}],
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

            //瞬间加载数据
            loadingShowData(data) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "chupinjinwuchaxun"}),
                    axios.post(" " + url + "/wuliao/jinwuChupinList", {"pici": data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },

            //根据屏幕设置Table高度
            setTableHeight() {
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    var H = window.screen.height;
                    this.tableHeight = H - 350 + "px";
                }
                else {
                    var h = document.body.clientHeight;
                    this.tableHeight = h - 350 + "px";
                }

            },

            //根据批次查询
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

            },


            //选择那个一个
            selectList(val) {
                if (val.length) {
                    let data = [];
                    let state = [];
                    for (let i = 0; i < val.length; i++) {
                        let a = val[i].id;
                        let b = val[i].buhuostatus;
                        data.push(a);
                        state.push(b);
                    }
                    this.listData = data;
                    this.buhuoState=state;
                    console.log(this.buhuoState)
                }
                else {
                    this.listData = [];
                    this.buhuoState=[];
                }
            },

            //列表全部选择
            selectAll(val) {
                if (val.length) {
                    let data = [];
                    let state = [];
                    for (let i = 0; i < val.length; i++) {
                        let a = val[i].id;
                        let b = val[i].buhuostatus;
                        data.push(a);
                        state.push(b);
                    }
                    this.listData = data;
                    this.buhuoState=state;
                    console.log(this.buhuoState)
                }
                else {
                    this.listData = [];
                    this.buhuoState=[];
                }
            },


            //显示缺货登陆
            showAdd(){
                if (this.listData.length) {
                    this.addVisible = true;
                }
                else {
                    this.message = "请勾选要登记的清单";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //进行缺货登陆
            doAdd() {
                if (this.qjNumber) {
                    axios.post(" " + url + "/wuliao/markChupinQueLiao",
                        {
                            "id": this.listData[0],
                            "queliaoshunum": parseInt(this.qjNumber)
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(res.data.message);
                                this.addVisible = false;
                                this.loadingShowData(this.batch)
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

            //显示补货弹框
            showReplenishment() {
                if (this.listData.length) {
                    if(this.listData.length === 1 && this.buhuoState[0]==="1"){
                        this.replenishmentVisible = true;
                    }
                    else {
                        this.$message.warning("缺货才能补货");
                    }
                }
                else {
                    this.message = "请勾选要补货的清单";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //进行补货
            doReplenishment() {
                if (this.replenishment) {
                    axios.post(" " + url + "/wuliao/markChupinBuhuo",
                        {
                            "id": this.listData[0]
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(res.data.message);
                                this.replenishmentVisible = false;
                                this.loadingShowData(this.batch)
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

            //页面发送改变
            currentChange(val) {
                this.page = val;
            },

            //前一页
            prevClick(val) {
                this.page = val;
            },

            //后一页
            nextClick(val) {
                this.page = val;
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
                    width: 130px;
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
