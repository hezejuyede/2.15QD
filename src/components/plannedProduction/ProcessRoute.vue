<template>
    <div class="WorkingProcedure">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>资源模型</el-breadcrumb-item>
                <el-breadcrumb-item>工艺路线</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="WorkingProcedure-content">
            <div class="container">
                <div class="handle-box">
                    <el-input v-model="select_word" placeholder="筛选工艺路线" class="handle-input mr10"></el-input>
                    <button @click="addWorkStation">新增工艺路线</button>
                    <button @click="editYs" class="color">编辑约束条件</button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'18px'}"
                              border
                              highlight-current-row
                              @select='selectRow'

                              style="width: 98%;margin: auto">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-form label-position="left" inline class="demo-table-expand"
                                         v-for="(item,index) in scope.row.condition">
                                    <el-form-item :label="item.filednamestr">
                                        <div class="aaa">
                                            <span>({{item.fieldname}})</span>
                                            <span>{{item.condition}}</span>
                                            <span>{{item.value}}</span>
                                        </div>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="inst"
                            label="工艺路线名称"
                            align="center"
                            min-width="15%">
                        </el-table-column>
                        <el-table-column
                            prop="yueshutiaojian"
                            label="约束条件"
                            align="center"
                            min-width="15%">
                        </el-table-column>
                        <el-table-column
                            label="工艺路线详情"
                            align="center"
                            min-width="60%">
                            <template slot-scope="scope">
                                <el-steps align-center :space="100">
                                    <el-step v-for="(item,index) in scope.row.nodes" :title="item.name"></el-step>
                                </el-steps>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            min-width="10%">
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

            <!--编辑约束条件 -->
            <el-dialog title="编辑约束条件" :visible.sync="editYsVisible" width="60%">
                <div class="" style="height:450px;overflow:auto">
                    <div class="tableDate">
                        <div class="button" style="width:3%;float:right;">
                            <P>
                                <el-button class="el-icon-plus" @click.prevent="addRow()"></el-button>
                            </P>
                            <p>
                                <el-button class="el-icon-minus" @click.prevent="delData()"></el-button>
                            </p>
                        </div>
                        <div class="table">
                            <el-table
                                :data="tableData1"
                                ref="table"
                                tooltip-effect="dark"
                                border
                                stripe
                                style="width: 95%">
                                <el-table-column label="表名" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.relatable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="字段名" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.fieldname"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="条件" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.condition"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="值" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.value"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="">
                        <el-button type="primary" @click="submitYS"
                                   style="height:30px;width:20%">提交
                        </el-button>
                    </div>
                </div>
            </el-dialog>
            <!--新增弹出框 -->
            <el-dialog title="新增工艺路线" :visible.sync="addVisible" width="60%">
                <div class="" style="height:450px;overflow:auto">
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px">
                        <el-form-item
                            prop="id"
                            label="工艺路线名">
                            <el-input v-model="dynamicValidateForm.name"
                                      style="height:30px;width:60%;margin-right: 5%"></el-input>
                        </el-form-item>
                        <el-form-item
                            v-for="(domain, index) in dynamicValidateForm.domains"
                            :label="'路线工位' + index"
                            :key="domain.key"
                            :prop="'domains.' + index + '.value'">
                            <el-input v-model="domain.value" style="height:30px;width:60%;margin-right: 5%"
                                      placeholder="请输入工位">
                            </el-input>
                            <el-button
                                type="danger"
                                style="height:30px;width:20%"
                                @click.prevent="removeDomain(domain)">删除
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(dynamicValidateForm)"
                                       style="height:30px;width:20%">提交
                            </el-button>
                            <el-button type="primary" @click="addDomain" style="height:30px;width:20%">新增工位</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑工序" :visible.sync="editVisible" width="60%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="工艺路线名称">
                        <el-input v-model="name"></el-input>
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
                tjID: "",


                s: 1,
                data: [],


                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,
                editYsVisible: false,

                name: "",
                xq: [],

                /*  gwTypeOptions:[],*/


                dynamicValidateForm: {
                    domains: [{
                        value: ''
                    }],
                    name: '',

                },


                tableData1: [],
                selectlistRow: []
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
                    axios.post(" " + url + "/gongyiluxian/gongyiluxianList")
                        .then((res) => {
                            this.tableData = res.data
                        });
                    /*   axios.post(" " + url + "/api/getProcessList.html") .then((res)=>{
                           this.gwTypeOptions = res.data;
                       });*/


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
            //编辑约束条件
            editYs() {
                if (this.tjID) {
                    this.editYsVisible = true;
                }
                else {
                    this.$message.warning(`请选择工序`);
                }
            },

            //新增工序
            addWorkStation() {
                this.addVisible = true;
            },
            //提交信息
            submitForm(formName) {

                let a = JSON.stringify(formName);
                axios.post(" " + url + "/gongyiluxian/saveGongyiluxian", {"name": a})
                    .then((res) => {
                        if (res.data === "1") {
                            this.$message.success(`新增成功`);
                            this.addVisible = false;
                        }
                    });
            },
            //删除工位
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item);
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            //新增工位
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: "",
                    key: Date.now()
                });
            },


            // 获取表格选中时的数据
            selectRow(val) {
                this.tjID = val[0].id

            },
            // 增加行
            addRow() {
                var list = {
                    relatable: this.relatable,
                    fieldname: this.fieldname,
                    value: this.value,
                    condition: this.condition
                };
                this.tableData1.unshift(list)
            },
            // 删除方法
            // 删除选中行
            delData() {
                for (let i = 0; i < this.selectlistRow.length; i++) {
                    let val = this.selectlistRow;

                    val.forEach((val, index) => {
                        this.tableData1.forEach((v, i) => {
                            if (val.rowNum === v.rowNum) {
                                this.tableData.splice(i, 1)
                            }
                        })
                    })
                }
                // 删除完数据之后清除勾选框
                this.$refs.tableData1.clearSelection()
            },

            submitYS() {
                if (this.tjID) {
                    axios.post(" " + url + "/condition/conditionSave", {"id": this.tjID, "name": this.tableData1})
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                            }
                            else {
                                this.$message.warning(`新增失败`);
                            }
                        });
                }
                else {

                }
            },
        }

    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .demo-table-expand {
        font-size: 0;
        label {
            width: 290px;
            color: #99a9bf;
            background-color: #00CCFF;
        }
        .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 100%;
            padding-left: 17%;
            .aaa {
                width: 150px;
                height: 100%;
                text-align: right;
            }

        }
    }

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
                    width: 400px;
                    display: inline-block;
                    margin-right: 20px;
                }
                button {
                    width: 120px;
                    height: 35px;
                    text-align: center;
                    line-height: 35px;
                    border: none;
                    border-radius: 10%;
                    background-color: @color-blue;
                    color: @color-white;
                    font-size: 16px;
                    margin-left: 20px;
                }
                .color {
                    background-color: @color-bg-lv;
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
