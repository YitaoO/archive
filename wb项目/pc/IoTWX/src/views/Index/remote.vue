<!-- 空调控制 -->
<template>
<div id="index-remote" class="over-height" v-loading="loading" element-loading-text="拼命更改中" element-loading-spinner="el-icon-loading">
  <!-- <el-container class="over-height"> -->
  <el-row class="remote-left over-height">
    <el-col :span="16" class="over-height">
      <!-- 中央空调 -->
      <div class="three-wrap over-height primary-color-bg-white border" v-if="deviceItem.devType ==3">
        <div class="left-header">
          <div class="header-device boder-bottom text-center" style="padding:4%;">
            <span class="icon"></span><br>
            <span class="font-size-28" style="color:#292f2d;">{{deviceItem.devName}}</span><br>
            <span class="title font-size-14">{{deviceItem.typeName}}</span>
          </div>
          <div class="header-statu">
            <p class="title primary-color-02 font-size-14">运行状态</p>

            <div class="statu-center statu-three" v-if="deviceItem.devType ==3">
              <el-row class="statu-item">
                <el-col :span="6" class="center-item">
                  <p class="item-data">{{deviceItem.statusName}}</p>
                  <p class="item-title">空调状态</p>
                </el-col>
                <el-col :span="6" class="center-item">
                  <p class="item-data">{{deviceItem.template}}℃</p>
                  <p class="item-title">温度</p>
                </el-col>
                <el-col :span="6" class="center-item">
                  <p class="item-data">{{deviceItem.HotHigh}}℃</p>
                  <p class="item-title">制热温度上限</p>
                </el-col>
                <el-col :span="6" class="center-item">
                  <p class="item-data">{{deviceItem.HotLow}}℃</p>
                  <p class="item-title">制热温度下限</p>
                </el-col>
              </el-row>
              <el-row class="statu-item">
                <el-col :span="6" class="center-item">
                  <p class="item-data">{{deviceItem.modelTypeName}}</p>
                  <p class="item-title">模式</p>
                </el-col>
                <el-col :span="6" class="center-item">
                  <p class="item-data">正常</p>
                  <p class="item-title">温度告警</p>
                </el-col>
                <el-col :span="6" class="center-item">
                  <p class="item-data">{{deviceItem.ColHigh}}℃</p>
                  <p class="item-title">冷温度上限</p>
                </el-col>
                <el-col :span="6" class="center-item">
                  <p class="item-data">{{deviceItem.ColLow}}℃</p>
                  <p class="item-title">冷温度下限</p>
                </el-col>
              </el-row>
              <el-row class="statu-item">
                <el-col :span="6" class="center-item">
                  <p class="item-data">{{deviceItem.windSpeedTypeName}}</p>
                  <p class="item-title">风机</p>
                </el-col>
              </el-row>
            </div>

          </div>
        </div>
      </div>
      <!-- 精密空调 -->
      <div class="one-wrap over-height " v-if="deviceItem.devType ==1">
        <div class="left-header primary-color-bg-white  border">
          <div class="header-device boder-bottom text-center" style="padding:2%;">
            <span class="icon"></span><br>
            <span class="title font-size-14">{{deviceItem.typeName}}</span>
          </div>
          <div class="header-statu">
            <p class="title primary-color-02 font-size-14">运行状态</p>

            <!-- 精密空调 -->
            <div class="statu-center statu-one" v-if="deviceItem.devType ==1">
              <el-row class="statu-item">
                <el-col :span="6" class="center-item">
                  空调状态<span>{{deviceItem.statusName}}</span>
                </el-col>
                <el-col :span="6" class="center-item">
                  回风温度<span>{{deviceItem.SetRetTemp}}℃</span>
                </el-col>
                <el-col :span="6" class="center-item">
                  加湿电流<span>{{deviceItem.GetHimiElec}}A</span>
                </el-col>
                <el-col :span="6" class="center-item">
                  A相电压<span>{{deviceItem.SetRetTemp}}A</span>
                </el-col>
              </el-row>
              <el-row class="statu-item">
                <el-col :span="6" class="center-item">
                  模式<span>{{deviceItem.modelTypeName}}</span>
                </el-col>
                <el-col :span="6" class="center-item">
                  回风湿度<span>{{deviceItem.SetRetHimi}}%</span>
                </el-col>
                <el-col :span="6" class="center-item">
                  电导率<span>{{deviceItem.GetConductivity}}S/m</span>
                </el-col>
                <el-col :span="6" class="center-item">
                  B相电压<span>{{deviceItem.GetVoltageB}}A</span>
                </el-col>
              </el-row>
              <el-row class="statu-item">
                <el-col :span="6" class="center-item">
                  风机状态<span>打开</span>
                </el-col>
                <el-col :span="6" class="center-item">
                  送风温度<span>{{deviceItem.SetSendTemp}}℃</span>
                </el-col>
                <el-col :span="6" class="center-item">
                  电网频率<span>{{deviceItem.GetGridFreq}}Hz</span>
                </el-col>
                <el-col :span="6" class="center-item">
                  C相电压<span>{{deviceItem.GetVoltageC}}V</span>
                </el-col>
              </el-row>
              <el-row class="statu-item">
                <el-col :span="6" class="center-item">
                  送风机转速<span>{{deviceItem.GetSpeed}}R/min</span>
                </el-col>
                <el-col :span="6" class="center-item">
                  送风湿度<span>{{deviceItem.SetSendHimi}}%</span>
                </el-col>
              </el-row>
            </div>

          </div>
        </div>
        <div class="warm-wrap primary-color-bg-white border primary-color-03 font-size-14">
          <p class="warm-title primary-color-02 ">告警状态</p>
          <div class="warm-has-wrap boder-bottom ">
            <p class="warm-has">
              <i class="el-icon-warning" style="height:18px;width:18px;color:#f47685;"></i>
              <span class="">共{{hasWarmList.length}}项报警  以下问题需要修复：</span>
            </p>
            <el-row class="warm-has-content clearfix">
              <el-col :span="6" class="center-item item" v-for="(item,index) in hasWarmList" :key="index">
                <span class="icon"></span>
                <span class="name">{{item.typeName}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="warm-no-content ">
            <div class="item" v-for="(item) in noWarmList" :key="item.dev">
              <span class="icon"></span>
              <span class="name">{{item.typeName}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 红外 -->
      <div class="three-wrap over-height primary-color-bg-white border" v-if="deviceItem.devType ==2">
        <div class="left-header">
          <div class="header-device boder-bottom text-center" style="padding:4%;">
            <span class="icon"></span><br>
            <span class="font-size-28" style="color:#292f2d;">{{deviceItem.devName}}</span><br>
            <span class="title font-size-14">{{deviceItem.typeName}}</span>
          </div>
          <div class="header-statu">
            <p class="title primary-color-02 font-size-14">运行状态</p>

            <div class="statu-center statu-three" v-if="deviceItem.devType ==2">
              <el-row class="statu-item">
                <el-col :span="8" class="center-item">
                  <p class="item-data">{{deviceItem.statusName}}</p>
                  <p class="item-title">状态</p>
                </el-col>
                <el-col :span="8" class="center-item">
                  <p class="item-data">{{deviceItem.temperature}}℃</p>
                  <p class="item-title">温度</p>
                </el-col>
                <el-col :span="8" class="center-item">
                  <p class="item-data">{{deviceItem.humidity}}RH</p>
                  <p class="item-title">湿度</p>
                </el-col>
              </el-row>
            </div>

          </div>
        </div>
      </div>

    </el-col>

    <el-col :span="8" class="over-height">
      <div class="remote-right over-height margin-left primary-color-bg-white border font-size-14">
        <p class="right-title primary-color-bg primary-color-white font-size-16">控制命令</p>
        <div class="right-wrap">

          <div class="right-center">
            <div class="item grid-list">
              <div class="item-left grid-list-item">设备状态</div>
              <div class="item-right grid-list-item">
                <el-switch :active-text="deviceItem.status == 5?'维修':'启用'" :active-value="deviceItem.status == 5" :inactive-value="deviceItem.status != 5" :data-id='1' active-color="#17b990" inactive-color="#999" @change="controlStatu()">
                </el-switch>
              </div>
            </div> 

            <!-- 精密控制单独控制 -->
            <div class="one-control" v-if="deviceItem.devType ==1  && deviceItem.status !==5">
              <div class="item grid-list"  v-if="deviceItem.status !==5">
                <div class="item-left grid-list-item">开关机</div>
                <div class="item-right grid-list-item">
                  <el-switch v-model="deviceItem.statusBoolean" active-color="#17b990" inactive-color="#999" @change="controlStatusOn()"></el-switch>
                </div>
              </div>
              <div class="item grid-list item-model">
                <div class="item-left grid-list-item">温度控制</div>
                <div class="item-right grid-list-item change-tem">
                  <span class="model-type" :class="deviceItem.modelType ==0?'active':''" @click="controlModel(0,1)">回风</span>
                  <span class="model-type" :class="deviceItem.modelType ==1?'active':''" @click="controlModel(1,1)">送风</span>
                </div>
              </div>
              <div class="item grid-list item-model">
                <div class="item-left grid-list-item">设定{{deviceItem.modelTypeName}}温度</div>
                <div class="item-right change-tem grid-list-item">
                  <span class="icon icon-reduce" @click="controlTemplate(0,0)"></span>
                  <el-input class="input" :data-type="0" :value="deviceItem.template" type="number" size="mini" @blur="controlTemplate"></el-input>℃
                  <span class="icon icon-add" @click="controlTemplate(1,0)"></span>
                </div>
              </div>
              <div class="item grid-list item-model">
                <div class="item-left grid-list-item">设定{{deviceItem.modelTypeName}}湿度</div>
                <div class="item-right change-tem grid-list-item">
                  <span class="icon icon-reduce" @click="controlTemplate(0,1)"></span>
                  <el-input class="input" :data-type="1" :value="deviceItem.humidity" size="mini" type="number" @blur="controlTemplate"></el-input>%

                  <span class="icon icon-add" @click="controlTemplate(1,1)"></span>
                </div>
              </div>

              <div class="item grid-list item-tabs grid-list primary-color-03">
                <div class="grid-list-item item-right tab-left" :class="warmTab==0?'active':''" @click="bindTab(0)">温度告警</div>
                <div class="grid-list-item tab-right" :class="warmTab==1?'active':''" @click="bindTab(1)">湿度告警</div>
              </div>
              <div class="item-warm font-size-14 text-center" v-if="warmTab ==0">
                <div class="item-type1 boder-bottom">
                  <p class="grid-list padding">
                    <span class="grid-list-item primary-color-04 text-left">送风温度告警</span>
                    <span class="grid-list-item primary-color-03 text-right">当温度大于{{deviceItem.getSendTempRank[0]}}℃小于{{deviceItem.getSendTempRank[1]}}℃时</span>
                  </p>
                  <p class="primary-color-03 text-right" style="padding-right:10px;">提示告警</p>
                  <div class="slider-wrap ">
                    <el-slider v-model="deviceItem.getSendTempRank" range show-stops :max="100" class="slider" @change="sliderChange1">
                    </el-slider>
                    <p class="grid-list title ">
                      <span class="grid-list-item text-left">0℃</span>
                      <span class="grid-list-item text-right">100℃</span>
                    </p>
                  </div>
                </div>
                <div class="item-type2 ">
                  <p class="grid-list padding">
                    <span class="grid-list-item primary-color-04 text-left">回风温度告警</span>
                    <span class="grid-list-item primary-color-03 text-right">当温度大于{{deviceItem.getRetTempRank[0]}}℃小于{{deviceItem.getRetTempRank[1]}}℃时</span>
                  </p>
                  <p class="primary-color-03 text-right" style="padding-right:10px;">提示告警</p>
                  <div class="slider-wrap ">
                    <el-slider v-model="deviceItem.getRetTempRank" range show-stops :max="100" class="slider" @change="sliderChange2">
                    </el-slider>
                    <p class="grid-list title ">
                      <span class="grid-list-item text-left">0℃</span>
                      <span class="grid-list-item text-right">100℃</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="item-warm grid-list text-center" v-if="warmTab ==1">
                <div class="item-type2 ">
                  <p class="grid-list padding">
                    <span class="grid-list-item primary-color-04 text-left">回风湿度告警</span>
                    <span class="grid-list-item primary-color-03 text-right">当湿度大于{{deviceItem.getRetHimiRank[0]}}%小于{{deviceItem.getRetHimiRank[1]}}%时</span>
                  </p>
                  <p class="primary-color-03 text-right" style="padding-right:10px;">提示告警</p>
                  <div class="slider-wrap ">
                    <el-slider v-model="deviceItem.getRetHimiRank" range show-stops :max="100" class="slider" @change="sliderChange3">
                    </el-slider>
                    <p class="grid-list title ">
                      <span class="grid-list-item text-left">0℃</span>
                      <span class="grid-list-item text-right">100℃</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
            <!-- 中央空调单独控制 -->
            <div class="one-control" v-if="deviceItem.devType ==3 && deviceItem.status !==5">
              <div class="item grid-list"  v-if="deviceItem.status !==5">
                <div class="item-left grid-list-item">开关机</div>
                <div class="item-right grid-list-item">
                  <el-switch v-model="deviceItem.statusBoolean" active-color="#17b990" inactive-color="#999" @change="controlStatusOn()"></el-switch>
                </div>
              </div>
              <div class="item grid-list">
                <div class="item-left grid-list-item">设定温度</div>
                <div class="item-right change-tem grid-list-item">
                  <span class="icon icon-reduce" @click="controlTemplate(0)"></span>
                  <el-input class="input" :value="deviceItem.template" size="mini" type="number" @blur="controlTemplate"></el-input>℃
                  <span class="icon icon-add" @click="controlTemplate(1)"></span>
                </div>
              </div>
              <div class="item grid-list item-model">
                <div class="item-left grid-list-item">模式</div>
                <div class="item-right change-tem grid-list-item">
                  <span class="model-type" :class="deviceItem.modelType ==0?'active':''" @click="controlModel(0,3)">制热</span>
                  <span class="model-type" :class="deviceItem.modelType ==1?'active':''" @click="controlModel(1,3)">制冷</span>
                  <span class="model-type" :class="deviceItem.modelType ==2?'active':''" @click="controlModel(2,3)">睡眠</span>
                  <span class="model-type" :class="deviceItem.modelType ==3?'active':''" @click="controlModel(3,3)">唤醒</span>
                  <span class="model-type" :class="deviceItem.modelType ==4?'active':''" @click="controlModel(4,3)">关闭</span>
                </div>
              </div>
              <div class="item grid-list item-model">
                <div class="item-left grid-list-item">风机</div>
                <div class="item-right change-tem grid-list-item">
                  <span class="model-type" :class="deviceItem.windSpeedType==2?'active':''" @click="controlWind(2)">高速</span>
                  <span class="model-type" :class="deviceItem.windSpeedType==1?'active':''" @click="controlWind(1)">中速</span>
                  <span class="model-type" :class="deviceItem.windSpeedType==0?'active':''" @click="controlWind(0)">低速</span>
                  <span class="model-type" :class="deviceItem.windSpeedType==3?'active':''" @click="controlWind(3)">自动速度</span>
                  <span class="model-type" :class="deviceItem.windSpeedType==4?'active':''" @click="controlWind(4)">关闭</span>
                </div>
              </div>

              <div class="item grid-list" v-if="deviceItem.modelType == 0 || deviceItem.modelType == 1">
                <div class="item-left grid-list-item">{{deviceItem.modelTypeName}}温度上限</div>
                <div class="item-right change-tem grid-list-item">
                  <el-input class="input" @blur="controlTemplateRank" type="number" :value="deviceItem.modelType == 0?deviceItem.HotHigh:deviceItem.ColHigh" data-type="0" size="mini"></el-input>℃
                </div>
              </div>
              <div class="item grid-list" v-if="deviceItem.modelType == 0 || deviceItem.modelType == 1">
                <div class="item-left grid-list-item">{{deviceItem.modelTypeName}}温度下限</div>
                <div class="item-right change-tem grid-list-item">
                  <el-input class="input" @blur="controlTemplateRank" type="number" :value="deviceItem.modelType == 0?deviceItem.HotLow:deviceItem.ColLow" data-type="1" size="mini"></el-input>℃
                </div>
              </div>
              <div class="item grid-list">
                <div class="item-left grid-list-item">时间段控制</div>
                <div class="item-right grid-list-item">
                  <el-switch v-model="deviceItem.TimeControl" :active-text="!!deviceItem.TimeControl?'开启':'关闭'" active-color="#17b990" inactive-color="#999" @change="controlTime">
                  </el-switch>
                </div>
              </div>
              <div class="item grid-list time-wrap" v-if="!!deviceItem.TimeControl">
                <i class="el-icon-success" :class="!!deviceItem.TimeOneCtrol?'active':''" @click="handleControlClear(1,deviceItem.TimeOneCtrol)"></i>
                <div class="item-left grid-list-item">时间段1</div>
                <div class="item-right grid-list-item">

                  <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeOneStart" value-format="HH:mm" format="HH:mm" placeholder="选择时间" @change="handleDateChange(1,0,deviceItem.TimeOneStart)">
                  </el-time-picker>至
                  <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeOneEnd" value-format="HH:mm" format="HH:mm" placeholder="选择时间" :picker-options="{minTime: '15:30'}" @change="handleDateChange(1,1,deviceItem.TimeOneEnd)">
                  </el-time-picker>
                </div>
              </div>
              <div class="item grid-list time-wrap" v-if="!!deviceItem.TimeControl">
                <i class="el-icon-success" :class="!!deviceItem.TimeTwoCtrol?'active':''" @click="handleControlClear(2,deviceItem.TimeTwoCtrol)"></i>
                <div class="item-left grid-list-item">时间段2</div>
                <div class="item-right grid-list-item">
                  <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeTwoStart" value-format="HH:mm" format="HH:mm" placeholder="选择时间" @change="handleDateChange(2,0,deviceItem.TimeTwoStart)">
                  </el-time-picker>至
                  <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeTwoEnd" value-format="HH:mm" format="HH:mm" placeholder="选择时间" @change="handleDateChange(2,1,deviceItem.TimeTwoEnd)">
                  </el-time-picker>
                </div>
              </div>
              <div class="item grid-list time-wrap" v-if="!!deviceItem.TimeControl">
                <i class="el-icon-success" :class="!!deviceItem.TimeThreeCtrol?'active':''" @click="handleControlClear(3,deviceItem.TimeThreeCtrol)"></i>
                <div class="item-left grid-list-item">时间段3</div>
                <div class="item-right grid-list-item">
                  <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeThreeStart" value-format="HH:mm" format="HH:mm" placeholder="选择时间" @change="handleDateChange(3,0,deviceItem.TimeThreeStart)">
                  </el-time-picker>至
                  <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeThreeEnd" value-format="HH:mm" format="HH:mm" placeholder="选择时间" @change="handleDateChange(3,1,deviceItem.TimeThreeEnd)">
                  </el-time-picker>
                </div>
              </div>
              <div class="item grid-list time-wrap" v-if="!!deviceItem.TimeControl">
                <i class="el-icon-success" :class="!!deviceItem.TimeFourCtrol?'active':''" @click="handleControlClear(4,deviceItem.TimeFourCtrol)"></i>
                <div class="item-left grid-list-item">时间段4</div>
                <div class="item-right grid-list-item">
                  <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeFourStart" value-format="HH:mm" format="HH:mm" placeholder="选择时间" @change="handleDateChange(4,0,deviceItem.TimeFourStart)">
                  </el-time-picker>至
                  <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeFourEnd" value-format="HH:mm" format="HH:mm" placeholder="选择时间" @change="handleDateChange(1,1,deviceItem.TimeFourEnd)">
                  </el-time-picker>
                </div>
              </div>
              <Dialog :dialogOption="dialogOption"></Dialog>
            </div>

            <!-- 红外单独控制 -->
            <div class="infrared-control" v-if="deviceItem.devType ==2 && deviceItem.status !==5">
              <div class="item grid-list" v-for="item in intraredConstrolList" :key="item.controlId">
                <div class="item-left grid-list-item">{{item.controlName}}</div>
                <div class="item-right grid-list-item">
                  <template v-if="item.status !=3">
                     <span size="small" class="model-type cursor-point" :class="btn.controlId==item.valueObj.countrolId?'active':''" v-for="btn in item.controlList" :key="btn.controlId" @click="infrBaseChange(btn)">{{btn.controlName}}</span>
                  </template>
                  <template v-if="item.status ==3">
                    
                     <el-select class="item-right2 temp-wrap" v-model="item.valueObj.controlNumber" @change="infrSelectChange(item)">
                        <el-option
                          v-for="btn in item.controlList"
                          :key="btn.controlId"
                          :label="btn.controlNumber"
                          :value="btn.controlNumber"  
                          >
                        </el-option>
                    </el-select>
                  </template>
                </div>
              </div>
              <div class="item grid-list">
                <div class="item-left grid-list-item">自控控制</div>
                <div class="item-right grid-list-item">
                  <el-switch v-model="deviceItem.constrolState" :active-text="!!deviceItem.constrolState?'开启':'关闭'" :active-value="true" :inactive-value="false"  active-color="#17b990" inactive-color="#999" @change="infrConstrolChange()">
                  </el-switch>
                </div>
              </div>
              <template v-if="!!deviceItem.constrolState">
              <div class="item grid-list time-wrap" >
                <div class="item-left grid-list-item">开始时间</div>
                <div class="item-right grid-list-item">
                   <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeStartHour" value-format="HH" format="HH" @change="infrTimeAndTempChange(0)">
                  </el-time-picker>
                  <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeStarMin" value-format="mm" format="mm" @change="infrTimeAndTempChange(1)">
                  </el-time-picker>
                </div>
                <el-select class="item-right2 grid-list-item" v-model="deviceItem.TimeStartState" @change="infrTimeStateChange(0)" >
                <el-option
                  v-for="item in deviceItem.timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">  
                </el-option>
              </el-select>
              </div>
              <div class="item grid-list time-wrap">
                <div class="item-left grid-list-item">结束时间</div>
                <div class="item-right grid-list-item">
                   <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeEndHour" value-format="HH" format="HH" @change="infrTimeAndTempChange(2)">
                  </el-time-picker>
                  <el-time-picker class="timer-wrap left" v-model="deviceItem.TimeEndMin" value-format="mm" format="mm" @change="infrTimeAndTempChange(3)">
                  </el-time-picker>
                </div>
                <el-select class="item-right2 grid-list-item" v-model="deviceItem.TimeEndState" @change="infrTimeStateChange(1)">
                <el-option
                  v-for="item in deviceItem.timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </div>
              <div class="item grid-list">
                <div class="item-left grid-list-item">温度上限</div>
                <div class="item-right change-tem grid-list-item">
                  <el-input class="input" type="number" :value="deviceItem.rankTop" data-type="0" size="mini" @blur="infrTempRankChange"></el-input>℃
                </div>
                <el-select class="item-right2 temp-wrap grid-list-item" v-model="deviceItem.rankTopState" @change="infrTimeStateChange(2)">
                <el-option
                  v-for="item in deviceItem.timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">  
                </el-option>
              </el-select>
              </div>
              <div class="item grid-list">
                <div class="item-left grid-list-item">温度下限</div>
                <div class="item-right change-tem grid-list-item">
                  <el-input class="input" type="number" :value="deviceItem.rankLow" data-type="1" size="mini" @blur="infrTempRankChange"></el-input>℃
                </div>
                <el-select class="item-right2 temp-wrap grid-list-item" v-model="deviceItem.rankLowState" @change="infrTimeStateChange(3)">
                <el-option
                  v-for="item in deviceItem.timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">  
                </el-option>
              </el-select>
              </div>
              </template>
              
            </div>
          </div>
        </div>
      </div>
    </el-col>

  </el-row>

</div>
</template>

<script>
// 功能 - 控制空调
import ControlAir from "@/components/WebSocket/controlAir";
// 功能 - 处理空调数据
import renderDataThree from "@/components/Datas/renderThreeData";
import renderDataOne from "@/components/Datas/renderOneData";
import renderDataIntrared from "@/components/Datas/renderInfraredData";
// 组件 - Dialog
import Dialog from "@/components/Dialog/dialog.vue";
// 功能 - 红外控制
import InfracreMinx from "./infraredConMinx.js";

export default {
  mixins: [InfracreMinx],
  name: "IndexRemote",
  components: {
    Dialog
  },
  data() {
    return {
      loading: true,
      devId: "",
      deviceItem: {},
      startOn: false, //设备状态（启用，维修）
      warmTab: 0, // 温湿告警
      hasWarmList: [], // 有告警列表
      noWarmList: [], // 无告警列表
      dialogOption: {
        //dialog配置
        dialogShow: false,
        warmExplain: "此操作会清空当前时间段,您是否要进行此操作？"
      },
      intraredConstrolList: [], //控制列表
      deviceOldItem: {}
    };
  },
  created() {
    this.devId = this.$route.params.devId;

    if (!this.$utils.isNull(this.devId)) {
      this.$cookies.set("wb_lot_web", this.devId, 7);
    }

    this.getData();

    //建立webSocket链接
    ControlAir.init(this.devId, this, 1);
  },

  methods: {
    //获取设备详情数据
    getData() {
      let that = this;
      this.$customAxios
        .get("device/getDeviceBydevId", {
          params: {
            devId: this.$cookies.getJSON("wb_lot_web")
          }
        })
        .then(resq => {
          this.loading = false;
          this.deviceOldItem = resq;
          this.deviceItem = that.$utils.renderControlData(resq);

          // 红外空调额外设置
          if (this.deviceItem.devType == 2) {
            this.getIntraredData(resq.devModel, this.deviceItem.deviceControls);
          }

          if (resq.devType == 1) {
            this.getWarnMsg();
          }
        })
        .catch(error => {});
    },
    //获取控制列表
    getIntraredData(devModel, deviceControlsList) {
      this.$customAxios
        .get("control/selectByMap2", {
          params: {
            devModel: devModel
          }
        })
        .then(resq => {
          this.intraredConstrolList = resq;
          this.intraredConstrolList.forEach(function(item) {
            item.valueObj = deviceControlsList[item.controlId];
          });
        })
        .catch(error => {});
    },
    //获取告警状态
    getWarnMsg() {
      let that = this;
      this.$customAxios
        .get("typeWarn/getWarnMsg", {
          params: {
            devId: this.devId
          }
        })
        .then(resq => {
          resq.forEach(function(item) {
            if (!!item.hasWarn) {
              that.hasWarmList.push(item);
            } else {
              that.noWarmList.push(item);
            }
          });
        })
        .catch(error => {});
    },
    /**
     * 基本事件绑定
     */
    bindTab(index) {
      this.warmTab = index;
    },

    /**
     * 控制逻辑
     */

    //开关事件处理(包含状态控制)
    controlStatusOn() {
      this.controlWebsocketStatus(Number(this.deviceItem.status) == 1 ? 0 : 1);
    },
    //状态控制
    controlStatu(e) {
      let that = this;
      let item = this.deviceItem;
      let oldItem = this.deviceOldItem;

      if (item.status != 1 && item.status != 2) {
        //开启)
        that.$customAxios
          .get("device/updateAndSendMessage", {
            params: {
              devId: item.devId,
              addr: oldItem.addr,
              gateWay: oldItem.gateWayPush,
              devStatus: 3,
              devModel: oldItem.devModel,
              mqttId: item.mqttId
            }
          })
          .then(resq => {
            that.$ele.Notification.success({
              title: "成功",
              message: `设备已离线，1分钟后若还没开机，请重试。`
            });
            that.deviceItem.statusName = "离线";
          });
      } else {
        //维修
        that.loading = true;
        that.$customAxios
          .post("device/updateDevice", {
            devId: item.devId,
            status: 5
          })
          .then(resq => {
            that.$ele.Notification.success({
              title: "成功",
              message: `设置成功！`
            });

            that.deviceItem = that.$utils.renderControlData(resq);
            that.loading = false;
            console.log(resq);
          });
      }
    },
    controlWebsocketStatus(status) {
      let item = this.deviceItem;
      let params = {};
      switch (item.devType) {
        case 1: //精密空调
          params = {
            DevID: this.devId,
            colName: "col0",
            value: status
          };
          break;
        case 2: //普通空调
          params = {
            DevID: this.devId,
            colName: "col1",
            value: `${status},#`
          };
          break;
        case 3: //中央空调
          if (Number(item.status) == 2) {
            //关机状态
            if (item.TimeControl == 1) {
              if (!this.enbaleControl()) {
                this.$ele.Notification.error({
                  title: "错误",
                  message: `当前时间限制使用!`
                });
                return;
              }
            }
          }
          params = {
            DevID: this.devId,
            colName: "col1",
            value: `${status},#`
          };
          break;
        default:
      }
      this.loading = true;
      ControlAir.hindleControl(params);
    },
    enbaleControl() {
      // 是否允许开机
      let that = this;
      let datas = that.deviceItem;
      let arrTime = [];
      let nowData = datas.nowData; //当前时间
      let enable = false;
      if (!!datas.TimeOneCtrol) {
        arrTime.push(that.addObj(datas.TimeOneStart, datas.TimeOneEnd));
      }
      if (!!datas.TimeTwoCtrol) {
        arrTime.push(that.addObj(datas.TimeTwoStart, datas.TimeTwoEnd));
      }
      if (!!datas.TimeThreeCtrol) {
        arrTime.push(that.addObj(datas.TimeThreeStart, datas.TimeThreeEnd));
      }
      if (!!datas.TimeFourCtrol) {
        arrTime.push(that.addObj(datas.TimeFourStart, datas.TimeFourEnd));
      }
      for (let i = 0; i < arrTime.length; i++) {
        if (
          that.$utils.checkdate(arrTime[i].start, nowData) &&
          !that.$utils.checkdate(arrTime[i].end, nowData)
        ) {
          //在范围内
          enable = true;
          break;
        }
      }
      return enable;
    },
    // 数组添加对象
    addObj(start, end) {
      return {
        start: start,
        end: end
      };
    },
    // 模式事件处理
    controlModel(index, type) {
      //index:当前要传的指令;type:空调类型
      if (index == this.deviceItem.modelType) return;
      let params = {};
      switch (Number(type)) {
        case 1:
          params = {
            DevID: this.devId,
            colName: "col9",
            value: index
          };
          break;
        case 3:
          params = {
            DevID: this.devId,
            colName: `col2`,
            value: `${index},#`
          };
          break;
        default:
      }
      this.loading = true;
      ControlAir.hindleControl(params);
    },

    // 风速事件处理
    controlWind(index) {
      if (index == this.deviceItem.windSpeedType) return;
      this.loading = true;
      ControlAir.hindleControl({
        DevID: this.devId,
        colName: `col1`,
        value: `#,${index}`
      });
    },
    /**
     * [controlTemplate 调温湿度事件处理]
     * @param  {[type]} index [0:减少,1:增加;input]
     * @param  {[type]} type  [精密空调:0:温度；1:湿度]
     * @return {[type]}       [description]
     */
    controlTemplate(index, type) {
      let that = this;
      let value = index;
      let deviceItem = that.deviceItem;
      let newTemp = !!(value instanceof Object)
        ? value.currentTarget.value
        : value == 0
          ? Number(deviceItem.template) - 1
          : Number(deviceItem.template) + 1;
      let params = {};
      if (deviceItem.devType == 1) {
        //精密空调
        if (type == null) {
          type = index.target.dataset.type;
        }
        let newHumb = !!(value instanceof Object)
          ? value.currentTarget.value
          : value == 0
            ? Number(deviceItem.humidity) - 1
            : Number(deviceItem.humidity) + 1;
        switch (Number(type)) {
          case 1: //湿度调节
            if (newHumb == that.deviceItem.humidity) return;
            if (
              newHumb < Number(deviceItem.colHumRange) ||
              newHumb > Number(deviceItem.hotHumRange)
            ) {
              that.warmDialog(
                `${Number(deviceItem.colTemRange)}%`,
                `${Number(deviceItem.hotTemRange)}%`
              );
              value.currentTarget.value = that.deviceItem.humidity;
              return;
            }
            break;
          default:
            //温度
            if (newTemp == that.deviceItem.template) return;
            if (
              newTemp < Number(deviceItem.colTemRange) ||
              newTemp > Number(deviceItem.hotTemRange)
            ) {
              that.warmDialog(
                `${Number(deviceItem.colTemRange)}℃`,
                `${Number(deviceItem.hotTemRange)}℃`
              );
              value.currentTarget.value = that.deviceItem.template;
              return;
            }
        }

        params = {
          DevID: that.devId,
          colName:
            Number(type) == 1
              ? "col2"
              : deviceItem.modelType == 0 ? "col1" : "col5",
          value: Number(type) == 1 ? newHumb * 10 : newTemp * 10
        };
      } else if (deviceItem.devType == 3) {
        //中央空调
        let range =
          deviceItem.modelType == 0
            ? deviceItem.hotTemRange
            : deviceItem.modelType == 1 ? deviceItem.colTemRange : "";
        if (newTemp == that.deviceItem.template) return;
        if (newTemp < Number(range[1]) || newTemp > Number(range[0])) {
          that.warmDialog(`${Number(range[1])}℃`, `${Number(range[0])}℃`);
          // value.currentTarget.value = that.deviceItem.template
          return;
        }

        params = {
          DevID: that.devId,
          colName: "col2",
          value: `#,${newTemp}`
        };
      }
      that.loading = true;
      ControlAir.hindleControl(params);
    },
    warmDialog(low, hign) {
      this.$ele.Notification.error({
        title: "错误",
        message: `调节范围应该在${low} - ${hign}范围内!`
      });
    },

    // 调温度上下限事件处理
    controlTemplateRank(e) {
      let value = e.currentTarget.value;
      let type = e.currentTarget.dataset.type; //0:上限;1:下限
      let oldValue = "";
      switch (Number(type)) {
        case 0:
          if (this.deviceItem.modelType == 0) {
            oldValue = this.deviceItem.HotHigh;
          } else {
            oldValue = this.deviceItem.ColHigh;
          }
          break;
        case 1:
          if (this.deviceItem.modelType == 0) {
            oldValue = this.deviceItem.HotLow;
          } else {
            oldValue = this.deviceItem.ColLow;
          }
          break;
        default:
      }

      if (oldValue == value) return;

      if (Number(value) < 10 || Number(value) > 30) {
        e.currentTarget.value = oldValue;
        this.$ele.Notification.warning({
          title: "错误",
          message: `取值范围为10℃-30℃,请输入有效的值!`
        });

        return;
      }
      this.loading = true;
      ControlAir.hindleControl({
        DevID: this.devId,
        colName: this.deviceItem.modelType == 0 ? "col5" : "col6",
        value: type == 0 || type == 2 ? `${value},#` : `#,${value}`
      });
    },
    //控制精密空调范围
    controlRank(objValue, type) {
      //values：改变的值;type：类型
      let rank = [];
      let value = objValue.value;
      let params = {
        DevID: this.devId,
        value: value * 10
      };
      switch (Number(type)) {
        case 0:
          if (objValue.index == 0) {
            //送风底温
            rank = [5, 20];
            params.colName = "col25";
          } else {
            //送风高温
            rank = [20, 45];
            params.colName = "col24";
          }
          if (!this.warmDialogOne(value, rank)) {
            this.deviceItem.getSendTempRank = [
              this.deviceItem.SetSendTempLow,
              this.deviceItem.SetSendTempHigh
            ];
            return;
          }
          break;
        case 1:
          if (objValue.index == 0) {
            //回风低温
            rank = [5, 28];
            params.colName = "col21";
          } else {
            //回风高温
            rank = [30, 55];
            params.colName = "col20";
          }
          if (!this.warmDialogOne(value, rank)) {
            this.deviceItem.getRetTempRank = [
              this.deviceItem.SetRetTempLow,
              this.deviceItem.SetRetTempHigh
            ];
            return;
          }
          break;

        case 2:
          if (objValue.index == 0) {
            //回风低湿
            rank = [10, 55];
            params.colName = "col23";
          } else {
            //回风高湿
            rank = [30, 90];
            params.colName = "col22";
          }
          if (!this.warmDialogOne(value, rank)) {
            this.deviceItem.getRetHimiRank = [
              this.deviceItem.SetRetHimiLow,
              this.deviceItem.SetRetHimiHigh
            ];
            return;
          }
          break;

        default:
      }

      this.loading = true;
      ControlAir.hindleControl(params);
    },
    // 时间段开启控制
    controlTime() {
      let value = !!this.deviceItem.TimeControl ? 1 : 0;
      this.loading = true;
      ControlAir.hindleControl({
        DevID: this.devId,
        colName: "col3",
        value: `#,${value}`
      });
    },
    choiceTime(data) {},
    /**
     * [更改时间段]
     * @param  {[type]} timeType [时间段:1,2,3,4]
     * @param  {[type]} sore [类型0:开始时间;1:结束时间]
     */
    handleDateChange: function(timeType, sore, value) {
      let that = this;
      let item = that.deviceItem;
      switch (timeType) {
        case 1:
          if (sore == 1) {
            if (!that.timeAlarm(item.TimeOneStart, value, sore)) {
              that.getData();
              return;
            }
          }
          break;
        case 2:
          if (sore == 1) {
            if (!that.timeAlarm(item.TimeTwoStart, value, sore)) {
              that.getData();
              return;
            }
          }
          break;
        case 3:
          if (sore == 1) {
            if (!that.timeAlarm(item.TimeThreeStart, value, sore)) {
              that.getData();
              return;
            }
          }
          break;
        case 4:
          if (sore == 1) {
            if (!that.timeAlarm(item.TimeFourStart, value, sore)) {
              that.getData();
              return;
            }
          }
          break;
        default:
      }
      let values = value.split(":");
      let params = {
        DevID: that.devId,
        colName:
          Number(timeType) == 1
            ? "col19"
            : Number(timeType) == 2
              ? "col20"
              : Number(timeType) == 3 ? "col21" : "col22",
        value:
          Number(sore) == 0
            ? `${values[0]},${values[1]},#,#`
            : `#,#,${values[0]},${values[1]}`
      };
      this.loading = true;
      ControlAir.hindleControl(params);
    },
    // 时间控制提示
    timeAlarm(timeStart, value, sore) {
      let that = this;
      if (!that.$utils.checkdate(timeStart, value) && sore == 1) {
        that.$ele.Notification.warning({
          title: "错误",
          message: `开始时间要大于结束时间!`
        });

        return false;
      }
      return true;
    },
    //还原控制时间
    handleControlClear(type, controlBooleam) {
      //是否清空
      if (!controlBooleam) return;

      this.dialogOption.dialogShow = true;
      this.$bus.$off("dialogConfim");
      this.$bus.$on("dialogConfim", () => {
        this.dialogShow = true;
        ControlAir.hindleControl({
          DevID: this.devId,
          colName:
            Number(type) == 1
              ? "col19"
              : Number(type) == 2
                ? "col20"
                : Number(type) == 3 ? "col21" : "col22",
          value: `0,0,0,0`
        });
      });
    },
    //温度告警提示
    warmDialogOne(value, rank) {
      if (value < rank[0] || value > rank[1]) {
        this.$ele.Notification.warning({
          title: "错误",
          message: `取值范围为${rank[0]}-${rank[1]},请输入有效的值!`
        });
        return false;
      }
      return true;
    },

    // 监听slider值的变化
    sliderChange1(arrValue) {
      //送风温度
      let rank = [
        this.deviceItem.SetSendTempLow,
        this.deviceItem.SetSendTempHigh
      ];
      this.controlRank(this.arrDiffValue(arrValue, rank), 0);
    },
    sliderChange2(arrValue) {
      //回风温度
      let rank = [
        this.deviceItem.SetRetTempLow,
        this.deviceItem.SetRetTempHigh
      ];
      this.controlRank(this.arrDiffValue(arrValue, rank), 1);
    },
    sliderChange3(arrValue) {
      //回风湿度
      let rank = [
        this.deviceItem.SetRetHimiLow,
        this.deviceItem.SetRetHimiHigh
      ];
      this.controlRank(this.arrDiffValue(arrValue, rank), 2);
    },
    arrDiffValue(arr1, arr2) {
      let newValue = {};
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
          newValue = arr1[i];
          return {
            index: i,
            value: newValue
          };
        }
      }
    }
  }
};
</script>
<style lang="scss"scoped>
#index-remote {
  .input {
    width: 60px;
    border: none !important;
  }

  .header-device {
    .title {
      display: inline-block;
      padding: 3px;
      color: #17b990;
      border-radius: 4px;
      border: solid 1px #17b990;
      margin-top: 10px;
    }
    .icon {
      width: 329px;
      height: 146px;
      @include showGlobalImage(remote_device_icon);
    }
  }
  .header-statu {
    padding: 0 10px;
    .title {
      padding: 15px 0;
    }
    .statu-item {
      padding-bottom: 20px;
    }
    .statu-center {
      .center-item {
        .item-data {
          color: #17b990;
          font-size: 22px;
          padding-bottom: 4px;
        }
        .item-title {
          color: #999999;
          font-size: 14px;
        }
      }
      &.statu-one {
        color: #999;
        font-size: 14px;
        span {
          padding-left: 8px;
          color: #17b990;
        }
      }
    }
  }
  .remote-right {
    position: relative;

    .right-title {
      // position: fixed;
      // top: 0;
      padding: 10px;
      height: 50px;
      line-height: 50px;
    }
    .right-wrap {
      height: calc(100% - 70px);
      position: relative;
    }
    .right-center {
      overflow: scroll;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: scroll;

      .item {
        height: 60px;
        line-height: 60px;
        border-bottom: solid 1px #dcdfe1;
        padding: 0 10px;
        .item-left {
          color: #666;
        }
        .item-right {
          text-align: right;
        }
        .change-tem {
          .icon {
            width: 32px;
            height: 32px;
            &.icon-add {
              @include showGlobalImage("remote_add_icon");
            }
            &.icon-reduce {
              @include showGlobalImage("remote_reduce_icon");
            }
          }
          .input {
            width: 60px;
            border: none !important;
          }
        }
      }
      // .item-model {
      .model-type {
        margin-right: 4px;
        font-size: 14px;
        padding: 5px 8px;
        background: #f5f5f5;
        color: #999;
        border-radius: 14px;
        &.active {
          background: #17b990;
          color: #fff;
        }
      }
      // }
    }
  }
}
.one-wrap {
  .left-header {
    height: 59%;
  }
  .warm-wrap {
    height: 40%;
    background: #fff;
    margin-top: 10px;
    padding: 15px;
    box-sizing: border-box;
    .warm-has-wrap {
      padding-bottom: 10px;
      .warm-title {
        padding: 5px 0;
      }
      .warm-has {
        padding: 15px 0;
      }
      .icon {
        background-color: #f47685;
      }
      .warm-has-content {
        color: #f47685;
      }
    }

    .warm-no-content {
      .item {
        padding-top: 10px;
        float: left;
        width: 25%;
        .icon {
          background-color: #17b990;
        }
      }
    }
    .item {
      .icon {
        vertical-align: middle;
        width: 4px;
        height: 4px;
        border-radius: 4px;
      }
      .name {
        vertical-align: middle;
        padding-left: 4px;
      }
    }
  }
}
.remote-right {
  .item-tabs {
    .tab-left {
      padding-right: 20px;
      &.active::after {
        right: 38px;
      }
    }
    .tab-right {
      padding-left: 20px;
      &.active::after {
        left: 38px;
      }
    }
    .active {
      position: relative;
      color: #17b990 !important;
      &.active::after {
        position: absolute;
        bottom: 0;
        width: 22px;
        height: 7px;
        background: #17b990;
        content: "";
      }
    }
  }
}
/* ------------------------------------------------------------
   滑块样式
------------------------------------------------------------ */
.slider-wrap {
  width: 100%;
  .title {
    padding: 0 12px 15px;
    // width: 10%;
  }
  .slider {
    padding: 30px 0 0;
    width: 92%;
    display: inline-block;
  }
}
/* ------------------------------------------------------------
   时间段样式
------------------------------------------------------------ */
.timer-wrap {
  width: 100px !important;
  &.left {
    padding-right: 10px;
  }
  &.right {
    padding-left: 10px;
  }
}
.time-wrap {
  .active {
    color: #17b990;
  }
}
/* ------------------------------------------------------------
   红外样式
------------------------------------------------------------ */
.infrared-control {
  .timer-wrap {
    width: 80px !important;
  }
  .temp-wrap {
    padding-left: 15px;
  }
  .item-right2 {
    width: 100px;
  }
  .model-type {
    margin-right: 10px !important;
  }
}
</style>
