import { reqListProjetType } from "../services/api";

export default {
  namespace: "projectType",
  state: {
    projectTypeList: [],
    choiceProjectType: null,
    typeArr: []
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
    // 获取列表
  }
};
