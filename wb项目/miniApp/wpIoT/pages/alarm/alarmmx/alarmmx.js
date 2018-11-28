Page({
  onLoad: function(options) {
    let that = this

    that.data.kid = options.kid

    wx.Dialog.showLoading()

    wx.customAjax.get(`${wx.Interface.warmGetByKid}`, {
      userId: getApp().globalData.userInfo.UserID,
      kid: that.data.kid
    }, function(res) { //获取数据
      that.setData({
        ...res.data
      })

      //动态设置标题
      wx.WxTools.setTitle(options.title)
      wx.Dialog.hideLoading()

    })


  },
  data: {
    isChecked: false
  },
  bindTextarea: function(e) { //textareaVal值
    let that = this
    let description = 'saveParse.description'
    this.setData({
      content: e.detail.value
    })
  },
  primary() {
    let that = this
    let userInfo = getApp().globalData.userInfo
    //请求接口
    let params = {
      endDate: wx.Tools.formate(new Date()),
      userId: userInfo.UserID,
      name: userInfo.name,
      isEnd: true,
      result: that.data.content
    }

    wx.customAjax.post(`${wx.Interface.warnmsgUpdate}`, params, function(res) { //获取数据
      if (res.ok == true) {
        wx.Dialog.showAlert('提交成功！', function() {
          wx.navigateBack({ //解决环形页面的问题（不采用其他跳转api）
            delta: 1
          })

        })

      } else {
        wx.Dialog.showAlert('系统异常，请稍后重试！', function() {})
      }
    })
  }

})
