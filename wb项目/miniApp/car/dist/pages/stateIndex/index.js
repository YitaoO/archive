"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class; //使用率
//洒水量
//费用
//耗油量/行驶里程统计
//百公里耗油量统计
//告警统计

//模版 - 暂无数据


var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = require("../../npm/@tarojs/redux/index.js");

var _index3 = require("../../components/dialog/index.js");

var _index4 = _interopRequireDefault(_index3);

var _api = require("../../services/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//TODO:这里放在这里是因为需要同步，后期优化放在model

var StateIndex = (_dec = (0, _index2.connect)(function (_ref) {
  var userInfo = _ref.userInfo,
      menu = _ref.menu,
      search = _ref.search,
      statistics = _ref.statistics,
      treeList = _ref.treeList,
      projectType = _ref.projectType;
  return {
    userInfo: userInfo,
    menu: menu,
    search: search,
    statistics: statistics,
    treeList: treeList,
    projectType: projectType
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(StateIndex, _BaseComponent);

  function StateIndex() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, StateIndex);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = StateIndex.__proto__ || Object.getPrototypeOf(StateIndex)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "echartLists", "UseEffic", "WarningReports", "FuelPerOneHunKm"], _this.getTreeData = function () {
      var UserID = _this.props.userInfo.carUserInfo.UserID;
      var projectList = _this.props.treeList.projectList;
      var projectTypeList = _this.props.projectType.projectTypeList;


      if (projectList.length == 0 || projectTypeList.length == 0) {
        (0, _api.reqListTreeProject)("/OrgDepart/getAllOrgDepart", {
          userId: UserID,
          type: 1
        }).then(function (datas) {
          _this.saveDvaDisp(1, datas);
        });
      }
    }, _this.saveDvaDisp = function (type, datas) {
      var arr = [];
      datas.forEach(function (item) {
        var _arr$push;

        var children = [];
        item.children.forEach(function (childItem) {
          children.push({
            isFather: false,
            isShow: true,
            patherId: type == 1 ? item.id : item.projSubId,
            attributes: !!childItem.attributes ? childItem.attributes : "",
            id: type == 1 ? childItem.id : childItem.gpsDeviceSimNo,
            text: type == 1 ? childItem.text : childItem.carNumber,
            desText: type == 1 ? "" : childItem.carModelName
          });
        });

        arr.push((_arr$push = {
          isShow: true,
          isFather: true,
          attributes: !!item.attributes ? item.attributes : "",
          id: type == 1 ? item.id : item.projSubId,
          text: type == 1 ? item.text : item.projSubName
        }, _defineProperty(_arr$push, "isShow", true), _defineProperty(_arr$push, "children", children), _arr$push));
      });
      //获取类型列表
      _this.getTypeList(arr, arr[0]);
      _this.props.dispatch({
        type: "treeList/saveState",
        response: {
          projectList: arr,
          choiceProjectItem: arr[0]
        }
      });

      _this.getState(arr[0]);
    }, _this.getTypeList = function (projectArr, projectFirst) {
      var UserID = _this.props.userInfo.carUserInfo.UserID;
      var projectTypeList = _this.props.projectType.projectTypeList;

      var arr = [];
      (0, _api.reqListProjetType)("/ConsumerTypeOACar/selectByQuery1", {
        userId: UserID
      }).then(function (datas) {
        var typeList = datas.data;
        _this.props.dispatch({
          type: "projectType/saveState",
          response: {
            projectTypeList: typeList
          }
        });
        Object.keys(typeList).forEach(function (key) {
          if (key == projectFirst.attributes.departId) {
            var lists = typeList[key];
            Object.keys(lists).forEach(function (childKey) {
              arr.push({
                typeName: lists[childKey].typeName,
                typeId: lists[childKey].typeId
              });
            });
          }
        });

        _this.props.dispatch({
          type: "projectType/saveState",
          response: {
            typeArr: arr
          }
        });
      });
    }, _this.getState = function (choiceItem) {
      if (!choiceItem) {
        return;
      }var UserID = _this.props.userInfo.carUserInfo.UserID;
      var _this$props$search = _this.props.search,
          dayHour = _this$props$search.dayHour,
          dateType = _this$props$search.dateType;
      var choiceProjectType = _this.props.projectType.choiceProjectType;
      var echartLists = _this.props.statistics.echartLists;

      echartLists.forEach(function (item) {
        item.isUp = true;
      });

      var name = choiceItem.attributes.type == 1 ? "projId" : "projSubId";

      var params = _defineProperty({
        carModel: !!choiceProjectType ? choiceProjectType.typeId == -1 ? "" : choiceProjectType.typeId : "",
        dateType: dateType,
        userId: UserID,
        dayHour: dayHour
      }, "" + name, choiceItem.attributes.departId);
      //清空数据
      _this.props.dispatch({
        type: "statistics/saveState",
        response: {
          echartLists: echartLists,
          UseEffic: [],
          FuelPerOneHunKm: [],
          WarningReports: []
        }
      });
      for (var i = 0; i < 3; i++) {
        var url = "";
        var listName = "";
        switch (i) {
          case 0:
            //使用率
            url = "/homepage/getCarUseEffic";
            listName = "UseEffic";
            break;
          case 1:
            url = "/homepage/getFuelPerOneHunKm";
            listName = "FuelPerOneHunKm";
            break;
          case 2:
            url = "/homepage/getCarWarningReports";
            listName = "WarningReports";

            params.projType = choiceItem.attributes.type == 1 ? 1 : 0;
            break;
          default:
            break;
        }
        _this.props.dispatch({
          type: "statistics/getStatisticsList",
          payload: {
            listName: listName,
            url: url,
            params: params
          }
        });
      }
    }, _this.handleSearch = function () {
      var choiceProjectItem = _this.props.treeList.choiceProjectItem;


      _index4.default.showLoading("请求中...");
      _this.getState(choiceProjectItem);
    }, _this.handlePackUp = function (item) {
      var echartLists = _this.props.statistics.echartLists;

      var lists = echartLists;
      lists.forEach(function (items) {
        if (items.index == item.index) {
          items.isUp = !items.isUp;
          return;
        }
      });

      _this.setState({
        lists: lists
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(StateIndex, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(StateIndex.prototype.__proto__ || Object.getPrototypeOf(StateIndex.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      //初始化模块
      this.props.dispatch({
        type: "search/saveState",
        response: {
          isProject: true,
          isCar: false,
          isTime: true,
          isDate: false,
          isType: false,
          isProjectType: true,
          isDateType: true
        }
      });
      // 获取项目树，项目类型
      this.getTreeData();
    }
    /**
     * 获取树
     * type     model类型
     * url      请求url
     * params   请求参数
     * extraParam  额外参数
     */

    /**
     * 处理树数据
     * type 类型(0:车辆列表;1:项目列表)
     * datas 接口数据
     */

    // 获取类型列表

    // 获取echart数据

    // 处理搜索接口请求事件

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var _props$statistics = this.__props.statistics,
          echartLists = _props$statistics.echartLists,
          UseEffic = _props$statistics.UseEffic,
          FuelPerOneHunKm = _props$statistics.FuelPerOneHunKm,
          WarningReports = _props$statistics.WarningReports;

      var dataLength = UseEffic.length;
      var waterShow = false;
      var typeArr = this.__props.projectType.typeArr;


      typeArr.forEach(function (item) {
        //是否显示洒水统计
        if (item.typeName == "洒水车") {
          waterShow = true;
        }
      });

      echartLists.forEach(function (item) {
        //echaer高度自适应
        if (dataLength > 4) {
          item.height = 300 + (dataLength - 5) * 20 + "px";
          if (item.index == 1) {
            //洒水量
            item.height = 300 + (dataLength - 5) * 10 + "px";
          }
          if (item.index == 2) {
            //耗油量/行驶里程统计
            item.height = 300 + (dataLength - 5) * 40 + "px";
          }
        }
      });

      var loopArray0 = echartLists.map(function (item) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = (0, _index.internal_inline_style)(item.$$original.index == 1 && !waterShow ? "display:none" : "");
        var $loopState__temp4 = "item-echart ";
        var $loopState__temp6 = (0, _index.internal_inline_style)(item.$$original.isUp ? "height:" + item.$$original.height : "display:none;");
        return {
          $loopState__temp2: $loopState__temp2,
          $loopState__temp4: $loopState__temp4,
          $loopState__temp6: $loopState__temp6,
          $$original: item.$$original
        };
      });
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        echartLists: echartLists,
        UseEffic: UseEffic,
        WarningReports: WarningReports,
        FuelPerOneHunKm: FuelPerOneHunKm
      });
      return this.__state;
    }
  }]);

  return StateIndex;
}(_index.Component)) || _class);
StateIndex.properties = {
  "dispatch": null,
  "userInfo": null,
  "treeList": null,
  "projectType": null,
  "search": null,
  "statistics": null
};
StateIndex.$$events = ["onScrolltolower", "onScroll", "handleSearch", "handlePackUp"];
exports.default = StateIndex;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(StateIndex, true));