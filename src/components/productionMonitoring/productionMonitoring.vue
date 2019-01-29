<template>
  <div class="productionMonitoring">
    <main ref="indexDiv" id="indexDiv">
      <div class="indexDiv-top ">
        <div class="indexDiv-top-left fl"></div>
        <div class="indexDiv-top-center fl">设备管理</div>
        <div class="indexDiv-top-right fl"></div>
      </div>
      <div class="indexDiv-bottom clearfix">
        <div class="nav-div fl"  v-for="(item,index) in navBarData"
             @click="goToNavBar(index,item.url)">
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
    name: 'productionMonitoring',
    data() {
      return {
        navBarData: [
          {
            icon:"iconfont icon-shuju",
            label: '数据采集',
            id: "1",
            url:"/404"
          },
          {
            icon:"iconfont icon-jiaojishiji",
            label: '计划实绩追踪',
            id: "2",
            url:"/404"
          },
          {
            icon:"iconfont icon-youhuiquanguanli-",
            label: '工位动态',
            id: "3",
            url:"/404"
          },
          {
            icon:"iconfont icon-renyuan",
            label: '人员分布',
            id: "4",
            url:"/404"
          },
          {
            icon:"iconfont icon-dongtai",
            label: '物料动态',
            id: "5",
            url:"/404"
          },
          {
            icon:"iconfont icon-icon-life-alarm",
            label: '异常报警',
            id: "6",
            url:"/404"
          },
          {
            icon:"iconfont icon-daiji",
            label: '待料时间',
            id: "7",
            url:"/404"
          },
          {
            icon:"iconfont icon-shujutubiao11",
            label: '设备运行',
            id: "8",
            url:"/404"
          },
          {
            icon:"iconfont icon-baobiao",
            label: '可视化报表',
            id: "9",
            url:"/VisualReportForms"
          },
          {
            icon:"iconfont icon-jiankong",
            label: '监控信息',
            id: "10",
            url:"/404"
          },
          {
            icon:"iconfont icon-dianzikanban",
            label: '电子看板',
            id: "11",
            url:"/DigitalSignage"
          },
          {
            icon:"iconfont icon-chaxun",
            label: '查询',
            id: "12",
            url:"/404"
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
      //点击前往那个子组件
      goToNavBar(index, url) {
        this.$router.push(url);
      }

    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";
  .productionMonitoring{
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
      .nav-div {
          width: 15%;
          margin-left: 6%;
          height: 100px;
          margin-bottom: 5%;
          text-align: center;
          cursor: pointer;
          border: 1px solid @color-background-dd;
          box-shadow: 2px 2px 1px @color-background-dd;
          border-radius: 10%;
          .indexDivText {
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
      .icon-shuju{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: #ffcd32;

      }
      .icon-jiaojishiji{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: #3EC455;

      }
      .icon-youhuiquanguanli-{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: #d93f30;

      }
      .icon-renyuan{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: cadetblue;

      }
      .icon-dongtai{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: chartreuse;

      }
      .icon-icon-life-alarm{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: deeppink;

      }
      .icon-daiji{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: brown;

      }
      .icon-shujutubiao11{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: blueviolet;
      }
      .icon-jiankong{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: chocolate;

      }
      .icon-dianzikanban{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: darkmagenta;

      }
      .icon-chaxun{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: hotpink;

      }
      .icon-baobiao{
          display: block;
          font-size: 400%;
          margin-bottom: 20px;
        color: orangered;
      }

    }
  }




</style>

