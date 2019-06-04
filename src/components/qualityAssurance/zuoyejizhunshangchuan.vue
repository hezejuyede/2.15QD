<template>
    <div class="editorTemplate">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>作业者界面要点内容提示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="editorTemplate-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>筛选要点</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选要点" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>工位</span>
                        <span>:</span>
                        <el-select
                            v-model="select"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in selectOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="success" icon="delete" class="handle-del mr10" @click="doSearch">查询要点</el-button>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">新增要点</el-button>
                    <el-button type="warning" icon="delete" class="handle-del mr10" @click="showEdit">编辑要点</el-button>
                    <el-button type="danger" icon="delete" class="handle-del mr10" @click="deleteAlert">删除要点</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:' rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="400"
                              @select="selectList"
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
        </div>
        <!--新增弹出框 -->
        <el-dialog title="新增要点内容提示" :visible.sync="addVisible" width="90%" top="50px">
            <div class="container" style="height:500px;overflow:auto">
                <div class="containerDiv">
                    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                    <div class="containerDivBtn">
                        <el-button class="editor-btn" type="primary" @click="doAdd">提交</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>

        <!--详情弹出框 -->
        <el-dialog title="要点内容提示详情" :visible.sync="contentVisible" width="90%" top="50px">
            <div class="container" style="height:500px;overflow:auto">
                <div class="" v-html="htmlData"></div>
            </div>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑要点内容提示" :visible.sync="editVisible" width="90%" top="50px">
            <div class="container" style="height:500px;overflow:auto">
                <div class="containerDiv">
                    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" height="300"></quill-editor>
                    <div class="containerDivBtn">
                        <el-button class="editor-btn" type="primary" @click="saveEdit">提交</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="删除要点内容提示" :visible.sync="delVisible" width="300px" center>
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

                content: '',
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



                select:"",
                selectOptions: [],

                id: "",
                name: '',
                indexno: '',
                showindex: '',
                code: ""

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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                    ])
                        .then(axios.spread(function (select,title, table) {
                            that.select= select.data[0].id;
                            that.selectOptions = select.data;
                            that.loadingShowData(1)

                        }));
                }
            },

            //根据下拉显示数据
            loadingShowData(data){
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "zysx"}),
                    axios.post(" " + url + "/sysconfig/showNoticeList", {"id": data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },

            //查询
            doSearch(){
                console.log(this.select);
                if (this.select) {
                    this.loadingShowData(this.select)
                }
                else {
                    this.message = "请选择要查询的工位";
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

            //双击点击显示详情
            edit(row, column, cell, event) {
                this.contentVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/sysconfig/noticeDetail", {"id": this.id})
                    .then((res) => {
                        this.htmlData=res.data.noticehtml;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
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

            //显示编辑
            showEdit(){
                if (this.listData.length) {
                    if(this.listData.length>1){
                        this.message = "请勾选一个";
                        this.HideModal = false;
                        const that = this;

                        function a() {
                            that.message = "";
                            that.HideModal = true;
                        }

                        setTimeout(a, 2000);
                    }
                    else {
                        this.editVisible = true;
                        axios.post(" " + url + "/sysconfig/noticeDetail", {"id": this.listData[0]})
                            .then((res) => {
                                this.content=res.data.noticehtml;
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
                    axios.post(" " + url + "/sysconfig/updateNotice",
                        {
                            "id":this.listData[0],
                            "noticehtml": this.content,
                        }
                    )
                        .then((res) => {
                            if (res.data == "1") {
                                this.$message.success(`修改成功`);
                                this.editVisible = false;
                                this.loadingShowData(this.select)

                            }
                            else {
                                this.$message.warning(`修改失败`);
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

            // 确定删除
            deleteRow() {
                axios.post(" " + url + "/sysconfig/delNotice",
                    {
                        "ids": this.listData,
                    }
                )
                    .then((res) => {
                        if (res.data === "1") {
                            this.$message.success('删除成功');
                            this.delVisible = false;
                            this.loadingShowData(this.select)

                        }
                        else {
                            this.$message.warning(`删除失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            //显示新增
            showAdd() {
                if (this.select) {
                    this.addVisible = true;
                }
                else {
                    this.message = "请选择要新增的工位";
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
                if (this.content) {
                    axios.post(" " + url + "/sysconfig/noticeAdd",
                        {
                            "stationid":this.select,
                            "noticehtml": this.content,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                this.loadingShowData(this.select)
                            }
                            else {
                                this.$message.warning(`新增失败`);
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

            onEditorChange({ editor, html, text }) {
                this.content = html;
            },

            submit(){
                if(this.content){
                    console.log(this.content);
                    this.$message.success('提交成功！');
                }
                else {
                    this.$message.worning('提交内容不能为空');
                }

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
