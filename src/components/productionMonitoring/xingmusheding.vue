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
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="doSearch">查询</el-button>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">新增项目</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
                              ref="moviesTable"
                              @row-dblclick="edit"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <template v-for="(col ,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
            <!--新增弹出框 -->
            <el-dialog title="新增点检内容" :visible.sync="addVisible" width="98%">
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
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
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
                        xiangmu: "",
                        neirong: "",
                        fangfa: ""
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
                                }));
                        }));

                }
            },

            //瞬间加载数据
            loadingShowData(data) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "scxdjxmsd"}),
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
                            this.shebei = "";
                            this.shebeiOptions = [];
                            this.buwei = "";
                            this.buweiOptions = [];
                        }
                        else {
                            this.workStation = res.data[0].id;
                            this.workStationOptions = res.data;
                            this.changeSelect();
                            this.changeSB();

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
                            this.changeSB();
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
                this.loadingShowData(this.buwei);
            },


            //显示新增
            showAdd() {
                this.addVisible=true;
              /*  this.shebei="";
                this.name="";
                this.line= '';
                this.buwei="";
                this.workStation="";*/
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
                    no: '',
                    xiangmu: "",
                    neirong: "",
                    fangfa: ""
                });
            },

            //删除时间
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item);
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },

            doSearch(){
                if(this.buwei ){
                    this.loadingShowData(this.buwei);
                }
                else {
                    this.$message.warning(`部位不能为空`);
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
