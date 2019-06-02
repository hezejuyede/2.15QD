<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>点检项目设定</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>智能检索项目</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索项目" class="handle-input mr10"
                                  style="width: 150px"></el-input>
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
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>设备</span>
                        <span>:</span>
                        <el-select
                            style="width: 150px"
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
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>部位</span>
                        <span>:</span>
                        <el-select
                            style="width: 150px"
                            v-model="buwei"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeBW"
                            placeholder="请选择设备">
                            <el-option
                                v-for="item in buweiOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">新增项目</el-button>
                    <el-button type="danger" icon="delete" class="handle-del mr10" @click="showDelete">删除项目</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
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
            <el-dialog title="新增点检内容" :visible.sync="addVisible" width="90%">
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
                    <el-form-item label="设备">
                        <el-select
                            style="width: 150px"
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
                    </el-form-item>
                    <el-form-item label="检查部位">
                        <el-select
                            style="width: 150px"
                            v-model="buwei"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSB"
                            placeholder="请选择部位">
                            <el-option
                                v-for="item in buweiOptions"
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
                                    <el-input v-model="domain.no" style="width: 100px" type="number"></el-input>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>检查项目:</span>
                                    <el-input v-model="domain.jcxm" style="width: 150px"></el-input>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>检查内容:</span>
                                    <el-input v-model="domain.jcnr" style="width: 150px"></el-input>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>检查方法:</span>
                                    <el-input v-model="domain.jcff" style="width: 400px"></el-input>
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
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑项目" :visible.sync="editVisible" width="40%">
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
                    <el-form-item label="设备">
                        <el-select
                            style="width: 150px"
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
                    </el-form-item>
                    <el-form-item label="检查部位">
                        <el-select
                            style="width: 150px"
                            v-model="buwei"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSB"
                            placeholder="请选择部位">
                            <el-option
                                v-for="item in buweiOptions"
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
                                    <el-input v-model="domain.no" style="width: 100px" type="number"></el-input>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>检查项目:</span>
                                    <el-input v-model="domain.jcxm" style="width: 150px"></el-input>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>检查内容:</span>
                                    <el-input v-model="domain.jcnr" style="width: 150px"></el-input>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>检查方法:</span>
                                    <el-input v-model="domain.jcff" style="width: 400px"></el-input>
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
            <el-dialog title="删除项目" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDelete" style="height:30px;width:80px">取 消</el-button>
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

                val: [],


                listData: [],

                id: "",


                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,


                shebei: "",
                shebeiOptions: [],
                buwei: "",
                buweiOptions: [],
                workStation: "",
                workStationOptions: [],
                line: '',
                lineOptions: [],

                dynamicValidateForm: {
                    domains: [{
                        no: '',
                        jcxm: "",
                        jcnr: "",
                        jcff: ""
                    }],
                },
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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                    ])
                        .then(axios.spread(function (line, workStation, shebei, buwei) {
                            that.lineOptions = line.data;
                            that.line = line.data[0].indexno;
                            that.workStation = workStation.data[0].id;
                            that.workStationOptions = workStation.data;
                            axios.all([
                                axios.post(" " + url + "/shebei/shebeiList", {
                                    "jiagongxian": that.line,
                                    "stationid": that.workStation
                                })
                            ])
                                .then(axios.spread(function (shebei) {
                                    that.shebei = shebei.data[0].id;
                                    that.shebeiOptions = shebei.data;
                                    axios.all([
                                        axios.post(" " + url + "/shebei/shebeibuweiList", {"shebeiid": that.shebei})
                                    ])
                                        .then(axios.spread(function (buwei) {
                                            that.buwei = buwei.data[0].id;
                                            that.buweiOptions = buwei.data;
                                            that.loadingShowData(that.buwei);
                                        }));
                                    that.loadingShowData(that.shebei);
                                }));
                        }));

                }
            },

            //瞬间加载数据
            loadingShowData(data) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "dyhcflmc"}),
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
                        if (res.data.length > 0) {
                            this.workStation = res.data[0].id;
                            this.workStationOptions = res.data;
                        }
                        else {
                            this.workStation = "";
                            this.workStationOptions = [];
                            this.shebei = "";
                            this.shebeiOptions = [];
                            this.buwei = "";
                            this.buweiOptions = [];
                        }
                    });
            },

            //根据工位选择
            changeSelect() {
                axios.post(" " + url + "/shebei/shebeiList", {"jiagongxian": this.line, "stationid": this.workStation})
                    .then((res) => {
                        if (res.data.length > 0) {
                            this.shebei = res.data[0].id;
                            this.shebeiOptions = res.data;
                        }
                        else {
                            this.shebei = "";
                            this.shebeiOptions = [];
                            this.buwei = "";
                            this.buweiOptions = [];
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            //更改设备
            changeSB() {
                axios.post(" " + url + "/shebei/shebeibuweiList", {"shebeiid": this.shebei})
                    .then((res) => {
                        if (res.data.length > 0) {
                            this.buwei = res.data[0].id;
                            this.buweiOptions = res.data;
                        }
                        else {
                            this.buwei = "";
                            this.buweiOptions = [];
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },


            changeBW() {

            },

            //选择那个一个
            selectList(val) {
                this.val = val;
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
                this.selectList(val)
            },

            //选择改变
            selectionChange(val) {
                this.selectList(val)
            },

            //显示新增
            showAdd() {
                this.addVisible=true;
                this.shebei="";
                this.name="";
                this.line= '';
                this.buwei="";
                this.workStation="";
                this.dynamicValidateForm = {
                    domains: [{
                        no: '',
                        jcxm: "",
                        jcnr: "",
                        jcff: ""
                    }],
                };
            },

            //进行新增
            doAdd() {
                if (this.name) {
                    axios.post(" " + url + "/shebei/contentAdd",
                        {
                            "name": this.name
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
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

            //双击点击行内编辑
            edit(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/sysconfig/deptDetail", {"id": this.id})
                    .then((res) => {
                        this.name = res.data.name;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit() {
                if (this.name) {
                    axios.post(" " + url + "/sysconfig/updateDept",
                        {
                            "id": this.id,
                            "name": this.name,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.editVisible = false;
                                this.$message.success(`修改成功`);
                                this.loadingShowData()
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
                    this.message = "请勾选要删除的分类";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //取消删除
            cancelDelete() {
                this.delVisible = false;
                this.listData = [];
                if (this.val.length === 1) {
                    for (let i = 0, l = this.val.length; i < l; i++) {
                        this.$refs.moviesTable.toggleRowSelection(this.val[i]);
                    }
                }

            },

            // 确定删除
            deleteRow() {
                axios.post(" " + url + "/sysconfig/delDept",
                    {
                        "ids": this.listData,
                    }
                )
                    .then((res) => {
                        if (res.data === "1") {
                            this.$message.success('删除成功');
                            this.delVisible = false;
                            this.loadingShowData();
                        }
                        else {
                            this.$message.warning(`删除失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            //增加时间
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    no: '',
                    jcxm: "",
                    jcnr: "",
                    jcff: ""
                });
            },
            //删除时间
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item);
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
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

        }
    }


</style>
