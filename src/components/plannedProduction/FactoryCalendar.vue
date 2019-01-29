<template>
    <div class="FactoryCalendar">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>资源模型</el-breadcrumb-item>
                <el-breadcrumb-item>工作日历</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="">
           <Calendar
               v-on:choseDay="clickDay"
               v-on:changeMonth="changeDate"
           >
           </Calendar>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Calendar from 'vue-calendar-component';
    export default {
        name: 'FactoryCalendar',
        data() {
            return {

            }
        },
        components: {Calendar},
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
            clickDay(data) {
                console.log(data); //选中某天
            },
            changeDate(data) {
                console.log(data); //左右点击切换月份
            },
            clickToday(data) {
                console.log(data); //跳到了本月
            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";
    .FactoryCalendar{
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
