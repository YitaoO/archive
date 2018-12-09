"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _index4 = require("../../components/tools/index.js");

var _index5 = _interopRequireDefault(_index4);

var _index6 = require("../../components/dialog/index.js");

var _index7 = _interopRequireDefault(_index6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arrow = "/images/index_arrow_icon.png";
var loadingIcon = "/images/search_loading_icon.png";

var TravelDetail = (_dec = (0, _index3.connect)(function (_ref) {
  var userInfo = _ref.userInfo,
      search = _ref.search,
      car = _ref.car,
      treeList = _ref.treeList,
      map = _ref.map;
  return {
    userInfo: userInfo,
    search: search,
    car: car,
    treeList: treeList,
    map: map
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(TravelDetail, _BaseComponent);

  function TravelDetail() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, TravelDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = TravelDetail.__proto__ || Object.getPrototypeOf(TravelDetail)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "list", "Arrow", "loadingIcon", "noData", "loading"], _this.handleToDetail = function (item) {
      var choiceCar = _this.props.treeList.choiceCar;

      item.startDate = item.bdate.slice(0, 10);
      item.startTime = item.bdate.slice(10, item.bdate.length);
      item.endDate = item.edate.slice(0, 10);
      item.endTime = item.edate.slice(10, item.edate.length);
      if (item.runDistance == 0) {
        return;
      }_this.props.dispatch({
        type: "car/saveCar",
        response: {
          choiceGuiJi: _extends({}, item, {
            inTime: item.bdate,
            outTime: item.edate,
            carNumber: choiceCar.carNumber,
            carName: choiceCar.carName
          })
        }
      });
      _index2.default.navigateTo({
        url: "/pages/traceDetail/index"
      });
    }, _this.getData = function (page) {
      var UserID = _this.props.userInfo.carUserInfo.UserID;
      var _this$props$search = _this.props.search,
          bdate = _this$props$search.bdate,
          edate = _this$props$search.edate;
      var choiceCar = _this.props.treeList.choiceCar;


      var parsms = _extends({
        userId: UserID,
        simno: choiceCar.simno,
        bdate: bdate.length > 12 ? bdate : bdate + " 00:00:00",
        edate: edate.length > 12 ? edate : edate + " 23:59:59"
      }, page, {
        limit: 10
      });
      _this.props.dispatch({
        type: "car/getCarAccDetailList",
        payload: parsms
      });
    }, _this.onScrolltolower = function () {
      var _this$props$car$carAc = _this.props.car.carAccDetail,
          page = _this$props$car$carAc.page,
          total = _this$props$car$carAc.total;

      if (page * 10 >= total) {
        _this.setState({
          loading: false,
          noData: true
        });
        return;
      }
      _this.setState({
        loading: true
      });
      _this.getData({ page: Number(page) + 1 });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TravelDetail, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(TravelDetail.prototype.__proto__ || Object.getPrototypeOf(TravelDetail.prototype), "_constructor", this).call(this, props);
      this.state = {
        noData: false,
        loading: false
      };
      this.onScrolltolower = this.onScrolltolower.bind(this);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.dispatch({
        type: "car/saveCar",
        response: {
          carAccDetail: {
            list: [],
            page: 1,
            total: 0
          }
        }
      });
      _index7.default.showLoading("请求中...");
      this.getData({ page: 1 });
    }
    //上拉加载更多

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var list = this.__props.car.carAccDetail.list;


      var loopArray0 = list.map(function (item) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = item.$$original.bdate.substr(2, 2) + "/" + item.$$original.bdate.substr(5, 2) + "/" + item.$$original.bdate.substr(8, 2) + " " + item.$$original.bdate.substr(11, 2) + ":" + item.$$original.bdate.substr(14, 2);
        var $loopState__temp4 = item.$$original.edate.substr(2, 2) + "/" + item.$$original.edate.substr(5, 2) + "/" + item.$$original.edate.substr(8, 2) + " " + item.$$original.edate.substr(11, 2) + ":" + item.$$original.edate.substr(14, 2);
        var $loopState__temp6 = _index5.default.miniTime(item.$$original.minuter);
        var $loopState__temp8 = _index5.default.miniTime(item.$$original.runMinuter);
        var $loopState__temp10 = (item.$$original.runDistance / 1000).toFixed(2);
        var $loopState__temp12 = item.$$original.avgSpeed.toFixed(2);
        return {
          $loopState__temp2: $loopState__temp2,
          $loopState__temp4: $loopState__temp4,
          $loopState__temp6: $loopState__temp6,
          $loopState__temp8: $loopState__temp8,
          $loopState__temp10: $loopState__temp10,
          $loopState__temp12: $loopState__temp12,
          $$original: item.$$original
        };
      });
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        list: list,
        Arrow: Arrow,
        loadingIcon: loadingIcon
      });
      return this.__state;
    }
  }]);

  return TravelDetail;
}(_index.Component)) || _class);
TravelDetail.properties = {
  "dispatch": null,
  "treeList": null,
  "userInfo": null,
  "search": null,
  "car": null
};
TravelDetail.$$events = ["onScrolltolower", "handleToDetail"];
exports.default = TravelDetail;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(TravelDetail, true));