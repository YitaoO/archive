/**
 * 委托人信息
 */
Page({

  onLoad: function(options) {
    let that = this

    wx.Dialog.showLoading()
    wx.customAjax.get(`${wx.Interface.checkPlanSelectBy}`, {
      devId: options.devId,
      ckDate: new Date().format("yyyy-MM-dd"),
      userId: getApp().globalData.userInfo.UserID,
      isFinish: false,
      isPublish: 1
    }, function(res) { //获取数据
      if (!res.ok) {
        that.setData({
          showNoNetwork: true
        })
      } else {
        if (res.data.length > 0) {
          that.setData({
            list: res.data
          })
        } else {
          that.setData({
            list: []
          })
        }

      }

      wx.Dialog.hideLoading()
    })
  },
  data: {
    showNoNetwork: false
  },

  // 跳转事件
  goMandispatchlView: function(event) {
    let that = this
    let cpKid = event.currentTarget.dataset.cpkid
    if (!!cpKid) {
      wx.Storage.setKey('cpKid', {
        cpKid: cpKid,
        title: event.currentTarget.dataset.title
      })
      wx.navigateBack({
        delta: 1
      })
    }

  }

})