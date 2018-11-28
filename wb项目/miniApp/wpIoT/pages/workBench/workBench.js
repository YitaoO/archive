Page({
  onLoad: function(options) {
    let that = this
    that.removeStorage()
  },
  removeStorage() {
    wx.removeStorage({
      key: 'saveParse',
      success: function(res) {}
    })
    wx.removeStorage({
      key: 'userParse',
      success: function(res) {}
    })
  },
  onShow() {
    let that = this
    //动态设置标题
    wx.WxTools.setTitle('工作台')

    that.removeStorage()
  },
  removeStorage() {
    wx.removeStorage({
      key: 'cpKid',
      success: function(res) {}
    })
    wx.removeStorage({
      key: 'userParse',
      success: function(res) {}
    })
  },
  // 扫一扫
  toSao: function(event) {
    wx.WxTools.getScanCode(function(res) {
      let url = res.result
      let devId = wx.Tools.getUrl('devId', url)

      if (!!devId) {
        wx.customAjax.get(`${wx.Interface.getDeviceBydevId}`, {
          devId: devId
        }, function(res) {
          if (res.data != null) {
            wx.navigateTo({
              url: `/pages/dataCenter/eqInformation/eqInformation?devId=${devId}`,
            })
          } else {
            wx.Dialog.showAlert(`不存在这个设备或没有该设备权限，请重新输入`, function() {})
            return
          }
        })


      }
    })
  },

  // 跳转页面
  toInspection: function(event) { //巡检
    let type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/workBench/inspection/inspection`
    })
  },
  toRecord: function(event) { //巡检记录
    let type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/workBench/overAndRecordList/overAndRecordList?type=0`
    })
  },
  toMandispatch: function(event) { //派单
    let type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/dataCenter/mandispatch/mandispatch`
    })
  },
  toActivework: function(event) { //工单列表
    let type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/dataCenter/activework/activework`
    })
  },
  overpment: function(event) { //过保设备
    let type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/workBench/overAndRecordList/overAndRecordList?type=1`
    })
  },

})