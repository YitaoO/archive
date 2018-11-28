import Vue from "vue";
import router from "@/router";
import store from "@/store";
import Cookies from "js-cookie";
import Echarts from "echarts";
import CustomAxios from "@/components/Tools/customAxios";
import Utils from "@/components/Tools/utils";
import Interface from "@/components/Tools/interface";
import Moment from "moment";
import ElementUI from "element-ui"; // TODO: 这里全局引入会有冗余，后期设置成按需引入
import "@/components/Tools/jsPrototype"; //添加js对象方法

import Index from "./index";

let Bus = new Vue();

Vue.use(ElementUI);
Vue.prototype.$ele = ElementUI;
Vue.prototype.$customAxios = CustomAxios; // axios请求
Vue.prototype.$cookies = Cookies; // jsCookies
Vue.prototype.$bus = Bus; // 组件通信
Vue.prototype.$echarts = Echarts; // echarts
Vue.prototype.$utils = Utils; // 工具类方法
Vue.prototype.$interface = Interface; // 接口地址
Vue.prototype.$moment = Moment; // 时间转换插件

const indexVue = new Vue({
  el: "#app",
  router,
  store,
  created() {
    this.checkLogin();
  },
  components: {
    Index
  },
  methods: {
    // 登录验证
    checkLogin() {
      let account = this.$cookies.get("account");
      let password = this.$cookies.get("password");
      if (account != undefined && password != undefined) {
        //缓存
        this.$customAxios
          .post("login2", {
            account: account,
            password: password
          })
          .then(resq => {})
          .catch(error => {
            window.location.href = "./login.html";
          });
      } else {
        window.location.href = "./login.html";
      }
    }
  }
});
