<template>
    <div class="template">
        <div id="banner">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(item,index) in bannerImg" :key="item.id">
                    <img :src="item.img"
                         style="width: 100%">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-scrollbar" slot="scrollbar"></div>
            </swiper>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'
    import Modal from '../../common/modal'
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
        computed: {
            //模糊检索
            tables: function () {
                var search = this.select_word;
                if (search) {
                    return this.tableData.filter(function (dataNews) {
                        return Object.keys(dataNews).some(function (key) {
                            return String(dataNews[key]).indexOf(search) > -1
                        })
                    })
                }
                return this.tableData
            }
        },
        components: {Modal,swiper, swiperSlide,},
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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "23"}),
                    ])
                        .then(axios.spread(function (select, type) {
                            that.workStation = select.data[0].id;
                            that.workStationOptions = select.data;
                            that.typeOptions = type.data;
                            that.loadingShowData(1);
                        }));
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
