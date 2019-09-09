<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>质量管理</el-breadcrumb-item>
                <el-breadcrumb-item>船东意见反馈</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索反馈</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索反馈" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>选择查询时间</span>
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
                    <el-button type="success"  class="handle-del mr10" @click="doSearch">查询反馈</el-button>
                    <el-button type="primary"  class="handle-del mr10" @click="showAdd">新增反馈</el-button>
                    <el-button type="danger"   class="handle-del mr10" @click="showDelete">删除反馈</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              :height="this.tableHeight"
                              @select="selectList"
                              @select-all="selectAll"
                              @selection-change="selectionChange"
                              ref="moviesTable"
                              @row-dblclick="edit"
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
            <el-dialog title="新增反馈" :visible.sync="addVisible" width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="管子编号">
                        <el-input v-model="guanzibianhao" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="船级姓名">
                        <el-input v-model="fankuiren" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="反馈时间">
                        <el-date-picker
                            v-model="fankuishijian"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="反馈意见">
                        <el-input v-model="wuzuoxiangqing" style="width: 300px" type="textarea"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑反馈" :visible.sync="editVisible" width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="管子编号">
                        <el-input v-model="guanzibianhao" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="船级姓名">
                        <el-input v-model="fankuiren" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="反馈时间">
                        <el-date-picker
                            v-model="fankuishijian"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="反馈意见">
                        <el-input v-model="wuzuoxiangqing" style="width: 300px" type="textarea"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 删除提示框 -->
            <el-dialog title="删除反馈" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDelete" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="deleteRow" style="height:30px;width:80px">确 定</el-button>
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

                val:[],

                examineTime:"",
                listData:[],

                id:"",


                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,

                fankuishijian:"",
                chuanhao: "",
                guanzibianhao:"",
                fankuiren:"",
                wuzuoxiangqing:"",
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
                    this.loadingShowData(this.examineTime,1);
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
            loadingShowData(data1,data2) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "chuandongyijianfankui"}),
                    axios.post(" " + url + "/yijian/yijianList",{"times":data1,"type":data2})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },



            //选择那个一个
            selectList(val) {
                this.val =val;
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
                this.selectList(val)
            },

            //选择改变
            selectionChange(val) {
                this.selectList(val)
            },
            doSearch(){
                this.loadingShowData(this.examineTime,1);
            },
            //显示新增
            showAdd(){
                this.addVisible=true;
                this.chuanhao = "";
                this.guanzibianhao = "";
                this.fankuiren = "";
                this.wuzuoxiangqing = "";
                this.fankuishijian="";
            },

            //进行新增
            doAdd() {
                if (this.chuanhao && this.guanzibianhao && this.fankuiren && this.wuzuoxiangqing && this.fankuishijian) {
                    axios.post(" " + url + "/yijian/addYijian",
                        {
                            "type":1,
                            "chuanhao":  this.chuanhao,
                            "guanzibianhao":  this.guanzibianhao,
                            "chuandongname":  this.fankuiren,
                            "fankuishijian":  this.fankuishijian,
                            "yijian":  this.wuzuoxiangqing
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(res.data.message);
                                this.addVisible = false;
                                this.loadingShowData(this.examineTime,1);

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

            //双击点击行内编辑
            edit(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/yijian/yijianDetail", {"id": this.id})
                    .then((res) => {
                        this.chuanhao =res.data.data.chuanhao;
                        this.guanzibianhao =res.data.data.guanzibianhao;
                        this.fankuiren = res.data.data.chuandongname;
                        this.wuzuoxiangqing = res.data.data.yijian;
                        this.fankuishijian = res.data.data.fankuishijian;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit() {
                if (this.chuanhao && this.guanzibianhao && this.fankuiren && this.wuzuoxiangqing && this.fankuishijian) {
                    axios.post(" " + url + "/yijian/updateYijian",
                        {
                            "type":1,
                            "id": this.id,
                            "chuanhao":  this.chuanhao,
                            "guanzibianhao":  this.guanzibianhao,
                            "chuandongname":  this.fankuiren,
                            "fankuishijian":  this.fankuishijian,
                            "yijian":  this.wuzuoxiangqing
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.editVisible = false;
                                this.$message.success(res.data.message);
                                this.loadingShowData(this.examineTime,1);
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

            //选择点击显示删除
            showDelete() {
                if (this.listData.length) {
                    this.delVisible = true;
                }
                else {
                    this.message = "请勾选要删除的分类";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //取消删除
            cancelDelete() {
                this.delVisible = false;
                this.listData = [];
                if (this.val.length === 1) {
                    for (let i = 0, l = this.val.length; i < l; i++) {
                        this.$refs.moviesTable.toggleRowSelection(this.val[i]);
                    }
                }

            },

            // 确定删除
            deleteRow() {
                axios.post(" " + url + "/yijian/delYijian",
                    {
                        "ids": this.listData,
                    }
                )
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.$message.success(res.data.message);
                            this.delVisible = false;
                            this.loadingShowData(this.examineTime,1);
                        }
                        else {
                            this.$message.warning(res.data.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
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
                line-height:80px;
                padding-left: 20px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width:100px;
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
