Page({
  data: {
    areaId: '',
    checkNum: 0,
    tabs: [],
    list: []
  },
  onLoad: function() {
    let that = this
    wx.Dialog.showLoading()

    //获取tab信息
    wx.customAjax.get(`${wx.Interface.areaSelectDeviceAreaByUserId}`, {
      userId: getApp().globalData.userInfo.UserID
    }, function(res) { //获取数据
      if (!res.ok) {
        that.setData({
          showNoNetwork: true
        })
      } else {
        that.setData({
          tabs: res.data.data
        })
        that.getListDate()
      }

    })
  },
  // 获取列表
  getListDate() {
    let that = this
    //获取tab信息
    wx.customAjax.get(`${wx.Interface.checkRecordSelectByMap}`, {
      areaId: getApp().globalData.userInfo.UserID
    }, function(res) { //获取数据
      if (!res.ok) {
        that.setData({
          showNoNetwork: true
        })
      } else {
        that.setData({
          tabs: res.data.data
        })
      }
      wx.Dialog.hideLoading()

    })
  },
  isChecked(e) {
    this.setData({
      checkNum: e.target.dataset.tabnum
    })
  },
  inspemx() {
    wx.navigateTo({
      url: '/pages/workBench/inspectioninfo/inspectioninfo',
    })
  }
})