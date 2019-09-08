<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>物料管理</el-breadcrumb-item>
                <el-breadcrumb-item>托单金物制作</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>检索托单金物</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索托单金物" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>选择时间</span>
                        <span>:</span>
                        <el-date-picker
                            v-model="examineTime"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </label>
                    <label style="margin-right: 10px;margin-left: 5px">
                        <span>有效</span>
                        <span>:</span>
                        <el-select
                            v-model="effective"
                            style="width: 120px"
                            @change="changeEffective"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="输入或选择">
                            <el-option
                                v-for="item in effectiveOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="success" @click="doSearch">查询</el-button>
                    <el-button type="primary" @click="showAdd">新图添加</el-button>
                    <el-button type="danger" @click="showModify">追加改正</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'14px'}"
                              border
                              :height="this.tableHeight"
                              @row-dblclick="edit"
                              @select-all="selectAll"
                              @select="selectList"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <el-table-column
                            type="selection"
                            width="30">
                        </el-table-column>
                        <template v-for="(col ,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
            <!--新增弹出框 -->
            <el-dialog title="制作" :visible.sync="addVisible" width="50%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="图号">
                        <el-input v-model="tuhao" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="区画或工事名">
                        <el-input v-model="gsName" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                    <el-button type="primary" @click="doAdd" style="height:30px;width:80px">添 加</el-button>
            </span>
            </el-dialog>

            <!--修改弹出框 -->
            <el-dialog title="托单金物制作" :visible.sync="editVisible" width="100%" :fullscreen="true" :center="true">
                <div class="makeFrom">
                    <div class="makeFromDiv">
                        <div class="makeFromPage fr">
                            <div class="makeFromPageText"> {{page}}</div>
                        </div>
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
                                    <div class="makeFromTopRightTopDH fl">
                                        <div class="">第</div>
                                        <div class="">
                                            <input disabled="disabled" style="width: 30px;background-color: #ffffff"
                                                   v-model="dijihui"/>
                                        </div>
                                        <div class="">回前图引换</div>
                                    </div>
                                    <div class="makeFromTopRightTopS fl">S.</div>
                                    <div class="makeFromTopRightTopNo fl">No.</div>
                                    <div class="makeFromTopRightTopInput fl">
                                        <input disabled="disabled" style="background-color: #ffffff" v-model="No"/>
                                    </div>
                                </div>
                                <div class="makeFromTopRightBottom">
                                    <div class="makeFromTopRightBottomMc fl">区画或工事名称</div>
                                    <div class="makeFromTopRightBottomInput fl">
                                        <input style="background-color: #ffffff" disabled="disabled" v-model="gsName"/>
                                    </div>
                                    <div class="makeFromTopRightBottomTh fl">图号</div>
                                    <div class="makeFromTopRightBottomInput fl">
                                        <input style="background-color: #ffffff" disabled="disabled" v-model="Tuhao"/>
                                    </div>
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
                                            <div class="makeFromBottomTwoRightBottomDivName">科长</div>
                                            <input v-model="sh1" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoRightBottomDiv">
                                            <div class="makeFromBottomTwoRightBottomDivName">主管</div>
                                            <input v-model="sh2" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoRightBottomDiv">
                                            <div class="makeFromBottomTwoRightBottomDivName">检图</div>
                                            <input v-model="sh3" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoRightBottomDiv">
                                            <div class="makeFromBottomTwoRightBottomDivName">作成</div>
                                            <input v-model="sh4" style="width:100px; height: 59px"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="makeFromTime fr">
                            <div class="makeFromTimeInput fr"><input v-model="chuturiqi"
                                                                     style="width:200px; height: 50px"/></div>
                            <div class="makeFromTimeText fr">出图日期：</div>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button v-if="this.button ===1 " @click="cancelEditVisible"
                               style="height:30px;width:100px">取 消</el-button>
                    <el-button v-if="this.button ===1 " type="primary" @click="doSaveData"
                               style="height:30px;width:100px">保 存</el-button>
                    <el-button v-if="this.button ===1 " type="success" @click="saveEdit"
                               style="height:30px;width:100px">提交捡图</el-button>
            </span>
            </el-dialog>

            <!-- 追加改正提示框 -->
            <el-dialog title="托单金物制作" :visible.sync="zjgzEditVisible" width="100%" :fullscreen="true" :center="true">
                <div class="makeFrom">
                    <div class="makeFromDiv">
                        <div class="makeFromPage fr">
                            <div class="makeFromPageText"> {{page}}</div>
                        </div>
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
                                    <div class="makeFromTopRightTopDH fl">
                                        <div class="">第</div>
                                        <div class="">
                                            <input disabled="disabled" style="width: 30px;background-color: #ffffff"
                                                   v-model="dijihui"/>
                                        </div>
                                        <div class="">回前图引换</div>
                                    </div>
                                    <div class="makeFromTopRightTopS fl">S.</div>
                                    <div class="makeFromTopRightTopNo fl">No.</div>
                                    <div class="makeFromTopRightTopInput fl">
                                        <input disabled="disabled" style="background-color: #ffffff" v-model="No"/>
                                    </div>
                                </div>
                                <div class="makeFromTopRightBottom">
                                    <div class="makeFromTopRightBottomMc fl">区画或工事名称</div>
                                    <div class="makeFromTopRightBottomInput fl">
                                        <input style="background-color: #ffffff" disabled="disabled" v-model="gsName"/>
                                    </div>
                                    <div class="makeFromTopRightBottomTh fl">图号</div>
                                    <div class="makeFromTopRightBottomInput fl">
                                        <input style="background-color: #ffffff" disabled="disabled" v-model="Tuhao"/>
                                    </div>
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
                                            <div class="makeFromBottomTwoRightBottomDivName">科长</div>
                                            <input v-model="sh1" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoRightBottomDiv">
                                            <div class="makeFromBottomTwoRightBottomDivName">主管</div>
                                            <input v-model="sh2" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoRightBottomDiv">
                                            <div class="makeFromBottomTwoRightBottomDivName">检图</div>
                                            <input v-model="sh3" style="width:100px; height: 59px"/>
                                        </div>
                                        <div class="makeFromBottomTwoRightBottomDiv">
                                            <div class="makeFromBottomTwoRightBottomDivName">作成</div>
                                            <input v-model="sh4" style="width:100px; height: 59px"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="makeFromTime fr">
                            <div class="makeFromTimeInput fr"><input v-model="chuturiqi"
                                                                     style="width:200px; height: 50px"/></div>
                            <div class="makeFromTimeText fr">出图日期：</div>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelEditVisible" style="height:30px;width:100px">取 消</el-button>
                    <el-button type="primary" @click="gzDoSaveData" style="height:30px;width:100px">保 存</el-button>
            </span>
            </el-dialog>


            <!-- 取消提示框 -->
            <el-dialog title="取消" :visible.sync="cancelVisible" width="300px" center>
                <div class="del-dialog-cnt">取消不保存数据，是否确定取消？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="cancelVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doCancelVisible" style="height:30px;width:80px">确 定</el-button>
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
    import {getNowTime} from '../../assets/js/api'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData: [],
                listType: [],
                id: "",
                search: "44",
                chuanhao: "",
                tuhao: "",

                excelData: [],
                shiyongri: "",
                shiyongchangsuo: "",
                No: "",
                gsName: "",
                Tuhao: "",
                CODE: "",
                gssgqj: "",
                bzgs: "",
                sh1: "",
                sh2: "",
                sh3: "",
                sh4: "",
                ck1: "",
                ck2: "",
                ck3: "",
                xczrz1: "",
                xczrz2: "",
                xczrz3: "",
                chuturiqi: "",
                page: "",
                dijihui: "",

                cols: [],
                tableData: [],
                tableData2:[],

                select_word: '',
                effective:"",
                effectiveOptions:[{"name": "有效", "id": "1"}, {"name": "无效", "id": "2"}],

                addVisible: false,
                editVisible: false,
                zjgzEditVisible: false,
                cancelVisible: false,
                examineTime: "",
                zuoyezhe: "",
                button: "",
                tableHeight:Number,

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
                    let time = getNowTime();
                    let times = [];
                    for (let i = 0; i < 2; i++) {
                        times.push(time)
                    }
                    this.examineTime = times;

                    const info = JSON.parse(userInfo);
                    this.zuoyezhe = info.username;
                    this.setTableHeight();
                    this.loadingShowData(this.examineTime);

                }
            },

            //根据屏幕设置Table高度
            setTableHeight() {
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    var H = window.screen.height;
                    this.tableHeight = H - 300 + "px";
                }
                else {
                    var h = document.body.clientHeight;
                    this.tableHeight = h - 300 + "px";
                }

            },


            //瞬间加载数据
            loadingShowData(data) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "tuodanjinwu"}),
                    axios.post(" " + url + "/wuliao/tuodanjinwuList", {"times": data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                        that.tableData2 = table.data;
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
                if (this.chuanhao && this.tuhao) {
                    axios.post(" " + url + "/wuliao/tuodanjinwuAdd",
                        {
                            "shipcode": this.chuanhao,
                            "tuhao": this.tuhao,
                            "quhuaming": this.gsName
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                this.loadingShowData(this.examineTime)
                            }
                            else {
                                this.$message.warning(`新增失败`);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.message = "查询时间不能为空";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }

            },


            //进行查询
            doSearch() {
                if (this.examineTime) {
                    this.loadingShowData(this.examineTime)
                }
                else {
                    this.message = "查询时间不能为空";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //选择那个一个
            selectList(val) {
                if (val.length) {
                    let data = [];
                    let type = [];
                    for (let i = 0; i < val.length; i++) {
                        let a = val[i].id;
                        data.push(a)
                    }
                    for (let i = 0; i < val.length; i++) {
                        let b = val[i].shenpistatus;
                        type.push(b)
                    }
                    this.listData = data;
                    this.listType = type;
                }
                else {
                    this.listData = [];
                }
            },

            //列表全部选择
            selectAll(val) {
                if (val.length) {
                    let data = [];
                    for (let i = 0; i < val.length; i++) {
                        let a = val[i].id;
                        data.push(a)
                    }
                    this.listData = data;
                }
                else {
                    this.listData = [];
                }
            },

            //显示追加修改
            showModify() {
                if (this.listData.length) {
                    if (this.listData.length > 1) {
                        this.message = "只能选择一个";
                        this.HideModal = false;
                        const that = this;

                        function a() {
                            that.message = "";
                            that.HideModal = true;
                        }

                        setTimeout(a, 2000);
                    }
                    else {
                        if (this.listType[0] === 4) {
                            this.zjgzEditVisible = true;
                            axios.post(" " + url + "/wuliao/tuodanjinwuDetail", {"id": this.listData[0]})
                                .then((res) => {
                                    this.button = res.data.shenpistatus;
                                    this.excelData = res.data.details;
                                    this.shiyongri = res.data.shiyongri;
                                    this.shiyongchangsuo = res.data.shiyongri;
                                    this.No = res.data.shipcode;
                                    this.gsName = res.data.quhuaming;
                                    this.dijihui = res.data.gaizheng;
                                    this.Tuhao = res.data.tuhao;
                                    this.CODE = res.data.CODE;
                                    this.gssgqj = res.data.shiyongri;
                                    this.bzgs = res.data.shiyongri;
                                    this.sh1 = res.data.shiyongri;
                                    this.sh2 = res.data.shiyongri;
                                    this.sh3 = res.data.shiyongri;
                                    this.sh4 = res.data.shiyongri;
                                    this.ck1 = res.data.shiyongri;
                                    this.ck2 = res.data.shiyongri;
                                    this.ck3 = res.data.shiyongri;
                                    this.xczrz1 = res.data.shiyongri;
                                    this.xczrz2 = res.data.shiyongri;
                                    this.xczrz3 = res.data.shiyongri;

                                })
                                .catch((err) => {
                                    console.log(err)
                                });
                        }
                        else {
                            this.message = "没有审批通过，无法改正";
                            this.HideModal = false;
                            const that = this;

                            function c() {
                                that.message = "";
                                that.HideModal = true;
                            }

                            setTimeout(c, 2000);
                        }
                    }
                }
                else {
                    this.message = "请勾选要追加改正的";
                    this.HideModal = false;
                    const that = this;

                    function b() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(b, 2000);
                }
            },

            //进行追加修改
            doModify() {

            },


            //双击点击行内编辑
            edit(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/wuliao/tuodanjinwuDetail", {"id": this.id})
                    .then((res) => {
                        this.button = res.data.shenpistatus;
                        this.excelData = res.data.details;
                        this.shiyongri = res.data.shiyongri;
                        this.shiyongchangsuo = res.data.shiyongri;
                        this.No = res.data.shipcode;
                        this.gsName = res.data.quhuaming;
                        this.dijihui = res.data.gaizheng;
                        this.Tuhao = res.data.tuhao;
                        this.CODE = res.data.CODE;
                        this.gssgqj = res.data.shiyongri;
                        this.bzgs = res.data.shiyongri;
                        this.sh1 = res.data.shiyongri;
                        this.sh2 = res.data.shiyongri;
                        this.sh3 = res.data.shiyongri;
                        this.sh4 = res.data.shiyongri;
                        this.ck1 = res.data.shiyongri;
                        this.ck2 = res.data.shiyongri;
                        this.ck3 = res.data.shiyongri;
                        this.xczrz1 = res.data.shiyongri;
                        this.xczrz2 = res.data.shiyongri;
                        this.xczrz3 = res.data.shiyongri;

                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            //显示取消保存提示
            cancelEditVisible() {
                this.cancelVisible = true;

            },

            //进行取消
            doCancelVisible() {
                this.cancelVisible = false;
                this.zjgzEditVisible = false;
                this.editVisible = false;
                this.excelData = "";
                this.shiyongri = "";
                this.shiyongchangsuo = "";
                this.No = "";
                this.gsName = "";
                this.Tuhao = "";
                this.CODE = "";
                this.gssgqj = "";
                this.bzgs = "";
                this.sh1 = "";
                this.sh2 = "";
                this.sh3 = "";
                this.sh4 = "";
                this.ck1 = "";
                this.ck2 = "";
                this.ck3 = "";
                this.xczrz1 = "";
                this.xczrz2 = "";
                this.xczrz3 = "";
                this.page = "";
            },

            //保存数据
            doSaveData() {
                axios.post(" " + url + "/wuliao/tuodanjinwuUpdate",
                    {
                        "id": this.id,
                        "details": this.excelData,
                        "shiyongri": this.shiyongri,
                        "shiyongchangsuo": this.shiyongchangsuo,
                        "shipcode": this.No,
                        "gsName": this.gsName,
                        "tuhao": this.Tuhao,
                        "CODE": this.CODE,
                        "gssgqj": this.gssgqj,
                        "bzgs": this.bzgs,
                        "sh1": this.sh1,
                        "sh2": this.sh2,
                        "sh3": this.sh3,
                        "sh4": this.sh4,
                        "ck1": this.ck1,
                        "ck2": this.ck2,
                        "ck3": this.ck3,
                        "xczrz1": this.xczrz1,
                        "xczrz2": this.xczrz2,
                        "xczrz3": this.xczrz3,
                        "gaizheng": this.dijihui,
                        "quhuaming": this.gsName
                    }
                )
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.editVisible = false;
                            this.$message.success(`保存成功`);
                            this.loadingShowData(this.examineTime)
                        }
                        else {
                            this.$message.warning(`保存失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            // 保存编辑
            saveEdit() {
                axios.post(" " + url + "/wuliao/tuodanjinwuShenpi",
                    {
                        "id": this.id,
                        "type": 2,
                        "zuoyezhe": this.zuoyezhe
                    }
                )
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.editVisible = false;
                            this.$message.success(`提交检图成功`);
                            this.loadingShowData(this.examineTime)
                        }
                        else {
                            this.$message.warning(`提交检图失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            },


            //改正保存数据
            gzDoSaveData()
            {
                axios.post(" " + url + "/wuliao/tuodanjinwuGaizheng",
                    {
                        "id": this.listData[0],
                        "details": this.excelData,
                        "shiyongri": this.shiyongri,
                        "shiyongchangsuo": this.shiyongchangsuo,
                        "shipcode": this.No,
                        "gsName": this.gsName,
                        "tuhao": this.Tuhao,
                        "CODE": this.CODE,
                        "gssgqj": this.gssgqj,
                        "bzgs": this.bzgs,
                        "sh1": this.sh1,
                        "sh2": this.sh2,
                        "sh3": this.sh3,
                        "sh4": this.sh4,
                        "ck1": this.ck1,
                        "ck2": this.ck2,
                        "ck3": this.ck3,
                        "xczrz1": this.xczrz1,
                        "xczrz2": this.xczrz2,
                        "xczrz3": this.xczrz3,
                        "gaizheng": this.dijihui,
                        "quhuaming": this.gsName
                    }
                )
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.zjgzEditVisible = false;
                            this.$message.success(`保存成功`);
                            this.loadingShowData(this.examineTime)
                        }
                        else {
                            this.$message.warning(`保存失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            //改变选择
            changeEffective() {
                let arr = [];
                if (this.effective === "1") {
                    for (let i = 0; i < this.tableData2.length; i++) {
                        if (this.tableData2[i].statusStr === "有效") {
                            arr.push(this.tableData2[i])
                        }
                    }
                    this.tableData = arr;
                }
                else if (this.effective === "2") {
                    for (let i = 0; i < this.tableData2.length; i++) {
                        if (this.tableData2[i].statusStr === "无效") {
                            arr.push(this.tableData2[i])
                        }
                    }
                    this.tableData = arr;
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
                line-height: 80px;
                padding-left: 10px;
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
        height: 580px;
        .makeFromDiv {
            width: 1100px;
            height: 550px;
            overflow: auto;
            margin: 0 auto;
            .makeFromPage {
                height: 40px;
                width: 1042px;
                .makeFromPageText {
                    width: 200px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    font-size: @font-size-large;
                    float: right;

                }
            }
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
                            display: flex;
                            align-items: center;
                            justify-content: center;
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
                    height: 962.5px;
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
                    .makeFromBottomTwoLeft {
                        flex: 3;
                        height: 90px;
                        .makeFromBottomTwoLeftTop {
                            height: 30px;
                            text-align: center;
                            line-height: 30px;
                            font-size: @font-size-large;
                            border-bottom: 1px solid @color-background-dd;
                            border-right: 1px solid @color-background-dd;
                        }
                        .makeFromBottomTwoLeftBottom {
                            height: 60px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .makeFromBottomTwoLeftBottomDiv {
                                flex: 1;
                                height: 60px;
                                border-right: 1px solid @color-background-dd;
                                border-bottom: 1px solid @color-background-dd;
                            }
                        }

                    }
                    .makeFromBottomTwoCenter {
                        flex: 3;
                        height: 90px;
                        .makeFromBottomTwoCenterTop {
                            height: 30px;
                            text-align: center;
                            line-height: 30px;
                            font-size: @font-size-large;
                            border-bottom: 1px solid @color-background-dd;
                            border-right: 1px solid @color-background-dd;
                        }
                        .makeFromBottomTwoCenterBottom {
                            height: 60px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .makeFromBottomTwoCenterBottomDiv {
                                flex: 1;
                                height: 60px;
                                border-right: 1px solid @color-background-dd;
                                border-bottom: 1px solid @color-background-dd;
                            }
                        }
                    }
                    .makeFromBottomTwoRight {
                        flex: 4;
                        height: 90px;
                        .makeFromBottomTwoRightTop {
                            height: 30px;
                            text-align: center;
                            line-height: 30px;
                            font-size: @font-size-large;
                            border-bottom: 1px solid @color-background-dd;
                            border-right: 1px solid @color-background-dd;
                        }
                        .makeFromBottomTwoRightBottom {
                            height: 60px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .makeFromBottomTwoRightBottomDiv {
                                flex: 1;
                                height: 60px;
                                border-right: 1px solid @color-background-dd;
                                border-bottom: 1px solid @color-background-dd;
                                position: relative;
                                .makeFromBottomTwoRightBottomDivName {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                }
                            }
                        }
                    }

                }
            }
            .makeFromTime {
                height: 50px;
                width: 1042px;
                .makeFromTimeInput {
                    width: 200px;
                    height: 50px;
                }
                .makeFromTimeText {
                    font-size: 20px;
                    line-height: 50px;
                }
            }
        }
    }
</style>
