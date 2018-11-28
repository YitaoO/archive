/**
 * 设备详情
 */
// 功能 - 控制空调
import ControlAir from "../ControlAir";

Page({
  // 页面初始化
  onLoad: function(options) {
    let that = this;

    that.data.areaId = options.areaId;

    //动态设置标题
    wx.WxTools.setTitle(options.areaName);
  },
  onShow: function() {
    let that = this;
    that.getData();
  },
  // 获取数据
  getData() {
    let that = this;
    wx.Dialog.showLoading();
    wx.customAjax.get(
      `${wx.Interface.selectAreaByUserId}`,
      {
        areaId: that.data.areaId,
        userId: getApp().globalData.userInfo.UserID
      },
      function(res) {
        //获取数据
        if (!res.ok) {
          that.setData({
            showNoNetwork: true
          });
        } else {
          that.renderData(res.data).then(function(deviceList) {
            that.setData({
              list: deviceList
            });

            if (deviceList.length > 0) {
              let devIds = [];
              deviceList.forEach(function(item) {
                devIds.push(item.devId);
              });

              ControlAir.init(devIds.join(), that, 3);
            }
          });
        }
        wx.Dialog.hideLoading();
      }
    );
  },
  //处理数据
  renderData(datas) {
    let that = this;
    let deviceList = [];
    return new Promise(function(resolve, rejece) {
      datas.deviceList.forEach(function(item, key, items) {
        deviceList.push(wx.Tools.renderControlData(item));
      });
      console.log(deviceList);

      resolve(deviceList);
    });
  },
  //渲染数据
  data: {
    socketList: [],
    socketLock: true,
    showNoNetwork: false
  },

  // 跳转事件
  yaokong: function(event) {
    //控制
    let that = this;
    let dataSet = event.currentTarget.dataset;
    let status = event.currentTarget.dataset.status;
    if (Number(status) == 1 || Number(status) == 2) {
      wx.navigateTo({
        url: `/pages/dataCenter/remote/remote?devId=${dataSet.devid}&title=${
          dataSet.title
        }`
      });
    } else {
      wx.navigateTo({
        url: `/pages/dataCenter/eqInformation/eqInformation?devId=${
          event.currentTarget.dataset.devid
        }`
      });
    }
  }
});
