<template>
    <div class="editorTemplate">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>质量管理</el-breadcrumb-item>
                <el-breadcrumb-item>提醒内容制作与发布</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="editorTemplate-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <el-input v-model="select_word" placeholder="筛选提醒内容" class="handle-input mr10" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
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
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>生产线</span>
                        <span>:</span>
                        <el-select
                            style="width: 120px"
                            v-model="line"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSCX"
                            placeholder="选择生产线">
                            <el-option
                                v-for="item in lineOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>工位</span>
                        <span>:</span>
                        <el-select
                            style="width: 120px"
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
                    <el-button type="primary"    @click="doSearch">查询提醒</el-button>
                    <el-button type="success"    @click="showAdd">新增提醒</el-button>
                    <el-button type="warning"    @click="showEdit">编辑提醒</el-button>
                    <el-button type="danger"     @click="deleteAlert">删除提醒</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:' rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                              border
                              :height="this.tableHeight"
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
        <el-dialog title="新增提醒内容" :visible.sync="addVisible" width="90%" :fullscreen="true" :center="true">
            <div class="container" style="height:500px;overflow:auto">
                <div class="containerDivTop">
                    <div class="containerDivTop1">
                        <span style="color: #dd6161">提醒级别:</span>
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>类型：</span>
                            <span>:</span>
                            <el-select
                                v-model="tixing"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                @change="changeSCX"
                                placeholder="请选择紧急类型">
                                <el-option
                                    v-for="item in tixingOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </label>
                    </div>
                    <div class="containerDivTop2">
                        <span style="color: #dd6161">推送条件:</span>
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>生产线</span>
                            <span>:</span>
                            <el-select
                                style="width: 150px"
                                v-model="line"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                @change="changeSCX"
                                placeholder="请选择生产线">
                                <el-option
                                    v-for="item in lineOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                                </el-option>
                            </el-select>
                        </label>
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>工位</span>
                            <span>:</span>
                            <el-select
                                style="width: 120px"
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
                    </div>
                    <div class="containerDivTop3">
                        <span style="color: #dd6161">设定频率:</span>
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>时间段</span>
                            <span>:</span>
                            <el-select
                                v-model="shijianduan"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                @change="changeSCX"
                                placeholder="请选择时间段">
                                <el-option
                                    v-for="item in shijianduanOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                                </el-option>
                            </el-select>
                        </label>
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>频次</span>
                            <span>:</span>
                            <el-input v-model="pinci" style="width: 200px" type="number" placeholder="频次"></el-input>
                        </label>
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
        <el-dialog title="作业提醒内容" :visible.sync="contentVisible" width="90%" top="50px">
            <div class="container" style="height:500px;overflow:auto">
                <div class="" v-html="htmlData"></div>
            </div>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑提醒内容" :visible.sync="editVisible" width="90%" top="50px">
            <div class="container" style="height:500px;overflow:auto">
                <div class="containerDivTop">
                    <div class="containerDivTop1">
                        <span style="color: #dd6161">提醒级别:</span>
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>类型：</span>
                            <span>:</span>
                            <el-select
                                v-model="tixing"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                @change="changeSCX"
                                placeholder="请选择紧急类型">
                                <el-option
                                    v-for="item in tixingOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </label>
                    </div>
                    <div class="containerDivTop2">
                        <span style="color: #dd6161">推送条件:</span>
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>生产线</span>
                            <span>:</span>
                            <el-select
                                style="width: 150px"
                                v-model="line"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                @change="changeSCX"
                                placeholder="请选择生产线">
                                <el-option
                                    v-for="item in lineOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                                </el-option>
                            </el-select>
                        </label>
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>工位</span>
                            <span>:</span>
                            <el-select
                                style="width: 120px"
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
                    </div>
                    <div class="containerDivTop3">
                        <span style="color: #dd6161">设定频率:</span>
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>时间段</span>
                            <span>:</span>
                            <el-select
                                v-model="shijianduan"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                @change="changeSCX"
                                placeholder="请选择时间段">
                                <el-option
                                    v-for="item in shijianduanOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                                </el-option>
                            </el-select>
                        </label>
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>频次</span>
                            <span>:</span>
                            <el-input v-model="pinci" style="width: 200px" type="number" placeholder="频次"></el-input>
                        </label>
                    </div>
                </div>
                <div class="containerDiv">
                    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" height="300"></quill-editor>
                    <div class="containerDivBtn">
                        <el-button class="editor-btn" type="primary" @click="saveEdit">提交</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="删除提醒内容" :visible.sync="delVisible" width="300px" center>
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


                line: '',
                lineOptions: [],

                select:"",
                selectOptions: [],

                tixing:"",
                tixingOptions:[{"name": "紧急提醒", "id": "1"}, {"name": "一般提醒", "id": "2"},],

                shijianduan:"",
                shijianduanOptions: [{"name": "每天", "id": "1"}, {"name": "每周", "id": "2"}, {"name": "每月", "id": "2"}],


                pinci:"",
                examineTime:"",

                id: "",
                name: '',
                indexno: '',
                showindex: '',
                code: "",
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
                    let time = getNowTime();
                    let times = [];
                    for (let i = 0; i < 2; i++) {
                        times.push(time)
                    }
                    this.examineTime = times;

                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                    ])
                        .then(axios.spread(function (line, workStation) {
                            that.lineOptions = line.data;
                            that.line = line.data[0].indexno;
                            that.select= workStation.data[0].id;
                            that.selectOptions = workStation.data;
                            that.loadingShowData(1)

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

            //根据下拉显示数据
            loadingShowData(data){
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "anquantixingneirongzhizuoyufabu"}),
                    axios.post(" " + url + "/sysconfig/showNoticeList", {"id": data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },

            //更改生产线
            changeSCX() {
                axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line})
                    .then((res) => {
                        if (res.data ==="-1") {
                            this.select = "";
                            this.selectOptions = [];
                        }
                        else {
                            this.select = res.data[0].id;
                            this.selectOptions = res.data;
                        }
                    });
            },


            //查询
            doSearch(){
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

                        function b() {
                            that.message = "";
                            that.HideModal = true;
                        }

                        setTimeout(b, 2000);
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
                            if (res.data === "1") {
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
                this.addVisible = true;
                this.line = '';
                this.tixing = "";
                this.shijianduan = "";
                this.xilie = "";
                this.pici = "";
                this.chuanhao = "";
                this.pinci = "";
            },

            //进行新增
            doAdd() {
                if (this.content) {
                    axios.post(" " + url + "/sysconfig/noticeAdd",
                        {
                            "type":this.tixing,
                            "tixing":[{"chuanhao":this.chuanhao},{"xilie":this.xilie},{"pici":this.pici},{"stationid":this. select}],
                            "times":[{"time":this.shijianduan},{"pinci":this.pinci}],
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
        .container {
            .containerDivTop{
                padding-left: 20%;
                .containerDivTop1{
                    height: 50px;
                    display: flex;
                    align-items: center;
                }
                .containerDivTop2{
                    height: 50px;
                    display: flex;
                    align-items: center;
                }
                .containerDivTop3{
                    height: 50px;
                    display: flex;
                    align-items: center;
                }
            }
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
