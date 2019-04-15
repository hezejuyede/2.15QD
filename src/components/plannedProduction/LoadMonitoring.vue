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
                <div class="handle-box">
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
                </div>
                <div class="">
                    <div id="dataBar" :style="{width: '90%', height: '300px'}"></div>
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

                ElectricityData:[
                    {
                        power: "3012",
                        time: "10/1",
                        load:"74.63"
                    },
                    {
                        power: "3013",
                        time: "10/2",
                        load:"75.63"
                    },
                    {
                        power: "3014",
                        time: "10/3",
                        load:"74.83"
                    },
                    {
                        power: "3012",
                        time: "10/4",
                        load:"74.63"
                    },
                    {
                        power: "3013",
                        time: "10/5",
                        load:"75.63"
                    },
                    {
                        power: "3014",
                        time: "10/6",
                        load:"74.83"
                    },
                    {
                        power: "3012",
                        time: "10/7",
                        load:"74.63"
                    },
                    {
                        power: "3013",
                        time: "10/8",
                        load:"75.63"
                    },
                    {
                        power: "3014",
                        time: "10/9",
                        load:"74.83"
                    },
                    {
                        power: "3012",
                        time: "10/10",
                        load:"74.63"
                    },
                    {
                        power: "3013",
                        time: "10/11",
                        load:"75.63"
                    },
                    {
                        power: "3014",
                        time: "10/12",
                        load:"74.83"
                    },
                    {
                        power: "3012",
                        time: "10/13",
                        load:"74.63"
                    },
                    {
                        power: "3013",
                        time: "10/14",
                        load:"75.63"
                    },
                    {
                        power: "3014",
                        time: "10/15",
                        load:"74.83"
                    },
                    {
                        power: "3012",
                        time: "10/16",
                        load:"74.63"
                    },
                    {
                        power: "3013",
                        time: "10/17",
                        load:"75.63"
                    },
                    {
                        power: "3014",
                        time: "10/18",
                        load:"74.83"
                    },
                    {
                        power: "3012",
                        time: "10/19",
                        load:"74.63"
                    },
                    {
                        power: "3013",
                        time: "10/20",
                        load:"75.63"
                    },
                    {
                        power: "3014",
                        time: "10/21",
                        load:"74.83"
                    },
                    {
                        power: "3012",
                        time: "10/22",
                        load:"74.63"
                    },
                    {
                        power: "3013",
                        time: "10/23",
                        load:"75.63"
                    },
                    {
                        power: "3014",
                        time: "10/24",
                        load:"74.83"
                    },
                    {
                        power: "3012",
                        time: "10/25",
                        load:"74.63"
                    },
                    {
                        power: "3013",
                        time: "10/26",
                        load:"75.63"
                    },
                    {
                        power: "3014",
                        time: "10/27",
                        load:"74.83"
                    },
                    {
                        power: "3012",
                        time: "10/28",
                        load:"74.63"
                    },
                    {
                        power: "3013",
                        time: "10/29",
                        load:"75.63"
                    },
                    {
                        power: "3014",
                        time: "10/30",
                        load:"74.83"
                    },
                    {
                        power: "3012",
                        time: "10/31",
                        load:"74.63"
                    }
                ],
                fhl:"60",
                xx:"0.1",
                sx:'0.8'

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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "23"}),
                    ])
                        .then(axios.spread(function (select, type) {
                            that.workStation = select.data[0].id;
                            that.workStationOptions = select.data;
                            that.typeOptions = type.data;
                            that.loadingShowData(1);
                        }));
                }
            },

            //瞬间加载数据
            loadingShowData(data) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "jgxqan"}),
                    axios.post(" " + url + "/padShow/buttonList", {"id": data})
                ])
                    .then(axios.spread(function (title, table) {

                    }));
            },

            //根据工位选择
            changeSelect() {
                this.loadingShowData(this.workStation)
            },

            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('dataBar'));
                // 绘制图表
                myChart.setOption({
                    tooltip : {
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
                            detail: {formatter:'{value}%'},
                            data: [{value: this.fhl, name: '负荷率'}],
                            axisLine: { // 坐标轴线
                                lineStyle: { // 属性lineStyle控制线条样式
                                    color: [
                                        [this.xx, '#c23531'],
                                        [this.sx, '#63869e'],
                                        [1, '#91c7ae']]
                                }
                            },
                        }
                    ]
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
