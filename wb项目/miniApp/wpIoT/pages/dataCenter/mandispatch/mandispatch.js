/**
 * 工单类型
 */
Page({
  onLoad(options) {
    let that = this;
    wx.Dialog.showLoading();

    that.data.kid = options.kid;

    if (!!options.kid) {
      //编辑
      that.setData({
        kid: options.kid
      });
      that.getWorkInfo(options.kid);
    } else {
      //新增
      that.setData({
        kid: wx.Tools.getNum(), //生成唯一id
        enableAdit: true,
        newAdit: true
      });
    }
    //动态设置标题
    wx.WxTools.setTitle(
      !!options.kid && options.kid != undefined ? "详情" : "派单"
    );

    that.getStorage();
  },

  //获取缓存数据
  getStorage() {
    let that = this;
    wx.getStorage({
      key: "saveParse",
      success: function(res) {
        that.setData({
          saveParse: res.data
        });
      }
    });
    //获取委托人信息是否存在
    wx.getStorage({
      key: "userParse",
      success: function(res) {
        let userId = "saveParse.userId";
        let userName = "saveParse.userName";
        that.setData({
          [userId]: res.data.userId,
          [userName]: res.data.userName
        });
      }
    });

    // 获取类型
    wx.getStorage({
      key: "tpyeMessage",
      success: function(res) {
        that.setData({
          typeName: res.data.typeName,
          typeId: res.data.typeId
        });

        that.setWoId();
      },
      fail: function() {
        that.getAll();
      }
    });

    wx.Dialog.hideLoading();
  },
  onShow() {
    let that = this;
    //获取委托人信息是否存在
    wx.getStorage({
      key: "userParse",
      success: function(res) {
        let userId = "saveParse.userId";
        let userName = "saveParse.userName";
        let status = "saveParse.status";
        that.setData({
          [userId]: res.data.userId,
          [userName]: res.data.userName,
          [status]: 1
        });
      }
    });
  },
  data: {
    showNoNetwork: false, //网络
    kid: "", //唯一值
    enableAdit: false, //是否可编辑
    newAdit: false, //保存
    compAdit: false, //结案
    typeName: [], //设备名字
    typeId: [], //设备id
    // urgencyLevel: ['轻微', '一般', '严重'], //紧急程度
    imageList: [], //图片列表
    saveParse: {}, //保存的参数
    overEnable: false, //是否结案
    status: 0, //
    devStatus1True: false,
    devStatus2True: false,
    showConfirmBar: false,
    btnLock: false
  },

  // 获取数据
  getWorkInfo(kid) {
    // 获取设备信息
    let that = this;

    wx.customAjax.get(
      `${wx.Interface.workGetByKid}`,
      {
        userId: getApp().globalData.userInfo.UserID,
        kid: kid
      },
      function(res) {
        //获取数据
        if (!res.ok) {
          that.setData({
            showNoNetwork: true
          });
          return;
        }
        let title = "saveParse.title";
        let devId = "saveParse.devId";
        let woId = "saveParse.woId";
        let addUserId = "saveParse.addUserId";
        let addUserName = "saveParse.addUserName";
        let userName = "saveParse.userName";
        let userId = "saveParse.userId";
        let devStatus1 = "saveParse.devStatus1";
        let devStatus2 = "saveParse.devStatus2";
        let description = "saveParse.description";
        let status = "saveParse.status";
        that.setData({
          [title]: res.data.title,
          [devId]: res.data.devId,
          [woId]: res.data.woId,
          [addUserId]: res.data.addUserId,
          [addUserName]: res.data.addUserName,
          [userName]: res.data.userName != null ? res.data.userName : "",
          [userId]: res.data.userId,
          [description]: res.data.description,
          [devStatus1]: res.data.devStatus1,
          [devStatus2]: res.data.devStatus2,
          devStatus1True: res.data.devStatus1 == 0 ? false : true,
          devStatus2True: res.data.devStatus2 == 0 ? false : true,
          woName: that.data.typeName[Number(res.data.woId)],
          imageList: res.data.imageList,
          status: res.data.status,
          [status]: res.data.status,
          endDate: res.data.endDate,
          dueResult: res.data.dueResult,
          devId: res.data.devId
        });

        let myUserId = Number(getApp().globalData.userInfo.UserID); //我的id
        let assignId = Number(res.data.userId); //指派人id
        let editId = Number(res.data.addUserId); //编辑人id

        if (that.data.status != 2) {
          //未处理
          // 是否可保存
          if (myUserId == editId && that.data.status != 1) {
            that.setData({
              enableAdit: true
            });
          }
          // 处理结案
          if (myUserId == assignId) {
            that.setData({
              compAdit: true
            });
          }
        }
      }
    );
  },
  getAll() {
    // 获取类型接口
    let that = this;
    wx.customAjax.get(`${wx.Interface.getAll}`, {}, function(res) {
      //获取数据
      let typeName = [];
      let typeId = [];

      res.data.forEach(function(item) {
        typeName.push(item.typeName);
        typeId.push(item.typeId);
      });

      that.setData({
        typeName: typeName,
        typeId: typeId
      });
      wx.Storage.setKey("tpyeMessage", {
        typeName: typeName,
        typeId: typeId
      });
      that.setWoId();
    });
  },
  setWoId() {
    //设置woId
    let that = this;
    let woId = "saveParse.woId";
    that.setData({
      [woId]: that.data.typeId[0],
      woName: that.data.typeName[0]
    });
  },
  // 扫一扫
  toSao: function(event) {
    let that = this;
    wx.WxTools.getScanCode(function(res) {
      let url = res.result;
      let devId = wx.Tools.getUrl("devId", url);
      if (!!devId) {
        that.getDevId(devId);
      }
    });
  },
  // 验证id
  getDevId(devID) {
    let that = this;
    let devId = "saveParse.devId";

    wx.customAjax.get(
      `${wx.Interface.getDeviceBydevId}`,
      {
        devId: devID,
        userId: getApp().globalData.userInfo.UserID
      },
      function(res) {
        //获取数据
        if (res.code == -1) {
          wx.Dialog.showAlert(`${res.message}`, function() {});
          that.setData({
            [devId]: !!that.data.newAdit ? "" : that.data.devId
          });
          return;
        }
        if (res.data == null) {
          wx.Dialog.showAlert(
            `不存在这个设备或没有该设备权限，请重新输入`,
            function() {
              that.setData({
                [devId]: !!that.data.newAdit ? "" : that.data.devId
              });
            }
          );

          return;
        }
        that.setData({
          [devId]: devID
        });
      }
    );
  },
  // 事件处理
  bindTitleInput: function(e) {
    //标题
    let that = this;
    let title = "saveParse.title";
    that.setData({
      [title]: e.detail.value
    });
  },
  bindIdInput: function(e) {
    //设备id
    let that = this;
    let devId = "saveParse.devId";
    let value = e.detail.value;
    if (value.length > 9) {
      wx.Dialog.showAlert(
        "输入的ID不允许超过9位数，请重新输入！",
        function() {}
      );
      value = value.substring(0, value.length - 1);
    }
    that.setData({
      [devId]: value
    });
  },
  outBlur(e) {
    let that = this;
    let devId = e.detail.value;
    if (!!devId) {
      that.getDevId(devId);
    }
  },
  bindWoId: function(e) {
    //工单类型
    let that = this;
    let woId = "saveParse.woId";
    wx.Dialog.showDraw(that.data.typeName, function(datas) {
      if (datas.code == -1) return;
      that.setData({
        [woId]: that.data.typeId[Number(datas.index)],
        woName: that.data.typeName[Number(datas.index)]
      });
    });
  },
  bindTextarea: function(e) {
    //textareaVal值
    let that = this;
    let description = "saveParse.description";
    that.setData({
      [description]: e.detail.value
    });
  },
  bindDateChange: function(e) {
    //截止日期
    let that = this;
    let dueDate = "saveParse.dueDate";
    that.setData({
      [dueDate]: e.detail.value
    });
  },
  bindOverTextarea: function(e) {
    //结案信息
    let that = this;
    let dueResult = "saveParse.dueResult";
    that.setData({
      [dueResult]: e.detail.value
    });
  },
  radioChange(e) {
    //设备状态
    let that = this;
    let type = e.detail.value;
    let devStatus1 = "saveParse.devStatus1";
    if (Number(type) == 0) {
      that.setData({
        devStatus1True: true
      });
    } else {
      that.setData({
        devStatus1True: false,
        [devStatus1]: 0
      });
    }
  },
  OverRadioChange(e) {
    //结案设备状态
    let that = this;
    let devStatus2 = "saveParse.devStatus2";
    that.setData({
      devStatus2True: !Boolean(Number(e.detail.value)),
      [devStatus2]: !Boolean(e.detail.value) ? 0 : ""
    });
  },
  bindStatus: function(e) {
    //设备状态
    let that = this;
    let type = e.currentTarget.dataset.type;
    let devStatus1 = "saveParse.devStatus1";
    let devStatus2 = "saveParse.devStatus2";
    let arrObj = [
      {
        name: "启用",
        devStatus: 7
      },
      {
        name: "停用",
        devStatus: 4
      },
      {
        name: "维修",
        devStatus: 5
      },
      {
        name: "报废",
        devStatus: 6
      }
    ];
    wx.Dialog.showDraw(["启用", "停用", "维修", "报废"], function(datas) {
      if (datas.code == -1) return;
      if (type == 0) {
        that.setData({
          [devStatus1]: arrObj[Number(datas.index)].devStatus
        });
      } else {
        that.setData({
          [devStatus2]: arrObj[Number(datas.index)].devStatus
        });
      }
    });
  },
  bindNewBtn() {
    let that = this;

    if (!that.data.btnLock) {
      that.data.btnLock = true;
      that.verification({
        type: 0
      });
    }
  },
  //保存,结案
  saveAndOver(e) {
    let that = this;
    let type = Number(e.currentTarget.dataset.type);

    if (type == 1) {
      //结案填写
      that.data.saveParse.endDate = wx.Tools.formate(new Date());
      let status = "saveParse.status";
      that.setData({
        overEnable: true,
        enableAdit: false,
        compAdit: false,
        [status]: 2
      });
      wx.createSelectorQuery()
        .select("#page-wrap")
        .boundingClientRect(function(rect) {
          // 使页面滚动到底部
          wx.pageScrollTo({
            scrollTop: rect.bottom
          });
        })
        .exec(function() {
          setTimeout(function() {
            that.setData({
              comSubmit: true
            });
          }, 1000);
        });
    } else if (type == 0) {
      //保存
      that.verification({
        type: 1
      });
    } else if (type == 2) {
      if (
        that.data.saveParse.dueResult == null ||
        that.data.saveParse.dueResult == ""
      ) {
        wx.Dialog.showAlert("处理结果,请输入处理结果！", function() {});
        return;
      }
      if (!!that.data.devStatus2True) {
        if (Number(that.data.saveParse.devStatus2) == 0) {
          wx.Dialog.showAlert("请选择状态！", function() {});
          return;
        }
      }

      // that.data.saveParse.status = 2
      that.verification({
        type: 1
      });
    } else if (type == 3) {
      //撤销
      wx.Dialog.showLoading("撤销中");

      let params = {
        kid: that.data.kid,
        status: 0,
        userId: "",
        devId: that.data.devId,
        devStatus1: 0
      };

      wx.customAjax.post(`${wx.Interface.revokeWorkOrder}`, params, function(
        res
      ) {
        if (res.ok == true) {
          wx.Dialog.showAlert("撤销成功！", function() {
            wx.navigateBack({
              //解决环形页面的问题（不采用其他跳转api）
              delta: 1
            });
          });
        } else {
          wx.Dialog.showAlert("网络错误，请重新请求!", function() {});
        }
        that.data.btnLock = false;
      });
    }
  },
  newAppend() {
    // 新增
    let that = this;

    that.data.saveParse.kid = that.data.kid;
    //添加用户信息
    that.data.saveParse.compId = getApp().globalData.userInfo.compId;
    that.data.saveParse.addUserName = getApp().globalData.userInfo.name;
    that.data.saveParse.addUserId = getApp().globalData.userInfo.UserID;

    that.data.saveParse.addDate = wx.Tools.formate(new Date()); //添加时间

    wx.Dialog.showLoading("提交中");

    // 新增
    wx.customAjax.post(`${wx.Interface.add}`, that.data.saveParse, function(
      res
    ) {
      if (res.ok == true) {
        wx.Dialog.showAlert("提交成功！", function() {
          wx.removeStorage({
            key: "saveParse",
            success: function(res) {
              wx.navigateBack({
                //解决环形页面的问题（不采用其他跳转api）
                delta: 1
              });
            }
          });
          wx.removeStorage({
            key: "userParse",
            success: function(res) {}
          });
        });
      } else {
        wx.Dialog.showAlert("网络错误，请重新请求!", function() {});
      }
      that.data.btnLock = false;
    });
  },
  submitSaveAndOver() {
    let that = this;

    that.data.saveParse.kid = that.data.kid;
    wx.Dialog.showLoading("提交中");

    wx.customAjax.post(
      `${wx.Interface.workOrderUpdate}`,
      that.data.saveParse,
      function(res) {
        if (res.ok == true) {
          wx.Dialog.showAlert("提交成功！", function() {
            wx.navigateBack({
              //解决环形页面的问题（不采用其他跳转api）
              delta: 1
            });
          });
        } else {
          wx.Dialog.showAlert("网络错误，请重新请求!", function() {});
        }
        that.data.btnLock = false;
      }
    );
  },
  // 验证信息
  verification(param) {
    let that = this;
    let parse = that.data.saveParse;

    if (parse.title == null || parse.title == "") {
      wx.Dialog.showAlert("标题为空,请输入标题！", function() {});
      that.data.btnLock = false;
      return;
    }
    if (parse.devId == null || parse.devId == "") {
      wx.Dialog.showAlert("设备为空,请输入设备id！", function() {});
      that.data.btnLock = false;
      return;
    }

    if (parse.description == null || parse.description == "") {
      wx.Dialog.showAlert("描述为空,请输入描述内容！", function() {});
      that.data.btnLock = false;
      return;
    }
    if (parse.woId == null || parse.woId == "") {
      that.data.saveParse.woId = that.data.typeId[0];
    }
    if (parse.userId == null || parse.userName == "") {
      that.data.saveParse.status = 0;
    }

    if (parse.devStatus1 == null || parse.devStatus1 == "") {
      //类型默认默认
      that.data.saveParse.devStatus1 = 0;
    }

    if (param.type == 0) {
      that.newAppend();
    } else if (param.type == 1) {
      that.submitSaveAndOver();
    }
  },

  // 跳转事件
  goEntrustListView: function(event) {
    //跳转选择委托人
    let that = this;
    if (!that.data.enableAdit) return;
    wx.Storage.setKey("saveParse", that.data.saveParse);

    //缓存信息
    wx.navigateTo({
      url: `/pages/dataCenter/entrustList/entrustList`
    });
  }
});
