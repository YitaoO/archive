"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _api = require("../services/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var carOn = "/images/index_car_on_icon.png";
var carOff = "/images/index_car_off_icon.png";
var StartIcon = "/images/map_trace_start_icon.png";
var EndIcon = "/images/map_trace_end_icon.png";

exports.default = {
  namespace: "car",
  state: {
    carStateList: [], //车辆最新状态
    listTree: [], //车辆树
    choiceCar: null, //选中的车辆
    carGuijiList: {
      page: 1,
      limit: 20,
      list: []
    }, //轨迹
    carAccDetail: {
      //行驶详情
      page: 1,
      limit: 10,
      list: [],
      total: 0
    },
    choiceGuiJi: {}, //选择轨迹
    carGuijiDetail: {} //轨迹详情
  },
  reducers: {
    saveCar: function saveCar(state, payload) {
      return _extends({}, state, payload.response);
    },
    saveTravelList: function saveTravelList(state, payload) {
      var _payload$response$car = payload.response.carAccDetail,
          list = _payload$response$car.list,
          page = _payload$response$car.page,
          total = _payload$response$car.total;

      var arrLists = Array.from(state.carAccDetail.list);
      if (arrLists.length == 0) {
        arrLists = list;
      } else {
        list.forEach(function (item) {
          arrLists.push(item);
        });
      }

      return _extends({}, state, {
        carAccDetail: {
          list: arrLists,
          page: page,
          total: total
        }
      });
    }
  },
  effects: {
    // 车辆最新状态
    getCarLastState: /*#__PURE__*/regeneratorRuntime.mark(function getCarLastState(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var response, datas;
      return regeneratorRuntime.wrap(function getCarLastState$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(_api.reqCarStateList, payload);

            case 2:
              response = _context.sent;
              datas = [];

              response.forEach(function (item) {
                if (!!item.longitude) {
                  datas.push(_extends({}, item, {
                    id: item.simno,
                    width: 61,
                    height: 61,
                    rotate: item.direction,
                    iconPath: !!item.acc ? carOn : carOff,
                    callout: {
                      content: item.carNumber,
                      padding: 5,
                      // bgColor: "#3e81f2",
                      // color: "#fff",
                      display: "ALWAYS"
                    }
                  }));
                }
              });
              _context.next = 7;
              return put({
                type: "saveCar",
                response: {
                  carStateList: datas
                }
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, getCarLastState, this);
    }),

    // 获取行驶统计
    getCarList: /*#__PURE__*/regeneratorRuntime.mark(function getCarList(_ref3, _ref4) {
      var payload = _ref3.payload;
      var call = _ref4.call,
          put = _ref4.put;
      var page, limit, response;
      return regeneratorRuntime.wrap(function getCarList$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = payload.page, limit = payload.limit;
              _context2.next = 3;
              return call(_api.reqCarAccInfo, payload);

            case 3:
              response = _context2.sent;
              _context2.next = 6;
              return put({
                type: "saveCar",
                response: {
                  carGuijiList: {
                    list: !response ? [] : response,
                    page: page,
                    limit: limit
                  }
                }
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, getCarList, this);
    }),

    // 获取行驶详情
    getCarAccDetailList: /*#__PURE__*/regeneratorRuntime.mark(function getCarAccDetailList(_ref5, _ref6) {
      var payload = _ref5.payload;
      var call = _ref6.call,
          put = _ref6.put;
      var page, limit, response;
      return regeneratorRuntime.wrap(function getCarAccDetailList$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              page = payload.page, limit = payload.limit;
              _context3.next = 3;
              return call(_api.reqCarAccTranceDetail, payload);

            case 3:
              response = _context3.sent;
              _context3.next = 6;
              return put({
                type: "saveTravelList",
                response: {
                  carAccDetail: {
                    list: response.data,
                    page: page,
                    total: response.total
                  }
                }
              });

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, getCarAccDetailList, this);
    }),


    // 获取轨迹详情
    getCarTrance: /*#__PURE__*/regeneratorRuntime.mark(function getCarTrance(_ref7, _ref8) {
      var payload = _ref7.payload;
      var call = _ref8.call,
          put = _ref8.put;
      var response, lists;
      return regeneratorRuntime.wrap(function getCarTrance$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return call(_api.reqCarTrance, payload);

            case 2:
              response = _context4.sent;
              lists = {
                polyline: [],
                Marker: []
              };

              if (response.data.length > 0) {
                lists.polyline.push({
                  points: response.data,
                  color: "#fa4949",
                  width: 4,
                  dottedLine: false,
                  arrowLine: true,
                  borderColor: "#000",
                  borderWidth: 5
                });
                lists.Marker.push({
                  id: 0,
                  latitude: response.data[0].latitude,
                  longitude: response.data[0].longitude,
                  iconPath: StartIcon,
                  width: 33,
                  height: 37
                });
                lists.Marker.push({
                  id: 1,
                  latitude: response.data[response.data.length - 1].latitude,
                  longitude: response.data[response.data.length - 1].longitude,
                  iconPath: EndIcon,
                  width: 23,
                  height: 27
                });
              }

              _context4.next = 7;
              return put({
                type: "saveCar",
                response: {
                  carGuijiDetail: lists
                }
              });

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, getCarTrance, this);
    })
  }
};