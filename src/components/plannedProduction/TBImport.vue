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
                                <el-input v-model="systemNumber"  style="width: 150px" placeholder="系统号"></el-input>
                            </label>
                            <label style="margin-right: 10px">
                                <span>智能检索</span>
                                <span>:</span>
                                <el-input v-model="codeNumber"  style="width: 150px" placeholder="code"></el-input>
                            </label>
                            <el-button type="primary"  @click="showAdd(num)">新增</el-button>
                            <el-button type="success"  @click="doSearch(num)">查询</el-button>
                        </div>
                        <div class="">
                            <el-table
                                class="tb-edit"
                                :data="tables"
                                :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                                border
                                height="450"
                                highlight-current-row
                                style="width: 98%;margin: auto">
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


        <!--新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="40%">
            <div class="" v-if="this.num===0" style="height: 90%;overflow-y: auto">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="数据查询">
                        <div class="" style="display: flex">
                            <div class="" style="flex: 1">
                                <el-input v-model="quHua" style="width: 150px" placeholder="区划"></el-input>
                            </div>
                            <div class="" style="flex: 1">
                                <el-input v-model="systemNumber" style="width: 150px" placeholder="系统号"></el-input>
                            </div>
                            <div class="" style="flex: 1">
                                <el-button type="success" @click="doSearchHLG" style="width: 70px;height: 35px">查询</el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="查看一品图">
                        <el-button type="danger" @click="seeYpt" style="width: 150px;height: 35px">查看一品图
                        </el-button>
                    </el-form-item>
                    <el-form-item label="优先级">
                        <el-select
                            v-model="yxj"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="优先级">
                            <el-option
                                v-for="item in yxjOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="CODE">
                        <el-input v-model="code" style="width: 200px">CODE</el-input>
                    </el-form-item>
                    <el-form-item label="一贯号">
                        <el-input v-model="yiguanhao" style="width: 200px">一贯号</el-input>
                    </el-form-item>
                    <el-form-item label="涂装番号">
                        <el-input v-model="tuzhuangfanhao" style="width: 200px">涂装番号</el-input>
                    </el-form-item>
                    <el-form-item label="水试">
                        <el-input v-model="shuishi" style="width: 200px">水试</el-input>
                    </el-form-item>
                    <el-form-item label="处理方式">
                        <el-input v-model="chulifangshi" style="width: 200px">水试</el-input>
                    </el-form-item>
                    <el-form-item label="管种">
                        <el-input v-model="guanzhong" style="width: 200px">水试</el-input>
                    </el-form-item>
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" style="width: 200px"> 船号</el-input>
                    </el-form-item>
                    <el-form-item label="批次">
                        <el-input v-model="batch" style="width: 200px"> 批次</el-input>
                    </el-form-item>
                    <el-form-item label="口径">
                        <el-input v-model="koujing" style="width: 200px">口径</el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="lianxiren" style="width: 200px">联系人</el-input>
                    </el-form-item>
                    <el-form-item label="接受日期">
                        <el-input v-model="jieshouriqi" style="width: 200px">接受日期</el-input>
                    </el-form-item>
                    <el-form-item label="交付日期">
                        <el-input v-model="jiaofuriqi" style="width: 200px">交付日期</el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="beizhu" style="width: 200px">备注</el-input>
                    </el-form-item>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd(num)" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑按钮" :visible.sync="editVisible" width="40%">
            <div class="" v-if="this.num===0" style="height: 90%;overflow-y: auto">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="数据查询">
                        <div class="" style="display: flex">
                            <div class="" style="flex: 1">
                                <el-input v-model="quHua" style="width: 150px" placeholder="区划"></el-input>
                            </div>
                            <div class="" style="flex: 1">
                                <el-input v-model="systemNumber" style="width: 150px" placeholder="系统号"></el-input>
                            </div>
                            <div class="" style="flex: 1">
                                <el-button type="success" @click="doSearchHLG" style="width: 70px;height: 35px">查询</el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="查看一品图">
                        <el-button type="danger" @click="seeYpt" style="width: 150px;height: 35px">查看一品图
                        </el-button>
                    </el-form-item>
                    <el-form-item label="优先级">
                        <el-select
                            v-model="yxj"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="优先级">
                            <el-option
                                v-for="item in yxjOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="CODE">
                        <el-input v-model="code" style="width: 200px">CODE</el-input>
                    </el-form-item>
                    <el-form-item label="一贯号">
                        <el-input v-model="yiguanhao" style="width: 200px">一贯号</el-input>
                    </el-form-item>
                    <el-form-item label="涂装番号">
                        <el-input v-model="tuzhuangfanhao" style="width: 200px">涂装番号</el-input>
                    </el-form-item>
                    <el-form-item label="水试">
                        <el-input v-model="shuishi" style="width: 200px">水试</el-input>
                    </el-form-item>
                    <el-form-item label="处理方式">
                        <el-input v-model="chulifangshi" style="width: 200px">水试</el-input>
                    </el-form-item>
                    <el-form-item label="管种">
                        <el-input v-model="guanzhong" style="width: 200px">水试</el-input>
                    </el-form-item>
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" style="width: 200px"> 船号</el-input>
                    </el-form-item>
                    <el-form-item label="口径">
                        <el-input v-model="koujing" style="width: 200px">口径</el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="lianxiren" style="width: 200px">联系人</el-input>
                    </el-form-item>
                    <el-form-item label="接受日期">
                        <el-input v-model="jieshouriqi" style="width: 200px">接受日期</el-input>
                    </el-form-item>
                    <el-form-item label="交付日期">
                        <el-input v-model="jiaofuriqi" style="width: 200px">交付日期</el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="beizhu" style="width: 200px">备注</el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="删除按钮" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="deleteRow" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>
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
                systemNumber:"",         //系统号
                codeNumber:"",           //区划

                cols: [],                //表头
                tableData: [],           //表数据


                addVisible: false,      //新增弹出框
                editVisible: false,     //编辑弹出框
                delVisible: false,      //删除弹出框


                yxj:"",
                yxjOptions:[
                    {"name":"一般","id":0},
                    {"name":"较急","id":1},
                    {"name":"紧急","id":2},
                ],




                code:"",
                yiguanhao:"",
                yptUrl:"",
                tuzhuangfanhao:"",
                shuishi:"",
                chulifangshi:"",
                guanzhong:"",
                chuanhao:"",
                koujing:"",
                lianxiren:"",
                jieshouriqi:"",
                jiaofuriqi:"",
                beizhu:"",
                batch:""
            }
        },
        components: {Modal},
        mounted() {


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

            //底部导航跳转
            goToNavBar(index) {
                this.num = index;
            },

            //显示新增
            showAdd(index) {
                if (index === 0) {
                    this.addVisible = true;
                    this.code = "";
                    this.yiguanhao = "";
                    this.yptUrl = "";
                    this.tuzhuangfanhao = "";
                    this.shuishi = "";
                    this.chulifangshi = "";
                    this.guanzhong = "";
                }


            },

            //进行新增
            doAdd(index){
                if (index === 0) {
                    if (this.chuanhao && this.quHua && this.systemNumber && this.lianxiren && this.batch && this.jiaofuriqi &&
                        this.beizhu && this.yiguanhao && this.code && this.tuzhuangfanhao && this.shuishi && this.chulifangshi &&
                        this.guanzhong && this.jieshouriqi && this.yxj && this.koujing) {
                        axios.post(" " + url + "/teshu/addHelong",
                            {
                                "chuanhao": this.chuanhao,
                                "quhua": this.quHua,
                                "xitonghao": this.systemNumber,
                                "lianxiren": this.lianxiren,
                                "pici": this.batch,
                                "jiaofuriqi": this.jiaofuriqi,
                                "beizhu": this.beizhu,
                                "yiguanhao": this.yiguanhao,
                                "codeno": this.code,
                                "tuzhuangfanhao": this.tuzhuangfanhao,
                                "shuishi": this.shuishi,
                                "chulifangshi": this.chulifangshi,
                                "guanzhong": this.guanzhong,
                                "wanchengriqi": this.jieshouriqi,
                                "level": this.yxj,
                                "koujing": this.koujing
                            })
                            .then((res) => {
                                if (res.data.state === "1") {


                                }
                                else {
                                    this.$message.warning(res.data.message);
                                }

                            })
                            .catch((err) => {
                                this.$message.warning(err);
                            })
                    }
                    else {
                        this.$message.warning(`信息填写不完整`);
                    }

                }
            },

            //进行查询
            doSearch(index) {
                if (index === 0) {
                    if (this.batch && this.GJGType) {
                        let that = this;
                        axios.all([
                            axios.post(" " + url + "/sys/showTableTitle", {"name": "qieduan", "pici": this.batch}),
                            axios.post(" " + url + "/importother/publicData", {"pici": this.batch, "code": "qieduan"})
                        ])
                            .then(axios.spread(function (title, table) {
                                that.cols = title.data;
                                that.tableData = table.data;
                                that.num = 0;
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
                }


            },

            //合拢管查询
            doSearchHLG() {
                if (this.quHua && this.systemNumber) {
                    axios.post(" " + url + "/teshu/getHelongDetailByXitong",{
                        "quhua":this.quHua,
                        "xitonghao":this.systemNumber
                    })
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.code = res.data.data.codeno;
                                this.yiguanhao = res.data.data.yiguanhao;
                                this.yptUrl = url + "/" + res.data.data.yipintu;
                                this.tuzhuangfanhao = res.data.data.tuzhuangfanhao;
                                this.shuishi = res.data.data.shuishi;
                                this.chulifangshi = res.data.data.chulifangshi;
                                this.guanzhong = res.data.data.guanzhong;
                            }
                            else{
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch((err) => {
                            this.$message.warning(err);
                        })
                }
                else {
                    this.$message.warning(`区划和系统号不能为空`);
                }

            },

            //删除
            doDelete(index) {
                if (index) {

                }


            },

            //查看一品图
            seeYpt() {

            },

            //保存
            saveEdit() {

            },

            //删除
            deleteRow() {

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
