<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>质量模块</el-breadcrumb-item>
                <el-breadcrumb-item>工作管精度管理记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>智能检索记录</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索记录" class="handle-input mr10"
                                  style="width: 150px"></el-input>
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
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>生产线</span>
                        <span>:</span>
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
                    </label>
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>工位</span>
                        <span>:</span>
                        <el-select
                            style="width: 150px"
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
                    <el-button type="primary"  @click="showAdd">新增记录</el-button>
                    <el-button type="danger"   @click="showDelete">删除记录</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              :height="this.tableHeight"
                              ref="moviesTable"
                              @select-all="selectAll"
                              @select="selectList"
                              @row-dblclick="edit"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <template v-for="(col,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
            <!--新增弹出框 -->
            <el-dialog title="新增点检内容" :visible.sync="addVisible" width="60%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="记录周期">
                        <el-input v-model="zhouqi" style="width: 120px" type="number" placeholder="记录周期"></el-input>
                    </el-form-item>
                    <el-form-item label="到期报警">
                        <el-select
                            style="width: 150px"
                            v-model="baojing"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSelect"
                            placeholder="请选择">
                            <el-option
                                v-for="item in baojingOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设置月份">
                        <el-date-picker
                            v-model="yuefen"
                            type="month"
                            placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item
                        v-for="(domain, index) in dynamicValidateForm.domains"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'"
                        :label="'工位记录' + (index+1)+''">
                        <div class="appendDiv">
                            <div class="appendDivTemplate">
                                <div class="fl" style="margin-left: 10px">
                                    <span>生产线</span>
                                    <el-select
                                        style="width: 150px"
                                        v-model="domain.scx"
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
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>工位</span>
                                    <el-select
                                        style="width: 150px"
                                        v-model="domain.gongwei"
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
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>数量:</span>
                                    <el-input v-model="domain.shuliang" style="width: 120px" type="number"></el-input>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <el-button
                                        type="danger"
                                        style="height:30px;width:120px"
                                        @click.prevent="removeDomain(domain)">删除
                                    </el-button>
                                </div>
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
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑项目" :visible.sync="editVisible" width="98%">
                <el-form ref="form" label-width="100px">
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
                            @change="changeSelect"

                            placeholder="请选择工位">
                            <el-option
                                v-for="item in workStationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        v-for="(domain, index) in dynamicValidateForm.domains"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'"
                        :label="'点检内容' + (index+1)+''">
                        <div class="appendDiv">
                            <div class="appendDivTemplate">
                                <div class="fl" style="margin-left: 10px">
                                    <span>NO</span>
                                    <el-input v-model="domain.no" style="width: 70px" type="number"></el-input>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>检查项目:</span>
                                    <el-input v-model="domain.xiangmu" style="width: 150px"></el-input>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>检查内容:</span>
                                    <el-input v-model="domain.neirong" style="width: 150px"></el-input>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>检查方法:</span>
                                    <el-input v-model="domain.fangfa" style="width: 400px"></el-input>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <el-button
                                        type="danger"
                                        style="height:30px;width:120px"
                                        @click.prevent="removeDomain(domain)">删除
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="addDomain"
                            style="height:30px;width:20%">
                            新增点检项目
                        </el-button>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 删除提示框 -->
            <el-dialog title="删除按钮" :visible.sync="delVisible" width="300px" center>
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

                val: [],

                listData: [],
                id: "",


                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,

                examineTime:"",

                workStation: "",
                workStationOptions: [],

                line: '',
                lineOptions: [],
                zhouqi:"",
                yuefen:"",

                baojing: "",
                baojingOptions: [{"name": "报警", "id": "1"}, {"name": "不报警", "id": "2"}],

                dynamicValidateForm: {
                    domains: [{
                        scx: '',
                        gongwei: "",
                        shuliang:""
                    }],
                },
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
                        .then(axios.spread(function (line, workStation) {
                            that.lineOptions = line.data;
                            that.line = line.data[0].indexno;
                            that.workStation = workStation.data[0].id;
                            that.workStationOptions = workStation.data;
                            that.loadingShowData(1);
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
            loadingShowData(data) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "gongzuoguanjingduguanlijilv"}),
                    axios.post(" " + url + "/shebei/contentListByBuwei", {"buweiid": data})
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
                            this.workStation = "";
                            this.workStationOptions = [];
                        }
                        else {
                            this.workStation = res.data[0].id;
                            this.workStationOptions = res.data;
                        }
                    });
            },

            //根据工位选择
            changeSelect() {

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
            showAdd() {
                this.addVisible = true;
                this.zhouqi = "";
                this.yuefen = "";
                this.baojing = '';
                this.dynamicValidateForm = {
                    domains: [{
                        scx: '',
                        gongwei: "",
                        shuliang: ""
                    }],
                };
            },

            //进行新增
            doAdd() {
                if (this.shebei && this.buwei ) {
                    axios.post(" " + url + "/shebei/contentAdd",
                        {
                            "shebeid": this.shebei,
                            "buweiid": this.buwei,
                            "list": this.dynamicValidateForm.domains
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                this.editVisible =false;
                                this.loadingShowData(this.buwei);

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
            edit(row, column, cell, event) {
                this.editVisible = true;
                let data = [];
                for (var i = 0; i < this.tableData.length; i++) {
                    var json = {
                        no: this.tableData[i].no,
                        xiangmu: this.tableData[i].xiangmu,
                        neirong: this.tableData[i].neirong,
                        fangfa: this.tableData[i].fangfa
                    };
                    data.push(json)
                }
                this.dynamicValidateForm.domains = data;
            },

            //增加时间
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    scx: '',
                    gongwei: "",
                    shuliang:""
                });
            },

            //删除时间
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item);
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },


            // 保存编辑
            saveEdit() {
                if (this.name && this.type && this.disabled &&this.backgroundColor&&this.showHide) {
                    axios.post(" " + url + "/padShow/buttonUpdate",
                        {
                            "id":this.id,
                            "gongweiid": this.workStation,
                            "name": this.name,
                            "type": this.type,
                            "disabled": this.disabled,
                            "backgroundcolor": this.backgroundColor,
                            "show": this.showHide,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.editVisible = false;
                                this.$message.success(`修改成功`);
                                this.loadingShowData(this.workStation)
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

            //选择点击显示删除
            showDelete() {
                if (this.listData.length) {
                    this.delVisible = true;
                }
                else {
                    this.message = "请勾选要删除的按钮";
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
                axios.post(" " + url + "/padShow/buttonDel",
                    {
                        "id": this.listData[0],
                    }
                )
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.$message.success('删除成功');
                            this.delVisible = false;
                            this.loadingShowData(this.workStation);
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
                padding-left: 20px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width:130px;
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
