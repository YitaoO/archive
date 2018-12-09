import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, ScrollView } from "@tarojs/components";
import Dialog from "../../components/dialog/index";

import SearchComponent from "../../components/search";
import HistoryIndex from "../../pages/historyIndex";
import TravelIndex from "../../pages/traveIndex";
import AlarmIndex from "../../pages/alarmIndex";
import oilAndWaterIndex from "../../pages/oilAndWaterIndex";
import loadingIcon from "../../images/search_loading_icon.png";
import { reqListTreeCar } from "../../services/api"; //TODO:这里放在这里是因为需要同步，后期优化放在model
import "./index.scss";

@connect(({ userInfo, search, treeList, projectType, menu, statistics }) => ({
  userInfo,
  search,
  treeList,
  projectType,
  menu,
  statistics
}))
export default class SearchIndex extends Component {
  constructor(props) {
    super(props);
    this.onScrolltolower = this.onScrolltolower.bind(this);
  }
  componentDidMount() {
    const { menuChoice } = this.props.menu;
    const { carListTree } = this.props.treeList;

    Taro.setNavigationBarTitle({
      title: menuChoice.title
    });

    let searchList = {};

    switch (menuChoice.index) {
      case 1: //历史轨迹
        searchList = {
          isProject: false,
          isCar: true,
          isTime: false,
          isDate: false,
          isType: false,
          isDateType: false,
          isProjectType: false
        };

        break;
      case 2: //行驶统计
        searchList = {
          isProject: false,
          isCar: true,
          isTime: true,
          isDate: true,
          isType: false,
          isDateType: false,
          isProjectType: false
        };
        break;
      case 3: //告警统计
        searchList = {
          isProject: false,
          isCar: true,
          isTime: false,
          isDate: true,
          isType: true,
          isDateType: false,
          isProjectType: false
        };
        break;
      case 4: //燃油统计
        searchList = {
          isProject: false,
          isCar: true,
          isTime: false,
          isDate: true,
          isType: false,
          isDateType: false,
          isProjectType: false
        };
        break;
      case 5: //洒水统计
        searchList = {
          isProject: false,
          isCar: true,
          isTime: false,
          isDate: true,
          isType: false,
          isDateType: false,
          isProjectType: false
        };
        break;
      case 6: //运行状态
        searchList = {
          isProject: true,
          isCar: false,
          isTime: true,
          isDate: false,
          isType: false,
          isProjectType: true,
          isDateType: true
        };

        break;
      default:
        break;
    }

    searchList.loading = false;
    // 存储显示搜索内容
    this.props.dispatch({
      type: "search/saveState",
      response: searchList
    });

    //首页历史轨迹进来
    if (!!this.$router.params.isCheck) {
      Dialog.showLoading("请求中...");
      this.getData({ page: 1 });
    }

    // 获取车辆树，项目树，项目类型
    if (carListTree.length == 0) {
      this.getTreeCar();
    }
  }
  getTreeCar = () => {
    const { UserID } = this.props.userInfo.carUserInfo;
    reqListTreeCar("/ConsumerProjCarCarInfo/listTreeCar", {
      userId: UserID,
      type: 1
    }).then(datas => {
      this.saveDvaDisp(0, datas);
    });
  };
  /**
   * 处理树数据
   * type 类型(0:车辆列表;1:项目列表)
   * datas 接口数据
   * TODO:这里stateIndex也调用了,重复,待优化
   */
  saveDvaDisp = (type, datas) => {
    let arr = [];
    datas.forEach(item => {
      let children = [];
      item.children.forEach(childItem => {
        children.push({
          isFather: false,
          isShow: true,
          patherId: type == 1 ? item.id : item.projSubId,
          attributes: !!childItem.attributes ? childItem.attributes : "",
          id: type == 1 ? childItem.id : childItem.gpsDeviceSimNo,
          text: type == 1 ? childItem.text : childItem.carNumber,
          desText: type == 1 ? "" : childItem.carModelName
        });
      });

      arr.push({
        isShow: true,
        isFather: true,
        attributes: !!item.attributes ? item.attributes : "",
        id: type == 1 ? item.id : item.projSubId,
        text: type == 1 ? item.text : item.projSubName,
        isShow: true,
        children: children
      });
    });
    this.props.dispatch({
      type: "treeList/saveState",
      response: {
        carListTree: arr
      }
    });
  };

