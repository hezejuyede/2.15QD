<template>
    <div class="dictionaryMaintenance">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>字典维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="dictionaryMaintenance-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>筛选字典</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选字典" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>字典类型</span>
                        <span>:</span>
                        <el-select
                            v-model="select"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择字典类型">
                            <el-option
                                v-for="item in selectOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="success" icon="delete" class="handle-del mr10" @click="doSearch">查询字典</el-button>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAddPerson">新增字典</el-button>
                    <el-button type="danger" icon="delete" class="handle-del mr10" @click="deletePerson">删除字典</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:' rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
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
        <el-dialog title="新增字典" :visible.sync="addVisible" width="60%">
            <el-form ref="form" label-width="100px">
                <el-form-item label="下拉列表">
                    <el-select
                        v-model="select"
                        clearable
                        filterable
                        allow-create
                        disabled
                        default-first-option
                        placeholder="请选择字典类型">
                        <el-option
                            v-for="item in selectOptions"
                            :key="item.indexno"
                            :label="item.name"
                            :value="item.indexno">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                <el-form-item label="序号">
                    <el-input type="number" v-model="indexno"></el-input>
                </el-form-item>
                <el-form-item label="代码">
                    <el-input v-model="code"></el-input>
                </el-form-item>
                <el-form-item label="顺序号">
                    <el-input type="number" v-model="showindex"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAddPerson" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑字典" :visible.sync="editVisible" width="60%">
            <el-form ref="form" label-width="100px">
                <el-form-item label="下拉列表">
                    <el-select
                        v-model="select"
                        clearable
                        filterable
                        allow-create
                        disabled
                        default-first-option
                        placeholder="请选择字典类型">
                        <el-option
                            v-for="item in selectOptions"
                            :key="item.indexno"
                            :label="item.name"
                            :value="item.indexno">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                <el-form-item label="序号">
                    <el-input type="number" v-model="indexno"></el-input>
                </el-form-item>
                <el-form-item label="代码">
                    <el-input v-model="code"></el-input>
                </el-form-item>
                <el-form-item label="顺序号">
                    <el-input type="number" v-model="showindex"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="删除字典" :visible.sync="delVisible" width="300px" center>
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

                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,



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
        components: {Modal},
        mounted() {


        },
        created() {
            this.getAdminState();
        },
        methods: {
            //增删改查瞬间显示数据
            loadingShowData(data){
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "dictedit"}),
                    axios.post(" " + url + "/sysconfig/dictionaryList",{"type":data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },


            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                const userInfo = localStorage.getItem("userInfo");
                if (userInfo === null) {
                    this.$router.push("/")
                }
                else {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "-1"}),
                    ])
                        .then(axios.spread(function (select) {
                            that.selectOptions = select.data;
                            that.select =select.data[1].indexno;
                            that.loadingShowData(1)

                        }));
                }
            },
            //查询字典
            doSearch(){
                if (this.select) {
                   this.loadingShowData(this.select)
                }
                else {
                    this.message = "请选择字典类型";
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
            //双击点击行内编辑
            editPerson(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/sysconfig/dictionaryDetail", {"id": this.id})
                    .then((res) => {
                        this.name = res.data.name;
                        this.indexno = res.data.indexno;
                        this.showindex = res.data.showindex;
                        this.code = res.data.code;
                        this.select=res.data.type;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
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
            // 保存编辑
            saveEdit() {
                if (this.name && this.select && this.indexno && this.showindex) {
                    axios.post(" " + url + "/sysconfig/updateDictionary",
                        {
                            "id":this.id,
                            "type": this.select,
                            "name": this.name,
                            "indexno": this.indexno,
                            "code": this.code,
                            "showindex": this.showindex
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
                axios.post(" " + url + "/sysconfig/delDictionary",
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
            //显示新增字典
            showAddPerson() {
                this.addVisible = true;
                this.name = '';
                this.indexno = '';
                this.showindex = '';
                this.code = "";
            },
            //新增字典
            doAddPerson() {
                if (this.name && this.select && this.indexno && this.showindex) {
                    axios.post(" " + url + "/sysconfig/DictionaryAdd",
                        {
                            "type": this.select,
                            "name": this.name,
                            "indexno": this.indexno,
                            "code": this.code,
                            "showindex": this.showindex
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
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .dictionaryMaintenance {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .dictionaryMaintenance-content {
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
