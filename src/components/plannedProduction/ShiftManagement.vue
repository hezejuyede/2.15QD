<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>资源模型</el-breadcrumb-item>
                <el-breadcrumb-item>班次管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>检索班次</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选班次" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span> 加工线选择</span>
                        <span>:</span>
                        <el-select
                            v-model="shipType"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSelect"
                            placeholder="请输入或者选择船型">
                            <el-option
                                v-for="item in shipTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="addContent">新增班次</el-button>
                    <el-button type="danger" icon="delete" class="handle-del mr10" @click="deleteContent">删除班次
                    </el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
                              @select="selectList"
                              @row-dblclick="editContent"
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
            <el-dialog title="新增班次" :visible.sync="addVisible" width="60%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="所属船型">
                        <el-select
                            v-model="shipType"
                            clearable
                            filterable
                            allow-create
                            disabled
                            default-first-option
                            placeholder="请输入或者选择船型">
                            <el-option
                                v-for="item in shipTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="起工日">
                        <el-date-picker
                            v-model="qigongri"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="进水日">
                        <el-date-picker
                            v-model="jinshuiri"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="交船日">
                        <el-date-picker
                            v-model="jiaochuanri"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="船东">
                        <el-input v-model="chuandong"></el-input>
                    </el-form-item>
                    <el-form-item label="船级">
                        <el-input v-model="chuanji"></el-input>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAddContent" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑班次" :visible.sync="editVisible" width="60%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="所属船型">
                        <el-select
                            v-model="shipType"
                            clearable
                            filterable
                            allow-create
                            disabled
                            default-first-option
                            placeholder="请输入或者选择船型">
                            <el-option
                                v-for="item in shipTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="起工日">
                        <el-date-picker
                            v-model="qigongri"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="进水日">
                        <el-date-picker
                            v-model="jinshuiri"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="交船日">
                        <el-date-picker
                            v-model="jiaochuanri"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="船东">
                        <el-input v-model="chuandong"></el-input>
                    </el-form-item>
                    <el-form-item label="船级">
                        <el-input v-model="chuanji"></el-input>
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

            <Modal :msg="message"
                   :isHideModal="HideModal"></Modal>
        </div>
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
                listData: [],

                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,


                qigongri: "",
                jinshuiri: "",
                jiaochuanri: "",
                chuandong: "",
                chuanji: "",

                shipType: '',
                shipTypeOptions: []

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
                    this.loading();
                }
            },

            //显示新增工序
            addContent() {
                if (this.shipType) {

                    this.qigongri = "";
                    this.jinshuiri = "";
                    this.jiaochuanri = "";
                    this.chuandong = "";
                    this.chuanji = "";
                    this.addVisible = true;
                }
                else {
                    this.message = "请选择船型";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //新增内容
            doAddContent() {
                if (this.qigongri && this.jinshuiri && this.jiaochuanri && this.chuandong && this.chuanji) {

                    axios.post(" " + url + "/sysconfig/shipCodeAdd",
                        {
                            "shiptype": this.shipType,
                            "qigongri": this.qigongri,
                            "jinshuiri": this.jinshuiri,
                            "jiaochuanri": this.jiaochuanri,
                            "chuandong": this.chuandong,
                            "chuanji": this.chuanji,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                let that = this;
                                axios.all([
                                    axios.post(" " + url + "/sys/showTableTitle", {"name": "shiptype"}),
                                    axios.post(" " + url + "/sysconfig/getShipCodeList", {"shiptype": that.shipType}),
                                ])
                                    .then(axios.spread(function (title, table) {
                                        that.cols = title.data;
                                        that.tableData = table.data;
                                    }));
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
            editContent(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/sysconfig/shipCodeDetail", {"id": this.id})
                    .then((res) => {
                        this.qigongri = res.data.qigongri;
                        this.jinshuiri = res.data.jinshuiri;
                        this.jiaochuanri = res.data.jiaochuanri;
                        this.chuandong = res.data.chuandong;
                        this.chuanji = res.data.chuanji;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 进行保存编辑
            saveEdit() {
                if (this.qigongri && this.jinshuiri && this.jiaochuanri && this.chuandong && this.chuanji) {
                    axios.post(" " + url + "/sysconfig/shipCodeUpdate",
                        {
                            "id": this.id,
                            "shiptype": this.shipType,
                            "qigongri": this.qigongri,
                            "jinshuiri": this.jinshuiri,
                            "jiaochuanri": this.jiaochuanri,
                            "chuandong": this.chuandong,
                            "chuanji": this.chuanji,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                let that = this;
                                axios.all([
                                    axios.post(" " + url + "/sys/showTableTitle", {"name": "shiptype"}),
                                    axios.post(" " + url + "/sysconfig/getShipCodeList", {"shiptype": that.shipType}),
                                ])
                                    .then(axios.spread(function (title, table) {
                                        that.cols = title.data;
                                        that.tableData = table.data;
                                    }));
                                this.$message.success(`修改成功`);
                                this.editVisible = false;
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
                    this.$message.warning(`输入不能为空`);
                }

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

            //选择显示点击删除
            deleteContent() {
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
                        this.delVisible = true;
                    }
                }
                else {
                    this.message = "请勾选要删除的内容";
                    this.HideModal = false;
                    const that = this;

                    function b() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(b, 2000);
                }
            },

            // 确定删除
            deleteRow() {
                axios.post(" " + url + "/sysconfig/shipCodeDel",
                    {
                        "id": this.listData[0],
                    }
                )
                    .then((res) => {
                        if (res.data === "1") {
                            this.$message.success('删除成功');
                            this.delVisible = false;
                            let that = this;
                            axios.all([
                                axios.post(" " + url + "/sys/showTableTitle", {"name": "shiptype"}),
                                axios.post(" " + url + "/sysconfig/getShipCodeList", {"shiptype": that.shipType}),
                            ])
                                .then(axios.spread(function (title, table) {
                                    that.cols = title.data;
                                    that.tableData = table.data;
                                }));
                        }
                        else {
                            this.$message.warning(`删除失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            //根据下拉选择
            changeSelect() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "shiptype"}),
                    axios.post(" " + url + "/sysconfig/getShipCodeList", {"shiptype": that.shipType}),
                ])
                    .then(axios.spread(function (title, table) {
                        if (table.data === "-1") {
                            that.cols = title.data;
                            that.tableData = [];
                        }
                        else {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }
                    }));
            },

            //页面初始加载
            loading() {
                axios.post(" " + url + "/sysconfig/getShipTypeSelect")
                    .then((res) => {
                        this.shipType = res.data[0].id;
                        this.shipTypeOptions = res.data;
                        let that = this;
                        axios.all([
                            axios.post(" "+ url +"/sys/showTableTitle",{"name":"banci"}),
                            axios.post(" "+ url +"/sysconfig/getBanciList"),
                        ])
                            .then(axios.spread(function (title, table) {
                                that.cols = title.data;
                                that.tableData = table.data;
                            }));
                    })
                    .catch((err) => {
                        console.log(err)
                    });
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
                line-height: 80px;
                padding-left: 50px;
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
