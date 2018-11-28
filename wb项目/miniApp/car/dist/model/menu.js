"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var stateIcon = "/images/index_menu_state_icon.png";
var historyIcon = "/images/index_menu_history_icon.png";
var goStatisticsIcon = "/images/index_menu_goStatistics_icon.png";
var alarmStatisticsIcon = "/images/index_menu_alarmStatistics_icon.png";
var oilStatisticsIcon = "/images/index_menu_oilStatistics_icon.png";
var waterStatisticsIcon = "/images/index_menu_waterStatistics_icon.png";

exports.default = {
  namespace: "menu",
  state: {
    isShow: false, //是否展示
    menuData: [
    //内容
    {
      id: 6,
      title: "运行状态",
      iconPath: stateIcon,
      path: "/pages/state/index",
      isShow: true
    }, {
      id: 1,
      title: "历史轨迹",
      iconPath: historyIcon,
      path: "/pages/history/index",
      isShow: true
    }, {
      id: 2,
      title: "行驶统计",
      iconPath: goStatisticsIcon,
      path: "/pages/travel/index",
      isShow: true
    }, {
      id: 3,
      title: "告警统计",
      iconPath: alarmStatisticsIcon,
      path: "/pages/alarm/index",
      isShow: true
    }, {
      id: 4,
      title: "燃油统计",
      iconPath: oilStatisticsIcon,
      path: "/pages/oil/index",
      isShow: false
    }, {
      id: 5,
      title: "洒水统计",
      iconPath: waterStatisticsIcon,
      path: "/pages/water/index",
      isShow: false
    }],
    menuChoice: {
      //当前菜单
      index: 6,
      title: ""
    }
  },
  reducers: {
    saveState: function saveState(state, payload) {
      return _extends({}, state, payload.response);
    }
  },
  effects: {}
};