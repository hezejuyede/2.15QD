<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>物料管理</el-breadcrumb-item>
                <el-breadcrumb-item>脱单金物制作</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索脱单金物</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索脱单金物" class="handle-input mr10"></el-input>
                    </label>
                    <el-button type="primary"  @click="showAdd">添加</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
                              @row-dblclick="edit"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <template v-for="(col ,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
            <!--新增弹出框 -->
            <el-dialog title="制作" :visible.sync="addVisible" width="50%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="图号">
                        <el-input v-model="tuhao" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!--修改弹出框 -->
            <el-dialog title="脱单金物修改" :visible.sync="editVisible" width="100%">
                <div class="makeFrom">
                    <div class="makeFromDiv">
                        <div class="makeFromTop fr">
                            <div class="makeFromTopLeft fl">
                                <div class="makeFromTopLeftSmall fl">
                                    <div class="makeFromTopLeftSmallText">
                                        分段
                                    </div>
                                    <div class="makeFromTopLeftSmallText">
                                        单元
                                    </div>
                                    <div class="makeFromTopLeftSmallText">
                                        青空
                                    </div>
                                    <div class="makeFromTopLeftSmallText">
                                        管金物
                                    </div>
                                </div>
                                <div class="makeFromTopLeftLarge fl">
                                    管 工 托 单
                                </div>
                            </div>
                            <div class="makeFromTopRight fl">
                                <div class="makeFromTopRightTop">
                                    <div class="makeFromTopRightTopGz fl">改正</div>
                                    <div class="makeFromTopRightTopDH fl">第__回前图引换</div>
                                    <div class="makeFromTopRightTopS fl">S.</div>
                                    <div class="makeFromTopRightTopNo fl">No.</div>
                                    <div class="makeFromTopRightTopInput fl"><input v-model="No"/></div>
                                </div>
                                <div class="makeFromTopRightBottom">
                                    <div class="makeFromTopRightBottomMc fl">区画或工事名称</div>
                                    <div class="makeFromTopRightBottomInput fl"><input v-model="gsName"/></div>
                                    <div class="makeFromTopRightBottomTh fl">图号</div>
                                    <div class="makeFromTopRightBottomInput fl"><input v-model="Tuhao"/></div>
                                </div>
                            </div>
                        </div>
                        <div class="makeFromCenter fr">
                            <div class="makeFromCenterLeft fl">
                                <div class="makeFromCenterLeftTop">
                                    <div class="makeFromCenterLeftText">
                                        使用日
                                    </div>
                                    <div class="makeFromCenterLeftInput">
                                        <textarea v-model="shiyongri"/>
                                    </div>
                                </div>
                                <div class="makeFromCenterLeftBottom">
                                    <div class="makeFromCenterLeftText">
                                        使用场所
                                    </div>
                                    <div class="makeFromCenterLeftInput">
                                        <textarea v-model="shiyongchangsuo"/>
                                    </div>
                                </div>
                            </div>
                            <div class="makeFromCenterRight fl">
                                <template>
                                    <el-table
                                        :data="excelData"
                                        :header-cell-style="{background:'#ffffff',border: '1px solid #303133',color:'rgba(0, 0, 0, 1)'}"
                                        :cell-style="{border: '1px solid #303133'}"
                                        style="width: 992px;border: 1px solid #303133">
                                        <el-table-column
                                            align="center"
                                            prop="chukuxuhao"
                                            label="出库序号"
                                            width="80">
                                            <template slot-scope="scope">
                                                <input
                                                    v-model="scope.row.chuku"
                                                    style="width:60px"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            prop="tuhao"
                                            label="图号"
                                            width="120">
                                            <template slot-scope="scope">
                                                <input
                                                    v-model="scope.row.tuhao"
                                                    style="width:100px"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            prop="mingchengchicun"
                                            label="名称尺寸"
                                            width="300">
                                            <template slot-scope="scope">
                                                <input
                                                    v-model="scope.row.mingchengchicun"
                                                    style="width:300px"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            prop="guanliqufenhao"
                                            label="管理区分号"
                                            width="100">
                                            <template slot-scope="scope">
                                                <input
                                                    v-model="scope.row.guanliqufenhao"
                                                    style="width:80px"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            prop="hangfan"
                                            label="行番"
                                            width="40">
                                            <template slot-scope="scope">
                                                <input
                                                    v-model="scope.row.hangfan"
                                                    style="width:20px"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            prop="shuliang"
                                            label="数量"
                                            width="80">
                                            <template slot-scope="scope">
                                                <input
                                                    v-model="scope.row.shuliang"
                                                    style="width:60px"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            prop="danwei"
                                            label="单位"
                                            width="40">
                                            <template slot-scope="scope">
                                                <input
                                                    v-model="scope.row.danwei"
                                                    style="width:20px"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            prop="tuzhuangfanhao"
                                            label="涂装番号"
                                            width="50">
                                            <template slot-scope="scope">
                                                <input
                                                    v-model="scope.row.tuzhuangfanhao"
                                                    style="width:30px"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            prop="chupin"
                                            label="贮品"
                                            width="40">
                                            <template slot-scope="scope">
                                                <input
                                                    v-model="scope.row.chupin"
                                                    style="width:20px"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            prop="guanjin"
                                            label="管金"
                                            width="40">
                                            <template slot-scope="scope">
                                                <input
                                                    v-model="scope.row.guanjin"
                                                    style="width:20px"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            prop="beizhu"
                                            label="备注"
                                            width="100">
                                            <template slot-scope="scope">
                                                <input
                                                    v-model="scope.row.beizhu"
                                                    style="width:80px"/>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </div>
                        </div>
                        <div class="makeFromBottom fr">
                            <div class="makeFromBottomOne">
                                <div class="makeFromBottomOneDiv1">
                                    <div class="makeFromBottomOneDivLeft fl">CODE:</div>
                                    <div class="fl"><input v-model="CODE" style="height: 49px"/></div>
                                </div>
                                <div class="makeFromBottomOneDiv2">
                                    <div class="makeFromBottomOneDivLeft fl">工事施工期间：</div>
                                    <div class="fl"><input v-model="gssgqj" style="height: 49px"/></div>
                                </div>
                                <div class="makeFromBottomOneDiv3">
                                    <div class="makeFromBottomOneDivLeft fl">标准工数：</div>
                                    <div class="fl"><input v-model="bzgs" style="height: 49px"/></div>
                                </div>
                                <div class="makeFromBottomOneDiv4">
                                    H
                                </div>
                            </div>
                            <div class="makeFromBottomTwo">
                                <div class="makeFromBottomTwoLeft">
                                    <div class="makeFromBottomTwoLeftTop">现场责任者</div>
                                    <div class="makeFromBottomTwoLeftBottom">
                                        <div class="makeFromBottomTwoLeftBottomDiv">
                                            <input v-model="xczrz1" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoLeftBottomDiv">
                                            <input v-model="xczrz2" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoLeftBottomDiv">
                                            <input v-model="xczrz3" style="width:100px; height: 59px"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="makeFromBottomTwoCenter">
                                    <div class="makeFromBottomTwoCenterTop">仓库</div>
                                    <div class="makeFromBottomTwoCenterBottom">
                                        <div class="makeFromBottomTwoCenterBottomDiv">
                                            <input v-model="ck1" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoCenterBottomDiv">
                                            <input v-model="ck2" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoCenterBottomDiv">
                                            <input v-model="ck3" style="width:100px; height: 59px"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="makeFromBottomTwoRight">
                                    <div class="makeFromBottomTwoRightTop">技术本部生产设计部舾装生技科</div>
                                    <div class="makeFromBottomTwoRightBottom">
                                        <div class="makeFromBottomTwoRightBottomDiv">
                                            <input v-model="sh1" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoRightBottomDiv">
                                            <input v-model="sh2" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoRightBottomDiv">
                                            <input v-model="sh3" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoRightBottomDiv">
                                            <input v-model="sh4" style="width:100px; height: 59px"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

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
                listData: [],
                id: "",
                search: "44",
                chuanhao:"",
                tuhao:"",

                excelData: [
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                    {
                        "chukuxuhao": "",
                        "tuhao": "",
                        "mingchengchicun": "",
                        "guanliqufenhao": "",
                        "hangfan": "",
                        "shuliang": "",
                        "danwei": "",
                        "tuzhuangfanhao": "",
                        "chupin": "",
                        "guanjin": "",
                        "beizhu": ""
                    },
                ],
                shiyongri: "",
                shiyongchangsuo: "",
                No: "",
                gsName: "",
                Tuhao: "",
                CODE: "",
                gssgqj: "",
                bzgs: "",
                sh1:"",
                sh2:"",
                sh3:"",
                sh4:"",
                ck1:"",
                ck2:"",
                ck3:"",
                xczrz1:"",
                xczrz2:"",
                xczrz3:"",

                tdData:[{
                    excelData: [
                        {
                            "chuku": 1,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 11,
                            "xuhao": 22,
                            "tuhao": 33,
                            "mingchengchicun": 44,
                            "guanliqufenhao": 55,
                            "hangfan": 66,
                            "shuliang": 77,
                            "danwei": 88,
                            "tuzhuangfanhao": 99,
                            "chupin": 101,
                            "guanjin": 111,
                            "beizhu": 121
                        },
                        {
                            "chuku": 111,
                            "xuhao": 222,
                            "tuhao": 333,
                            "mingchengchicun": 444,
                            "guanliqufenhao": 555,
                            "hangfan": 666,
                            "shuliang": 777,
                            "danwei": 888,
                            "tuzhuangfanhao": 999,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 1,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 111,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 1,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 11,
                            "xuhao": 22,
                            "tuhao": 33,
                            "mingchengchicun": 44,
                            "guanliqufenhao": 55,
                            "hangfan": 66,
                            "shuliang": 77,
                            "danwei": 88,
                            "tuzhuangfanhao": 99,
                            "chupin": 101,
                            "guanjin": 111,
                            "beizhu": 121
                        },
                        {
                            "chuku": 111,
                            "xuhao": 222,
                            "tuhao": 333,
                            "mingchengchicun": 444,
                            "guanliqufenhao": 555,
                            "hangfan": 666,
                            "shuliang": 777,
                            "danwei": 888,
                            "tuzhuangfanhao": 999,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 1,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 111,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 1,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 11,
                            "xuhao": 22,
                            "tuhao": 33,
                            "mingchengchicun": 44,
                            "guanliqufenhao": 55,
                            "hangfan": 66,
                            "shuliang": 77,
                            "danwei": 88,
                            "tuzhuangfanhao": 99,
                            "chupin": 101,
                            "guanjin": 111,
                            "beizhu": 121
                        },
                        {
                            "chuku": 111,
                            "xuhao": 222,
                            "tuhao": 333,
                            "mingchengchicun": 444,
                            "guanliqufenhao": 555,
                            "hangfan": 666,
                            "shuliang": 777,
                            "danwei": 888,
                            "tuzhuangfanhao": 999,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 1,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 111,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 1,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 11,
                            "xuhao": 22,
                            "tuhao": 33,
                            "mingchengchicun": 44,
                            "guanliqufenhao": 55,
                            "hangfan": 66,
                            "shuliang": 77,
                            "danwei": 88,
                            "tuzhuangfanhao": 99,
                            "chupin": 101,
                            "guanjin": 111,
                            "beizhu": 121
                        },
                        {
                            "chuku": 111,
                            "xuhao": 222,
                            "tuhao": 333,
                            "mingchengchicun": 444,
                            "guanliqufenhao": 555,
                            "hangfan": 666,
                            "shuliang": 777,
                            "danwei": 888,
                            "tuzhuangfanhao": 999,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 1,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 111,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 111,
                            "xuhao": 222,
                            "tuhao": 333,
                            "mingchengchicun": 444,
                            "guanliqufenhao": 555,
                            "hangfan": 666,
                            "shuliang": 777,
                            "danwei": 888,
                            "tuzhuangfanhao": 999,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                        {
                            "chuku": 1,
                            "xuhao": 2,
                            "tuhao": 3,
                            "mingchengchicun": 4,
                            "guanliqufenhao": 5,
                            "hangfan": 6,
                            "shuliang": 7,
                            "danwei": 8,
                            "tuzhuangfanhao": 9,
                            "chupin": 10,
                            "guanjin": 11,
                            "beizhu": 12
                        },
                    ],
                    shiyongri: "使用日",
                    shiyongchangsuo: "使用场所",
                    No: "No.",
                    gsName: "区画或工事名",
                    Tuhao: "图号",
                    CODE: "CODE:",
                    gssgqj: "工事施工期间",
                    bzgs: "工事施工期间",
                    sh1:"审核人1",
                    sh2:"审核人2",
                    sh3:"审核人3",
                    sh4:"审核人4",
                    ck1:"仓库1",
                    ck2:"仓库2",
                    ck3:"仓库3",
                    xczrz1:"现场责任者1",
                    xczrz2:"现场责任者2",
                    xczrz3:"现场责任者3",
                }],





                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                editVisible:false,

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
                   this.loadingShowData();
                }
            },

            //瞬间加载数据
            loadingShowData() {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "tuodanjinwu"}),
                    axios.post(" " + url + "/padShow/buttonList", {"id": ""})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },


            //显示新增
            showAdd() {
                this.addVisible = true;
                this.chuanhao = "";
                this.tuhao = "";
            },

            //进行新增
            doAdd() {
                axios.post(" " + url + "/wuliao/jinwuZhuwenpinList",
                    {
                        "excelData":this.excelData,
                        "shiyongri":this.shiyongri,
                        "shiyongchangsuo":this.shiyongchangsuo,
                        "No":this.No,
                        "gsName":this.gsName,
                        "Tuhao":this.Tuhao,
                        "CODE":this.CODE,
                        "gssgqj":this.gssgqj,
                        "bzgs":this.bzgs,
                        "sh1":this.sh1,
                        "sh2":this.sh2,
                        "sh3":this.sh3,
                        "sh4":this.sh4,
                        "ck1":this.ck1,
                        "ck2":this.ck2,
                        "ck3":this.ck3,
                        "xczrz1":this.xczrz1,
                        "xczrz2":this.xczrz2,
                        "xczrz3":this.xczrz3,
                    }
                )
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.$message.success(`新增成功`);
                            this.addVisible = false;
                            this.loadingShowData(this.workStation)
                        }
                        else {
                            this.$message.warning(`新增失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            //双击点击行内编辑
            edit(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/padShow/buttonDetail", {"id": this.id})
                    .then((res) => {
                        this.excelData= [
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                            {
                                "chukuxuhao": "",
                                "tuhao": "",
                                "mingchengchicun": "",
                                "guanliqufenhao": "",
                                "hangfan": "",
                                "shuliang": "",
                                "danwei": "",
                                "tuzhuangfanhao": "",
                                "chupin": "",
                                "guanjin": "",
                                "beizhu": ""
                            },
                        ];
                        this.shiyongri= res.data.shiyongri;
                        this.shiyongchangsuo=  res.data.shiyongri;
                        this.No=  res.data.shiyongri;
                        this.gsName=  res.data.shiyongri;
                        this.Tuhao=  res.data.shiyongri;
                        this.CODE=  res.data.shiyongri;
                        this.gssgqj=  res.data.shiyongri;
                        this.bzgs=  res.data.shiyongri;
                        this.sh1= res.data.shiyongri;
                        this.sh2= res.data.shiyongri;
                        this.sh3= res.data.shiyongri;
                        this.sh4= res.data.shiyongri;
                        this.ck1= res.data.shiyongri;
                        this.ck2= res.data.shiyongri;
                        this.ck3= res.data.shiyongri;
                        this.xczrz1= res.data.shiyongri;
                        this.xczrz2= res.data.shiyongri;
                        this.xczrz3= res.data.shiyongri;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit() {
                axios.post(" " + url + "/padShow/buttonUpdate",
                    {
                        "id": this.id,
                        "excelData":this.excelData,
                        "shiyongri":this.shiyongri,
                        "shiyongchangsuo":this.shiyongchangsuo,
                        "No":this.No,
                        "gsName":this.gsName,
                        "Tuhao":this.Tuhao,
                        "CODE":this.CODE,
                        "gssgqj":this.gssgqj,
                        "bzgs":this.bzgs,
                        "sh1":this.sh1,
                        "sh2":this.sh2,
                        "sh3":this.sh3,
                        "sh4":this.sh4,
                        "ck1":this.ck1,
                        "ck2":this.ck2,
                        "ck3":this.ck3,
                        "xczrz1":this.xczrz1,
                        "xczrz2":this.xczrz2,
                        "xczrz3":this.xczrz3,
                    }
                )
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.editVisible = false;
                            this.$message.success(`修改成功`);
                            this.loadingShowData(this.workStation)
                        }
                        else {
                            this.$message.warning(`新增失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })

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
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .template-content {
            .handle-box {
                height: 80px;
                line-height: 80px;
                padding-left: 50px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width: 100px;
                    height: 30px;
                }
            }
            .del-dialog-cnt {
                font-size: 16px;
                text-align: center
            }
            .table {
                width: 100%;
                font-size: 14px;
            }
            .red {
                color: #ff0000;
            }

        }

    }

    .makeFrom {
        width: 100%;
        height: 500px;
        .makeFromDiv {
            width: 100%;
            height: 500px;
            overflow: auto;
            .makeFromTop {
                height: 120px;
                width: 1042px;
                border: 1px solid #303133;
                .makeFromTopLeft {
                    width: 40%;
                    height: 120px;
                    .makeFromTopLeftSmall {
                        width: 40%;
                        height: 100%;
                        .makeFromTopLeftSmallText {
                            width: 100%;
                            height: 25%;
                            border-left: 1px solid @color-background-dddd;
                            border-top: 1px solid @color-background-dddd;
                            border-right: 1px solid @color-background-dddd;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                    }
                    .makeFromTopLeftLarge {
                        width: 60%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: @font-size-large-xxx;
                        border-left: 1px @color-background-dddd;

                    }
                }
                .makeFromTopRight {
                    width: 60%;
                    height: 120px;
                    .makeFromTopRightTop {
                        height: 60px;
                        .makeFromTopRightTopGz {
                            height: 60px;
                            width: 50px;
                            text-align: center;
                            line-height: 60px;
                            font-size: @font-size-large;
                            border-left: 1px solid #303133;
                        }
                        .makeFromTopRightTopDH {
                            width: 200px;
                            height: 60px;
                            text-align: center;
                            line-height: 60px;
                            font-size: @font-size-large;
                            border-left: 1px solid #303133;
                        }
                        .makeFromTopRightTopS {
                            width: 70px;
                            height: 60px;
                            text-align: center;
                            line-height: 60px;
                            font-size: @font-size-large;
                            border-left: 1px solid #303133;

                        }
                        .makeFromTopRightTopNo {
                            width: 70px;
                            height: 60px;
                            text-align: center;
                            line-height: 60px;
                            font-size: @font-size-large;
                            border-left: 1px solid #303133;
                        }
                        .makeFromTopRightTopInput {
                            width: 234px;
                            height: 60px;
                            text-align: center;
                            line-height: 60px;
                            font-size: @font-size-large;
                            border-left: 1px solid #303133;
                            border-bottom: 1px solid #303133;
                            input {
                                height: 60px;
                                width: 224px;
                                padding-left: 10px;
                            }
                        }

                    }
                    .makeFromTopRightBottom {

                        .makeFromTopRightBottomMc {
                            width: 120px;
                            height: 60px;
                            line-height: 60px;
                            text-align: center;
                            border-top: 1px solid #303133;
                            font-size: @font-size-large;
                            border-left: 1px solid #303133;

                        }
                        .makeFromTopRightBottomTh {
                            width: 120px;
                            height: 60px;
                            line-height: 60px;
                            text-align: center;
                            border-top: 1px solid #303133;
                            font-size: @font-size-large;
                            border-left: 1px solid #303133;
                        }
                        .makeFromTopRightBottomInput {
                            width: 190px;
                            height: 60px;
                            text-align: center;
                            line-height: 60px;
                            font-size: @font-size-large;
                            border-left: 1px solid #303133;
                            border-top: 1px solid #303133;
                            input {
                                height: 60px;
                                width: 190px;
                                padding-left: 10px;
                            }
                        }

                    }

                }
            }
            .makeFromCenter {
                .makeFromCenterLeft {
                    width: 50px;
                    height: 968px;
                    border-left: 1px solid #303133;
                    border-top: 1px solid #303133;
                    border-bottom: 1px solid #303133;
                    .makeFromCenterLeftTop {
                        height: 50%;
                    }
                    .makeFromCenterLeftBottom {
                        height: 50%;
                    }
                    .makeFromCenterLeftText {
                        height: 50%;
                        font-size: 25px;
                        text-align: center;
                        line-height: 50px;
                        border-bottom: 1px solid #303133;
                    }
                    .makeFromCenterLeftInput {
                        height: 50%;
                        border-bottom: 1px solid #303133;
                        textarea {
                            width: 50px;
                            height: 200px;
                        }
                    }
                }

            }
            .makeFromBottom {
                height: 140px;
                width: 1042px;
                border: 1px solid #303133;
                .makeFromBottomOne {
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-bottom: 1px solid @color-background-ddddd;
                    .makeFromBottomOneDiv1 {
                        flex: 2.5;
                        border-right: 1px solid @color-background-ddddd;
                    }
                    .makeFromBottomOneDiv2 {
                        flex: 4;
                        border-right: 1px solid @color-background-ddddd;
                    }
                    .makeFromBottomOneDiv3 {
                        flex: 2.5;
                        border-right: 1px solid @color-background-ddddd;
                    }
                    .makeFromBottomOneDiv4 {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-right: 1px solid @color-background-ddddd;
                    }
                    .makeFromBottomOneDivLeft {
                        width: 30%;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        font-size: @font-size-medium;
                        border-right: 1px solid @color-background-ddddd;
                    }
                }
                .makeFromBottomTwo {
                    width: 100%;
                    height: 90px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .makeFromBottomTwoLeft{
                        flex: 3;
                        height: 90px;
                        .makeFromBottomTwoLeftTop{
                            height: 30px;
                            text-align: center;
                            line-height: 30px;
                            font-size: @font-size-large;
                            border-bottom:1px solid @color-background-dd;
                            border-right:1px solid @color-background-dd;
                        }
                        .makeFromBottomTwoLeftBottom{
                            height: 60px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .makeFromBottomTwoLeftBottomDiv{
                                flex: 1;
                                height: 60px;
                                border-right:1px solid @color-background-dd;
                                border-bottom:1px solid @color-background-dd;
                            }
                        }


                    }
                    .makeFromBottomTwoCenter{
                        flex: 3;
                        height: 90px;
                        .makeFromBottomTwoCenterTop{
                            height: 30px;
                            text-align: center;
                            line-height: 30px;
                            font-size: @font-size-large;
                            border-bottom:1px solid @color-background-dd;
                            border-right:1px solid @color-background-dd;
                        }
                        .makeFromBottomTwoCenterBottom{
                            height: 60px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .makeFromBottomTwoCenterBottomDiv{
                                flex: 1;
                                height: 60px;
                                border-right:1px solid @color-background-dd;
                                border-bottom:1px solid @color-background-dd;
                            }
                        }
                    }
                    .makeFromBottomTwoRight{
                        flex:4 ;
                        height: 90px;
                        .makeFromBottomTwoRightTop{
                            height: 30px;
                            text-align: center;
                            line-height: 30px;
                            font-size: @font-size-large;
                            border-bottom:1px solid @color-background-dd;
                            border-right:1px solid @color-background-dd;
                        }
                        .makeFromBottomTwoRightBottom{
                            height: 60px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .makeFromBottomTwoRightBottomDiv{
                                flex: 1;
                                height: 60px;
                                border-right:1px solid @color-background-dd;
                                border-bottom:1px solid @color-background-dd;
                            }
                        }
                    }


                }
            }
        }
    }
</style>
