<template>
  <div class="ProcessManagement">
    <header-view></header-view>
    <main ref="indexDiv" id="indexDiv">
      <div class="indexDiv-top ">
        <div class="indexDiv-top-left fl"></div>
        <div class="indexDiv-top-center fl">入库</div>
        <div class="indexDiv-top-right fl"></div>
      </div>
      <div class="indexDiv-bottom clearfix">
        <div class="closeTab" @click="closeTab">
          <i class="iconfont icon-guanbi"></i>
        </div>
        <div class="indexDiv-bottom-top">
          <div class="indexDiv-bottom-top-input">
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>申请单号</span>
              </div>
              <div class="input-div-input fl">
                <input v-model="input" placeholder="请输入内容"/>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>物料编码</span>
              </div>
              <div class="input-div-input fl">
                <input v-model="input" placeholder="请输入内容"/>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>名称</span>
              </div>
              <div class="input-div-input fl">
                <input v-model="input" placeholder="请输入内容"/>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>规格</span>
              </div>
              <div class="input-div-input fl">
                <input v-model="input" placeholder="请输入内容"/>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>材质</span>
              </div>
              <div class="input-div-input fl">
                <input v-model="input" placeholder="请输入内容"/>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>制令号</span>
              </div>
              <div class="input-div-input fl">
                <input v-model="input" placeholder="请输入内容"/>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>入库单号</span>
              </div>
              <div class="input-div-input fl">
                <input v-model="input" placeholder="请输入内容"/>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>囹号</span>
              </div>
              <div class="input-div-input fl">
                <input v-model="input" placeholder="请输入内容"/>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>申请日期</span>
              </div>
              <div class="input-div-input fl">
                <input v-model="input" placeholder="请输入内容"/>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>驳回理由</span>
              </div>
              <div class="input-div-input fl">
                <input v-model="input" placeholder="请输入内容"/>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>合同号</span>
              </div>
              <div class="input-div-input fl">
                <input v-model="input" placeholder="请输入内容"/>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>状态</span>
              </div>
              <div class="input-div-input fl">
                <select v-model="value" placeholder="请选择">
                  <option>完成</option>
                  <option>未完成</option>
                </select>
              </div>
            </div>
            <div class="input-div fl">
              <div class="input-div-text fl">
                <span>请入仓库</span>
              </div>
              <div class="input-div-input fl">
                <select v-model="value" placeholder="请选择">
                  <option>已经入库</option>
                  <option>未入库</option>
                </select>
              </div>
            </div>


          </div>
          <div class="indexDiv-bottom-top-button">
            <el-button type="success">通过</el-button>
            <el-button type="success">撤销</el-button>
            <el-button type="success">驳回</el-button>
            <el-button type="success">查询</el-button>
          </div>
        </div>
        <div class="indexDiv-bottom-bottom">
          <el-table
            ref="singleTable"
            :data="tableData"
            border
            highlight-current-row
            style="width: 100%">
            <el-table-column
              type="index"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              property="number"
              label="单号"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="name"
              label="物料编码"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="address"
              label="名称"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="address"
              label="规格"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="address"
              label="材质"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="address"
              label="指令号"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="address"
              label="入库单号"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="address"
              label="图号"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="address"
              label="状态"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="address"
              label="申请日期"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="address"
              label="请入仓库"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="address"
              label="驳回理由"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              property="address"
              label="合同号"
              align="center"
              width="110">
            </el-table-column>
          </el-table>

        </div>
      </div>
    </main>
  </div>
</template>
<script type="text/ecmascript-6">
  import HeaderView from '../../common/header/header';
  import NavBar from '../../common/navbar/navbar';

  export default {
    name: 'ProcessManagement',
    data() {
      return {
        input: '',
        value: "hahahahah",
        navTab: [],
        tableData: [
          {},
          {},
          {},
          {},
          {},
        ],

      }
    },
    components: {HeaderView, NavBar},
    mounted() {
      this.setMinHeight();

    },
    created() {
      this.getAdminState()

    },
    methods: {
      //页面加载Min标签设置固定高度
      setMinHeight() {
        let w = document.body.scrollHeight;
        this.$refs.indexDiv.style.height = (w - 60) + "px";
      },
      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = sessionStorage.getItem("userInfo");
        if (userInfo === null) {

        }
        else {


        }
      },
      closeTab() {
        this.$router.push("/MaterialManagement")
      }

    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .indexDiv-top {
    height: 50px;
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
    .closeTab {
      position: absolute;
      right: 20px;
      top: 0;
      cursor: pointer;
      .icon-guanbi {
        font-size: 200%;
        color: #3EC455;
      }
    }
    .indexDiv-bottom-top {
      height: 150px;
      border: 1px solid @color-F0;
      .indexDiv-bottom-top-input {
        height: 100px;
        padding-left: 2%;
        .input-div {
          width: 180px;
          height: 40px;
          margin-right: 2%;
          margin-top: 5px;
          .input-div-text {
            width: 30%;
            font-size: 12px;
            text-align: center;
            line-height: 40px;
          }
          .input-div-input {
            width: 70%;
            height: 40px;
            input {
              margin-top: 10px;
              width: 100%;
              height: 20px;
              border: 1px solid @color-background-d;
              padding-left: 5%;
            }
            select {
              margin-top: 10px;
              width: 100%;
              height: 20px;
              border: 1px solid @color-background-d;
            }

          }

        }
      }
      .indexDiv-bottom-top-button {
        width: 100%;
        height: 50px;
        padding-left: 2%;
        button {
          width: 100px;
          height: 30px;

        }
      }
    }

  }


</style>
