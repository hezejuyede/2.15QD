<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
                <el-breadcrumb-item>人员资质设定</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>筛选人员</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选人员" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>部门</span>
                        <span>:</span>
                        <el-select
                            v-model="dept"
                            style="width: 150px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择部门">
                            <el-option
                                v-for="item in deptOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="success" icon="delete" class="handle-del mr10" @click="doSearchPerson">查询人员
                    </el-button>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">资质设定
                    </el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              :height="this.tableHeight"
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

        </div>
        <!--新增弹出框 -->
        <el-dialog title="资质设定" :visible.sync="addVisible" width="40%">
            <el-form ref="form" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="name" disabled placeholder="用户名" style="width: 150px"></el-input>
                </el-form-item>
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

        <Modal :msg="message"
               :isHideModal="HideModal"></Modal>
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
                listType: [],

                workStation: "",
                workStationOptions: [],

                line: '',
                lineOptions: [],

                cols: [],
                tableData: [],


                dept: "",
                deptOptions: [],

                select_word: '',

                addVisible: false,
                tableHeight:Number,


                id: "",
                name: '',

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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sysconfig/deptList"),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                    ])
                        .then(axios.spread(function (dept,line, workStation) {
                            that.deptOptions = dept.data;
                            that.lineOptions = line.data;
                            that.workStationOptions = workStation.data;
                            that.loadingShowData();

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
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "ryzzsd"}),
                    axios.post(" " + url + "/sysconfig/personList", {"deptid": data1,})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },

            //选择那个一个
            selectList(val) {
                if (val.length) {
                    let data = [];
                    let type = [];
                    for (let i = 0; i < val.length; i++) {
                        let a = val[i].id;
                        data.push(a)
                    }
                    for (let i = 0; i < val.length; i++) {
                        let b = val[i].showname;
                        type.push(b)
                    }
                    this.listData = data;
                    this.listType = type;
                }
                else {
                    this.listData = [];
                }
            },


            //进行人员查询
            doSearchPerson() {
                this.loadingShowData(this.dept)
            },


            //显示新增资质
            showAdd() {
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
                        this.addVisible = true;
                        this.name = this.listType[0];
                        axios.post(" " + url + "/sysconfig/getziZhiByUserid", {"id": this.listData[0]}
                        )
                            .then((res) => {
                                this.zizhiname = res.data;
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                }
                else {
                    this.message = "请勾选要设定的人员";
                    this.HideModal = false;
                    const that = this;

                    function b() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(b, 2000);
                }
            },
            //进行新增资质
            doAdd() {
                if (this.name && this.workStation) {
                    axios.post(" " + url + "/sysconfig/saveUserZizhi",
                        {
                            "id": this.listData[0],
                            "ids": this.workStation
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(`设定成功`);
                                this.addVisible = false;
                                this.listData=[];
                                this.listType=[];
                                this.loadingShowData(this.dept)
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
            //更改生产线
            changeSCX() {
                axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line})
                    .then((res) => {
                        if (res.data ==="-1") {
                            this.workStation = "";
                            this.workStationOptions = [];
                        }
                        else {
                            this.workStationOptions = res.data;
                        }
                    });
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
