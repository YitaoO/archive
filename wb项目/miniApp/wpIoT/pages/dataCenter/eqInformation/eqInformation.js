/**
 * 设备
 */

// 功能 - 控制空调
import ControlAir from "../ControlAir";
Page({
  data: {
    tabCard: 1,
    socketLock: true,
    socketList: [], //webSocket数据
    hiddenModal: true
  },
  onLoad: function(options) {
    let that = this;

    ControlAir.init(options.devId, that, 1);

    that.setData({
      devId: options.devId
    });
    that.getData();
  },
  // 获取数据
  getData() {
    let that = this;
    wx.Dialog.showLoading();
    wx.customAjax.get(
      `${wx.Interface.getDeviceBydevId}`,
      {
        devId: that.data.devId
      },
      function(res) {
        that.renderData(Number(res.data.devType), res.data);
        wx.Dialog.hideLoading();
      }
    );
  },
  renderData(devType, item) {
    //处理数据
    let that = this;
    that.setData({
      info: item,
      detail: wx.Tools.renderControlData(item)
    });
  },

  //事件处理
  bindTab(e) {
    //tab切换
    let that = this;
    let tabCard = e.currentTarget.dataset.tab;
    that.setData({
      tabCard: tabCard
    });
  },
  bindDateChange: function(e) {
    //日期
    let that = this;
    let datas = that.data.detail;
    let type = e.currentTarget.dataset.type; //0:时间一；1:时间二；2:时间三
    let sore = e.currentTarget.dataset.sore; //0:开始时间;1:结束时间
    let value = e.detail.value.split(":");

    switch (Number(type)) {
      case 0:
        if (!that.timeAlarm(datas.TimeOneStart, e.detail.value, sore)) return;
        break;
      case 1:
        if (!that.timeAlarm(datas.TimeTwoStart, e.detail.value, sore)) return;
        break;
      case 2:
        if (!that.timeAlarm(datas.TimeThreeStart, e.detail.value, sore)) return;
        break;
      case 3:
        if (!that.timeAlarm(datas.TimeFourStart, e.detail.value, sore)) return;
        break;
      default:
    }

    let params = {
      DevID: that.data.devId,
      colName:
        Number(type) == 0 ? "col19" : Number(type) == 1 ? "col20" : "col21",
      value:
        Number(sore) == 0
          ? `${value[0]},${value[1]},#,#`
          : `#,#,${value[0]},${value[1]}`
    };
    ControlAir.hindleControl(params);
  },
  // 时间控制提示
  timeAlarm(time, val, sore) {
    let that = this;
    if (time == val) {
      wx.Dialog.showAlert("请选择不同的时间！", function() {});
      return false;
    }
    if (!wx.Tools.checkdate(time, val) && sore == 1) {
      wx.Dialog.showAlert("结束时间要大于开始时间，请重新选择！", function() {
        that.setData({
          detail: that.data.detail
        });
      });
      return false;
    }
    return true;
  },
  bindCheced(e) {
    //是否清空
    let that = this;
    let value = e.currentTarget.dataset.value;
    let type = Number(e.currentTarget.dataset.type);
    let TimeOneCtrol = "detail.TimeOneCtrol";
    let TimeTwoCtrol = "detail.TimeTwoCtrol";
    let TimeThreeCtrol = "detail.TimeThreeCtrol";

    if (!!value) {
      //制空
      that.setData({
        hiddenModal: false,
        timeType: type
      });
    } else {
      //选中
      switch (type) {
        case 0:
          that.setData({
            [TimeOneCtrol]: true
          });
          break;
        case 1:
          that.setData({
            [TimeTwoCtrol]: true
          });
          break;
        case 2:
          that.setData({
            [TimeThreeCtrol]: true
          });
          break;
        default:
      }
    }
  },
  listenerCancel: function() {
    //取消
    this.setData({
      hiddenModal: true
    });
  },

  listenerConfirm: function() {
    //确认
    let that = this;
    let type = that.data.timeType;
    console.log(type);
    this.setData({
      hiddenModal: true
    });
    ControlAir.hindleControl({
      DevID: that.data.devId,
      colName:
        Number(type) == 0 ? "col19" : Number(type) == 1 ? "col20" : "col21",
      value: `0,0,0,0`
    });
  },
  deleteArrVal(val, arr) {
    //删除值
    var index = arr.indexOf(val);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  },

  //精密空调
  bindStatus(e) {
    //状态处理
    let that = this;
    let currentStatus = that.data.detail.status;
    let arrs =
      currentStatus < 3
        ? ["开机", "关机", "停用", "维修"]
        : ["启用", "停用", "维修"];
    let newArrs = that.deleteArrVal(that.data.detail.statusName, arrs);

    wx.Dialog.showDraw(newArrs, function(res) {
      if (res.code == -1) return;
      let statusName = newArrs[res.index];
      let status =
        statusName == "开机"
          ? 1
          : statusName == "关机"
            ? 0
            : statusName == "停用"
              ? 4
              : statusName == "维修"
                ? 5
                : statusName == "启用"
                  ? 10
                  : "";
      that.statusConstrl(status);
    });
  },
  statusConstrl(status) {
    //状态控制
    let that = this;
    let currentStatus = that.data.detail.status;
    let detail = that.data.detail;
    let params = {};

    wx.Dialog.showLoading();

    if (status == 10) {
      //启用
      wx.customAjax.get(
        `${wx.Interface.getDeviceBydevIdUsingGET}`,
        {
          devId: that.data.devId,
          addr: that.data.info.addr,
          gateWay: that.data.info.gateWayPush,
          devStatus: 3,
          devModel: that.data.info.devModel,
          mqttId: that.data.info.mqttId
        },
        function(res) {
          if (!res.ok) {
            wx.Dialog.showAlert("网络出错，请稍后再试", function() {});
            return;
          } else {
            wx.Dialog.showAlert(
              "设备已离线，1分钟后若还没开机，请重试。",
              function() {
                let statusName = "detail.statusName";
                that.setData({
                  [statusName]: "离线"
                });
              }
            );
          }
        }
      );
    } else {
      if (status == 1) {
        //是否允许开机
        if (detail.TimeControl == 1) {
          if (!that.enbaleControl()) {
            wx.Dialog.showAlert("当前时间限制使用!", function() {});
            return;
          }
        }
      }
      wx.customAjax.post(
        `${wx.Interface.updateDevice}`,
        {
          devId: that.data.devId,
          status: status == 0 ? 1 : status == 1 ? 2 : status
        },
        function(res) {
          if (!res.ok) {
            wx.Dialog.showAlert("网络出错，请稍后再试", function() {});
            return;
          }
          if (Number(status) < 3) {
            //是否允许开关控制

            if (detail.devType == 1) {
              params = {
                DevID: that.data.devId,
                colName: "col0",
                value: status
              };
            } else if (detail.devType == 3) {
              params = {
                DevID: that.data.devId,
                colName: "col1",
                value: `${status},#`
              };
              that.data.statusControl = true;
            }

            ControlAir.hindleControl(params);
          } else {
            that.renderData(Number(res.data.devType), res.data);
            wx.Dialog.hideLoading();
          }
        }
      );
    }
  },
  // 是否允许开机
  enbaleControl() {
    let that = this;
    let datas = that.data.detail;
    let arrTime = [];
    let nowData = datas.nowData; //当前时间
    let enable = false;
    if (!!datas.TimeOneCtrol) {
      arrTime.push(that.addObj(datas.TimeOneStart, datas.TimeOneEnd));
    }
    if (!!datas.TimeTwoCtrol) {
      arrTime.push(that.addObj(datas.TimeTwoStart, datas.TimeTwoEnd));
    }
    if (!!datas.TimeThreeCtrol) {
      arrTime.push(that.addObj(datas.TimeThreeStart, datas.TimeThreeEnd));
    }
    if (!!datas.TimeFourCtrol) {
      arrTime.push(that.addObj(datas.TimeFourStart, datas.TimeFourEnd));
    }
    if (arrTime.length == 0) {
      enable = true;
    } else {
      for (let i = 0; i < arrTime.length; i++) {
        if (
          wx.Tools.checkdate(arrTime[i].start, nowData) &&
          !wx.Tools.checkdate(arrTime[i].end, nowData)
        ) {
          //在范围内
          enable = true;
          break;
        }
      }
    }

    return enable;
  },
  // 数组添加对象
  addObj(start, end) {
    return {
      start: start,
      end: end
    };
  },
  bindModelOne(e) {
    //模式处理
    let that = this;

    wx.Dialog.showDraw(["回风", "送风"], function(res) {
      if (res.code == -1) return;
      let params = {
        DevID: that.data.devId,
        colName: "col9",
        value: Number(that.data.detail.SetTempMode) == 1 ? `0` : `1`
      };

      ControlAir.hindleControl(params);
    });
  },
  bindInput(e) {
    //调节温度
    let that = this;
    let devType = that.data.info.devType;
    let value = e.detail.value;
    let type = e.currentTarget.dataset.type;

    switch (devType) {
      case 1: //精密空调
        that.hindleOneModel(type, value);
        break;
      case 3: //中央空调
        break;
      default:
    }
  },
  hindleOneModel(type, value) {
    let that = this;
    let params = {};
    switch (Number(type)) {
      case 0: //温度
        if (that.data.detail.SetTempMode == 0) {
          //回风
          if (value == that.data.detail.SetRetTemp) return;
          if (Number(value) < 5 || Number(value) > 35) {
            wx.Dialog.showAlert(
              "温度范围在15 - 35,请输入有效的温度!",
              function() {
                that.setData({
                  detail: that.data.detail
                });
              }
            );
            return;
          }
          params = {
            DevID: that.data.devId,
            colName: "col1",
            value: value * 10
          };
        } else {
          //送风
          if (value == that.data.detail.SetSendTemp) return;
          if (Number(value) < 5 || Number(value) > 35) {
            wx.Dialog.showAlert(
              "温度范围在5 - 35,请输入有效的温度!",
              function() {
                that.setData({
                  detail: that.data.detail
                });
              }
            );
            return;
          }
          params = {
            DevID: that.data.devId,
            colName: "col5",
            value: value * 10
          };
        }
        break;
      case 1: //湿度
        if (that.data.detail.SetTempMode == 0) {
          //回风
          if (value == that.data.detail.SetRetHimi) return;
          if (Number(value) < 20 || Number(value) > 80) {
            wx.Dialog.showAlert(
              "湿度范围在20 - 80,请输入有效的湿度!",
              function() {
                that.setData({
                  detail: that.data.detail
                });
              }
            );
            return;
          }
          params = {
            DevID: that.data.devId,
            colName: "col2",
            value: value * 10
          };
        } else {
          //送风
          if (value == that.data.detail.SetSendHimi) return;
          if (Number(value) < 0 || Number(value) > 100) {
            wx.Dialog.showAlert(
              "湿度范围在0 - 100,请输入有效的湿度!",
              function() {
                that.setData({
                  detail: that.data.detail
                });
              }
            );
            return;
          }
          params = {
            DevID: that.data.devId,
            colName: "col6",
            value: value * 10
          };
        }
        break;
      case 2: //高温告警阈值
        if (that.data.detail.SetTempMode == 0) {
          //回风
          if (value == that.data.detail.SetRetTempHigh) return;
          if (Number(value) < 30 || Number(value) > 55) {
            wx.Dialog.showAlert(
              "高温告警阈值范围在30 - 55,请输入有效的值!",
              function() {
                that.setData({
                  detail: that.data.detail
                });
              }
            );
            return;
          }
          params = {
            DevID: that.data.devId,
            colName: "col20",
            value: value * 10
          };
        } else {
          //送风
          if (value == that.data.detail.SetSendTempHigh) return;
          if (Number(value) < 20 || Number(value) > 45) {
            wx.Dialog.showAlert(
              "高温告警阈值范围在20 - 45,请输入有效的值!",
              function() {
                that.setData({
                  detail: that.data.detail
                });
              }
            );
            return;
          }
          params = {
            DevID: that.data.devId,
            colName: "col24",
            value: value * 10
          };
        }
        break;
      case 3: //低温告警阈值
        if (that.data.detail.SetTempMode == 0) {
          //回风
          if (value == that.data.detail.SetRetTempLow) return;
          if (Number(value) < 5 || Number(value) > 28) {
            wx.Dialog.showAlert(
              "低温告警阈值范围在5 - 28,请输入有效的值!",
              function() {
                that.setData({
                  detail: that.data.detail
                });
              }
            );
            return;
          }
          params = {
            DevID: that.data.devId,
            colName: "col21",
            value: value * 10
          };
        } else {
          //送风
          if (value == that.data.detail.SetSendTempLow) return;
          if (Number(value) < 5 || Number(value) > 20) {
            wx.Dialog.showAlert(
              "低温告警阈值范围在5 - 20,请输入有效的值!",
              function() {
                that.setData({
                  detail: that.data.detail
                });
              }
            );
            return;
          }
          params = {
            DevID: that.data.devId,
            colName: "col25",
            value: value * 10
          };
        }
        break;
      case 4: //回风高湿告警阈值
        if (value == that.data.detail.SetRetHimiHigh) return;
        if (Number(value) < 30 || Number(value) > 90) {
          wx.Dialog.showAlert(
            "回风高湿阈值范围在30 - 90,请输入有效的值!",
            function() {
              that.setData({
                detail: that.data.detail
              });
            }
          );
          return;
        }
        params = {
          DevID: that.data.devId,
          colName: "col22",
          value: value * 10
        };
        break;
      case 5: //回风低湿告警阈值
        if (value == that.data.detail.SetRetHimiLow) return;
        if (Number(value) < 10 || Number(value) > 55) {
          wx.Dialog.showAlert(
            "回风高湿阈值范围在10 - 55,请输入有效的值!",
            function() {
              that.setData({
                detail: that.data.detail
              });
            }
          );
          return;
        }
        params = {
          DevID: that.data.devId,
          colName: "col23",
          value: value * 10
        };
        break;
      default:
    }

    ControlAir.hindleControl(params);
  },

  //中央空调
  bindSpeed() {
    //风速
    let that = this;
    wx.Dialog.showDraw(["低速", "中速", "高速", "自动速度", "关闭"], function(
      datas
    ) {
      if (datas.code == -1) return;
      let params = {
        DevID: that.data.devId,
        colName: `col1`,
        value: `#,${datas.index}`
      };
      ControlAir.hindleControl(params);
    });
  },
  bindModelThree() {
    //模式
    let that = this;
    wx.Dialog.showDraw(["制热", "制冷"], function(datas) {
      if (datas.code == -1) return;

      let params = {
        DevID: that.data.devId,
        colName: `col2`,
        value: `${datas.index},#`
      };
      ControlAir.hindleControl(params);
    });
  },
  // 调温度事件处理
  handleTemplate(e) {
    let that = this;
    let item = that.data.detail;
    let value = e.detail.value;
    let params = {};

    if (item.devId == 3) {
      let hotTemRange = item.hotTemRange;
      let colTemRange = item.colTemRange;

      if (value == item.template) return;
      switch (Number(item.modelType)) {
        case 0: //取暖
          if (
            Number(value) < hotTemRange[1] ||
            Number(value) > hotTemRange[0]
          ) {
            wx.Dialog.showAlert(
              `取暖范围在${hotTemRange[1]} - ${hotTemRange[0]},请输入有效的值!`,
              function() {
                that.setData({
                  detail: item
                });
              }
            );
            return;
          }
          break;
        case 1: //制冷
          if (
            Number(value) < colTemRange[1] ||
            Number(value) > colTemRange[0]
          ) {
            wx.Dialog.showAlert(
              `制冷范围在${colTemRange[1]} - ${colTemRange[0]},请输入有效的值!`,
              function() {
                that.setData({
                  detail: item
                });
              }
            );
            return;
          }
          break;
        default:
      }

      params = {
        DevID: item.devId,
        colName: "col2",
        value: `#,${value}`
      };
    } else if (item.devType == 2) {
      // 红外
      // 最低温度提示
      if (
        Number(value) < Number(item.rankLow) ||
        Number(value) > Number(item.rankTop)
      ) {
        wx.Dialog.showAlert(
          `制冷范围在${Number(item.rankLow)} - ${Number(
            item.rankTop
          )},请输入有效的值!`,
          function() {}
        );
        return;
      }

      params = {
        DevID: item.devId,
        colName: "col12",
        value: value
      };
    }

    ControlAir.hindleControl(params);
  },
  // 是否开启时间段控制
  switch1Change: function(e) {
    let item = this.data.detail;

    let params = {
      DevID: item.devId,
      mqttId: item.mqttId
    };

    switch (Number(item.devType)) {
      case 2: //红外
        params.colName = "col1";
        params.value = !!item.constrolState ? 0 : 65280;
        break;
      case 3: //中央
        let TimeControl = "detail.TimeControl";
        that.setData({
          [TimeControl]: e.detail.value
        });
        params.colName = "col3";
        params.value = `#,${Number(e.detail.value)}`;
        break;
      default:
        break;
    }
    ControlAir.hindleControl(params);
  },
  handleRand(e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    let value = e.detail.value;
    let params = {};

    if (Number(type) == 0 || Number(type) == 2) {
      //取暖
      if (Number(type) == 0) {
        if (value == that.data.detail.HotHigh) return;
      }
      if (Number(type) == 2) {
        if (value == that.data.detail.ColHigh) return;
      }
    } else {
      //制冷
      if (Number(type) == 1) {
        if (value == that.data.detail.HotLow) return;
      }
      if (Number(type) == 3) {
        if (value == that.data.detail.ColLow) return;
      }
    }

    if (Number(value) < 10 || Number(value) > 30) {
      wx.Dialog.showAlert(`取值范围为10℃-30℃,请输入有效的值!`, function() {
        that.setData({
          detail: that.data.detail
        });
      });
    }

    params = {
      DevID: that.data.devId,
      colName: that.data.detail.modelType == 0 ? "col5" : "col6",
      value:
        type == 0 || type == 2
          ? `${Number(e.detail.value)},#`
          : `#,${Number(e.detail.value)}`
    };

    ControlAir.hindleControl(params);
  },
  /**
   * 红外控制
   */

  infrBaseChange(e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    let item = that.data.detail;
    let list = [];
    let params = {
      mqttId: item.mqttId,
      DevID: item.devId,
      colName: "col12"
      // value: item.controlNumber
    };

    switch (Number(type)) {
      case 17: // 模式
        list = ["制冷", "制热", "除湿", "通风"];
        break;
      case 18: // 风速
        list = ["低", "中", "高", "自动"];
        break;
      case 19: // 风向
        list = ["上", "中", "下", "自动"];
        break;

      default:
        break;
    }
    wx.Dialog.showDraw(list, function(datas) {
      if (datas.code == -1) return;
      let index = datas.index;

      switch (Number(type)) {
        case 17: // 模式
          params.value =
            index == 0
              ? 2
              : index == 1
                ? 3
                : index == 2
                  ? 4
                  : index == 3
                    ? 5
                    : "";
          // params.controlCol = "col12";
          break;
        case 18: // 风速
          params.value =
            index == 0
              ? 7
              : index == 1
                ? 8
                : index == 2
                  ? 9
                  : index == 3
                    ? 10
                    : "";
          // params.controlCol = "col12";
          break;
        case 19: // 风向
          params.value =
            index == 0
              ? 12
              : index == 1
                ? 13
                : index == 2
                  ? 14
                  : index == 3
                    ? 15
                    : "";
          // params.controlCol = "col12";
          break;

        default:
          break;
      }

      ControlAir.hindleControl(params);
    });
  },
  // 时间和范围控制
  infrTimeAndTempChange(e) {
    let item = this.data.detail;
    let type = e.currentTarget.dataset.type;
    let value = e.detail.value;
    return;

    let params = {
      mqttId: item.mqttId,
      DevID: item.devId,
      colName:
        type == 0
          ? "col18"
          : type == 1
            ? "col19"
            : type == 2
              ? "col21"
              : type == 3
                ? "col22"
                : "",
      value: value
    };

    ControlAir.hindleControl(params);
  },
  // 温度范围控制
  infrTempRankChange(e) {
    let that = this;
    let item = that.data.detail;
    let value = e.detail.value;
    let type = e.currentTarget.dataset.type; //0:上限;1:下限
    console.log(e);

    let rank = type == 0 ? [1, 50] : [0, 49];
    if (Number(value) < rank[0] || Number(value) > rank[1]) {
      wx.Dialog.showAlert(
        `取值范围为${rank[0]}℃-${rank[1]}℃,请输入有效的值!`,
        function() {
          that.setData({
            detail: that.data.detail
          });
        }
      );

      return;
    }
    let params = {
      mqttId: item.mqttId,
      DevID: item.devId,
      colName: type == 0 ? "col14" : "col15",
      value: value
    };
    ControlAir.hindleControl(params);
  },
  // 状态控制
  infrTimeStateChange(e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    let item = that.data.detail;

    let params = {
      mqttId: item.mqttId,
      DevID: item.devId,
      colName: "col12",
      colName:
        type == 0
          ? "col20"
          : type == 1
            ? "col23"
            : type == 2
              ? "col16"
              : type == 3
                ? "col17"
                : ""
    };

    wx.Dialog.showDraw(["关机", "开机", "默认"], function(datas) {
      if (datas.code == -1) return;
      let index = datas.index;
      params.value = index == 0 ? 0 : index == 1 ? 1 : 255;

      ControlAir.hindleControl(params);
    });
  }
});
