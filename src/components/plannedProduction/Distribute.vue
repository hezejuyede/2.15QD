<template>
    <div class="production">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>任务派发</el-breadcrumb-item>
                <el-breadcrumb-item>派发</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="productionContent">
            <div class="productionContentTab">
                <div class="productionContentTabDiv">
                    <div class="normalTab">
                        <el-select v-model="GJGType" placeholder="选择管加工类型">
                            <el-option
                                v-for="item in GJGTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="batchTab">
                        <el-select
                            v-model="batch"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择批次">
                            <el-option
                                v-for="item in batchOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <button @click="doSearch">查询</button>
                        <button @click="showPF">派发</button>
                        <button @click="doDeletePF" class="red">删除派发</button>
                    </div>
                </div>
            </div>
            <div class="productionContentTable">
                <el-table class="tb-edit"
                          :data="tableData"
                          :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'14px'}"
                          height="400"
                          border
                          highlight-current-row
                          style="width: 98%;margin: auto">
                    <template v-for="(col ,index) in cols">
                        <el-table-column  align="center" :prop="col.prop" :label="col.label"></el-table-column>
                    </template>
                </el-table>
            </div>
            <!-- 派发提示框 -->
            <el-dialog title="提示" :visible.sync="PFData" width="300px" center>
                <div class="del-dialog-cnt">是否确定要派发</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="PFData = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doPF" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
        </div>
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

                PFData:false,

                cols: [],
                tableData: [],

                GJGType: '',
                GJGTypeOptions: [
                    {
                        value: '1',
                        label: '正常管加工'
                    },
                    {
                        value: '2',
                        label: '异常管加工'
                    }
                ],

                batch:"",
                batchOptions: [],


                searchTime:""
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
                    axios.post(" " + url + "/sys/getPiciList")
                        .then((res) => {
                            this.batchOptions = res.data;
                            let that = this;
                            axios.all([
                                axios.post(" "+ url +"/plan/paifaTitle.html ", {"pici": res.data[0].id}),
                                axios.post(" "+ url +"/plan/paifa.html", {"pici": res.data[0].id})
                            ])
                                .then(axios.spread(function (title, table) {
                                    that.cols = title.data;
                                    that.tableData = table.data;
                                }));
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            },

            handleCurrentChange(row, event, column) {
                console.log(row, event, column, event.currentTarget);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },

            doSearch() {
                if (this.batch && this.GJGType) {
                    let that = this;
                    axios.all([
                        axios.post(" "+ url +"/plan/paifaTitle.html ", {"pici": this.batch}),
                        axios.post(" "+ url +"/plan/paifa.html", {"pici": this.batch})
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }));
                }
                else {
                    this.message = "请选择加工类型和批次";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }

            },

            showPF() {
                if(this.batch){
                    this.PFData = true;
                }else {
                    this.message = "请输入批次";
                    this.HideModal = false;
                    const that = this;
                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }
                    setTimeout(a, 2000);
                }
            },

            doPF() {
                this.PFData = false;
                axios.post(" " + url + "/plan/autoPaifa.html", {"pici": this.batch})
                    .then((res) => {
                        if (res.data === "success") {
                            this.message = "已派发成功";
                            this.HideModal = false;
                            const that = this;

                            function a() {
                                that.message = "";
                                that.HideModal = true;
                            }

                            setTimeout(a, 2000);
                        }
                        else {
                            this.message = res.data;
                            this.HideModal = false;
                            const that = this;

                            function b() {
                                that.message = "";
                                that.HideModal = true;
                            }

                            setTimeout(b, 2000);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            //删除派发
            doDeletePF(){
                if (this.batch) {
                    axios.post(" " + url + "/delData/delRealData", {"pici": this.batch})
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.message = "已经删除";
                                this.HideModal = false;
                                const that = this;

                                function a() {
                                    that.message = "";
                                    that.HideModal = true;
                                }

                                setTimeout(a, 2000);

                            }
                            else {
                                let message = res.data.message;
                                this.$message.warning(message);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.message = "请输入批次";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }


            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .production {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .productionContent {
            .productionContentTab {
                height: 100px;

                border-bottom: 1px solid @color-background-d;
                .productionContentTabDiv {
                    width: 80%;
                    height: 100%;
                    display: flex;
                }
                .normalTab {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                }
                .batchTab {
                    flex: 1.5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    button {
                        width: 150px;
                        height: 35px;
                        text-align: center;
                        line-height: 35px;
                        border: none;
                        border-radius: 10%;
                        background-color: @color-blue;
                        color: @color-white;
                        font-size: 16px;
                        margin-left: 10px;
                        margin-right: 10px;
                    }
                    .red{
                        background-color: @color-bg-red;
                    }
                }

            }
            .productionContentTable{
                padding-top: 10px;
            }
        }
    }


</style>

