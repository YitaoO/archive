import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
//组件 - baiduMap
import BaiduMap from "../../components/baiduMap/index";
import wxTools from "../../components/tools/wx_tools";

import "./index.scss";
@connect(({ userInfo }) => ({
  userInfo
}))
export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    let that = this;
    const { carUserInfo } = this.props.userInfo;

    if (carUserInfo == "") {
      wxTools.getOpenId().then(function(res) {
        let openId = !!res.openid
          ? res.openid
          : JSON.parse(res.errorMessage).openid;
        Taro.setStorage({ key: "minicar_openId", data: openId });

        that.props.dispatch({
          type: "userInfo/saveOpenId",
          openId: openId
        });
        that.props.dispatch({
          type: "userInfo/login",
          payload: {
            openID: openId,
            weixin: "weixin"
          }
        });
      });
    }
  };

  render() {
    const { carUserInfo } = this.props.userInfo;

    return (
      <View className={["index-wrap"]}>
        <View className="map-wrap">{carUserInfo != "" && <BaiduMap />}</View>
      </View>
    );
  }
}
