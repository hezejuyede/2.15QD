<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
                <el-breadcrumb-item>人员设定</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>筛选人员</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选人员" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>部门</span>
                        <span>:</span>
                        <el-select
                            v-model="dept"
                            style="width: 150px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSelect"
                            placeholder="请选择部门">
                            <el-option
                                v-for="item in deptOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>角色</span>
                        <span>:</span>
                        <el-select
                            v-model="role"
                            style="width: 150px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSelect"

                            placeholder="请选择角色">
                            <el-option
                                v-for="item in roleOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>岗位</span>
                        <span>:</span>
                        <el-select
                            v-model="post"
                            style="width: 150px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSelect"

                            placeholder="请选择岗位">
                            <el-option
                                v-for="item in postOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="success" icon="delete" class="handle-del mr10" @click="doSearchPerson">查询人员
                    </el-button>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAddPerson">新增人员
                    </el-button>
                    <el-button type="danger" icon="delete" class="handle-del mr10" @click="deletePerson">删除人员
                    </el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="400"
                              @select="selectList"
                              @row-dblclick="editPerson"
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
        <el-dialog title="新增人员" :visible.sync="addVisible" width="40%">

            <el-form ref="form" label-width="100px">
                <el-form-item label="部门">
                    <el-select
                        v-model="dept"
                        style="width:200px"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        @change="changeSelect"
                        placeholder="请选择部门">
                        <el-option
                            v-for="item in deptOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select
                        v-model="role"
                        style="width:200px"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        @change="changeSelect"

                        placeholder="请选择角色">
                        <el-option
                            v-for="item in roleOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="岗位">
                    <el-select
                        v-model="post"
                        style="width:200px"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        @change="changeSelect"

                        placeholder="请选择岗位">
                        <el-option
                            v-for="item in postOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="登陆名">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="pwd"></el-input>
                </el-form-item>
                <el-form-item label="显示名">
                    <el-input v-model="showname"></el-input>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input v-model="code"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAddPerson" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑人员" :visible.sync="editVisible" width="60%">
            <el-form ref="form" label-width="100px">
                <el-form-item label="部门">
                    <el-select
                        v-model="dept"
                        style="width:200px"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        @change="changeSelect"
                        placeholder="请选择部门">
                        <el-option
                            v-for="item in deptOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select
                        v-model="role"
                        style="width:200px"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        @change="changeSelect"

                        placeholder="请选择角色">
                        <el-option
                            v-for="item in roleOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="岗位">
                    <el-select
                        v-model="post"
                        style="width:200px"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        @change="changeSelect"

                        placeholder="请选择岗位">
                        <el-option
                            v-for="item in postOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="登陆名">
                    <el-input v-model="name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="pwd"></el-input>
                </el-form-item>
                <el-form-item label="显示名">
                    <el-input v-model="showname"></el-input>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input v-model="code"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="删除人员" :visible.sync="delVisible" width="300px" center>
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

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData: [],


                cols: [],
                tableData: [],

                deptOptions: [],
                dept: "",
                roleOptions: [],
                role: "",
                postOptions: [],
                post: "",


                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,

                id: "",
                name: '',
                pwd: '',
                showname: '',
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
                        axios.post(" " + url + "/sysconfig/deptList"),
                        axios.post(" " + url + "/sysconfig/roleList"),
                        axios.post(" " + url + "/sysconfig/postList")
                    ])
                        .then(axios.spread(function (dept, role, post) {
                            that.deptOptions = dept.data;
                            that.roleOptions = role.data;
                            that.postOptions = post.data;
                            that.loadingShowData();

                        }));


                }
            },

            //瞬间加载数据
            loadingShowData(data1, data2, data3) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "renyuan"}),
                    axios.post(" " + url + "/sysconfig/personList", {"deptid": data1, "roleid": data2, "postid": data3})
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
                    this.listData = [];
                }
            },


            //进行人员查询
            doSearchPerson() {
                this.loadingShowData(this.dept, this.role, this.post)
            },


            //显示新增人员
            showAddPerson() {
                this.post = "";
                this.role = "";
                this.dept = "";
                this.addVisible = true;
                this.id = "";
                this.name = "";
                this.pwd = "";
                this.showname = "";
                this.code = "";
            },
            //新增人员
            doAddPerson() {
                if (this.name && this.pwd && this.showname && this.code && this.post && this.dept && this.role) {
                    axios.post(" " + url + "/sysconfig/userAdd",
                        {
                            "postid": this.post,
                            "deptid": this.dept,
                            "roleid": this.role,
                            "name": this.name,
                            "pwd": this.pwd,
                            "showname": this.showname,
                            "code": this.code
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                this.loadingShowData(this.dept, this.role, this.post)
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
            editPerson(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/sysconfig/personDetail", {"id": this.id})
                    .then((res) => {
                        this.post = res.data.postid;
                        this.dept = res.data.deptid;
                        this.role = res.data.roleid;
                        this.name = res.data.name;
                        this.pwd = res.data.pwd;
                        this.showname = res.data.showname;
                        this.code = res.data.code;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit() {
                if (this.showname && this.code) {
                    axios.post(" " + url + "/sysconfig/updatePerson",
                        {

                            "id": this.id,
                            "postid": this.post,
                            "deptid": this.dept,
                            "roleid": this.role,
                            "pwd": this.pwd,
                            "showname": this.showname,
                            "code": this.code
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`修改成功`);
                                this.editVisible = false;
                                this.loadingShowData(this.dept, this.role, this.post)
                            }
                            else {
                                this.$message.warning(`删除成功`);
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
            deletePerson() {
                if (this.listData.length) {
                    this.delVisible = true;
                }
                else {
                    this.message = "请勾选要删除的人员";
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
                axios.post(" " + url + "/sysconfig/delPerson",
                    {
                        "ids": this.listData,
                    }
                )
                    .then((res) => {
                        if (res.data === "1") {

                            this.$message.success('删除成功');
                            this.delVisible = false;
                            this.loadingShowData(this.dept, this.role, this.post)
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
