<!-- 侧边栏 -->
<template>
<div class="navbar primary-color-bg-white">
  <el-row class="tac">
    <el-col :span="24">
      <el-menu :default-openeds="defaultOpens" class="el-menu-vertical-demo" :collapse="false" background-color="#fff" text-color="#999" active-text-color="#999">
        <!-- 存在子菜单 -->
        <el-submenu v-if="item.moduleList.length>0" :index="item.modId+''" :class="{active:item.modId == navbarModId}" @click="bindTab(index,item.modId)" v-for="(item,index) in navbarMenu" :key="item.modId">
          <template slot="title">
            <i :class="item.iconClass" class="icon-left icon"></i>
            <span slot="title" class="title">{{item.name}}</span>
          </template>
          <el-menu-item :index="itemChild.modId+''" :class="{active:itemChild.modId == navbarChildModId}" @click="bindChildTab(indexChild,itemChild.modId,index,item.modId)" v-for="(itemChild,indexChild) in item.moduleList" :key="itemChild.modId">
            {{itemChild.name}}
          </el-menu-item>
        </el-submenu>
        <!-- 不存在子菜单 -->
        <el-menu-item class="over-menu" v-if="item.moduleList.length==0" :index="item.modId+''" :class="{active:item.modId == navbarModId}" @click="bindTab(index,item.modId)" v-for="(item,index) in navbarMenu" :key="item.modId">
          <i :class="item.iconClass" class="icon-left icon"></i>
          <span slot="title" class="title">{{item.name}}</span>
          <i v-if="item.modId == navbarModId" class="el-icon-arrow-right icon-arrow"></i>
        </el-menu-item>

      </el-menu>


    </el-col>

  </el-row>
</div>
</template>

