import { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View } from "@tarojs/components";
import Dialog from "../../components/dialog/index";
import SearchComponent from "../../components/search";
import UserEfficEchart from "./useEfficEchart"; //使用率
import WaterEchart from "./waterEchart"; //洒水量
import OilPriceEchart from "./oilPrice"; //费用
import OilAndDisEchart from "./oilAndDisEchart"; //耗油量/行驶里程统计
import HundredEchart from "./hundredEchart"; //百公里耗油量统计
import AlermEchart from "./alermEchart"; //告警统计
import NoData from "../../components/template/noData"; //模版 - 暂无数据
import { reqListTreeProject, reqListProjetType } from "../../services/api"; //TODO:这里放在这里是因为需要同步，后期优化放在model

import "./index.scss";
@connect(({ userInfo, menu, search, statistics, treeList, projectType }) => ({
  userInfo,
  menu,
  search,
  statistics,
  treeList,
  projectType
}))
export default class StateIndex extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //初始化模块
    this.props.dispatch({
      type: "search/saveState",
      response: {
        isProject: true,
        isCar: false,
        isTime: true,
        isDate: false,
        isType: false,
        isProjectType: true,
        isDateType: true
      }
    });
    // 获取项目树，项目类型
    this.getTreeData();
  }
  /**
   * 获取树
   * type     model类型
   * url      请求url
   * params   请求参数
   * extraParam  额外参数
   */
  getTreeData = () => {
    const { UserID } = this.props.userInfo.carUserInfo;
    const { projectList } = this.props.treeList;
    const { projectTypeList } = this.props.projectType;

    if (projectList.length == 0 || projectTypeList.length == 0) {
      reqListTreeProject("/OrgDepart/getAllOrgDepart", {
        userId: UserID,
        type: 1
      }).then(datas => {
        this.saveDvaDisp(1, datas);
      });
    }
  };
  /**
   * 处理树数据
   * type 类型(0:车辆列表;1:项目列表)
   * datas 接口数据
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
    //获取类型列表
    this.getTypeList(arr, arr[0]);
    this.props.dispatch({
      type: "treeList/saveState",
      response: {
        projectList: arr,
        choiceProjectItem: arr[0]
      }
    });

    this.getState(arr[0]);
  };
  // 获取类型列表
  getTypeList = (projectArr, projectFirst) => {
    const { UserID } = this.props.userInfo.carUserInfo;
    const { projectTypeList } = this.props.projectType;
    let arr = [];
    reqListProjetType("/ConsumerTypeOACar/selectByQuery1", {
      userId: UserID
    }).then(datas => {
      let typeList = datas.data;
      this.props.dispatch({
        type: "projectType/saveState",
        response: {
          projectTypeList: typeList
        }
      });
      Object.keys(typeList).forEach(key => {
        if (key == projectFirst.attributes.departId) {
          let lists = typeList[key];
          Object.keys(lists).forEach(childKey => {
            arr.push({
              typeName: lists[childKey].typeName,
              typeId: lists[childKey].typeId
            });
          });
        }
      });

      this.props.dispatch({
        type: "projectType/saveState",
        response: {
          typeArr: arr
        }
      });
    });
  };
  // 获取echart数据
  getState = choiceItem => {
    if (!choiceItem) return;
    const { UserID } = this.props.userInfo.carUserInfo;
    const { dayHour, dateType } = this.props.search;
    const { choiceProjectType } = this.props.projectType;
    let { echartLists } = this.props.statistics;
    echartLists.forEach(item => {
      item.isUp = true;
    });

    const name = choiceItem.attributes.type == 1 ? "projId" : "projSubId";

    let params = {
      carModel: !!choiceProjectType
        ? choiceProjectType.typeId == -1
          ? ""
          : choiceProjectType.typeId
        : "",
      dateType: dateType,
      userId: UserID,
      dayHour: dayHour,
      [`${name}`]: choiceItem.attributes.departId
    };
    //清空数据
    this.props.dispatch({
      type: "statistics/saveState",
      response: {
        echartLists: echartLists,
        UseEffic: [],
        FuelPerOneHunKm: [],
        WarningReports: []
      }
    });
    for (let i = 0; i < 3; i++) {
      let url = "";
      let listName = "";
      switch (i) {
        case 0: //使用率
          url = "/homepage/getCarUseEffic";
          listName = "UseEffic";
          break;
        case 1:
          url = "/homepage/getFuelPerOneHunKm";
          listName = "FuelPerOneHunKm";
          break;
        case 2:
          url = "/homepage/getCarWarningReports";
          listName = "WarningReports";

          params.projType = choiceItem.attributes.type == 1 ? 1 : 0;
          break;
        default:
          break;
      }
      this.props.dispatch({
        type: "statistics/getStatisticsList",
        payload: {
          listName: listName,
          url: url,
          params: params
        }
      });
    }
  };
  // 处理搜索接口请求事件
  handleSearch = () => {
    const { choiceProjectItem } = this.props.treeList;

    Dialog.showLoading("请求中...");
    this.getState(choiceProjectItem);
  };

  handlePackUp = item => {
    const { echartLists } = this.props.statistics;
    let lists = echartLists;
    lists.forEach(items => {
      if (items.index == item.index) {
        items.isUp = !items.isUp;
        return;
      }
    });

    this.setState({
      lists: lists
    });
  };

  render() {
    const {
      echartLists,
      UseEffic,
      FuelPerOneHunKm,
      WarningReports
    } = this.props.statistics;
    let dataLength = UseEffic.length;
    let waterShow = false;
    const { typeArr } = this.props.projectType;

    typeArr.forEach(item => {
      //是否显示洒水统计
      if (item.typeName == "洒水车") {
        waterShow = true;
      }
    });

    echartLists.forEach(item => {
      //echaer高度自适应
      if (dataLength > 4) {
        item.height = `${300 + (dataLength - 5) * 20}px`;
        if (item.index == 1) {
          //洒水量
          item.height = `${300 + (dataLength - 5) * 10}px`;
        }
        if (item.index == 2) {
          //耗油量/行驶里程统计
          item.height = `${300 + (dataLength - 5) * 40}px`;
        }
      }
    });

    return (
      <ScrollView
        className="search-wrap"
        scrollY
        scrollWithAnimation
        onScrolltolower={this.onScrolltolower}
        onScroll={this.onScroll}
      >
        <SearchComponent onClick={this.handleSearch} />
        <View className="state-index-wrap">
          {echartLists.map(item => {
            return (
              <View
                className="item"
                key={item.index}
                style={item.index == 1 && !waterShow ? "display:none" : ""}
              >
                <View className="item-top">
                  <View className="line">
                    <span />
                  </View>
                  <View className="title">{item.name}</View>
                  <View
                    className="right"
                    onClick={this.handlePackUp.bind(this, item)}
                  >
                    {!!item.isUp ? "收起" : "展开"}
                  </View>
                </View>
                <View
                  className={`item-echart `}
                  style={item.isUp ? `height:${item.height}` : `display:none;`}
                >
                  {item.index == 0 ? (
                    UseEffic.length == 0 ? (
                      <NoData />
                    ) : (
                      <UserEfficEchart />
                    )
                  ) : (
                    ""
                  )}

                  {item.index == 1 ? (
                    WarningReports.length == 0 ? (
                      <NoData />
                    ) : (
                      <WaterEchart />
                    )
                  ) : (
                    ""
                  )}
                  {item.index == 2 ? (
                    WarningReports.length == 0 ? (
                      <NoData />
                    ) : (
                      <OilAndDisEchart />
                    )
                  ) : (
                    ""
                  )}
                  {item.index == 5 ? (
                    WarningReports.length == 0 ? (
                      <NoData />
                    ) : (
                      <OilPriceEchart />
                    )
                  ) : (
                    ""
                  )}
                  {item.index == 3 ? (
                    FuelPerOneHunKm.length == 0 ? (
                      <NoData />
                    ) : (
                      <HundredEchart />
                    )
                  ) : (
                    ""
                  )}
                  {item.index == 4 ? (
                    WarningReports.length == 0 ? (
                      <NoData />
                    ) : (
                      <AlermEchart />
                    )
                  ) : (
                    ""
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
