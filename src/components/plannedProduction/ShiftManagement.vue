<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>资源模型</el-breadcrumb-item>
                <el-breadcrumb-item>班次管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>检索班次</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选班次" class="handle-input mr10"></el-input>
                    </label>
                    <el-button type="primary" class="handle-del mr10" @click="addContent">新增班次</el-button>
                    <el-button type="success" class="handle-del mr10" @click="glDept">关联部门</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              :height="this.tableHeight"
                              @select="selectList"
                              @select-all="selectAll"
                              @row-dblclick="editContent"
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
            <!--新增弹出框 -->
            <el-dialog title="新增班次" :visible.sync="addVisible" width="60%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="班次名">
                        <el-input v-model="banciName"></el-input>
                    </el-form-item>
                    <el-form-item
                        v-for="(domain, index) in dynamicValidateForm.domains"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'"
                        :label="'时间' + (index+1)+''">
                        <div class="appendDiv">
                            <div class="appendDivTemplate">
                                <div class="fl">
                                    <span>开始时间:</span>
                                    <el-time-picker
                                        v-model="domain.stime"
                                        value-format="HH:mm:ss"
                                        placeholder="任意时间">
                                    </el-time-picker>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <span>结束时间:</span>
                                    <el-time-picker
                                        v-model="domain.etime"
                                        value-format="HH:mm:ss"
                                        placeholder="任意时间">
                                    </el-time-picker>
                                </div>
                                <div class="fl" style="margin-left: 10px">
                                    <el-button
                                        type="danger"
                                        style="height:30px;width:120px"
                                        @click.prevent="removeDomain(domain)">删除
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="addDomain"
                            style="height:30px;width:20%">
                            新增时间
                        </el-button>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAddContent" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑班次" :visible.sync="editVisible" width="60%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="班次名">
                        <el-input v-model="banciName"></el-input>
                    </el-form-item>
                    <el-form-item
                        v-for="(domain, index) in dynamicValidateForm.domains"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'"
                        :label="'时间' + (index+1)+''">
                        <div class="appendDiv">
                            <div class="appendDivTemplate">
                                <div class="fl">
                                    <span>开始时间:</span>
                                    <el-time-picker
                                        v-model="domain.stime"
                                        value-format="HH:mm:ss"
                                        placeholder="开始时间">
                                    </el-time-picker>
                                </div>
                                <div class="fl" style="margin-left: 20px">
                                    <span>结束时间:</span>
                                    <el-time-picker
                                        v-model="domain.etime"
                                        value-format="HH:mm:ss"
                                        placeholder="结束时间">
                                    </el-time-picker>
                                </div>
                                <div class="fl" style="margin-left: 20px">
                                    <el-button
                                        type="danger"
                                        style="height:30px;width:120px"
                                        @click.prevent="removeDomain(domain)">删除
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="addDomain"
                            style="height:30px;width:20%">
                            新增时间
                        </el-button>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!--关联部门 -->
            <el-dialog title="关联部门" :visible.sync="glVisible" width="30%">
                <el-form ref="form" label-width="100px">
                    <span>部门</span>
                    <span>:</span>
                    <el-select
                        v-model="dept"
                        style="width: 150px"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        multiple
                        placeholder="请选择部门">
                        <el-option
                            v-for="item in deptOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="glVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doGlDept" style="height:30px;width:80px">确 定</el-button>
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
    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData: [],
                cols: [],
                tableData: [],
                select_word: '',
                addVisible: false,
                editVisible: false,
                glVisible: false,
                dept: '',
                deptOptions: [],
                banciName: "",
                dynamicValidateForm: {
                    domains: [{
                        stime: '',
                        etime: "",
                    }],
                },
                tableHeight:Number,
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
                    this.loading();
                    this.setTableHeight();
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

            //页面初始加载
            loading() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "banci"}),
                    axios.post(" " + url + "/sysconfig/getBanciList"),
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },
            //显示新增班次
            addContent() {
                this.addVisible = true;
                this.banciName = "";
                this.dynamicValidateForm = {
                    domains: [{
                        stime: "",
                        etime: "",
                    }],
                }
            },
            //新增班次
            doAddContent() {
                if (this.banciName && this.dynamicValidateForm.domains[0]) {
                    axios.post(" " + url + "/sysconfig/banciAdd",
                        {
                            "bancileixing": this.banciName,
                            "list": this.dynamicValidateForm.domains,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                this.loading()
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
            //双击点击行内编辑
            editContent(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/sysconfig/banciDetail", {"id": this.id})
                    .then((res) => {
                        this.banciName = res.data.data.banci.bancileixing;
                        this.dynamicValidateForm.domains = res.data.data.list;
                        console.log(this.dynamicValidateForm.domains)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            // 进行保存编辑
            saveEdit() {
                if (this.banciName && this.dynamicValidateForm.domains[0]) {
                    axios.post(" " + url + "/sysconfig/banciUpdate",
                        {
                            "id": this.id,
                            "bancileixing": this.banciName,
                            "list": this.dynamicValidateForm.domains,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(`修改成功`);
                                this.editVisible = false;
                                this.loading()
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
            //选择那个一个
            selectList(val) {
                if (val.length) {
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
            //列表全部选择
            selectAll(val) {
                if (val.length) {
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
            //显示关联部门
            glDept() {
                if (this.listData.length) {
                    if (this.listData.length > 1) {
                        this.message = "只能选择一个";
                        this.HideModal = false;
                        const that = this;
                        function a() {
                            that.message = "";
                            that.HideModal = true;
                        }
                        setTimeout(a, 2000);
                    }
                    else {
                        this.glVisible = true;
                        let that = this;
                        axios.all([
                            axios.post(" " + url + "/sysconfig/deptList"),
                        ])
                            .then(axios.spread(function (dept) {
                                that.deptOptions = dept.data;
                            }));
                    }
                }
                else {
                    this.message = "请勾关联的班次";
                    this.HideModal = false;
                    const that = this;
                    function b() {
                        that.message = "";
                        that.HideModal = true;
                    }
                    setTimeout(b, 2000);
                }
            },
            //进行部门关联
            doGlDept() {
                axios.post(" " + url + "/sysconfig/banciToDept",
                    {
                        "id": this.listData[0],
                        "ids": this.dept
                    }
                )
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.$message.success('关联成功');
                            this.glVisible = false;
                            this.loading()
                        }
                        else {
                            this.$message.warning(res.data.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            //增加时间
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    stime: '',
                    etime: "",
                });
            },
            //删除时间
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item);
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
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
                line-height: 80px;
                padding-left: 50px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width: 130px;
                    height: 35px;
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
