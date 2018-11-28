export default {
  namespace: "webSockets",
  state: {
    isConnect: false, //是否链接
    data: {} //数据
  },
  reducers: {
    saveState(state, payload) {
      return {
        ...state,
        ...payload.response
      };
    }
  }
};
