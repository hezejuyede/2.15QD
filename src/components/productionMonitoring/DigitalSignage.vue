<template>
    <div id="banner">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in bannerImg" :key="item.id">
                <img :src="item.img"
                     style="width: 100%"
                     @click="showBanner(index,item.id,item.sindex)">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
    </div>
</template>

<script type="text/ecmascript-6">
    import {swiper, swiperSlide} from 'vue-awesome-swiper';

    require('swiper/dist/css/swiper.css');
    export default {
        name: "DigitalSignage",
        data() {
            return {
                bannerImg: [
                    {"img": require("../../assets/img/1.jpg")},
                    {"img": require("../../assets/img/2.jpg")},
                    {"img": require("../../assets/img/3.jpg")},
                    {"img": require("../../assets/img/4.jpg")},
                    {"img": require("../../assets/img/5.jpg")},
                    {"img": require("../../assets/img/6.jpg")},
                ],
                swiperOption: {
                    direction: "horizontal",
                    loop: true,
                    pagination: ".swiper-pagination",
                    prevButton: ".swiper-button-prev",
                    nextButton: ".swiper-button-next",
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false
                }
            }
        },
        components: {swiper, swiperSlide},
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
