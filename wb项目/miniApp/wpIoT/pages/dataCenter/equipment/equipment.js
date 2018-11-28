Page({
  data: {
    list: []
  },
  onLoad: function(options) {
    let that = this
    that.data.areaId = options.areaId

    //动态设置标题
    wx.WxTools.setTitle(options.areaName)
  },
  onShow() {
    let that = this

    wx.Dialog.showLoading()
    wx.customAjax.get(`${wx.Interface.getDeviceByareaID}`, {
      areaID: that.data.areaId
    }, function(res) { //获取数据
      res.data.forEach(function(item) {
        item.picturePath = wx.Tools.imagePath(item.picturePath)
      })
      that.setData({
        list: res.data
      })
      wx.Dialog.hideLoading()
    })
  },
  bindDetailView(event) {
    let devId = event.currentTarget.dataset.devid
    if (!!devId) {
      wx.navigateTo({
        url: `/pages/dataCenter/eqInformation/eqInformation?devId=${devId}`,
      })
    }
  }
})