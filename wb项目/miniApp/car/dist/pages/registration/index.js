"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _md = require("../../npm/md5/md5.js");

var _md2 = _interopRequireDefault(_md);

var _index4 = require("../../components/dialog/index.js");

var _index5 = _interopRequireDefault(_index4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Registration = (_dec = (0, _index3.connect)(function (_ref) {
  var userInfo = _ref.userInfo;
  return {
    openId: userInfo.openId
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(Registration, _BaseComponent);

  function Registration() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Registration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Registration.__proto__ || Object.getPrototypeOf(Registration)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["userId", "password"], _this.inputPhoneChange = function (e) {
      _this.setState({
        userId: e.detail.value
      });
    }, _this.inputPassChange = function (e) {
      _this.setState({
        password: e.detail.value
      });
    }, _this.handleRes = function (e) {
      var weixinUserInfo = e.detail.userInfo;
      var userId = _this.state.userId;
      var password = _this.state.password;

      if (_this.state.userId == "" || _this.state.password == "") {
        return;
      }_this.props.dispatch({
        type: "userInfo/saveUserInfo",
        response: {
          weixinUserInfo: weixinUserInfo
        }
      });
      _index5.default.showLoading("提交中...");

      _this.props.dispatch({
        type: "userInfo/weixinAdd",
        payload: {
          password: (0, _md2.default)(password),
          userId: userId,
          openId: _this.props.openId,
          clientType: 1,
          nickName: weixinUserInfo.nickName
        }
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Registration, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Registration.prototype.__proto__ || Object.getPrototypeOf(Registration.prototype), "_constructor", this).call(this, props);
      this.state = {
        userId: "",
        password: ""
      };
      this.handleRes = this.handleRes.bind(this);
      this.inputPhoneChange = this.inputPhoneChange.bind(this);
      this.inputPassChange = this.inputPassChange.bind(this);
    }
    // 输入框变化

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return Registration;
}(_index.Component)) || _class);
Registration.properties = {
  "dispatch": null,
  "openId": null
};
Registration.$$events = ["inputPhoneChange", "inputPassChange", "handleRes"];
exports.default = Registration;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Registration, true));