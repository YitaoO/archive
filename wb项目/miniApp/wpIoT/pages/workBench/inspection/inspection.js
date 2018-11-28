/**
 * 发布巡检
 */
const QQMapWX = require('../../../components/Tools/qqmap-wx-jssdk.min')

Page({
  onLoad(options) {
    let that = this

    that.setData({
      kid: wx.Tools.getNum(), //生成唯一id,
      nowDate: wx.Tools.formate(new Date()), //当前时间
      newAdit: true
    })

    // 实例化腾讯地图API核心类
    that.qqmapsdk = new QQMapWX({
      key: 'U7NBZ-NAWKG-LOSQE-IYVO6-YC326-CDFB5' // 必填
    });

    //获取当前位置
    that.getLocation()

  },
  onShow() {
    let that = this

    // 获取类型
    wx.getStorage({
      key: 'tpyeMessage',
      success: function(res) {
        that.setData({
          typeName: res.data.typeName,
          typeId: res.data.typeId
        })
      },
      fail: function() {

        that.getAll()
      }
    })

    //获取委托人信息是否存在
    wx.getStorage({
      key: 'userParse',
      success: function(res) {
        that.setData({
          userId: res.data.userId,
          userName: res.data.userName
        })
      }

    })
    // 计划是否存在
    wx.getStorage({
      key: 'cpKid',
      success: function(res) {
        that.setData({
          cpKid: res.data.cpKid,
          cpTitle: res.data.title
        })
      }
    })
  },
  data: {
    focus: false,
    devId: '',
    address: '',
    enableRole: false, //是否选择角色
    typeName: [], //设备名字
    typeId: [], //设备id
    showConfirmBar: false,
    devStatus1: 0 // 默认状态

  },
  getAll() { // 获取类型接口
    let that = this
    wx.customAjax.get(`${wx.Interface.getAll}`, {}, function(res) { //获取数据
      let typeName = []
      let typeId = []
      res.data.forEach(function(item) {
        typeName.push(item.typeName)
        typeId.push(item.typeId)
      })
      that.setData({
        typeName: typeName,
        typeId: typeId
      })

      wx.Storage.setKey('tpyeMessage', {
        typeName: typeName,
        typeId: typeId
      })

    })
  },
  getLocation() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        that.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(addressRes) {
            const address = addressRes.result.formatted_addresses.recommend;

            that.setData({
              address: address
            })
          }
        })
      }
    })
  },
  // 扫一扫
  toSao: function(event) {
    let that = this
    wx.WxTools.getScanCode(function(res) {
      let url = res.result
      let devId = wx.Tools.getUrl('devId', url)
      if (!!devId) {
        that.getDevId(devId)
      }
    })
  },
  // 绑定事件
  bindIdInput: function(e) { //设备id
    let that = this
    let value = e.detail.value
    if (value.length > 9) {
      wx.Dialog.showAlert('输入的ID不允许超过9位数，请重新输入！', function() {

      })
      value = value.substring(0, value.length - 1)
    }
    this.setData({
      devId: value
    })
  },
  outBlur(e) {
    let that = this
    let devId = e.detail.value
    if (!!devId) {
      that.getDevId(devId)
    }
  },
  // 验证id
  getDevId(devId) {
    let that = this
    wx.customAjax.get(`${wx.Interface.getDeviceBydevId}`, {
      devId: devId,
      userId: getApp().globalData.userInfo.UserID
    }, function(res) { //获取数据
      if (res.code == -1) {
        wx.Dialog.showAlert(`${res.message}`, function() {
          that.setData({
            devId: ''
          })
        })
        return
      }
      if (res.data == null) {
        wx.Dialog.showAlert(`不存在这个设备或没有该设备权限，请重新输入`, function() {
          that.setData({
            devId: ''
          })
        })
        return
      }
      that.setData({
        areaId: res.data.areaID,
        devId: devId
      })
      that.getRecordList(devId)

    })
  },
  bindTextarea: function(e) { //textareaVal值
    let that = this
    this.setData({
      description: e.detail.value
    })
  },
  bindWoId: function(e) { //工单类型
    let that = this
    wx.Dialog.showDraw(that.data.typeName, function(datas) {
      if (datas.code == -1) return
      that.setData({
        woId: that.data.typeId[Number(datas.index)],
        woName: that.data.typeName[Number(datas.index)]
      })
    })
  },
  // 获取设备列表数据
  getRecordList(devId) {
    let that = this
    wx.customAjax.get(`${wx.Interface.checkRecordSelectByMap}`, {
      devId: devId,
      page: 1,
      limit: 5
    }, function(res) { //获取数据
      if (!res.ok) return
      that.setData({
        list: res.data.data
      })

    })
  },
  radioChange(e) {
    let that = this
    let type = e.detail.value
    if (Number(type) == 0) {
      that.setData({
        enableRole: true
      })
    } else {
      that.setData({
        enableRole: false
      })
    }

  },
  statusRadioChange(e) { //结案设备状态
    let that = this
    that.setData({
      devStatus: e.detail.value,
    })

  },
  bindStatus: function(e) { //设备状态
    let that = this
    let arrObj = [{
      name: '启用',
      devStatus: 7
    }, {
      name: '停用',
      devStatus: 4
    }, {
      name: '维修',
      devStatus: 5
    }, {
      name: '报废',
      devStatus: 6
    }]
    wx.Dialog.showDraw(['启用', '停用', '维修', '报废'], function(datas) {
      if (datas.code == -1) return
      that.setData({
        devStatusName: arrObj[Number(datas.index)].name,
        devStatus1: arrObj[Number(datas.index)].devStatus
      })

    })
  },
  // 提交
  verification() {
    let that = this

    if (that.data.devId == null || that.data.devId == '') {
      wx.Dialog.showAlert('设备为空,请输入设备id！', function() {})
      return
    }
    if (that.data.devStatus == 0) {
      if (Number(that.data.devStatus1) == 0) {
        wx.Dialog.showAlert('设备状态为空,请选择设备状态！', function() {})
        return
      }
    }

    if (!!that.data.enableRole) {
      if (that.data.woId == null) {
        wx.Dialog.showAlert('工单类型为空,请选择工单类型！', function() {})
        return
      }
      if (that.data.userId == null) {
        wx.Dialog.showAlert('指派人为空,请选择指派人！', function() {})
        return
      }
    }

    that.save()
  },
  // 保存
  save() {
    let that = this

    let params = {
      addUserName: getApp().globalData.userInfo.name,
      addUserId: getApp().globalData.userInfo.UserID,
      kid: that.data.kid,
      addDate: that.data.nowDate,
      devId: that.data.devId,
      description: that.data.description,
      areaId: that.data.areaId,
      location: that.data.address,
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      userId: (that.data.userId != undefined) ? that.data.userId : null,
      userName: (that.data.userName != undefined) ? that.data.userName : null,
      sendOrder: that.data.enableRole,
      cpKid: (that.data.cpKid != undefined) ? that.data.cpKid : null,
      woId: that.data.woId,
      devStatus1: that.data.devStatus1
    }
    wx.Dialog.showLoading('提交中')
    wx.customAjax.post(`${wx.Interface.checkRecordAdd}`, params, function(res) {
      if (res.ok == true) {
        wx.Dialog.showAlert('提交成功！', function() {
          wx.removeStorage({
            key: 'userParse',
            success: function(res) {
              wx.navigateBack({ //解决环形页面的问题（不采用其他跳转api）
                delta: 1
              })
            }
          })
          wx.removeStorage({
            key: 'cpKid',
            success: function(res) {

            }
          })

        })

      } else {
        wx.Dialog.showAlert(`${res.message}`, function() {})
      }
    })
  },
  toInspeminfoView(e) {
    let kid = e.currentTarget.dataset.kid
    if (!!kid) {
      wx.navigateTo({
        url: `/pages/workBench/inspectioninfo/inspectioninfo?kid=${kid}`
      })
    }
  },
  // 跳转事件
  goEntrustListView: function(event) { //跳转选择委托人
    let that = this

    //缓存信息
    wx.navigateTo({
      url: `/pages/dataCenter/entrustList/entrustList`,
    })
  },
  goPlanView: function(event) {
    let that = this
    if (that.data.devId == null || that.data.devId == '') {
      wx.Dialog.showAlert('设备为空,请输入设备id！', function() {})
      return
    }
    //缓存信息
    wx.navigateTo({
      url: `/pages/dataCenter/plantList/plantList?devId=${that.data.devId}`,
    })
  }

})