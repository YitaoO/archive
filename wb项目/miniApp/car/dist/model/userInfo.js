"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _api = require("../services/api.js");

var _index3 = require("../components/dialog/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: "userInfo",
  state: {
    openId: "",
    weixinUserInfo: null, //微信用户信息
    carUserInfo: "" //车辆用户信息
  },
  reducers: {
    saveOpenId: function saveOpenId(state, payload) {
      return _extends({}, state, {
        openId: payload.openId
      });
    },
    saveUserInfo: function saveUserInfo(state, payload) {
      return _extends({}, state, payload.response);
    },
    saveCarUserInfo: function saveCarUserInfo(state, payload) {
      return _extends({}, state, {
        carUserInfo: payload.response
      });
    }
  },
  effects: {
    // 注册
    weixinAdd: /*#__PURE__*/regeneratorRuntime.mark(function weixinAdd(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var response;
      return regeneratorRuntime.wrap(function weixinAdd$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(_api.reqWeixinAdd, payload);

            case 2:
              response = _context.sent;

              if (response) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              _index4.default.showAlert("绑定成功,正在跳转...", "", 1000);
              setTimeout(function () {
                _index2.default.redirectTo({ url: "/pages/index/index" });
              }, 1000);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, weixinAdd, this);
    }),

    // 登录
    login: /*#__PURE__*/regeneratorRuntime.mark(function login(_ref3, _ref4) {
      var payload = _ref3.payload;
      var call = _ref4.call,
          put = _ref4.put;
      var response;
      return regeneratorRuntime.wrap(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(_api.reqLogin, payload);

            case 2:
              response = _context2.sent;

              //TODO:这里因为在别的地方要用到，所以用了缓存，后期看看可以在model直接取吗
              wx.setStorage({
                key: "sessionId",
                data: response.sessionId
              });

              _context2.next = 6;
              return put({
                type: "saveCarUserInfo",
                response: response
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, login, this);
    }),

    // 解绑
    outAdd: /*#__PURE__*/regeneratorRuntime.mark(function outAdd(_ref5, _ref6) {
      var _ref5$payload = _ref5.payload,
          payload = _ref5$payload === undefined ? {} : _ref5$payload;
      var call = _ref6.call,
          put = _ref6.put;
      var response;
      return regeneratorRuntime.wrap(function outAdd$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return call(_api.reqOutAdd, payload);

            case 2:
              response = _context3.sent;
              _context3.next = 5;
              return put({
                type: "saveUserInfo",
                response: {}
              });

            case 5:
              _context3.next = 7;
              return put({
                type: "saveCarUserInfo",
                response: ""
              });

            case 7:
              _index4.default.showAlert("解绑成功,正在跳转...", "", 1000);
              setTimeout(function () {
                _index2.default.redirectTo({ url: "/pages/registration/index" });
              }, 1000);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, outAdd, this);
    })
  }
};