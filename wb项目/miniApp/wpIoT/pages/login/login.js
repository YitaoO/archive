/**
 * 首页地图页面
 */

// 组件 - 登录功能
import Login from '../../components/Login/login'

Page({
  onLoad: function(options) {
    var that = this;

    that.data.openId = options.openId
  },

  data: {
    phone: '',
    userName: '',
    verityValue: '',
    isGetVerify: false,
    sec: 60,
  },
  // 获取输入账号
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 获取输入密码
  nameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  verityInput: function(e) {
    this.setData({
      verityValue: e.detail.value
    })
  },
  // 获取验证码
  getCode: function(e) {
    let that = this

    if (that.data.phone == '') {
      wx.Dialog.showAlert('请输入手机号码!', function() {})
      return
    }
    this.setData({
      isGetVerify: true
    })
    that.tiemerOut(that.data.sec)

    wx.customAjax.get(`${wx.Interface.getSMSCode}`, {
      tel: that.data.phone
    }, function(res) { //获取数据
      if (!res.ok) {
        that.setData({
          showNoNetwork: true
        })
      } else {}

    })

  },
  // 时间倒计时
  tiemerOut: function(times) {
    let that = this
    return new Promise(function(resolve) {
      var time = setInterval(function() {
        if (times == 1) {
          clearInterval(time)
          that.setData({
            sec: 60,
            isGetVerify: false
          })
          return false
        }
        times--;
        that.setData({
          sec: times
        })
      }, 1000)
    })
  },
  // 登录
  login: function() {
    let that = this

    //错误提示
    if (this.data.phone.length == 0) {
      wx.Dialog.showAlert('请输入手机号码!', function() {

      })
      return

    }
    if (!wx.Tools.isPoneAvailable(this.data.phone)) {
      wx.Dialog.showAlert('请输入有效的手机号码!', function() {

      })
      return

    }
    // if (this.data.userName.length == 0) {
    //   wx.Dialog.showAlert('请输入用户名!', function() {
    //
    //   })
    //   return
    // }
    if (this.data.verityValue.length == 0) {
      wx.Dialog.showAlert('请输入验证码!', function() {

      })
      return
    }

    wx.Dialog.showLoading()

    //录入
    wx.customAjax.post(`${wx.Interface.updateByTel}`, {
      openId: that.data.openId,
      telephone: that.data.phone,
      // name: that.data.userName,
      verifyCode: that.data.verityValue
    }, function(res) {
      if (res.ok == true) {
        wx.Dialog.hideLoading()
        wx.Dialog.showAlert('提交成功!', function() {
          wx.switchTab({
            url: `/pages/index/index`,
          })

        }, 'success')

      } else {
        wx.Dialog.showAlert(`${res.message}`, function() {
          that.setData({
            verityValue: '',
            isGetVerify: false,
            sec: 60,
          })
        })
        return
      }
    })

  }



})