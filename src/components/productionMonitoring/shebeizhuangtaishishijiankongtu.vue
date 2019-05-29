<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>设备状态实时监控图</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>筛选设备</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选设备" style="width: 150px"></el-input>
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
                <div class="handle-bottom">
                    <div class="personnelTemplate fl" v-for="(item,index) in lineWorkPersonnel">
                        <div class="personnelTemplateAvatar">
                            <img src="../../assets/img/shebei.jpg" alt="" class="">
                        </div>
                        <div class="personnelTemplateBottom">
                            <div class=""><span>设备名称:</span> <span>{{item.name}}</span></div>
                            <div class=""><span>设备状态:</span> <span>{{item.sbState}}</span></div>
                            <div class=""><span>点检不良率:</span> <span>{{item.djblv}}</span></div>
                            <div class=""><span>FA设备运行状态:</span> <span>{{item.FASatate}}</span></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


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

                lineWorkPersonnel:[
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                    {"name":"切割机","sbState":"良好","djblv":"10%","FASatate":"良好"},
                ],
                line:"",
                lineOptions:[],

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
                    axios.post(" " + url + "/sysconfig/personList", {"shengchanxian": data1})
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
            .handle-bottom{
                height: 450px;
                overflow: auto;
                .personnelTemplate{
                    width: 12%;
                    height: 180px;
                    margin-left: 2%;
                    margin-bottom: 5%;
                    background-color: @color-bg-lv;
                    border-radius: 10px;
                    .personnelTemplateAvatar{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 5px;
                        margin-top: 5px;
                        img {
                            width: 130px;
                            height: 90px;
                            border-radius: 10px;
                        }
                    }
                    .personnelTemplateTop{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        color: @color-white;
                    }
                    .personnelTemplateBottom{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        color: @color-white;
                    }
                }
            }


        }
    }
</style>
