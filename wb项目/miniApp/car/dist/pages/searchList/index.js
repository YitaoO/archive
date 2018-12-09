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

var _index4 = require("../../components/dialog/index.js");

var _index5 = _interopRequireDefault(_index4);

var _api = require("../../services/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var loadingIcon = "/images/search_loading_icon.png";
//TODO:这里放在这里是因为需要同步，后期优化放在model

var SearchIndex = (_dec = (0, _index3.connect)(function (_ref) {
  var userInfo = _ref.userInfo,
      search = _ref.search,
      treeList = _ref.treeList,
      projectType = _ref.projectType,
      menu = _ref.menu,
      statistics = _ref.statistics;
  return {
    userInfo: userInfo,
    search: search,
    treeList: treeList,
    projectType: projectType,
    menu: menu,
    statistics: statistics
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(SearchIndex, _BaseComponent);

  function SearchIndex() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchIndex);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = SearchIndex.__proto__ || Object.getPrototypeOf(SearchIndex)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["menuChoice", "loading", "loadingIcon", "noData"], _this.getTreeCar = function () {
      var UserID = _this.props.userInfo.carUserInfo.UserID;

      (0, _api.reqListTreeCar)("/ConsumerProjCarCarInfo/listTreeCar", {
        userId: UserID,
        type: 1
      }).then(function (datas) {
        _this.saveDvaDisp(0, datas);
      });
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
      _this.props.dispatch({
        type: "treeList/saveState",
        response: {
          carListTree: arr
        }
      });
    }, _this.onScroll = function (e) {
      var top = e.detail.scrollTop;
      var navFixed = top >= 200 ? true : false;
      _this.props.dispatch({
        type: "search/saveState",
        response: {
          navFixed: navFixed
        }
      });
    }, _this.getData = function (data) {
      var _this$props$search = _this.props.search,
          bdate = _this$props$search.bdate,
          edate = _this$props$search.edate,
          dayHour = _this$props$search.dayHour,
          searchLimit = _this$props$search.searchLimit,
          alarmType = _this$props$search.alarmType;
      var _this$props$treeList = _this.props.treeList,
          choiceCarItem = _this$props$treeList.choiceCarItem,
          choiceChildId = _this$props$treeList.choiceChildId;
      var UserID = _this.props.userInfo.carUserInfo.UserID;
      var menuChoice = _this.props.menu.menuChoice;
      var lastDateHistory = _this.props.search.lastDateHistory;

      var item = {};
      switch (menuChoice.index) {
        case 1:
          //历史轨迹
          item = {
            url: "/carproj/getCarAccInfoByUserIdForWeiXin",
            param: {
              simno: choiceCarItem.id,
              page: data.page,
              limit: searchLimit
            }
          };
          if (lastDateHistory != "") {
            item.param.lastDate = lastDateHistory;
          }

          break;
        case 2:
          //行驶统计
          item = {
            url: "/carproj/getCarAccInfoByUserId",
            param: {
              userId: UserID,
              dayHour: dayHour,
              type: 3,
              page: data.page,
              limit: searchLimit
            }
          };
          break;
        case 3:
          //告警统计
          item = {
            url: "/ConsumerWarningInfo/selectByQuery",
            param: {
              userId: UserID,
              page: data.page,
              limit: searchLimit
            }
          };

          if (alarmType.length > 0) {
            item.param.type = alarmType;
          }

          break;
        case 4:
          //燃油统计
          item = {
            url: "/carproj/getRefuelStatics",
            param: {
              userId: UserID,
              type: 1,
              page: data.page,
              limit: searchLimit
            }
          };
          break;
        case 5:
          //洒水统计
          item = {
            url: "/carproj/getRefuelStatics",
            param: {
              userId: UserID,
              type: 2,
              dataType: 1,
              page: data.page,
              limit: searchLimit
            }
          };
          break;
        default:
          break;
      }

      if (menuChoice.index !== 1 && menuChoice.index !== 6) {
        item.param.dataType = 1;
        item.param.bdate = bdate.length > 12 ? bdate : bdate + " 00:00:00";
        item.param.edate = edate.length > 12 ? edate : edate + " 23:59:59";

        if (choiceChildId.length > 0) {
          item.param.simno = choiceChildId.join(",");
        }
      }
      _this.props.dispatch({
        type: "search/getList",
        payload: {
          url: item.url,
          params: item.param,
          type: menuChoice.index
        }
      });
    }, _this.handleSearch = function () {
      var choiceCarItem = _this.props.treeList.choiceCarItem;
      var menuChoice = _this.props.menu.menuChoice;


      if (!choiceCarItem && menuChoice.index == 1) {
        _index5.default.showAlert("请选择车辆");
        return;
      }
      _this.props.dispatch({
        type: "search/saveState",
        response: {
          loading: false,
          noData: false
        }
      });
      _index5.default.showLoading("请求中...");
      _this.getData({ page: 1 });
    }, _this.onScrolltolower = function () {
      var menuChoice = _this.props.menu.menuChoice;
      var _this$props$search2 = _this.props.search,
          searchPage = _this$props$search2.searchPage,
          searchLimit = _this$props$search2.searchLimit,
          listsTotal = _this$props$search2.listsTotal,
          searchOver = _this$props$search2.searchOver;


      if (!searchOver || menuChoice.index == 6) {
        return;
      }if (searchPage * searchLimit >= listsTotal) {
        _this.props.dispatch({
          type: "search/saveState",
          response: {
            loading: false,
            noData: true
          }
        });
        return;
      }

      _this.props.dispatch({
        type: "search/saveState",
        response: {
          loading: true,
          searchOver: false
        }
      });
      _this.getData({ page: Number(searchPage) + 1 });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchIndex, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(SearchIndex.prototype.__proto__ || Object.getPrototypeOf(SearchIndex.prototype), "_constructor", this).call(this, props);
      this.onScrolltolower = this.onScrolltolower.bind(this);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var menuChoice = this.props.menu.menuChoice;
      var carListTree = this.props.treeList.carListTree;


      _index2.default.setNavigationBarTitle({
        title: menuChoice.title
      });

      var searchList = {};

      switch (menuChoice.index) {
        case 1:
          //历史轨迹
          searchList = {
            isProject: false,
            isCar: true,
            isTime: false,
            isDate: false,
            isType: false,
            isDateType: false,
            isProjectType: false
          };

          break;
        case 2:
          //行驶统计
          searchList = {
            isProject: false,
            isCar: true,
            isTime: true,
            isDate: true,
            isType: false,
            isDateType: false,
            isProjectType: false
          };
          break;
        case 3:
          //告警统计
          searchList = {
            isProject: false,
            isCar: true,
            isTime: false,
            isDate: true,
            isType: true,
            isDateType: false,
            isProjectType: false
          };
          break;
        case 4:
          //燃油统计
          searchList = {
            isProject: false,
            isCar: true,
            isTime: false,
            isDate: true,
            isType: false,
            isDateType: false,
            isProjectType: false
          };
          break;
        case 5:
          //洒水统计
          searchList = {
            isProject: false,
            isCar: true,
            isTime: false,
            isDate: true,
            isType: false,
            isDateType: false,
            isProjectType: false
          };
          break;
        case 6:
          //运行状态
          searchList = {
            isProject: true,
            isCar: false,
            isTime: true,
            isDate: false,
            isType: false,
            isProjectType: true,
            isDateType: true
          };

          break;
        default:
          break;
      }

      searchList.loading = false;
      // 存储显示搜索内容
      this.props.dispatch({
        type: "search/saveState",
        response: searchList
      });

      //首页历史轨迹进来
      if (!!this.$router.params.isCheck) {
        _index5.default.showLoading("请求中...");
        this.getData({ page: 1 });
      }

      // 获取车辆树，项目树，项目类型
      if (carListTree.length == 0) {
        this.getTreeCar();
      }
    }
    /**
     * 处理树数据
     * type 类型(0:车辆列表;1:项目列表)
     * datas 接口数据
     * TODO:这里stateIndex也调用了,重复,待优化
     */

    // 获取其他数据

    // 处理搜索接口请求事件

    //上拉加载更多

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var menuChoice = this.__props.menu.menuChoice;
      var _props$search = this.__props.search,
          loading = _props$search.loading,
          noData = _props$search.noData;


      Object.assign(this.__state, {
        menuChoice: menuChoice,
        loading: loading,
        loadingIcon: loadingIcon,
        noData: noData
      });
      return this.__state;
    }
  }]);

  return SearchIndex;
}(_index.Component)) || _class);
SearchIndex.properties = {
  "menu": null,
  "treeList": null,
  "dispatch": null,
  "userInfo": null,
  "search": null
};
SearchIndex.$$events = ["onScrolltolower", "onScroll", "handleSearch"];
exports.default = SearchIndex;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(SearchIndex, true));