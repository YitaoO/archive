/**
 * 委托人信息
 */
Page({

  onLoad: function(options) {
    let that = this

    wx.Dialog.showLoading()
    wx.customAjax.get(`${wx.Interface.userSelectByMap}`, {
      compId: getApp().globalData.userInfo.compId
    }, function(res) { //获取数据
      console.log(res.data);
      that.setData({
        list: res.data.data
      })
      wx.Dialog.hideLoading()
    })
  },
  data: {
    list: []
  },

  // 跳转事件
  goMandispatchlView: function(event) {
    wx.Storage.setKey('userParse', {
      userName: event.currentTarget.dataset.username,
      userId: event.currentTarget.dataset.userid
    })
    wx.navigateBack({
      delta: 1
      // url: `/pages/dataCenter/mandispatch/mandispatch`,
    })
  }

})