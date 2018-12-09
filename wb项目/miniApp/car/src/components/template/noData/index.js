// 无状态模版 - 暂无数据
import { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

export default class NoData extends Component {
  render() {
    return (
      <View className="nodata-wrap">
        <View className="item">暂无数据...</View>
      </View>
    );
  }
}
