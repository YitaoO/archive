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

var AlermEchart = (_dec = (0, _index3.connect)(function (_ref) {
  var statistics = _ref.statistics;
  return {
    statistics: statistics
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(AlermEchart, _BaseComponent);

  function AlermEchart() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, AlermEchart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = AlermEchart.__proto__ || Object.getPrototypeOf(AlermEchart)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["carName", "carNumber", "bdate", "edate", "ec"], _this.renderEchart = function () {
      var WarningReports = _this.props.statistics.WarningReports;

      var xData = [];
      var y1Data = [];
      var y2Data = [];
      var y3Data = [];
      var y4Data = [];
      WarningReports.forEach(function (item) {
        xData.push(item.xParameter);
        y1Data.push(item.overSpeedWarning);
        y2Data.push(item.idelSpeedWarning);
        y3Data.push(item.oilWarning);
        y4Data.push(item.stationWarning);
      });

      barec.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [{ name: "油位告警", icon: "diamond" }, { name: "出围栏告警", icon: "diamond" }]
        },
        toolbox: {
          show: false
        },
        color: ["#12d2d1", "#0dbe3f"],
        grid: {
          left: "4%",
          right: "3%",
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
          name: "次数",
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
        series: [
        // {
        //   name:'超速告警',
        //   type: 'line',
        //   data: y1Data,
        //   symbol:'circle',
        //   symbolSize:4,
        //   label: {
        //     show: true,
        //     position: "top",
        //     distance:5,
        //     color:'#666666',
        //   }
        // },
        // {
        //   name:'怠速告警',
        //   type: 'line',
        //   data: y2Data,
        //   symbol:'circle',
        //   symbolSize:4,
        //   label: {
        //     show: true,
        //     position: "top",
        //     distance:5,
        //     color:'#666666',
        //   }
        // },
        {
          name: "油位告警",
          type: "line",
          data: y3Data,
          symbol: "circle",
          symbolSize: 4
          // label: {
          //   show: true,
          //   position: "top",
          //   distance:5,
          //   color:'#666666',
          // }
        }, {
          name: "出围栏告警",
          type: "line",
          data: y4Data,
          symbol: "circle",
          symbolSize: 4
          // label: {
          //   show: true,
          //   position: "top",
          //   distance:5,
          //   color:'#666666',
          // }
        }]
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AlermEchart, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(AlermEchart.prototype.__proto__ || Object.getPrototypeOf(AlermEchart.prototype), "_constructor", this).call(this, props);

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
        }
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

  return AlermEchart;
}(_index.Component)) || _class);
AlermEchart.properties = {
  "statistics": null
};
AlermEchart.$$events = [];
exports.default = AlermEchart;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(AlermEchart));