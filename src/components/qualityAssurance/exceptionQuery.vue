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
                        <span>前管状态</span>
                        <span>:</span>
                        <el-select
                            v-model="gzType"
                            style="width: 150px;"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="当前管状态">
                            <el-option
                                v-for="item in gzTypeOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
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
                    :header-cell-style="{background:'#A1D0FC',color:' rgba(0, 0, 0, 0.8)',fontSize:'18px'}"
                    border
                    height="400"
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

                gzType: '',
                gzTypeOptions: [],

                editVisible: false,

                yuanyin: "",
                zerenren: '',
                chuliduice: '',
                sunshigongshi: '',
                cailiaoqingkuang: "",
                pc:"",
                pcOptions:[]


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
                    let Info = JSON.parse(userInfo);
                    this.username = Info.username;
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/api/getProcessList.html"),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": 1}),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": 3}),
                        axios.post(" " + url + "/sys/getPiciList"),
                    ])
                        .then(axios.spread(function (gx, yc, gz,PC) {
                            that.gxTypeOptions = gx.data;
                            that.ycTypeOptions = yc.data;
                            that.gzTypeOptions = gz.data;
                            that.gxType = gx.data[0].id;
                            that.ycType = yc.data[0].indexno;
                            that.gzType = gz.data[0].indexno;
                            that.pc = PC.data[0].id;
                            that.pcOptions=PC.data;

                            axios.post(" " + url + "/shengchanError/errorEventList", {
                                "pici": that.pc,
                                "id": that.gxType,
                                "errorId": that.ycType,
                                "status": that.gzType
                            })
                                .then((res) => {
                                    that.tableData = res.data;
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }));
                }
            },

            //进行查询
            doSearch() {
                if (this.gxType && this.ycType && this.gzType && this.pc) {
                    axios.post(" " + url + "/shengchanError/errorEventList", {
                        "id": this.gxType,
                        "errorId": this.ycType,
                        "status": this.gzType,
                        "pici": this.pc
                    })
                        .then((res) => {
                            this.tableData = res.data;
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.message = "请完善查询信息";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }

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
                this.editVisible = true;
            },

            // 保存编辑
            saveEdit() {
                if (this.yuanyin && this.zerenren && this.chuliduice && this.sunshigongshi && this.cailiaoqingkuang) {
                    axios.post(" " + url + "/shengchanError/curErrorEvent", {
                        "userId": this.username,
                        "id": this.gzId,
                        "context": this.yuanyin,
                        "zerenren": this.zerenren,
                        "chuliduiche": this.chuliduice,
                        "shunshigongsi": this.sunshigongshi,
                        "cailiaoqingkuang":this.cailiaoqingkuang,
                        "status":1 ,
                    })
                        .then((res) => {
                            if (res.data === "1") {
                                axios.post(" " + url + "/shengchanError/errorEventList", {
                                    "id": this.gxType,
                                    "errorId": this.ycType,
                                    "status": this.gzType
                                })
                                    .then((res) => {
                                        this.editVisible = false;
                                        this.$message.success(`提交第成功`);
                                        this.tableData = res.data;
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
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
        }
        .exceptionQueryContent {
            .exceptionQueryContentTab {
                height: 100px;
                display: flex;
                .selectTab {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    button {
                        width: 100px;
                        height: 30px;
                    }
                }
            }
            .exceptionQueryTable {

            }
        }

    }



</style>
