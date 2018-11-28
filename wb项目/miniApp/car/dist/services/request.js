"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = request;

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../components/dialog/index.js");

var _index4 = _interopRequireDefault(_index3);

var _api = require("./api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSessionId(isLogin) {
  return new Promise(function (resolve) {
    if (!!isLogin) {
      resolve({
        "content-type": "application/json"
      });
    } else {
      wx.getStorage({
        key: "sessionId",
        success: function success(res) {
          //TODO:这里逻辑待优化，太多判断
          resolve({
            "content-type": "application/json",
            Cookie: !!res.data ? "" + res.data : ""
          });
        }
      });
    }
  });
}
function request(opt, isLogin) {
  return getSessionId(isLogin).then(function (header) {
    opt.header = header;
    return _index2.default.request(opt).then(function (res) {
      var statusCode = res.statusCode;
      var _res$data = res.data,
          code = _res$data.code,
          data = _res$data.data;


      _index4.default.hideLoading();
      if (statusCode >= 200 && statusCode < 300) {
        switch (code) {
          case "0":
            if (data == null || data.length == 0) {
              _index4.default.showAlert("暂无数据...", "", 1000);
              return data;
            }
            if (!!data.data) {
              if (data.data.length == 0) {
                _index4.default.showAlert("暂无数据...", "", 1000);
                return data;
              }
            }
            return data;
            break;
          case "0012":
            //注册
            _index4.default.showAlert("还未绑定，请绑定...", "none", 1000);
            setTimeout(function () {
              _index2.default.redirectTo({ url: "/pages/registration/index" });
            }, 1000);
            return false;
            break;
          case "0003":
            //重新登录
            _index4.default.showAlert("还未登录，正在登录...", "none", 1000);

            _index2.default.getStorage({ key: "minicar_openId" }).then(function (res) {
              _index2.default.request({
                url: _api2.default + "/login?openID=" + res.data + "&weixin=weixin&act=10",
                method: "POST",
                header: {
                  "content-type": "application/json"
                }
              }).then(function (res) {
                wx.setStorage({
                  key: "sessionId",
                  data: res.data.data.sessionId
                });
                setTimeout(function () {
                  _index2.default.redirectTo({ url: "/pages/index/index" });
                }, 1000);
              });
            });
            break;
          default:
            _index4.default.showAlert(res.data.message, "none", 1000);
            return false;
            break;
        }
      } else {
        _index4.default.hideLoading();
        _index4.default.showAlert("\u72B6\u6001\u7801-" + statusCode, "", 1000);
        throw new Error("\u7F51\u7EDC\u8BF7\u6C42\u9519\u8BEF\uFF0C\u72B6\u6001\u7801" + statusCode);
      }
    });
  });
}

function reLogin() {
  return _index2.default.request(opt).then(function (res) {});
}