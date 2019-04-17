<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>资源模型</el-breadcrumb-item>
                <el-breadcrumb-item>工位负荷监测</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
               <!-- <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索工位</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索工位" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>工位</span>
                        <span>:</span>
                        <el-select
                            v-model="workStation"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            @change="changeSelect"

                            placeholder="请选择工位">
                            <el-option
                                v-for="item in workStationOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                </div>-->
                <div class="handle-div">
                    <div v-for="(item,index) in dataFH"   :id="item.id" :style="{width: '25%', height: '300px'}" class="fl"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'

    export default {
        name: 'templateVue',
        data() {
            return {

                select_word: '',
                workStation:"",
                workStationOptions:[],

                dataFH:[
                    {"id":"a",fhl:"97",  xx:"0.1",  sx:'0.9','gw':"切断"},
                    {"id":"b",fhl:"40",  xx:"0.2",  sx:'0.8','gw':"短管焊"},
                    {"id":"c",fhl:"50",  xx:"0.3",  sx:'0.8','gw':"直管焊"},
                    {"id":"d",fhl:"70",  xx:"0.4",  sx:'0.8','gw':"小组立"}
                ],


              /*  fhl:"60",
                xx:"0.1",
                sx:'0.8',*/



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
        components: {},
        mounted() {
            this.drawLine();

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

                }
            },

            drawLine() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/gongweiJiance/gongweiJianceList")
                ])
                    .then(axios.spread(function (data) {
                        console.log(data)
                    }));
                // 基于准备好的dom，初始化echarts实例
                for (let i = 0; i < this.dataFH.length; i++) {
                    let id = this.dataFH[i].id;
                    id = this.$echarts.init(document.getElementById(id));
                    // 绘制图表
                    id.setOption({
                        tooltip: {
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                restore: { //重置
                                    show: true
                                },
                                saveAsImage: {//保存图片
                                    show: true
                                }
                            }
                        },
                        series: [
                            {
                                name: '工位负荷',
                                type: 'gauge',
                                detail: {formatter: '{value}%'},
                                data: [{value: this.dataFH[i].fhl, name: this.dataFH[i].gw}],
                                axisLine: { // 坐标轴线
                                    lineStyle: { // 属性lineStyle控制线条样式
                                        color: [
                                            [this.dataFH[i].xx, '#c23531'],
                                            [this.dataFH[i].sx, '#63869e'],
                                            [1, '#91c7ae']]
                                    }
                                },
                            }
                        ]
                    });
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
                padding-left: 50px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width:100px;
                    height: 30px;
                }
            }
            .handle-div{
                width: 100%;
                height: 500px;
                overflow: auto;
            }

        }
    }


</style>
