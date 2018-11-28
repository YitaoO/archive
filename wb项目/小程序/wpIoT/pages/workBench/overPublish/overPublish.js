Page({
  data: {

  },
  onLoad: function(options) {
    let that = this

    // wx.Dialog.showLoading()

  },
  // 事件处理
  bindTitleInput: function(e) { //标题
    let that = this
    this.setData({
      maintainPeriod: e.detail.value
    })
  },
  bindDateChange: function(e) { //日期
    this.setData({
      maintainTerm: e.detail.value
    })
  },
  verification() { //验证
    let that = this
    if (that.data.maintainPeriod == null || that.data.maintainPeriod == '') {
      wx.Dialog.showAlert('维修年限为空,请输入！', function() {})
      return
    }
    if (that.data.maintainTerm == null || that.data.maintainTerm == '') {
      wx.Dialog.showAlert('日期为空,请选中日期！', function() {})
      return
    }
    that.save()
  },
  save() { //提交
    let that = this
    wx.Storage.getKey('overDevId').then(function(devList) {
      if (!devList || devList.length > 0) {
        devList.forEach(function(item) {
          item.maintainPeriod = that.data.maintainPeriod
          item.maintainTerm = `${that.data.maintainTerm} 00:00:00`
        })
        wx.customAjax.post(`${wx.Interface.deviceUpdateList}`, devList, function(res) {
          if (res.ok == true) {
            wx.Dialog.showAlert('提交成功！', function() {
              wx.removeStorage({
                key: 'overDevId',
                success: function(res) {
                  wx.navigateTo({
                    url: `/pages/workBench/overAndRecordList/overAndRecordList?type=1`
                  })
                }
              })

            })

          }
        })
      } else {
        wx.Dialog.showAlert('请选择要维保的设备', function() {
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)

        })
      }
    })
  }
})
