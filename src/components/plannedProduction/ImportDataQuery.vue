<template>
    <div class="importDataQuery">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>计划排产</el-breadcrumb-item>
                <el-breadcrumb-item>导入数据查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="importDataQueryContent">
            <div class="importDataQueryContentTab">
                <div class="selectTab">
                    <el-select
                        v-model="GJGType"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        placeholder="选择管加工类型">
                        <el-option
                            v-for="item in GJGTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="batchTab">
                    <div class="">
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
                    </div>
                    <div class="">
                        <el-button type="primary" @click="doSearch">查询</el-button>
                        <!--<el-button type="danger" @click="doDelete">删除</el-button>-->
                    </div>
                </div>
            </div>
            <div class="importDataQueryContentTable">
                <div class="tabTop">
                    <div class="footer-div" v-for="(item,index) in navBar" :class="{'red':index === num}"
                         @click="goToNavBar(index,item.prop)">
                        <span>{{item.label}}</span>
                    </div>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tableData"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'18px'}"
                              border
                              height="350"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <template v-for="(col ,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
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

                num:Number,
                batch: "",
                batchOptions:[],


                cols: [],
                tableData: [],

                GJGType: '',
                GJGTypeOptions: [
                    {
                        value: '1',
                        label: '正常流程管'
                    },
                    {
                        value: '2',
                        label: '特别流程管'
                    }
                ],

                navBar: []

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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/getPiciList"),
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "tablist"})
                    ])
                        .then(axios.spread(function (batchOptions, list) {
                            that.batchOptions = batchOptions.data;
                            that.batch = batchOptions.data[0].id;
                            that.navBar = list.data;
                            axios.all([
                                axios.post(" "+ url +"/sys/showTableTitle", {"name":"qieduan","pici": that.batch}),
                                axios.post(" "+ url +"/importother/publicData", {"pici":  that.batch,"code": "qieduan"})
                            ])
                                .then(axios.spread(function (title, table) {
                                    that.cols = title.data;
                                    that.tableData = table.data;
                                    that.num=0;
                                }));
                        }));
                }
            },

            //进行查询
            doSearch() {
                if (this.batch && this.GJGType) {
                    let that = this;
                    axios.all([
                        axios.post(" "+ url +"/sys/showTableTitle", {"name":"qieduan","pici":this.batch}),
                        axios.post(" "+ url +"/importother/publicData", {"pici": this.batch,"code": "qieduan"})
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
                            that.num=0;
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


            goToNavBar(index, prop) {
                if(this.batch){
                    this.num = index;
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": prop,"pici":this.batch}),
                        axios.post(" " + url + "/importother/publicData", {"code": prop,"pici":this.batch})
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;

                        }));
                }
                else {
                    this.message = "请输入查询批次";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }


            },

            doDelete(){
                if (this.batch) {
                    axios.post(" " + url + "/delData/delQieduanExcel", {"pici": this.batch})
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
    .importDataQuery{
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs{
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .importDataQueryContent {
            .importDataQueryContentTab {
                height: 100px;
                display: flex;
                border-bottom: 1px solid @color-background-d;
                .selectTab{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .batchTab{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    >div{
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .el-button {
                        width: 100px;
                        height: 30px;
                        margin-left: 5%;
                    }
                }
            }
            .importDataQueryContentTable{
                .tabTop{
                    display: flex;
                    height: 50px;
                    margin: 10px auto;
                    .footer-div {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        cursor: pointer;
                        .icon-shuidian {
                            font-size: 20px;
                        }
                        .icon-shuju {
                            font-size: 20px;
                        }
                        .icon-youjian {
                            font-size: 22px;
                        }
                        .icon-iconfonticonfontwode1 {
                            font-size: 20px;
                        }
                    }
                }
                .red {
                    background-color: @color-background-d;
                }
            }




        }

    }



</style>
