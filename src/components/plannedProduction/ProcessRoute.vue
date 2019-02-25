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
                    <!-- <button @click="deleteWorkStation" class="colorRed">删除工艺路线</button>-->
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="430"
                              highlight-current-row
                              @select='selectRow'
                              @row-dblclick="editWorkStation"
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
                    </el-table>
                </div>
            </div>

            <!--新增弹出框 -->
            <el-dialog title="新增工艺路线" :visible.sync="addVisible" width="40%">
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
                            :key="domain.key"
                            :prop="'domains.' + index + '.value'"
                            :label="'路线工序' + (index+1)+''">
                            <el-select
                                v-model="domain.value"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择工位">
                                <el-option
                                    v-for="item in domain.selectOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-button
                                type="danger"
                                style="height:30px;width:20%"
                                @click.prevent="removeDomain(domain)">删除
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="addDomain"
                                style="height:30px;width:20%">新增工位
                            </el-button>
                            <el-button
                                type="success"
                                @click="submitForm(dynamicValidateForm)"
                                style="height:30px;width:20%">提交信息
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑工艺路线" :visible.sync="editVisible" width="40%">
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
                            :key="domain.key"
                            :prop="'domains.' + index + '.value'"
                            :label="'路线工序' + (index+1)+''">
                            <el-select
                                v-model="domain.value"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择工位">
                                <el-option
                                    v-for="item in domain.selectOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>

                            <el-button
                                type="danger"
                                style="height:30px;width:20%"
                                @click.prevent="removeDomain(domain)">删除
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="addDomain"
                                style="height:30px;width:20%">
                                新增工位
                            </el-button>
                            <el-button
                                type="success"
                                @click="saveEdit(dynamicValidateForm)"
                                style="height:30px;width:20%">
                                提交修改
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <!-- 删除提示框 -->
            <el-dialog title="删除工艺路线" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="deleteRow" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

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
                                :data="routeData"
                                ref="table"
                                tooltip-effect="dark"
                                border
                                stripe
                                @selection-change='tableSelectRow'
                                style="width: 95%">
                                <el-table-column type="selection" width="45" align="center">
                                </el-table-column>
                                <el-table-column label="表名" align="center">
                                    <template slot-scope="scope">
                                        <el-select
                                            v-model="scope.row.relatable"
                                            clearable
                                            filterable
                                            allow-create
                                            default-first-option
                                            placeholder="请选择表名">
                                            <el-option
                                                v-for="item in relatableOptions"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="字段名" align="center">
                                    <template slot-scope="scope">
                                        <el-select
                                            v-model="scope.row.fieldname"
                                            clearable
                                            filterable
                                            allow-create
                                            default-first-option
                                            placeholder="请选择字段名">
                                            <el-option
                                                v-for="item in fieldnameOptions"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="条件" align="center">
                                    <template slot-scope="scope">
                                        <el-select
                                            v-model="scope.row.condition"
                                            clearable
                                            filterable
                                            allow-create
                                            default-first-option
                                            placeholder="请选择条件">
                                            <el-option
                                                v-for="item in conditionOptions"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code">
                                            </el-option>
                                        </el-select>
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
        </div>
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
                id:"",


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
                listData:[],

                dynamicValidateForm: {
                    domains: [{
                        value: '',
                        selectOptions:[]
                    }],
                    name: '',
                    id:""
                },
                selectOptions:[],

                routeData: [],
                selectlistRow: [],


                conditionOptions: [],
                fieldnameOptions: [],
                relatableOptions: []
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
                    this.loading()
                }
            },

            //行内点击编辑
            editWorkStation(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/gongyiluxian/getGongyiluxianDetail", {"id": this.id})
                    .then((res) => {
                        this.dynamicValidateForm.name = res.data.instance.name;
                        this.dynamicValidateForm.id = this.id;
                        let arr = [];
                        for (let i = 0; i < res.data.nodelist.length; i++) {
                            let a = {
                                value: res.data.nodelist[i].stationid,
                                selectOptions: this.selectOptions
                            };
                            arr.push(a)
                        }
                        this.dynamicValidateForm.domains = arr
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit(formName) {
                let a = JSON.stringify(formName);

                axios.post(" " + url + "/gongyiluxian/saveGongyiluxian", {"name":a})
                    .then((res) => {
                        if (res.data === "1") {
                            this.editVisible = false;
                            this.$message.success(`修改成功`);
                            this.loading()
                        }
                        else {
                            this.$message.warning(`修改失败`);
                            this.addVisible = false;
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            //行内点击删除
            deleteWorkStation() {
                if (this.listData.length) {
                    this.delVisible = true;
                }
                else {
                    this.message = "请选择要删除的工艺路线";
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
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            //新增工序
            addWorkStation() {
                this.addVisible = true;
                this.dynamicValidateForm.name = "";
                this.dynamicValidateForm.id = "";
                this.dynamicValidateForm.domains= [{
                    value: '',
                    selectOptions:this.selectOptions
                }]
            },

            //提交信息
            submitForm(formName) {
                let a = false;
                for (let i = 0; i < formName.domains.length; i++) {
                    if (formName.domains[i].value) {
                        a = true;
                    }
                    else {
                        a = false
                    }
                }
                if(a===true){
                    let a = JSON.stringify(formName);
                    axios.post(" " + url + "/gongyiluxian/saveGongyiluxian", {"name": a})
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                let that = this;
                                axios.all([
                                    axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                                    axios.post(" " + url + "/gongyiluxian/gongyiluxianList")
                                ])
                                    .then(axios.spread(function (select, table) {
                                        that.dynamicValidateForm.domains[0].selectOptions = select.data;
                                        that.selectOptions = select.data;
                                        that.tableData = table.data
                                    }));
                            }
                            else {
                                this.$message.warning(`新增失败`);
                                this.addVisible = false;
                            }
                        });
                }
                else {
                    this.$message.warning(`工序不能为空`);
                }

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
                    selectOptions: this.selectOptions
                });
            },


            // 路线获取表格选中时的数据
            selectRow(val) {
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

            //编辑约束条件
            editYs() {
                if (this.listData.length) {
                    if (this.listData.length > 1) {
                        this.message = "只能选择一个";
                        this.HideModal = false;
                        const that = this;

                        function a() {
                            that.message = "";
                            that.HideModal = true;
                        }

                        setTimeout(a, 2000);
                    }
                    else {
                        this.editYsVisible = true;
                        let that = this;
                        axios.all([
                            axios.post(" " + url + "/sys/dictionaryList", {"id": "14"}),
                            axios.post(" " + url + "/sys/dictionaryList", {"id": "12"}),
                            axios.post(" " + url + "/sys/dictionaryList", {"id": "13"})
                        ])
                            .then(axios.spread(function (conditionOptions, fieldnameOptions, relatableOptions) {
                                that.conditionOptions = conditionOptions.data;
                                that.fieldnameOptions = fieldnameOptions.data;
                                that.relatableOptions = relatableOptions.data;
                            }));

                        axios.post(" " + url + "/condition/conditionList", {"id": this.listData[0]})
                            .then((res) => {
                                let data = [];
                                for (let i = 0; i < res.data.length; i++) {
                                    var list = {
                                        relatable: res.data[i].relatable,
                                        fieldname: res.data[i].fieldname,
                                        condition: res.data[i].condition,
                                        value: res.data[i].value,
                                    };
                                    data.push(list);
                                }
                                this.routeData = data;

                            })
                            .catch((err) => {
                                console.log(err)
                            });
                    }
                }
                else {
                    this.message = "请选择要编辑的工艺路线";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            // 约束条件选择哪一行
            tableSelectRow (val) {
                this.selectlistRow = val;
            },
            // 增加行
            addRow() {
                var list = {
                    relatable: this.relatable,
                    fieldname: this.fieldname,
                    value: this.value,
                    condition: this.condition
                };
                this.routeData.push(list)
            },
            // 删除选中行
            delData() {
                for (let i = 0; i < this.selectlistRow.length; i++) {
                    let val = this.selectlistRow;
                    val.forEach((val, index) => {
                        this.routeData.forEach((v, i) => {
                            if (val.value === v.value) {
                                this.routeData.splice(i, 1)
                            }
                        })
                    })
                }
            },

            //提交
            submitYS() {
                if (this.listData.length) {
                    let id =this.listData[0];
                    axios.post(" " + url + "/condition/conditionSave", {"id": id, "name": this.routeData})
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`修改成功`);
                                this.editYsVisible = false;
                                this.loading()
                            }
                            else {
                                this.$message.warning(`修改失败`);
                            }
                        });
                }
                else {

                }
            },

            //提取初始加载是方法
            loading() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                    axios.post(" " + url + "/gongyiluxian/gongyiluxianList")
                ])
                    .then(axios.spread(function (select, table) {
                        that.dynamicValidateForm.domains[0].selectOptions = select.data;
                        that.selectOptions = select.data;
                        that.tableData = table.data
                    }));
            }
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
            padding-top: 10px;
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
                .colorRed{
                    background-color: @color-bg-red;
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
