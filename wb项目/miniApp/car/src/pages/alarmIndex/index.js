import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import moment from "moment";
import { View } from "@tarojs/components";
import Arrow from "../../images/navigator_arrow_icon.png";
import "./index.scss";

@connect(({ search, treeList }) => ({
  search,
  treeList
}))
export default class AlarmIndex extends Component {
  handleToDetail = item => {
    this.props.dispatch({
      type: "treeList/saveState",
      response: {
        choiceCar: item
      }
    });
    Taro.navigateTo({
      url: "/pages/travelDetail/index"
    });
  };
  render() {
    const { searchLists } = this.props.search;

    return (
      <View className="alarm-index">
        {searchLists.map(item => {
          return (
            <View className="item" key={item.simno}>
              <View className="top-title">{item.projSubName}</View>
              {item.childrenList.map(childItem => {
                return (
                  <View className="childWrap" key={childItem.simno}>
                    <View className="center">
                      <Text
                        className={`wran-btn ${
                          childItem.warnningType == 1
                            ? "type1"
                            : childItem.warnningType == 2
                            ? "type2"
                            : "type3"
                        }`}
                      >
                        {childItem.warnningType == 1
                          ? "出围栏"
                          : childItem.warnningType == 2
                          ? "进围栏"
                          : "油位异常"}
                      </Text>
                      <View className="box">
                        <View className="car-name">{childItem.carNumber}</View>
                      </View>
                      <View className="box">
                        <Text className="title">微信通知</Text>
                        <View className="value">
                          {childItem.isNotice == 0 ? "未发送" : "已发送"}
                        </View>
                      </View>
                      <View className="box">
                        <Text className="title">通知结果</Text>
                        <View className="value">
                          {childItem.noticeUserName}
                        </View>
                      </View>
                      <View className="box">
                        <Text className="title">告警详情</Text>
                        <View className="value">{childItem.warnningMsg}</View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}
