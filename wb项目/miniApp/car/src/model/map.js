export default {
  namespace: "map",
  state: {
    showMarkerInfo: false,
    markerInfo: {}
  },
  reducers: {
    saveState(state, payload) {
      return {
        ...state,
        ...payload.response
      };
    }
  },
  effects: {}
};
