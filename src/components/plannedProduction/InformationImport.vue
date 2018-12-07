<template>
    <div class="InformationImport">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>计划排产</el-breadcrumb-item>
                <el-breadcrumb-item>信息导入</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="content-title">支持拖拽</div>
            <div class="content-div">
                <el-upload
                    class="upload"
                    ref="upload"
                    :multiple='true'
                    :drag ='true'
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button style="margin:80px 0 0 0;width: 150px;height: 30px;"slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin:10px;width: 150px;height: 30px;" size="small" type="success"
                               @click="submitUpload">上传到系统
                    </el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>

        </div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        name: 'InformationImport',
        data() {
            return {
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
            }
        },
        components: {},
        mounted() {


        },
        created() {
            this.getAdminState()

        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                const userInfo = sessionStorage.getItem("userInfo");
                if (userInfo === null) {

                }
                else {


                }
            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";
    .InformationImport{
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs{
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .container{
            padding-left: 10%;
            .content-title{
                height: 50px;
                line-height: 50px;
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


</style>
