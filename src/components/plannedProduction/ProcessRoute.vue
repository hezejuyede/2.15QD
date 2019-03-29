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
                    <label style="margin-right: 5px">
                        <span>检索工艺路线</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选工艺路线" class="handle-input mr10" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span> 工艺路线类型</span>
                        <span>:</span>
                        <el-select
                            v-model="type"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeType"
                            placeholder="输入或选择工艺路线类型">
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span> 加工线</span>
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

                    <button @click="showAddWorkingProcedure">新增工艺路线</button>
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
                            prop="linestr"
                            label="生产线"
                            align="center"
                            min-width="10%">
                        </el-table-column>
                        <el-table-column
                            prop="typestr"
                            label="工艺路线类型"
                            align="center"
                            min-width="15%">
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
            <el-dialog title="新增工艺路线" :visible.sync="addVisible" width="90%">
                <div class="" style="height:450px;overflow:auto">
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px">
                        <el-form-item
                            label="生产线">
                            <el-select
                                v-model="dynamicValidateForm.lineid"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                disabled
                                placeholder="请选择生产线">
                                <el-option
                                    v-for="item in lineOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="工艺路线类型">
                            <el-select
                                v-model="dynamicValidateForm.typeid"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                disabled
                                placeholder="输入或选择工艺路线类型">
                                <el-option
                                    v-for="item in typeOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="工艺路线名">
                            <el-input v-model="dynamicValidateForm.name"
                                      placeholder="工艺路线名"
                                      style="height:30px;width:60%;margin-right: 5%"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="约束条件名称">
                            <el-input v-model="dynamicValidateForm.yuesu"
                                      style="height:30px;width:60%;margin-right: 5%"
                                      placeholder="约束条件名称"></el-input>
                        </el-form-item>
                        <el-form-item
                            v-for="(domain, index) in dynamicValidateForm.domains"
                            :key="domain.key"
                            :prop="'domains.' + index + '.value'"
                            :label="'工序' + (index+1)+''">
                            <div class="appendDiv">
                                <div class="appendDivTemplate">
                                    <el-select
                                        v-model="domain.lineValue"
                                        clearable
                                        filterable
                                        allow-create
                                        default-first-option
                                        @change="changeAddStation(domain.lineValue,index)"
                                        placeholder="请选择生产线">
                                        <el-option
                                            v-for="item in domain.lineOptions"
                                            :key="item.indexno"
                                            :label="item.name"
                                            :value="item.indexno">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="appendDivTemplate">
                                    <el-select
                                        v-model="domain.stationValue"
                                        clearable
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="请选择工位">
                                        <el-option
                                            v-for="item in domain.stationOptions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="appendDivTemplate">
                                    <span>开工（工作日偏移）</span>
                                    <el-input  type="number" v-model="domain.startTime"  style="width: 80px"></el-input>
                                </div>
                                <div class="appendDivTemplate">
                                    <span>完工（工作日偏移）</span>
                                    <el-input  type="number" v-model="domain.endTime"  style="width: 80px"></el-input>
                                </div>
                                <div class="appendDivTemplate">
                                    <el-button
                                        type="danger"
                                        style="height:30px;width:120px"
                                        @click.prevent="removeDomain(domain)">删除
                                    </el-button>
                                </div>
                            </div>


                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="addDomain"
                                style="height:30px;width:20%">新增工位
                            </el-button>
                            <el-button
                                type="success"
                                @click="xzSubmitForm(dynamicValidateForm)"
                                style="height:30px;width:20%">提交信息
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑工艺路线" :visible.sync="editVisible" width="90%">
                <div class="" style="height:450px;overflow:auto">
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px">
                        <el-form-item
                            label="生产线">
                            <el-select
                                v-model="dynamicValidateForm.lineid"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                disabled
                                placeholder="请选择生产线">
                                <el-option
                                    v-for="item in lineOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="工艺路线类型">
                            <el-select
                                v-model="dynamicValidateForm.typeid"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                disabled
                                placeholder="输入或选择工艺路线类型">
                                <el-option
                                    v-for="item in typeOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="工艺路线名">
                            <el-input v-model="dynamicValidateForm.name"
                                      placeholder="工艺路线名"
                                      style="height:30px;width:60%;margin-right: 5%"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="约束条件名称">
                            <el-input v-model="dynamicValidateForm.yuesu"
                                      style="height:30px;width:60%;margin-right: 5%"></el-input>
                        </el-form-item>
                        <el-form-item
                            v-for="(domain, index) in dynamicValidateForm.domains"
                            :key="domain.key"
                            :prop="'domains.' + index + '.value'"
                            :label="'工序' + (index+1)+''">
                            <div class="appendDiv">
                                <div class="appendDivTemplate">
                                    <el-select
                                        v-model="domain.lineValue"
                                        clearable
                                        filterable
                                        allow-create
                                        default-first-option
                                        @change="changeAddStation(domain.lineValue,index)"
                                        placeholder="请选择生产线">
                                        <el-option
                                            v-for="item in domain.lineOptions"
                                            :key="item.indexno"
                                            :label="item.name"
                                            :value="item.indexno">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="appendDivTemplate">
                                    <el-select
                                        v-model="domain.stationValue"
                                        clearable
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="请选择工位">
                                        <el-option
                                            v-for="item in domain.stationOptions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="appendDivTemplate">
                                    <span>开工（工作日偏移）</span>
                                    <el-input v-model="domain.startTime" style="width: 80px"></el-input>
                                </div>
                                <div class="appendDivTemplate">
                                    <span>完工（工作日偏移）</span>
                                    <el-input v-model="domain.endTime" placeholder="结束时间" style="width: 80px"></el-input>
                                </div>
                                <div class="appendDivTemplate">
                                    <el-button
                                        type="danger"
                                        style="height:30px;width:120px"
                                        @click.prevent="removeDomain(domain)">删除
                                    </el-button>
                                </div>
                            </div>


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

                line: '',
                lineOptions: [],
                type: "",
                typeOptions: [],

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
                        lineValue: '',
                        stationValue: '',
                        startTime: '',
                        endTime: '',
                        lineOptions: [],
                        stationOptions: [],

                    }],
                    name: '',
                    id: "",
                    yuesu:"",
                    lineid: "",
                    typeid: ""
                },
                selectOptions:[],

                routeData: [],
                selectlistRow: [],


                conditionOptions: [],
                fieldnameOptions: [],
                relatableOptions: [],


                addStationOptions:[]
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

            deleteRow(){},

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


            //显示新增工艺路线
            showAddWorkingProcedure() {
                if (this.line && this.type) {
                    this.dynamicValidateForm.domains = [{
                        lineValue: '',
                        stationValue: '',
                        startTime: '',
                        endTime: '',
                        lineOptions: [],
                        stationOptions: [],
                    }];

                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/gongyiluxian/getSelectType", {"typeId": this.type, "id": this.line}),
                    ])
                        .then(axios.spread(function (select) {
                            that.dynamicValidateForm.domains[0].stationOptions = select.data;
                            that.addStationOptions =select.data
                        }));
                    this.addVisible = true;
                    this.dynamicValidateForm.domains[0].lineValue = this.line;
                    this.dynamicValidateForm.domains[0].lineOptions = this.lineOptions;
                    this.dynamicValidateForm.name = "";
                    this.dynamicValidateForm.yuesu = "";
                    this.dynamicValidateForm.id = "";
                    this.dynamicValidateForm.lineid = this.line;
                    this.dynamicValidateForm.typeid = this.type;
                }
                else {
                    this.message = "必须选择生产线和类型";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //提交新增工艺路线
            xzSubmitForm(formName) {
                let a = false;
                for (let i = 0; i < formName.domains.length; i++) {
                    if (formName.domains[i].lineValue && formName.domains[i].stationValue && formName.domains[i].startTime && formName.domains[i].endTime) {
                        a = true;
                    }
                    else {
                        a = false
                    }
                }
                if (a === true) {
                    let a = JSON.stringify(formName);
                    axios.post(" " + url + "/gongyiluxian/saveGongyiluxian", {"name": a})
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                let that = this;
                                axios.all([
                                    axios.post(" " + url + "/gongyiluxian/gongyiluxianList", {
                                        "id": that.line,
                                        "type": that.type
                                    }),
                                ])
                                    .then(axios.spread(function (table) {
                                        that.tableData = table.data;
                                    }));
                            }
                            else {
                                this.$message.warning(`新增失败`);
                                this.addVisible = false;
                            }
                        });
                }
                else {
                    this.$message.warning(`新增内容不能为空值`);
                }

            },

            //新增工位
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    lineValue: this.line,
                    stationValue: '',
                    startTime: '',
                    endTime: '',
                    lineOptions: this.lineOptions,
                    stationOptions: this.addStationOptions,
                });
            },

            //删除工位
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item);
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },


            //新增时修改工艺路线后工位的联动
            changeAddStation(lineValue,index){
                let that = this;
                axios.all([
                    axios.post(" " + url + "/gongyiluxian/getSelectType", {"id": lineValue,"typeId":this.type}),
                ])
                    .then(axios.spread(function (select) {
                        that.dynamicValidateForm.domains[index].stationOptions = select.data;
                        that.addStationOptions = select.data
                    }));
            },


            //行内点击编辑
            editWorkStation(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/gongyiluxian/getGongyiluxianDetail", {"id": this.id})
                    .then((res) => {
                        this.dynamicValidateForm.name = res.data.instance.name;
                        this.dynamicValidateForm.lineid = res.data.instance.line;
                        this.dynamicValidateForm.typeid = res.data.instance.type;
                        this.dynamicValidateForm.yuesu = res.data.instance.yuesu;
                        this.dynamicValidateForm.id = this.id;
                        //先定义一个空数据
                        let arr = [];
                        //将返回的值遍历一遍动态添加dynamicValidateForm.domains里面的值
                        for (let i = 0; i < res.data.nodelist.length; i++) {
                            let stationJson = {
                                lineValue: res.data.nodelist[i].lineid,
                                stationValue: res.data.nodelist[i].stationid,
                                startTime: res.data.nodelist[i].startday,
                                endTime: res.data.nodelist[i].endday,
                                lineOptions: this.lineOptions,
                                stationOptions: JSON.parse(res.data.nodelist[i].optionsstr),
                            };
                            arr.push(stationJson)
                        }
                        this.dynamicValidateForm.domains = arr;
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
                            let that = this;
                            axios.all([
                                axios.post(" " + url + "/gongyiluxian/gongyiluxianList", {
                                    "id": that.line,
                                    "type": that.type
                                }),
                            ])
                                .then(axios.spread(function (table) {
                                    that.tableData = table.data;
                                }));
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

            //根据生产线选择
            changeScx() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/gongyiluxian/gongyiluxianList", {"id": this.line,"type":this.type})
                ])
                    .then(axios.spread(function (table) {
                        if(table.data==="-1"){
                            that.tableData = [];
                        }
                        else {
                            that.tableData = table.data;
                        }
                    }));
            },

            //根据类型查询
            changeType() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/gongyiluxian/gongyiluxianList", {"id": this.line,"type":this.type})
                ])
                    .then(axios.spread(function (table) {
                        if(table.data==="-1"){
                            that.tableData = [];
                        }
                        else {
                            that.tableData = table.data;
                        }
                    }));
            },


            //提取初始加载是方法
            loading() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                    axios.post(" " + url + "/gongyiluxian/gongyiluxianList", {"id": "1", "type": "1"}),
                    axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
                    axios.post(" " + url + "/sys/dictionaryList", {"id": "17"}),
                ])
                    .then(axios.spread(function (select, table, line, type) {
                        that.dynamicValidateForm.domains[0].selectOptions = select.data;
                        that.selectOptions = select.data;
                        that.tableData = table.data;
                        that.lineOptions = line.data;
                        that.line = line.data[0].indexno;
                        that.typeOptions = type.data;
                        that.type = type.data[0].indexno;
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
        .appendDiv{
            width: 100%;
            display: flex;
            .appendDivTemplate{
                flex: 1;
                margin-right:  2%;

            }
        }
    }



</style>