<script>
import {
  renderNavData,
  renderMenuData
} from "@/components/Datas/renderMenu.js";
import renderPromise from "@/components/Datas/renderPromise";
export default {
  data() {
    return {
      navbarMenu: [], //主菜单内容
      hasChild: false,
      mainMenuIndexModId: "",
      navbarModId: "", //侧边菜单
      navbarChildModId: "", // 侧边二级菜单
      defaultOpens: ["40010", "40020"],
      enableClick: true //是否可点击
    };
  },

  created() {
    let that = this;

    that.userInfo = that.$cookies.getJSON("userInfo");
    // 添加只有新增公司的权限
    if (
      that.userInfo != null &&
      that.userInfo.compId == null &&
      !!that.userInfo.isAdmin
    ) {
      that.enableClick = false;
      that.navbarMenu = [
        {
          modId: 0,
          name: "单位管理",
          moduleList: [],
          checked: false
        }
      ];
      that.$router.push({
        name: "CompanyIndex"
      });
      return;
    } else {
      that.menuIndex = that.$cookies.getJSON("menuIndex");

      that.initNavbar();

      that.$bus.$off("tabChange");
      //监听变化
      that.$bus.$on("tabChange", modId => {
        that.$cookies.remove("navberObj");
        that.mainMenuIndexModId = modId;

        that.getNavbarData(modId);
      });
    }
  },
  methods: {
    //获取数据
    getNavbarData(modId) {
      let that = this;

      that.mainMenuIndexModId = modId;
      renderNavData(that, modId).then(function(datas) {
        that.navbarMenu = datas;

        that.setCookies(datas);

        that.configRouter();
      });
    },
    //缓存数据
    setCookies(datas) {
      let that = this;

      let params = {};
      let childLength = that.navbarMenu[0].moduleList.length;
      if (childLength == 0) {
        let navberObj = that.$cookies.getJSON("navberObj");

        if (!!that.$utils.isNull(navberObj)) {
          params = {
            type: 0,
            index: 0,
            modId: datas[0].modId
          };
        } else {
          params = {
            type: 0,
            index: navberObj.index,
            modId: navberObj.modId
          };
        }
      } else {
        params = {
          type: 1,
          index: 0,
          modId: that.navbarMenu[0].modId,
          childIndex: 0,
          childModId: that.navbarMenu[0].moduleList[0].modId
        };
      }
      that.setTabData(params);
    },

    //组件初始化
    initNavbar() {
      let that = this;
      that.mainMenu = that.$store.state.mainMenu;

      if (that.mainMenu.length != 0) {
        that.getNavbarData(that.mainMenu[that.menuIndex].modId, 0);
      } else {
        renderMenuData(that, 0).then(function(datas) {
          that.mainMenu = that.$store.state.mainMenu;
          that.getNavbarData(datas[that.menuIndex].modId, 0);
        });
      }
    },
    // navbar切换
    bindTab(index, modId) {
      if (!this.enableClick) return;
      this.$cookies.set("renderRouter", true, 7);
      this.setTabData({
        type: 0,
        index: index,
        modId: modId
      });
    },
    // navbar子菜单切换
    bindChildTab(indexChild, modId, parentIndex, parentModId) {
      this.$cookies.set("renderRouter", true, 7);
      this.setTabData({
        type: 1,
        index: parentIndex,
        modId: parentModId,
        childIndex: indexChild,
        childModId: modId
      });
    },
    // 设置tab参数
    setTabData(params) {
      this.$cookies.set(
        "navberObj",
        {
          index: params.index,
          modId: params.modId
        },
        7
      );
      if (params.type == 1) {
        this.$cookies.set(
          "navbarChildObj",
          {
            indexChild: params.childIndex,
            modId: params.childModId
          },
          7
        );
        this.navbarChildModId = params.childModId;
      }

      this.navbarModId = params.modId;

      this.configRouter();
    },
    //配置路由 // TODO: 到时提取到路由模块
    configRouter() {
      let that = this;

      if (
        !!that.$utils.isNull(that.$cookies.getJSON("renderRouter")) ||
        !!that.$cookies.getJSON("renderRouter")
      ) {
        let routerName = "";

        switch (Number(this.mainMenuIndexModId)) {
          case 100: //首页
            switch (Number(this.navbarModId)) {
              case 10010: //实时情况
                routerName = "IndexState";
                break;
              case 10020: //工作台
                routerName = "IndexDailyManager";
                break;
              default:
            }
            break;
          case 200: //日常管理
            switch (Number(this.navbarModId)) {
              case 20010: //设备巡检
                routerName = "MessageInspection";
                break;
              case 20020: //工单管理
                routerName = "MessageWorkOrderList";
                break;
              case 20030: //维修登记
                routerName = "MessageRepair";
                break;
              default:
            }
            break;
          case 300: //统计报表
            switch (Number(this.navbarModId)) {
              case 30010: //温湿度历史报表
                routerName = "TemperatureReport";
                break;
              case 30020: //历史告警统计
                routerName = "AlarmStatistic";
                break;
              case 30030: //历史告警报表
                routerName = "AlarmReport";
                break;
              default:
            }
            break;
          case 400: //设置
            switch (Number(this.navbarModId)) {
              case 40010: //基础设置
                switch (Number(this.navbarChildModId)) {
                  case 4001010: //区域管理
                    routerName = "BaseAreaSet";
                    break;
                  case 4001020: //设备管理
                    routerName = "BaseDeviceSet";
                    break;
                  case 4001030: //告警管理
                    routerName = "BaseAlarmSet";
                    break;
                  default:
                }
                break;
              case 40020: //系统设置
                switch (Number(this.navbarChildModId)) {
                  case 4002010: // 人员管理
                    routerName = "PersonManagement";
                    break;
                  case 4002020: // 角色权限
                    routerName = "RolePermission";
                    break;
                  default:
                }
                break;
              default:
            }
            break;
          default:
        }

        if (Number(this.mainMenuIndexModId) != 400) {
          renderPromise(this, this.navbarModId).then(function(data) {
            that.$store.commit("setPromise", data[0]);
            if (!that.$store.state.promise.list) {
              routerName = "NoPromise";
            }
            that.$router.push({
              name: routerName
            });
          });
        } else {
          renderPromise(this, this.navbarChildModId).then(function(data) {
            that.$store.commit("setPromise", data[0]);
            if (!that.$store.state.promise.list) {
              routerName = "NoPromise";
            }
            that.$router.push({
              name: routerName
            });
          });
        }
      }
    }
  }
};
</script>
<style lang="scss"scoped>
.navbar {
  width: 250px;
  border: solid 1px #dcdfe1;
  .icon-left {
    width: 25px;
    height: 25px;

    &.icon-state {
      @include showGlobalImage("menu_icon_state");
    }
    &.icon-wBench {
      @include showGlobalImage("menu_icon_wBench");
    }
    &.icon-insp {
      @include showGlobalImage("menu_icon_state");
    }
    &.icon-wOrder {
      @include showGlobalImage("menu_icon_wOrde");
    }
    &.icon-repair {
      @include showGlobalImage("menu_icon_repair");
    }
    &.icon-tReport {
      @include showGlobalImage("menu_icon_tReport");
    }
    &.icon-aStatistic {
      @include showGlobalImage("menu_icon_aStatistic");
    }
    &.icon-aReport {
      @include showGlobalImage("menu_icon_aReport");
    }
    &.icon-baseSet {
      @include showGlobalImage("menu_icon_baseSet");
    }
    &.icon-systemSet {
      @include showGlobalImage("menu_icon_aStatistic");
    }
  }
  .title {
    color: #999999;
  }
  .icon-arrow {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 0;
    height: 20px;
    color: #17b990;
  }
  .el-menu {
    border-right: none !important;
  }

  .active {
    color: #17b990 !important;
    position: relative;

    &.over-menu {
      background-color: #e8f7f3 !important;
    }
    &.active:before {
      position: absolute;
      height: 100%;
      width: 4px;
      content: "";
      left: 0;
      top: 0;
      background: #a2dbcb;
    }

    .title {
      color: #17b990;
    }
    .icon-left {
      &.icon-state {
        @include showGlobalImage("menu_icon_state_active");
      }
      &.icon-wBench {
        @include showGlobalImage("menu_icon_wBench_active");
      }
      &.icon-insp {
        @include showGlobalImage("menu_icon_state_active");
      }
      &.icon-wOrder {
        @include showGlobalImage("menu_icon_wOrde_active");
      }
      &.icon-repair {
        @include showGlobalImage("menu_icon_repair_active");
      }
      &.icon-tReport {
        @include showGlobalImage("menu_icon_tReport_active");
      }
      &.icon-aStatistic {
        @include showGlobalImage("menu_icon_aStatistic_active");
      }
      &.icon-aReport {
        @include showGlobalImage("menu_icon_aReport_active");
      }
      &.icon-baseSet {
        @include showGlobalImage("menu_icon_baseSet_active");
      }
      &.icon-systemSet {
        @include showGlobalImage("menu_icon_aStatistic_active");
      }
    }
  }
}
.el-icon-arrow-down:before {
  content: "" !important;
}
</style>
