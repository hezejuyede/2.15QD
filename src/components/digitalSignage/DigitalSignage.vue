<template>
    <div class="template ">
        <a href="http://157.116.13.36:8075/webroot/decision/view/form?viewlet=dapingdemo.frm"  target="_blank" class="">
            <img src="../../assets/img/DigitalSignage.png" style="width: 100%;height: 100%" alt="">
        </a>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'WorkingProcedure',
        data() {
            return {


            }
        },
        computed: {

        },
        components: {},
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

    }


</style>
