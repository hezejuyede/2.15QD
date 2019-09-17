<template>
    <div class="production">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>管工查询</el-breadcrumb-item>
                <el-breadcrumb-item>工位动态</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="productionContent">
            <div class="handle-box">
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
                <el-button type="primary" class="handle-del mr10" @click="doSearch">查询</el-button>
                <el-button type="success" class="handle-del mr10" @click="doSearchWwc">未完成管查询</el-button>
            </div>
            <div class="contentDiv">
                <div class="productionContentTable clearfix">
                    <div class="productionContentTableLeft fl">
                        {{batch}}
                    </div>
                    <div class="productionContentTableRight fr">
                        <div class="tableDiv" v-for="(item,index) in tableData">
                            <div class="tableDivTop" :class="[classColor1,{
                        classColor2:item.status===2,
                        classColor3:item.status===3,
                        classColor4:item.status===4,
                        classColor5:item.status===5,
                        classColor6:item.status===6,
                        }]">
                                <div class="tableDivTop-text">{{item.stationName}}</div>
                                <div class="tableDivTime">{{item.time}}</div>
                            </div>
                            <div class="tableDivBottom">
                                <div class="tableTemplate" v-for="(item1,index) in item.table"  >
                                    <div class="tableTemplate-title">{{item1.title}}</div>
                                    <div class="tableTemplate-number">{{item1.number}}</div>
                                    <div class="tableTemplate-jd">{{item1.jd}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--新增弹出框 -->
        <el-dialog title="工位列表" :visible.sync="wacVisible" width="60%">
            <el-table
                class="tb-edit"
                :data="tableData2"
                :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'14px'}"
                border
                @row-dblclick="showModal"
                height="400"
                highlight-current-row
                style="width: 98%;margin: auto">
                <el-table-column
                    prop="xuhao"
                    align="center"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="pici"
                    align="center"
                    label="批次">
                </el-table-column>
            </el-table>
        </el-dialog>

        <!--新增弹出框 -->
        <el-dialog title="工位列表" :visible.sync="listVisible" width="100%" :fullscreen="true" :center="true"
                   @close='closeDialog'>
            <div class="contentDiv">
                <div class="productionContentTable clearfix">
                    <div class="productionContentTableLeft fl">
                        {{batch}}
                    </div>
                    <div class="productionContentTableRight fr">
                        <div class="tableDiv" v-for="(item,index) in tableData">
                            <div class="tableDivTop" :class="[classColor1,{
                        classColor2:item.status===2,
                        classColor3:item.status===3,
                        classColor4:item.status===4,
                        classColor5:item.status===5,
                        classColor6:item.status===6,
                        }]">
                                <div class="tableDivTop-text">{{item.stationName}}</div>
                                <div class="tableDivTime">{{item.time}}</div>
                            </div>
                            <div class="tableDivBottom">
                                <div class="tableTemplate" v-for="(item1,index) in item.table">
                                    <div class="tableTemplate-title">{{item1.title}}</div>
                                    <div class="tableTemplate-number" @click="showModal(index,item1.stationid)">
                                        {{item1.number}}
                                    </div>
                                    <div class="tableTemplate-jd">{{item1.jd}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
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
                batch: "",
                batchOptions: [],
                tableData:[],

                tableData2: [],

                wacVisible: false,
                listVisible: false,

            }
        },
        components: {},
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
                    ])
                        .then(axios.spread(function (select) {
                            that.batchOptions = select.data;
                            that.batch = select.data[0].id;
                            that.loadingShowData(that.batch);
                        }));
                }
            },

            //瞬间加载数据
            loadingShowData(data) {
                axios.post(" " + url + "/dynamic/getStationDynamicList", {"pici": data})
                    .then((res) => {
                        this.tableData = res.data
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },


            //进行查询
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

            //未完成查询
            doSearchWwc() {
                axios.post(" " + url + "/dynamic/getWeiwanchengDynamicList")
                    .then((res) => {
                        if (res.data.length > 0) {
                            this.wacVisible = true;
                            let data = [];
                            for (let i = 0; i < res.data.length; i++) {
                                let json = {
                                    "xuhao": i + 1,
                                    "pici": res.data[i].pici
                                };
                                data.push(json)
                            }
                            this.tableData2 = data;
                        }
                        else {
                            this.message = "暂无数据";
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
            },


            //弹框关闭重新加载数据
            showModal(row, column, cell, event) {
                this.listVisible = true;
                this.loadingShowData(row.pici);
            },

            //关闭弹框
            closeDialog() {
                this.loadingShowData(this.batch)
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
            border-bottom: 1px solid @color-background-d;
        }
        .productionContent {
            height: 80px;
            .handle-box {
                height: 80px;
                line-height: 80px;
                padding-left: 20px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width: 150px;
                    height: 35px;
                }
            }
            .contentDiv {
                height: 550px;
                overflow: auto;
            }
            .productionContentTable {
                height: 450px;
                line-height: 244px;
                margin-top: 10px;
                .productionContentTableLeft {
                    width: 10%;
                    height: 450px;
                    line-height: 450px;
                    text-align: center;
                    font-size: @font-size-large;

                }
                .productionContentTableRight {
                    width: 90%;
                    .tableDiv {
                        width: 24%;
                        float: left;
                        border-left: 1px solid @color-background-d;
                        border-top: 1px solid @color-background-d;
                        border-bottom: 1px solid @color-background-d;
                        margin: 10px 0.25%;
                        .tableDivTop {
                            height:50px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-right: 1px solid @color-background-d;
                            position: relative;
                            color: @color-blue;
                            .tableDivTop-text{
                                width: 40%;
                                height: 30px;
                                margin: 0 auto;
                                text-align: center;
                                line-height: 30px;
                                position: absolute;
                                top: 12px;
                                left: 0;
                            }
                            .tableDivTime{
                                width: 60%;
                                height: 30px;
                                margin: 0 auto;
                                text-align: center;
                                line-height: 30px;
                                position: absolute;
                                top: 12px;
                                right: 0;
                                font-size: 12px;
                            }
                        }

                        .tableDivBottom {
                            display: flex;
                            .tableTemplate {
                                width: 25%;
                                height: 80px;
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                                font-size: @font-size-small-s;

                                .tableTemplate-number {
                                    width: 100%;
                                    height: 33%;
                                    border-right: 1px solid @color-background-d;
                                    border-bottom: 1px solid @color-background-d;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    cursor: pointer;


                                }
                                .tableTemplate-title {
                                    width: 100%;
                                    height: 33%;
                                    border-right: 1px solid @color-background-d;
                                    border-top: 1px solid @color-background-d;
                                    border-bottom: 1px solid @color-background-d;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                }
                                .tableTemplate-jd {
                                    width: 100%;
                                    height: 33%;
                                    border-right: 1px solid @color-background-d;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                }

                            }
                        }
                    }
                }

            }

        }

    }
    .classColor1{
      background-color: #b3d8ff;
    }
    .classColor2{
        background-color: green;
    }
    .classColor3{
        background-color:yellow;

    }
    .classColor4{
        background-color: orange;
    }
    .classColor5{
        background-color: violet;
      }
    .classColor6{
        background-color: red;

    }

    .contentDiv {
        height: 550px;
        overflow: auto;
    }
    .productionContentTable {
        height: 450px;
        line-height: 244px;
        margin-top: 10px;
        .productionContentTableLeft {
            width: 10%;
            height: 450px;
            line-height: 450px;
            text-align: center;
            font-size: @font-size-large;

        }
        .productionContentTableRight {
            width: 90%;
            .tableDiv {
                width: 24%;
                float: left;
                border-left: 1px solid @color-background-d;
                border-top: 1px solid @color-background-d;
                border-bottom: 1px solid @color-background-d;
                margin: 10px 0.25%;
                .tableDivTop {
                    height:50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-right: 1px solid @color-background-d;
                    position: relative;
                    color: @color-blue;
                    .tableDivTop-text{
                        width: 40%;
                        height: 30px;
                        margin: 0 auto;
                        text-align: center;
                        line-height: 30px;
                        position: absolute;
                        top: 12px;
                        left: 0;
                    }
                    .tableDivTime{
                        width: 60%;
                        height: 30px;
                        margin: 0 auto;
                        text-align: center;
                        line-height: 30px;
                        position: absolute;
                        top: 12px;
                        right: 0;
                        font-size: 12px;
                    }
                }

                .tableDivBottom {
                    display: flex;
                    .tableTemplate {
                        width: 25%;
                        height: 80px;
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        font-size: @font-size-small-s;

                        .tableTemplate-number {
                            width: 100%;
                            height: 33%;
                            border-right: 1px solid @color-background-d;
                            border-bottom: 1px solid @color-background-d;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;


                        }
                        .tableTemplate-title {
                            width: 100%;
                            height: 33%;
                            border-right: 1px solid @color-background-d;
                            border-top: 1px solid @color-background-d;
                            border-bottom: 1px solid @color-background-d;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .tableTemplate-jd {
                            width: 100%;
                            height: 33%;
                            border-right: 1px solid @color-background-d;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                    }
                }
            }
        }

    }



</style>
