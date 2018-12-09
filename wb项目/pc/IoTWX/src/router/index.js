import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home/home";
import NoPromise from "@/views/Common/noPromise";
import IndexState from "@/views/Index/state";
import IndexDailyManager from "@/views/Index/dailyManager";
import IndexRemote from "@/views/Index/remote";

import MessageInspection from "@/views/DailyManager/messageInspection";
import MessageCheckRecord from "@/views/DailyManager/messageCheckRecord";
import MessageInsEdit from "@/views/DailyManager/editInsp";
import MessageWorkOrderList from "@/views/DailyManager/messageWorkOrderList";
import MessageWorkOrderEdit from "@/views/DailyManager/messageWorkOrderEdit";
import MessageRepair from "@/views/DailyManager/messageRepair";
import MessageRepairEdit from "@/views/DailyManager/messageRepairEdit";
import MessagePlan from "@/views/DailyManager/messagePlan";

import TemperatureReport from "@/views/Report/temperatureReport";
import AlarmStatistic from "@/views/Report/alarmStatistic";
import AlarmReport from "@/views/Report/alarmReport";

import BaseAreaSet from "@/views/Setting/baseAreaSet";
import BaseAreaSetForm from "@/views/Setting/baseAreaSetForm";
import BaseDeviceSet from "@/views/Setting/baseDeviceSet";
import BaseDeviceSetForm from "@/views/Setting/baseDeviceSetForm";
import BaseAlarmSet from "@/views/Setting/baseAlarmSet";
import PersonManagement from "@/views/Setting/personManagement";
import RolePermission from "@/views/Setting/rolePermission";

import CompanyIndex from "@/views/newCompany/base";

Vue.use(Router);

const configRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        // 暂无查看权限
        path: "/Common/noPromise",
        name: "NoPromise",
        component: NoPromise
      },
      {
        // 添加新公司
        path: "/newCompany/base",
        name: "CompanyIndex",
        component: CompanyIndex
      },
      {
        // 首页-实时情况
        path: "/Index/state",
        name: "IndexState",
        component: IndexState
      },
      {
        // 首页-工作台
        path: "/Index/dailyManager",
        name: "IndexDailyManager",
        component: IndexDailyManager
      },
      {
        // 首页-实时情况-控制空调
        path: "/Index/remote",
        name: "IndexRemote",
        // path: '/',
        component: IndexRemote
      },
      {
        // 日常管理-设备巡检
        path: "/DailyManager/messageInspection",
        name: "MessageInspection",
        component: MessageInspection
      },
      {
        // 日常管理-巡检详情
        path: "/DailyManager/messageCheckRecord",
        name: "MessageCheckRecord",
        component: MessageCheckRecord
      },
      {
        // 日常管理-设备巡检-新增
        path: "/DailyManager/messageInsEdit",
        name: "MessageInsEdit",
        component: MessageInsEdit
      },
      {
        // 日常管理-设备巡检-新增巡检计划
        path: "/DailyManager/messagePlan",
        name: "MessagePlan",
        component: MessagePlan
      },
      {
        // 日常管理-工单管理-工单列表
        path: "/DailyManager/messageWorkOrderList",
        name: "MessageWorkOrderList",
        component: MessageWorkOrderList
      },
      {
        // 日常管理-工单管理-新增工单
        path: "/DailyManager/messageWorkOrderEdit",
        name: "MessageWorkOrderEdit",
        component: MessageWorkOrderEdit
      },
      {
        // 日常管理-维修登记
        path: "/DailyManager/messageRepair",
        name: "MessageRepair",
        component: MessageRepair
      },
      {
        // 日常管理-维修登记-新增
        path: "/DailyManager/messageRepairEdit",
        name: "MessageRepairEdit",
        component: MessageRepairEdit
      },
      {
        // 统计报表-温湿度历史报表
        path: "/Report/temperatureReport",
        name: "TemperatureReport",
        component: TemperatureReport
      },
      {
        // 统计报表-历史告警统计
        path: "/Report/alarmStatistic",
        name: "AlarmStatistic",
        component: AlarmStatistic
      },
      {
        // 统计报表-历史告警报表
        path: "/Report/alarmReport",
        name: "AlarmReport",
        component: AlarmReport
      },

      {
        // 基础设置-区域管理
        path: "/Setting/baseAreaSet",
        name: "BaseAreaSet",
        component: BaseAreaSet,
        meta: {
          keepAlive: true,
          isBack: false
        }
      },
      {
        // 基础设置-区域管理form
        path: "/Setting/baseAreaSetForm",
        name: "BaseAreaSetForm",
        component: BaseAreaSetForm
      },
      {
        // 基础设置-设备管理
        path: "/Setting/baseDeviceSet",
        name: "BaseDeviceSet",
        component: BaseDeviceSet,
        meta: {
          keepAlive: true,
          isBack: false
        }
      },
      {
        // 基础设置-设备管理form
        path: "/Setting/baseDeviceSetForm",
        name: "BaseDeviceSetForm",
        component: BaseDeviceSetForm
      },
      {
        // 基础设置-告警管理
        path: "/Setting/baseAlarmSet",
        name: "BaseAlarmSet",
        component: BaseAlarmSet
      },
      {
        // 人员管理
        path: "/Setting/personManagement",
        name: "PersonManagement",
        component: PersonManagement
      },
      {
        // 角色权限
        path: "/Setting/rolePermission",
        name: "RolePermission",
        component: RolePermission
      }
    ]
  }
];

export default new Router({
  // mode: 'history',
  routes: configRoutes
});
