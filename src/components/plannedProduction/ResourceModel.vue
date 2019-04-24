<template>
    <div class="WorkingProcedure">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="WorkingProcedure-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>检索工艺路线</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选工序" class="handle-input mr10"></el-input>
                    </label>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="addWorkStation">新增班次
                    </el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'14px'}"
                              border
                              height="450"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <template v-for="(col ,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>

                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">
                                    编辑
                                </el-button>
                                <el-button type="text" icon="el-icon-delete" class="red"
                                           @click="handleDelete(scope.$index, scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                </div>
            </div>
            <!--新增弹出框 -->
            <el-dialog title="新增班次" :visible.sync="addVisible" width="60%">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="班次">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="时间">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑班次" :visible.sync="editVisible" width="60%">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="序号">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="工序名称">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="工序代码">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="工序内容">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="饱和人数">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属生产线">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 删除提示框 -->
            <el-dialog title="删除班次" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="deleteRow" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                }
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
        components: {},
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
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "renyuan"}),
                        axios.post(" " + url + "/sysconfig/personList")
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }));
                }
            },

            //行内点击编辑
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                };
                this.editVisible = true;
            },

            //行内点击删除
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },


            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            // 确定删除
            deleteRow() {
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },

            //新增工序
            addWorkStation() {
                this.addVisible = true;

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
                line-height: 80px;
                padding-left: 50px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width: 80px;
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
