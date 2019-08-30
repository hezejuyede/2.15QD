<template>
    <div class="template clearfix">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>资源模型</el-breadcrumb-item>
                <el-breadcrumb-item>工作日历</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索工作日历</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索工作日历" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>选择查询时间</span>
                        <span>:</span>
                        <el-date-picker
                            v-model="time"
                            type="month"
                            @change="changeMonth(time)"
                            value-format="yyyy-MM"
                            placeholder="选择月">
                        </el-date-picker>
                    </label>
                    <el-button type="success" icon="delete" class="handle-del mr10" @click="doSearch">查询
                    </el-button>
                </div>
                <div class="handle-Div">
                    <div class="calendarDiv">
                        <ele-calendar
                            :defaultValue="monthTime"
                            :render-content="renderContent"
                            @pick="pick"
                            border
                            currentmonth
                            :data="datedef"
                            :prop="prop">
                        </ele-calendar>
                    </div>

                </div>
            </div>

        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑日历" :visible.sync="editVisible" width="40%">
            <el-form ref="form" label-width="100px">
                <el-form-item label="工作日期">
                    <el-date-picker
                        :disabled="true"
                        v-model="dayTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="工作计划">
                    <el-select
                        v-model="working"
                        clearable
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择工作状态">
                        <el-option
                            v-for="item in workingOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
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
    import {getMonth} from '../../assets/js/api'
    import eleCalendar from 'ele-calendar'
    import 'ele-calendar/dist/vue-calendar.css'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,

                id: "",
                working: "",
                workingOptions: [{"name": "休息日", "id": 0}, {"name": "上班日", "id": 1}, {"name": "出图日", "id": 2}],
                tdayTimeime: "",
                time:"",
                dayTime: "",
                monthTime:"",

                cols: [],
                tableData: [],
                editVisible: false,
                datedef:[],
                prop:'date',

                select_word: '',


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
        components: {Modal,eleCalendar},
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
                    this.time = getMonth();
                    this.loadingShowData(this.time)
                }
            },

            //瞬间加载数据
            loadingShowData(data) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "gongzuorizhibiaotou"}),
                    axios.post(" " + url + "/sysconfig/getCalendarList", {"curdate": data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
            },


            //进行人员查询
            doSearch() {
                this.loadingShowData(this.time);
            },

            //双击点击行内编辑
            edit(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/sysconfig/getCalendarDetail", {"id": this.id})
                    .then((res) => {
                        this.working = res.data.data.working;
                        this.dayTime = res.data.data.curDate;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit() {
                if (this.working || this.working ===0) {
                    axios.post(" " + url + "/sysconfig/updateCalendar",
                        {
                            "id": this.id,
                            "working": this.working
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.editVisible = false;
                                this.$message.success(`修改成功`);
                                this.loadingShowData(this.time)
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

            //改变月份
            changeMonth(time){
                this.monthTime=time;
            },

            pick(){

            },
            renderContent(h,parmas) {
                console.log(this.tableData)
                const loop = data => {
                    console.log(data.defvalue)
                    if (data.defvalue.column == 6) {
                        return data.defvalue.value ? (
                            <div class="flex2 selected">
                            {data.defvalue.text}
                    <span>休息日</span>
                        </div>
                    ) : (
                        <div class="flex2">
                            {data.defvalue.text}
                    <span>休息日</span>
                        </div>
                    )
                    }
                    else if (data.defvalue.column == 0) {
                        return data.defvalue.value ? (
                            <div class="flex2 selected">
                            {data.defvalue.text}
                    <span>休息日</span>
                        </div>
                    ) : (
                        <div class="flex2">
                            {data.defvalue.text}
                    <span>休息日</span>
                        </div>
                    )
                    }
                    else {
                        return data.defvalue.value ? (
                            <div class="flex2 selected">
                            {data.defvalue.text}
                    <span class="flex2">工作日</span>
                        </div>
                    ) : (
                        <div class="flex2">
                            {data.defvalue.text}
                    <span >工作日</span>
                        </div>
                    )
                    }
                }
                return <div style="min-height:60px;">{loop(parmas)}</div>
            },

            //根据状态显示不同颜色
            tableRowClassName({row, rowIndex}) {
                if (row.working === 0) {
                    return 'F0-row';
                }
                else if (row.working === 1) {
                    return 'lan';
                }
                else if (row.working === 2) {
                    return 'lv';
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
            .handle-Div{
                width: 100%;
                height: 480px;
                overflow:auto;
                display: flex;
                align-items: center;
                justify-content: center;
                .calendarDiv{
                    width: 800px;
                    height: 450px;
                }
            }


        }
        .flex2{
            width: 100px;
            height: 100px;
            background-color: #EB7347;
        }
    }
</style>

