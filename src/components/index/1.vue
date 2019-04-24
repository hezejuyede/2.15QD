<template>
    <div class="InformationImport">

    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        name: 'InformationImport',
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



</style>
