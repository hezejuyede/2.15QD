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
                    <el-button type="success" @click="doSearch">查询</el-button>
                    <el-button type="primary" @click="importPrinting">导出打印</el-button>
                </div>
                <div class="handle-Div" ref="imageWrapper">
                    <div class="handleDivTitle">
                        {{time}},本月{{ctNumber}}批出图,{{xxNumber}}个休息日，{{sbNumber}}个上班日
                    </div>
                    <div class="calendarDiv">
                        <ele-calendar
                            :defaultValue="monthTime"
                            value-format="yyyy-MM"
                            :render-content="renderContent"
                            @pick="pick"
                            @date-change="dateChange"
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
    import html2canvas from 'html2canvas'

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
                dateArr:[],
                editVisible: false,
                datedef:[],
                prop:'date',

                select_word: '',
                ctNumber:"",
                xxNumber:"",
                sbNumber:""



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
                        let data = [];
                        for (let i = 0; i < that.tableData.length; i++) {
                            let curDate = that.tableData[i].curDate;
                            let date = curDate.substr(8, 1);
                            if (date === "0") {
                                let dateA = curDate.substr(9, 1);
                                let json = {
                                    date: parseInt(dateA),
                                    working: that.tableData[i].working,
                                };
                                data.push(json)
                            }
                            else {
                                let dateB = curDate.substr(8, 2);
                                let json = {
                                    date: parseInt(dateB),
                                    working: that.tableData[i].working,
                                };
                                data.push(json)
                            }
                        }
                        that.dateArr = data;
                        let ct = [];
                        let xx = [];
                        let gz = [];
                        for (let i = 0; i < that.tableData.length; i++) {
                            if (that.tableData[i].working === 0) {
                                xx.push(that.tableData[i])
                            }
                            else if (that.tableData[i].working === 2) {
                                ct.push(that.tableData[i])
                            }
                            else if (that.tableData[i].working === 1) {
                                gz.push(that.tableData[i])
                            }

                        }

                        that.ctNumber = ct.length ;
                        that.xxNumber = xx.length;
                        that.sbNumber = ct.length + gz.length ;
                    }));
            },


            //进行查询
            doSearch() {
                this.monthTime = this.time;
                this.loadingShowData(this.time);
            },

            //导出打印
            importPrinting(){
                html2canvas(this.$refs.imageWrapper, {
                    backgroundColor: null     // 解决生成的图片有白边
                }).then((canvas) => {
                    let dataURL = canvas.toDataURL("image/png");
                    let a = document.createElement('a');
                    a.setAttribute('download', '');
                    a.setAttribute('href', dataURL);
                    a.setAttribute("target", "_blank");
                    a.click();
                })
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
                this.loadingShowData(time);
            },
            //日期改变
            dateChange(data) {
                this.time=data;
                this.monthTime=data;
                this.loadingShowData(data);
            },

            //点击日期
            pick(data, event, row, dome) {
                if(row.type==="prev-month"){
                    this.time = data;
                    this.dayTime = data;
                    this.monthTime = data;
                    this.loadingShowData(data);
                }
                else if (row.type==="next-month"){
                    this.time = data;
                    this.dayTime = data;
                    this.monthTime = data;
                    this.loadingShowData(data);
                }
                else {
                    this.monthTime = this.time;
                    this.editVisible = true;
                    let time;
                    if (row.text <= 9) {
                        time = data + "-" + 0 + row.text;
                    }
                    else {
                        time = data + "-" + row.text;
                    }
                    this.dayTime = time;
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].curDate === this.dayTime) {
                            this.id = this.tableData[i].id;
                        }
                    }
                }


            },

            //自定义日历内容
            renderContent(h,parmas) {
                const loop = data => {
                    let json = {};
                    for (let i = 0; i < this.dateArr.length; i++) {
                        if (this.dateArr[i].date === data.defvalue.text) {
                            json = {
                                Lunar: data.defvalue.Lunar,
                                column: data.defvalue.column,
                                disabled: data.defvalue.disabled,
                                row: data.defvalue.row,
                                text: data.defvalue.text,
                                type: data.defvalue.type,
                                value: data.defvalue.value,
                                working: this.dateArr[i].working
                            };
                        }
                    }
                    data.defvalue = json;
                    console.log(data.defvalue)
                    if (data.defvalue.working === 1 && data.defvalue.type === "normal"  || data.defvalue.type=== "today") {
                        return data.defvalue.value ? (
                            < div style="height:60px; line-height: 60px; text-align: center;">
                            < span style = "font-size: 30px;" > {data.defvalue.text
                    }<
                        /span>
                        < /div>
                    ) :
                        (
                        < div style="height:60px; line-height: 60px; text-align: center;">
                        < span
                        style = "font-size: 30px;" > {data.defvalue.text
                    }<
                        /span>
                        < /div>
                    )
                    }
                    else if (data.defvalue.working === 2 && data.defvalue.type === "normal" || data.defvalue.type=== "today") {
                        return data.defvalue.value ? (
                            < div style = "height:60px; line-height: 60px; text-align: center;background:  #00CCFF;color:#ffffff" >
                            < span style = "font-size: 30px;" > {data.defvalue.text
                    }<
                        /span>
                        < /div>
                    ) :
                        (
                        < div style = "height:60px; line-height: 60px; text-align: center;background:  #00CCFF;color:#ffffff" >
                        < span
                        style = "font-size: 30px;" > {data.defvalue.text
                    }<
                        /span>
                        < /div>
                    )
                    }
                    else if (data.defvalue.working === 2 && data.defvalue.type=== "today") {
                        return data.defvalue.value ? (
                            < div style = "height:60px; line-height: 60px; text-align: center;background:  #00CCFF;color:#ffffff" >
                            < span style = "font-size: 30px;" > {data.defvalue.text
                    }<
                        /span>
                        < /div>
                    ) :
                        (
                        < div style = "height:60px; line-height: 60px; text-align: center;background:  #00CCFF;color:#ffffff" >
                            < span
                        style = "font-size: 30px;" > {data.defvalue.text
                    }<
                        /span>
                        < /div>
                    )
                    }
                    else if (data.defvalue.working === 0 && data.defvalue.type === "normal" || data.defvalue.type=== "today") {
                        return data.defvalue.value ? (
                            < div style = "height:60px; line-height: 60px; text-align: center;background: #26A65B;color:#ffffff" >
                            < span
                        style = "font-size: 30px;" > {data.defvalue.text
                    }<
                        /span>
                        < /div>
                    ) :
                        (
                        < div
                        style = "height:60px; line-height: 60px; text-align: center;background: #26A65B;color:#ffffff" >
                            < span
                        style = "font-size: 30px;" > {data.defvalue.text
                    }<
                        /span>
                        < /div>
                    )
                    }
                };
                return <div style="min-height:60px;">{loop(parmas)}</div>
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
                    width: 130px;
                    height: 35px;
                }
            }
            .handle-Div{
                width: 100%;
                height:520px;
                overflow:auto;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                .handleDivTitle{
                    width: 800px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: @font-size-large-x;
                }
                .calendarDiv{
                    width: 800px;
                    height: 450px;

                }
            }


        }
    }
</style>

