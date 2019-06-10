<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>质量管理</el-breadcrumb-item>
                <el-breadcrumb-item>船东船级意见的查询与统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索反馈</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索反馈" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>选择查询时间</span>
                        <span>:</span>
                        <el-date-picker
                            style="width: 240px"
                            v-model="examineTime"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>反馈类型</span>
                        <span>:</span>
                        <el-select
                            style="width: 150px"
                            v-model="chuan"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择类型">
                            <el-option
                                v-for="item in chuanOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">查询</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
                              ref="moviesTable"
                              @row-dblclick="edit"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <template v-for="(col ,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>

            <!-- 编辑弹出框 -->
            <el-dialog title="查看意见" :visible.sync="editVisible" width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form ref="form"  label-width="100px">
                        <el-form-item label="船号">
                            <el-input v-model="chuanhao" style="width: 200px" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="管子编号">
                            <el-input v-model="guanzibianhao" style="width: 200px" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="船级姓名">
                            <el-input v-model="fankuiren" style="width: 200px" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="反馈时间">
                            <el-date-picker
                                :disabled="true"
                                v-model="fankuishijian"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="反馈意见">
                            <el-input v-model="wuzuoxiangqing" style="width: 300px" :disabled="true"  type="textarea"></el-input>
                        </el-form-item>
                    </el-form>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">已了解</el-button>
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
    import {getNowTime} from '../../assets/js/api'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,

                val:[],


                listData:[],

                id:"",


                cols: [],
                tableData: [],

                select_word: '',


                editVisible: false,



                fankuishijian:"",
                chuanhao: "",
                guanzibianhao:"",
                fankuiren:"",
                wuzuoxiangqing:"",

                chuan: "1",
                chuanOptions: [{"name": "船东意见反馈", "id": "1"}, {"name": "船级意见反馈", "id": "2"}],


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
                    let time = getNowTime();
                    let times = [];
                    for (let i = 0; i < 2; i++) {
                        times.push(time)
                    }
                    this.examineTime = times;
                    this.loadingShowData(this.examineTime,1);
                }
            },

            //瞬间加载数据
            loadingShowData(data1,data2) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "chuandongyijianfankui"}),
                    axios.post(" " + url + "/yijian/yijianList",{"times":data1,"type":data2})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },



            //选择那个一个
            selectList(val) {
                this.val =val;
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



            //双击点击行内编辑
            edit(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/yijian/yijianDetail", {"id": this.id})
                    .then((res) => {
                        this.chuanhao =res.data.data.chuanhao;
                        this.guanzibianhao =res.data.data.guanzibianhao;
                        this.fankuiren = res.data.data.chuandongname;
                        this.wuzuoxiangqing = res.data.data.yijian;
                        this.fankuishijian = res.data.data.fankuishijian;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit() {
                if (this.chuanhao && this.guanzibianhao && this.fankuiren && this.wuzuoxiangqing) {
                    axios.post(" " + url + "/devType/updateDevType",
                        {
                            "type":1,
                            "id": this.id,
                            "chuanhao":  this.chuanhao,
                            "guanzibianhao":  this.guanzibianhao,
                            "fankuiren":  this.fankuiren,
                            "wuzuoxiangqing":  this.wuzuoxiangqing
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.editVisible = false;
                                this.$message.success("修改成功");
                                this.loadingShowData(this.examineTime,1);
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
                line-height:80px;
                padding-left: 20px;
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

        }
    }


</style>
