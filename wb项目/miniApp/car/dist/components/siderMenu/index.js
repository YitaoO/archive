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

var _index4 = require("../dialog/index.js");

var _index5 = _interopRequireDefault(_index4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SiderMenu = (_dec = (0, _index3.connect)(function (_ref) {
  var userInfo = _ref.userInfo,
      menu = _ref.menu,
      treeList = _ref.treeList,
      car = _ref.car;
  return {
    userInfo: userInfo,
    menu: menu,
    treeList: treeList,
    car: car
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(SiderMenu, _BaseComponent);

  function SiderMenu() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, SiderMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = SiderMenu.__proto__ || Object.getPrototypeOf(SiderMenu)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "loopArray0", "isShow", "weixinUserInfo", "menuData", "carUserInfo"], _this.handleMenuTab = function (item) {
      _this.props.dispatch({
        type: "treeList/saveState",
        response: {
          choiceCar: null,
          choiceFatherId: [], //父集合
          choiceCarsId: [], //选中车辆id集合
          isMultiSelect: item.id == 1 || item.id == 6 ? false : true
        }
      });
      _this.props.dispatch({
        type: "menu/saveState",
        response: {
          menuChoice: {
            index: item.id,
            title: item.title
          }
        }
      });

      if (item.id == 6) {
        _index2.default.navigateTo({
          url: "/pages/stateIndex/index"
        });
      } else {
        _index2.default.navigateTo({
          url: "/pages/searchList/index"
        });
      }
    }, _this.handleMenu = function () {
      var isShow = _this.props.menu.isShow;


      _this.props.dispatch({
        type: "menu/saveState",
        response: {
          isShow: !isShow
        }
      });
    }, _this.handleOut = function () {
      var _this$props$userInfo = _this.props.userInfo,
          carUserInfo = _this$props$userInfo.carUserInfo,
          openId = _this$props$userInfo.openId;

      _index5.default.modelDialog("是否确定解绑小程序？", function () {
        _index5.default.showLoading("提交中...");
        _this.props.dispatch({
          type: "menu/saveState",
          response: {
            isShow: false
          }
        });
        //清空车联树
        _this.props.dispatch({
          type: "treeList/saveState",
          response: {
            listTree: [],
            isMultiSelect: true,
            choiceCar: null,
            choiceFatherId: [],
            choiceCarsId: []
          }
        });
        _this.props.dispatch({
          type: "userInfo/outAdd",
          payload: {
            userKid: carUserInfo.UserKid,
            openId: openId,
            clientType: 1
          }
        });
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SiderMenu, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(SiderMenu.prototype.__proto__ || Object.getPrototypeOf(SiderMenu.prototype), "_constructor", this).call(this, props);
      this.handleMenu = this.handleMenu.bind(this);
      this.handleOut = this.handleOut.bind(this);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      //TODO:这里调了4次，记得优化
      var _props$menu = this.__props.menu,
          isShow = _props$menu.isShow,
          menuData = _props$menu.menuData;
      var _props$userInfo = this.__props.userInfo,
          carUserInfo = _props$userInfo.carUserInfo,
          weixinUserInfo = _props$userInfo.weixinUserInfo;

      var anonymousState__temp = carUserInfo.DepartName ? "/" + carUserInfo.DepartName : "";
      var loopArray0 = menuData.map(function (item, index) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp3 = "item " + (!!item.$$original.isShow ? "" : "hide");
        return {
          $loopState__temp3: $loopState__temp3,
          $$original: item.$$original
        };
      });
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        loopArray0: loopArray0,
        isShow: isShow,
        weixinUserInfo: weixinUserInfo,
        menuData: menuData,
        carUserInfo: carUserInfo
      });
      return this.__state;
    }
  }]);

  return SiderMenu;
}(_index.Component)) || _class);
SiderMenu.properties = {
  "dispatch": null,
  "menu": null,
  "userInfo": null
};
SiderMenu.$$events = ["handleOut", "handleMenuTab", "handleMenu"];
exports.default = SiderMenu;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(SiderMenu));