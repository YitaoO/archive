Page({
  data: {
    isEnd: 0,
    pageIndex: 1,
    isHideLoadMore: true,
    total: 0

  },
  onLoad: function() {
    let that = this
  },
  onShow() {
    let that = this
    wx.Dialog.showLoading()
    that.setData({
      list: [],
      pageIndex: 1
    })

    that.getData()
  },
  // 获取数据
  getData() {

    let that = this

    wx.customAjax.get(`${wx.Interface.warnmsgSelectByMap}`, {
      userId: getApp().globalData.userInfo.UserID,
      end: Boolean(Number(that.data.isEnd)), //0:实时;1:历史
      page: that.data.pageIndex,
      limit: 20

    }, function(res) { //获取数据
      if (!res.ok) {
        that.setData({
          showNoNetwork: true
        })
      } else {
        let list = (that.data.list == undefined) ? [] : that.data.list
        res.data.data.forEach(function(item) {
          list.push(item)
        })
        that.setData({
          list: list,
          total: res.data.total
        })


      }
      wx.Dialog.hideLoading()

    })
  },
  onReachBottom: function() { //上拉加载
    let that = this

    that.data.pageIndex++;
    if (that.data.total <= that.data.pageIndex * 20) {
      wx.Dialog.showAlert('没有更多的数据了!', function() {})
      that.data.pageIndex--;
      return
    }
    wx.Dialog.showLoading()


    that.getData()

  },
  bindTab(e) {
    let that = this;

    let thisTab = e.currentTarget.dataset.tab
    that.setData({
      isEnd: thisTab,
      pageIndex: 1,
      list: []
    })
    wx.Dialog.showLoading()
    that.getData()

  },
  details(e) {
    let that = this
    let kid = e.currentTarget.dataset.kid
    let title = (that.data.isEnd == 0) ? '实时告警' : '历史告警'
    if (!!kid) {
      wx.navigateTo({
        url: `/pages/alarm/alarmmx/alarmmx?title=${title}&kid=${kid}`,
      })
    }

  }
})