<template>
  <div class="ProcessManagement">
    <main ref="indexDiv" id="indexDiv">
      <div class="indexDiv-top ">
        <div class="indexDiv-top-left fl"></div>
        <div class="indexDiv-top-center fl">可视化报表</div>
        <div class="indexDiv-top-right fl"></div>
      </div>
      <div class="indexDiv-bottom clearfix">
        <div class="indexDiv-bottom-select">
          <div class="select-left fl">
            工厂名称
          </div>
          <div class="select-right fl">
            <select v-model="value" placeholder="请选择">
              <option>完成</option>
              <option>未完成</option>
            </select>
          </div>
        </div>
        <div class="indexDiv-bottom-bottom">
          <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script type="text/ecmascript-6">


  export default {
    name: 'index',
    num: Number,
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {},
    mounted() {
      this.drawLine();
    },
    created() {


    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['直接访问','任务1', '任务2', '任务3']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日','8日', '9日', '10日', '11日','12日']
          },
          yAxis: {
            type: 'category',
            data: ['1车间', '2车间', '3车间', '4车间', '5车间', '6车间', '7车间','8车间', '9车间', '10车间', '11车间','12车间']
          },
          series: [
            {
              name: '任务1',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [320, 302, 301, 334, 390, 330, 320,321,326,356,123]
            },
            {
              name: '任务2',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [120, 132, 101, 134, 90, 230, 210,321,326,356,123,342]
            },
            {
              name: '任务3',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [220, 182, 191, 234, 290, 330, 310,321,326,356,123,456]
            }
          ]
        });
      },



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

  .indexDiv-bottom {
    position: relative;
    .indexDiv-bottom-select{
      padding-left: 2%;
      width: 100%;
      height: 50px;
      line-height: 50px;
      .select-left{
        margin-right: 20px;
      }
      .select-right{
        select{
          height: 30px;
          width: 200px;

        }
      }
    }
    .closeTab{
      position: absolute;
      right: 50px;
      top: 10px;
      cursor: pointer;
      .icon-guanbi{
        font-size: 200%;
        color: #3EC455;
      }

    }
    .indexDiv-bottom-bottom{

    }

  }


</style>
