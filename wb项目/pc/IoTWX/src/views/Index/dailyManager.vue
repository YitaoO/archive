<!-- 路由-工作台 -->
<template>
<el-row class="dailyManager-wrap" v-loading="loading">
  <el-col :span="4" class="wrap-tree primary-color-bg-white">
    <Tree :type="3"></Tree>
  </el-col>
  <el-col :span="20" class="over-height">
    <el-container class="padding-left over-height">
      <!-- 设备信息 -->
      <el-header class="header border primary-color-bg-white">
        <el-col :span="4">
          <div class="header-left">
            <p class="title">{{areaName}}</p>
            <p class="font-size-14 primary-color-02">{{deviceItem.location}}</p>
            <p></p>
          </div>
        </el-col>
        <el-col :span="17">
          <div class="grid-content bg-purple-light grid-list">
            <div class="stat-wrap grid-list-item" v-for="(item,index) in deviceItem.list" :key="index">
            
                <span class="stat-left icon" style="text-align: center;">
                  <el-progress type="circle" :percentage=item.percentage :width=80 :stroke-width="15" :class="index" :color="(index==0)?'#fd7762':(index==1)?'#6aa8ef':(index==2)?'#55d098':'#facc58'"></el-progress>              
                 </span>
                 <span class="stat-right">
                    <p class="title">{{item.name}}中</p>
                    <span>{{item.value}}</span>台
                  </span>
                 
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="header-right" v-if="deviceLists.length !=0">
            <p class="title"><span class="icon icon-01"></span><span class="title-name">严重</span><span class="count">{{deviceItem.severityCount}}</span></p>
            <p class="title"><span class="icon icon-02"></span><span class="title-name">一般</span><span class="count">{{deviceItem.ordinaryCount}}</span></p>
            <p class="title"><span class="icon icon-03"></span><span class="title-name">轻微</span><span class="count">{{deviceItem.hintCount}}</span></p>
          </div>
        </el-col>
      </el-header>
      <!-- 设备列表 -->
      <el-container class="center-wrap primary-color-bg-white over-height border">
        <el-header class="header-wrap boder-bottom">
          <el-row class="primary-color-03">
            <el-col :span="20" class="primary-color-02">设备情况</el-col>
            <el-col :span="4" class="top-icon">
              <span class="icon icon-left cursor-point" :class="type==0?'active':''" @click="bindModelBtn(0)"></span>
              <span class="line icon"></span>
              <span class="icon icon-right cursor-point" :class="type==1?'active':''" @click="bindModelBtn(1)"></span>

            </el-col>
          </el-row>
        </el-header>
        <el-main class="data-wrap over-height">
          <!-- view模式 -->
          <el-row class="view-wrap" v-if="type ==0">

            <el-col :span="windWidth>1700?4:6" class="view-item" v-for="(item) in deviceLists" :key="item.devId">
              <div class="item-top font-size-12">
                <span class="top-title primary-color-02 font-size-14" :title="item.devTypeName">{{item.devTypeName}}</span>
                <span v-if="item.status == 1 && item.status == 2" class="icon top-btn cursor-point"  @click="controlStatus(item)"></span>
              </div>
              <!-- 在线精密空调 -->
              <div v-if="item.status == 1 && item.devType == 1" class="item-center type1 primary-color-bg primary-color-white font-size-14 cursor-point" @click="toRemote(item.devId,item.status)">
                <el-row>
                  <el-col :span="10" class="center-left  text-center">
                    <div class="left-wrap">
                      <p class="left-num font-size-20">{{item.intoTem}}°</p>
                      <p class="left-title">当前温度</p>
                    </div>
                    <p class="left-num font-size-20">{{item.intoHum}}°</p>
                    <p class="left-title">当前湿度</p>
                  </el-col>
                  <el-col :span="14" class="center-right text-left">
                    <p>设定温度:{{item.template}}°</p>
                    <p>设定湿度:{{item.humidity}}%</p>
                    <p>模式:{{item.modelTypeName}}</p>
                    <p>风速:{{item.windSpeedType}}%</p>
                  </el-col>
                </el-row>
              </div>
              <!-- 在线中央空调 -->
              <div v-if="item.status == 1 && item.devType == 3" class="item-center type3 primary-color-bg primary-color-white font-size-14 cursor-point" @click="toRemote(item.devId,item.status)">
                <el-row>
                  <el-col :span="12" class="center-left  text-center">
                    <p class="left-num font-size-48">{{item.intoTem}}°</p>
                    <p class="left-title">当前温度</p>
                  </el-col>
                  <el-col :span="12" class="center-right text-left">
                    <p>设定温度:{{item.template}}°</p>
                    <p>模式:{{item.modelType == 0 ? '取暖' : item.modelType == 1 ? '制冷' : item.modelType == 2 ? '睡眠' : item.modelType == 3 ? '唤醒' : '关闭'}}</p>
                    <p>风速:{{item.windSpeedTypeName}}</p>
                  </el-col>
                </el-row>
              </div>
              <!-- 红外空调 -->
              <div v-if="item.status == 1 && item.devType == 2" class="item-center type3 primary-color-bg primary-color-white font-size-14 cursor-point" @click="toRemote(item.devId,item.status)">
                <el-col :span="10" class="center-left  text-center">
                    <div class="left-wrap">
                      <p class="left-num font-size-20">{{item.temperature}}°</p>
                      <p class="left-title">当前温度</p>
                    </div>
                    <p class="left-num font-size-20">{{item.humidity}}°</p>
                    <p class="left-title">当前湿度</p>
                  </el-col>
                  <el-col :span="14" class="center-right text-left" style="padding-top:30px;">
                    <p style="padding-left:8px;padding-bottom:8px;" v-for="(item) in item.deviceControls" v-if="item.pstate ==1" :key="item.countrolId">{{item.fcontrolName}}:{{item.controlName}}</p>
                  </el-col>
              </div>

              <div class="item-center over-wrap cursor-point" v-if="item.status != 1" @click="toRemote(item.devId,item.status,item.statusName)">
                <div class="over-center font-size-16">
                  <p class="icon" :class="'icon0'+item.status"></p>
                  <p class="title">{{item.status ==3?'离线中':item.status ==5?'维修中':item.status ==2?'已关机':item.status ==4?'停用中':''}}...</p>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- table模式 -->
          <el-table v-if="type ==1" :data="deviceLists" style="width: 100%;border-bottom:none;" height="calc(100% - 60px)">
            <el-table-column type="index" label="序号" min-width="60">
            </el-table-column>
            <el-table-column prop="devTypeName" label="设备名称" min-width="130">
            </el-table-column>
            <el-table-column prop="typeName" label="设备类型" min-width="100">
            </el-table-column>
            <el-table-column prop="template" label="设定温度(℃)" min-width="100">
            </el-table-column>
            <el-table-column prop="statusName" label="当前状态" min-width="80">
            </el-table-column>
            <el-table-column prop="intoTem" label="室内温度(℃)" min-width="100">
            </el-table-column>
            <el-table-column prop="humidity" label="当前湿度(%)" min-width="100">
            </el-table-column>
            <el-table-column prop="modelTypeName" label="工作模式" min-width="80">
            </el-table-column>
            <el-table-column prop="windSpeedTypeName" label="风机" min-width="60">
            </el-table-column>
            <el-table-column label="操作" min-width="80">
              <template slot-scope="scope">
                  <el-button size="mini" class="cursor-point" v-if="!!btnPromise && (scope.row.status ==1 || scope.row.status == 2 || scope.row.status ==5)" @click="toRemote(scope.row.devId,scope.row.status,scope.row.statusName)">设置</el-button>
                </template>
            </el-table-column>
          </el-table>
          <el-footer class="footer-wrap">
            <Pagination :child-option="pageOption"></Pagination>
          </el-footer>


        </el-main>

      </el-container>
    </el-container>
    <Dialog :dialogOption="dialogOption"></Dialog>
  </el-col>
