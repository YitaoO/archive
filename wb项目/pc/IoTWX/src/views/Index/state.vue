<!-- 实时情况 -->
<template>
<div id="index-state" v-loading="loading">
  <el-row style="height:100%;">
    <el-col :span="18" style="height:100%;">
      <el-container style="height:100%;">
        <el-header class="header-wrap border primary-color-bg-white">
          <div class="state-statistics">
            <p class="primary-color-02 font-size-14">设备情况</p>
            <div class="statistics-wrap grid-list">
              <div class="stat-wrap grid-list-item" v-for="(item,index) in deviceItem.list" :key="index">
            
                <span class="stat-left icon" style="text-align: center;">
                  <el-progress type="circle" :percentage=item.percentage :width=86 :stroke-width="15" :class="index" :color="(index==0)?'#fd7762':(index==1)?'#6aa8ef':(index==2)?'#55d098':'#facc58'"></el-progress>              
                 </span>
                 <span class="stat-right">
                    <p class="title">{{item.name}}中</p>
                    <span>{{item.value}}</span>台
                  </span>
                 
            </div>
            </div>
          </div>
        </el-header>
        <el-main class="state-map border primary-color-bg-white">
          <p class="map-title primary-color-02 font-size-14">我的区域</p>
          <div class="map-wrap">
            <BaiduMap :mapSearch="searchShow"></BaiduMap>
          </div>
        </el-main>
      </el-container>

    </el-col>
    <el-col :span="6" style="height:100%;">
      <div class="state-tabs border primary-color-bg-white ">
        <div class="tabs-btn boder-bottom">
          <el-row class="btn-wrap">
            <el-col :span="12">
              <div :class="{active:0 == tabIndex}" class="grid-content bg-purple cursor-point" @click="tabClick(0)">待办事项</div>
            </el-col>
            <el-col :span="12">
              <div :class="{active:1 == tabIndex}" class="grid-content bg-purple-light cursor-point" @click="tabClick(1)">实时告警</div>
            </el-col>
          </el-row>
        </div>
        <div class="tabs-content" v-bind:style="{height:Style.tabItemheight+'px'}" v-loading="tabLoading">

          <!-- 待办事项  -->
          <div v-if="tabIndex==0" class="content-workOrder tab-lists">
            <div class="work-list cursor-point font-size-14 primary-color-03" v-for="(item,index) in workOrderList" :key="index" @click="handleWorkOrder(item.kid)">
              <div class="grid-list item-top" style="padding-bottom:5px;">
                <p class="grid-list-item top-icon"> <span class="icon icon-repair"></span></p>

                <span class="grid-list-item top-title">维修单</span>
                <span class="grid-list-item top-des"><span class="">待处理</span></span>
              </div>
              <div class="item-bottom" style="width:130px">
                <p class="bottom-des primary-color-02 font-size-18">{{item.description}}</p>
                <p class="bottom-title">{{item.title}}</p>
              </div>
            </div>

          </div>
          <!-- 实时告警  -->
          <div v-if="tabIndex==1" class="content-wrarm tab-lists">
            <div class="work-list font-size-14 primary-color-03" v-for="(item) in warmList" :key="item.warnLevelId">
              <div class="grid-list item-top" style="padding-bottom:5px;">
                <p class="grid-list-item top-icon"> <span :class="'warmLevel'+item.warnLevelId" class="icon icon-warm"></span></p>

                <span class="grid-list-item top-title">{{item.warnLevel}}</span>
                <span class="grid-list-item top-des">{{item.warnDt}}</span>
              </div>
              <div class="item-bottom" style="width:130px">
                <p class="bottom-des primary-color-02 font-size-18">{{item.devName}}</p>
                <p class="bottom-title">{{item.content}}</p>
                <!-- <p class="bottom-address  oneLine">{{item.title}}</p> -->
              </div>
            </div>

          </div>
        </div>
        <div class="work-btn" :class="!tabOverData?'cursor-point':''" @click="btnMore()">{{!!tabOverData?'没有更多数据了':'更多'}}</div>
      </div>
    </el-col>
  </el-row>
