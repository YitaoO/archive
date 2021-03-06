"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 弹窗提示
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//TODO:后期这里应该放在全局，不用每次调用
var Dialog = function () {
  function Dialog() {
    _classCallCheck(this, Dialog);
  }

  _createClass(Dialog, [{
    key: "showAlert",

    // 警告弹窗
    value: function showAlert(message, myIcon, timer, callBack) {
      _index2.default.showToast({
        title: message,
        icon: !!myIcon && myIcon != "" ? myIcon : "none", //TODO:这里引用本地图片显示不出来，需要优化
        duration: timer != undefined && timer != "" ? timer : 2000,
        mask: true,
        success: function success() {
          if (!!callBack) callBack();
        }
      });
    }
    // 等待中

  }, {
    key: "showLoading",
    value: function showLoading(message) {
      _index2.default.showLoading({
        title: message != undefined && message != "" ? message : "加载中...",
        mask: true
      });
    }
    // 关闭

  }, {
    key: "hideLoading",
    value: function hideLoading() {
      _index2.default.hideLoading();
    }
    // 底部弹窗

  }, {
    key: "showDraw",
    value: function showDraw(messageArr, callBack) {
      var nameArr = [];
      messageArr.forEach(function (item) {
        nameArr.push(item.typeName);
      });
      _index2.default.showActionSheet({
        itemList: nameArr,
        success: function success(res) {
          callBack({
            code: 0,
            choiceItem: messageArr[res.tapIndex]
          });
        },
        fail: function fail(error) {
          callBack({
            code: -1
          });
        }
      });
    }
    // 模拟弹窗(后期实现)

  }, {
    key: "modelDialog",
    value: function modelDialog(title, callBack) {
      _index2.default.showModal({
        title: "提示",
        content: title,
        success: function success(res) {
          if (res.confirm) {
            callBack();
          } else if (res.cancel) {}
        }
      });
    }
  }]);

  return Dialog;
}();

exports.default = new Dialog();