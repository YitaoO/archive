"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = {
  namespace: "webSockets",
  state: {
    isConnect: false, //是否链接
    data: {} //数据
  },
  reducers: {
    saveState: function saveState(state, payload) {
      return _extends({}, state, payload.response);
    }
  }
};