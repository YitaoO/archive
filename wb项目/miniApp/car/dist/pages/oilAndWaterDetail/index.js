"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _echartsCommonMin = require("../../components/ec-canvas/echarts.common.min.js");

var echarts = _interopRequireWildcard(_echartsCommonMin);

var _index3 = require("../../components/dialog/index.js");

var _index4 = _interopRequireDefault(_index3);

var _api = require("../../services/api.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var barec = null;

var oilWaterDetail = function (_BaseComponent) {
  _inherits(oilWaterDetail, _BaseComponent);

  function oilWaterDetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, oilWaterDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = oilWaterDetail.__proto__ || Object.getPrototypeOf(oilWaterDetail)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["carName", "carNumber", "bdate", "edate", "ec"], _this.getData = function (params) {
      _index4.default.showLoading("请等待...");
      params.bdate = params.bdate.length > 13 ? params.bdate : params.bdate + " 00:00:00";
      params.edate = params.edate.length > 13 ? params.edate : params.edate + " 23:59:59";
      (0, _api.reqStatisticsDetail)("/gpsdevicebuffers/getCarFuleLevel", {
        simno: params.simno,
        bdate: "" + params.bdate,
        edate: "" + params.edate,
        type: params.index == 4 ? 2 : 3
      }).then(function (datas) {
        var arr = [];
        var yArr = [];
        datas.forEach(function (item) {
          var value = 0;
          switch (params.index) {
            case "4":
              value = item.orgFuelLevel > 0 ? item.orgFuelLevel : item.fuelLevel;
              break;
            default:
              value = item.orgWaterLevel > 0 ? item.orgWaterLevel : item.waterLevel;
              break;
          }
          arr.push({
            name: value,
            value: [item.addDate, value]
          });
          yArr.push(value);
        });

        var max = parseInt(Math.max.apply(Math, yArr)) + 1;
        var min = parseInt(Math.min.apply(Math, yArr));

        _index4.default.showLoading("请等待...");
        barec.setOption({
          color: "#3ab363",
          xAxis: {
            type: "time"
          },
          yAxis: {
            name: params.index == 4 ? !!datas[0].fuelLevelFlag ? "耗油量(L)" : "耗油量(cm)" : !!datas[0].waterLevelFlag ? "洒水量(T)" : "洒水量(cm)",
            type: "value",
            // data: yArr,
            max: max,
            min: params.index == 4 ? min : 0,
            boundaryGap: [0, "100%"]
          },
          grid: {
            top: 30,
            bottom: 20,
            left: 35,
            right: 35
            // containLabel: true
          },
          series: [{
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data: arr
          }]
        });
        _index4.default.hideLoading();
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(oilWaterDetail, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(oilWaterDetail.prototype.__proto__ || Object.getPrototypeOf(oilWaterDetail.prototype), "_constructor", this).call(this, props);

      this.state = {
        carName: "",
        carNumber: "",
        bdate: "",
        edate: "",
        ec: {
          // disableTouch: true,
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

      var params = this.$router.params;

      _index2.default.setNavigationBarTitle({
        title: params.index == 4 ? "燃油详情" : "洒水详情"
      });

      setTimeout(function () {
        _this2.setState({
          carName: params.carName,
          carNumber: params.carNumber,
          bdate: params.bdate.substr(0, 10),
          edate: params.edate.substr(0, 10)
        });
        _this2.getData(params);
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

  return oilWaterDetail;
}(_index.Component);

oilWaterDetail.properties = {};
oilWaterDetail.$$events = [];
exports.default = oilWaterDetail;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(oilWaterDetail, true));