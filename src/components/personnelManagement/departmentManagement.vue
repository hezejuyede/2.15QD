<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
                <el-breadcrumb-item>部门设定</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索部门</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索部门" class="handle-input mr10"></el-input>
                    </label>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">新增部门</el-button>
                    <el-button type="danger" icon="delete" class="handle-del mr10" @click="showDelete">删除部门</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
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
            <el-dialog title="新增部门" :visible.sync="addVisible" width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="部门名称">
                        <el-input v-model="name" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑部门" :visible.sync="editVisible" width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="部门名称">
                        <el-input v-model="name" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 删除提示框 -->
            <el-dialog title="删除部门" :visible.sync="delVisible" width="300px" center>
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

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,

                val:[],


                listData:[],

                id:"",


                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,


                name: "",



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
                    this.loadingShowData();
                }
            },

            //瞬间加载数据
            loadingShowData() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "dept"}),
                    axios.post(" " + url + "/sysconfig/deptList")
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },

            //根据工位选择
            changeSelect() {
                this.loadingShowData(this.workStation)
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

            //显示新增
            showAdd(){
                this.addVisible=true;
                this.name= "";
            },

            //进行新增
            doAdd() {
                if (this.name ) {
                    axios.post(" " + url + "/sysconfig/deptAdd",
                        {
                            "name": this.name
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                this.loadingShowData(this.workStation)

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

            //双击点击行内编辑
            edit(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/sysconfig/deptDetail", {"id": this.id})
                    .then((res) => {
                        this.name = res.data.name;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit() {
                if (this.name) {
                    axios.post(" " + url + "/sysconfig/updateDept",
                        {
                            "id": this.id,
                            "name": this.name,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.editVisible = false;
                                this.$message.success(`修改成功`);
                                this.loadingShowData()
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

            //选择点击显示删除
            showDelete() {
                if (this.listData.length) {
                    this.delVisible = true;
                }
                else {
                    this.message = "请勾选要删除的按钮";
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
                axios.post(" " + url + "/sysconfig/delDept",
                    {
                        "ids": this.listData,
                    }
                )
                    .then((res) => {
                        if (res.data === "1") {
                            this.$message.success('删除成功');
                            this.delVisible = false;
                            this.loadingShowData();
                        }
                        else {
                            this.$message.warning(`删除失败`);
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
