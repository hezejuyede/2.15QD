<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>安全管理</el-breadcrumb-item>
                <el-breadcrumb-item>学习指示下达</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>检索学习指示</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索学习指示" class="handle-input mr10" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>时间</span>
                        <span>:</span>
                        <el-date-picker
                            style="width: 240px"
                            v-model="examineTime"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </label>
                    <el-button  type="primary"  @click="doSearch">查询指示</el-button>
                    <el-button  type="success"  @click="showAdd">下达指示</el-button>
                    <el-button   type="warning" @click="showState">学习状态</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              :height="this.tableHeight"
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
            <el-dialog title="新增学习指示" :visible.sync="addVisible" width="50%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="生产线">
                        <el-select
                            style="width: 150px"
                            v-model="line"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSCX"
                            placeholder="请选择生产线">
                            <el-option
                                v-for="item in lineOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工位">
                        <el-select
                            style="width: 150px"
                            v-model="workStation"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            multiple
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in workStationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑学习指示" :visible.sync="editVisible" width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="生产线">
                        <el-select
                            style="width: 150px"
                            v-model="line"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSCX"
                            placeholder="请选择生产线">
                            <el-option
                                v-for="item in lineOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工位">
                        <el-select
                            style="width: 150px"
                            v-model="workStation"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            multiple
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in workStationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 查看工位学习状态 -->
            <el-dialog title="查看工位学习状态" :visible.sync="stateVisible" width="60%" @click="cancel">
                <el-form ref="form" label-width="100px">
                    <el-table
                        :data="stateData"
                        :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                        border
                        height="400"
                        highlight-current-row
                        style="width: 98%;margin: auto">>
                        <el-table-column
                            prop="linename"
                            align="center"
                            label="生产线">
                        </el-table-column>
                        <el-table-column
                            prop="stationname"
                            align="center"
                            label="工位">
                        </el-table-column>
                        <el-table-column
                            prop="username"
                            align="center"
                            label="人员">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            align="center"
                            label="学习状态">
                        </el-table-column>
                    </el-table>

                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="stateVisible = false" style="height:30px;width:80px">取 消</el-button>
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
    import {getNowTime} from '../../assets/js/api'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                examineTime:"",
                val:[],
                listData:[],
                id:"",


                cols: [],
                tableData: [],
                stateData:[],

                select_word: '',

                addVisible: false,
                editVisible: false,
                stateVisible: false,

                workStation: "",
                workStationOptions: [],
                line: '',
                lineOptions: [],
                tableHeight:Number,


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
                    this.setTableHeight();
                    let time = getNowTime();
                    let times = [];
                    for (let i = 0; i < 2; i++) {
                        times.push(time)
                    }
                    this.examineTime = times;
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                    ])
                        .then(axios.spread(function (line, workStation) {
                            that.lineOptions = line.data;
                            that.workStationOptions = workStation.data;
                            that.loadingShowData(that.examineTime)
                        }));
                }
            },

            //根据屏幕设置Table高度
            setTableHeight() {
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    var H = window.screen.height;
                    this.tableHeight = H - 300 + "px";
                }
                else {
                    var h = document.body.clientHeight;
                    this.tableHeight = h - 300 + "px";
                }

            },

            //瞬间加载数据
            loadingShowData(data1) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "xiadaxuexizhishi"}),
                    axios.post(" " + url + "/anquan/xuexiListNew",{"times":data1})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },

            //更改生产线
            changeSCX() {
                axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line})
                    .then((res) => {
                        if (res.data ==="-1") {
                            this.workStationOptions = [];
                        }
                        else {
                            this.workStationOptions = res.data;
                        }
                    });
            },

            //进行查询
            doSearch(){
                this.loadingShowData(this.examineTime)
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

            //取消选择
            cancel() {
                this.delVisible = false;
                this.listData = [];
                if (this.val.length === 1) {
                    for (let i = 0, l = this.val.length; i < l; i++) {
                        this.$refs.moviesTable.toggleRowSelection(this.val[i]);
                    }
                }

            },

            //显示新增
            showAdd(){
                if (this.listData.length) {
                    if (this.listData.length > 1) {
                        this.message = "只能选择一个";
                        this.HideModal = false;
                        const that = this;

                        function b() {
                            that.message = "";
                            that.HideModal = true;
                        }

                        setTimeout(b, 2000);
                    }
                    else {
                        this.addVisible=true;
                        this.line = "";
                        this.workStation = "";
                    }
                }
                else {
                    this.message = "请勾选";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }

            },

            //进行新增
            doAdd() {
                if (this.workStation) {
                    axios.post(" " + url + "/anquan/xuexiRelation",
                        {
                            "id":  this.listData[0],
                            "jiagongxian":this.line,
                            "ids": this.workStation
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(res.data.message);
                                this.addVisible = false;
                                this.loadingShowData(this.examineTime);
                            }
                            else {
                                this.$message.warning(res.data.message);
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
                this.id = row.id;
                axios.post(" " + url + "/anquan/getxuexiRelation", {"id": this.id})
                    .then((res) => {
                        if(res.data.state==="1"){
                            if(res.data.data.length>0){
                                this.editVisible = true;
                                this.line=1;
                                let data = [];
                                let arr =res.data.data;
                                for(let i=0;i<arr.length;i++){
                                    data.push(arr[i].gongweiid)
                                }
                                this.workStation=data;
                            }
                            else {
                                this.message = "暂无数据";
                                this.HideModal = false;
                                const that = this;

                                function b() {
                                    that.message = "";
                                    that.HideModal = true;
                                }

                                setTimeout(b, 2000);
                            }
                        }
                        else {
                            this.$message.warning(res.data.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit() {
                if (this.workStation) {
                    axios.post(" " + url + "/anquan/xuexiRelation",
                        {
                            "id":  this.id,
                            "ids": this.workStation
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(res.data.message);
                                this.editVisible = false;
                                this.loadingShowData(this.examineTime);
                            }
                            else {
                                this.$message.warning(res.data.message);
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

            //学习状态
            showState(){
                if (this.listData.length) {
                    if (this.listData.length > 1) {
                        this.message = "只能选择一个";
                        this.HideModal = false;
                        const that = this;

                        function b() {
                            that.message = "";
                            that.HideModal = true;
                        }

                        setTimeout(b, 2000);
                    }
                    else {
                        this.editYsVisible = true;
                        axios.post(" " + url + "/sysconfig/getUserbyzizhiId", {"id": this.listData[0]})
                            .then((res) => {
                                if (res.data.data) {
                                    this.zizhiData = res.data.data;
                                    this.stateVisible = true;
                                }
                                else {
                                    this.message = "暂无数据";
                                    this.HideModal = false;
                                    const that = this;

                                    function a() {
                                        that.message = "";
                                        that.HideModal = true;
                                    }

                                    setTimeout(a, 2000);
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            });

                    }
                }
                else {
                    this.message = "请勾选";
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
                padding-left: 20px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width: 130px;
                    height: 35px;
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

        }
    }


</style>
