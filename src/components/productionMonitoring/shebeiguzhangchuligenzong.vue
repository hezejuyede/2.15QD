<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>设备故障处理跟踪</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>检索故障记录</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="检索故障记录" class="handle-input mr10" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
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
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>生产线</span>
                        <span>:</span>
                        <el-select
                            style="width: 120px"
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
                    </label>
                    <label style="margin-right: 10px;margin-left:5px">
                        <span>工位</span>
                        <span>:</span>
                        <el-select
                            style="width: 120px"
                            v-model="workStation"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSelect"
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in workStationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 10px;margin-left:5px">
                        <span>设备</span>
                        <span>:</span>
                        <el-select
                            style="width: 120px"
                            v-model="shebei"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSB"
                            placeholder="请选择设备">
                            <el-option
                                v-for="item in shebeiOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary"  @click="showAdd">处理故障</el-button>
                    <el-button type="danger"   @click="showDelete">删除故障</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'14px'}"
                              border
                              :height="this.tableHeight"
                              @select-all="selectAll"
                              @select="selectList"
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
            <el-dialog title="处理故障" :visible.sync="addVisible" width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="处理结果">
                        <el-select
                            v-model="cljg"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择">
                            <el-option
                                v-for="item in cljgOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="beizhu"
                                  type="textarea"
                                  placeholder="请输入内容"
                                  maxlength="30"
                                  show-word-limit
                                  style="width: 200px "></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>


            <!-- 删除提示框 -->
            <el-dialog title="删除异常上报记录" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false" style="height:30px;width:80px">取 消</el-button>
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
    import {getNowTime,getLestWeekTime} from '../../assets/js/api'
    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData:[],
                id:"",


                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,

                delVisible: false,


                examineTime:"",
                workStation:"",
                workStationOptions:[],
                line: '',
                lineOptions: [],

                shebei:"",
                shebeiOptions:[],


                cljg:"",
                cljgOptions: [
                    {"name": "故障修复", "id": "1"},
                    {"name": "继续等待", "id": "2"},
                    {"name": "返厂维修", "id": "3"},
                    {"name": "自行维修", "id": "4"}
                ],
                beizhu:"",
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
                    const info = JSON.parse(userInfo);
                    this.userId =info.username;
                    let nowTime = getNowTime();
                    let lestWeekTime= getLestWeekTime();
                    let times = [];
                    times.push(lestWeekTime);
                    times .push(nowTime);
                    this.examineTime = times;
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                    ])
                        .then(axios.spread(function (line,workStation) {
                            that.lineOptions = line.data;
                            that.line = line.data[0].indexno;
                            that.workStation = workStation.data[0].id;
                            that.workStationOptions = workStation.data;
                            axios.all([
                                axios.post(" " + url + "/shebei/shebeiList", {"jiagongxian": that.line,"stationid":that.workStation})
                            ])
                                .then(axios.spread(function (shebei) {
                                    that.shebeiOptions = shebei.data;
                                    that.loadingShowData(that.examineTime,that.workStation,that.shebei);
                                }));
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
            loadingShowData(data1,data2,data3) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "sbgzclgz"}),
                    axios.post(" " + url + "/shebei/errorList", {"time":data1,"stationid":data2,"shebeiid": data3})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },

            //更改生产线
            changeSCX(){
                axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line})
                    .then((res) => {
                        if(res.data.length>0){
                            this.workStation = res.data[0].id;
                            this.workStationOptions = res.data;
                        }
                        else {
                            this.workStation="";
                            this.workStationOptions=[];
                            this.shebei="";
                            this.shebeiOptions=[];
                        }
                    });
            },

            //更改工位选择
            changeSelect() {
                this.shebei="";
                axios.post(" " + url + "/shebei/shebeiList", {"jiagongxian": this.line,"stationid":this.workStation})
                    .then((res)=>{
                        if(res.data.length>0){
                            this.shebeiOptions = res.data;
                            this.loadingShowData(this.examineTime,this.workStation,this.shebei);
                        }
                        else {
                            this.shebei="";
                            this.shebeiOptions=[];
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            },

            //更改设备
            changeSB(){
                this.loadingShowData(this.examineTime,this.workStation,this.shebei);
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
                    this.listData=[];
                }
            },

            //列表全部选择
            selectAll(val) {
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

            //显示新增
            showAdd(){
                if (this.listData.length) {
                    if(this.listData.length>1){
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
                        this.addVisible = true;
                        this.cljg="";
                        this.beizhu="";
                    }

                }
                else {
                    this.message = "请勾选要处理的异常";
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
                if (this.cljg) {
                    axios.post(" " + url + "/shebei/errorUpdate",
                        {
                            "id":this.listData[0],
                            "username":this.userId,
                            "errortypeid": this.cljg,
                            "beizhu": this.beizhu,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`处理成功`);
                                this.addVisible = false;
                                this.loadingShowData(this.examineTime,this.workStation,this.shebei);

                            }
                            else {
                                this.$message.warning(`处理失败`);
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
                    this.message = "请勾选要删除的上报故障";
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
                axios.post(" " + url + "/shebei/errorDel",
                    {
                        "ids": this.listData,
                    }
                )
                    .then((res) => {
                        if (res.data === "1") {
                            this.$message.success('删除成功');
                            this.delVisible = false;
                            this.loadingShowData(this.examineTime,this.workStation,this.shebei);
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
