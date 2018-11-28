"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _api = require("../services/api.js");

var _moment = require("../npm/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
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
    timeArr: ["1小时/班", "2小时/班", "3小时/班", "4小时/班", "5小时/班", "6小时/班", "7小时/班", "8小时/班", "9小时/班", "10小时/班", "11小时/班", "12小时/班", "13小时/班", "14小时/班", "15小时/班", "16小时/班", "17小时/班", "18小时/班", "19小时/班", "20小时/班", "21小时/班", "22小时/班", "23小时/班", "24小时/班"],
    dayHour: 8, //台班规则
    alarmArr: [
    //告警类型
    {
      name: "出围栏",
      value: 1,
      checked: true
    }, {
      name: "进围栏",
      value: 2,
      checked: true
    }, {
      name: "油位异常",
      value: 3,
      checked: true
    }],
    dateTypeList: [
    //日期类型
    {
      name: "本周",
      readonly: new Date().getDay() == 1 ? true : false
    }, {
      name: "上周",
      readonly: false
    }, {
      name: "本月",
      readonly: new Date().getDate() == 1 ? true : false
    }, {
      name: "上月",
      readonly: false
    }],
    dateType: new Date().getDay() == 1 ? 2 : 1, //默认上周(这个需要优化，根据日期判断)
    bdate: (0, _moment2.default)(new Date()).format("YYYY-MM-DD 00:00:00"), // 开始时间
    edate: (0, _moment2.default)(new Date()).format("YYYY-MM-DD 23:59:59"), //结束时间
    searchPage: 1,
    searchLimit: 10,
    searchLists: [], //搜索结果数据
    listsTotal: 0, //数据总数
    lastDateHistory: "", //历史最后一条数据日期
    searchOver: true
  },
  reducers: {
    saveState: function saveState(state, payload) {
      return _extends({}, state, payload.response);
    },
    getSaveList: function getSaveList(state, payload) {
      var _payload$response = payload.response,
          searchLists = _payload$response.searchLists,
          searchPage = _payload$response.searchPage,
          listsTotal = _payload$response.listsTotal,
          searchOver = _payload$response.searchOver,
          loading = _payload$response.loading;

      var lists = Array.from(state.searchLists);

      if (searchLists.length == 0) {
        lists = state.searchLists;
      } else {
        if (searchPage == 1) {
          lists = searchLists;
        } else {
          searchLists.forEach(function (item) {
            lists.push(item);
          });
        }
      }

      return _extends({}, state, {
        listsTotal: listsTotal,
        searchPage: searchPage,
        searchLists: lists,
        searchOver: searchOver,
        loading: loading
      });
    }
  },
  effects: {
    // 搜索数据
    getList: /*#__PURE__*/regeneratorRuntime.mark(function getList(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var url, params, type, response;
      return regeneratorRuntime.wrap(function getList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = payload.url, params = payload.params, type = payload.type;
              _context.next = 3;
              return call(_api.reqSearch, url, params);

            case 3:
              response = _context.sent;

              if (!(type == 1)) {
                _context.next = 7;
                break;
              }

              _context.next = 7;
              return put({
                type: "saveState",
                response: {
                  lastDateHistory: response.data[response.data.length - 1].date
                }
              });

            case 7:
              _context.next = 9;
              return put({
                type: "getSaveList",
                response: {
                  listsTotal: !response ? 0 : response.total,
                  searchPage: params.page,
                  searchLists: !response ? [] : response.data,
                  loading: false,
                  searchOver: true
                }
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, getList, this);
    })
  }
};