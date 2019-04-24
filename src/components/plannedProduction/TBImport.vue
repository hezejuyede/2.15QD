<template>
    <div class="InformationImport">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>计划排产</el-breadcrumb-item>
                <el-breadcrumb-item>管加工数据导入(特别)</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="importDataQueryContentTable">
                <div class="tabTop">
                    <div class="tabTop-div" v-for="(item,index) in navBar" :class="{'red':index === num}"
                         @click="goToNavBar(index)">
                        <span>{{item.text}}</span>
                    </div>
                </div>
                <div class="tabBottom">
                    <div class="tabBottomTemplate" v-if="this.num===0">
                        <div class="handle-box">
                            <label style="margin-right: 5px">
                                <span>智能检索</span>
                                <span>:</span>
                                <el-input v-model="select_word" style="width: 100px" placeholder="智能检索"></el-input>
                            </label>
                            <label style="margin-right:5px">
                                <span>批次</span>
                                <span>:</span>
                                <el-select
                                    v-model="batch"
                                    style="width: 120px"
                                    clearable
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="批次">
                                    <el-option
                                        v-for="item in batchOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </label>
                            <label style="margin-right: 5px">
                                <span>区划</span>
                                <span>:</span>
                                <el-input v-model="quHua" style="width: 80px" placeholder="区划"></el-input>
                            </label>
                            <label style="margin-right: 5px">
                                <span>系统号</span>
                                <span>:</span>
                                <el-input v-model="systemNumber" style="width:80px" placeholder="系统号"></el-input>
                            </label>
                            <label style="margin-right: 5px">
                                <span>一贯号</span>
                                <span>:</span>
                                <el-input v-model="yiguanhao" style="width: 80px" placeholder="一贯号"></el-input>
                            </label>
                            <label style="margin-right: 5px">
                                <span>code号</span>
                                <span>:</span>
                                <el-input v-model="codeNumber" style="width: 80px" placeholder="code"></el-input>
                            </label>
                            <el-button type="primary" @click="showAdd(num)">新增</el-button>
                            <el-button type="success" @click="doSearch(num)">查询</el-button>
                        </div>
                        <div class="">
                            <el-table
                                class="tb-edit"
                                :data="tables"
                                :key="0"
                                :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'12px'}"
                                border
                                height="380"
                                highlight-current-row
                                @row-dblclick="showEdit"
                                style="width: 98%;margin: auto">
                                <template v-for="(col ,index) in cols">
                                    <el-table-column align="center" :prop="col.prop"
                                                     :label="col.label"></el-table-column>
                                </template>
                            </el-table>
                        </div>
                    </div>
                    <div class="tabBottomTemplate" v-if="this.num===1">
                        <div class="handle-box">
                            <label style="margin-right: 5px">
                                <span>智能检索</span>
                                <span>:</span>
                                <el-input v-model="select_word" style="width: 100px" placeholder="智能检索"></el-input>
                            </label>
                            <label style="margin-right: 10px">
                                <span>审批状态</span>
                                <span>:</span>
                                <el-select
                                    v-model="status"
                                    style="width: 120px"
                                    clearable
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="审批状态">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </label>
                            <label style="margin-right:10px">
                                <span>批次</span>
                                <span>:</span>
                                <el-select
                                    v-model="batch"
                                    style="width: 120px"
                                    clearable
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="批次">
                                    <el-option
                                        v-for="item in batchOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </label>
                            <label style="margin-right: 10px">
                                <span>生产线</span>
                                <span>:</span>
                                <el-select
                                    v-model="scx"
                                    style="width: 100px"
                                    clearable
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="生产线">
                                    <el-option
                                        v-for="item in scxOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </label>
                            <el-button type="success" @click="doSearch(num)">查询</el-button>
                            <el-button type="primary" @click="showTBImport()">导入数据</el-button>
                            <el-button type="danger" @click="showDelete()">删除</el-button>
                            <el-button type="warning" @click="drawingInput()">一品图导入</el-button>
                        </div>
                        <div class="">
                            <el-table class="tb-edit"
                                      :data="tables"
                                      :key="2"
                                      :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'12px'}"
                                      border
                                      height="380"
                                      @select-all="selectAll"
                                      @select="selectList"
                                      @row-dblclick="showEdit"
                                      highlight-current-row
                                      style="width: 98%;margin: auto">
                                <el-table-column
                                    type="selection"
                                    width="30">
                                </el-table-column>
                                <template v-for="(col ,index) in cols">
                                    <el-table-column align="center" :prop="col.prop"
                                                     :label="col.label"></el-table-column>
                                </template>
                            </el-table>
                        </div>
                    </div>
                    <div class="tabBottomTemplate" v-if="this.num===2">
                        <div class="handle-box">
                            <label style="margin-right: 5px">
                                <span>智能检索</span>
                                <span>:</span>
                                <el-input v-model="select_word" style="width: 300px" placeholder="智能检索"></el-input>
                            </label>
                            <label style="margin-right: 10px">
                                <span>批次</span>
                                <span>:</span>
                                <el-select
                                    v-model="batch"
                                    style="width: 200px"
                                    clearable
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="批次">
                                    <el-option
                                        v-for="item in batchOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </label>
                            <el-button type="success" @click="doSearch(num)">查询</el-button>
                            <el-button type="primary" @click="showAdd(num)">录入</el-button>
                            <el-button type="danger" @click="showDelete()">删除</el-button>
                        </div>
                        <div class="">
                            <el-table class="tb-edit"
                                      :data="tables"
                                      :key="2"
                                      :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'12px'}"
                                      border
                                      height="380"
                                      @select-all="selectAll"
                                      @select="selectList"
                                      @row-dblclick="showEdit"
                                      highlight-current-row
                                      style="width: 98%;margin: auto">
                                <el-table-column
                                    type="selection"
                                    width="30">
                                </el-table-column>
                                <template v-for="(col ,index) in cols">
                                    <el-table-column align="center" :prop="col.prop"
                                                     :label="col.label"></el-table-column>
                                </template>
                            </el-table>
                        </div>
                    </div>
                    <div class="tabBottomTemplate" v-if="this.num===3">
                        <div class="handle-box">
                            <label style="margin-right: 10px">
                                <span>智能检索</span>
                                <span>:</span>
                                <el-input v-model="select_word" style="width: 200px" placeholder="智能检索"></el-input>
                            </label>
                            <label style="margin-right: 10px">
                                <span>一贯号</span>
                                <span>:</span>
                                <el-input v-model="yiguanhao" style="width: 120px" placeholder="一贯号"></el-input>
                            </label>
                            <label style="margin-right:10px">
                                <span>code号</span>
                                <span>:</span>
                                <el-input v-model="codeNumber" style="width: 120px" placeholder="code"></el-input>
                            </label>
                            <el-button type="success" @click="doSearch(num)">查询</el-button>
                            <el-button type="primary" @click="showAdd(num)">新增</el-button>
                        </div>
                        <div class="">
                            <el-table
                                :key="3"
                                class="tb-edit"
                                :data="tables"
                                :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'12px'}"
                                border
                                height="380"
                                highlight-current-row
                                @row-dblclick="showEdit"
                                style="width: 98%;margin: auto">
                                <template v-for="(col ,index) in cols">
                                    <el-table-column align="center" :prop="col.prop"
                                                     :label="col.label"></el-table-column>
                                </template>
                            </el-table>
                        </div>
                    </div>
                    <div class="tabBottomTemplate" v-if="this.num===4">
                        <div class="handle-box">
                            <label style="margin-right: 10px">
                                <span>智能检索</span>
                                <span>:</span>
                                <el-input v-model="select_word" style="width: 200px" placeholder="智能检索"></el-input>
                            </label>
                            <label style="margin-right: 10px">
                                <span>一贯号</span>
                                <span>:</span>
                                <el-input v-model="yiguanhao" style="width: 120px" placeholder="一贯号"></el-input>
                            </label>
                            <label style="margin-right:10px">
                                <span>code号</span>
                                <span>:</span>
                                <el-input v-model="codeNumber" style="width: 120px" placeholder="code"></el-input>
                            </label>
                            <el-button type="success" @click="doSearch(num)">查询</el-button>
                            <el-button type="primary" @click="showAdd(num)">新增</el-button>
                        </div>
                        <div class="">
                            <el-table
                                :key="3"
                                class="tb-edit"
                                :data="tables"
                                :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'12px'}"
                                border
                                height="380"
                                highlight-current-row
                                @row-dblclick="showEdit"
                                style="width: 98%;margin: auto">
                                <template v-for="(col ,index) in cols">
                                    <el-table-column align="center" :prop="col.prop"
                                                     :label="col.label"></el-table-column>
                                </template>
                            </el-table>
                        </div>
                    </div>
                    <div class="tabBottomTemplate" v-if="this.num===5">
                        <div class="handle-box">
                            <label style="margin-right: 10px">
                                <span>智能检索</span>
                                <span>:</span>
                                <el-input v-model="select_word" style="width: 200px" placeholder="智能检索"></el-input>
                            </label>
                            <label style="margin-right: 10px">
                                <span>一贯号</span>
                                <span>:</span>
                                <el-input v-model="yiguanhao" style="width: 120px" placeholder="一贯号"></el-input>
                            </label>
                            <label style="margin-right:10px">
                                <span>code号</span>
                                <span>:</span>
                                <el-input v-model="codeNumber" style="width: 120px" placeholder="code"></el-input>
                            </label>
                            <el-button type="success" @click="doSearch(num)">查询</el-button>
                            <el-button type="primary" @click="showAdd(num)">新增</el-button>
                        </div>
                        <div class="">
                            <el-table
                                :key="3"
                                class="tb-edit"
                                :data="tables"
                                :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'12px'}"
                                border
                                height="380"
                                highlight-current-row
                                @row-dblclick="showEdit"
                                style="width: 98%;margin: auto">
                                <template v-for="(col ,index) in cols">
                                    <el-table-column align="center" :prop="col.prop"
                                                     :label="col.label"></el-table-column>
                                </template>
                            </el-table>
                        </div>
                    </div>
                    <div class="tabBottomTemplate" v-if="this.num===6">
                        <div class="handle-box">
                            <label style="margin-right: 5px">
                                <span>智能检索</span>
                                <span>:</span>
                                <el-input v-model="select_word" style="width: 100px" placeholder="智能检索"></el-input>
                            </label>
                            <label style="margin-right: 10px">
                                <span>审批状态</span>
                                <span>:</span>
                                <el-select
                                    v-model="status"
                                    style="width: 120px"
                                    clearable
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="审批状态">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </label>
                            <label style="margin-right:10px">
                                <span>批次</span>
                                <span>:</span>
                                <el-select
                                    v-model="batch"
                                    style="width: 120px"
                                    clearable
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="批次">
                                    <el-option
                                        v-for="item in batchOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </label>
                            <label style="margin-right: 10px">
                                <span>生产线</span>
                                <span>:</span>
                                <el-select
                                    v-model="scx"
                                    style="width: 100px"
                                    clearable
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="生产线">
                                    <el-option
                                        v-for="item in scxOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </label>
                            <el-button type="success" @click="doSearch(num)">查询</el-button>
                            <el-button type="primary" @click="showTBImport()">导入数据</el-button>
                            <el-button type="danger" @click="showDelete()">删除</el-button>
                            <el-button type="warning" @click="drawingInput()">一品图导入</el-button>
                        </div>
                        <div class="">
                            <el-table class="tb-edit"
                                      :data="tables"
                                      :key="2"
                                      :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'12px'}"
                                      border
                                      height="380"
                                      @select-all="selectAll"
                                      @select="selectList"
                                      @row-dblclick="showEdit"
                                      highlight-current-row
                                      style="width: 98%;margin: auto">
                                <el-table-column
                                    type="selection"
                                    width="30">
                                </el-table-column>
                                <template v-for="(col ,index) in cols">
                                    <el-table-column align="center" :prop="col.prop"
                                                     :label="col.label"></el-table-column>
                                </template>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="50%" @close='closeDialog'>
            <div class="" v-if="this.num===0" style="height: 450px;overflow-y: auto">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="数据查询">
                        <div class="" style="display: flex">
                            <div class="" style="flex: 1">
                                <el-input v-model="quHua" style="width: 150px" placeholder="区划"></el-input>
                            </div>
                            <div class="" style="flex: 1">
                                <el-input v-model="systemNumber" style="width: 150px" placeholder="系统号"></el-input>
                            </div>
                            <div class="" style="flex: 1">
                                <el-button type="success" @click="doSearchHLG" style="width: 70px;height: 35px">查询
                                </el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="查看一品图">
                        <el-button type="danger" @click="seeYpt" style="width: 150px;height: 35px">查看一品图
                        </el-button>
                    </el-form-item>
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" style="width: 200px" placeholder="船号"></el-input>
                    </el-form-item>
                    <el-form-item label="口径">
                        <el-input v-model="koujing" style="width: 200px" placeholder="口径"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="lianxiren" style="width: 200px" placeholder="联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="批次">
                        <el-select
                            v-model="batch"
                            style="width: 200px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="批次">
                            <el-option
                                v-for="item in batchOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="接收日期">
                        <el-date-picker
                            v-model="jieshouriqi"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="接收日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="交付日期">
                        <el-date-picker
                            v-model="jiaofuriqi"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="beizhu" style="width: 200px" placeholder="备注"></el-input>
                    </el-form-item>
                    <el-form-item label="优先级">
                        <el-select
                            v-model="yxj"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="优先级">
                            <el-option
                                v-for="item in yxjOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="CODE">
                        <el-input v-model="code" style="width: 200px" placeholder="CODE"></el-input>
                    </el-form-item>
                    <el-form-item label="一贯号">
                        <el-input v-model="yiguanhao" style="width: 200px" placeholder="一贯号"></el-input>
                    </el-form-item>
                    <el-form-item label="涂装番号">
                        <el-input v-model="tuzhuangfanhao" style="width: 200px" placeholder="涂装番号"></el-input>
                    </el-form-item>
                    <el-form-item label="水试">
                        <el-input v-model="shuishi" style="width: 200px" placeholder="水试"></el-input>
                    </el-form-item>
                    <el-form-item label="处理方式">
                        <el-input v-model="chulifangshi" style="width: 200px" placeholder="处理方式"></el-input>
                    </el-form-item>
                    <el-form-item label="管种">
                        <el-input v-model="guanzhong" style="width: 200px" placeholder="管种"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="" v-if="this.num===2" style="height: 450px;overflow-y: auto">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" style="width: 200px" placeholder="船号"></el-input>
                    </el-form-item>
                    <el-form-item label="单元名称">
                        <el-input v-model="danyuanmingcheng" style="width: 200px" placeholder="单元名称"></el-input>
                    </el-form-item>
                    <el-form-item label="一贯号">
                        <el-input v-model="caizhi" style="width: 200px" placeholder="一贯号"></el-input>
                    </el-form-item>
                    <el-form-item label="外径">
                        <el-input v-model="waijing" style="width: 200px" placeholder="外径"></el-input>
                    </el-form-item>
                    <el-form-item label="壁厚">
                        <el-input v-model="bihou" style="width: 200px" placeholder="壁厚"></el-input>
                    </el-form-item>
                    <el-form-item label="根数">
                        <el-input v-model="genshu" style="width: 200px" placeholder="根数"></el-input>
                    </el-form-item>
                    <el-form-item label="长度">
                        <el-input v-model="changdu" style="width: 200px" placeholder="长度"></el-input>
                    </el-form-item>
                    <el-form-item label="图纸">
                        <el-input v-model="tuzhi" style="width: 200px" placeholder="图纸"></el-input>
                    </el-form-item>
                    <el-form-item label="预定日">
                        <el-date-picker
                            v-model="yudingri"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="拿图日">
                        <el-date-picker
                            v-model="naturi"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="完成日">
                        <el-date-picker
                            v-model="wanchengri"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="送出日">
                        <el-date-picker
                            v-model="songchuri"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <div class="" v-if="this.num===3 || this.num===4 || this.num===5" style="height: 450px;overflow-y: auto">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="管类型">
                        <el-select
                            v-model="pipeType"
                            disabled
                            style="width: 150px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="补做管类型">
                            <el-option
                                v-for="item in pipeTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" style="width: 200px" placeholder="船号"></el-input>
                    </el-form-item>
                    <el-form-item label="批次">
                        <el-select
                            v-model="batch"
                            style="width: 120px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="批次">
                            <el-option
                                v-for="item in batchOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="一贯号">
                        <el-input v-model="yiguanhao" style="width: 200px" placeholder="一贯号"></el-input>
                    </el-form-item>
                    <el-form-item label="code">
                        <el-input v-model="code" style="width: 200px" placeholder="code"></el-input>
                    </el-form-item>
                    <el-form-item label="申请人">
                        <el-input v-model="shenqingren" style="width: 200px" placeholder="申请人"></el-input>
                    </el-form-item>
                    <el-form-item label="紧急程度">
                        <el-select
                            v-model="yxj"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="优先级">
                            <el-option
                                v-for="item in yxjOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请时间">
                        <el-date-picker
                            v-model="shenqingtime"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doAdd(num)" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>

        <!--图纸弹出框 -->
        <el-dialog title="图纸录入" :visible.sync="drawingInputVisible" width="90%" @close='closeDialog'>
            <div class="" style="height: 450px;overflow-y: auto">
                <div class="drawingInputTop">
                    <label style="margin-right:5px">
                        <span>船号</span>
                        <span>:</span>
                        <el-input v-model="chuanhao"   style="width: 200px" placeholder="船号"></el-input>
                    </label>
                    <el-button type="primary" @click="drawingInputAdd()">新增</el-button>
                    <el-button type="success" @click="drawingInputSearch()">查询</el-button>
                    <el-button type="danger" @click="drawingInputDelete()">删除</el-button>
                </div>
                <div class="drawingInputBottom">
                    <div class="" v-if="this.drawingInputType ===1">
                        <el-table class="tb-edit"
                                  :data="tables"
                                  :key="2"
                                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'12px'}"
                                  border
                                  height="380"
                                  @select-all="selectAll"
                                  @select="selectList"
                                  highlight-current-row
                                  style="width: 98%;margin: auto">
                            <el-table-column
                                type="selection"
                                width="30">
                            </el-table-column>
                            <template v-for="(col ,index) in cols">
                                <el-table-column align="center" :prop="col.prop"
                                                 :label="col.label"></el-table-column>
                            </template>
                        </el-table>
                    </div>
                    <div class="" v-if="this.drawingInputType ===2">
                        <div class="drawingInputAddDiv">
                            <el-form ref="form" label-width="100px">
                                <el-form-item label="批次">
                                    <el-select
                                        v-model="batch"
                                        style="width: 120px"
                                        clearable
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="批次">
                                        <el-option
                                            v-for="item in batchOptions"
                                            @input="setDrawingInputPc(batch)"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="船号">
                                    <el-input v-model="chuanhao"   @input="setDrawingInputCh(chuanhao)" style="width: 200px" placeholder="船号"></el-input>
                                </el-form-item>
                                <el-form-item label="一贯号">
                                    <el-input v-model="yiguanhao"  @input="setDrawingInputYgh(yiguanhao)" style="width: 200px" placeholder="一贯号"></el-input>
                                </el-form-item>
                                <el-form-item label="code">
                                    <el-input v-model="code"  @input="setDrawingInputCode(code)" style="width: 200px" placeholder="code"></el-input>
                                </el-form-item>
                                <el-form-item label="图片">
                                    <el-upload
                                        v-loading="loading"
                                        element-loading-text="正在上传中"
                                        element-loading-spinner="el-icon-loading"
                                        element-loading-background="rgba(0, 0, 0, 0.8)"
                                        class="upload"
                                        ref="upload"
                                        :multiple='true'
                                        :drag='true'
                                        :data="drawingInputData"
                                        :action="drawingInputUploadUrl"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :on-success="uploadSuccess"
                                        :on-error="uploadFailure"
                                        :file-list="drawingInputFileList"
                                        :auto-upload="false">
                                        <el-button style="margin:80px 0 0 0;width: 150px;height: 30px;" slot="trigger" size="small"
                                                   type="primary">选取文件
                                        </el-button>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-button type="primary" @click="doDrawingInputAdd()">新增</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="" v-if="this.drawingInputType ===4">
                        <div class="drawingInputDeleteDiv">
                            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                            <span slot="footer" class="dialog-footer">
                <el-button @click="noDrawingInputDelete" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doDrawingInputDelete" style="height:30px;width:80px">确 定</el-button>
                       </span>
                        </div>

                    </div>
                </div>
            </div>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑按钮" :visible.sync="editVisible" width="50%" @close='closeDialog'>
            <div class="" v-if="this.num===0" style="height: 450px;overflow-y: auto">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="数据查询">
                        <div class="" style="display: flex">
                            <div class="" style="flex: 1">
                                <el-input v-model="quHua" style="width: 150px" placeholder="区划"></el-input>
                            </div>
                            <div class="" style="flex: 1">
                                <el-input v-model="systemNumber" style="width: 150px" placeholder="系统号"></el-input>
                            </div>
                            <div class="" style="flex: 1">
                                <el-button type="success" @click="doSearchHLG" style="width: 70px;height: 35px">查询
                                </el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="查看一品图">
                        <el-button type="danger" @click="seeYpt" style="width: 150px;height: 35px">查看一品图
                        </el-button>
                    </el-form-item>
                    <el-form-item label="优先级">
                        <el-select
                            v-model="yxj"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="优先级">
                            <el-option
                                v-for="item in yxjOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="CODE">
                        <el-input v-model="code" style="width: 200px" placeholder="CODE"></el-input>
                    </el-form-item>
                    <el-form-item label="一贯号">
                        <el-input v-model="yiguanhao" style="width: 200px" placeholder="一贯号"></el-input>
                    </el-form-item>
                    <el-form-item label="涂装番号">
                        <el-input v-model="tuzhuangfanhao" style="width: 200px" placeholder="涂装番号"></el-input>
                    </el-form-item>
                    <el-form-item label="水试">
                        <el-input v-model="shuishi" style="width: 200px" placeholder="水试"></el-input>
                    </el-form-item>
                    <el-form-item label="处理方式">
                        <el-input v-model="chulifangshi" style="width: 200px" placeholder="处理方式"></el-input>
                    </el-form-item>
                    <el-form-item label="管种">
                        <el-input v-model="guanzhong" style="width: 200px" placeholder="管种"></el-input>
                    </el-form-item>
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" style="width: 200px" placeholder="船号"></el-input>
                    </el-form-item>
                    <el-form-item label="批次">
                        <el-select
                            v-model="batch"
                            style="width: 200px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="批次">
                            <el-option
                                v-for="item in batchOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="口径">
                        <el-input v-model="koujing" style="width: 200px" placeholder="口径"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="lianxiren" style="width: 200px" placeholder="联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="接收日期">
                        <el-date-picker
                            v-model="jieshouriqi"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="接收日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="交付日期">
                        <el-date-picker
                            v-model="jiaofuriqi"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="beizhu" style="width: 200px" placeholder="备注"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="" v-if="this.num===2" style="height: 450px;overflow-y: auto">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" style="width: 200px" placeholder="船号"></el-input>
                    </el-form-item>
                    <el-form-item label="单元名称">
                        <el-input v-model="danyuanmingcheng" style="width: 200px" placeholder="单元名称"></el-input>
                    </el-form-item>
                    <el-form-item label="一贯号">
                        <el-input v-model="caizhi" style="width: 200px" placeholder="一贯号"></el-input>
                    </el-form-item>
                    <el-form-item label="外径">
                        <el-input v-model="waijing" style="width: 200px" placeholder="外径"></el-input>
                    </el-form-item>
                    <el-form-item label="壁厚">
                        <el-input v-model="bihou" style="width: 200px" placeholder="壁厚"></el-input>
                    </el-form-item>
                    <el-form-item label="根数">
                        <el-input v-model="genshu" style="width: 200px" placeholder="根数"></el-input>
                    </el-form-item>
                    <el-form-item label="长度">
                        <el-input v-model="changdu" style="width: 200px" placeholder="长度"></el-input>
                    </el-form-item>
                    <el-form-item label="图纸">
                        <el-input v-model="tuzhi" style="width: 200px" placeholder="图纸"></el-input>
                    </el-form-item>
                    <el-form-item label="预定日">
                        <el-date-picker
                            v-model="yudingri"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="拿图日">
                        <el-date-picker
                            v-model="naturi"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="完成日">
                        <el-date-picker
                            v-model="wanchengri"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="送出日">
                        <el-date-picker
                            v-model="songchuri"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <div class="" v-if="this.num===3 || this.num===4 || this.num===5" style="height: 450px;overflow-y: auto">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="管类型">
                        <el-select
                            v-model="pipeType"
                            disabled
                            style="width: 150px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="补做管类型">
                            <el-option
                                v-for="item in pipeTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="船号">
                        <el-input v-model="chuanhao" disabled style="width: 200px" placeholder="船号"></el-input>
                    </el-form-item>
                    <el-form-item label="批次">
                        <el-select
                            v-model="batch"
                            disabled
                            style="width: 120px"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="批次">
                            <el-option
                                v-for="item in batchOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="一贯号">
                        <el-input v-model="yiguanhao" disabled style="width: 200px" placeholder="一贯号"></el-input>
                    </el-form-item>
                    <el-form-item label="code">
                        <el-input v-model="code" disabled style="width: 200px" placeholder="code"></el-input>
                    </el-form-item>
                    <el-form-item label="申请人">
                        <el-input v-model="shenqingren" style="width: 200px" placeholder="申请人"></el-input>
                    </el-form-item>
                    <el-form-item label="紧急程度">
                        <el-select
                            v-model="yxj"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="优先级">
                            <el-option
                                v-for="item in yxjOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请时间">
                        <el-date-picker
                            v-model="shenqingtime"
                            align="right"
                            type="date"
                            style="width: 200px"
                            placeholder="交付日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit(num)" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="删除按钮" :visible.sync="delVisible" width="300px" center @close='closeDialog'>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false" style="height:30px;width:80px;margin-top: 20px">取 消</el-button>
                <el-button type="primary" @click="deleteRow" style="height:30px;width:80px ;margin-top: 20px">确 定</el-button>
            </span>
        </el-dialog>

        <!--新增弹出框 -->
        <el-dialog title="导入数据" :visible.sync="uploadVisible" width="60%" @close='closeDialog'>
            <div class="container" style="height:450px;overflow:auto">
                <div class="containerSelect"
                     style="height: 80px;
                     display: flex;
                     align-items: center;
                     justify-content: center">
                    <div class="select">
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>管类型</span>
                            <span>:</span>
                            <el-select
                                v-model="importPipeType"
                                @input="setImportPipeType(importPipeType)"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                style="width: 150px"
                                placeholder="管类型">
                                <el-option
                                    v-for="item in importPipeTypeOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </label>
                    </div>
                    <div class="select">
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>文件类型</span>
                            <span>:</span>
                            <el-select
                                v-model="fileType"
                                @input="setType(fileType)"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                style="width: 150px"
                                placeholder="文件类型">
                                <el-option
                                    v-for="item in fileTypeOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                                </el-option>
                            </el-select>
                        </label>
                    </div>
                    <div class="select">
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>批次</span>
                            <span>:</span>
                            <el-select
                                v-model="batch"
                                @input="setPc(batch)"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                style="width: 150px"
                                placeholder="批次">
                                <el-option
                                    v-for="item in batchOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </label>
                    </div>
                    <div class="select">
                        <label style="margin-right: 5px;margin-left: 5px">
                            <span>生产线</span>
                            <span>:</span>
                            <el-select
                                v-model="scx"
                                @input="setScx(scx)"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                style="width: 150px"
                                placeholder="生产线">
                                <el-option
                                    v-for="item in scxOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                                </el-option>
                            </el-select>
                        </label>
                    </div>
                </div>
                <div class="containerUp" style="display: flex;align-items: center;justify-content: center">
                    <el-upload
                        v-loading="loading"
                        element-loading-text="正在上传中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        class="upload"
                        ref="upload"
                        :multiple='true'
                        :drag='true'
                        :data="Data"
                        :action="uploadUrl"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess"
                        :on-error="uploadFailure"
                        :file-list="list"
                        :auto-upload="false">
                        <el-button style="margin:80px 0 0 0;width: 150px;height: 30px;" slot="trigger" size="small"
                                   type="primary">选取文件
                        </el-button>
                        <el-button style="width: 150px;height: 30px;" size="small"
                                   type="success"
                                   @click="submitUpload">上传到系统
                        </el-button>
                    </el-upload>
                </div>
            </div>
        </el-dialog>


        <!--导入文件详情 -->
        <el-dialog title="文件详情" :visible.sync="detailsVisible" width="90%" @close='closeDialog'>
            <div class="container" style="height:470px;overflow:auto">

            </div>
        </el-dialog>

        <!-- 失败信息返回框 -->
        <el-dialog title="导入失败信息提示" :visible.sync="errVisible" width="60%" @close='closeDialog'>
            <div class="container" style="height:450px;overflow:auto">
                <div class="containerErr">
                    <div class="">{{errList}}</div>
                    <div class="" v-for="(item,index) in errListData">{{item}}</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import Modal from '../../common/modal'
    import url from '../../assets/js/URL'

    export default {
        name: 'InformationImport',
        data() {
            return {
                message: '',          //弹出框信息
                HideModal: true,      //弹出框是否显示

                num: 0,                 //显示导航栏的index
                navBar: [
                    {"text": "合拢管"},
                    {"text": "售后管"},
                    {"text": "支架管"},
                    {"text": "客补管"},
                    {"text": "厂补管"},
                    {"text": "再加工管"},
                    {"text": "未出图"},
                ],          //显示导航栏的数据


                select_word: "",         //智能检索
                quHua: "",               //区划
                systemNumber: "",         //系统号
                codeNumber: "",           //区划

                uploadUrl: " " + url + "/fileupload/upload",
                drawingInputUploadUrl: " " + url + "/teshu/addShipCode",
                Data: {},
                drawingInputData:{},
                list: [],
                loading: false,
                drawingInputFileList:[],
                errList:"",
                errListData:[],

                cols: [],                //表头
                tableData: [],           //表数据
                id: "",                   //列表中的id
                listData: [],             //Id的数组
                addVisible: false,      //新增弹出框
                editVisible: false,     //编辑弹出框
                delVisible: false,      //删除弹出框

                uploadVisible: false,        //上传弹框
                detailsVisible: false,      //详情弹框
                errVisible: false,           //错误弹框
                drawingInputVisible:false,   //图纸的弹出框


                drawingInputType:1,          //图纸录入状态

                scx: "",                    //生产线
                scxOptions: [],             //生产线下拉列表

                status: "",                    //审批状态
                statusOptions: [],             //审批状态下拉列表

                fileType: "",                  //文件类型
                fileTypeOptions: [],           //文件类型下拉列表

                yxj: "",                    //优先级
                yxjOptions: [
                    {"name": "一般", "id": "0"},
                    {"name": "较急", "id": "1"},
                    {"name": "紧急", "id": "2"},
                ],                            //优先级下拉列表
                pipeType: "",                  //管子种类
                pipeTypeOptions: [
                    {"name": "客补管", "id": "3"},
                    {"name": "厂补管", "id": "5"},
                    {"name": "再加工管", "id": "4"}
                ],       //管子种类下拉列表

                importPipeType: "",                  //管子种类
                importPipeTypeOptions: [
                    {"name": "未出图", "id": "3"},
                    {"name": "售后管", "id": "4"}
                ],       //管子种类下拉列表

                batch: "",                      //批次
                batchOptions: [
                    {"name": "一般", "id": "0"},
                    {"name": "较急", "id": "1"},
                    {"name": "紧急", "id": "2"}
                ],                            //批次下拉列表


                //合拢管字段
                code: "",
                yiguanhao: "",
                yptUrl: "",
                tuzhuangfanhao: "",
                shuishi: "",
                chulifangshi: "",
                guanzhong: "",
                chuanhao: "",
                koujing: "",
                lianxiren: "",
                jieshouriqi: "",
                jiaofuriqi: "",
                beizhu: "",


                //支架管字段
                danyuanmingcheng: "",
                caizhi: "",
                waijing: "",
                bihou: "",
                changdu: "",
                genshu: "",
                yudingri: "",
                tuzhi: "",
                naturi: "",
                wanchengri: "",
                songchuri: "",


                //补做管字段
                shenqingren: "",
                shenqingtime: "",

            }
        },
        components: {Modal},
        mounted() {


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
        created() {
            this.getAdminState()

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
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "8"}),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "10"}),
                    ])
                        .then(axios.spread(function (batchOptions, scxOptions, typeOptions, statusOptions) {
                            that.batchOptions = batchOptions.data;
                            that.scxOptions = scxOptions.data;
                            that.fileTypeOptions = typeOptions.data;
                            that.statusOptions = statusOptions.data;
                            that.getList()
                        }));
                }
            },

            //底部导航跳转
            goToNavBar(index) {
                this.num = index;
                this.batch = "";
                this.scx = "";
                this.status = "";
                this.yiguanhao = "";
                this.codeNumber = "";
                this.cols = [];
                this.listData = [];
                this.getList();
            },

            //请求列表
            getList() {
                if (this.num === 0) {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "hlg"}),
                        axios.post(" " + url + "/teshu/helongList", {
                            "pici": this.batch,
                            "quhua": this.quHua,
                            "code": this.codeNumber,
                            "yiguanhao": this.yiguanhao,
                            "xitonghao": this.systemNumber
                        })
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }));

                }
                else if (this.num === 1) {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "filelist"}),
                        axios.post(" " + url + "/fileShenpi/getFileUploadList", {
                            "lineNo": that.scx,
                            "status": that.status,
                            "pici": that.batch
                        })
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }));
                }
                else if (this.num === 2) {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "zjg"}),
                        axios.post(" " + url + "/teshu/zhijiaList", {"pici": this.pici,})
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }));
                }
                else if (this.num === 3) {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "kbg"}),
                        axios.post(" " + url + "/teshu/KebuList", {
                            "type": "3",
                            "pici": this.pici,
                            "yiguanhao": this.yiguanhao,
                            "codeno": this.codeNumber
                        })
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data.data;
                        }));
                }
                else if (this.num === 4) {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "cbg"}),
                        axios.post(" " + url + "/teshu/KebuList", {
                            "type": "5",
                            "pici": this.pici,
                            "yiguanhao": this.yiguanhao,
                            "codeno": this.codeNumber
                        })
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data.data;
                        }));
                }
                else if (this.num === 5) {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "zjgg"}),
                        axios.post(" " + url + "/teshu/KebuList", {
                            "type": "4",
                            "pici": this.pici,
                            "yiguanhao": this.yiguanhao,
                            "codeno": this.codeNumber
                        })
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data.data;
                        }));
                }
                else if (this.num === 6) {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "filelist"}),
                        axios.post(" " + url + "/fileShenpi/getFileUploadList", {
                            "lineNo": that.scx,
                            "status": that.status,
                            "pici": that.batch
                        })
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }));
                }
            },

            //选择那个一个
            selectList(val) {
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


            //进行查询
            doSearch() {
                this.getList()
            },

            //合拢管查询
            doSearchHLG() {
                if (this.quHua && this.systemNumber) {
                    axios.post(" " + url + "/teshu/getHelongDetailByXitong", {
                        "quhua": this.quHua,
                        "xitonghao": this.systemNumber
                    })
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.code = res.data.data.codeno;
                                this.yiguanhao = res.data.data.yiguanhao;
                                this.yptUrl = url + "/" + res.data.data.yipintu;
                                this.tuzhuangfanhao = res.data.data.tuzhuangfanhao;
                                this.shuishi = res.data.data.shuishi;
                                this.chulifangshi = res.data.data.chulifangshi;
                                this.guanzhong = res.data.data.guanzhong;
                            }
                            else {
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch((err) => {
                            this.$message.warning(err);
                        })
                }
                else {
                    this.$message.warning(`区划和系统号不能为空`);
                }

            },

            //显示新增
            showAdd(index) {
                this.addVisible = true;
                if (index === 0) {
                    this.quHua = "";
                    this.systemNumber = "";
                    this.yxj = "";
                    this.code = "";
                    this.yiguanhao = "";
                    this.tuzhuangfanhao = "";
                    this.shuishi = "";
                    this.chulifangshi = "";
                    this.guanzhong = "";
                    this.chuanhao = "";
                    this.koujing = "";
                    this.batch = "";
                    this.lianxiren = "";
                    this.jieshouriqi = "";
                    this.jiaofuriqi = "";
                    this.beizhu = "";
                }
                else if (index === 2) {
                    this.chuanhao = "";
                    this.danyuanmingcheng = "";
                    this.caizhi = "";
                    this.waijing = "";
                    this.bihou = "";
                    this.changdu = "";
                    this.genshu = "";
                    this.yudingri = "";
                    this.tuzhi = "";
                    this.naturi = "";
                    this.wanchengri = "";
                    this.songchuri = "";
                }
                else if (index === 3) {
                    this.pipeType = "3";
                    this.batch = "";
                    this.chuanhao = "";
                    this.yiguanhao = "";
                    this.code = "";
                    this.shenqingren = "";
                    this.yxj = "";
                    this.shenqingtime = "";

                }
                else if (index === 4) {
                    this.pipeType = "5";
                    this.batch = "";
                    this.chuanhao = "";
                    this.yiguanhao = "";
                    this.code = "";
                    this.shenqingren = "";
                    this.yxj = "";
                    this.shenqingtime = "";
                }
                else if (index === 5) {
                    this.pipeType = "4";
                    this.batch = "";
                    this.chuanhao = "";
                    this.yiguanhao = "";
                    this.code = "";
                    this.shenqingren = "";
                    this.yxj = "";
                    this.shenqingtime = "";
                }
            },

            //进行新增
            doAdd(index) {
                if (index === 0) {
                    if (this.chuanhao && this.quHua && this.systemNumber && this.lianxiren && this.batch && this.jiaofuriqi &&
                        this.beizhu && this.yiguanhao && this.code && this.tuzhuangfanhao && this.shuishi && this.chulifangshi &&
                        this.guanzhong && this.jieshouriqi && this.yxj && this.koujing) {
                        axios.post(" " + url + "/teshu/addHelong",
                            {
                                "chuanhao": this.chuanhao,
                                "quhua": this.quHua,
                                "xitonghao": this.systemNumber,
                                "lianxiren": this.lianxiren,
                                "pici": this.batch,
                                "jiaofuriqi": this.jiaofuriqi,
                                "beizhu": this.beizhu,
                                "yiguanhao": this.yiguanhao,
                                "codeno": this.code,
                                "tuzhuangfanhao": this.tuzhuangfanhao,
                                "shuishi": this.shuishi,
                                "chulifangshi": this.chulifangshi,
                                "guanzhong": this.guanzhong,
                                "wanchengriqi": this.jieshouriqi,
                                "level": this.yxj,
                                "koujing": this.koujing
                            })
                            .then((res) => {
                                if (res.data.state === "1") {
                                    this.$message.success(`新增成功`);
                                    this.addVisible = false;
                                    this.batch = "";
                                    this.quHua = "";
                                    this.codeNumber = "";
                                    this.yiguanhao = "";
                                    this.systemNumber = "";
                                    this.getList();
                                }
                                else {
                                    this.$message.warning(res.data.message);
                                }

                            })
                            .catch((err) => {
                                this.$message.warning(err);
                            })
                    }
                    else {
                        this.$message.warning(`信息填写不完整`);
                    }

                }
                else if (index === 2) {
                    if (this.chuanhao && this.danyuanmingcheng && this.caizhi && this.waijing && this.bihou && this.changdu &&
                        this.genshu && this.yudingri && this.tuzhi && this.naturi && this.wanchengri && this.songchuri) {
                        axios.post(" " + url + "/teshu/addZhijia",
                            {
                                "chuanhao": this.chuanhao,
                                "danyuanmingcheng": this.danyuanmingcheng,
                                "caizhi": this.caizhi,
                                "waijing": this.waijing,
                                "bihou": this.bihou,
                                "changdu": this.changdu,
                                "genshu": this.genshu,
                                "yudingri": this.yudingri,
                                "tuzhi": this.tuzhi,
                                "naturi": this.naturi,
                                "wanchengri": this.wanchengri,
                                "songchuri": this.songchuri
                            })
                            .then((res) => {
                                if (res.data.state === "1") {
                                    this.$message.success(`新增成功`);
                                    this.addVisible = false;
                                    this.getList()
                                }
                                else {
                                    this.$message.warning(res.data.message);
                                }

                            })
                            .catch((err) => {
                                this.$message.warning(err);
                            })
                    }
                    else {
                        this.$message.warning(`信息填写不完整`);
                    }
                }
                else if (index === 3 || index === 4 || index === 5) {
                    if (this.chuanhao && this.pipeType && this.batch && this.yiguanhao && this.code && this.shenqingren && this.yxj && this.shenqingtime) {
                        axios.post(" " + url + "/teshu/addKebu",
                            {
                                "pici": this.batch,
                                "chuanhao": this.chuanhao,
                                "yiguanhao": this.yiguanhao,
                                "codeno": this.code,
                                "shenqingren": this.shenqingren,
                                "shenqingtime": this.shenqingtime,
                                "level": this.yxj,
                                "type": this.pipeType,
                            })
                            .then((res) => {
                                if (res.data.state === "1") {
                                    this.$message.success(`新增成功`);
                                    /* this.code="";
                                     this.yiguanhao="";*/
                                    this.addVisible = false;
                                    this.getList()
                                }
                                else {
                                    this.$message.warning(res.data.message);
                                }

                            })
                            .catch((err) => {
                                this.$message.warning(err);
                            })
                    }
                    else {
                        this.$message.warning(`信息填写不完整`);
                    }
                }
            },


            //显示修改
            showEdit(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                if (this.num === 0) {
                    axios.post(" " + url + "/teshu/helongDetail", {"id": this.id})
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.quHua = res.data.data.quhua;
                                this.systemNumber = res.data.data.xitonghao;
                                this.yxj = res.data.data.level;
                                this.code = res.data.data.codeno;
                                this.yiguanhao = res.data.data.yiguanhao;
                                this.tuzhuangfanhao = res.data.data.tuzhuangfanhao;
                                this.shuishi = res.data.data.shuishi;
                                this.chulifangshi = res.data.data.chulifangshi;
                                this.guanzhong = res.data.data.guanzhong;
                                this.chuanhao = res.data.data.chuanhao;
                                this.koujing = res.data.data.koujing;
                                this.batch = res.data.data.pici;
                                this.lianxiren = res.data.data.lianxiren;
                                this.jieshouriqi = res.data.data.wanchengriqi;
                                this.jiaofuriqi = res.data.data.jiaofuriqi;
                                this.beizhu = res.data.data.beizhu;
                            }
                            else {
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch((err) => {
                            this.$message.warning(err);
                        })
                }
                else if (this.num === 2) {
                    axios.post(" " + url + "/teshu/zhijiaDetail", {"id": this.id})
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.chuanhao = res.data.data.chuanhao;
                                this.danyuanmingcheng = res.data.data.danyuanmingcheng;
                                this.caizhi = res.data.data.caizhi;
                                this.waijing = res.data.data.waijing;
                                this.bihou = res.data.data.bihou;
                                this.changdu = res.data.data.changdu;
                                this.genshu = res.data.data.genshu;
                                this.yudingri = res.data.data.yudingri;
                                this.tuzhi = res.data.data.tuzhi;
                                this.naturi = res.data.data.naturi;
                                this.wanchengri = res.data.data.wanchengri;
                                this.songchuri = res.data.data.songchuri;
                            }
                            else {
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch((err) => {
                            this.$message.warning(err);
                        })
                }
                else if (this.num === 3 || this.num === 4 || this.num === 5) {
                    axios.post(" " + url + "/teshu/detailKebu", {"id": this.id})
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.batch = res.data.data.pici;
                                this.chuanhao = res.data.data.chuanhao;
                                this.yiguanhao = res.data.data.yiguanhao;
                                this.code = res.data.data.codeno;
                                this.shenqingren = res.data.data.shenqingren;
                                this.shenqingtime = res.data.data.shenqingtime;
                                this.yxj = res.data.data.level;
                                this.pipeType = res.data.data.type;
                            }
                            else {
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch((err) => {
                            this.$message.warning(err);
                        })
                }

            },

            //进行修改
            saveEdit(index) {
                if (index === 0) {
                    if (this.chuanhao && this.quHua && this.systemNumber && this.lianxiren && this.batch && this.jiaofuriqi &&
                        this.beizhu && this.yiguanhao && this.code && this.tuzhuangfanhao && this.shuishi && this.chulifangshi &&
                        this.guanzhong && this.jieshouriqi && this.yxj && this.koujing) {
                        axios.post(" " + url + "/teshu/updateHelong",
                            {
                                "id": this.id,
                                "chuanhao": this.chuanhao,
                                "quhua": this.quHua,
                                "xitonghao": this.systemNumber,
                                "lianxiren": this.lianxiren,
                                "pici": this.batch,
                                "jiaofuriqi": this.jiaofuriqi,
                                "beizhu": this.beizhu,
                                "yiguanhao": this.yiguanhao,
                                "codeno": this.code,
                                "tuzhuangfanhao": this.tuzhuangfanhao,
                                "shuishi": this.shuishi,
                                "chulifangshi": this.chulifangshi,
                                "guanzhong": this.guanzhong,
                                "wanchengriqi": this.jieshouriqi,
                                "level": this.yxj,
                                "koujing": this.koujing
                            })
                            .then((res) => {
                                if (res.data.state === "1") {
                                    this.$message.success(`修改成功`);
                                    this.editVisible = false;
                                    this.batch = "";
                                    this.quHua = "";
                                    this.codeNumber = "";
                                    this.yiguanhao = "";
                                    this.systemNumber = "";
                                    this.getList()
                                }
                                else {
                                    this.$message.warning(res.data.message);
                                }

                            })
                            .catch((err) => {
                                this.$message.warning(err);
                            })
                    }
                    else {
                        this.$message.warning(`信息填写不完整`);
                    }

                }
                else if (index === 2) {
                    if (this.chuanhao && this.danyuanmingcheng && this.caizhi && this.waijing && this.bihou && this.changdu &&
                        this.genshu && this.yudingri && this.tuzhi && this.naturi && this.wanchengri && this.songchuri) {
                        axios.post(" " + url + "/teshu/updateZhijia",
                            {
                                "id": this.id,
                                "chuanhao": this.chuanhao,
                                "danyuanmingcheng": this.danyuanmingcheng,
                                "caizhi": this.caizhi,
                                "waijing": this.waijing,
                                "bihou": this.bihou,
                                "changdu": this.changdu,
                                "genshu": this.genshu,
                                "yudingri": this.yudingri,
                                "tuzhi": this.tuzhi,
                                "naturi": this.naturi,
                                "wanchengri": this.wanchengri,
                                "songchuri": this.songchuri
                            })
                            .then((res) => {
                                if (res.data.state === "1") {
                                    this.$message.success(`修改成功`);
                                    this.editVisible = false;
                                    this.getList()
                                }
                                else {
                                    this.$message.warning(res.data.message);
                                }

                            })
                            .catch((err) => {
                                this.$message.warning(err);
                            })
                    }
                    else {
                        this.$message.warning(`信息填写不完整`);
                    }
                }
                else if (index === 3 || index === 4 || index === 5) {
                    if (this.chuanhao && this.pipeType && this.batch && this.yiguanhao && this.code && this.shenqingren && this.yxj && this.shenqingtime) {
                        axios.post(" " + url + "/teshu/updateKebu",
                            {
                                "id": this.id,
                                "shenqingren": this.shenqingren,
                                "shenqingtime": this.shenqingtime,
                                "level": this.yxj,
                                "type": this.pipeType,
                            })
                            .then((res) => {
                                if (res.data.state === "1") {
                                    this.$message.success(`修改成功`);
                                   /* this.code="";
                                    this.yiguanhao="";*/
                                    this.editVisible = false;
                                    this.getList()
                                }
                                else {
                                    this.$message.warning(res.data.message);
                                }

                            })
                            .catch((err) => {
                                this.$message.warning(err);
                            })
                    }
                    else {
                        this.$message.warning(`信息填写不完整`);
                    }
                }
            },


            //选择点击显示删除
            showDelete() {
                if (this.listData.length) {
                    this.delVisible = true;

                }
                else {
                    this.$message.warning(`选择要勾选的信息`);
                }
            },

            // 确定删除
            deleteRow() {
                if (this.num === 2) {
                    axios.post(" " + url + "/teshu/zhijiaDel",
                        {
                            "id": this.listData[0],
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success('删除成功');
                                this.delVisible = false;
                                this.getList()
                            }
                            else {
                                this.$message.warning(`删除失败`);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }


            },

            //显示特别流程导入
            showTBImport() {
                this.uploadVisible = true;
                this.batch = "";
                this.scx = "";
                this.fileType = "";
                this.importPipeType = "";
            },


            //删除
            doDelete(index) {
                if (index) {

                }


            },

            //查看一品图
            seeYpt() {


            },

            // 关闭对话框后清空数据
            closeDialog() {
                this.batch = "";
                this.quHua = "";
                this.codeNumber = "";
                this.systemNumber = "";
                this.scx = "";
                this.status = "";
                this.yiguanhao = "";
                this.listData = [];
            },

            //显示一品图录入
            drawingInput() {
                this.drawingInputVisible = true;
                this.listData = [];
                this.drawingInputType = 1;
                this.batch="";
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "chlr"}),
                    axios.post(" " + url + "/teshu/getShipCodeList", {"shipcode": this.chuanhao})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));

            },



            //设置导入数据类型
            setImportPipeType(importPipeType) {
                this.Data = {"lineNo": this.SCX, "type": this.type, "pici": this.pc, 'guanType': importPipeType}
            },

            //设置批次
            setPc(batch) {
                this.Data = {"lineNo": this.scx, "type": this.type, "pici": batch, 'guanType': this.importPipeType}
            },

            //设置类型
            setType(fileType) {
                this.Data = {"lineNo": this.scx, "type": fileType, "pici": this.pc, 'guanType': this.importPipeType}
            },

            //设置生产线
            setScx(scx) {
                this.Data = {"lineNo": scx, "type": this.type, "pici": this.batch, 'guanType': this.importPipeType}
            },
            //上传
            submitUpload() {
                if (this.batch && this.fileType && this.scx && this.importPipeType) {

                    this.$refs.upload.submit((data) => {
                        console.log(data)
                    });
                    this.loading = true;
                }
                else {
                    this.$message.warning(`批次,类型和生产线不能为空`);
                }
            },

            //文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                console.log(file);
            },

            //点击文件列表中已上传的文件
            handlePreview(file) {
                console.log(file);
            },

            //上传成功
            uploadSuccess(response, file, fileList) {
                if (response.state === "-1") {
                    this.errList = response.message;
                    this.errListData = response.errorList;
                    this.errVisible = true;
                    this.loading = false;
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "filelist"}),
                        axios.post(" " + url + "/fileShenpi/getFileUploadList", {
                            "lineNo": this.scx,
                            "status": this.status,
                            "pici": this.batch
                        })
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }));
                    setTimeout(() => {
                        that.uploadVisible = false;
                    }, 1000)
                }
                else {

                    this.$message.success(`上传成功`);
                    this.loading = false;
                    let that = this;
                    this.drawingInputSearch();
                    axios.all([
                        axios.post(" " + url + "/sys/showTableTitle", {"name": "filelist"}),
                        axios.post(" " + url + "/fileShenpi/getFileUploadList", {
                            "lineNo": this.scx,
                            "status": this.status,
                            "pici": this.batch
                        })
                    ])
                        .then(axios.spread(function (title, table) {
                            that.cols = title.data;
                            that.tableData = table.data;
                        }));
                    setTimeout(() => {
                        that.uploadVisible = false;
                    }, 1000)
                }


            },

            //上传失败
            uploadFailure(err, file, fileList) {
                console.log(err);
                this.$message.warning(`上传失败`);
                this.loading = false;
            },






            //设置一贯号
            setDrawingInputYgh(yiguanhao) {
                this.drawingInputData = {"pici":this.batch,"yiguanhao":yiguanhao ,"codehao":this.code,"shipcode":this.chuanhao}
                console.log(this.drawingInputData)
            },

            //设置批次
            setDrawingInputPc(batch) {
                this.drawingInputData ={"pici":batch,"yiguanhao":this.chuanhao ,"codehao":this.code,"shipcode":this.chuanhao}
                console.log(this.drawingInputData)
            },

            //设置船号
            setDrawingInputCh(chuanhao) {
                this.drawingInputData = {"pici":this.batch,"yiguanhao":this.chuanhao ,"codehao":this.code,"shipcode":chuanhao}
                console.log(this.drawingInputData)
            },

            //设置code
            setDrawingInputCode(code) {
                this.drawingInputData ={"pici":this.batch,"yiguanhao":this.chuanhao ,"codehao":code,"shipcode":this.chuanhao}
                console.log(this.drawingInputData)

            },






            //显示图纸新增
            drawingInputAdd() {
                this.drawingInputType = 2;
                this.batch = "";
                this.chuanhao = "";
                this.code = "";
                this.chuanhao = "";
            },


            //进行图纸新增
            doDrawingInputAdd(){
                let uJson ={"pici":this.batch,"yiguanhao":this.chuanhao ,"codehao":this.code,"shipcode":this.chuanhao};
                this.drawingInputData =uJson;
                if (this.batch && this.chuanhao && this.yiguanhao && this.code) {
                    console.log(this.drawingInputData)
                    this.$refs.upload.submit((data) => {
                        console.log(data)
                    });
                    this.loading = true;
                }
                else {
                    this.$message.warning(`批次,船号，一贯号，code号，和上传图片不能为空`);
                }
            },
            //图纸查询
            drawingInputSearch() {
                this.drawingInputType = 1;
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "chlr"}),
                    axios.post(" " + url + "/teshu/getShipCodeList", {"shipcode": this.chuanhao})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },

            //显示图纸删除
            drawingInputDelete() {
                if (this.listData.length>0) {
                    this.drawingInputType = 4

                }
                else {
                    this.$message.warning(`选择要勾选的信息`);
                }

            },

            //取消删除
            noDrawingInputDelete(){
                this.drawingInputType = 1;
                this.listData=[];
            },

            //图纸进行删除
            doDrawingInputDelete() {
                axios.post(" " + url + "/teshu/delShipCode", {"id": this.listData[0]})
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.$message.success('删除成功');
                            this.drawingInputSearch();
                        }
                        else {
                            this.$message.warning(`删除失败`);
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





    .InformationImport {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .container {
            .tabTop {
                display: flex;
                height: 50px;
                margin: 10px auto;
                .tabTop-div {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    cursor: pointer;
                }
                .red {
                    background-color: @color-background-d;
                }
            }
            .tabBottom {
                .tabBottomTemplate {

                    .handle-box {
                        height: 80px;
                        line-height: 80px;
                        padding-left: 20px;
                        .handle-input {
                            width: 300px;
                            display: inline-block;
                        }
                        .el-button {
                            width: 100px;
                            height: 30px;
                        }
                    }
                }

            }

        }
    }

    .drawingInputTop {
        padding-left: 5%;
        margin-bottom: 10px;
        .el-button {
            width: 80px;
            height: 35px;
        }
    }

    .drawingInputBottom {
        .drawingInputAddDiv{
            width: 100%;
            height: 100%;
            overflow: auto;
            padding-top: 3%;
            background-color: @color-F0;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            body .el-upload--text {
                height: 30px;
                width: 120px;
            }
        }
        .drawingInputDeleteDiv{
            width: 100%;
            height: 400px;
            overflow: auto;
            background-color: @color-F0;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

        }
        .el-button {
            width: 100px;
            height: 30px;
        }

    }


</style>
