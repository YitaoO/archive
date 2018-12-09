import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import moment from "moment";
import { View, Text, Picker } from "@tarojs/components";
import Calendar from "../dialog/calendar";
import Dialog from "../dialog";
import Arrow from "../../images/navigator_arrow_icon.png";
import "./index.scss";

@connect(({ car, treeList, projectType, search }) => ({
  search,
  car,
  treeList,
  projectType
}))
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.handleCarChoice = this.handleCarChoice.bind(this);
    this.handleDateChoice = this.handleDateChoice.bind(this);
    this.handleRuleChoice = this.handleRuleChoice.bind(this);
  }
  componentWillUnmount() {
    // 清空搜索数据
    this.props.dispatch({
      type: "search/saveState",
      response: {
        navFixed: false,
        noData: false,
        loading: false,
        dayHour: 8,
        alarmType: [],
        bdate: moment(new Date()).format("YYYY-MM-DD 00:00:00"), // 开始时间
        edate: moment(new Date()).format("YYYY-MM-DD 23:59:59"), //结束时间
        searchPage: 1,
        searchLimit: 10,
        searchLists: [],
        listsTotal: 0,
        lastDateHistory: ""
      }
    });
  }

  // 选择车辆
  handleCarChoice = () => {
    this.props.dispatch({
      type: "search/saveState",
      response: {
        noData: false,
        loading: false,
        searchPage: 1,
        searchLists: [], //搜索结果数据
        listsTotal: 0, //数据总数
        lastDateHistory: "", //历史最后一条数据日期
        searchOver: true
      }
    });
    Taro.navigateTo({ url: "/pages/treeList/index" });
  };

  // 选择规则
  handleRuleChoice = e => {
    this.props.dispatch({
      type: "search/saveState",
      response: {
        dayHour: Number(e.detail.value) + 1
      }
    });
  };
  // 选择项目
  handleProjectChoice = () => {
    const { projectList } = this.props.treeList;
    if (projectList.length == 1 && projectList[0].children.length == 0) return;
    if (projectList.length) Taro.navigateTo({ url: "/pages/treeList/index" });
  };
  // 设备类型
  handleProjectTypeChoice = () => {
    const { typeArr } = this.props.projectType;

    Dialog.showDraw(typeArr, datas => {
      if (datas.code == -1) return;

      this.props.dispatch({
        type: "projectType/saveState",
        response: {
          choiceProjectType: datas.choiceItem
        }
      });
    });
  };
  // 告警类型
  handleTypeChoice = data => {
    const { alarmArr } = this.props.search;
    let arr = [];
    alarmArr.forEach(item => {
      if (item.value == data.value) {
        item.checked = !item.checked;
      }
      if (!!item.checked) {
        arr.push(item.value);
      }
    });

    this.props.dispatch({
      type: "search/saveState",
      response: {
        alarmType: arr.join(",")
      }
    });
  };
  // 选择日期
  handleDateChoice = () => {
    this.props.dispatch({
      type: "search/saveState",
      response: {
        timeDialog: true
      }
    });
  };
  // 日期类型选择
  handleDataTypeChoice = index => {
    this.props.dispatch({
      type: "search/saveState",
      response: {
        dateType: index
      }
    });
  };
  // 搜索事件回传给父组件
  handleSearch = () => {
    this.props.dispatch({
      type: "search/saveState",
      response: {
        searchLists: []
      }
    });

    this.props.onClick();
  };
  render() {
    const {
      isCar,
      isProject,
      isTime,
      isDate,
      isDateType,
      isType,
      isProjectType,
      timeArr,
      dayHour,
      alarmArr,
      dateTypeList,
      dateType,
      bdate,
      edate,
      navFixed
    } = this.props.search;
    const {
      projectList,
      isMultiSelect,
      choiceChildId,
      choiceCarItem,
      choiceProjectItem
    } = this.props.treeList;
    const { choiceProjectType } = this.props.projectType;

    return (
      <View className="search-container">
        <View className="search-wrap">
          {!!isProject && (
            <View className="item">
              <View className="left">
                <View className="title ">选择项目</View>
              </View>

              <View className="right" onClick={this.handleProjectChoice}>
                <Text className="title project-title">
                  {!!choiceProjectItem ? choiceProjectItem.text : "请选择项目"}
                </Text>
                {projectList.length == 1 &&
                  projectList[0].children.length > 0 && (
                    <Image className="image" src={Arrow} />
                  )}
              </View>
            </View>
          )}
          {!!isProjectType && (
            <View className="item">
              <View className="left">
                <View className="title">设备类型</View>
              </View>

              <View className="right" onClick={this.handleProjectTypeChoice}>
                <Text className="title">
                  {!!choiceProjectType ? choiceProjectType.typeName : "全部"}
                </Text>

                <Image className="image" src={Arrow} />
              </View>
            </View>
          )}
          {!!isCar && (
            <View className="item">
              <View className="left">
                <View className="title">选择车辆</View>
              </View>

              <View className="right" onClick={this.handleCarChoice}>
                {!isMultiSelect && (
                  <Text className="title">
                    {!!choiceCarItem ? choiceCarItem.text : ""}
                  </Text>
                )}
                {!!isMultiSelect && (
                  <Text className="title">
                    {choiceChildId.length == 0
                      ? "所有车辆"
                      : `所选车辆数(${choiceChildId.length})`}
                  </Text>
                )}

                <Image className="image" src={Arrow} />
              </View>
            </View>
          )}

          {!!isTime && (
            <View className="item">
              <View className="left">
                <View className="title">台班规则</View>
              </View>
              <Picker
                className="right"
                value={dayHour - 1}
                onChange={this.handleRuleChoice}
                range={timeArr}
              >
                <Text className="title">{timeArr[dayHour - 1]}</Text>
                <Image className="image" src={Arrow} />
              </Picker>
            </View>
          )}
          {!!isDateType && (
            <View className="item">
              <View className="left">
                <View className="title">日期选择</View>
              </View>

              <View className="right right-data-type">
                {dateTypeList.map((item, index) => {
                  return (
                    <View
                      className={`item ${
                        dateType == index + 1 ? "active" : ""
                      } ${item.readonly ? "readonly" : ""}`}
                      key={index}
                      onClick={this.handleDataTypeChoice.bind(this, index + 1)}
                    >
                      {item.name}
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {!!isDate && (
            <View className="item">
              <View className="left">
                <View className="title">选择日期</View>
              </View>

              <View
                className="right date-choice"
                onClick={this.handleDateChoice}
              >
                <Text className="value">
                  {bdate.length > 12
                    ? `${bdate.slice(0, 10)}`
                    : `${bdate} 至 ${edate}`}
                </Text>
                {/* )} */}

                <Image className="image" src={Arrow} />
              </View>
            </View>
          )}
          {!!isType && (
            <View className="item">
              <View className="left">
                <View className="title">告警类型</View>
              </View>
              <View className="right right-alarm">
                {alarmArr.map(item => {
                  return (
                    <View
                      className={`title alarm-title ${
                        !!item.checked ? "active" : ""
                      }`}
                      key={item.value}
                      onClick={this.handleTypeChoice.bind(this, item)}
                    >
                      {item.name}
                    </View>
                  );
                })}
              </View>
            </View>
          )}
          <View
            onClick={this.handleSearch}
            className={`btn-search ${navFixed ? "positionFixed" : ""}`}
          >
            查询
          </View>
        </View>
        <Calendar />
      </View>
    );
  }
}
