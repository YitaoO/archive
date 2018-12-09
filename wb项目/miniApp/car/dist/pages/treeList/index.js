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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrowUpIcon = "/images/choiceCar_up_icon.png";
var ArrowDownIcon = "/images/choiceCar_down_icon.png";
var CheckALLIcon = "/images/chiceCar_check_box_all_con.png";
var CheckNoIcon = "/images/chiceCar_check_box_no_con.png";

var ChoiceCar = (_dec = (0, _index3.connect)(function (_ref) {
  var userInfo = _ref.userInfo,
      treeList = _ref.treeList,
      projectType = _ref.projectType,
      menu = _ref.menu;
  return {
    userInfo: userInfo,
    treeList: treeList,
    projectType: projectType,
    menu: menu
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(ChoiceCar, _BaseComponent);

  function ChoiceCar() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, ChoiceCar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = ChoiceCar.__proto__ || Object.getPrototypeOf(ChoiceCar)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "orgList", "ArrowUpIcon", "ArrowDownIcon", "isMultiSelect"], _this.handleArrow = function (item) {
      var _this$props$treeList = _this.props.treeList,
          carListTree = _this$props$treeList.carListTree,
          projectList = _this$props$treeList.projectList;
      var menuChoice = _this.props.menu.menuChoice;

      var dvaList = menuChoice.index == 6 ? projectList : carListTree;
      var choiceName = menuChoice.index == 6 ? "choiceProjectItem" : "choiceCarItem";
      var lists = Array.from(dvaList);
      lists.forEach(function (listItem) {
        if (listItem.id == item.id) {
          listItem.isShow = !listItem.isShow;
        }

        listItem.children.forEach(function (childItem) {
          if (childItem.patherId == item.id) {
            childItem.isShow = !childItem.isShow;
          }
        });
      });
      _this.props.dispatch({
        type: "treeList/saveState",
        response: _defineProperty({}, "" + choiceName, lists)
      });
    }, _this.handlePathter = function (item) {
      var menuChoice = _this.props.menu.menuChoice;
      var _this$props$treeList2 = _this.props.treeList,
          isMultiSelect = _this$props$treeList2.isMultiSelect,
          carListTree = _this$props$treeList2.carListTree,
          projectList = _this$props$treeList2.projectList,
          choiceFatherId = _this$props$treeList2.choiceFatherId;

      var orgList = menuChoice.index == 6 ? projectList : carListTree;

      if (!isMultiSelect) {
        if (menuChoice.index != 6) {
          return;
        }_this.renderSingle(item);
      } else {
        _this.renderMultiSelect(choiceFatherId, "choiceFatherId", item.id).then(function (lists) {
          var saveList = [];
          Array.from(orgList).forEach(function (listItem) {
            listItem.children.forEach(function (childItem) {
              if (lists.includes(String(childItem.patherId))) {
                saveList.push(childItem.id);
              }
            });
          });
          _this.props.dispatch({
            type: "treeList/saveState",
            response: {
              choiceChildId: saveList
            }
          });
        });
      }
    }, _this.renderMultiSelect = function (parantList, name, id) {
      return new Promise(function (resolve) {
        var project = Array.from(parantList);
        if (!!project.includes(String(id))) {
          project.splice(project.findIndex(function (value, index, arr) {
            return value === id;
          }), 1);
        } else {
          project.push(String(id));
        }

        if (parantList.length == 0) {
          _this.props.dispatch({
            type: "treeList/saveState",
            response: {
              choiceChildId: []
            }
          });
        }

        _this.props.dispatch({
          type: "treeList/saveState",
          response: _defineProperty({}, "" + name, project)
        });
        resolve(project);
      });
    }, _this.handleChildren = function (item) {
      var _this$props$treeList3 = _this.props.treeList,
          isMultiSelect = _this$props$treeList3.isMultiSelect,
          choiceChildId = _this$props$treeList3.choiceChildId;


      if (!isMultiSelect) {
        _this.renderSingle(item);
      } else {
        _this.renderMultiSelect(choiceChildId, "choiceChildId", item.id);
      }
    }, _this.renderSingle = function (item) {
      var menuChoice = _this.props.menu.menuChoice;

      var saveName = menuChoice.index == 6 ? "choiceProjectItem" : "choiceCarItem";

      _this.props.dispatch({
        type: "treeList/saveState",
        response: _defineProperty({}, "" + saveName, {
          text: item.text,
          id: item.id,
          isFather: item.isFather,
          attributes: item.attributes
        })
      });
      //项目无车辆滞空
      if (menuChoice.index == 6) {
        var choiceProjectItem = _this.props.treeList.choiceProjectItem;
        var projectTypeList = _this.props.projectType.projectTypeList;

        var arr = [];

        if (!!projectTypeList) {
          Object.keys(projectTypeList).forEach(function (key) {
            if (key == choiceProjectItem.attributes.departId) {
              var lists = projectTypeList[key];
              Object.keys(lists).forEach(function (childKey) {
                arr.push({
                  typeName: lists[childKey].typeName,
                  typeId: lists[childKey].typeId
                });
              });
            }
          });
        }
        _this.props.dispatch({
          type: "projectType/saveState",
          response: {
            typeArr: arr,
            choiceProjectType: {
              typeName: "全部",
              typeId: -1
            }
          }
        });
      }

      _index2.default.navigateBack({
        delta: 1
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ChoiceCar, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(ChoiceCar.prototype.__proto__ || Object.getPrototypeOf(ChoiceCar.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var menuChoice = this.props.menu.menuChoice;

      _index2.default.setNavigationBarTitle({
        title: menuChoice.index == 6 ? "项目选择" : "车辆选择"
      });
    }

    // 点击箭头


    // 点击父亲

    // 点击儿子

    //单选

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var _props$treeList = this.__props.treeList,
          isMultiSelect = _props$treeList.isMultiSelect,
          projectList = _props$treeList.projectList,
          carListTree = _props$treeList.carListTree,
          choiceFatherId = _props$treeList.choiceFatherId,
          choiceChildId = _props$treeList.choiceChildId;
      var menuChoice = this.__props.menu.menuChoice;

      var orgList = menuChoice.index == 6 ? projectList : carListTree;
      var loopArray0 = orgList.map(function (item) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = !!isMultiSelect ? choiceFatherId.includes(String(item.$$original.id)) ? CheckALLIcon : CheckNoIcon : null;
        var $loopState__temp4 = "wrap-name " + (!isMultiSelect ? "isMul" : "");
        var $anonymousCallee__0 = item.$$original.children.map(function (childItem) {
          childItem = {
            $$original: (0, _index.internal_get_original)(childItem)
          };
          var $loopState__temp6 = !!isMultiSelect ? choiceChildId == childItem.$$original.id || choiceChildId.includes(String(childItem.$$original.id)) ? CheckALLIcon : CheckNoIcon : null;
          return {
            $loopState__temp6: $loopState__temp6,
            $$original: childItem.$$original
          };
        });
        return {
          $loopState__temp2: $loopState__temp2,
          $loopState__temp4: $loopState__temp4,
          $anonymousCallee__0: $anonymousCallee__0,
          $$original: item.$$original
        };
      });
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        orgList: orgList,
        ArrowUpIcon: ArrowUpIcon,
        ArrowDownIcon: ArrowDownIcon,
        isMultiSelect: isMultiSelect
      });
      return this.__state;
    }
  }]);

  return ChoiceCar;
}(_index.Component)) || _class);
ChoiceCar.properties = {
  "menu": null,
  "treeList": null,
  "dispatch": null,
  "projectType": null
};
ChoiceCar.$$events = ["handleArrow", "handlePathter", "handleChildren"];
exports.default = ChoiceCar;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(ChoiceCar, true));