<template>
    <div class="ProcessRoute">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>计划排产</el-breadcrumb-item>
                <el-breadcrumb-item>工艺路线</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        name: 'FactoryCalendar',
        data() {
            return {

            }
        },
        components: {},
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
            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";
    .ProcessRoute{
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs{
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
    }



</style>
