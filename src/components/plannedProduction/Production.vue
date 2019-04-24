<template>
    <div class="production">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>计划排产</el-breadcrumb-item>
                <el-breadcrumb-item>排产</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="productionContent">
            <div class="productionContentTab">
                <div class="normalTab">
                    <el-select v-model="GJGType" placeholder="选择管加工类型">
                        <el-option
                            v-for="item in GJGTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="batchTab">
                    <el-select
                        v-model="batch"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请输入或者选择批次">
                        <el-option
                            v-for="item in batchOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <button @click="doSearch">查询</button>
                </div>
                <div class="timeTab">
                    <button @click="doExamine">生成计划</button>
                    <button @click="doDeletePlan" class="red">删除计划</button>
                </div>
                <div class="operationTab">

                <!--    <div class="operationTabDiv" @click="doSave">
                        <el-button type="success" icon="el-icon-check" circle ></el-button>
                        <span>保存</span>
                    </div>
                    <div class="operationTabDiv"  @click="doAdd">
                        <el-button type="primary" icon="el-icon-plus" circle></el-button>
                        <span>新增</span>
                    </div>
                    <div class="operationTabDiv" @click="doDelete">
                        <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        <span>删除</span>
                    </div>-->
                </div>
            </div>
            <div class="productionContentTable">
                <el-table class="tb-edit"
                          :data="tableData"
                          :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'14px'}"
                          border
                          height="400"
                          highlight-current-row
                          @row-dblclick="clickTable"
                          style="width: 98%;margin: auto">
                    <template v-for="(col ,index) in cols">
                        <el-table-column  align="center" :prop="col.prop" :label="col.label"></el-table-column>
                    </template>
                </el-table>
            </div>

            <!--弹出工序列表-->
            <el-dialog title="工序列表" :visible.sync="workStationVisible" width="60%">
                <div class="" style="width: 200px;height: 200px">
                    <el-steps align-center :space="100">
                        <el-step v-for="(item,index) in workstation" :title="item.stationname"></el-step>
                    </el-steps>
                </div>
            </el-dialog>


            <!-- 保存提示框 -->
            <el-dialog title="提示" :visible.sync="saveData" width="300px" center>
                <div class="del-dialog-cnt">是否确定要保存数据</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="saveData = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doSavePCData" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 新增弹出框 -->
            <el-dialog title="新增" :visible.sync="addVisible" width="30%">
                <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd"
                                        style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="工位">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="addRow" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>


            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="deleteRow" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

        </div>
        <Modal :msg="message"
               :isHideModal="HideModal"></Modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import Modal from '../../common/modal'
    import url from '../../assets/js/URL'

    export default {
        name: 'FactoryCalendar',
        data() {
            return {
                message: '',
                HideModal: true,

                delVisible: false,
                workStationVisible:false,
                addVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },

                saveData:false,


                cols: [],
                tableData: [],

                GJGType: '',
                GJGTypeOptions: [
                    {
                        value: '1',
                        label: '正常管加工'
                    },
                    {
                        value: '2',
                        label: '异常管加工'
                    }
                ],

                batch: "",
                batchOptions: [],
                id:"",

                workstation:[],
                examineTime:""
            }
        },
        components: {Modal},
        mounted() {


        },
        created() {
            this.getAdminState()

        },
        methods: {

            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                const userInfo = localStorage.getItem("userInfo");
                if (userInfo === null) {
                    this.$router.push("/")
                }
                else {
                    axios.post(" " + url + "/sys/getPiciList")
                        .then((res) => {
                            this.batchOptions = res.data;
                            let that = this;
                            axios.all([
                                axios.post(" " + url + "/plan/paichanTitle.html", {"pici": res.data[0].id}),
                                axios.post(" " + url + "/plan/paichan.html", {"pici": res.data[0].id})
                            ])
                                .then(axios.spread(function (title, table) {
                                    that.cols = title.data;
                                    that.tableData = table.data;
                                }));
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            },


            //点击表格
            clickTable(row, column, cell, event) {
                this.workStationVisible = true;
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/plan/getPlanNode", {"id": this.id})
                    .then((res) => {
                        this.workstation = res.data;
                    })
                    .catch((err) => {
                        console.log(err)
                    });

            },

            //进行查询
            doSearch() {
                if (this.batch && this.GJGType) {
                    let that = this;
                    axios.all([
                        axios.post(" "+ url +"/plan/paichanTitle.html", {"pici": this.batch}),
                        axios.post(" "+ url +"/plan/paichan.html", {"pici": this.batch})
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }));
                }
                else {
                    this.message = "请选择加工类型和批次";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },


            //审核
            doExamine() {
                if (this.batch) {
                    axios.post(" " + url + "/plan/autoPlan.html", {"pici": this.batch})
                        .then((res) => {
                            if (res.data === "success") {
                                this.message = "已生成计划";
                                this.HideModal = false;
                                const that = this;

                                function a() {
                                    that.message = "";
                                    that.HideModal = true;
                                }

                                setTimeout(a, 2000);
                            }
                            else {
                                this.message = res.data;
                                this.HideModal = false;
                                const that = this;

                                function b() {
                                    that.message = "";
                                    that.HideModal = true;
                                }

                                setTimeout(b, 2000);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.message = "请输入批次";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //弹出保存框
            doSave() {
               this.saveData = true;
            },

            //保存排产数据
            doSavePCData (){
                this.$message.success('保存排产数据成功');
                this.saveData = false;
            },

            //新增弹出框
            doAdd() {
               this.addVisible=true;
            },

            addRow(){
                this.$set(this.tableData, this.idx, this.form);
                this.addVisible = false;
                this.$message.success(`新增第 ${this.idx + 1} 行成功`);
            },



            //弹出删除框
            doDelete() {
                this.delVisible = true
            },
            //进行删除
            deleteRow() {
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            //删除排产
            doDeletePlan() {
                if (this.batch) {
                    axios.post(" " + url + "/delData/delPlanData", {"pici": this.batch})
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.message = "已经删除";
                                this.HideModal = false;
                                const that = this;

                                function a() {
                                    that.message = "";
                                    that.HideModal = true;
                                }

                                setTimeout(a, 2000);
                            }
                            else {
                                let message = res.data.message;
                                this.$message.warning(message);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.message = "请输入批次";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }

            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";
    .production{
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs{
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .productionContent {
            .productionContentTab {
                height: 100px;
                display: flex;
                border-bottom: 1px solid @color-background-d;
                .normalTab{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;


                }
                .batchTab{
                    flex: 1.1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    button {
                        width: 20%;
                        height: 35px;
                        text-align: center;
                        line-height: 35px;
                        border: none;
                        border-radius: 10%;
                        background-color: @color-blue;
                        color: @color-white;
                        font-size: 16px;
                        margin-left: 5%;
                    }

                }
                .timeTab{
                    flex: 1.9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    button{
                        width:20%;
                        height: 35px;
                        text-align: center;
                        line-height: 35px;
                        border: none;
                        border-radius: 10%;
                        background-color: @color-blue;
                        color: @color-white;
                        font-size: 16px;
                        margin-left: 5%;
                        margin-right: 5%;
                    }
                    .red{
                        background-color: @color-bg-red;
                    }

                }
                .operationTab {
                    flex: 1.2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .operationTabDiv{
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        span{
                            margin-left: 5%;
                        }
                    }
                }
            }
            .productionContentTable{
                padding-top: 10px;

            }




        }

    }



</style>
