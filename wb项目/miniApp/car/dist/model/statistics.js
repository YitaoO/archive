"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _api = require("../services/api.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  namespace: "statistics",
  state: {
    echartLists: [{
      name: "使用率统计图",
      index: 0,
      isUp: true,
      height: "300px"
    }, {
      name: "洒水量统计",
      index: 1,
      isUp: true,
      height: "300px"
    }, {
      name: "耗油量/行驶里程统计图",
      index: 2,
      isUp: true,
      height: "300px"
    }, {
      name: "油费",
      index: 5,
      isUp: true,
      height: "300px"
    }, {
      name: "百公里耗油量统计",
      index: 3,
      isUp: true,
      height: "300px"
    }, {
      name: "告警统计",
      index: 4,
      isUp: true,
      height: "300px"
    }],
    UseEffic: [], //使用率
    FuelPerOneHunKm: [], //蚝油
    WarningReports: [] //告警
  },
  reducers: {
    saveState: function saveState(state, payload) {
      return _extends({}, state, payload.response);
    }
  },
  effects: {
    // 搜索统计数据
    getStatisticsList: /*#__PURE__*/regeneratorRuntime.mark(function getStatisticsList(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var url, params, listName, response;
      return regeneratorRuntime.wrap(function getStatisticsList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = payload.url, params = payload.params, listName = payload.listName;
              _context.next = 3;
              return call(_api.reqStatistics, url, params);

            case 3:
              response = _context.sent;
              _context.t0 = listName;
              _context.next = _context.t0 === "UseEffic" ? 7 : _context.t0 === "FuelPerOneHunKm" ? 8 : _context.t0 === "WarningReports" ? 9 : 10;
              break;

            case 7:
              return _context.abrupt("break", 11);

            case 8:
              return _context.abrupt("break", 11);

            case 9:
              return _context.abrupt("break", 11);

            case 10:
              return _context.abrupt("break", 11);

            case 11:
              _context.next = 13;
              return put({
                type: "saveState",
                response: _defineProperty({}, "" + listName, response)
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, getStatisticsList, this);
    })
  }
};