import { reqListTreeCar, reqListTreeProject } from "../services/api";

export default {
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
    saveState(state, payload) {
      return {
        ...state,
        ...payload.response
      };
    }
  },
  effects: {
    //获取树
    *getTreeList({ payload }, { call, put }) {
      const { url, params, typeTree } = payload;

      let fun = typeTree == 1 ? reqListTreeProject : reqListTreeCar;
      let listName = typeTree == 1 ? "projectList" : "carListTree";
      let choiceName = typeTree == 1 ? "choiceProjectItem" : "choiceCarItem";
      let response = yield call(fun, url, params);

      let arr = [];
      response.forEach(item => {
        let children = [];
        item.children.forEach(childItem => {
          children.push({
            isFather: false,
            isShow: true,
            patherId: typeTree == 1 ? item.id : item.projSubId,
            id: typeTree == 1 ? childItem.id : childItem.gpsDeviceSimNo,
            text: typeTree == 1 ? childItem.text : childItem.carNumber,
            desText: typeTree == 1 ? "" : childItem.carModelName
          });
        });

        arr.push({
          isShow: true,
          isFather: true,
          attributes: !!item.attributes ? item.attributes : "",
          id: typeTree == 1 ? item.id : item.projSubId,
          text: typeTree == 1 ? item.text : item.projSubName,
          isShow: true,
          children: children
        });
      });

      yield put({
        type: "saveState",
        response: {
          [`${listName}`]: arr,
          [`${choiceName}`]: typeTree == 1 ? arr[0] : null
        }
      });
    }
  }
};
