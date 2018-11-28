"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqCarUseEffic = exports.reqStatistics = exports.reqStatisticsDetail = exports.reqCarAccTranceDetail = exports.reqSearch = exports.reqCarTrance = exports.reqCarAccInfo = exports.reqListProjetType = exports.reqListTreeProject = exports.reqListTreeCar = exports.reqCarStateList = exports.reqLogin = exports.reqOutAdd = exports.reqWeixinAdd = undefined;

// 绑定
var reqWeixinAdd = exports.reqWeixinAdd = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/usersweixinadd",
              data: params,
              method: "POST"
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function reqWeixinAdd(_x) {
    return _ref.apply(this, arguments);
  };
}();
// 解绑


var reqOutAdd = exports.reqOutAdd = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/usersweixindelbykid",
              data: params,
              method: "POST"
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function reqOutAdd(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
// 登录


var reqLogin = exports.reqLogin = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/login?openID=" + params.openID + "&weixin=" + params.weixin + "&act=10",
              // data: params,
              method: "POST"
            }, true));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function reqLogin(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
//查询车辆最新状态接口


var reqCarStateList = exports.reqCarStateList = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(params) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/gpsdevicebuffers/getCarLastStateBySimNo?userId=" + params.UserId + "&mapType=2",
              method: "GET"
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function reqCarStateList(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
//获取车辆树


var reqListTreeCar = exports.reqListTreeCar = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(url, params) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", (0, _request2.default)({
              url: "" + baseUrl + url + "?" + (0, _index.stringify)(params),
              method: "POST",
              data: params
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function reqListTreeCar(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();
// 获取设备树


var reqListTreeProject = exports.reqListTreeProject = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(url, params) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", (0, _request2.default)({
              url: "" + baseUrl + url + "?" + (0, _index.stringify)(params),
              method: "GET"
            }));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function reqListTreeProject(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();
// 获取项目类型


var reqListProjetType = exports.reqListProjetType = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(url, params) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", (0, _request2.default)({
              url: "" + baseUrl + url + "?" + (0, _index.stringify)(params),
              method: "POST",
              data: params
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function reqListProjetType(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();
//行驶统计接口


var reqCarAccInfo = exports.reqCarAccInfo = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(params) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/carproj/getCarAccInfoByUserIdForWeiXin?" + (0, _index.stringify)(params),
              method: "GET"
            }));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function reqCarAccInfo(_x11) {
    return _ref8.apply(this, arguments);
  };
}();
//轨迹详情接口


var reqCarTrance = exports.reqCarTrance = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(params) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/gpsdevicebuffers/getCarGuiJiBySimNoTime?" + (0, _index.stringify)(params),
              method: "GET"
            }));

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function reqCarTrance(_x12) {
    return _ref9.apply(this, arguments);
  };
}();
// 搜索数据


var reqSearch = exports.reqSearch = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(url, params) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", (0, _request2.default)({
              url: "" + baseUrl + url + "?" + (0, _index.stringify)(params),
              method: "GET"
            }));

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function reqSearch(_x13, _x14) {
    return _ref10.apply(this, arguments);
  };
}();
// 行驶详情


var reqCarAccTranceDetail = exports.reqCarAccTranceDetail = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(params) {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/carproj/getCarAccInfoByUserIdDetail?" + (0, _index.stringify)(params),
              method: "GET"
            }));

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function reqCarAccTranceDetail(_x15) {
    return _ref11.apply(this, arguments);
  };
}();
// 燃油洒水详情


var reqStatisticsDetail = exports.reqStatisticsDetail = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(url, params) {
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt("return", (0, _request2.default)({
              url: "" + baseUrl + url + "?" + (0, _index.stringify)(params),
              method: "GET"
            }));

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function reqStatisticsDetail(_x16, _x17) {
    return _ref12.apply(this, arguments);
  };
}();
// 首页统计


var reqStatistics = exports.reqStatistics = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(url, params) {
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            return _context13.abrupt("return", (0, _request2.default)({
              url: "" + baseUrl + url + "?" + (0, _index.stringify)(params),
              method: "GET"
            }));

          case 1:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function reqStatistics(_x18, _x19) {
    return _ref13.apply(this, arguments);
  };
}();
// 使用率统计


var reqCarUseEffic = exports.reqCarUseEffic = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(url, params) {
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            return _context14.abrupt("return", (0, _request2.default)({
              url: "" + baseUrl + url + "?" + (0, _index.stringify)(params),
              method: "GET"
            }));

          case 1:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function reqCarUseEffic(_x20, _x21) {
    return _ref14.apply(this, arguments);
  };
}();

var _index = require("../npm/qs/lib/index.js");

var _request = require("./request.js");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * api列表
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var mockBaseUrl = "https://www.easy-mock.com/mock/5ba99eeab9b3b431f78ef57b/www.weibai.com/api";
var localUrl = "http://192.168.1.94:9020/portal-car/api";
var localUrl1 = "http://192.168.1.14:8082/portal-car/api";
var proUrl = "https://www.weepal.cn/portal-car/api";
var proUrl1 = "https://car.weepal.net/car/api";
var baseUrl = localUrl1;exports.default = baseUrl;