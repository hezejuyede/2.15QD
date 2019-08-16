<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>计划排产</el-breadcrumb-item>
                <el-breadcrumb-item>一品图查看</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>批次</span>
                        <span>:</span>
                        <el-select
                            v-model="pc"
                            style="width: 200px;"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="批次">
                            <el-option
                                v-for="item in pcOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>一贯号</span>
                        <span>:</span>
                        <el-input v-model="yiguanhao" placeholder="输入一贯号" style="width:200px"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>Code号</span>
                        <span>:</span>
                        <el-input v-model="code" placeholder="输入Code号" style="width: 200px"></el-input>
                    </label>
                    <el-button type="primary" @click="doSearch">查询</el-button>
                </div>
                <div class="handle-bottom" style="overflow: auto">
                    <viewer :images="imgs">
                        <img v-for="src in imgs" :src="src.url" :key="src.title" style="width: 100%;height: 100%">
                    </viewer>
                </div>
            </div>

            <Modal :msg="message"
                   :isHideModal="HideModal"></Modal>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'
    import Modal from '../../common/modal'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,

                url: "",
                imgs: [],
                pici: "",
                yiguanhao: "",
                code: "",
                pc: "",
                pcOptions: [],
            }
        },
        computed: {
        },
        components: {Modal},
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
                        axios.post(" " + url + "/sys/getPiciList"),
                    ])
                        .then(axios.spread(function (pc) {
                            that.pcOptions = pc.data;
                        }));
                }
            },

            //查询
            doSearch() {
                if (this.pc && this.code && this.yiguanhao) {
                    axios.post(" " + url + "/yipintu/getYipintuImg.html", {
                        "pici": this.pc,
                        "yiguanhao": this.yiguanhao,
                        "code": this.code
                    })
                        .then((res) => {
                            if (res.data.imgurl) {
                                this.url = url + res.data.imgurl;
                                this.imgs = [{"url": this.url}];
                            }
                            else {
                                this.message = "没有查到一品图";
                                this.HideModal = false;
                                const that = this;

                                function a() {
                                    that.message = "";
                                    that.HideModal = true;
                                }

                                setTimeout(a, 2000);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.$message.warning("批次，一贯号，code号不能有空");
                }
            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .template {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .template-content {
            .handle-box {
                height: 80px;
                line-height:80px;
                padding-left: 50px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width:100px;
                    height: 30px;
                }
            }
            .handle-bottom{
                height: 450px;
                background-color: #D24D57;
            }

        }
    }


</style>
