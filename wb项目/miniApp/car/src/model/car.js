import Taro from "@tarojs/taro";
import {
  reqCarStateList,
  reqListTreeCar,
  reqCarAccInfo,
  reqCarTrance,
  reqCarAccTranceDetail
} from "../services/api";

import carOn from "../images/index_car_on_icon.png";
import carOff from "../images/index_car_off_icon.png";
import StartIcon from "../images/map_trace_start_icon.png";
import EndIcon from "../images/map_trace_end_icon.png";

export default {
  namespace: "car",
  state: {
    carStateList: [], //车辆最新状态
    listTree: [], //车辆树
    choiceCar: null, //选中的车辆
    carGuijiList: {
      page: 1,
      limit: 20,
      list: []
    }, //轨迹
    carAccDetail: {
      //行驶详情
      page: 1,
      limit: 10,
      list: [],
      total: 0
    },
    choiceGuiJi: {}, //选择轨迹
    carGuijiDetail: {} //轨迹详情
  },
  reducers: {
    saveCar(state, payload) {
      return {
        ...state,
        ...payload.response
      };
    },
    saveTravelList(state, payload) {
      const { list, page, total } = payload.response.carAccDetail;
      let arrLists = Array.from(state.carAccDetail.list);
      if (arrLists.length == 0) {
        arrLists = list;
      } else {
        list.forEach(item => {
          arrLists.push(item);
        });
      }

      return {
        ...state,
        carAccDetail: {
          list: arrLists,
          page: page,
          total: total
        }
      };
    }
  },
  effects: {
    // 车辆最新状态
    *getCarLastState({ payload }, { call, put }) {
      let response = yield call(reqCarStateList, payload);
      let datas = [];
      response.forEach(item => {
        if (!!item.longitude) {
          datas.push({
            ...item,
            id: item.simno,
            width: 61,
            height: 61,
            rotate: item.direction,
            iconPath: !!item.acc ? carOn : carOff,
            callout: {
              content: item.carNumber,
              padding: 5,
              // bgColor: "#3e81f2",
              // color: "#fff",
              display: "ALWAYS"
            }
          });
        }
      });
      yield put({
        type: "saveCar",
        response: {
          carStateList: datas
        }
      });
    },
    // 获取行驶统计
    *getCarList({ payload }, { call, put }) {
      const { page, limit } = payload;
      const response = yield call(reqCarAccInfo, payload);

      yield put({
        type: "saveCar",
        response: {
          carGuijiList: {
            list: !response ? [] : response,
            page: page,
            limit: limit
          }
        }
      });
    },
    // 获取行驶详情
    *getCarAccDetailList({ payload }, { call, put }) {
      const { page, limit } = payload;
      const response = yield call(reqCarAccTranceDetail, payload);
      yield put({
        type: "saveTravelList",
        response: {
          carAccDetail: {
            list: response.data,
            page: page,
            total: response.total
          }
        }
      });
    },

    // 获取轨迹详情
    *getCarTrance({ payload }, { call, put }) {
      const response = yield call(reqCarTrance, payload);

      const lists = {
        polyline: [],
        Marker: []
      };
      if (response.data.length > 0) {
        lists.polyline.push({
          points: response.data,
          color: "#fa4949",
          width: 4,
          dottedLine: false,
          arrowLine: true,
          borderColor: "#000",
          borderWidth: 5
        });
        lists.Marker.push({
          id: 0,
          latitude: response.data[0].latitude,
          longitude: response.data[0].longitude,
          iconPath: StartIcon,
          width: 33,
          height: 37
        });
        lists.Marker.push({
          id: 1,
          latitude: response.data[response.data.length - 1].latitude,
          longitude: response.data[response.data.length - 1].longitude,
          iconPath: EndIcon,
          width: 23,
          height: 27
        });
      }

      yield put({
        type: "saveCar",
        response: {
          carGuijiDetail: lists
        }
      });
    }
  }
};
