"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _api = require("../services/api.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  namespace: "treeList",
  state: {
    carListTree: [], //车辆
    projectList: [], // 项目
    isMultiSelect: true, //是否多选(调试完改为true)
    choiceCarItem: null, //选中的单个车辆信息
    choiceProjectItem: null, //选中单个项目信息
    choiceFatherId: [], //选中父集合
    choiceChildId: [] //选中集合
  },
  reducers: {
    saveState: function saveState(state, payload) {
      return _extends({}, state, payload.response);
    }
  },
  effects: {
    //获取树
    getTreeList: /*#__PURE__*/regeneratorRuntime.mark(function getTreeList(_ref, _ref2) {
      var _response;

      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var url, params, typeTree, fun, listName, choiceName, response, arr;
      return regeneratorRuntime.wrap(function getTreeList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = payload.url, params = payload.params, typeTree = payload.typeTree;
              fun = typeTree == 1 ? _api.reqListTreeProject : _api.reqListTreeCar;
              listName = typeTree == 1 ? "projectList" : "carListTree";
              choiceName = typeTree == 1 ? "choiceProjectItem" : "choiceCarItem";
              _context.next = 6;
              return call(fun, url, params);

            case 6:
              response = _context.sent;
              arr = [];

              response.forEach(function (item) {
                var _arr$push;

                var children = [];
                item.children.forEach(function (childItem) {
                  children.push({
                    isFather: false,
                    isShow: true,
                    patherId: typeTree == 1 ? item.id : item.projSubId,
                    id: typeTree == 1 ? childItem.id : childItem.gpsDeviceSimNo,
                    text: typeTree == 1 ? childItem.text : childItem.carNumber,
                    desText: typeTree == 1 ? "" : childItem.carModelName
                  });
                });

                arr.push((_arr$push = {
                  isShow: true,
                  isFather: true,
                  attributes: !!item.attributes ? item.attributes : "",
                  id: typeTree == 1 ? item.id : item.projSubId,
                  text: typeTree == 1 ? item.text : item.projSubName
                }, _defineProperty(_arr$push, "isShow", true), _defineProperty(_arr$push, "children", children), _arr$push));
              });

              _context.next = 11;
              return put({
                type: "saveState",
                response: (_response = {}, _defineProperty(_response, "" + listName, arr), _defineProperty(_response, "" + choiceName, typeTree == 1 ? arr[0] : null), _response)
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, getTreeList, this);
    })
  }
};