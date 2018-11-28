/**
 * 封装axios
 */
import axios from "axios";
import jsCookie from "js-cookie";
import { Notification } from "element-ui";
import Utils from "./utils";
// 创建axios实例
const customAxios = axios.create({
  timeout: 12000, // 请求超时时间
  withCredentials: true, // 允许携带cookie
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  }
});

if (process.env.NODE_ENV !== "development") {
  // 这里开发环境因为要跨域，所以开发环境不用这个配置,后期看下可以优化吗
  let url = window.location.href;
  let index =
    url.indexOf("login") > 0 ? url.indexOf("login") : url.indexOf("index");
  let baseUrl = url.slice(0, index);
  customAxios.defaults.baseURL = `${baseUrl}equipment/`;
}

// 返回拦截器(错误统一在这里处理，不在页面处理)
customAxios.interceptors.response.use(
  response => {
    const data = response.data;
    // 根据返回的code值来做不同的处理（和后端约定）
    switch (data.code) {
      case "0": // 请求成功
        return data.data;
      case "-1": // 请求失败
        Notification.error({
          title: "错误",
          message: `${data.message}`
        });
        return Promise.reject(response);
      case "-0001": // 修改密码失败，旧密码错误
        Notification.error({
          title: "错误",
          message: `旧密码错误,请重新输入旧密码`
        });
        return Promise.reject(response);
      case "1000": // 用户未绑定
        Notification.error({
          title: "错误",
          message: `用户未绑定`
        });
        return Promise.reject(response);
      case "0003": // 登陆时间过长
        Notification.error({
          title: "错误",
          message: `${data.message}`
        });
        window.location.href = "./login.html";
        break;
      default:
    }
  },
  err => {
    // 这里是返回状态码不为200时候的错误处理
    var message = "";
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          message = "请求错误";
          break;

        case 401:
          message = "未授权，请登录";
          break;

        case 403:
          message = "拒绝访问";
          break;

        case 404:
          message = `请求地址出错: ${err.response.config.url}`;
          break;

        case 408:
          message = "请求超时";
          break;

        case 500:
          message = "服务器内部错误";
          break;

        case 501:
          message = "服务未实现";
          break;

        case 502:
          message = "网关错误";
          break;

        case 503:
          message = "服务不可用";
          break;

        case 504:
          message = "网关超时";
          break;

        case 505:
          message = "HTTP版本不受支持";
          break;

        default:
      }
    }

    Notification.error({
      title: "错误",
      message: `${message}`
    });
    return Promise.reject(message);
  }
);

// 请求的拦截器
customAxios.interceptors.request.use(
  function(config) {
    // 判断请求的类型
    // 如果是post请求就把默认参数拼到data里面
    // 如果是get请求就拼到params里面
    if (config.method === "post") {
      config.data = {
        compId:
          jsCookie.getJSON("userInfo") === undefined
            ? ""
            : jsCookie.getJSON("userInfo").compId,
        ...config.data
      };
    } else if (config.method === "get") {
      config.params = {
        compId:
          jsCookie.getJSON("userInfo") === undefined
            ? ""
            : jsCookie.getJSON("userInfo").compId,
        ...config.params
      };
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default customAxios;
