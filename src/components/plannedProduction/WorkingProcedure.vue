<template>
    <div class="WorkingProcedure">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>资源模型</el-breadcrumb-item>
                <el-breadcrumb-item>工序管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="WorkingProcedure-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>检索工序</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选工序" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span> 加工线选择</span>
                        <span>:</span>
                        <el-select
                            v-model="line"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeScx"
                            placeholder="请输入或者选择生产线">
                            <el-option
                                v-for="item in lineOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="addWorkStation">新增工序</el-button>
                    <el-button type="danger" icon="delete" class="handle-del mr10" @click="deleteWorkStation">删除工序</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
                              @select="selectList"
                              @row-dblclick="editWorkStation"
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
            <el-dialog title="新增工序" :visible.sync="addVisible" width="60%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="所属生产线">
                        <el-select
                            v-model="line"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或生产线">
                            <el-option
                                v-for="item in lineOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工序名称">
                        <el-input v-model="name"></el-input>
                    </el-form-item>
                    <el-form-item label="工序代码">
                        <el-input v-model="code"></el-input>
                    </el-form-item>
                    <el-form-item label="工序内容">
                        <el-input v-model="context"></el-input>
                    </el-form-item>
                    <el-form-item label="饱和人数">
                        <el-input  type="number" v-model="personnum"></el-input>
                    </el-form-item>
                    <el-form-item label="加工能力">
                        <el-input  type="number" v-model="jgnl"></el-input>
                    </el-form-item>
                    <el-form-item label="负荷下限">
                        <el-input  type="number" v-model="xiaxian"></el-input>
                    </el-form-item>
                    <el-form-item label="负荷上限">
                        <el-input  type="number" v-model="shangxian"></el-input>
                    </el-form-item>
                    <el-form-item label="总根数">
                        <el-input  type="number" v-model="allnum"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAddWorkStation" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑工序" :visible.sync="editVisible" width="60%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="所属生产线">
                        <el-select
                            v-model="line"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择">
                            <el-option
                                v-for="item in lineOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工序名称">
                        <el-input v-model="name"></el-input>
                    </el-form-item>
                    <el-form-item label="工序代码">
                        <el-input v-model="code"></el-input>
                    </el-form-item>
                    <el-form-item label="工序内容">
                        <el-input v-model="context"></el-input>
                    </el-form-item>
                    <el-form-item label="饱和人数">
                        <el-input  type="number" v-model="personnum"></el-input>
                    </el-form-item>
                    <el-form-item label="加工能力">
                        <el-input  type="number" v-model="jgnl"></el-input>
                    </el-form-item>
                    <el-form-item label="负荷下限">
                        <el-input  type="number" v-model="xiaxian"></el-input>
                    </el-form-item>
                    <el-form-item label="负荷上限">
                        <el-input  type="number" v-model="shangxian"></el-input>
                    </el-form-item>
                    <el-form-item label="总根数">
                        <el-input  type="number" v-model="allnum"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 删除提示框 -->
            <el-dialog title="删除工序" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false" style="height:30px;width:80px">取 消</el-button>
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

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData:[],

                scx:"",
                scxOptions:[],



                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,

                id: "",
                code: "",
                allnum:"",
                name: '',
                context: '',
                personnum: "",
                jgnl:"",
                line: '',
                shangxian:"",
                xiaxian:"",
                lineOptions:[]

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
                    this.loading();
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

            //双击点击行内编辑
            editWorkStation(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/sysconfig/gongxuDetail", {"id": this.id})
                    .then((res) => {
                        this.name = res.data.name;
                        this.context = res.data.context;
                        this.personnum = res.data.personnum;
                        this.jgnl = res.data.jiagongnengli;
                        this.line = res.data.line;
                        this.code = res.data.code;
                        this.shangxian = res.data.shangxian;
                        this.xiaxian = res.data.xiaxian;
                        this.allnum = res.data.allnum;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            //选择点击删除
            deleteWorkStation() {
                if (this.listData.length) {
                    this.delVisible = true;
                }
                else {
                    this.message = "请勾选要删除的工序";
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
                if (this.name && this.code && this.context && this.personnum && this.line) {
                    axios.post(" " + url + "/sysconfig/gongxuUpdate",
                        {
                            "id": this.id,
                            "name": this.name,
                            "code": this.code,
                            "context": this.context,
                            "personnum": this.personnum,
                            "line": this.line,
                            "jiagongnengli": this.jgnl,
                            "shangxian": this.shangxian,
                            "xiaxian": this.xiaxian,
                            "allnum":  this.allnum ,
                        }
                    )
                        .then((res) => {
                            if (res.data == "1") {
                                this.editVisible = false;
                                this.$message.success(`修改成功`);
                                let that = this;
                                axios.all([
                                    axios.post(" " + url + "/sys/showTableTitle", {"name": "gongxu"}),
                                    axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line}),
                                ])
                                    .then(axios.spread(function (title, table) {
                                        that.cols = title.data;
                                        that.tableData = table.data;
                                    }));

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
            // 确定删除
            deleteRow() {
                axios.post(" " + url + "/sysconfig/gongxuDel",
                    {
                        "ids": this.listData,
                    }
                )
                    .then((res) => {
                        if (res.data === "1") {
                            this.$message.success('删除成功');
                            this.delVisible = false;
                            this.loading();
                        }
                        else {
                            this.$message.warning(`删除失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            //显示新增工序
            addWorkStation() {
                if (this.line) {
                    this.addVisible = true;
                    this.name = "";
                    this.code = "";
                    this.context = "";
                    this.personnum = "";
                    this.jgnl = "";
                    this.shangxian = "";
                    this.xiaxian = "";
                    this.allnum = "";

                }
                else {
                    this.message = "请选择生产线";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //新增工序
            doAddWorkStation() {
                if (this.name && this.code && this.context && this.personnum && this.line) {


                    axios.post(" " + url + "/sysconfig/gongxuAdd",
                        {
                            "name": this.name,
                            "code": this.code,
                            "context": this.context,
                            "personnum": this.personnum,
                            "line": this.line,
                            "jiagongnengli": this.jgnl,
                            "shangxian": this.shangxian,
                            "xiaxian": this.xiaxian,
                            "allnum":  this.allnum ,

                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                let that = this;
                                axios.all([
                                    axios.post(" " + url + "/sys/showTableTitle", {"name": "gongxu"}),
                                    axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line}),
                                ])
                                    .then(axios.spread(function (title, table) {
                                        that.cols = title.data;
                                        that.tableData = table.data;
                                    }));

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

            //根据生产线选择
            changeScx() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "gongxu"}),
                    axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line})
                ])
                    .then(axios.spread(function (title, table) {
                        if (table.data === "-1") {
                            that.cols = title.data;
                            that.tableData = [];
                        }
                        else {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }
                    }));
            },

            //页面初始加载
            loading() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "gongxu"}),
                    axios.post(" " + url + "/sysconfig/getGongxuList", {"id": "1"}),
                    axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
                ])
                    .then(axios.spread(function (title, table, line) {
                        that.cols = title.data;
                        that.tableData = table.data;
                        that.lineOptions = line.data;
                        that.line = line.data[0].indexno
                    }));
            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .WorkingProcedure {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .WorkingProcedure-content {
            .handle-box {
                height: 80px;
                line-height:80px;
                padding-left: 50px;
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
            .red {
                color: #ff0000;
            }

        }
    }


</style>
