<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>出库登记</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>检索出库登记</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="检索出库登记" class="handle-input mr10"
                                  style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 5px">
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
                        <span>分类</span>
                        <span>:</span>
                        <el-select
                            v-model="fenlei"
                            style="width: 120px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSCX"
                            placeholder="请选择分类">
                            <el-option
                                v-for="item in fenleiOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>耗材</span>
                        <span>:</span>
                        <el-select
                            style="width: 120px"
                            v-model="haocai"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSelect"
                            placeholder="请选择耗材">
                            <el-option
                                v-for="item in haocaiOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">出库</el-button>
                    <el-button type="success" icon="delete" class="handle-del mr10" @click="showCkjv">出库记录</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
                              @select-all="selectAll"
                              @select="selectList"
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
            <!--出库弹出框 -->
            <el-dialog title="出库" :visible.sync="addVisible" width="40%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="分类">
                        <el-select
                            v-model="fenlei"
                            clearable
                            filterable
                            allow-create
                            disabled
                            default-first-option
                            @change="changeFenlei"
                            placeholder="请选择分类">
                            <el-option
                                v-for="item in fenleiOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="耗材">
                        <el-select
                            v-model="haocai"
                            clearable
                            filterable
                            disabled
                            allow-create
                            default-first-option
                            placeholder="请选择耗材">
                            <el-option
                                v-for="item in haocaiOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出库数量">
                        <el-input v-model="cksl" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 出库记录 -->
            <el-dialog title="出库记录修改" :visible.sync="editVisible" width="80%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="分类">
                        <el-select
                            v-model="fenlei"
                            clearable
                            filterable
                            allow-create
                            disabled
                            default-first-option
                            @change="changeFenlei"
                            placeholder="请选择分类">
                            <el-option
                                v-for="item in fenleiOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="耗材">
                        <el-select
                            v-model="haocai"
                            clearable
                            filterable
                            disabled
                            allow-create
                            default-first-option
                            placeholder="请选择耗材">
                            <el-option
                                v-for="item in haocaiOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出库数量">
                        <el-input v-model="cksl" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 出库记录列表 -->
            <el-dialog title="出库记录修改" :visible.sync="ckjvVisible" width="80%">
                <div class="ckjvVisibleDiv">
                    <el-table
                        :data="ckjvData"
                        :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                        border
                        height="400"
                        @row-dblclick="editPerson"
                        highlight-current-row
                        style="width: 98%;margin: auto">
                        <el-table-column
                            type="selection"
                            width="30">
                        </el-table-column>
                        <el-table-column
                            prop="zizhname"
                            align="center"
                            label="出库时间">
                        </el-table-column>
                        <el-table-column
                            prop="username"
                            align="center"
                            label="出库人员">
                        </el-table-column>
                        <el-table-column
                            prop="username"
                            align="center"
                            label="出库数量">
                        </el-table-column>
                    </el-table>
                </div>
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
    import {getYTime} from '../../assets/js/api'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData: [],
                id: "",


                cols: [],
                tableData: [],
                ckjvData: [],

                select_word: '',

                addVisible: false,
                editVisible: false,
                ckjvVisible: false,


                haocai: "",
                haocaiOptions: [],
                fenlei: '',
                fenleiOptions: [],

                cksl: "",
                examineTime: ""

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
                    let time = getYTime();
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
                        .then(axios.spread(function (fenlei, haocai) {
                            that.fenleiOptions = fenlei.data;
                            that.fenlei = fenlei.data[0].id;
                            that.haocaiOptions = haocai.data;
                            that.haocai = haocai.data[0].id;
                            that.loadingShowData(that.fenlei, that.haocai, that.examineTime);
                        }));
                }
            },

            //瞬间加载数据
            loadingShowData(data1, data2, data3) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "crkdj"}),
                    axios.post(" " + url + "/padShow/buttonList", {"fenlei": data1, "haocai": data2, "time": data3})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },

            //出库记录查询
            doSearchCKJV(data1, data2) {
                axios.post(" " + url + "/padShow/buttonUpdate", {"id": data1, "time": data2}
                )
                    .then((res) => {
                        this.ckjvData = res.data.data
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            //更改分类更新耗材
            changeFenlei() {
                axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line})
                    .then((res) => {
                        this.haocai = res.data[0].id;
                        this.haocaiOptions = res.data;
                        this.loadingShowData(this.fenlei, this.haocai, this.examineTime);
                    });
            },

            //根据耗材查询
            changeSelect() {
                this.loadingShowData(this.fenlei, this.haocai, this.examineTime);
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

            //显示出库
            showAdd() {

                if (this.haocai) {
                    this.addVisible = true;
                    this.name = "";
                    this.type = "";
                    this.disabled = "";
                    this.backgroundColor = "";
                    this.showHide = "";
                }
                else {
                    this.message = "请选择耗材";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //进行出库
            doAdd() {
                if (this.name && this.type && this.disabled && this.backgroundColor && this.showHide) {
                    axios.post(" " + url + "/padShow/buttonAdd",
                        {
                            "gongxuid": this.workStation,
                            "name": this.name,
                            "type": this.type,
                            "disabled": this.disabled,
                            "backgroundcolor": this.backgroundColor,
                            "show": this.showHide,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
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


            //选择点击显示出库记录
            showCkjv() {
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
                        this.ckjvVisible = true;
                        this.doSearchCKJV(this.id, this.examineTime);
                    }

                }
                else {
                    this.message = "请勾选要查询的耗材";
                    this.HideModal = false;
                    const that = this;

                    function b() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(b, 2000);
                }
            },


            //双击点击行内编辑
            edit(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/padShow/buttonDetail", {"id": this.id})
                    .then((res) => {
                        this.workStation = res.data.data.gongxuid;
                        this.name = res.data.data.name;
                        this.type = Number(res.data.data.type);
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit() {
                if (this.name && this.type && this.disabled && this.backgroundColor && this.showHide) {
                    axios.post(" " + url + "/padShow/buttonUpdate",
                        {
                            "id": this.id,
                            "gongweiid": this.workStation,
                            "name": this.name,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(`修改成功`);
                                this.editVisible = false;
                                this.doSearchCKJV(this.id, this.examineTime);
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
