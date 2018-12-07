<template>
  <div class="securityManagement">
    <main ref="indexDiv" id="indexDiv">
      <div class="indexDiv-top ">
        <div class="indexDiv-top-left fl"></div>
        <div class="indexDiv-top-center fl">安全管理</div>
        <div class="indexDiv-top-right fl"></div>
      </div>
      <div class="indexDiv-bottom clearfix">
        <div class="nav-div fl"  v-for="(item,index) in navBarData" @click="goToNavBar(index,item.url)">
          <div class="indexDivText">
            <i :class=" item.icon"></i>
            <span>{{item.label}}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    name: 'securityManagement',
    data() {
      return {
        navBarData: [
          {
            icon:"iconfont icon-xinxi",
            label: '推送信息',
            id: "2",
            url:"/ProductionScheduling"
          },
          {
            icon:"iconfont icon-chaxun",
            label: '信息查询',
            id: "4",
            url:"/ProductionScheduling"
          }
        ]

      }
    },
    components: {},
    mounted() {


    },
    created() {


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


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";
  .securityManagement{
      width: 100%;
      height: 100%;
      background-color: @color-white;
  }

  .indexDiv-top {
    height: 50px;
    margin-bottom: 20px;
    .indexDiv-top-left {
      height: 1px;
      width: 5%;
      margin-top: 25px;
      background-color: #303133;
    }
    .indexDiv-top-center {
      width: 10%;
      margin-top: 15px;
      text-align: center;
    }
    .indexDiv-top-right {
      height: 1px;
      width: 85%;
      margin-top: 25px;
      background-color: #303133;
    }
  }
  .indexDiv-bottom{
      width: 70%;
      margin-top: 20px;
    .nav-div{
      width:15%;
      margin-left: 6%;
      height: 100px;
      margin-bottom: 5%;
      text-align: center;
      cursor: pointer;
        border:1px solid @color-background-dd;
        box-shadow: 2px 2px 1px @color-background-dd;
        border-radius: 10%;
      .indexDivText{
        margin-top: 20px;
        width: 100%;
        height: 60px;
        line-height: 30px;
      }
      i{
        display: block;
        font-size: 200%;
        margin-bottom: 5px;
      }
      span{
        display: block;
      }
      .icon-anquan-copy{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: #3EC455;

      }
      .icon-xinxi{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: #d93f30;

      }
      .icon-tubiaozhizuomoban{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: deeppink;

      }
      .icon-chaxun{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: brown;

      }


    }
  }




</style>

