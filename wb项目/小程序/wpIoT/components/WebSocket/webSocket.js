/**
 * WebScoket
 */
class WebScoket {

  init(id) {
    let that = this
    return new Promise(function(resolve) {
      // 建立连接
      wx.connectSocket({
        url: `${wx.Interface.webSocket}/${id}`,
        data: {},
        header: {
          'content-type': 'application/json'
        },
        method: "GET"
      })
      // 监听是否打开
      wx.onSocketOpen(function(res) {
        getApp().globalData.openSocket = true
        resolve()

        console.log('WebSocket连接已打开！')
      })
      // 监听打开错误
      wx.onSocketError(function(res) {
        console.log('WebSocket连接打开失败，请检查！')
      })

    })

  }
}


export default new WebScoket()