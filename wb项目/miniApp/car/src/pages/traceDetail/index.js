import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View } from "@tarojs/components";

import Dialog from "../../components/dialog";
import StartIcon from "../../images/map_trace_info_start_icon.png";
import EndIcon from "../../images/map_trace_info_end_icon.png";
import KmIcon from "../../images/map_trace_info_km_icon.png";
import LIcon from "../../images/map_trace_info_L_icon.png";

import "./index.scss";
@connect(({ car }) => ({
  car
}))
class TraceDetail extends Component {
  config = {
    navigationBarTitleText: "轨迹详情"
  };
  componentDidMount() {
    const { choiceGuiJi } = this.props.car;

    Dialog.showLoading("加载中...");
    this.props.dispatch({
      type: "car/getCarTrance",
      payload: {
        simno: choiceGuiJi.simno,
        bdate: choiceGuiJi.inTime,
        edate: choiceGuiJi.outTime,
        mapType: 1
      }
    });
  }

  render() {
    const { carGuijiDetail, choiceGuiJi } = this.props.car;
    return (
      <View className="trace-wrap">
        <View className="trance-map-container">
          <Map
            id="myMap"
            include-points={carGuijiDetail.polyline[0].points}
            polyline={carGuijiDetail.polyline}
            markers={carGuijiDetail.Marker}
            style="width: 100%; height: 100%;"
          />
          <CoverView className="info-wrap">
            <CoverView className="wrap">
              <CoverView className="title">{choiceGuiJi.carName}</CoverView>
              <CoverView className="num">
                车牌号：
                {choiceGuiJi.carNumber}
              </CoverView>
              <CoverView className="item">
                <CoverView className="item-left">
                  <CoverView className="name">开始时间</CoverView>
                  <CoverView className="value">
                    <CoverImage className="image" src={StartIcon} />
                    <CoverView className="desp">
                      <CoverView className="">
                        {choiceGuiJi.startDate}
                      </CoverView>
                      <CoverView className="">
                        {choiceGuiJi.startTime}
                      </CoverView>
                    </CoverView>
                  </CoverView>
                  {/* <CoverView className="item-left"></CoverView> */}
                </CoverView>
                <CoverView className="item-right">
                  <CoverView className="name">结束时间</CoverView>
                  <CoverView className="value">
                    <CoverImage className="image" src={EndIcon} />
                    <CoverView className="desp">
                      <CoverView className="">
                        {choiceGuiJi.startDate}
                      </CoverView>
                      <CoverView className="">{choiceGuiJi.endTime}</CoverView>
                    </CoverView>
                  </CoverView>
                </CoverView>
              </CoverView>
              <CoverView className="item">
                <CoverView className="item-left">
                  <CoverView className="name">行驶里程</CoverView>
                  <CoverView className="value">
                    <CoverImage className="image" src={KmIcon} />
                    <CoverView className="desp">
                      <CoverView className="">
                        {(choiceGuiJi.runDistance / 1000).toFixed(1)}
                      </CoverView>
                      <CoverView className="">km</CoverView>
                    </CoverView>
                  </CoverView>
                  {/* <CoverView className="item-left"></CoverView> */}
                </CoverView>
                {!!choiceGuiJi.tankCalibration && (
                  <CoverView className="item-right">
                    <CoverView className="name">耗油量</CoverView>
                    <CoverView className="value">
                      <CoverImage className="image" src={LIcon} />
                      <CoverView className="desp">
                        <CoverView className="">
                          {choiceGuiJi.tankCalibration}
                        </CoverView>
                        <CoverView className="">L</CoverView>
                      </CoverView>
                    </CoverView>
                  </CoverView>
                )}
              </CoverView>
            </CoverView>
          </CoverView>
        </View>
      </View>
    );
  }
}

export default TraceDetail;
