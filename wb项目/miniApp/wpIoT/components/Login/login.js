/**
 * 登录功能
 */
class Login {

  init() {
    return new Promise(function(resolve, reject) {
      //登陆
      wx.login({
        success: function(res) {
          if (res.code) {
            // 登录
            wx.customAjax.post(`${wx.Interface.login}`, {
              code: res.code,
              weixin: 'miniapp'
            }, function(datas) {
              let resCode = Number(datas.code)
              if (resCode < 0) { //返回错误信息
                wx.Dialog.showAlert(`${datas.message}`)
                return
              } else if (resCode > 0) { //请登陆

                if (resCode == 1000) {
                  // 完善个人信息
                  wx.reLaunch({
                    url: `/pages/login/login?openId=${datas.message}`,
                  })

                }

              } else {
                // 缓存session-id
                getApp().globalData.sessionId = datas.data.sessionId

                getApp().globalData.userInfo = datas.data
                resolve(datas.data.UserID)
              }


            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

    })
  }


}
export default new Login()