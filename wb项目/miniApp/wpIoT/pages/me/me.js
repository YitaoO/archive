const AppGlobal = getApp().globalData
Page({
  onLoad: function() {
    let that = this

  },
  onShow() {
    let that = this
    wx.Dialog.showLoading()

    //动态设置标题
    wx.WxTools.setTitle('工作台')

    // 获取用户信息
    that.getWxUserInfo().then(function(result) {
      that.setData({
        userInfo: AppGlobal.userInfo,
        hasUserInfo: true
      })
      wx.Dialog.hideLoading()
    })
  },
  getWxUserInfo() {
    let that = this
    return new Promise(function(resolve) {
      wx.getUserInfo({ //获取微信用户信息
        success: res => {
          // 缓存头像信息
          AppGlobal.userInfo.avatarUrl = res.userInfo.avatarUrl
          resolve()
        }
      })
    })
  },
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})