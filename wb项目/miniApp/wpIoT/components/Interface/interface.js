/**
 * 请求接口封装
 */

// 全局基本配置
import config from '../Config/config'

export default wx.Interface = {
  //登陆模块
  updateByTel: config.prodInterfaceUrls + '/users/updateByTel', // 1.0. 录入信息
  login: config.prodInterfaceUrls + '/login2', // 2.6.	登录
  getSMSCode: config.prodInterfaceUrls + '/getSMSCode', // 获取验证码
  //websocket
  webSocket: config.prodWebSocketInterfaceUrls + '/equipmentWebSocket', // 2.5.	WebScoket
  // 区域模块
  areaSelectDeviceAreaByUserId: config.prodInterfaceUrls + '/area/selectDeviceAreaByUserId', //2.1.0. 获取区域
  selectAreaByUserId: config.prodInterfaceUrls + '/area/selectAreaByUserId', // 2.7.	获取地图的点
  // 设备模块
  getDeviceByareaID: config.prodInterfaceUrls + '/device/getDeviceByareaID', // 2.2.	列表设备
  getDeviceBydevId: config.prodInterfaceUrls + '/device/getDeviceBydevId', // 2.3.	获取设备id
  changeValue: config.prodInterfaceUrls + '/device/changeValue', // 2.4.	控制设备
  deviceSelectByMap: config.prodInterfaceUrls + '/device/selectByMap', // 2.8.	查询设备列表
  deviceUpdate: config.prodInterfaceUrls + '/device/update', // 更新设备信息
  deviceUpdateList: config.prodInterfaceUrls + '/device/updateList', // 更新设备维保年限
  updateDevice: config.prodInterfaceUrls + '/device/updateDevice', // 更新设备信息
  //工单模块
  workSelectByMap: config.prodInterfaceUrls + '/workOrder/selectByMap', // 2.8.	活动工单
  workGetByKid: config.prodInterfaceUrls + '/workOrder/getByKid', // 2.8.	活动工单
  getAll: config.prodInterfaceUrls + '/typeWorkOrder/getAll', // 2.9.	工单类型
  upload: config.prodInterfaceUrls + '/wpFileImage/upload', // 3.0. 上传图片
  fileDownloadF: config.prodInterfaceUrls + '/wpFileImage/f', // 3.1. 获取图片
  add: config.prodInterfaceUrls + '/workOrder/add', // 3.2. 保存
  userSelectByMap: config.prodInterfaceUrls + '/users/selectByMap', // 3.3. 查询公司人员
  wpImageSelectByMap: config.prodInterfaceUrls + '/wpFileImage/selectByMap', // 3.3. 获取图片信息
  workOrderUpdate: config.prodInterfaceUrls + '/workOrder/update', // 3.3. 更新图片
  revokeWorkOrder: config.prodInterfaceUrls + '/workOrder/revokeWorkOrder', // 3.3. 撤销
  //告警模块
  warnmsgSelectByMap: config.prodInterfaceUrls + '/warnmsg/selectByMap', // 3.4. 设备告警信息接口
  warnmsgUpdate: config.prodInterfaceUrls + '/warnmsg/update', // 3.5. 修改告警信息接口
  warmGetByKid: config.prodInterfaceUrls + '/warnmsg/getByKid', // 3.6. 设备信息接口
  //巡检模块
  checkRecordAdd: config.prodInterfaceUrls + '/checkRecord/add', //4.1.增加巡检记录
  checkRecordSelectByMap: config.prodInterfaceUrls + '/checkRecord/selectByMap', //4.2.巡检记录查询
  checkGetById: config.prodInterfaceUrls + '/checkRecord/getById', //4.3.巡检详情
  checkPlanSelectBy: config.prodInterfaceUrls + '/checkPlan/selectCPByDevId', //4.3.巡检计划

  getDeviceBydevIdUsingGET: config.prodInterfaceUrls + '/device/updateAndSendMessage' //启用

}