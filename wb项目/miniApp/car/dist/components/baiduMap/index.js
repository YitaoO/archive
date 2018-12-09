"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;
// 组件 - 侧边菜单


var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _index4 = require("../dialog/index.js");

var _index5 = _interopRequireDefault(_index4);

var _moment = require("../../npm/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _api = require("../../services/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var headerIcon = "/images/index_header_icon.png";
var reloadIcon = "/images/index_map_reload_icon.png";

var MapMain = (_dec = (0, _index3.connect)(function (_ref) {
  var userInfo = _ref.userInfo,
      car = _ref.car,
      menu = _ref.menu,
      map = _ref.map,
      webSockets = _ref.webSockets;
  return {
    userInfo: userInfo,
    car: car,
    menu: menu,
    map: map,
    webSockets: webSockets
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(MapMain, _BaseComponent);

  function MapMain() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, MapMain);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = MapMain.__proto__ || Object.getPrototypeOf(MapMain)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["carStateList", "reloadIcon", "headerIcon", "isShow", "isConnect"], _this.handleMakertap = function (e) {
      var carStateList = _this.props.car.carStateList;

      var info = {};
      carStateList.forEach(function (item) {
        if (item.id == e.markerId) {
          info = item;
          return;
        }
      });
      _this.props.dispatch({
        type: "map/saveState",
        response: {
          showMarkerInfo: true,
          markerInfo: info
        }
      });
    }, _this.handleReloadBtn = function () {
      //TODO:这里清空重新请求会有一个闪动，后期优化
      var UserID = _this.props.userInfo.carUserInfo.UserID;

      _this.props.dispatch({
        type: "car/saveCar",
        response: {
          carStateList: []
        }
      });
      _this.props.dispatch({
        type: "car/getCarLastState",
        payload: {
          UserId: UserID
        }
      });
    }, _this.handleMap = function () {
      _this.props.dispatch({
        type: "map/saveState",
        response: {
          showMarkerInfo: false,
          markerInfo: {}
        }
      });
    }, _this.handleMenu = function (e) {
      var _this$props$menu = _this.props.menu,
          menuData = _this$props$menu.menuData,
          isShow = _this$props$menu.isShow;
      var weixinUserInfo = _this.props.userInfo.weixinUserInfo;
      var carStateList = _this.props.car.carStateList;
      var showMarkerInfo = _this.props.map.showMarkerInfo;

      var showOil = false;
      var showWater = false;

      if (!!showMarkerInfo) {
        _this.props.dispatch({
          type: "map/saveState",
          response: {
            showMarkerInfo: false,
            markerInfo: {}
          }
        });
      }

      if (!weixinUserInfo) {
        _this.props.dispatch({
          type: "userInfo/saveUserInfo",
          response: {
            weixinUserInfo: JSON.parse(e.detail.rawData)
          }
        });
      }

      carStateList.forEach(function (item) {
        if (item.isMoniTank == 1) {
          showOil = true;
        }
        if (item.isMoniWater == 1) {
          showWater = true;
        }
      });
      menuData.forEach(function (item, key) {
        if (key == 4) {
          item.isShow = showOil;
        }
        if (key == 5) {
          item.isShow = showWater;
        }
      });

      _this.props.dispatch({
        type: "menu/saveState",
        response: {
          menuData: menuData,
          isShow: !isShow
        }
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MapMain, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(MapMain.prototype.__proto__ || Object.getPrototypeOf(MapMain.prototype), "_constructor", this).call(this, props);
      this.state = {
        isConnect: false //是否链接
      };

      this.handleMenu = this.handleMenu.bind(this);
      this.handleMakertap = this.handleMakertap.bind(this);
      this.handleReloadBtn = this.handleReloadBtn.bind(this);
      this.handleMap = this.handleMap.bind(this);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var that = this;
      var carUserInfo = this.props.userInfo.carUserInfo;
      var isConnect = this.props.webSockets.isConnect;

      _index5.default.showLoading();
      this.props.dispatch({
        type: "car/getCarLastState",
        payload: {
          UserId: carUserInfo.UserID
        }
      });

      if (!isConnect) {
        this.webSocketInit(carUserInfo.UserID);
      }
      this.mapCtx = _index2.default.createMapContext("myMap1", this.$scope);
      this.mapCtx.getScale({
        success: function success(res) {
          that.setState({
            scale: res.scale
          });
        }
      });
    }
  }, {
    key: "webSocketInit",
    value: function webSocketInit(UserId) {
      var that = this;
      var api = "";
      if (_api2.default.indexOf("https") == 0) {
        api = "wss:" + _api2.default.substring(6, _api2.default.length - 3);
      } else {
        api = "ws:" + _api2.default.substring(5, _api2.default.length - 3);
      }

      wx.connectSocket({
        url: api + "liveWebsocket/" + UserId + "/1",
        method: "GET"
      });
      // 监听是否打开
      wx.onSocketOpen(function (res) {
        console.log("WebSocket连接已打开！");
        that.props.dispatch({
          type: "webSockets/saveState",
          response: {
            isConnect: true
          }
        });
      });
      // 收到数据
      wx.onSocketMessage(function (res) {
        // console.log("收到数据=" + res.data);
        var data = JSON.parse(res.data);
        if (data.latitude == 0 && data.longitude == 0) {
          return;
        }that.renderList(data);
      });
      // 监听打开错误
      wx.onSocketError(function (res) {
        console.log("WebSocket连接打开失败，请检查！");
      });
    }
  }, {
    key: "renderList",
    value: function renderList(childItem) {
      var carStateList = this.props.car.carStateList;
      var _props$map = this.props.map,
          markerInfo = _props$map.markerInfo,
          showMarkerInfo = _props$map.showMarkerInfo;

      childItem.adddate = (0, _moment2.default)(new Date(childItem.adddate.time)).format("YYYY-MM-DD HH:mm:ss");

      carStateList.forEach(function (item) {
        if (item.simno == childItem.simno) {
          item.adddate = childItem.adddate;
          item.latitude = childItem.latitude;
          item.longitude = childItem.longitude;
          item.speed = childItem.speed;
          return;
        }
      });

      if (markerInfo.simno == childItem.simno) {
        var newObj = {
          adddate: childItem.adddate,
          speed: childItem.speed
        };
        //TODO:这里先要清空，后期优化
        this.props.dispatch({
          type: "map/saveState",
          response: {
            markerInfo: []
          }
        });

        this.props.dispatch({
          type: "map/saveState",
          response: {
            markerInfo: Object.assign(markerInfo, newObj)
          }
        });
      }

      this.props.dispatch({
        type: "car/saveCar",
        response: {
          carStateList: carStateList
        }
      });
    }

    // 点击marker

    // 定位

    // 点击地图

    // 菜单路由

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var carStateList = this.__props.car.carStateList;
      var isShow = this.__props.menu.isShow;


      Object.assign(this.__state, {
        carStateList: carStateList,
        reloadIcon: reloadIcon,
        headerIcon: headerIcon,
        isShow: isShow
      });
      return this.__state;
    }
  }]);

  return MapMain;
}(_index.Component)) || _class);
MapMain.properties = {
  "userInfo": null,
  "webSockets": null,
  "dispatch": null,
  "car": null,
  "map": null,
  "menu": null
};
MapMain.$$events = ["handleMakertap", "handleMap", "handleReloadBtn", "handleMenu"];
exports.default = MapMain;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(MapMain));