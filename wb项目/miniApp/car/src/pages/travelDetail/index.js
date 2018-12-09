import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import Tools from "../../components/tools";
import Dialog from "../../components/dialog/index";
import { View, ScrollView } from "@tarojs/components";
import Arrow from "../../images/index_arrow_icon.png";
import loadingIcon from "../../images/search_loading_icon.png";

import "./index.scss";

@connect(({ userInfo, search, car, treeList, map }) => ({
  userInfo,
  search,
  car,
  treeList,
  map
}))
export default class TravelDetail extends Component {
  config = {
    navigationBarTitleText: "行驶详情"
  };
  constructor(props) {
    super(props);
    this.state = {
      noData: false,
      loading: false
    };
    this.onScrolltolower = this.onScrolltolower.bind(this);
  }
  componentDidMount() {
    this.props.dispatch({
      type: "car/saveCar",
      response: {
        carAccDetail: {
          list: [],
          page: 1,
          total: 0
        }
      }
    });
    Dialog.showLoading("请求中...");
    this.getData({ page: 1 });
  }
  handleToDetail = item => {
    const { choiceCar } = this.props.treeList;
    item.startDate = item.bdate.slice(0, 10);
    item.startTime = item.bdate.slice(10, item.bdate.length);
    item.endDate = item.edate.slice(0, 10);
    item.endTime = item.edate.slice(10, item.edate.length);
    if (item.runDistance == 0) return;
    this.props.dispatch({
      type: "car/saveCar",
      response: {
        choiceGuiJi: {
          ...item,
          inTime: item.bdate,
          outTime: item.edate,
          carNumber: choiceCar.carNumber,
          carName: choiceCar.carName
        }
      }
    });
    Taro.navigateTo({
      url: `/pages/traceDetail/index`
    });
  };
  getData = page => {
    const { UserID } = this.props.userInfo.carUserInfo;
    const { bdate, edate } = this.props.search;
    const { choiceCar } = this.props.treeList;

    let parsms = {
      userId: UserID,
      simno: choiceCar.simno,
      bdate: bdate.length > 12 ? bdate : `${bdate} 00:00:00`,
      edate: edate.length > 12 ? edate : `${edate} 23:59:59`,
      ...page,
      limit: 10
    };
    this.props.dispatch({
      type: "car/getCarAccDetailList",
      payload: parsms
    });
  };
  //上拉加载更多
  onScrolltolower = () => {
    let { page, total } = this.props.car.carAccDetail;
    if (page * 10 >= total) {
      this.setState({
        loading: false,
        noData: true
      });
      return;
    }
    this.setState({
      loading: true
    });
    this.getData({ page: Number(page) + 1 });
  };
  render() {
    const { list } = this.props.car.carAccDetail;

    return (
      <ScrollView
        className="travel-detail-wrap"
        scrollY
        scrollWithAnimation
        onScrolltolower={this.onScrolltolower}
      >
        <View className="lists">
          {list.map(item => {
            return (
              <View
                className="item"
                key={item.carId}
                onClick={this.handleToDetail.bind(this, item)}
              >
                <View className="center">
                  <View className="box">
                    <View className="box-left">
                      <View className="name">开始时间</View>
                      <View className="value">{`${item.bdate.substr(
                        2,
                        2
                      )}/${item.bdate.substr(5, 2)}/${item.bdate.substr(
                        8,
                        2
                      )} ${item.bdate.substr(11, 2)}:${item.bdate.substr(
                        14,
                        2
                      )}`}</View>
                    </View>
                    <View className="box-right">
                      <View className="name">结束时间</View>
                      <View className="value">{`${item.edate.substr(
                        2,
                        2
                      )}/${item.edate.substr(5, 2)}/${item.edate.substr(
                        8,
                        2
                      )} ${item.edate.substr(11, 2)}:${item.edate.substr(
                        14,
                        2
                      )}`}</View>
                    </View>
                  </View>
                  <View className="box">
                    <View className="box-left">
                      <View className="name">点火时长</View>
                      <View className="value">
                        {Tools.miniTime(item.minuter)}
                      </View>
                    </View>
                    <View className="box-right">
                      <View className="name">行驶时长</View>
                      <View className="value">
                        {Tools.miniTime(item.runMinuter)}
                      </View>
                    </View>
                  </View>
                  <View className="box">
                    <View className="box-left">
                      <View className="name">行驶里程</View>
                      <View className="value">
                        {(item.runDistance / 1000).toFixed(2)} km
                      </View>
                    </View>
                    <View className="box-right">
                      <View className="name">平均速度</View>
                      <View className="value">
                        {item.avgSpeed.toFixed(2)} km/h
                      </View>
                    </View>
                  </View>
                </View>

                {item.runDistance != 0 && (
                  <View className="item-button">
                    <Text className="btn-name">详情</Text>
                    <Image className="image" src={Arrow} />
                  </View>
                )}
              </View>
            );
          })}
        </View>
        {!!loading && (
          <View className="footer">
            加载数据中...
            <Image src={loadingIcon} className="image" />
          </View>
        )}
        {!!noData && <View className="footer">没有更多数据了...</View>}
      </ScrollView>
    );
  }
}
