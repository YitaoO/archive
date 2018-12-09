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

var AlarmIndex = (_dec = (0, _index3.connect)(function (_ref) {
  var search = _ref.search,
      treeList = _ref.treeList;
  return {
    search: search,
    treeList: treeList
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(AlarmIndex, _BaseComponent);

  function AlarmIndex() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, AlarmIndex);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = AlarmIndex.__proto__ || Object.getPrototypeOf(AlarmIndex)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "searchLists"], _this.handleToDetail = function (item) {
      _this.props.dispatch({
        type: "treeList/saveState",
        response: {
          choiceCar: item
        }
      });
      _index2.default.navigateTo({
        url: "/pages/travelDetail/index"
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AlarmIndex, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(AlarmIndex.prototype.__proto__ || Object.getPrototypeOf(AlarmIndex.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var searchLists = this.__props.search.searchLists;


      var loopArray0 = searchLists.map(function (item) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $anonymousCallee__2 = item.$$original.childrenList.map(function (childItem) {
          childItem = {
            $$original: (0, _index.internal_get_original)(childItem)
          };
          var $loopState__temp2 = "wran-btn " + (childItem.$$original.warnningType == 1 ? "type1" : childItem.$$original.warnningType == 2 ? "type2" : "type3");
          return {
            $loopState__temp2: $loopState__temp2,
            $$original: childItem.$$original
          };
        });
        return {
          $anonymousCallee__2: $anonymousCallee__2,
          $$original: item.$$original
        };
      });
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        searchLists: searchLists
      });
      return this.__state;
    }
  }]);

  return AlarmIndex;
}(_index.Component)) || _class);
AlarmIndex.properties = {
  "dispatch": null,
  "search": null
};
AlarmIndex.$$events = [];
exports.default = AlarmIndex;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(AlarmIndex));