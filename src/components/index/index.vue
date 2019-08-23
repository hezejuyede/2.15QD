<template>
    <div class="template"></div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'
    import {swiper, swiperSlide} from 'vue-awesome-swiper';

    require('swiper/dist/css/swiper.css');

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                bannerImg: [
                    {"img": require("../../assets/img/banner01.jpg")},
                    {"img": require("../../assets/img/banner02.jpg")},
                    {"img": require("../../assets/img/banner03.jpg")}
                ],
                swiperOption: {
                    direction: "horizontal",
                    loop: true,
                    pagination: ".swiper-pagination",
                    prevButton: ".swiper-button-prev",
                    nextButton: ".swiper-button-next",
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                }
            }
        },
        computed: {},
        components: {swiper, swiperSlide,},
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
        background-image: url("../../assets/img/Winlogon-bg.png");
        background-size: cover;

    }


</style>
