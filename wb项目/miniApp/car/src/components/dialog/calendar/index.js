import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View } from "@tarojs/components";
import initCalendar from "./calendar";
import "./index.scss";

@connect(({ search }) => ({
  search
}))
export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeIndex: 0,
      tabDatas: [
        { id: 0, value: "日" },
        { id: 1, value: "周" },
        { id: 2, value: "月" }
      ],
      calendar: {
        //日历
        lastEmptyGrids: [],
        todayTimestamp: ""
      },
      curMonth: "",
      curYear: "",
      nowDay: "",
      weeksCh: ["日", "一", "二", "三", "四", "五", "六"],
      months: [],
      monthsYear: 0,
      monthsSelect: 0,
      days: [],
      selectedDay: [],
      empytGrids: [],
      lastEmptyGrids: []
    };
    this.handleHide = this.handleHide.bind(this);
  }
  componentDidMount() {
    initCalendar({
      $_this: this,
      multi: true,
      afterTapDay: (currentSelect, allSelectedDays) => {
        if (allSelectedDays.length > 0) {
          let beginDate = allSelectedDays[0];
          let params = {};

          if (this.state.typeIndex == 0) {
            params = {
              bdate: `${beginDate.year}-${
                beginDate.month > 9 ? beginDate.month : `0${beginDate.month}`
              }-${
                beginDate.day > 9 ? beginDate.day : `0${beginDate.day}`
              } 00:00:00`,
              edate: `${beginDate.year}-${
                beginDate.month > 9 ? beginDate.month : `0${beginDate.month}`
              }-${
                beginDate.day > 9 ? beginDate.day : `0${beginDate.day}`
              } 23:59:59`
            };
          } else {
            let endDate = allSelectedDays[allSelectedDays.length - 1];
            params = {
              bdate: `${beginDate.year}-${
                beginDate.month > 9 ? beginDate.month : `0${beginDate.month}`
              }-${beginDate.day > 9 ? beginDate.day : `0${beginDate.day}`}`,
              edate: `${endDate.year}-${
                endDate.month > 9 ? endDate.month : `0${endDate.month}`
              }-${endDate.day > 9 ? endDate.day : `0${endDate.day}`}`
            };
          }

          setTimeout(() => {
            this.props.dispatch({
              type: "search/saveState",
              response: {
                ...params,
                timeDialog: false
              }
            });
          }, 500);
        }
      }
    });
    this.renderMonthDay();
  }
  renderMonthDay = () => {
    let arr = [];
    let monthsYear = new Date().getFullYear();
    let thisMonth = new Date().getMonth() + 1;

    for (let i = 0; i < 12; i++) {
      let month = i < 9 ? Number(`0${i + 1}`) : i == 9 ? 10 : i + 1;
      arr.push({
        value: month,
        checked: false,
        currentMonth: thisMonth == month ? true : false,
        disabled: thisMonth > month - 1 ? false : true,
        days: this.getMonthLength(
          `${monthsYear}-${month > 9 ? month : `0${month}`}`
        )
      });
    }
    this.setState({
      months: arr,
      monthsYear: monthsYear
    });
  };
  getMonthLength = date => {
    let d = new Date(date);
    d.setMonth(d.getMonth() + 1);
    d.setDate("1");
    d.setDate(d.getDate() - 1);
    return d.getDate();
  };

  handleTyleChoice = id => {
    let days = this.state.days;
    days.forEach(item => {
      item.choosed = false;
    });
    this.setState({
      typeIndex: id,
      days: days,
      selectedDay: []
    });
  };
  handleMonthChoic = (index, item) => {
    let datas = this.state.months;

    if (!!item.disabled) return;

    datas.forEach((childItem, key) => {
      if (index == key) {
        childItem.checked = true;
      } else {
        childItem.checked = false;
      }
    });

    this.setState({
      monthsSelect: `${this.state.monthsYear}-${item.value}`,
      months: datas
    });
    setTimeout(() => {
      this.props.dispatch({
        type: "search/saveState",
        response: {
          bdate: `${this.state.monthsYear}-${item.value}-01`,
          edate: `${this.state.monthsYear}-${item.value}-${item.days}`,
          timeDialog: false
        }
      });
    }, 500);
  };
  handleHide = () => {
    this.props.dispatch({
      type: "search/saveState",
      response: {
        timeDialog: false
      }
    });
  };
  render() {
    const { timeDialog } = this.props.search;

    return (
      <View className={`calendar-container ${!!timeDialog ? "show" : ""}`}>
        <View className="mask" onClick={this.handleHide} />
        <View className="calendar-center">
          <View className="calendar-top">
            {this.state.tabDatas.map(item => {
              return (
                <View
                  className={
                    this.state.typeIndex == item.id ? "item active" : "item"
                  }
                  key={item.id}
                  onClick={this.handleTyleChoice.bind(this, item.id)}
                >
                  {item.value}
                </View>
              );
            })}
          </View>
          <View className="calendar-wrap">
            {/* 月模板 */}
            {this.state.typeIndex == 2 && (
              <View className="day-wrap flex box box-tb box-align-center">
                <View className="day-center pink-color box box-tb">
                  <View className="item">
                    <View className="top-handle fs28 box box-lr box-align-center box-pack-center">
                      <View
                        className="handle-image prev box box-rl"
                        onClick={this.choosePrevMonth.bind(this)}
                        data-handle="prev"
                      >
                        <View className="image-wrap image-pre prev-handle box box-lr box-align-center box-pack-center" />
                      </View>
                      <View className="date-area box box-lr box-align-center box-pack-center fs26">
                        {this.monthsYear || "--"} 年
                      </View>
                      <View
                        className="handle-image next box box-lr"
                        onClick={this.chooseNextMonth.bind(this)}
                        data-handle="next"
                      >
                        <View className="image-wrap image-next prev-handle box box-lr box-align-center box-pack-center" />
                      </View>
                    </View>
                    <View
                      className="days box box-lr box-wrap"
                      bindtouchstart="calendarTouchstart"
                      bindtouchmove="calendarTouchmove"
                    >
                      {this.state.months.map((item, index) => {
                        return (
                          <View
                            className={`grid-month normal-day-color box box-align-center box-pack-center ${
                              !!item.disabled ? "disable-day-color" : ""
                            }`}
                            key={item.value}
                            onClick={this.handleMonthChoic.bind(
                              this,
                              index,
                              item
                            )}
                          >
                            <View
                              key={item.value}
                              className={
                                this.state.monthsYear == this.state.curYear &&
                                item.currentMonth
                                  ? "currentDay"
                                  : ""
                              }
                              style={
                                !!item.checked
                                  ? {
                                      background: "#5495e5;",
                                      color: "#fff",
                                      borderRadius: "3px",
                                      padding: "10px"
                                    }
                                  : ""
                              }
                            >
                              {item.value}月
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* 日模板 */}
            {this.state.typeIndex == 0 && (
              <View class="day-wrap flex box box-tb box-align-center">
                <View class="week-wrap">
                  {this.state.weeksCh.map((item, index) => {
                    return (
                      <View class="week fs26" key={item} data-idx={index}>
                        {item}
                      </View>
                    );
                  })}
                </View>

                <View class="day-center pink-color box box-tb">
                  <View class="item">
                    <View class="top-handle fs28 box box-lr box-align-center box-pack-center">
                      <View
                        class="handle-image prev box box-rl"
                        onClick={this.choosePrevMonth.bind(this)}
                        data-handle="prev"
                      >
                        <View class="image-wrap image-pre prev-handle box box-lr box-align-center box-pack-center" />
                      </View>
                      <View class="date-area box box-lr box-align-center box-pack-center fs26">
                        {this.state.curYear || "--"} 年{" "}
                        {this.state.curMonth || "--"} 月
                      </View>
                      <View
                        class="handle-image next box box-lr"
                        onClick={this.chooseNextMonth.bind(this)}
                        data-handle="next"
                      >
                        <View class="image-wrap image-next prev-handle box box-lr box-align-center box-pack-center" />
                      </View>
                    </View>

                    <View
                      class="days box box-lr box-wrap"
                      onTouchstart={this.calendarTouchstart.bind(this)}
                      onTouchmove={this.calendarTouchmove.bind(this)}
                    >
                      {this.state.empytGrids.map((item, index) => {
                        return (
                          <View
                            className="grid disable-day-color box box-align-center box-pack-center"
                            key={index}
                            data-idx={index}
                          >
                            <View className="day box box-align-center box-pack-center">
                              {item}
                            </View>
                          </View>
                        );
                      })}

                      {this.state.days.map((item, index) => {
                        return (
                          <View
                            className="grid normal-day-color box box-align-center box-pack-center"
                            key={index}
                            data-disable={item.disable}
                            data-idx={index}
                            data-thisday={item}
                            onClick={this.tapDayItem.bind(this)}
                          >
                            <View className="day-with-dot box box-tb box-align-center box-pack-center">
                              <View
                                className={`day border-radius box box-align-center box-pack-center ${
                                  item.choosed
                                    ? "day-choosed-color pink-bg"
                                    : ""
                                } ${
                                  item.disable
                                    ? "disable-day-color disable-day-circle"
                                    : ""
                                } ${
                                  `${item.year}-${item.month}-${item.day}` ==
                                  this.state.nowDay
                                    ? "currentDay"
                                    : ""
                                }`}
                              >
                                {item.day}
                              </View>
                            </View>
                          </View>
                        );
                      })}
                      {this.state.lastEmptyGrids.map((item, index) => {
                        return (
                          <View
                            className="grid disable-day-color box box-align-center box-pack-center"
                            key={index}
                            data-idx={index}
                          >
                            <View className="day box box-align-center box-pack-center">
                              {item}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>
            )}
            {/* 周模板 */}
            {this.state.typeIndex == 1 && (
              <View class="day-wrap flex box box-tb box-align-center">
                <View class="week-wrap">
                  {this.state.weeksCh.map((item, index) => {
                    return (
                      <View class="week fs26" key={item} data-idx={index}>
                        {item}
                      </View>
                    );
                  })}
                </View>

                <View class="day-center pink-color box box-tb">
                  <View class="item">
                    <View class="top-handle fs28 box box-lr box-align-center box-pack-center">
                      <View
                        class="handle-image prev box box-rl"
                        onClick={this.choosePrevMonth.bind(this)}
                        data-handle="prev"
                      >
                        <View class="image-wrap image-pre prev-handle box box-lr box-align-center box-pack-center" />
                      </View>
                      <View class="date-area box box-lr box-align-center box-pack-center fs26">
                        {this.state.curYear || "--"} 年{" "}
                        {this.state.curMonth || "--"} 月
                      </View>
                      <View
                        class="handle-image next box box-lr disable-day-color"
                        onClick={this.chooseNextMonth.bind(this)}
                        data-handle="next"
                      >
                        <View class="image-wrap image-next prev-handle box box-lr box-align-center box-pack-center" />
                      </View>
                    </View>

                    <View
                      class="days days-wrap box box-lr box-wrap"
                      onTouchstart={this.calendarTouchstart.bind(this)}
                      onTouchmove={this.calendarTouchmove.bind(this)}
                    >
                      {this.state.empytGrids.map((item, index) => {
                        return (
                          <View
                            className="grid box disable-day-color box-align-center box-pack-center"
                            key={index}
                            data-idx={index}
                          >
                            <View className="day box box-align-center box-pack-center">
                              {item}
                            </View>
                          </View>
                        );
                      })}
                      {this.state.selectedDay.length == 0 && (
                        <View className="mask mask1" />
                      )}
                      {this.state.selectedDay.length == 0 && (
                        <View className="mask mask2" />
                      )}

                      {this.state.days.map((item, index) => {
                        return (
                          <View
                            className="grid normal-day-color box box-align-center box-pack-center"
                            key={index}
                            data-disable={item.disable}
                            data-idx={index}
                            data-thisday={item}
                            onClick={this.tapDayItem.bind(this)}
                          >
                            <View className="day-with-dot box box-tb box-align-center box-pack-center">
                              <View
                                className={`day border-radius box box-align-center box-pack-center ${
                                  item.choosed
                                    ? "day-choosed-color pink-bg"
                                    : ""
                                } ${
                                  item.disable
                                    ? "disable-day-color disable-day-circle"
                                    : ""
                                } ${
                                  `${item.year}-${item.month}-${item.day}` ==
                                  this.state.nowDay
                                    ? "currentDay"
                                    : ""
                                }`}
                              >
                                {item.day}
                              </View>
                            </View>
                          </View>
                        );
                      })}
                      {this.state.lastEmptyGrids.map((item, index) => {
                        return (
                          <View
                            className="grid disable-day-color box box-align-center box-pack-center"
                            key={index}
                            data-idx={index}
                          >
                            <View className="day box box-align-center box-pack-center">
                              {item}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
