import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View } from "@tarojs/components";
import Arrow from "../../images/navigator_arrow_icon.png";
import "./index.scss";

@connect(({ search, treeList, menu }) => ({
  search,
  treeList,
  menu
}))
export default class waterIndex extends Component {
  handleToDetail = item => {
    const { bdate, edate } = this.props.search;
    const { menuChoice } = this.props.menu;
    Taro.navigateTo({
      url: `/pages/oilAndWaterDetail/index?index=${menuChoice.index}&simno=${
        item.simno
      }&carName=${item.carName}&carNumber=${
        item.carNumber
      }&bdate=${bdate}&edate=${edate}`
    });
  };
  render() {
    const { searchLists } = this.props.search;
    const type = this.props.type;

    return (
      <View className="oil-water-index">
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
                          <View className="name">
                            {type == 4 ? "加油次数" : "加水次数"}
                          </View>
                          <View className="value">
                            {type == 4
                              ? childItem.refuelCount.toFixed(0)
                              : childItem.waterCount.toFixed(0)}
                            次{/* {item.waterCount.toFixed(0)} 次 */}
                          </View>
                          {/* <View className="value">{item.refuelCount} 次</View> */}
                        </View>
                        <View className="box-right">
                          <View className="name">
                            {type == 4 ? "加油量" : "加水量"}
                          </View>
                          <View className="value">
                            {type == 4
                              ? `${
                                  childItem.refuelQuantity == 0
                                    ? 0
                                    : childItem.refuelQuantity.toFixed(2)
                                } L`
                              : `${
                                  childItem.waterAddition == 0
                                    ? 0
                                    : (childItem.waterAddition / 1000).toFixed(
                                        2
                                      )
                                } t`}
                          </View>
                        </View>
                      </View>
                      <View className="box">
                        <View className="box-left">
                          <View className="name">
                            {type == 4 ? "耗油量" : "洒水量"}
                          </View>
                          <View className="value">
                            {type == 4
                              ? `${
                                  childItem.tankCalibration == 0
                                    ? 0
                                    : childItem.tankCalibration.toFixed(2)
                                } L`
                              : `${
                                  childItem.waterConsumption == 0 ||
                                  childItem.waterConsumption < 0
                                    ? 0
                                    : (
                                        childItem.waterConsumption / 1000
                                      ).toFixed(2)
                                } t`}
                          </View>
                        </View>
                        <View className="box-right">
                          <View className="name">
                            {type == 4 ? "油费" : "耗油量"}
                          </View>
                          <View className="value">
                            {type == 4
                              ? `${childItem.oilPrice} 元`
                              : `${
                                  childItem.tankCalibration == 0
                                    ? 0
                                    : childItem.tankCalibration.toFixed(2)
                                } L`}
                          </View>
                        </View>
                      </View>
                      {type == 5 && (
                        <View className="box">
                          <View className="box-left">
                            <View className="name">行驶里程</View>
                            <View className="value">
                              {childItem.distance == 0
                                ? 0
                                : (childItem.distance / 1000).toFixed(2)}{" "}
                              km
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                    <View
                      className={`item-button ${
                        type == 4
                          ? childItem.tankCalibration == 0
                            ? "hide"
                            : ""
                          : childItem.waterConsumption == 0
                          ? "hide"
                          : ""
                      }`}
                    >
                      <Text className="btn-name">详情</Text>
                      <Image className="image" src={Arrow} />
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
