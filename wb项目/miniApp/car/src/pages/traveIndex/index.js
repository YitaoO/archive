import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import Tools from "../../components/tools";
import { View } from "@tarojs/components";
import Arrow from "../../images/navigator_arrow_icon.png";
import "./index.scss";

@connect(({ search, treeList }) => ({
  search,
  treeList
}))
export default class TravelIndex extends Component {
  handleToDetail = item => {
    if (item.runMinuter == 0) return;
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
      <View className="travel-index">
        {searchLists.map(item => {
          return (
            <View className="item" key={item.carId}>
              <View className="top-title">{item.projSubName}</View>
              {item.childrenList.map(childItem => {
                return (
                  <View
                    className="childWrap"
                    key={childItem.simno}
                    onClick={this.handleToDetail.bind(this, childItem)}
                  >
                    <View className="center">
                      <View className="title">{childItem.carNumber}</View>
                      <View className="box">
                        <View className="box-left">
                          <View className="name">点火时长</View>
                          <View className="value">
                            {Tools.miniTime(childItem.totalMinuter)}
                          </View>
                        </View>
                        <View className="box-right">
                          <View className="name">行驶时长</View>
                          <View className="value">
                            {Tools.miniTime(childItem.runMinuter)}
                          </View>
                        </View>
                      </View>
                      <View className="box">
                        <View className="box-left">
                          <View className="name">行驶里程</View>
                          <View className="value">
                            {item.runDistance == 0
                              ? 0
                              : (childItem.runDistance / 1000).toFixed(2)}
                            km
                          </View>
                        </View>
                        <View className="box-right">
                          <View className="name">平均速度</View>
                          <View className="value">
                            {childItem.avgSpeed == 0
                              ? 0
                              : childItem.avgSpeed.toFixed(2)}{" "}
                            km/h
                          </View>
                        </View>
                      </View>
                      <View className="box">
                        <View className="box-left">
                          <View className="name">车时利用率</View>
                          <View className="value">
                            {childItem.useEffic.toFixed(2)} %
                          </View>
                        </View>
                        <View className="box-right">
                          <View className="name">使用率</View>
                          <View className="value">
                            {childItem.avgSpeed == 0
                              ? 0
                              : childItem.effic.toFixed(2)}{" "}
                            %
                          </View>
                        </View>
                      </View>
                    </View>

                    {childItem.runMinuter != 0 && (
                      <View className="item-button">
                        <Text className="btn-name">详情</Text>
                        <Image className="image" src={Arrow} />
                      </View>
                    )}
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
