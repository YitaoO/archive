"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //小程序自带工具

require("./npm/@tarojs/async-await/index.js");

var _index = require("./npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _dva = require("./dva.js");

var _dva2 = _interopRequireDefault(_dva);

var _index3 = require("./model/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("./npm/@tarojs/redux/index.js");

var _wx_tools = require("./components/tools/wx_tools.js");

var _wx_tools2 = _interopRequireDefault(_wx_tools);

var _defaultModel = require("./model/defaultModel.js");

var _defaultModel2 = _interopRequireDefault(_defaultModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//初始化状态

var dvaApp = _dva2.default.createApp({
  initialState: {},
  models: _index4.default,
  onError: function onError(e, dispatch) {
    dispatch({
      type: "sys/error",
      e: e
    });
  },

  onReducer: function onReducer(r) {
    return function (state, action) {
      var newState = r(state, action);

      if (action.payload && action.payload.actionType === "userInfo/outAdd") {
        //清除数据
        return _extends({}, newState, {
          treeList: _defaultModel2.default.treeList,
          projectType: _defaultModel2.default.projectType,
          statistics: _defaultModel2.default.statistics
        });
      }
      return newState;
    };
  }
});

var store = dvaApp.getStore();

(0, _index5.setStore)(store);

var _App = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    _classCallCheck(this, _App);

    return _possibleConstructorReturn(this, (_App.__proto__ || Object.getPrototypeOf(_App)).apply(this, arguments));
  }

  _createClass(_App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // 获取openId
      _wx_tools2.default.addCloud();
    }
  }, {
    key: "_createData",
    value: function _createData() {}
  }]);

  return _App;
}(_index.Component);

exports.default = _App;

App(require('./npm/@tarojs/taro-weapp/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});