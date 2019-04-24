<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>执行端表头配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right:5px">
                        <span>检索表头</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索表头" style="width: 200px"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>工位</span>
                        <span>:</span>
                        <el-select
                            v-model="workStation"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            style="width: 150px"
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in workStationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>位置</span>
                        <span>:</span>
                        <el-select
                            v-model="station"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            style="width: 150px"
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in stationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>类型</span>
                        <span>:</span>
                        <el-select
                            v-model="type"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            style="width: 150px"
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="success" icon="delete" class="handle-del mr10" @click="doSearch">查询表头</el-button>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">新增表头</el-button>
                    <el-button type="danger" icon="delete" class="handle-del mr10" @click="showDelete">删除表头</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
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
            <!--新增弹出框 -->
            <el-dialog title="新增表头" :visible.sync="addVisible" width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="工位选择">
                        <el-select
                            v-model="workStation"
                            clearable
                            filterable
                            disabled
                            allow-create
                            default-first-option
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in workStationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表头位置">
                        <el-select
                            v-model="station"
                            disabled
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择">
                            <el-option
                                v-for="item in stationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表头类型">
                        <el-select
                            v-model="type"
                            clearable
                            filterable
                            disabled
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择">
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表头名字">
                        <el-input v-model="label" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="字段名称">
                        <el-input v-model="prop" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="表头排序">
                        <el-input v-model="sortnum" type="number" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑表头" :visible.sync="editVisible" width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="工位选择">
                        <el-select
                            v-model="workStation"
                            clearable
                            filterable
                            disabled
                            allow-create
                            default-first-option
                            placeholder="请选择工位">
                            <el-option
                                v-for="item in workStationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表头位置">
                        <el-select
                            v-model="station"
                            disabled
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择">
                            <el-option
                                v-for="item in stationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表头类型">
                        <el-select
                            v-model="type"
                            clearable
                            filterable
                            disabled
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择">
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表头名字">
                        <el-input v-model="label" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="字段名称">
                        <el-input v-model="prop" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="表头排序">
                        <el-input v-model="sortnum" type="number" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 删除提示框 -->
            <el-dialog title="删除表头" :visible.sync="delVisible" width="300px" center>
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
                listData:[],
                id:"",


                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,


                workStation:"",
                workStationOptions:[],
                station:1,
                stationOptions:[{"name": "可作业", "id": 1}, {"name": "总清单", "id": 2}],
                type: "1",
                typeOptions: [{"name": "1", "id": 1}, {"name": "2", "id": 2}, {"name": "3", "id": 3},{"name": "4", "id": 4}],

                label:"",
                prop:"",
                sortnum:"",
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
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""})
                    ])
                        .then(axios.spread(function (select,type) {
                            that.workStation = select.data[0].id;
                            that.workStationOptions = select.data;
                            that.loadingShowData(1,1,1);
                        }));
                }
            },

            //瞬间加载数据
            loadingShowData(data1,data2,data3) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "zxdbt"}),
                    axios.post(" " + url + "/padShow/tabletitleList", {"id": data1,"type":data2,"weizhiid":data3})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
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

            //进行查询
            doSearch() {
                if (this.workStation &&this.type &&this.station) {
                    this.loadingShowData(this.workStation, this.type,this.station )
                }
                else {
                    this.message = "三个下拉不能有空";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }

            },
            //显示新增
            showAdd(){

                if (this.workStation && this.type &&this.station) {
                    this.addVisible=true;
                    this.weizhiid = "";
                    this.label = "";
                    this.prop = "";
                    this.sortnum = "";
                }
                else {
                    this.message = "三个下拉不能有空";
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
                if (this.label && this.prop && this.sortnum) {
                    axios.post(" " + url + "/padShow/tabletitleAdd",
                        {
                            "stationid": this.workStation,
                            "label": this.label,
                            "prop": this.prop,
                            "sortnum": this.sortnum,
                            "type": this.type,
                            "weizhiid": this.station,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                this.loadingShowData(this.workStation, this.station, this.type)

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
                axios.post(" " + url + "/padShow/tabletitleDetail", {"id": this.id})
                    .then((res) => {
                        this.workStation = res.data.data.stationid;
                        this.type = res.data.data.type;
                        this.station = res.data.data.weizhiid;
                        this.label = res.data.data.label;
                        this.sortnum = res.data.data.sortnum;
                        this.prop = res.data.data.prop;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit() {
                if (this.label && this.prop && this.sortnum) {
                    axios.post(" " + url + "/padShow/tabletitleUpdate",
                        {
                            "id":this.id,
                            "stationid": this.workStation,
                            "label": this.label,
                            "prop": this.prop,
                            "sortnum": this.sortnum,
                            "type": this.type,
                            "weizhiid": this.station,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.editVisible = false;
                                this.$message.success(`修改成功`);
                                this.loadingShowData(this.workStation, this.station, this.type)
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
                axios.post(" " + url + "/padShow/tabletitleDel",
                    {
                        "id": this.listData[0],
                    }
                )
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.$message.success('删除成功');
                            this.delVisible = false;
                            this.loadingShowData(this.workStation, this.station, this.type)
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
                padding-left: 50px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width:100px;
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
