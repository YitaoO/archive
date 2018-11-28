/**
 * 调用微信通用api
 */
class WxTools {

  //动态设计页面标题
  setTitle(title) {
    wx.setNavigationBarTitle({
      title: title
    })
  }
  // 允许从相机和相册扫码
  getScanCode(callBack) {
    return new Promise(function(resolive, reject) {
      wx.scanCode({
        success: (res) => {
          callBack(res)
        }
      })
    })

  }

}
export default new WxTools()
