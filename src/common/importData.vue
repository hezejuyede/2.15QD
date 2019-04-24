<template>
    <div v-bind:class="{hideModal:showImportData}">
        <div class="container">
            <div class="containerSelect">
                <div class="">
                    <el-select v-model="batch" placeholder="请选择批次">
                        <el-option
                            v-for="item in batchOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="">
                    <el-select v-model="shipType" placeholder="请选择船型">
                        <el-option
                            v-for="item in shipOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="content-title">上传支持拖拽</div>
            </div>
            <div class="containerUp">
                <div class="content-div">
                    <el-upload
                        class="upload"
                        ref="upload"
                        :multiple='true'
                        :drag='true'
                        action="http://192.168.0.103:8082/fileupload/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess"
                        :on-error="uploadFailure"
                        :file-list="list"
                        :auto-upload="false">
                        <el-button style="margin:80px 0 0 0;width: 150px;height: 30px;" slot="trigger" size="small"
                                   type="primary">选取文件
                        </el-button>
                        <el-button style="margin:-80px 80px 10px 405px;width: 150px;height: 30px;" size="small"
                                   type="success"
                                   @click="submitUpload">上传到系统
                        </el-button>

                        <el-button style="margin:0 80px 10px 405px;width: 150px;height: 30px;" size="small"
                                   type="warning"
                                   @click="closeModal">关闭上传窗口
                        </el-button>
                    </el-upload>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'

    export default {
        name: 'message',
        data() {
            return {
               list: [],

                shipType: "",
                shipOptions: [
                    {
                        value: '1',
                        label: '条目一'
                    },
                    {
                        value: '2',
                        label: '条目二'
                    }
                    ,
                    {
                        value: '3',
                        label: '条目三'
                    }
                    ,
                    {
                        value: '4',
                        label: '条目四'
                    }
                    ,
                    {
                        value: '5',
                        label: '条目五'
                    }

                ],

                batch: "",
                batchOptions: [
                    {
                        value: '1',
                        label: '条目一'
                    },
                    {
                        value: '2',
                        label: '条目二'
                    }
                    ,
                    {
                        value: '3',
                        label: '条目三'
                    }
                    ,
                    {
                        value: '4',
                        label: '条目四'
                    }
                    ,
                    {
                        value: '5',
                        label: '条目五'
                    }

                ],

            }
        },

        methods: {
            //上传
            submitUpload() {
                alert("hahahah")
                this.$refs.upload.submit();
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

            //关闭弹出窗口
            closeModal() {
                let flag = true;
                this.$emit('importDataClose', flag);
            }
        },
        props: ['showImportData']
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/less/base";

    .container{
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        background-color: @color-background-dddd;
        .containerSelect {
            width: 600px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
           >div {
                margin-right: 20px
            }
        }
        .containerUp {
            .content-title{
                text-align: center;
                height:30px;
                line-height: 30px;
            }
            .content-div{
                .upload{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
            }
        }
    }

    .hideModal {
        display: none;
    }
</style>