  onScroll = e => {
    let top = e.detail.scrollTop;
    let navFixed = top >= 200 ? true : false;
    this.props.dispatch({
      type: "search/saveState",
      response: {
        navFixed: navFixed
      }
    });
  };
  // 获取其他数据
  getData = data => {
    const { bdate, edate, dayHour, searchLimit, alarmType } = this.props.search;
    const { choiceCarItem, choiceChildId } = this.props.treeList;
    const { UserID } = this.props.userInfo.carUserInfo;
    const { menuChoice } = this.props.menu;
    const { lastDateHistory } = this.props.search;
    let item = {};
    switch (menuChoice.index) {
      case 1: //历史轨迹
        item = {
          url: "/carproj/getCarAccInfoByUserIdForWeiXin",
          param: {
            simno: choiceCarItem.id,
            page: data.page,
            limit: searchLimit
          }
        };
        if (lastDateHistory != "") {
          item.param.lastDate = lastDateHistory;
        }

        break;
      case 2: //行驶统计
        item = {
          url: "/carproj/getCarAccInfoByUserId",
          param: {
            userId: UserID,
            dayHour: dayHour,
            type: 3,
            page: data.page,
            limit: searchLimit
          }
        };
        break;
      case 3: //告警统计
        item = {
          url: "/ConsumerWarningInfo/selectByQuery",
          param: {
            userId: UserID,
            page: data.page,
            limit: searchLimit
          }
        };

        if (alarmType.length > 0) {
          item.param.type = alarmType;
        }

        break;
      case 4: //燃油统计
        item = {
          url: "/carproj/getRefuelStatics",
          param: {
            userId: UserID,
            type: 1,
            page: data.page,
            limit: searchLimit
          }
        };
        break;
      case 5: //洒水统计
        item = {
          url: "/carproj/getRefuelStatics",
          param: {
            userId: UserID,
            type: 2,
            dataType: 1,
            page: data.page,
            limit: searchLimit
          }
        };
        break;
      default:
        break;
    }

    if (menuChoice.index !== 1 && menuChoice.index !== 6) {
      item.param.dataType = 1;
      item.param.bdate = bdate.length > 12 ? bdate : `${bdate} 00:00:00`;
      item.param.edate = edate.length > 12 ? edate : `${edate} 23:59:59`;

      if (choiceChildId.length > 0) {
        item.param.simno = choiceChildId.join(",");
      }
    }
    this.props.dispatch({
      type: "search/getList",
      payload: {
        url: item.url,
        params: item.param,
        type: menuChoice.index
      }
    });
  };
  // 处理搜索接口请求事件
  handleSearch = () => {
    const { choiceCarItem } = this.props.treeList;
    const { menuChoice } = this.props.menu;

    if (!choiceCarItem && menuChoice.index == 1) {
      Dialog.showAlert("请选择车辆");
      return;
    }
    this.props.dispatch({
      type: "search/saveState",
      response: {
        loading: false,
        noData: false
      }
    });
    Dialog.showLoading("请求中...");
    this.getData({ page: 1 });
  };
  //上拉加载更多
  onScrolltolower = () => {
    const { menuChoice } = this.props.menu;
    const {
      searchPage,
      searchLimit,
      listsTotal,
      searchOver
    } = this.props.search;

    if (!searchOver || menuChoice.index == 6) return;
    if (searchPage * searchLimit >= listsTotal) {
      this.props.dispatch({
        type: "search/saveState",
        response: {
          loading: false,
          noData: true
        }
      });
      return;
    }

    this.props.dispatch({
      type: "search/saveState",
      response: {
        loading: true,
        searchOver: false
      }
    });
    this.getData({ page: Number(searchPage) + 1 });
  };
  render() {
    const { menuChoice } = this.props.menu;
    const { loading, noData } = this.props.search;

    return (
      <ScrollView
        className="search-wrap"
        scrollY
        scrollWithAnimation
        onScrolltolower={this.onScrolltolower}
        onScroll={this.onScroll}
      >
        <SearchComponent onClick={this.handleSearch} />

        {menuChoice.index == 1 && <HistoryIndex />}
        {menuChoice.index == 2 && <TravelIndex />}
        {menuChoice.index == 3 && <AlarmIndex />}

        {(menuChoice.index == 4 || menuChoice.index == 5) && (
          <oilAndWaterIndex type={menuChoice.index} />
        )}
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
