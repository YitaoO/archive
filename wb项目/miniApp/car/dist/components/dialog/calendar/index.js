"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../npm/@tarojs/redux/index.js");

var _calendar = require("./calendar.js");

var _calendar2 = _interopRequireDefault(_calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = (_dec = (0, _index3.connect)(function (_ref) {
  var search = _ref.search;
  return {
    search: search
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(Calendar, _BaseComponent);

  function Calendar() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "loopArray0", "loopArray1", "loopArray2", "typeIndex", "tabDatas", "calendar", "curMonth", "curYear", "nowDay", "weeksCh", "months", "monthsYear", "monthsSelect", "days", "selectedDay", "empytGrids", "lastEmptyGrids"], _this.renderMonthDay = function () {
      var arr = [];
      var monthsYear = new Date().getFullYear();
      var thisMonth = new Date().getMonth() + 1;

      for (var i = 0; i < 12; i++) {
        var month = i < 9 ? Number("0" + (i + 1)) : i == 9 ? 10 : i + 1;
        arr.push({
          value: month,
          checked: false,
          currentMonth: thisMonth == month ? true : false,
          disabled: thisMonth > month - 1 ? false : true,
          days: _this.getMonthLength(monthsYear + "-" + (month > 9 ? month : "0" + month))
        });
      }
      _this.setState({
        months: arr,
        monthsYear: monthsYear
      });
    }, _this.getMonthLength = function (date) {
      var d = new Date(date);
      d.setMonth(d.getMonth() + 1);
      d.setDate("1");
      d.setDate(d.getDate() - 1);
      return d.getDate();
    }, _this.handleTyleChoice = function (id) {
      var days = _this.state.days;
      days.forEach(function (item) {
        item.choosed = false;
      });
      _this.setState({
        typeIndex: id,
        days: days,
        selectedDay: []
      });
    }, _this.handleMonthChoic = function (index, item) {
      var datas = _this.state.months;

      if (!!item.disabled) {
        return;
      }datas.forEach(function (childItem, key) {
        if (index == key) {
          childItem.checked = true;
        } else {
          childItem.checked = false;
        }
      });

      _this.setState({
        monthsSelect: _this.state.monthsYear + "-" + item.value,
        months: datas
      });
      setTimeout(function () {
        _this.props.dispatch({
          type: "search/saveState",
          response: {
            bdate: _this.state.monthsYear + "-" + item.value + "-01",
            edate: _this.state.monthsYear + "-" + item.value + "-" + item.days,
            timeDialog: false
          }
        });
      }, 500);
    }, _this.handleHide = function () {
      _this.props.dispatch({
        type: "search/saveState",
        response: {
          timeDialog: false
        }
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Calendar.prototype.__proto__ || Object.getPrototypeOf(Calendar.prototype), "_constructor", this).call(this, props);
      this.state = {
        typeIndex: 0,
        tabDatas: [{ id: 0, value: "日" }, { id: 1, value: "周" }, { id: 2, value: "月" }],
        calendar: {
          //日历
          lastEmptyGrids: [],
          todayTimestamp: ""
        },
        curMonth: "",
        curYear: "",
        nowDay: "",
        weeksCh: ["日", "一", "二", "三", "四", "五", "六"],
        months: [],
        monthsYear: 0,
        monthsSelect: 0,
        days: [],
        selectedDay: [],
        empytGrids: [],
        lastEmptyGrids: []
      };
      this.handleHide = this.handleHide.bind(this);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      (0, _calendar2.default)({
        $_this: this,
        multi: true,
        afterTapDay: function afterTapDay(currentSelect, allSelectedDays) {
          if (allSelectedDays.length > 0) {
            var beginDate = allSelectedDays[0];
            var params = {};

            if (_this2.state.typeIndex == 0) {
              params = {
                bdate: beginDate.year + "-" + (beginDate.month > 9 ? beginDate.month : "0" + beginDate.month) + "-" + (beginDate.day > 9 ? beginDate.day : "0" + beginDate.day) + " 00:00:00",
                edate: beginDate.year + "-" + (beginDate.month > 9 ? beginDate.month : "0" + beginDate.month) + "-" + (beginDate.day > 9 ? beginDate.day : "0" + beginDate.day) + " 23:59:59"
              };
            } else {
              var endDate = allSelectedDays[allSelectedDays.length - 1];
              params = {
                bdate: beginDate.year + "-" + (beginDate.month > 9 ? beginDate.month : "0" + beginDate.month) + "-" + (beginDate.day > 9 ? beginDate.day : "0" + beginDate.day),
                edate: endDate.year + "-" + (endDate.month > 9 ? endDate.month : "0" + endDate.month) + "-" + (endDate.day > 9 ? endDate.day : "0" + endDate.day)
              };
            }

            setTimeout(function () {
              _this2.props.dispatch({
                type: "search/saveState",
                response: _extends({}, params, {
                  timeDialog: false
                })
              });
            }, 500);
          }
        }
      });
      this.renderMonthDay();
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this3 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var timeDialog = this.__props.search.timeDialog;


      var anonymousState__temp = "calendar-container " + (!!timeDialog ? "show" : "");

      var loopArray0 = this.__state.months.map(function (item, index) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp3 = _this3.__state.typeIndex == 2 ? "grid-month normal-day-color box box-align-center box-pack-center " + (!!item.$$original.disabled ? "disable-day-color" : "") : null;
        var $loopState__temp5 = _this3.__state.typeIndex == 2 ? (0, _index.internal_inline_style)(!!item.$$original.checked ? {
          background: "#5495e5;",
          color: "#fff",
          borderRadius: "3px",
          padding: "10px"
        } : "") : null;
        return {
          $loopState__temp3: $loopState__temp3,
          $loopState__temp5: $loopState__temp5,
          $$original: item.$$original
        };
      });

      var loopArray1 = this.__state.days.map(function (item, index) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp7 = _this3.__state.typeIndex == 0 ? "day border-radius box box-align-center box-pack-center " + (item.$$original.choosed ? "day-choosed-color pink-bg" : "") + " " + (item.$$original.disable ? "disable-day-color disable-day-circle" : "") + " " + (item.$$original.year + "-" + item.$$original.month + "-" + item.$$original.day == _this3.__state.nowDay ? "currentDay" : "") : null;
        return {
          $loopState__temp7: $loopState__temp7,
          $$original: item.$$original
        };
      });

      var loopArray2 = this.__state.days.map(function (item, index) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp9 = _this3.__state.typeIndex == 1 ? "day border-radius box box-align-center box-pack-center " + (item.$$original.choosed ? "day-choosed-color pink-bg" : "") + " " + (item.$$original.disable ? "disable-day-color disable-day-circle" : "") + " " + (item.$$original.year + "-" + item.$$original.month + "-" + item.$$original.day == _this3.__state.nowDay ? "currentDay" : "") : null;
        return {
          $loopState__temp9: $loopState__temp9,
          $$original: item.$$original
        };
      });

      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        loopArray0: loopArray0,
        loopArray1: loopArray1,
        loopArray2: loopArray2
      });
      return this.__state;
    }
  }]);

  return Calendar;
}(_index.Component)) || _class);
Calendar.properties = {
  "dispatch": null,
  "search": null
};
Calendar.$$events = ["handleHide", "handleTyleChoice", "choosePrevMonth", "chooseNextMonth", "handleMonthChoic", "calendarTouchstart", "calendarTouchmove", "tapDayItem"];
exports.default = Calendar;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Calendar));