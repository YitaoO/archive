import { reqSearch } from "../services/api";
import moment from "moment";

export default {
  namespace: "search",
  state: {
    navFixed: false, //导航是否固定
    noData: false,
    loading: false,
    isProject: false, //项目选择
    isCar: false, //车辆选择
    isTime: false, //时间选择
    isDate: false, //日期选择
    isDateType: false, //日期类型选择
    isType: false, // 类型选择
    isProjectType: false, //项目类型
    timeDialog: false, // 是否显示日期选择
    timeArr: [
      "1小时/班",
      "2小时/班",
      "3小时/班",
      "4小时/班",
      "5小时/班",
      "6小时/班",
      "7小时/班",
      "8小时/班",
      "9小时/班",
      "10小时/班",
      "11小时/班",
      "12小时/班",
      "13小时/班",
      "14小时/班",
      "15小时/班",
      "16小时/班",
      "17小时/班",
      "18小时/班",
      "19小时/班",
      "20小时/班",
      "21小时/班",
      "22小时/班",
      "23小时/班",
      "24小时/班"
    ],
    dayHour: 8, //台班规则
    alarmArr: [
      //告警类型
      {
        name: "出围栏",
        value: 1,
        checked: true
      },
      {
        name: "进围栏",
        value: 2,
        checked: true
      },
      {
        name: "油位异常",
        value: 3,
        checked: true
      }
    ],
    dateTypeList: [
      //日期类型
      {
        name: "本周",
        readonly: new Date().getDay() == 1 ? true : false
      },
      {
        name: "上周",
        readonly: false
      },
      {
        name: "本月",
        readonly: new Date().getDate() == 1 ? true : false
      },
      {
        name: "上月",
        readonly: false
      }
    ],
    dateType: new Date().getDay() == 1 ? 2 : 1, //默认上周(这个需要优化，根据日期判断)
    bdate: moment(new Date()).format("YYYY-MM-DD 00:00:00"), // 开始时间
    edate: moment(new Date()).format("YYYY-MM-DD 23:59:59"), //结束时间
    searchPage: 1,
    searchLimit: 10,
    searchLists: [], //搜索结果数据
    listsTotal: 0, //数据总数
    lastDateHistory: "", //历史最后一条数据日期
    searchOver: true
  },
  reducers: {
    saveState(state, payload) {
      return {
        ...state,
        ...payload.response
      };
    },
    getSaveList(state, payload) {
      const {
        searchLists,
        searchPage,
        listsTotal,
        searchOver,
        loading
      } = payload.response;
      let lists = Array.from(state.searchLists);

      if (searchLists.length == 0) {
        lists = state.searchLists;
      } else {
        if (searchPage == 1) {
          lists = searchLists;
        } else {
          searchLists.forEach(item => {
            lists.push(item);
          });
        }
      }

      return {
        ...state,
        listsTotal: listsTotal,
        searchPage: searchPage,
        searchLists: lists,
        searchOver: searchOver,
        loading: loading
      };
    }
  },
  effects: {
    // 搜索数据
    *getList({ payload }, { call, put }) {
      const { url, params, type } = payload;
      const response = yield call(reqSearch, url, params);
      if (type == 1) {
        //历史轨迹
        yield put({
          type: "saveState",
          response: {
            lastDateHistory: response.data[response.data.length - 1].date
          }
        });
      }

      yield put({
        type: "getSaveList",
        response: {
          listsTotal: !response ? 0 : response.total,
          searchPage: params.page,
          searchLists: !response ? [] : response.data,
          loading: false,
          searchOver: true
        }
      });
    }
  }
};
