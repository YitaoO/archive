import { reqStatistics } from "../services/api";
export default {
  namespace: "statistics",
  state: {
    echartLists: [
      {
        name: "使用率统计图",
        index: 0,
        isUp: true,
        height: "300px"
      },
      {
        name: "洒水量统计",
        index: 1,
        isUp: true,
        height: "300px"
      },
      {
        name: "耗油量/行驶里程统计图",
        index: 2,
        isUp: true,
        height: "300px"
      },
      {
        name: "油费",
        index: 5,
        isUp: true,
        height: "300px"
      },
      {
        name: "百公里耗油量统计",
        index: 3,
        isUp: true,
        height: "300px"
      },
      {
        name: "告警统计",
        index: 4,
        isUp: true,
        height: "300px"
      }
    ],
    UseEffic: [], //使用率
    FuelPerOneHunKm: [], //蚝油
    WarningReports: [] //告警
  },
  reducers: {
    saveState(state, payload) {
      return {
        ...state,
        ...payload.response
      };
    }
  },
  effects: {
    // 搜索统计数据
    *getStatisticsList({ payload }, { call, put }) {
      const { url, params, listName } = payload;
      const response = yield call(reqStatistics, url, params);

      switch (listName) {
        case "UseEffic":
          break;
        case "FuelPerOneHunKm":
          break;
        case "WarningReports":
          break;

        default:
          break;
      }

      yield put({
        type: "saveState",
        response: {
          [`${listName}`]: response
        }
      });
    }
  }
};
