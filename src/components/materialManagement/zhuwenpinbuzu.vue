<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>物料管理</el-breadcrumb-item>
                <el-breadcrumb-item>注文品不足</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>检索注文品</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="检索注文品" class="handle-input mr10" style="width: 150px"></el-input>
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
                    <el-button type="primary"   @click="doSearch">查询</el-button>
                  <!--  <el-button type="success"   @click="contactDesign">联络设计</el-button>-->
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'11px'}"
                              border
                              :height="this.tableHeight"
                              @row-dblclick="edit"
                              @select-all="selectAll"
                              @select="selectList"
                              ref="moviesTable"
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
            <!--新增弹出框 -->
            <el-dialog title="处理结果" :visible.sync="addVisible" width="40%" @close='cancelDelete'>
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="处理结果">
                        <el-select
                            v-model="cljg"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择">
                            <el-option
                                v-for="item in cljgOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="beizhu"
                                  type="textarea"
                                  placeholder="请输入内容"
                                  maxlength="30"
                                  show-word-limit
                                  style="width: 200px "></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>


            <!--新增弹出框 -->
            <el-dialog title="联系担当" :visible.sync="lxVisible" width="40%" @close='cancelDelete'>
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="担当姓名">
                        <el-select
                            v-model="ddName"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择">
                            <el-option
                                v-for="item in ddNameOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系事情">
                        <el-input v-model="things"
                                  type="textarea"
                                  placeholder="请输入内容"
                                  maxlength="30"
                                  show-word-limit
                                  style="width: 200px "></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="lxVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="lxDanDan" style="height:30px;width:80px">确 定</el-button>
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
    import {getNowTime} from '../../assets/js/api'
    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData:[],
                id:"",


                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                lxVisible: false,


                batch: "",
                batchOptions: [],

                cljg:"",
                cljgOptions: [
                    {"name": "继续等货", "id": "1"},
                    {"name": "马上补货", "id": "2"},
                    {"name": "补货完毕", "id": "3"},
                    {"name": "暂时缺货", "id": "4"}
                ],
                beizhu:"",

                ddName:"",
                ddNameOptions: [
                    {"name": "张三", "id": "1"},
                    {"name": "李四", "id": "2"},
                    {"name": "王五", "id": "3"},
                    {"name": "赵六", "id": "4"}
                ],
                things:"",
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
            loadingShowData(data1) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "zhuwenpinbuzu"}),
                    axios.post(" " + url + "/wuliao/wyd/zhuwenpin/list", {"pici":data1})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
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

            //取消
            cancelDelete() {
                this.lxVisible = false;
                this.listData = [];
                if (this.val.length === 1) {
                    for (let i = 0, l = this.val.length; i < l; i++) {
                        this.$refs.moviesTable.toggleRowSelection(this.val[i]);
                    }
                }

            },

            //进行查询
            doSearch(){
                this.loadingShowData(this.batch);
            },

            //双击点击处理
            edit(row, column, cell, event) {
                this.addVisible = true;
                this.id = row.id;
            },

            //进行处理
            doAdd() {
                if (this.cljg) {
                    axios.post(" " + url + "/shebei/errorUpdate",
                        {
                            "id":this.listData[0],
                            "errortypeid": this.cljg,
                            "beizhu": this.beizhu,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`处理成功`);
                                this.addVisible = false;
                                this.loadingShowData(this.examineTime,this.workStation,this.shebei);

                            }
                            else {
                                this.$message.warning(`处理失败`);
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


            //联系担当
            contactDesign(){
                if (this.listData.length) {
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
                        this.addVisible = true;
                        this.cljg="";
                        this.beizhu="";
                    }

                }
                else {
                    this.message = "请勾选要处理的异常";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            lxDanDan(){
                if (this.cljg) {
                    axios.post(" " + url + "/shebei/errorUpdate",
                        {
                            "id":this.listData[0],
                            "ddName": this.ddName,
                            "things": this.things,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`联系成功`);
                                this.addVisible = false;
                                this.loadingShowData(this.examineTime,this.workStation,this.shebei);

                            }
                            else {
                                this.$message.warning(`联系失败`);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.$message.warning(`输入不能为空`);
                }
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
                line-height:80px;
                padding-left: 20px;
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
