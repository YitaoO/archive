import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, Map, CoverImage, Button } from "@tarojs/components";
import Dialog from "../../components/dialog/index";
import moment from "moment";
// 组件 - 侧边菜单
import SiderMenu from "../../components/siderMenu";
import MarkerInfoWindow from "./markerInfo";
import baseApi from "../../services/api";
import headerIcon from "../../images/index_header_icon.png";
import reloadIcon from "../../images/index_map_reload_icon.png";
import "./index.scss";

@connect(({ userInfo, car, menu, map, webSockets }) => ({
  userInfo,
  car,
  menu,
  map,
  webSockets
}))
export default class MapMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnect: false //是否链接
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleMakertap = this.handleMakertap.bind(this);
    this.handleReloadBtn = this.handleReloadBtn.bind(this);
    this.handleMap = this.handleMap.bind(this);
  }

  componentWillMount() {
    let that = this;
    const { carUserInfo } = this.props.userInfo;
    const { isConnect } = this.props.webSockets;
    Dialog.showLoading();
    this.props.dispatch({
      type: "car/getCarLastState",
      payload: {
        UserId: carUserInfo.UserID
      }
    });

    if (!isConnect) {
      this.webSocketInit(carUserInfo.UserID);
    }
    this.mapCtx = Taro.createMapContext("myMap1", this.$scope);
    this.mapCtx.getScale({
      success(res) {
        that.setState({
          scale: res.scale
        });
      }
    });
  }
  webSocketInit(UserId) {
    let that = this;
    let api = "";
    if (baseApi.indexOf("https") == 0) {
      api = `wss:${baseApi.substring(6, baseApi.length - 3)}`;
    } else {
      api = `ws:${baseApi.substring(5, baseApi.length - 3)}`;
    }

    wx.connectSocket({
      url: `${api}liveWebsocket/${UserId}/1`,
      method: "GET"
    });
    // 监听是否打开
    wx.onSocketOpen(function(res) {
      console.log("WebSocket连接已打开！");
      that.props.dispatch({
        type: "webSockets/saveState",
        response: {
          isConnect: true
        }
      });
    });
    // 收到数据
    wx.onSocketMessage(function(res) {
      // console.log("收到数据=" + res.data);
      let data = JSON.parse(res.data);
      if (data.latitude == 0 && data.longitude == 0) return;

      that.renderList(data);
    });
    // 监听打开错误
    wx.onSocketError(function(res) {
      console.log("WebSocket连接打开失败，请检查！");
    });
  }
  renderList(childItem) {
    let { carStateList } = this.props.car;

    let { markerInfo, showMarkerInfo } = this.props.map;
    childItem.adddate = moment(new Date(childItem.adddate.time)).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    carStateList.forEach(item => {
      if (item.simno == childItem.simno) {
        item.adddate = childItem.adddate;
        item.latitude = childItem.latitude;
        item.longitude = childItem.longitude;
        item.speed = childItem.speed;
        return;
      }
    });

    if (markerInfo.simno == childItem.simno) {
      let newObj = {
        adddate: childItem.adddate,
        speed: childItem.speed
      };
      //TODO:这里先要清空，后期优化
      this.props.dispatch({
        type: "map/saveState",
        response: {
          markerInfo: []
        }
      });

      this.props.dispatch({
        type: "map/saveState",
        response: {
          markerInfo: Object.assign(markerInfo, newObj)
        }
      });
    }

    this.props.dispatch({
      type: "car/saveCar",
      response: {
        carStateList: carStateList
      }
    });
  }

  // 点击marker
  handleMakertap = e => {
    let { carStateList } = this.props.car;
    let info = {};
    carStateList.forEach(item => {
      if (item.id == e.markerId) {
        info = item;
        return;
      }
    });
    this.props.dispatch({
      type: "map/saveState",
      response: {
        showMarkerInfo: true,
        markerInfo: info
      }
    });
  };
  // 定位
  handleReloadBtn = () => {
    //TODO:这里清空重新请求会有一个闪动，后期优化
    const { UserID } = this.props.userInfo.carUserInfo;
    this.props.dispatch({
      type: "car/saveCar",
      response: {
        carStateList: []
      }
    });
    this.props.dispatch({
      type: "car/getCarLastState",
      payload: {
        UserId: UserID
      }
    });
  };
  // 点击地图
  handleMap = () => {
    this.props.dispatch({
      type: "map/saveState",
      response: {
        showMarkerInfo: false,
        markerInfo: {}
      }
    });
  };
  // 菜单路由
  handleMenu = e => {
    let { menuData, isShow } = this.props.menu;
    const { weixinUserInfo } = this.props.userInfo;
    const { carStateList } = this.props.car;
    const { showMarkerInfo } = this.props.map;
    let showOil = false;
    let showWater = false;

    if (!!showMarkerInfo) {
      this.props.dispatch({
        type: "map/saveState",
        response: {
          showMarkerInfo: false,
          markerInfo: {}
        }
      });
    }

    if (!weixinUserInfo) {
      this.props.dispatch({
        type: "userInfo/saveUserInfo",
        response: {
          weixinUserInfo: JSON.parse(e.detail.rawData)
        }
      });
    }

    carStateList.forEach(item => {
      if (item.isMoniTank == 1) {
        showOil = true;
      }
      if (item.isMoniWater == 1) {
        showWater = true;
      }
    });
    menuData.forEach((item, key) => {
      if (key == 4) {
        item.isShow = showOil;
      }
      if (key == 5) {
        item.isShow = showWater;
      }
    });

    this.props.dispatch({
      type: "menu/saveState",
      response: {
        menuData: menuData,
        isShow: !isShow
      }
    });
  };
  render() {
    let { carStateList } = this.props.car;
    const { isShow } = this.props.menu;

    return (
      <View class="index-map-container">
        <Map
          id="myMap1"
          latitude="23.099994"
          longitude="113.344520"
          include-points={carStateList}
          markers={carStateList}
          onMarkertap={this.handleMakertap}
          onClick={this.handleMap}
          style="width: 100%; height: 100%;"
        >
          {/* 定位按钮 */}
          <CoverImage
            class="reload-btn"
            src={reloadIcon}
            onTap={this.handleReloadBtn}
          />
          <CoverImage class="header-btn " src={headerIcon} />
          {/* {头部按钮} */}
          <Button
            className="btn"
            plain="true"
            open-type="getUserInfo"
            lang="zh_CN"
            onGetuserinfo={this.handleMenu}
          />
          <MarkerInfoWindow />
          {!!isShow && <SiderMenu />}
          {/* {!!showMarkerInfo && } */}
        </Map>
      </View>
    );
  }
}
