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

var UseEfficEchart = (_dec = (0, _index3.connect)(function (_ref) {
  var statistics = _ref.statistics;
  return {
    statistics: statistics
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(UseEfficEchart, _BaseComponent);

  function UseEfficEchart() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, UseEfficEchart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = UseEfficEchart.__proto__ || Object.getPrototypeOf(UseEfficEchart)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["ec"], _this.renderEchart = function () {
      var UseEffic = _this.props.statistics.UseEffic;


      var xData = [];
      var trafficData = [];
      var idleData = [];
      var effic = [];
      UseEffic.forEach(function (item) {
        xData.push(item.carNumber);
        trafficData.push((item.trafficDuration / 3600).toFixed(1));
        idleData.push((item.idleDuration / 3600).toFixed(1));
        effic.push(item.effic);
      });

      barec.setOption({
        //TODO:这里如果折线图的话会重叠，所以暂时全部用方块，待解决
        legend: {
          data: [{ name: "行驶时长", icon: "rect" }, { name: "怠速时长", icon: "rect" }, { name: "使用率", icon: "diamond" }]
        },
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: false
        },
        color: ["#678af2", "#98e942", "#f6de16"],
        grid: {
          left: "-2%",
          right: "10%",
          bottom: "10%",
          containLabel: true
        },
        yAxis: [{
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
            show: false,
            lineStyle: {
              color: "#dddddd",
              type: "dashed"
            }
          }
        }],
        xAxis: [{
          type: "value",
          name: "h",
          position: "left",
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: false
          }
        }, {
          type: "value",
          // name: "%",
          show: true,
          position: "right",
          axisLabel: {
            formatter: "{value} %"
          },
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: false
          }
        }],
        series: [{
          name: "怠速时长",
          type: "bar",
          stack: "总量",
          data: idleData,
          barMaxWidth: 15
        }, {
          name: "行驶时长",
          type: "bar",
          stack: "总量",
          barMaxWidth: 15,
          data: trafficData,
          label: {
            show: true,
            // position: "right",
            distance: 10,
            color: "#666666",
            formatter: function formatter(p) {
              var data = "";
              effic.forEach(function (item, key) {
                if (p.dataIndex == key) {
                  data = item + "%";
                  return;
                }
              });
              return data;
            }
          }
        }, {
          name: "使用率",
          xAxisIndex: 1,
          type: "line",
          data: effic,
          // symbol: "circle",
          // symbolSize: 6,
          itemStyle: {
            normal: {
              color: "#ffa210"
            }
          },
          // label: {
          //   show: true,
          //   position: "right",
          //   distance: 8,
          //   color: "#666666"
          // },
          lineStyle: {
            color: "#f6de16"
          }
        }]
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UseEfficEchart, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(UseEfficEchart.prototype.__proto__ || Object.getPrototypeOf(UseEfficEchart.prototype), "_constructor", this).call(this, props);

      this.state = {
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

  return UseEfficEchart;
}(_index.Component)) || _class);
UseEfficEchart.properties = {
  "statistics": null
};
UseEfficEchart.$$events = [];
exports.default = UseEfficEchart;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(UseEfficEchart));