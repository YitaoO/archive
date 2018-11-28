import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import dva from "./dva";
import models from "./model";
import { Provider } from "@tarojs/redux";
import wxTools from "./components/tools/wx_tools"; //小程序自带工具
import DefaultModel from "./model/defaultModel"; //初始化状态
import "./app.scss";

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    dispatch({
      type: "sys/error",
      e
    });
  },
  onReducer: r => (state, action) => {
    const newState = r(state, action);

    if (action.payload && action.payload.actionType === "userInfo/outAdd") {
      //清除数据
      return {
        ...newState,
        treeList: DefaultModel.treeList,
        projectType: DefaultModel.projectType,
        statistics: DefaultModel.statistics
      };
    }
    return newState;
  }
});

const store = dvaApp.getStore();

class App extends Component {
  config = {
    pages: [
      "pages/index/index", //首页
      "pages/searchList/index", //搜索列表
      "pages/stateIndex/index", //运行状态
      "pages/travelDetail/index", //行驶统计详情
      "pages/registration/index", //注册页
      "pages/traceDetail/index", //轨迹详情
      "pages/treeList/index", //选择车辆
      "pages/oilAndWaterDetail/index" //燃油洒水详情
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#58bdf2",
      navigationBarTitleText: "设备动态管理",
      navigationBarTextStyle: "white",
      enablePullDownRefresh: false
    }
  };
  componentDidMount() {
    // 获取openId
    wxTools.addCloud();
  }

  render() {
    return <Provider store={store}>{/* <Test /> */}</Provider>;
  }
}

Taro.render(<App />, document.getElementById("app"));
