<template>
    <div class="TaskScheduling">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>生产调度</el-breadcrumb-item>
                <el-breadcrumb-item>任务调度</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="productionContent">
            <div class="productionContentTab">
                <div class="batchTab1">
                    <el-select
                        v-model="batch"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        placeholder="批次">
                        <el-option
                            v-for="item in batchOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="batchTab">
                    <el-input v-model="ch" placeholder="船号" style="width: 100px"></el-input>
                </div>
                <div class="batchTab">
                    <el-input v-model="ygh" placeholder="一贯号" style="width: 100px"></el-input>
                </div>
                <div class="batchTab">
                    <el-input v-model="code" placeholder="CODE号" style="width: 100px"></el-input>
                </div>
                <div class="batchTab">
                    <el-input v-model="pie" placeholder="PIE" style="width: 100px"></el-input>
                </div>
                <div class="operationTab">
                    <button   @click="doSearch">查询</button>
                </div>
                <div class="operationTab">
                    <button   @click="editState">修改状态</button>
                </div>
                <div class="operationTab">
                    <button   @click="editYxj">修改优先级</button>
                </div>
               <!-- <div class="operationTab">
                    <button   @click="editRoute">修改工艺路线</button>
                </div>-->
                <div class="operationTabRight"></div>
            </div>
            <div class="productionContentTable">
                <el-table
                    :data="tableData"
                    :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                    height="400"
                    border
                    @select="selectList"
                    style="width: 95%;margin: 0 auto">
                    <el-table-column
                        type="selection"
                        width="30">
                    </el-table-column>
                    <el-table-column
                        prop="shipcode"
                        label="船号"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="yiguanno"
                        label="一贯号"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="xitong"
                        label="CODE号"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="hou"
                        label="PIE"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="curstationname"
                        label="当前工序"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="当前状态"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="pici"
                        label="批次"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="level"
                        label="优先级"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--编辑优先级 -->
        <el-dialog title="修改优先级" :visible.sync="editYxjVisible" width="40%">
            <div class="dialogDiv" style="height:300px;overflow:auto">
                <div style="display: flex;align-items: center;justify-content: center;height: 30%">
                    <el-select v-model="yxj" placeholder="请选择优先级">
                        <el-option
                            v-for="item in yxjOptions"
                            :key="item.indexno"
                            :label="item.name"
                            :value="item.indexno">
                        </el-option>
                    </el-select>
                </div>
                <div style="display: flex;align-items: center;justify-content: center;height: 70%">
                    <el-button type="primary" @click="doEditYxj"
                               style="height:35px;width:40%">提交
                    </el-button>
                </div>
            </div>
        </el-dialog>

        <!--编辑状态 -->
        <el-dialog title="修改状态" :visible.sync="editStateVisible" width="40%">
            <div class="dialogDiv" style="height:300px;overflow:auto">
                <div style="display: flex;align-items: center;justify-content: center;height: 30%">
                    <el-select v-model="state" placeholder="请选择状态">
                        <el-option
                            v-for="item in stateOptions"
                            :key="item.indexno"
                            :label="item.name"
                            :value="item.indexno">
                        </el-option>
                    </el-select>
                </div>
                <div style="display: flex;align-items: center;justify-content: center;height: 70%">
                    <el-button type="primary" @click="doEditState"
                               style="height:35px;width:40%">提交
                    </el-button>
                </div>
            </div>
        </el-dialog>

        <!--编辑工艺路线-->
        <el-dialog title="修改工艺路线" :visible.sync="editRouteVisible" width="60%">
            <div class="dialogDiv" style="height:450px;overflow:auto">
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
                            @selection-change='selectRow'
                            style="width: 95%">

                            <el-table-column type="selection" width="45" align="center"></el-table-column>
                            <el-table-column label="工序名" align="center">
                                <template slot-scope="scope">
                                    <el-select
                                        v-model="scope.row.stationname"
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
                                </template>
                            </el-table-column>
                            <el-table-column label="开始天数" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.realetime"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="结束天数" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.realbtime"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div style="display: flex;align-items: center;justify-content: center;height:30%">
                    <el-button type="primary" @click="submitYS"
                               style="height:30px;width:20%">提交
                    </el-button>
                </div>
            </div>
        </el-dialog>

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
                batch: "",
                batchOptions: [],
                ch: "",
                ygh: "",
                code: "",
                pie: "",


                tableData: [],
                routeData: [],
                id:"",
                selectlistRow: [],
                listData:[],

                message: '',
                HideModal: true,

                editStateVisible:false,
                editYxjVisible:false,
                editRouteVisible:false,
                yxj:"",
                yxjOptions: [],

                state:"",
                stateOptions: [],
                selectOptions:[]

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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/getPiciList"),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "4"}),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "5"}),
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                    ])
                        .then(axios.spread(function (batchOptions,title, table,select) {
                            that.yxjOptions = title.data;
                            that.stateOptions = table.data;
                            that.batchOptions = batchOptions.data;
                            that.batch = batchOptions.data[0].id;
                            that.selectOptions = select.data;
                            axios.post(" " + url + "/shengchan/getCurStatusList",
                                {
                                    "shipcode":that.ch,
                                    "yiguanhao": that.ygh,
                                    "xitong": that.code,
                                    "hou":that.pie,
                                    "pici":that.batch
                                }
                            )
                                .then((res) => {
                                    that.tableData = res.data
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }));


                  this.loading()
                }
            },
            //选择那个一个
            selectList(val) {
                if (val.length) {
                    this.state = val[0].status;
                    this.yxj = val[0].level;
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

            //进行查询
            doSearch() {
                axios.post(" " + url + "/shengchan/getCurStatusList",
                    {
                        "shipcode": this.ch,
                        "yiguanhao": this.ygh,
                        "xitong": this.code,
                        "hou": this.pie,
                        "pici": this.batch
                    }
                )
                    .then((res) => {
                        this.tableData = res.data
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            //弹出状态修改框
            editState() {
                if (this.listData.length) {
                    this.editStateVisible = true;
                }
                else {
                    this.message = "请勾选要修改的管子";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },
            //进行状态修改
            doEditState() {
                if (this.state) {
                    axios.post(" " + url + "/shengchan/updateGuanStatusBatch",
                        {
                            "ids": this.listData,
                            "status":this.state,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`修改成功`);
                                this.editStateVisible =false;
                                this.loading()
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
                    this.$message.warning(`选择不能为空`);
                }

            },
            //弹出 优先级修改框
            editYxj() {
                if (this.listData.length) {
                    this.editYxjVisible = true;


                }
                else {
                    this.message = "请勾选要修改的管子";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },
            //进行优先级修改
            doEditYxj() {
                if (this.yxj) {
                    axios.post(" " + url + "/shengchan/updateGuanLevelBatch",
                        {
                            "ids": this.listData,
                            "status": this.yxj,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`修改成功`);
                                this.editYxjVisible = false;
                                this.loading()
                            }
                            else {
                                this.$message.warning(`修改失败`);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else if (this.yxj === 0) {
                    axios.post(" " + url + "/shengchan/updateGuanLevelBatch",
                        {
                            "ids": this.listData,
                            "status": 0,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`修改成功`);
                                this.editYxjVisible = false;
                                this.loading()
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
                    this.$message.warning(`选择不能为空`);
                }
            },

            //弹出路线修改框
            editRoute() {
                if (this.listData.length) {
                    if(this.listData.length>1){
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
                        this.editRouteVisible = true;
                        let id = this.listData[0];
                        this.id =id;
                        axios.post(" " + url + "/shengchan/getShengchanguanDetail", {"id": id})
                            .then((res) => {
                                    let data = [];
                                    for (let i = 0; i < res.data.length; i++) {

                                        var list = {
                                            stationname:res.data[i].stationid,
                                            realetime: res.data[i].realetime,
                                            realbtime: res.data[i].realbtime
                                        };
                                        data.push(list);
                                    }
                                    this.routeData = data
                            })
                            .catch((err) => {
                                console.log(err)
                            });
                    }
                }
                else {
                    this.message = "请勾选要修改的管子";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            // 增加行
            addRow() {
                var list = {
                    stationname:this.stationname,
                    realetime: this.realetime,
                    realbtime: this.realbtime,
                    id:this.id
                };
                this.routeData.push(list)
            },
            // 选择哪一行
            selectRow (val) {
                this.selectlistRow = val;
            },
            // 删除选中行
            delData() {
                for (let i = 0; i < this.selectlistRow.length; i++) {
                    let val = this.selectlistRow;
                    val.forEach((val, index) => {
                        this.routeData.forEach((v, i) => {
                            if (val.stationname === v.stationname) {
                                this.routeData.splice(i, 1)
                            }
                        })
                    })
                }
            },

            //进行路线修改
            submitYS() {
                if (this.routeData.length) {
                    let data =[];
                    for (let i =0;i<this.routeData.length;i++){
                        let a = this.routeData[i].stationname;
                        data.push(a)
                    }

                    axios.post(" " + url + "/shengchan/updateGongyiluxian",
                        {
                            "ids": data,
                            "id":this.id
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`修改成功`);
                                this.editRouteVisible=false;
                                this.loading()
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
                    this.$message.warning(`选择不能为空`);
                }
            },

            //页面加载
            loading() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/shengchan/getCurStatusList",
                        {
                            "shipcode": that.ch,
                            "yiguanhao": that.ygh,
                            "xitong": that.code,
                            "hou": that.pie,
                            "pici": that.batch
                        }
                    )
                ])
                    .then(axios.spread(function (table) {
                        that.tableData = table.data
                    }));
            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";
    .TaskScheduling{
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
                .batchTab1{
                    flex:1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 1%;
                }
                .batchTab{
                    flex: 0.5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 1%;
                }
                .operationTab {
                    flex: 0.8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    button {
                        width: 80%;
                        height: 35px;
                        text-align: center;
                        line-height: 35px;
                        border: none;
                        border-radius: 10%;
                        background-color: @color-blue;
                        color: @color-white;
                        font-size: 12px;
                        margin-left: 10px;
                        margin-right: 10px;
                    }
                }
                .operationTabRight{
                    flex: 2;
                }
            }
            .productionContentTable{
                padding-top: 10px;
            }
        }
    }



</style>
