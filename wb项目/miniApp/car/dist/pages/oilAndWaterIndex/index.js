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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arrow = "/images/navigator_arrow_icon.png";

var waterIndex = (_dec = (0, _index3.connect)(function (_ref) {
  var search = _ref.search,
      treeList = _ref.treeList,
      menu = _ref.menu;
  return {
    search: search,
    treeList: treeList,
    menu: menu
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(waterIndex, _BaseComponent);

  function waterIndex() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, waterIndex);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = waterIndex.__proto__ || Object.getPrototypeOf(waterIndex)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "searchLists", "type", "Arrow"], _this.handleToDetail = function (item) {
      var _this$props$search = _this.props.search,
          bdate = _this$props$search.bdate,
          edate = _this$props$search.edate;
      var menuChoice = _this.props.menu.menuChoice;

      _index2.default.navigateTo({
        url: "/pages/oilAndWaterDetail/index?index=" + menuChoice.index + "&simno=" + item.simno + "&carName=" + item.carName + "&carNumber=" + item.carNumber + "&bdate=" + bdate + "&edate=" + edate
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(waterIndex, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(waterIndex.prototype.__proto__ || Object.getPrototypeOf(waterIndex.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var searchLists = this.__props.search.searchLists;

      var type = this.__props.type;

      var loopArray0 = searchLists.map(function (item) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $anonymousCallee__3 = item.$$original.childrenList.map(function (childItem) {
          childItem = {
            $$original: (0, _index.internal_get_original)(childItem)
          };
          var $loopState__temp2 = type == 4 ? childItem.$$original.refuelCount.toFixed(0) : childItem.$$original.waterCount.toFixed(0);
          var $loopState__temp4 = type == 4 ? (childItem.$$original.refuelQuantity == 0 ? 0 : childItem.$$original.refuelQuantity.toFixed(2)) + " L" : (childItem.$$original.waterAddition == 0 ? 0 : (childItem.$$original.waterAddition / 1000).toFixed(2)) + " t";
          var $loopState__temp6 = type == 4 ? (childItem.$$original.tankCalibration == 0 ? 0 : childItem.$$original.tankCalibration.toFixed(2)) + " L" : (childItem.$$original.waterConsumption == 0 || childItem.$$original.waterConsumption < 0 ? 0 : (childItem.$$original.waterConsumption / 1000).toFixed(2)) + " t";
          var $loopState__temp8 = type == 4 ? childItem.$$original.oilPrice + " \u5143" : (childItem.$$original.tankCalibration == 0 ? 0 : childItem.$$original.tankCalibration.toFixed(2)) + " L";
          var $loopState__temp10 = type == 5 ? childItem.$$original.distance == 0 ? 0 : (childItem.$$original.distance / 1000).toFixed(2) : null;
          var $loopState__temp12 = "item-button " + (type == 4 ? childItem.$$original.tankCalibration == 0 ? "hide" : "" : childItem.$$original.waterConsumption == 0 ? "hide" : "");
          return {
            $loopState__temp2: $loopState__temp2,
            $loopState__temp4: $loopState__temp4,
            $loopState__temp6: $loopState__temp6,
            $loopState__temp8: $loopState__temp8,
            $loopState__temp10: $loopState__temp10,
            $loopState__temp12: $loopState__temp12,
            $$original: childItem.$$original
          };
        });
        return {
          $anonymousCallee__3: $anonymousCallee__3,
          $$original: item.$$original
        };
      });
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        searchLists: searchLists,
        type: type,
        Arrow: Arrow
      });
      return this.__state;
    }
  }]);

  return waterIndex;
}(_index.Component)) || _class);
waterIndex.properties = {
  "search": null,
  "menu": null,
  "type": null
};
waterIndex.$$events = ["handleToDetail"];
exports.default = waterIndex;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(waterIndex));