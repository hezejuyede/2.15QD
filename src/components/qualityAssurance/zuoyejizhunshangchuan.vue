<template>
    <div class="editorTemplate">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>质量管理</el-breadcrumb-item>
                <el-breadcrumb-item>作业基准上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="editorTemplate-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>筛选作业基准</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选作业基准" class="handle-input mr10" style="width: 200px"></el-input>
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
                    <el-button type="primary"  @click="doSearch">查询基准</el-button>
                    <el-button type="success"  @click="showAdd">新增基准</el-button>
                    <el-button type="warning"  @click="showEdit">编辑基准</el-button>
                    <el-button type="danger"   @click="deleteAlert">删除基准</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:' rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              :height="this.tableHeight"
                              @select="selectList"
                              @select-all="selectAll"
                              @row-dblclick="edit"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <el-table-column
                            type="selection"
                            width="30">
                        </el-table-column>
                        <template v-for="(col ,index) in cols">
                            <el-table-column
                                align="center"
                                v-if="col.prop !=='createtime'"
                                :prop="col.prop"
                                :label="col.label">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                v-if="col.prop==='createtime'"
                                width="300"
                                :prop="col.prop" :label="col.label">
                                <template scope="scope">
                                    {{ scope.row.createtime }}
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
        </div>
        <!--新增弹出框 -->
        <el-dialog title="新增作业基准" :visible.sync="addVisible" width="90%" top="50px">
            <div class="container" style="height:500px;overflow:auto">
                <div class="containerDivTop2" style="width:100%;height:50px;display: flex;align-items: center;justify-items: center">
                    <div style="width: 600px;height: 40px;margin: 0 auto">
                        <span>学习标题</span>
                        <span>:</span>
                        <el-input v-model="titilename" style="width:500px" placeholder="学习标题"></el-input>
                    </div>
                </div>
                <div class="containerDiv">
                    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                    <div class="containerDivBtn">
                        <el-button class="editor-btn" type="primary" @click="doAdd">提交</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>

        <!--详情弹出框 -->
        <el-dialog title="作业基准详情" :visible.sync="contentVisible" width="90%" top="50px">
            <div class="container" style="height:500px;overflow:auto">
                <div class="containerDivTop2" style="width:100%;height:50px;display: flex;align-items: center;justify-items: center">
                    <div style="width: 600px;height: 40px;margin: 0 auto">
                        <span>学习标题</span>
                        <span>:</span>
                        <el-input v-model="titilename" style="width:500px"   :disabled="true"   placeholder="学习标题"></el-input>
                    </div>
                </div>
                <div class="" v-html="htmlData"></div>
            </div>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑作业基准" :visible.sync="editVisible" width="90%" top="50px">
            <div class="container" style="height:500px;overflow:auto">
                <div class="containerDivTop2" style="width:100%;height:50px;display: flex;align-items: center;justify-items: center">
                    <div style="width: 600px;height: 40px;margin: 0 auto">
                        <span>学习标题</span>
                        <span>:</span>
                        <el-input v-model="titilename" style="width:500px" placeholder="学习标题"></el-input>
                    </div>
                </div>
                <div class="containerDiv">
                    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                    <div class="containerDivBtn">
                        <el-button class="editor-btn" type="primary" @click="saveEdit">提交</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="删除作业基准" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="deleteRow" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>

        <Modal :msg="message"
               :isHideModal="HideModal"></Modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'
    import Modal from '../../common/modal'
    import {getNowTime} from '../../assets/js/api'

    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';


    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData: [],
                id: "",
                username:"",
                content: '',
                titilename:"",
                editorOption: {
                    placeholder: ''
                },

                htmlData:"",
                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,
                contentVisible:false,


                examineTime:"",
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
        components: {Modal,quillEditor},
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
                    const info = JSON.parse(userInfo);
                    this.username = info.username;
                    let time = getNowTime();
                    let times = [];
                    for (let i = 0; i < 2; i++) {
                        times.push(time)
                    }
                    this.examineTime = times;
                    this.loadingShowData(this.examineTime)

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

            //根据下拉显示数据
            loadingShowData(data) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "zuoyejizhunshangchuan"}),
                    axios.post(" " + url + "/xuexi/xuexiList", {"times": data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },

            //更改生产线
            changeSCX() {
                axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line})
                    .then((res) => {
                        if (res.data === "-1") {
                            this.select = "";
                            this.selectOptions = [];
                        }
                        else {
                            if (res.data.length > 1) {
                                let json = {"name": "全部", "id": "-1"};
                                this.workStationOptions = res.data;
                                this.workStationOptions.unshift(json);
                            }
                        }
                    });
            },

            //查询
            doSearch() {
                if (this.examineTime) {
                    this.loadingShowData(this.examineTime)
                }
                else {
                    this.message = "请选择要查询的时间";
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
                    this.listData = [];
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
            showAdd() {
                this.addVisible = true;
                this.titilename = "";
                this.content = "";

            },

            //进行新增
            doAdd() {
                if (this.content && this.titilename) {
                    axios.post(" " + url + "/xuexi/addXuexi",
                        {
                            "username": this.username,
                            "titilename": this.titilename,
                            "context": this.content,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(res.data.message);
                                this.addVisible = false;
                                this.loadingShowData(this.examineTime)
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

            //双击点击显示详情
            edit(row, column, cell, event) {
                this.contentVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/xuexi/xuexiDetail", {"id": this.id})
                    .then((res) => {
                        this.titilename = res.data.data.titilename;
                        this.htmlData = res.data.data.context;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            //显示编辑
            showEdit() {
                if (this.listData.length) {
                    if (this.listData.length > 1) {
                        this.message = "请勾选一个";
                        this.HideModal = false;
                        const that = this;

                        function c() {
                            that.message = "";
                            that.HideModal = true;
                        }

                        setTimeout(c, 2000);
                    }
                    else {
                        axios.post(" " + url + "/xuexi/xuexiDetail", {"id": this.listData[0]})
                            .then((res) => {
                                if (res.data.data) {
                                    this.editVisible = true;
                                    this.titilename = res.data.data.titilename;
                                    this.content = res.data.data.context;
                                }
                                else {
                                    this.message = "暂无数据";
                                    this.HideModal = false;
                                    const that = this;

                                    function a() {
                                        that.message = "";
                                        that.HideModal = true;
                                    }

                                    setTimeout(a, 2000);
                                }

                            })
                            .catch((err) => {
                                console.log(err)
                            });
                    }
                }
                else {
                    this.message = "请勾选要编辑的行";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }

            },

            // 保存编辑
            saveEdit() {
                if (this.content) {
                    axios.post(" " + url + "/xuexi/updateXuexi",
                        {
                            "id": this.listData[0],
                            "username": this.username,
                            "titilename": this.titilename,
                            "context": this.content,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(res.data.message);
                                this.editVisible = false;
                                this.loadingShowData(this.examineTime)

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

            //选择点击删除
            deleteAlert() {
                if (this.listData.length) {
                    this.delVisible = true;
                }
                else {
                    this.message = "请勾选要删除的行";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            // 确定删除
            deleteRow() {
                axios.post(" " + url + "/xuexi/delXuexi", {"ids": this.listData,})
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.$message.success(res.data.message);
                            this.delVisible = false;
                            this.loadingShowData(this.examineTime)
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

    .editorTemplate {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .editorTemplate-content {
            .handle-box {
                height: 80px;
                line-height: 80px;
                padding-left: 20px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width:130px;
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
        .container {
            .containerDiv {
                width: 100%;
                height: 100%;
                .quill-editor {
                    border-bottom: 1px solid @color-bg-hei;
                }
                .containerDivBtn {
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .el-button {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 30%;
                        height: 35px;
                        margin-left: 2%;
                        cursor: pointer;
                    }
                }
            }
        }
    }


</style>
