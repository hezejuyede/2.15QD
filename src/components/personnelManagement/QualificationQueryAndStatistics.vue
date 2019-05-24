<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
                <el-breadcrumb-item>资质查询与统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>筛选资质</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选资质" style="width: 200px"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span> 加工线选择</span>
                        <span>:</span>
                        <el-select
                            v-model="line"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeScx"
                            placeholder="请输入或者选择生产线">
                            <el-option
                                v-for="item in lineOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </label>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="400"
                              @row-dblclick="editPerson"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <template v-for="(col ,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>

        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑人员" :visible.sync="editVisible" width="60%">
            <el-form ref="form" label-width="100px">
                <template>
                    <el-table
                        :data="zizhiData"
                        :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                        border
                        height="400"
                        @row-dblclick="editPerson"
                        highlight-current-row
                        style="width: 98%;margin: auto">>
                        <el-table-column
                            prop="zizhi"
                            label="资质"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="renyuan"
                            label="人员"
                            width="180">
                        </el-table-column>
                    </el-table>
                </template>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
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


                cols: [],
                tableData: [],

                line:"",
                lineOptions:[],

                select_word: '',

                editVisible: false,

                zizhiData:[],

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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
                    ])
                        .then(axios.spread(function (line) {
                            that.line = line.data[0].indexno;
                            that.lineOptions = line.data;
                            that.loadingShowData(that.line)
                        }));


                }
            },

            //瞬间加载数据
            loadingShowData(data1) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "zzcxtj"}),
                    axios.post(" " + url + "/sysconfig/tongjiZizhi", {"jiagongxian": data1})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },


            //改变生产线得到新数据
            changeScx() {
                this.loadingShowData(this.line)
            },
            //双击点击行内编辑
            editPerson(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/sysconfig/personDetail", {"id": this.id})
                    .then((res) => {
                        this.post = res.data.postid;
                        this.dept = res.data.deptid;
                        this.role = res.data.roleid;
                        this.name = res.data.name;
                        this.pwd = res.data.pwd;
                        this.showname = res.data.showname;
                        this.code = res.data.code;
                    })
                    .catch((err) => {
                        console.log(err)
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
