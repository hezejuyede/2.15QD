<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>物料管理</el-breadcrumb-item>
                <el-breadcrumb-item>配送查询（托单金物）</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索托单金物</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索托单金物" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
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
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>配材状态</span>
                        <span>:</span>
                        <el-select
                            v-model="peisong"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="配材状态">
                            <el-option
                                v-for="item in peisongOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary"  @click="doSearch">查询</el-button>
                    <el-button type="success"  @click="showDoSee">查看一品图</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              :height="this.tableHeight"
                              @select="selectList"
                              @select-all="selectAll"
                              @selection-change="selectChange"
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
            <el-dialog title="新增按钮" :visible.sync="yptVisible" :fullscreen="true" :center="true">
               <div class="" style="height: 800px;overflow: auto" ref="imageWrapper">
                   <viewer :images="imgs">
                       <img v-for="src in imgs" :src="src.url" :key="src.title" style="width: 100%;height: 100%">
                   </viewer>
               </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="yptVisible = false" style="height:30px;width:80px">取 消</el-button>
             <!--   <el-button type="primary" @click="importImg" style="height:30px;width:80px">打印一品图</el-button>-->
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
    import html2canvas from 'html2canvas'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,

                cols: [],
                tableData: [],

                listData:[],
                id:"",

                batch: "",
                batchOptions: [],

                select_word: '',

                tableHeight:Number,
                peisong: "",
                peisongOptions: [{"name": "已送货", "id": "1"}, {"name": "已配材", "id": "2"}, {"name": "未配材", "id": "3"}, {"name": "总清单", "id": "4"}],
                yptVisible:false,
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
                            that.loadingShowData(that.batch,that.peisong);
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
            loadingShowData(data1,data2) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "tuodanjinwupeisonggenzong"}),
                    axios.post(" " + url + "/wuliao/peisong/peisongList", {"pici": data1,"peisong":data2})
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

            //选择改变
            selectChange(val){
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

            //根据时间查询
            doSearch() {
                if (this.batch) {
                    this.loadingShowData(this.batch);
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

            //显示查询一品图
            showDoSee(){
                if (this.listData.length) {
                    if(this.listData.length>1){
                        this.$message.warning("只能查看一个");
                    }
                    else {
                        let yiguanhao;
                        let code;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].id === this.listData[0]) {
                                yiguanhao = this.tableData[i].yiguanhao;
                                code = this.tableData[i].codeno;
                            }
                        }

                        axios.post(" " + url + "/yipintu/getYipintuImg.html", {
                            "pici": this.batch,
                            "yiguanhao": yiguanhao,
                            "code": code
                        })
                            .then((res) => {
                                if (res.data.imgurl) {
                                    this.yptVisible = true;
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

            //导出一品图
            importImg() {
                html2canvas(this.$refs.imageWrapper, {
                    backgroundColor: null     // 解决生成的图片有白边
                }).then((canvas) => {
                    let dataURL = canvas.toDataURL("image/png");
                    let a = document.createElement('a');
                    a.setAttribute('download', '');
                    a.setAttribute('href', dataURL);
                    a.setAttribute("target", "_blank");
                    a.click();
                })
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
