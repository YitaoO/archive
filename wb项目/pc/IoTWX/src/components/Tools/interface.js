/**
 * 请求接口地址封装
 */

const Interface = {
  //登陆模块
  updateByTel: '/users/updateByTel', // 1.0. 录入信息
  login: '/login2', // 2.6.	登录
  getSMSCode: '/getSMSCode', // 获取验证码
  //websocket
  webSocket: '/equipmentWebSocket', // 2.5.	WebScoket
  // 区域模块
  areaSelectDeviceAreaByUserId: '/area/selectDeviceAreaByUserId', //2.1.0. 获取区域
  selectAreaByUserId: '/area/selectAreaByUserId', // 2.7.	获取地图的点
  // 设备模块
  getDeviceByareaID: '/device/getDeviceByareaID', // 2.2.	列表设备
  getDeviceBydevId: '/device/getDeviceBydevId', // 2.3.	获取设备id
  changeValue: '/device/changeValue', // 2.4.	控制设备
  deviceSelectByMap: '/device/selectByMap', // 2.8.	查询设备列表
  deviceUpdate: '/device/update', // 更新设备信息
  deviceUpdateList: '/device/updateList', // 更新设备维保年限
  updateDevice: '/device/updateDevice', // 更新设备信息
  //工单模块
  workSelectByMap: '/workOrder/selectByMap', // 2.8.	活动工单
  workGetByKid: '/workOrder/getByKid', // 2.8.	活动工单
  getAll: '/typeWorkOrder/getAll', // 2.9.	工单类型
  upload: '/wpFileImage/upload', // 3.0. 上传图片
  fileDownloadF: '/wpFileImage/f', // 3.1. 获取图片
  add: '/workOrder/add', // 3.2. 保存
  userSelectByMap: '/users/selectByMap', // 3.3. 查询公司人员
  wpImageSelectByMap: '/wpFileImage/selectByMap', // 3.3. 获取图片信息
  workOrderUpdate: '/workOrder/update', // 3.3. 更新图片
  //告警模块
  warnmsgSelectByMap: '/warnmsg/selectByMap', // 3.4. 设备告警信息接口
  warnmsgUpdate: '/warnmsg/update', // 3.5. 修改告警信息接口
  warmGetByKid: '/warnmsg/getByKid', // 3.6. 设备信息接口
  //巡检模块
  checkRecordAdd: '/checkRecord/add', //4.1.增加巡检记录
  checkRecordSelectByMap: '/checkRecord/selectByMap', //4.2.巡检记录查询
  checkGetById: '/checkRecord/getById', //4.3.巡检详情
  checkPlanSelectBy: '/checkPlan/selectCPByDevId', //4.3.巡检计划

}
export default Interface