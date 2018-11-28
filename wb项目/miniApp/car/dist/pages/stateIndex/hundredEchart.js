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

var _echartsCommonMin = require("../../components/ec-canvas/echarts.common.min.js");

var echarts = _interopRequireWildcard(_echartsCommonMin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var barec = null;

var HundredEchart = (_dec = (0, _index3.connect)(function (_ref) {
  var statistics = _ref.statistics;
  return {
    statistics: statistics
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(HundredEchart, _BaseComponent);

  function HundredEchart() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, HundredEchart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = HundredEchart.__proto__ || Object.getPrototypeOf(HundredEchart)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["carName", "carNumber", "bdate", "edate", "ec", "noData"], _this.renderEchart = function () {
      var FuelPerOneHunKm = _this.props.statistics.FuelPerOneHunKm;


      if (FuelPerOneHunKm.length == 0) {
        _this.setState({
          noData: true
        });
        return;
      }

      var xData = [];
      var tankData = [];
      var tankHistoryData = [];
      FuelPerOneHunKm.forEach(function (item) {
        xData.push(item.carNumber);
        tankData.push(item.avgTankCalibration);
        tankHistoryData.push(item.avgHistoryTankCalibration);
      });

      barec.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [{ name: "历史均值", icon: "diamond" }, { name: "怠速时长", icon: "diamond" }]
        },

        toolbox: {
          show: false
        },
        color: ["#f6de16", "#0dbe3f"],
        grid: {
          left: "4%",
          right: "2%",
          bottom: "5%",
          // top:'8%',
          containLabel: true
        },
        xAxis: [{
          type: "category",
          data: xData,
          axisLabel: {
            rotate: 40
          },
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#dddddd",
              type: "dashed"
            }
          }
        }],
        yAxis: [{
          type: "value",
          name: "L/100km",
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#dddddd",
              type: "dashed"
            }
          }
        }],
        series: [{
          name: "历史均值",
          type: "line",
          data: tankHistoryData,
          symbol: "circle",
          symbolSize: 4
          // label: {
          //   show: true,
          //   position: "top",
          //   distance: 10,
          //   color: "#666666"
          // }
        }, {
          name: "怠速时长",
          type: "line",
          data: tankData,
          symbol: "circle",
          symbolSize: 1
          // label: {
          //   show: true,
          //   position: "top",
          //   bottom: 20,
          //   distance: 10,
          //   color: "#666666"
          // }
        }]
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HundredEchart, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(HundredEchart.prototype.__proto__ || Object.getPrototypeOf(HundredEchart.prototype), "_constructor", this).call(this, props);

      this.state = {
        carName: "",
        carNumber: "",
        bdate: "",
        edate: "",
        ec: {
          onInit: function onInit(canvas, width, height) {
            barec = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            canvas.setChart(barec);
            return barec;
          }
        },
        noData: false
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.renderEchart();
      }, 500);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return HundredEchart;
}(_index.Component)) || _class);
HundredEchart.properties = {
  "statistics": null
};
HundredEchart.$$events = [];
exports.default = HundredEchart;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(HundredEchart));