</el-row>
</template>

<script>
// 组件 - 树
import Tree from "../Common/tree.vue";
// 功能 - 获取设备数据
import renderDviStaData from "@/components/Datas/renderDeviceState";

// 功能 - 控制空调
import ControlAir from "@/components/WebSocket/controlAir";

// 组件 - Dialog
import Dialog from "@/components/Dialog/dialog.vue";
// 组件 - 分页
import Pagination from "@/components/Pagination/pagination.vue";
export default {
  name: "IndexDailyManager",
  components: {
    Tree,
    Dialog,
    Pagination
  },
  data() {
    return {
      searchCondition: {
        //树
        areaId: "",
        devName: "",
        devId: null,
        devCode: "",
        status: null,
        devType: null,
        areaName: ""
      },
      type: 0, //0:传统；1:表格
      deviceItem: {}, //设备情况
      areaName: "",
      loading: true,
      pageOption: {
        page: 1,
        limit: 12,
        total: 0
      },
      deviceLists: [], //设备列表
      dialogOption: {
        //dialog配置
        dialogShow: false,
        warmExplain: "是否要对此设备操作？"
      },
      windWidth: 0, //屏幕宽度
      //按钮权限
      btnPromise:
        this.$store.state.promise.update == undefined
          ? false
          : this.$store.state.promise.update
    };
  },
  created() {
    let that = this;
    this.windWidth = document.body.clientWidth; //获取屏幕宽度

    this.$bus.$off("getFirstArea");
    // 监听树组件
    this.$bus.$on("getFirstArea", params => {
      if (params == null) {
        that.type = 1;
        this.loading = false;
        return;
      }

      this.searchCondition.areaId = params.areaId;
      this.areaName = params.areaName;

      // 获取设备信息
      renderDviStaData(this, this.searchCondition.areaId).then(function(
        deviceItem
      ) {
        that.deviceItem = deviceItem;
      });

      that.getDeviceMap();
    });
    // 监听分页组件
    this.$bus.$on("paginationChange", page => {
      that.pageOption.page = page;
      that.getDeviceMap();
    });

    // this.$bus.$off("webScoketListChange");
    // //webSocket监听
    // this.$bus.$on("webScoketListChange", datas => {
    //   this.deviceLists = [];
    //   this.deviceLists = datas;
    // });
  },
  methods: {
    // 获取区域设备
    getDeviceMap() {
      let that = this;
      this.$customAxios
        .get("device/selectByMap", {
          params: {
            userId: this.$cookies.getJSON("userInfo").UserID,
            areaId: this.searchCondition.areaId,
            page: this.pageOption.page,
            limit: this.pageOption.limit
          }
        })
        .then(resq => {
          that.pageOption.total = resq.total;
          that.renderData(resq.data).then(function(lists) {
            that.deviceLists = lists;
            that.loading = false;

            //初始化websocket
            let devIds = [];
            lists.forEach(function(item) {
              devIds.push(item.devId);
            });
            if (devIds.length > 0) {
              that.type = 0;
              ControlAir.init(devIds.join(), that, 2);
            } else {
              that.type = 1;
            }
          });
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
    //处理数据
    renderData(lists) {
      let that = this;
      let deviceList = [];
      return new Promise(function(resolve, rejece) {
        lists.forEach(function(item, key, items) {
          item.index = that.pageOption.page * (key + 1);
          deviceList.push(that.$utils.renderControlData(item));
        });
        resolve(deviceList);
      });
    },
    // tab模式切换
    bindModelBtn(index) {
      if (this.type == index) return;
      this.type = index;
    },
    // 跳转路由
    toRemote(devId, status, statusName) {
      let that = this;
      if (
        !!that.$store.state.promise.update ||
        !!that.$utils.isNull(that.$store.state.promise.update)
      ) {
        if (Number(status) == 1 || Number(status) == 2 || Number(status) == 5) {
          //开机，关机，维修（维修跳转不可编辑）
          that.$cookies.set("renderRouter", false, 7);
          that.$router.push({
            name: "IndexRemote",
            params: {
              devId: devId
            }
          });
        } else {
          //停用
          this.$ele.Notification({
            title: "警告",
            message: `设备${statusName}中,无法控制设备！`,
            type: "warning"
          });
          return;
        }
      } else {
        this.$ele.Notification({
          title: "警告",
          message: `暂无修改权限,请联系管理员！`,
          type: "warning"
        });
        return;
      }
    },
    destroyed() {},
    // 控制开关
    controlStatus(item) {
      this.dialogOption.dialogShow = true;
      this.dialogOption.warmExplain =
        item.status == 1 ? "是否要关机？" : "是否要开机？";

      this.$bus.$off("dialogConfim");
      this.$bus.$on("dialogConfim", () => {
        let params = {};

        switch (item.devType) {
          case 1: //精密空调
            params = {
              DevID: item.devId,
              colName: "col0",
              value: Number(item.status) == 1 ? `0` : `1`
            };
            break;
          case 2: //红外空调
            params = {
              DevID: item.devId,
              colName: "col12",
              value: Number(item.status) == 1 ? `0` : `1`
            };
            break;
          case 3: //中央空调
            if (Number(item.status) == 2) {
              //关机状态
              if (item.TimeControl == 1) {
                if (!this.enbaleControl(item)) {
                  this.$ele.Notification.error({
                    title: "错误",
                    message: `当前时间限制使用!`
                  });
                  return;
                }
              }
            }
            params = {
              DevID: item.devId,
              colName: "col1",
              value: Number(item.status) == 1 ? `0,#` : `1,#`
            };
            break;
          default:
        }
        params.mqttId = item.mqttId;
        this.loading = true;
        ControlAir.hindleControl(params);
      });
    },
    // 鼠标移入移出显示全部
    addText(text) {},
    enbaleControl(item) {
      // 是否允许开机
      let that = this;
      let datas = item;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.dailyManager-wrap {
  height: 100%;
  .wrap-tree {
    height: 100%;
  }
}

/* ------------------------------------------------------------
   头部样式
------------------------------------------------------------ */
.header {
  height: auto !important;
  padding-bottom: 10px;
  .header-left {
    .title {
      font-size: 26px;
      color: #292f2d;
      padding-top: 30px;
      padding-bottom: 5px;
    }
  }
  .stat-wrap {
    position: relative;

    .stat-left {
      padding-top: 20px;
      padding-left: 0;
    }
    .stat-right {
      text-align: center;
      display: inline-block;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 83px;
      height: 26px;
      color: #333;
      .title {
        font-size: 12px;
        color: #666666;
        padding-bottom: 10px;
      }
      span {
        font-size: 18px;
      }
    }
  }
  .header-right {
    padding-top: 20px;
    text-align: right;

    .title {
      font-size: 14px;
      color: #666;
      padding-bottom: 8px;
    }
    .icon {
      vertical-align: text-top;

      width: 13px;
      height: 16px;

      &.icon-01 {
        @include showGlobalImage("warm_level_high_icon");
      }
      &.icon-02 {
        @include showGlobalImage("warm_level_middle_icon");
      }
      &.icon-03 {
        @include showGlobalImage("warm_level_low_icon");
      }
    }
    .title-name {
      padding-left: 8px;
    }
    .count {
      padding-left: 4px;
      font-size: 22px;
      color: #333;
      width: 20px;
      display: inline-block;
    }
  }
}
/* ------------------------------------------------------------
   中心内容样式
------------------------------------------------------------ */
.center-wrap {
  margin-top: 20px;
  position: relative;
  header {
    line-height: 60px;
    .top-icon {
      position: relative;

      text-align: right;
      .icon {
        width: 25px;
        height: 25px;
        vertical-align: middle;

        &.icon-left {
          left: 0;
          @include showGlobalImage("dyMg_icon");
          &.active {
            @include showGlobalImage("dyMg_icon_active");
          }
        }
        &.icon-right {
          left: 30px;
          @include showGlobalImage("dyMg_table_icon");
          &.active {
            @include showGlobalImage("dyMg_table_icon_active");
          }
        }
      }
      .line {
        height: 25px;
        width: 1px;
        background: #f2f2f2;
      }
    }
  }
  footer {
    text-align: right;
    padding-top: 10px;
  }
}
.data-wrap {
  padding: 0 !important;
}
/* ------------------------------------------------------------
   视图样式
------------------------------------------------------------ */
.view-wrap {
  height: calc(100% - 50px);
  overflow: scroll;
  .view-item {
    padding: 10px 20px;
    border-right: 1px solid #dcdfe1;
    border-bottom: 1px solid #dcdfe1;

    .item-top {
      line-height: 35px;
      height: 35px;
      position: relative;
      .top-title {
        padding-right: 4px;
        width: 145px;
        display: inline-block;
        @include oneLine;
      }
      .top-btn {
        position: absolute;
        right: 0;
        top: 0;
        width: 32px;
        height: 32px;
        vertical-align: middle;
        @include showGlobalImage("statu_btn_on");
      }
    }
    .item-center {
      height: 130px;
      padding: 10px 8px;
      box-sizing: border-box;
      .center-right p {
        padding-bottom: 4px;
        font-size: 12px;
      }

      &.type1 {
        .center-left,
        .center-right {
          padding-top: 10px;
        }
      }

      &.type3 {
        .center-left,
        .center-right {
          padding-top: 20px;
        }
      }
    }
    .over-wrap {
      position: relative;
      background: #0b5c48;
      .over-center {
        display: inline-block;
        @include verHorCenter;
        height: 60px;
        text-align: center;
        .icon {
          &.icon02 {
            width: 40px;
            height: 40px;
            @include showGlobalImage("dyMg_statu_2_icon");
          }
          &.icon03 {
            width: 40px;
            height: 40px;
            @include showGlobalImage("dyMg_statu_3_icon");
          }
          &.icon04 {
            width: 40px;
            height: 40px;
            @include showGlobalImage("dyMg_statu_4_icon");
          }
          &.icon05 {
            width: 40px;
            height: 40px;
            @include showGlobalImage("dyMg_statu_5_icon");
          }
        }

        .title {
          color: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
}
.footer-wrap {
  position: absolute;
  height: 60px;
  bottom: 0;
  text-align: right;
  background: #fff;
  width: 100%;
}
</style>
