<template>
    <div v-bind:class="{hideModal:showImportData}">
        <div class="container">
            <el-button style="width: 150px;height: 30px;" size="small"
                       type="warning"
                       @click="closeModal">关闭窗口
            </el-button>
            <div class="containerDIV">
                <el-table
                    :data="tableData"
                    :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'18px'}"
                    border
                    style="width: 95%;margin: 0 auto">
                    <el-table-column
                        prop="step"
                        label="步骤"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="stationname"
                        label="工位"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="realbtime"
                        label="开始时间"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="realetime"
                        label="完成时间"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="jiagongrenyuan"
                        label="加工人员"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../assets/js/URL'

    export default {
        name: 'message',
        data() {
            return {
                fileList: [],
                tableData:[]


            }
        },
        watch: {
            showImportData: {
                handler(newValue, oldValue) {
                    if (newValue === false) {
                        axios.post(" " + url + "/shengchan/getShengchanguanDetail", {"id": this.listId})
                            .then((res) => {
                                this.tableData = res.data;
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                },
                deep: true,
                immediate:true
            }
        },
        methods: {


            //关闭弹出窗口
            closeModal() {
                let flag = true;
                this.$emit('importDataClose', flag);
            },
        },
        props: ['showImportData','listId']
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/less/base";

    .container{
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        background-color: @color-background-dd;
        z-index: 999;
        padding: 20px;
        .containerDIV{
            width: 900px;
        }


    }

    .hideModal {
        display: none;
    }
</style>
