<template>
    <div class="InformationImport">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>计划排产</el-breadcrumb-item>
                <el-breadcrumb-item>管加工数据导入</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="importTitle">
            <div class="upData fl">
                <button @click="showUpData">正常出图数据导入</button>
            </div>
            <div class="search fl">
                <div class="">
                    <el-select
                        v-model="status"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        placeholder="审批状态">
                        <el-option
                            v-for="item in statusOptions"
                            :key="item.indexno"
                            :label="item.name"
                            :value="item.indexno">
                        </el-option>
                    </el-select>
                </div>
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
                    <div class="select">
                        <el-select
                            v-model="scx"
                            @input="setScx(scx)"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择生产线">
                            <el-option
                                v-for="item in scxOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="">
                    <button @click="doSearch">查询</button>
                    <button @click="showExamine" style="background-color: #dd6161">审核</button>
                </div>
            </div>
        </div>
        <div class="productionContentTable">
            <el-table class="tb-edit"
                      :data="tableData"
                      :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'14px'}"
                      height="400"
                      @select="selectList"
                      border
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
        <Modal :msg="message"
               :isHideModal="HideModal"></Modal>
        <!--新增弹出框 -->
        <el-dialog title="导入数据" :visible.sync="uploadVisible" width="50%">
            <div class="container" style="height:450px;overflow:auto">
                <div class="containerSelect"
                     style="height: 80px;
                     display: flex;
                     align-items: center;
                     justify-content: center">
                    <div class="select">
                        <el-select
                            v-model="fileType"
                            @input="setType(fileType)"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择文件类型">
                            <el-option
                                v-for="item in fileTypeOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="select">
                        <el-select
                            v-model="batch"
                            @input="setPc(batch)"
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
                    <div class="select">
                        <el-select
                            v-model="scx"
                            @input="setScx(scx)"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请输入或者选择生产线">
                            <el-option
                                v-for="item in scxOptions"
                                :key="item.indexno"
                                :label="item.name"
                                :value="item.indexno">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="containerUp" style="display: flex;align-items: center;justify-content: center">
                    <el-upload
                        class="upload"
                        ref="upload"
                        :multiple='true'
                        :drag='true'
                        :data="Data"
                        :action="uploadUrl"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess"
                        :on-error="uploadFailure"
                        :file-list="list"
                        :auto-upload="false">
                        <el-button style="margin:80px 0 0 0;width: 150px;height: 30px;" slot="trigger" size="small"
                                   type="primary">选取文件
                        </el-button>
                        <el-button style="width: 150px;height: 30px;" size="small"
                                   type="success"
                                   @click="submitUpload">上传到系统
                        </el-button>
                    </el-upload>
                </div>
            </div>
        </el-dialog>

        <!--导入文件详情 -->
        <el-dialog title="文件详情" :visible.sync="detailsVisible" width="90%">
            <div class="container" style="height:470px;overflow:auto">
                <el-table class="tb-edit"
                          :data="detailsTableData"
                          :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'14px'}"
                          border
                          height="400"
                          highlight-current-row
                          style="width: 98%;margin: auto">
                    <template v-for="(col ,index) in detailsCols">
                        <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                    </template>
                </el-table>
                <div class="detailsBtn">
                    <button @click="doExamine">通过</button>
                    <button @click="noExamine" style="background-color: #dd6161">不通过</button>
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
        name: 'InformationImport',
        data() {
            return {
                uploadUrl: " " + url + "/fileupload/upload",
                message: '',
                HideModal: true,
                listData: "",
                listArr:[],
                list: [],

                Data: {},

                cols: [],
                tableData: [],
                detailsTableData: [],
                detailsCols: [],

                uploadVisible: false,
                detailsVisible: false,

                pc: "",
                batch: "",
                batchOptions: [],

                type: "",
                fileType: "",
                fileTypeOptions: [],

                SCX: "",
                scx: "",
                scxOptions: [],

                status: "",
                statusOptions: [],
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
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "8"}),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "10"}),
                    ])
                        .then(axios.spread(function (pici, scx, type, status) {
                            that.batchOptions = pici.data;
                            that.batch = pici.data[0].id;
                            that.scxOptions = scx.data;
                            that.fileTypeOptions = type.data;
                            that.statusOptions = status.data;
                            axios.all([
                                axios.post(" " + url + "/sys/showTableTitle", {"name": "filelist"}),
                                axios.post(" " + url + "/fileShenpi/getFileUploadList", {"lineNo": that.scx, "status": that.status, "pici": that.batch})
                            ])
                                .then(axios.spread(function (title, table) {
                                    that.cols = title.data;
                                    that.tableData = table.data;
                                }));
                        }));
                }
            },

            //设置批次
            setPc(batch) {
                this.pc = this.batch;
                this.Data = {"lineNo": this.SCX, "type": this.type, "pici": this.pc}
            },

            //设置类型
            setType(fileType) {
                this.type = this.fileType;
                this.Data = {"lineNo": this.SCX, "type": this.type, "pici": this.pc}
            },

            //设置生产线
            setScx(scx) {
                this.SCX = this.scx;
                this.Data = {"lineNo": this.SCX, "type": this.type, "pici": this.pc}
            },


            //显示导入数据框
            showUpData() {
                this.uploadVisible = true;
            },

            //进行查询
            doSearch() {
                if (this.batch) {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "filelist"}),
                        axios.post(" " + url + "/fileShenpi/getFileUploadList", {"lineNo": this.scx, "status": this.status, "pici": this.batch})
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }));
                }
                else {
                    this.message = "请选择批次";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //上传
            submitUpload() {
                if (this.batch && this.fileType && this.scx) {
                    this.$refs.upload.submit();
                }
                else {
                    this.$message.warning(`批次,类型和生产线不能为空`);
                }
            },

            //文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                console.log(file);
            },

            //点击文件列表中已上传的文件
            handlePreview(file) {
                console.log(file);
            },

            //上传成功
            uploadSuccess(response, file, fileList) {
                this.$message.success(`上传成功`);
            },

            //上传失败
            uploadFailure(err, file, fileList) {
                this.$message.warning(`上传失败`);
            },

            //选择那个一个
            selectList(val) {
                if (val.length) {
                    this.listArr=val[0].id;
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

            //显示审核
            showExamine() {
                if (this.listData.length) {
                    if (this.listData.length > 1) {
                        this.message = "只能审核一个";
                        this.HideModal = false;
                        const that = this;

                        function a() {
                            that.message = "";
                            that.HideModal = true;
                        }

                        setTimeout(a, 2000);

                    }
                    else {
                        this.detailsVisible = true;
                        let that = this;
                        axios.all([
                            axios.post(" " + url + "/fileShenpi/showFileTitle", {"id": this.listArr}),
                            axios.post(" " + url + "/fileShenpi/showFileDetail", {"id": this.listArr})
                        ])
                            .then(axios.spread(function (title, table) {
                                that.detailsCols = title.data;
                                that.detailsTableData = table.data;
                            }));
                    }
                }
                else {
                    this.message = "请勾选要审核文件";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //通过
            doExamine() {
                axios.post(" " + url + "/fileShenpi/updateStatus",
                    {
                        "id": this.listArr,
                        "status":"2"
                    }
                )
                    .then((res) => {
                        if (res.data === "1") {
                            this.$message.success('通过审核成功');
                            this.delVisible = false;
                            const that = this;
                            setTimeout(function () {
                                that.$router.go(0)
                            }, 1500)
                        }
                        else if (res.data === "-1"){
                            this.$message.warning(`传参错误`);
                        }
                        else if (res.data === "-2"){
                            this.$message.warning(`已经通过审核，无需重复提交`);
                        }
                        else {
                            this.$message.warning(`审核失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            //不通过
            noExamine() {
                axios.post(" " + url + "/fileShenpi/updateStatus",
                    {
                        "id": this.listArr,
                        "status": "3"
                    }
                )
                    .then((res) => {
                        if (res.data === "1") {
                            this.$message.success('不通过成功');
                            this.delVisible = false;
                            const that = this;
                            setTimeout(function () {
                                that.$router.go(0)
                            }, 1500)
                        }

                        else if (res.data === "-1"){
                            this.$message.warning(`传参错误`);
                        }
                        else if (res.data === "-2"){
                            this.$message.warning(`已经不通过，无需重复提交`);
                        }
                        else {
                            this.$message.warning(`不通过失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";
    .InformationImport {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .importTitle {
            padding-left: 2%;
            height: 80px;
            border-bottom: 1px solid @color-background-d;
            .upData {
                height: 80px;
                line-height: 80px;
                margin-right: 2%;
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
                    margin-left: 5%;
                }
            }
            .search {
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                div {
                    display: flex;
                    margin-left: 10px;
                    button {
                        width: 80px;
                        height: 35px;
                        text-align: center;
                        line-height: 35px;
                        border: none;
                        border-radius: 10%;
                        background-color: @color-blue;
                        color: @color-white;
                        font-size: 16px;
                        margin-left: 5%;;
                    }
                }

            }
        }
        .productionContentTable{
            margin-top: 20px;
        }
        .select {
            margin-left: 2%;
        }
        .detailsBtn {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            button {
                width: 80px;
                height: 35px;
                text-align: center;
                line-height: 35px;
                border: none;
                border-radius: 10%;
                background-color: @color-blue;
                color: @color-white;
                font-size: 16px;
                margin-left: 5%;
                cursor: pointer;
            }
        }
    }


</style>