</div>
</template>
<script>
// 功能 - 获取设备数据
import renderDviStaData from "@/components/Datas/renderDeviceState";
// 组件 - 百度地图
import BaiduMap from "../../components/BaiduMap/baiduMap";
export default {
  name: "IndexState",
  components: {
    BaiduMap
  },
  data() {
    return {
      Style: {
        tabItemheight: 0,
        scrollTop: 0
      },
      paramsModelWK: {
        //待办事项分页模式
        total: 0,
        page: 1,
        limit: 10
      },
      paramsModelWM: {
        //实时告警分页模式
        total: 0,
        page: 1,
        limit: 10
      },
      noMoreData: false,
      deviceItem: {}, //设备情况
      warmList: [], //实时告警列表
      workOrderList: [], //待办事项列表
      tabIndex: 0,
      centerPoint: {},
      markerPoint: [],
      loading: true,
      tabLoading: false,
      searchShow: false, //map搜索显示
      tabOverData: false, //tab数据
      mapFilterIndex: 0, //筛选index
      mapFilterSpread: true //筛选是否展开
    };
  },
  mounted() {
    let that = this;
    // 获取设备信息
    renderDviStaData(this).then(function(deviceItem) {
      that.deviceItem = deviceItem;
      that.loading = false;
    });
    this.getAreaMap();
    this.getWorkOrderData();
    this.getwarnMapData();

    this.getStyle();

    //监听marker点击
    that.$bus.$on("areaId", areaId => {
      console.log(areaId);
    });
  },
  methods: {
    // 获取区域
    getAreaMap(index) {
      let that = this;
      that.$customAxios
        .get("area/getAreaDeviceStatus", {
          //获取我的区域数据
          params: {
            userId: that.$cookies.getJSON("userInfo").UserID,
            showStatus: index > 0 ? index : 0
          }
        })
        .then(resq => {
          if (resq.length == 0) return;
          that.$bus.$emit("mapMarkers", resq);
        })
        .catch(error => {});
    },
    // 实时告警
    getwarnMapData() {
      let that = this;
      that.$customAxios
        .get("warnmsg/selectByMap", {
          params: {
            userId: that.$cookies.getJSON("userInfo").UserID,
            end: false,
            page: that.paramsModelWM.page,
            limit: that.paramsModelWM.limit
          }
        })
        .then(resq => {
          that.paramsModelWM.total = resq.total;
          resq.data.forEach(function(item) {
            that.warmList.push(item);
          });
          that.bindNoMore(that.tabIndex);
        })
        .catch(error => {});
    },
    // 待办事项
    getWorkOrderData() {
      let that = this;
      that.$customAxios
        .get("workOrder/selectByMap", {
          params: {
            userId: that.$cookies.getJSON("userInfo").UserID,
            tabCard: 2,
            page: that.paramsModelWK.page,
            limit: that.paramsModelWK.limit,
            status: 1
          }
        })
        .then(resq => {
          that.paramsModelWK.total = resq.total;
          resq.data.forEach(function(item) {
            that.workOrderList.push(item);
          });
          that.bindNoMore(that.tabIndex);
        })
        .catch(error => {});
    },
    // tab切换
    tabClick(index) {
      this.tabIndex = index;
      this.$store.state.indexStateTabIndex = index;
      this.tabOverData = false;
      this.bindNoMore(index);
    },
    // 筛选展开隐藏
    handleSpread() {
      this.mapFilterSpread = !!this.mapFilterSpread ? false : true;
    },
    //筛选
    handleFilter(index) {
      this.mapFilterIndex = index;
      this.getAreaMap(index);
    },
    //加载更多
    btnMore() {
      if (!!this.tabOverData) {
        return;
      }

      if (this.tabIndex == 0) {
        //待办事项
        this.paramsModelWK.page++;
        let el = document.getElementsByClassName("tab-lists")[0];
        el.scrollTop = this.Style.tabItemheight * this.paramsModelWK.page;
        this.getWorkOrderData();
      } else {
        //实时告警
        this.paramsModelWM.page++;
        let el = document.getElementsByClassName("tab-lists")[0];
        el.scrollTop = this.Style.tabItemheight * this.paramsModelWM.page;
        this.getwarnMapData();
      }
    },
    bindNoMore() {
      let page =
        this.tabIndex == 0 ? this.paramsModelWK.page : this.paramsModelWM.page;
      let limit =
        this.tabIndex == 0
          ? this.paramsModelWK.limit
          : this.paramsModelWM.limit;
      let total =
        this.tabIndex == 0
          ? this.paramsModelWK.total
          : this.paramsModelWM.total;
      if (page * limit > total) {
        this.tabOverData = true;
      }
    },
    // tab切换样式修改
    getStyle() {
      let allHeight = document.getElementsByClassName("state-tabs")[0]
        .offsetHeight;
      let tabsHeight = document.getElementsByClassName("tabs-btn")[0]
        .offsetHeight;
      let btnHeight = document.getElementsByClassName("work-btn")[0]
        .offsetHeight;

      // 设置滚动条高度
      this.Style.tabItemheight = `${allHeight - tabsHeight - btnHeight}`;
    },
    // 路由 - 添加修改工单
    handleWorkOrder(kid) {
      this.$router.push({
        name: "MessageWorkOrderEdit",
        params: {
          type: 2,
          kid: kid
        }
      });
    }
  }
};
</script>
<style lang="scss"scoped>
#index-state {
  height: 100%;
}
/* ------------------------------------------------------------
   设备情况
------------------------------------------------------------ */
.header-wrap {
  height: 155px !important;
  padding: 20px;
}
.stat-wrap {
  position: relative;

  .stat-left {
    padding-top: 20px;
    padding-left: 20px;
  }
  .stat-right {
    text-align: center;
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 110px;
    height: 26px;
    color: #333;
    .title {
      font-size: 14px;
      color: #666666;
      padding-bottom: 10px;
    }
    span {
      font-size: 22px;
    }
  }
}
/* ------------------------------------------------------------
   我的区域
------------------------------------------------------------ */
.state-map {
  overflow: hidden;
  height: 100%;
  @include list-margin-top;
  .map-wrap {
    padding: 20px 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    .map-tab {
      position: absolute;
      top: 35px;
      left: 15px;
      li {
        padding: 20px 30px;
        text-align: center;
        position: relative;

        &.active {
          .count {
            color: #17b990;
          }
          .title {
            color: #17b990;
          }
        }
      }
      li::after {
        height: 1px;
        width: 50px;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        position: absolute;
        content: "";
        background: #dcdfe1;
      }

      .count {
        font-size: 18px;
        color: #666;
        padding-bottom: 5px;
      }
      .title {
        font-size: 14px;
        color: #999;
      }
      .btn {
        text-align: center;
        padding: 12px 20px;
        color: #17b990;
        font-size: 14px;
      }
    }
  }
}
/* ------------------------------------------------------------
   tabs切换
------------------------------------------------------------ */
.state-tabs {
  height: 100%;
  margin-left: 10px;
  position: relative;
}
.tabs-btn {
  // position: absolute;
  // top: 0;
  // width: 100%;
  padding: 15px;
  text-align: center;
  color: #999;
  font-size: 14px;
  height: 45px;
  line-height: 45px;
  background: #fff;
  .btn-wrap {
    border: solid 1px #e5e6e7;
  }
  .active {
    background: #17b990;
    color: #fff;
  }
}
.tabs-content {
  width: 100%;
  position: relative;
  overflow: hidden;
  .tab-lists {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}

.work-list {
  padding: 20px;
  border-bottom: solid 1px #dcdfe1;
  .work-item {
    padding: 20px 0;
  }
  .item-bottom {
    padding-left: 30px;
    padding-top: 8px;
    .bottom-des {
      padding-bottom: 5px;
    }
    .bottom-title {
      padding-bottom: 7px;
    }
    p {
      @include oneLine;
    }
  }
  .item-top {
    .top-title {
      text-align: left;
      width: 100px;
      @include oneLine;
    }
    .top-icon {
      width: 30px;
      .icon-repair {
        width: 23px;
        height: 23px;
        @include showGlobalImage("index_state_repire_icon");
      }
      .icon-warm {
        width: 13px;
        height: 16px;
        &.warmLevel1 {
          @include showGlobalImage("warm_level_low_icon");
        }
        &.warmLevel2 {
          @include showGlobalImage("warm_level_middle_icon");
        }
        &.warmLevel3 {
          @include showGlobalImage("warm_level_high_icon");
        }
      }
    }
    .top-des {
      // width: 60px;
      text-align: right;
      span {
        border: solid 1px #f45454;
        border-radius: 4px;
        color: #f45454;
        padding: 4px;
      }
    }
  }
}
.work-btn {
  height: 52px;
  line-height: 52px;
  color: #16bb99;
  border-top: solid 1px #dcdfe1;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.element::-webkit-scrollbar {
  display: none;
}
/* ------------------------------------------------------------
   百度map
------------------------------------------------------------ */
.map {
  width: 100%;
  height: 100%;
}
</style>
