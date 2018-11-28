import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { CoverView, CoverImage } from "@tarojs/components";
import Arrow from "../../images/index_arrow_icon.png";
import "./markerInfo.scss";
@connect(({ map, treeList }) => ({
  map,
  treeList
}))
export default class MarkerInfo extends Component {
  constructor(props) {
    super(props);

    this.handleToDetail = this.handleToDetail.bind(this);
  }

  handleToDetail = () => {
    const { markerInfo } = this.props.map;
    this.props.dispatch({
      type: "treeList/saveState",
      response: {
        isMultiSelect: false,
        choiceCarItem: {
          text: markerInfo.carNumber,
          id: markerInfo.simno
        }
      }
    });
    this.props.dispatch({
      type: "map/saveState",
      response: {
        showMarkerInfo: false,
        markerInfo: {}
      }
    });
    this.props.dispatch({
      type: "menu/saveState",
      response: {
        menuChoice: {
          index: 1,
          title: "历史轨迹"
        }
      }
    });
    Taro.navigateTo({
      url: `/pages/searchList/index?isCheck=true`
    });
  };
  render() {
    const { markerInfo, showMarkerInfo } = this.props.map;

    return (
      <div className="wrap">
        {!!showMarkerInfo && (
          <CoverView className="marker-info">
            <CoverView className="center">
              <CoverView className="item">
                <CoverView className="left">
                  <CoverView className="title">车牌号</CoverView>
                  <CoverView className="value">
                    {markerInfo.carNumber}
                  </CoverView>
                </CoverView>
                <CoverView className="right">
                  <CoverView className="title">类型</CoverView>
                  <CoverView className="value">{markerInfo.carModel}</CoverView>
                </CoverView>
              </CoverView>
              <CoverView className="item">
                <CoverView className="left">
                  <CoverView className="title">速度</CoverView>
                  <CoverView className="value">
                    {markerInfo.speed}
                    km/h
                  </CoverView>
                </CoverView>
                <CoverView className="right">
                  <CoverView className="title">熄火</CoverView>
                  <CoverView className="value">
                    {!!markerInfo.acc ? "否" : "是"}
                  </CoverView>
                </CoverView>
              </CoverView>
              <CoverView className="item">
                <CoverView className="left">
                  <CoverView className="title">司机</CoverView>
                  <CoverView className="value">
                    {!!markerInfo.driverName ? markerInfo.driverName : "无"}
                  </CoverView>
                </CoverView>

                <CoverView className="right">
                  <CoverView className="title">电话</CoverView>
                  <CoverView className="value">
                    {!!markerInfo.driverTel ? markerInfo.driverTel : "无"}
                  </CoverView>
                </CoverView>
              </CoverView>
              <CoverView className="item">
                <CoverView className="left">
                  <CoverView className="title">定位时间</CoverView>
                  <CoverView className="value">{markerInfo.adddate}</CoverView>
                </CoverView>
              </CoverView>
              {/* <CoverView className="item"> */}
              <CoverView className="footer" onClick={this.handleToDetail}>
                <CoverView className="title">历史轨迹</CoverView>
                <CoverImage className="image" src={Arrow} />
              </CoverView>
              {/* </CoverView> */}
            </CoverView>

            {/* <CoverView className="footer" onClick={this.handleToDetail}>
       
                 <CoverView className="titles">历史轨迹</CoverView>
               )}
              
              <CoverImage className="image" src={Arrow} />
             </CoverView> */}
          </CoverView>
        )}
      </div>
    );
  }
}
