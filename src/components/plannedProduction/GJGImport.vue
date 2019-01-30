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
                <el-select v-model="batch" placeholder="请选择批次">
                    <el-option
                        v-for="item in batchOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <button @click="doSearch">查询</button>
                <button @click="doDelete">删除</button>
            </div>
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
                    <el-input v-model="pc" placeholder="请输入批次" @input="setPc(pc)"
                              style="width: 300px;margin-right: 10px"></el-input>
                    <el-select v-model="shipType" placeholder="请选择船型" style="margin-right: 10px">
                        <el-option
                            v-for="item in shipOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="content-title">上传支持拖拽</div>
                </div>
                <div class="containerUp" style="display: flex;align-items: center;justify-content: center">
                    <el-upload
                        class="upload"
                        ref="upload"
                        :multiple='true'
                        :drag='true'
                        :data="pici"
                        action="http://47.98.220.131:8082/fileupload/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess"
                        :on-error="uploadFailure"
                        :file-list="list"
                        :auto-upload="false">
                        <el-button style="margin:80px 0 0 0;width: 150px;height: 30px;" slot="trigger" size="small"
                                   type="primary">选取文件
                        </el-button>
                        <el-button style="margin:0 0 0 10px;width: 150px;height: 30px;" size="small"
                                   type="success"
                                   @click="submitUpload">上传到系统
                        </el-button>
                        <el-button style="margin:0 0 0 10px;width: 150px;height: 30px;" size="small"
                                   type="success"
                                   @click="synchronizationDataBase">同步到数据库
                        </el-button>
                    </el-upload>
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
                message: '',
                HideModal: true,

                list: [],
                pc: "",
                pici: {},


                uploadVisible: false,
                batch: "",
                batchOptions: [
                    {
                        value: '1',
                        label: '条目一'
                    },
                    {
                        value: '2',
                        label: '条目二'
                    },
                    {
                        value: '3',
                        label: '条目三'
                    },
                    {
                        value: '4',
                        label: '条目四'
                    },
                    {
                        value: '5',
                        label: '条目五'
                    }
                ],

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
                const userInfo = sessionStorage.getItem("userInfo");
                if (userInfo === null) {

                }
                else {


                }
            },
            setPc(pc) {
                this.pici = {"pici": this.pc};
                console.log(this.pici)
            },
            //显示导入数据框
            showUpData() {
                this.uploadVisible = true;

            },

            //进行查询
            doSearch() {
                if (this.batch) {
                    axios.post('api/paichanTitle', {"GJGType": this.GJGType})
                        .then((res) => {

                        })
                        .catch((err) => {
                            console.log(err)
                        })
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
                if (this.pc) {
                    this.$refs.upload.submit();
                }
                else {
                    this.$message.warning(`批次不能为空`);
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

            },

            //上传失败
            uploadFailure(err, file, fileList) {
                console.log(err);
            },

            //同步到数据库
            synchronizationDataBase(){
                console.log(this.pc)
                if (this.pc) {
                    axios.post(" " + url + "/importother/importAllData", {"pici": this.pc})
                        .then((res) => {
                            if (res.data === "1") {
                                this.$message.success(`已同步到数据库`);
                            }
                            else {
                                this.$message.warning(`已同步到数据库`);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    alert("请输入批次");
                }

            },


            doDelete(){


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


</style>
