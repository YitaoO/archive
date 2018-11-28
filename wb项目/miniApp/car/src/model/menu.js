import stateIcon from "../images/index_menu_state_icon.png";
import historyIcon from "../images/index_menu_history_icon.png";
import goStatisticsIcon from "../images/index_menu_goStatistics_icon.png";
import alarmStatisticsIcon from "../images/index_menu_alarmStatistics_icon.png";
import oilStatisticsIcon from "../images/index_menu_oilStatistics_icon.png";
import waterStatisticsIcon from "../images/index_menu_waterStatistics_icon.png";
export default {
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
      },
      {
        id: 1,
        title: "历史轨迹",
        iconPath: historyIcon,
        path: "/pages/history/index",
        isShow: true
      },
      {
        id: 2,
        title: "行驶统计",
        iconPath: goStatisticsIcon,
        path: "/pages/travel/index",
        isShow: true
      },
      {
        id: 3,
        title: "告警统计",
        iconPath: alarmStatisticsIcon,
        path: "/pages/alarm/index",
        isShow: true
      },
      {
        id: 4,
        title: "燃油统计",
        iconPath: oilStatisticsIcon,
        path: "/pages/oil/index",
        isShow: false
      },
      {
        id: 5,
        title: "洒水统计",
        iconPath: waterStatisticsIcon,
        path: "/pages/water/index",
        isShow: false
      }
    ],
    menuChoice: {
      //当前菜单
      index: 6,
      title: ""
    }
  },
  reducers: {
    saveState(state, payload) {
      return {
        ...state,
        ...payload.response
      };
    }
  },
  effects: {}
};
