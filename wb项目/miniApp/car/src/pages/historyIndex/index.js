import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View } from "@tarojs/components";
import Tools from "../../components/tools";
import Arrow from "../../images/navigator_arrow_icon.png";
import "./index.scss";

@connect(({ search, treeList }) => ({
  search,
  treeList
}))
export default class HistoryIndex extends Component {
  handleToDetail = item => {
    const { choiceCarItem } = this.props.treeList;
    item.startDate = item.inTime.slice(0, 10);
    item.startTime = item.inTime.slice(10, item.inTime.length);
    item.endDate = item.outTime.slice(0, 10);
    item.endTime = item.outTime.slice(10, item.outTime.length);

    this.props.dispatch({
      type: "car/saveCar",
      response: {
        choiceGuiJi: {
          ...item,
          carNumber: choiceCarItem.carNumber,
          carName: choiceCarItem.carName
        }
      }
    });
    Taro.navigateTo({
      url: "/pages/traceDetail/index"
    });
  };
  render() {
    const { searchLists } = this.props.search;

    return (
      <View className="history-index">
        {searchLists.map(item => {
          return (
            <View
              className="item"
              key={item.useEffic}
              onClick={this.handleToDetail.bind(this, item)}
            >
              <View className="left">
                <View className="cirle" />
                <View
                  className={`line  ${
                    searchLists.length == 1 ? "oneLine" : ""
                  }`}
                />
              </View>
              <View className="right">
                <View className="right-top">
                  <View className="text">{item.date.substring(0, 10)}</View>
                  <Image src={Arrow} className="navigator-arrow" />
                </View>
                <View className="right-bottom">
                  <View className="time">
                    <View className="item-title">点火</View>
                    <View className="item-value">
                      {Tools.miniTime(item.totalMinuter)}
                    </View>
                  </View>
                  <View className="distance">
                    <View className="item-title">行驶</View>
                    <View className="item-value">
                      {(item.runDistance / 1000).toFixed(0)}
                      公里
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
