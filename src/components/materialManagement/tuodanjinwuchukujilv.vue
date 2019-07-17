<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>物料管理</el-breadcrumb-item>
                <el-breadcrumb-item>出库记录（托单金物）</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索金物规格</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索金物规格" class="handle-input mr10"></el-input>
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
                            placeholder="请选择批次">
                            <el-option
                                v-for="item in batchOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" @click="doSearch">查询金物规格</el-button>
                    <el-button type="success" @click="showAdd">出库登记</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
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
            </div>

            <Modal :msg="message"
                   :isHideModal="HideModal"></Modal>
        </div>
        <!--新增弹出框 -->
        <el-dialog title="出库记录登记" :visible.sync="addVisible" width="40%">
            <el-form ref="form"  label-width="100px">
                <el-form-item label="金物总数量">
                    <el-input v-model="jwAllNumber" type="number"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="实际数量">
                    <el-input v-model="sjNumber" type="number"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
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
                batch: "",
                batchOptions: [],
                jwAllNumber: "",
                sjNumber: "",
                select_word: '',
                addVisible: false,

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
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "tuodanjinwuchukujilv"}),
                    axios.post(" " + url + "/wuliao/jinwuZhuwenpinList", {"time": data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
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
                    for (let i = 0; i < val.length; i++) {
                        let a = val[i].id;
                        data.push(a)
                    }
                    this.listData = data;
                }
                else {
                    this.listData=[];
                }
            },

            //列表全部选择
            selectAll(val) {
                if (val.length) {
                    let data = [];
                    for (let i = 0; i < val.length; i++) {
                        let a = val[i].id;
                        data.push(a)
                    }
                    this.listData = data;
                }
                else {
                    this.listData = [];
                }
            },

            //显示新增
            showAdd(){
                if (this.listData.length) {
                    this.addVisible = true;
                    if(this.listData.length>1){
                        this.message = "只能选择一个";
                        this.HideModal = false;
                        const that = this;
                        function b() {
                            that.message = "";
                            that.HideModal = true;
                        }

                        setTimeout(b, 2000);
                    }
                    else {
                        for(let i=0;i<this.tableData.length;i++){
                            if(this.tableData[i].id===this.listData[0]){
                                this.jwAllNumber= this.tableData[i].jwAllNumber
                            }
                        }
                    }
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

            //进行新增
            doAdd() {
                if (this.sjNumber ) {
                    axios.post(" " + url + "/padShow/buttonAdd",
                        {
                            "id":this.listData[0],
                            "sjNumber": this.sjNumber,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(`登记成功`);
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

