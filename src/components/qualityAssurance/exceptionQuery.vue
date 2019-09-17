<template>
    <div class="exceptionQuery">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>质量查询</el-breadcrumb-item>
                <el-breadcrumb-item>不具合查询与统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="exceptionQueryContent">
            <div class="exceptionQueryContentTab">
                <div class="selectTab">
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>批次</span>
                        <span>:</span>
                        <el-select
                            v-model="pc"
                            style="width: 150px;"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="批次">
                            <el-option
                                v-for="item in pcOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                </div>
                <div class="selectTab">
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>工序</span>
                        <span>:</span>
                        <el-select
                            v-model="gxType"
                            style="width: 150px;"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="工序">
                            <el-option
                                v-for="item in gxTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                </div>
                <div class="selectTab">
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>异常类型</span>
                        <span>:</span>
                        <el-select
                            v-model="ycType"
                            style="width: 150px;"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="异常类型">
                            <el-option
                                v-for="item in ycTypeOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </label>

                </div>
                <div class="selectTab">
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>处理状态</span>
                        <span>:</span>
                        <el-select
                            v-model="chuLiType"
                            style="width: 150px;"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="处理状态">
                            <el-option
                                v-for="item in chuLiTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>

                </div>
                <div class="selectTab">
                    <el-button type="primary" @click="doSearch">查询</el-button>
                </div>
            </div>
            <div class="exceptionQueryTable">
                <el-table
                    :data="tableData"
                    :header-cell-style="{background:'#A1D0FC',color:' rgba(0, 0, 0, 0.8)',fontSize:'14px'}"
                    border
                    :height="this.tableHeight"
                    @row-click="clickTable"
                    style="width: 98%;margin: 0 auto">
                    <el-table-column
                        prop="pici"
                        label="批次"
                        align="center"
                        min-width="15%">
                    </el-table-column>
                    <el-table-column
                        prop="stationname"
                        label="工序名称"
                        align="center"
                        min-width="15%">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="异常类型"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="zhuangtai"
                        label="管子状态"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="yichangxinxi"
                        label="录入原因"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="chulibumen"
                        label="处理部门"
                        align="center"
                        min-width="15%">
                    </el-table-column>
                    <el-table-column
                        prop="zerenren"
                        label="责任人"
                        align="center"
                        min-width="15%">
                    </el-table-column>
                    <el-table-column
                        prop="chuliduiche"
                        label="处理对策"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="shunshigongsi"
                        label="损失工时"
                        align="center"
                        min-width="15%">
                    </el-table-column>
                    <el-table-column
                        prop="cailiaoqingkuang"
                        label="损失材料"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="chulijieguo"
                        label="处理结果"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="chulishijian"
                        label="处理时间"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="处理异常" :visible.sync="editVisible" width="70%">
            <el-form ref="form"  label-width="100px">
                <el-form-item label="处理部门">
                    <el-select
                        style="width: 300px"
                        v-model="dept"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        placeholder="处理部门">
                        <el-option
                            v-for="item in deptOptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="处理状态">
                    <el-select
                        v-model="chuLiType"
                        style="width: 300px"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        placeholder="处理状态">
                        <el-option
                            v-for="item in chuLiTypeOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="录入原因" >
                    <el-input v-model="yuanyin"></el-input>
                </el-form-item>
                <el-form-item label="责任人">
                    <el-input v-model="zerenren"></el-input>
                </el-form-item>
                <el-form-item label="处理对策">
                    <el-input v-model="chuliduice"></el-input>
                </el-form-item>
                <el-form-item label="损失工时">
                    <el-input v-model="sunshigongshi" type="number"  step="0.1"></el-input>
                </el-form-item>
                <el-form-item label="材料情况">
                    <el-input v-model="cailiaoqingkuang" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>
        <Modal :msg="message"
               :isHideModal="HideModal"></Modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import Modal from '../../common/modal'
    import url from '../../assets/js/URL'

    export default {
        name: 'FactoryCalendar',
        data() {
            return {
                message: '',
                HideModal: true,
                num: 0,
                batch: "",
                username:"",

                gzId:"",
                tableData: [],

                gxType: '',
                gxTypeOptions: [],

                ycType: '',
                ycTypeOptions: [],


                editVisible: false,

                yuanyin: "",
                zerenren: '',
                chuliduice: '',
                sunshigongshi: '',
                cailiaoqingkuang: "",
                pc:"",
                pcOptions:[],
                dept:"",
                deptOptions:[],

                chuLiType: "2",
                chuLiTypeOptions: [{"name": "已处理", "id": "1"}, {"name": "未处理", "id": "2"}],
                tableHeight:Number,
            }
        },
        components: {Modal},
        mounted() {


        },
        created() {
            this.getAdminState()

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
                    let Info = JSON.parse(userInfo);
                    this.username = Info.username;
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/api/getProcessList.html"),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": 1}),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": 3}),
                        axios.post(" " + url + "/sys/getPiciList"),
                        axios.post(" " + url + "/sysconfig/deptList")
                    ])
                        .then(axios.spread(function (gx, yc, gz,PC,dept) {
                            that.gxTypeOptions = gx.data;
                            that.ycTypeOptions = yc.data;
                            that.gzTypeOptions = gz.data;
                            that.pcOptions = PC.data;
                            that.deptOptions = dept.data;
                            that.loadingShowData(that.gxType, that.ycType, that.chuLiType, that.pc)
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
            loadingShowData(data1,data2,data3,data4) {
                axios.post(" " + url + "/shengchanError/errorEventList", {
                    "id": data1,
                    "errorId": data2,
                    "chulizhuangtai": data3,
                    "pici": data4
                })
                    .then((res) => {
                        this.tableData = res.data;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },


            //进行查询
            doSearch() {
                this.loadingShowData(this.gxType, this.ycType, this.chuLiType, this.pc);
            },

            //点击显示编辑
            clickTable(row, column, cell, event) {
                this.gzId =row.id;
                let data = {};
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].id === row.id) {
                        data = this.tableData[i];
                    }
                }
                this.yuanyin = data.yichangxinxi;
                this.zerenren = data.zerenren;
                this.chuliduice = data.chulijieguo;
                this.sunshigongshi = parseInt(data.shunshigongsi);
                this.cailiaoqingkuang = data.cailiaoqingkuang;
                this.chulizhuangtai=data.chulizhuangtai;
                this.dept =data.chulibumen;
                this.editVisible = true;
            },

            // 保存编辑
            saveEdit() {
                if (this.yuanyin && this.zerenren && this.chuliduice && this.sunshigongshi && this.cailiaoqingkuang &&this.dept && this.chuLiType) {
                    axios.post(" " + url + "/shengchanError/curErrorEvent", {
                        "userId": this.username,
                        "id": this.gzId,
                        "context": this.yuanyin,
                        "zerenren": this.zerenren,
                        "chuliduiche": this.chuliduice,
                        "shunshigongsi": this.sunshigongshi,
                        "cailiaoqingkuang":this.cailiaoqingkuang,
                        "chulibumen":this.dept,
                        "chulizhuangtai":this.chuLiType,
                        "status":1 ,
                    })
                        .then((res) => {
                            if (res.data === "1") {
                                this.editVisible=false;
                                this.loadingShowData(this.gxType, this.ycType, this.chuLiType, this.pc);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.$message.warning(`输入框不能为空，请正确填写`);
                }
            },
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";
    .exceptionQuery{
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs{
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
            border-bottom: 1px solid @color-F0;
        }
        .exceptionQueryContent {
            .exceptionQueryContentTab {
                height: 80px;
                display: flex;

                .selectTab {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    button {
                        width:130px;
                        height: 35px;
                    }
                }
            }
            .exceptionQueryTable {

            }
        }

    }



</style>
