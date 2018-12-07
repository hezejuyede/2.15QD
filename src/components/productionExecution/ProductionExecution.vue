<template>
    <div class="ProductionExecution">
        <div class="ProductionExecutionTemplate" ref="indexDiv">
            <div class="TemplateTop">
                <div class="TemplateTopLeft">
                    <div class="TemplateTopLeftAvatar">
                        <img src="../../assets/img/avatar.png" alt="">
                        <div class="TemplateTopLeftOut" @click="LeavePost">离岗</div>
                    </div>
                    <div class="TemplateTopLeftInfo">
                        <div class="">
                            姓名：{{userName}}
                        </div>
                        <div class="">
                            工号：{{GH}}
                        </div>
                        <div class="">
                            工位：{{GW}}
                        </div>
                    </div>

                </div>
                <div class="TemplateTopRight">
                    <div class="TemplateTopRightDiv">
                        <div class="tableTemplate" v-for="(item,index) in tableData">
                            <div class="tableTemplate-title">{{item.title}}</div>
                            <div class="tableTemplate-number">{{item.number}}</div>
                            <div class="tableTemplate-jd">{{item.jd}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="TemplateBottom">
                <div class="IconTemplate" v-for="(item , index) in iconData" @click="goToPage(index,item.url)">
                    <i :class=" item.icon"></i>
                    <span>{{item.text}}</span>
                </div>
            </div>
        </div>


    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'

    export default {
        name: 'ProductionExecution',
        data() {
            return {
                userName:"习近平",
                GH:9527,
                GW:"大阻焊",
                tableData:[
                    {"title":"已完成","number":"10","jd":"15.6%"},
                    {"title":"已完成","number":"10","jd":"15.6%"},
                    {"title":"已完成","number":"10","jd":"15.6%"},
                    {"title":"已完成","number":"10","jd":"15.6%"}
                    ],
                iconData: [
                    {"icon": "iconfont icon-caozuo", "text": "加工", "url": "/"},
                    {"icon": "iconfont icon-buzhou", "text": "加工步骤", "url": "/"},
                    {"icon": "iconfont icon-wuliao1", "text": "物料配送", "url": "/"},
                    {"icon": "iconfont icon-fankui1", "text": "信息反馈", "url": "/"},
                    {"icon": "iconfont icon-jishu", "text": "技术提醒", "url": "/"},
                    {"icon": "iconfont icon-tuzhi", "text": "工艺图纸", "url": "/"},
                    {"icon": "iconfont icon-package1173575easyiconnet", "text": "叫料", "url": "/"},
                    {"icon": "iconfont icon-tihuan", "text": "替岗", "url": "/"},
                    {"icon": "iconfont icon-tubiaozhizuomoban", "text": "离岗", "url": "/"},
                ]
            }
        },
        components: {},
        mounted() {
            this.setIndexHeight()


        },
        created() {
            this.getAdminState()

        },
        methods: {
            //页面加载Min标签设置固定高度
            setIndexHeight() {
                let h = document.body.scrollHeight;
                this.$refs.indexDiv.style.height = h + "px";
            },
            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                const userInfo = sessionStorage.getItem("userInfo");
                if (userInfo === null) {

                }
                else {


                }
            },
            //离开岗位
            LeavePost() {
                this.$confirm('是否确认离开岗位?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        axios.post("/api/LeavePost",{"username":"习近平"})
                            .then((res) => {
                            if (res.data === "1") {
                                this.$message({
                                    type: 'success',
                                    message: '离岗成功!'
                                });
                                setTimeout(() => {
                                    sessionStorage.removeItem("userInfo");
                                    this.$router.push("/ProductionExecutionLogin");
                                }, 3000);
                            }
                            else {
                                this.$message({
                                    type: 'warning',
                                    message: '离岗失败!'
                                });
                            }
                        })
                            .catch(()=>{
                                console.log(err)
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消离岗'
                        });
                    });

            },
            //前往那个一个页面
            goToPage(index, url) {
                this.$router.push(url)
            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .ProductionExecutionTemplate {
        width: 100%;
        .TemplateTop {
            width: 100%;
            height: 30%;
            background: url("../../assets/img/pd.jpg")center center;
            background-size: contain;
            display: flex;
            .TemplateTopLeft{
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-left: 2%;
                cursor: pointer;
                .TemplateTopLeftAvatar{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    img{
                        width: 80px;
                        border-radius: 50%;
                    }
                    .TemplateTopLeftOut{
                        position: absolute;
                        bottom: -30px;
                        left: auto;
                        color: @color-background-dddd;
                        font-size: @font-size-medium;
                        cursor: pointer;
                    }
                }
                .TemplateTopLeftInfo{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    div{
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        margin-bottom:20px;
                        color: @color-background-dd;
                        font-size: @font-size-small;
                    }
                }

            }
            .TemplateTopRight{
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                .TemplateTopRightDiv{
                    width: 95%;
                    height: 95%;
                    display: flex;
                    border-top: 1px solid @color-background-d;
                    border-left: 1px solid @color-background-d;
                    border-bottom: 1px solid @color-background-d;
                    .tableTemplate{
                        width: 25%;
                        height: 100%;
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        font-size: @font-size-small;
                        color: @color-background-dd;
                        .tableTemplate-number{
                            width: 100%;
                            height: 33%;
                            border-right: 1px solid @color-background-d;
                            border-bottom: 1px solid @color-background-d;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                        }

                        .tableTemplate-title{
                            width: 100%;
                            height: 33%;
                            background-color: @color-bg-lan;
                            color: @color-white;
                            border-right: 1px solid @color-background-d;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .tableTemplate-jd {
                            width: 100%;
                            height: 33%;
                            border-right: 1px solid @color-background-d;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }
            }
        }
        .TemplateBottom {
            padding-top: 5%;
            height: 70%;
            .IconTemplate{
                float: left;
                width: 30%;
                height: 27%;
                margin-bottom: 15px;
                margin-left: 3%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                cursor: pointer;
                .icon-caozuo{
                    display: block;
                    background-color: #F56C6C;
                    color: @color-white;
                    border-radius: 20%;
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    font-size: 300%;
                    text-align: center;
                }
                .icon-buzhou{
                    display: block;
                    background-color: @color-bg-lan;
                    color: @color-white;
                    border-radius: 20%;
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    font-size: 300%;
                    text-align: center;
                }
                .icon-wuliao1{
                    display: block;
                    background-color: @color-bg-red;
                    color: @color-white;
                    border-radius: 20%;
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    font-size: 300%;
                    text-align: center;
                }
                .icon-fankui1{
                    display: block;
                    background-color: #409EFF;
                    color: @color-white;
                    border-radius: 20%;
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    font-size: 300%;
                    text-align: center;
                }
                .icon-jishu{
                    display: block;
                    background-color: #67C23A;
                    color: @color-white;
                    border-radius: 20%;
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    font-size: 300%;
                    text-align: center;
                }
                .icon-tuzhi{
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    font-size: 300%;
                    text-align: center;
                    display: block;
                    background-color: @color-bg-cs;
                    color: @color-white;
                    border-radius: 20%;
                }
                .icon-package1173575easyiconnet{
                    display: block;
                    background-color: @color-green;
                    color: @color-white;
                    border-radius: 20%;
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    font-size: 300%;
                    text-align: center;
                }
                .icon-tihuan{
                    display: block;
                    background-color: @color-blue;
                    color: @color-white;
                    border-radius: 20%;
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    font-size: 300%;
                    text-align: center;
                }
                .icon-tubiaozhizuomoban{
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    font-size: 300%;
                    text-align: center;
                    display: block;
                    background-color: @color-bg-lv;
                    color: @color-white;
                    border-radius: 20%;
                }
                span{
                    margin-top: 5%;
                    color: #909399
                }

            }
        }

    }

    @media only screen and (max-width: 400px) {


    }
</style>
