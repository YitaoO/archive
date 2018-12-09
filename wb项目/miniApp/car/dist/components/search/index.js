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

var _moment = require("../../npm/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _index4 = require("../dialog/index.js");

var _index5 = _interopRequireDefault(_index4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arrow = "/images/navigator_arrow_icon.png";

var Search = (_dec = (0, _index3.connect)(function (_ref) {
  var car = _ref.car,
      treeList = _ref.treeList,
      projectType = _ref.projectType,
      search = _ref.search;
  return {
    search: search,
    car: car,
    treeList: treeList,
    projectType: projectType
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(Search, _BaseComponent);

  function Search() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp4", "anonymousState__temp7", "loopArray0", "loopArray1", "isProject", "projectList", "Arrow", "isProjectType", "isCar", "isMultiSelect", "isTime", "dayHour", "timeArr", "isDateType", "dateTypeList", "isDate", "isType", "alarmArr", "choiceProjectItem", "choiceProjectType", "choiceCarItem"], _this.handleCarChoice = function () {
      _this.props.dispatch({
        type: "search/saveState",
        response: {
          noData: false,
          loading: false,
          searchPage: 1,
          searchLists: [], //搜索结果数据
          listsTotal: 0, //数据总数
          lastDateHistory: "", //历史最后一条数据日期
          searchOver: true
        }
      });
      _index2.default.navigateTo({ url: "/pages/treeList/index" });
    }, _this.handleRuleChoice = function (e) {
      _this.props.dispatch({
        type: "search/saveState",
        response: {
          dayHour: Number(e.detail.value) + 1
        }
      });
    }, _this.handleProjectChoice = function () {
      var projectList = _this.props.treeList.projectList;

      if (projectList.length == 1 && projectList[0].children.length == 0) {
        return;
      }if (projectList.length) {
        _index2.default.navigateTo({ url: "/pages/treeList/index" });
      }
    }, _this.handleProjectTypeChoice = function () {
      var typeArr = _this.props.projectType.typeArr;


      _index5.default.showDraw(typeArr, function (datas) {
        if (datas.code == -1) {
          return;
        }_this.props.dispatch({
          type: "projectType/saveState",
          response: {
            choiceProjectType: datas.choiceItem
          }
        });
      });
    }, _this.handleTypeChoice = function (data) {
      var alarmArr = _this.props.search.alarmArr;

      var arr = [];
      alarmArr.forEach(function (item) {
        if (item.value == data.value) {
          item.checked = !item.checked;
        }
        if (!!item.checked) {
          arr.push(item.value);
        }
      });

      _this.props.dispatch({
        type: "search/saveState",
        response: {
          alarmType: arr.join(",")
        }
      });
    }, _this.handleDateChoice = function () {
      _this.props.dispatch({
        type: "search/saveState",
        response: {
          timeDialog: true
        }
      });
    }, _this.handleDataTypeChoice = function (index) {
      _this.props.dispatch({
        type: "search/saveState",
        response: {
          dateType: index
        }
      });
    }, _this.handleSearch = function () {
      _this.props.dispatch({
        type: "search/saveState",
        response: {
          searchLists: []
        }
      });

      _this.__triggerPropsFn("onClick", [null].concat([]));
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Search, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Search.prototype.__proto__ || Object.getPrototypeOf(Search.prototype), "_constructor", this).call(this, props);
      this.handleCarChoice = this.handleCarChoice.bind(this);
      this.handleDateChoice = this.handleDateChoice.bind(this);
      this.handleRuleChoice = this.handleRuleChoice.bind(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // 清空搜索数据
      this.props.dispatch({
        type: "search/saveState",
        response: {
          navFixed: false,
          noData: false,
          loading: false,
          dayHour: 8,
          alarmType: [],
          bdate: (0, _moment2.default)(new Date()).format("YYYY-MM-DD 00:00:00"), // 开始时间
          edate: (0, _moment2.default)(new Date()).format("YYYY-MM-DD 23:59:59"), //结束时间
          searchPage: 1,
          searchLimit: 10,
          searchLists: [],
          listsTotal: 0,
          lastDateHistory: ""
        }
      });
    }

    // 选择车辆


    // 选择规则

    // 选择项目

    // 设备类型

    // 告警类型

    // 选择日期

    // 日期类型选择

    // 搜索事件回传给父组件

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var _props$search = this.__props.search,
          isCar = _props$search.isCar,
          isProject = _props$search.isProject,
          isTime = _props$search.isTime,
          isDate = _props$search.isDate,
          isDateType = _props$search.isDateType,
          isType = _props$search.isType,
          isProjectType = _props$search.isProjectType,
          timeArr = _props$search.timeArr,
          dayHour = _props$search.dayHour,
          alarmArr = _props$search.alarmArr,
          dateTypeList = _props$search.dateTypeList,
          dateType = _props$search.dateType,
          bdate = _props$search.bdate,
          edate = _props$search.edate,
          navFixed = _props$search.navFixed;
      var _props$treeList = this.__props.treeList,
          projectList = _props$treeList.projectList,
          isMultiSelect = _props$treeList.isMultiSelect,
          choiceChildId = _props$treeList.choiceChildId,
          choiceCarItem = _props$treeList.choiceCarItem,
          choiceProjectItem = _props$treeList.choiceProjectItem;
      var choiceProjectType = this.__props.projectType.choiceProjectType;


      var anonymousState__temp = !!isMultiSelect ? choiceChildId.length == 0 ? "所有车辆" : "\u6240\u9009\u8F66\u8F86\u6570(" + choiceChildId.length + ")" : null;
      var anonymousState__temp4 = !!isDate ? bdate.length > 12 ? "" + bdate.slice(0, 10) : bdate + " \u81F3 " + edate : null;
      var anonymousState__temp7 = "btn-search " + (navFixed ? "positionFixed" : "");
      var loopArray0 = dateTypeList.map(function (item, index) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp3 = !!isDateType ? "item " + (dateType == index + 1 ? "active" : "") + " " + (item.$$original.readonly ? "readonly" : "") : null;
        return {
          $loopState__temp3: $loopState__temp3,
          $$original: item.$$original
        };
      });
      var loopArray1 = alarmArr.map(function (item) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp6 = !!isType ? "title alarm-title " + (!!item.$$original.checked ? "active" : "") : null;
        return {
          $loopState__temp6: $loopState__temp6,
          $$original: item.$$original
        };
      });
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp4: anonymousState__temp4,
        anonymousState__temp7: anonymousState__temp7,
        loopArray0: loopArray0,
        loopArray1: loopArray1,
        isProject: isProject,
        projectList: projectList,
        Arrow: Arrow,
        isProjectType: isProjectType,
        isCar: isCar,
        isMultiSelect: isMultiSelect,
        isTime: isTime,
        dayHour: dayHour,
        timeArr: timeArr,
        isDateType: isDateType,
        dateTypeList: dateTypeList,
        isDate: isDate,
        isType: isType,
        alarmArr: alarmArr,
        choiceProjectItem: choiceProjectItem,
        choiceProjectType: choiceProjectType,
        choiceCarItem: choiceCarItem
      });
      return this.__state;
    }
  }]);

  return Search;
}(_index.Component)) || _class);
Search.properties = {
  "dispatch": null,
  "treeList": null,
  "projectType": null,
  "search": null,
  "__fn_onClick": null
};
Search.$$events = ["handleProjectChoice", "handleProjectTypeChoice", "handleCarChoice", "handleRuleChoice", "handleDataTypeChoice", "handleDateChoice", "handleTypeChoice", "handleSearch"];
exports.default = Search;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Search));