/**
 * api列表
 */
import { stringify } from "qs";
import request from "./request";
const mockBaseUrl =
  "https://www.easy-mock.com/mock/5ba99eeab9b3b431f78ef57b/www.weibai.com/api";
const localUrl = "http://192.168.1.94:9020/portal-car/api";
const localUrl1 = "http://192.168.1.14:8082/portal-car/api";
const proUrl = "https://www.weepal.cn/portal-car/api";
const proUrl1 = "https://car.weepal.net/car/api";
const baseUrl = localUrl1;

// 绑定
export async function reqWeixinAdd(params) {
  return request({
    url: `${baseUrl}/usersweixinadd`,
    data: params,
    method: "POST"
  });
}
// 解绑
export async function reqOutAdd(params) {
  return request({
    url: `${baseUrl}/usersweixindelbykid`,
    data: params,
    method: "POST"
  });
}
// 登录
export async function reqLogin(params) {
  return request(
    {
      url: `${baseUrl}/login?openID=${params.openID}&weixin=${
        params.weixin
      }&act=10`,
      // data: params,
      method: "POST"
    },
    true
  );
}
//查询车辆最新状态接口
export async function reqCarStateList(params) {
  return request({
    url: `${baseUrl}/gpsdevicebuffers/getCarLastStateBySimNo?userId=${
      params.UserId
    }&mapType=2`,
    method: "GET"
  });
}
//获取车辆树
export async function reqListTreeCar(url, params) {
  return request({
    url: `${baseUrl}${url}?${stringify(params)}`,
    method: "POST",
    data: params
  });
}
// 获取设备树
export async function reqListTreeProject(url, params) {
  return request({
    url: `${baseUrl}${url}?${stringify(params)}`,
    method: "GET"
  });
}
// 获取项目类型
export async function reqListProjetType(url, params) {
  return request({
    url: `${baseUrl}${url}?${stringify(params)}`,
    method: "POST",
    data: params
  });
}
//行驶统计接口
export async function reqCarAccInfo(params) {
  return request({
    url: `${baseUrl}/carproj/getCarAccInfoByUserIdForWeiXin?${stringify(
      params
    )}`,
    method: "GET"
  });
}
//轨迹详情接口
export async function reqCarTrance(params) {
  return request({
    url: `${baseUrl}/gpsdevicebuffers/getCarGuiJiBySimNoTime?${stringify(
      params
    )}`,
    method: "GET"
  });
}
// 搜索数据
export async function reqSearch(url, params) {
  return request({
    url: `${baseUrl}${url}?${stringify(params)}`,
    method: "GET"
  });
}
// 行驶详情
export async function reqCarAccTranceDetail(params) {
  return request({
    url: `${baseUrl}/carproj/getCarAccInfoByUserIdDetail?${stringify(params)}`,
    method: "GET"
  });
}
// 燃油洒水详情
export async function reqStatisticsDetail(url, params) {
  return request({
    url: `${baseUrl}${url}?${stringify(params)}`,
    method: "GET"
  });
}
// 首页统计
export async function reqStatistics(url, params) {
  return request({
    url: `${baseUrl}${url}?${stringify(params)}`,
    method: "GET"
  });
}
// 使用率统计
export async function reqCarUseEffic(url, params) {
  return request({
    url: `${baseUrl}${url}?${stringify(params)}`,
    method: "GET"
  });
}

export default baseUrl;
