<template>
    <div class="InformationImport">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>计划排产</el-breadcrumb-item>
                <el-breadcrumb-item>管加工数据导入(特别)</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="importDataQueryContentTable">
                <div class="tabTop">
                    <div class="tabTop-div" v-for="(item,index) in navBar" :class="{'red':index === num}"
                         @click="goToNavBar(index)">
                        <span>{{item.text}}</span>
                    </div>
                </div>
                <div class="tabBottom">
                    <div class="tabBottomTemplate" v-if="this.num===0">
                        <div class="handle-box">
                            <label style="margin-right: 10px">
                                <span>智能检索</span>
                                <span>:</span>
                                <el-input v-model="select_word"  style="width: 150px" placeholder="智能检索"></el-input>
                            </label>
                            <label style="margin-right: 10px">
                                <span>区划</span>
                                <span>:</span>
                                <el-input v-model="quHua"  style="width: 150px" placeholder="区划"></el-input>
                            </label>
                            <label style="margin-right: 10px">
                                <span>系统号</span>
                                <span>:</span>
                                <el-input v-model="systemNumber"  style="width: 150px" placeholder="code"></el-input>
                            </label>
                            <label style="margin-right: 10px">
                                <span>智能检索</span>
                                <span>:</span>
                                <el-input v-model="codeNumber"  style="width: 150px" placeholder="code"></el-input>
                            </label>
                            <el-button type="primary"  @click="showAdd">新增</el-button>
                            <el-button type="success"  @click="showDelete">查询</el-button>
                        </div>
                        <div class="">
                            <el-table class="tb-edit"
                                      :data="tables"
                                      :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                                      border
                                      height="450"
                                      @select-all="selectAll"
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
                    <div class="tabBottomTemplate" v-if="this.num===1">
                        1
                    </div>
                    <div class="tabBottomTemplate" v-if="this.num===2">
                        2
                    </div>
                    <div class="tabBottomTemplate" v-if="this.num===3">
                       3
                    </div>
                    <div class="tabBottomTemplate" v-if="this.num===4">
                       4
                    </div>







                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import Modal from '../../common/modal'
    import url from '../../assets/js/URL'
    export default {
        name: 'InformationImport',
        data() {
            return {
                message: '',          //弹出框信息
                HideModal: true,      //弹出框是否显示

                num:0,                 //显示导航栏的index
                navBar: [
                    {"text": "合拢管"},
                    {"text": "导入管"},
                    {"text": "支架管"},
                    {"text": "未出图船号导入"},
                    {"text": "补做管"},
                ],          //显示导航栏的数据


                select_word: "",         //智能检索
                quHua: "",               //区划
                systemNumber:"",         //区划
                codeNumber:"",           //区划

                cols: [],                //表头
                tableData: [],           //表数据
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


            goToNavBar(index) {
                this.num = index;
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
    .InformationImport{
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs{
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .container{
            .tabTop{
                display: flex;
                height: 50px;
                margin: 10px auto;
                .tabTop-div {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    cursor: pointer;
                }
                .red {
                    background-color: @color-background-d;
                }
            }
            .tabBottom {
                .tabBottomTemplate {

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
                }

            }

        }
    }


</style>
