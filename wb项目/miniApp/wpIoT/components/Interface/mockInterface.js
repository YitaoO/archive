/**
 * 请求接口封装
 */

// 全局基本配置
import config from '../Config/config'

export default wx.Interface = {
  //登陆模块
  updateByTel: config.mockInterfaceUrls + '/users/updateByTel', // 1.0. 录入信息
  login: config.mockInterfaceUrls + '/login2', // 2.6.	登录
  getSMSCode: config.mockInterfaceUrls + '/getSMSCode', // 获取验证码
  //websocket
  webSocket: config.mockWebSocketInterfaceUrls + '/equipmentWebSocket', // 2.5.	WebScoket
  // 区域模块
  areaSelectDeviceAreaByUserId: config.mockInterfaceUrls + '/area/selectDeviceAreaByUserId', //2.1.0. 获取区域
  selectAreaByUserId: config.mockInterfaceUrls + '/area/selectAreaByUserId', // 2.7.	获取地图的点
  // 设备模块
  getDeviceByareaID: config.mockInterfaceUrls + '/device/getDeviceByareaID', // 2.2.	列表设备
  getDeviceBydevId: config.mockInterfaceUrls + '/device/getDeviceBydevId', // 2.3.	获取设备id
  changeValue: config.mockInterfaceUrls + '/device/changeValue', // 2.4.	控制设备
  deviceSelectByMap: config.mockInterfaceUrls + '/device/selectByMap', // 2.8.	查询设备列表
  deviceUpdate: config.mockInterfaceUrls + '/device/update', // 更新设备信息
  deviceUpdateList: config.mockInterfaceUrls + '/device/updateList', // 更新设备维保年限
  updateDevice: config.mockInterfaceUrls + '/device/updateDevice', // 更新设备信息
  //工单模块
  workSelectByMap: config.mockInterfaceUrls + '/workOrder/selectByMap', // 2.8.	活动工单
  workGetByKid: config.mockInterfaceUrls + '/workOrder/getByKid', // 2.8.	活动工单
  getAll: config.mockInterfaceUrls + '/typeWorkOrder/getAll', // 2.9.	工单类型
  upload: config.mockInterfaceUrls + '/wpFileImage/upload', // 3.0. 上传图片
  fileDownloadF: config.mockInterfaceUrls + '/wpFileImage/f', // 3.1. 获取图片
  add: config.mockInterfaceUrls + '/workOrder/add', // 3.2. 保存
  userSelectByMap: config.mockInterfaceUrls + '/users/selectByMap', // 3.3. 查询公司人员
  wpImageSelectByMap: config.mockInterfaceUrls + '/wpFileImage/selectByMap', // 3.3. 获取图片信息
  workOrderUpdate: config.mockInterfaceUrls + '/workOrder/update', // 3.3. 更新图片
  revokeWorkOrder: config.mockInterfaceUrls + '/workOrder/revokeWorkOrder', // 3.3. 撤销
  //告警模块
  warnmsgSelectByMap: config.mockInterfaceUrls + '/warnmsg/selectByMap', // 3.4. 设备告警信息接口
  warnmsgUpdate: config.mockInterfaceUrls + '/warnmsg/update', // 3.5. 修改告警信息接口
  warmGetByKid: config.mockInterfaceUrls + '/warnmsg/getByKid', // 3.6. 设备信息接口
  //巡检模块
  checkRecordAdd: config.mockInterfaceUrls + '/checkRecord/add', //4.1.增加巡检记录
  checkRecordSelectByMap: config.mockInterfaceUrls + '/checkRecord/selectByMap', //4.2.巡检记录查询
  checkGetById: config.mockInterfaceUrls + '/checkRecord/getById', //4.3.巡检详情
  checkPlanSelectBy: config.mockInterfaceUrls + '/checkPlan/selectCPByDevId', //4.3.巡检计划


  getDeviceBydevIdUsingGET: config.mockInterfaceUrls + '/device/updateAndSendMessage' //启用


}