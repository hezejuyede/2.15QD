<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>物料管理</el-breadcrumb-item>
                <el-breadcrumb-item>配送跟踪（托单金物）</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索配送信息</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索配送信息" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>选择批次</span>
                        <span>:</span>
                        <el-select
                            v-model="batch"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择批次">
                            <el-option
                                v-for="item in batchOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" @click="doSearch">查询</el-button>
                    <el-button type="warning" @click="viewPicture">查看一品图</el-button>
                    <el-button type="success" @click="showReplenishment">已配材</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
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

            <!--一品图弹出框 -->
            <el-dialog title="一品图" :visible.sync="editVisible" :fullscreen="true" :center="true">
                <viewer :images="imgs">
                    <img v-for="src in imgs" :src="src.url" :key="src.title" style="width: 100%;height: 100%">
                </viewer>
            </el-dialog>



            <Modal :msg="message"
                   :isHideModal="HideModal"></Modal>
        </div>


        <!--配材出框 -->
        <el-dialog title="配材" :visible.sync="replenishmentVisible" width="40%">
            <el-form ref="form"  label-width="100px">
                <el-form-item label="是否配材">
                    <el-select
                        v-model="replenishment"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择是否配材">
                        <el-option
                            v-for="item in replenishmentOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="replenishmentVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doReplenishment" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>

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

                batch: "",
                batchOptions: [],

                cols: [],
                tableData: [],

                select_word: '',

                replenishmentVisible:false,
                replenishment: 1,
                replenishmentOptions: [{"name": "已配材", "id": 1}],
                editVisible:false,
                url: "",
                imgs: [],

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
                        axios.post(" " + url + "/sys/getPiciList"),
                    ])
                        .then(axios.spread(function (select) {
                            that.batchOptions = select.data;
                            that.batch = select.data[0].id;
                            that.loadingShowData(that.batch);
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
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "tuodanjinwupeisonggenzong"}),
                    axios.post(" " + url + "/wuliao/peisong/peisongList", {"pici": data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },


            //根据批次查询
            doSearch() {
                if (this.batch) {
                    this.loadingShowData(this.batch)
                }
                else {
                    this.message = "查询批次不能为空";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
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

            //显示补货弹框
            showReplenishment() {
                if (this.listData.length) {
                    let status;
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].id = this.listData[0]) {
                            status = this.tableData[i].status;
                        }
                    }
                    if (this.listData.length === 1 && status !== 1) {
                        this.replenishmentVisible = true;
                    }
                    else if (this.listData.length > 1) {
                        this.$message.warning("只能选一个");
                    }
                    else {
                        this.$message.warning("已经配材");
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


            //查看一品图
            viewPicture() {
                if (this.listData.length) {
                    if(this.listData.length === 1){
                        let pc;
                        let code;
                        let yiguanhao;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].id = this.listData[0]) {
                                pc = this.tableData[i].pici;
                                code = this.tableData[i].codeno;
                                yiguanhao = this.tableData[i].yiguanhao;
                            }
                        }
                        if (pc && code && yiguanhao) {
                            axios.post(" " + url + "/yipintu/getYipintuImg.html", {
                                "pici": pc,
                                "yiguanhao": yiguanhao,
                                "code": code
                            })
                                .then((res) => {
                                    if (res.data.imgurl) {
                                        this.editVisible = true;
                                        this.url = url + res.data.imgurl;
                                        this.imgs = [{"url": this.url}];
                                    }
                                    else {
                                        this.message = "没有查到一品图";
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
                                })
                        }
                        else {
                            this.$message.warning("批次，一贯号，code号不能有空");
                        }
                    }
                    else {
                        this.$message.warning("只能选一个");
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

            //进行配材
            doReplenishment() {
                if (this.replenishment) {
                    axios.post(" " + url + "/wuliao/peisong/updateStatus",
                        {
                            "id": this.listData[0],
                            "status":this.replenishment

                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(res.data.message);
                                this.replenishmentVisible = false;
                                this.loadingShowData(this.batch);
                                this.listData = [];
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
                padding-left: 50px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width: 150px;
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
