"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 通用工具
 */
var Tools = function () {
  function Tools() {
    _classCallCheck(this, Tools);
  }

  _createClass(Tools, [{
    key: "uniq",

    //数组去重
    value: function uniq(arr) {
      var res = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        var obj = arr[i];
        for (var j = 0, jlen = res.length; j < jlen; j++) {
          if (res[j] === obj) break;
        }
        if (jlen === j) res.push(obj);
      }

      return res;
    }
    // 随机生成32位数

  }, {
    key: "getNum",
    value: function getNum() {
      var chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
      var nums = "";
      for (var i = 0; i < 32; i++) {
        var id = parseInt(Math.random() * 61);
        nums += chars[id];
      }
      return nums;
    }
    //反斜杠的转换

  }, {
    key: "slash",
    value: function slash(str) {
      str = str.replace(new RegExp("\\\\", "gm"), "/");
      return str;
    }
    //时间转化

  }, {
    key: "formate",
    value: function formate(fmt, types) {
      var type = !!types && types != undefined ? types : 0;
      var o = {
        Y: fmt.getFullYear(),
        M: fmt.getMonth() + 1, //月份
        D: fmt.getDate(), //日
        h: fmt.getHours(), //小时
        m: fmt.getMinutes(), //分
        s: fmt.getSeconds() //秒
      };
      switch (Number(type)) {
        case 1:
          //年月日
          return "" + o.Y + "-" + o.M + "-" + o.D;
          break;
        default:
          //默认
          return "" + o.Y + "-" + o.M + "-" + o.D + " " + o.h + ":" + o.m + ":" + o.s;
      }
    }
  }, {
    key: "miniTime",
    value: function miniTime(result) {
      var h = Math.floor(result / 3600) < 10 ? "0" + Math.floor(result / 3600) : Math.floor(result / 3600);
      var m = Math.floor(result / 60 % 60);

      // Math.floor((result / 60) % 60) < 10
      //   ? "0" + Math.floor((result / 60) % 60)
      //   : Math.floor((result / 60) % 60);
      var s = Math.floor(result % 60) < 10 ? "0" + Math.floor(result % 60) : Math.floor(result % 60);
      if (h == 0) {
        return result = m + "分";
      }
      return result = h + "时" + m + "分";
    }
    //手机号码验证

  }, {
    key: "isPoneAvailable",
    value: function isPoneAvailable($poneInput) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test($poneInput)) {
        return false;
      } else {
        return true;
      }
    }
    // 修改图片路径

  }, {
    key: "imagePath",
    value: function imagePath(image) {
      if (!image || image == null || image == undefined) {
        return image;
      } else {
        return wx.Interface.fileDownloadF + "?p=" + image;
      }
    }
    // 计时器

  }, {
    key: "setInterval",
    value: function (_setInterval) {
      function setInterval(_x) {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    }(function (timer) {
      return new Promise(function (resolve, reject) {
        var time = setInterval(function () {
          timer = timer - 1; //倒计时
          if (timer === 0) {
            clearInterval(time);
            resolve();
          }
        }, 1000);
      });
    })
    // 判断值是否为空

  }, {
    key: "isNull",
    value: function isNull(value) {
      if (value === "" || value === null || value === undefined) {
        return true;
      } else {
        return false;
      }
    }
    // 时间比较

  }, {
    key: "checkdate",
    value: function checkdate(t1, t2) {
      var t11 = t1.split(":");
      var t21 = t2.split(":");
      var sj1 = parseInt(t11[0]) * 12 + t11[1];
      var sj2 = parseInt(t21[0]) * 12 + t21[1];
      if (Number(sj2) < Number(sj1)) {
        return false;
      }
      return true;
    }
  }]);

  return Tools;
}();

exports.default = new Tools();