/**
 * 登陆入口
 */
import Vue from 'vue'
import Cookies from 'js-cookie';
import CustomAxios from '../../components/Tools/customAxios'
import ElementUI from 'element-ui' // TODO: 这里全局引入会有冗余，后期设置成按需引入
import Login from './login'


Vue.use(ElementUI);
Vue.prototype.$ele = ElementUI
Vue.prototype.$customAxios = CustomAxios; // axios请求
Vue.prototype.$cookies = Cookies; // jsCookies

Vue.use(ElementUI)

const loginVue = new Vue({
  el: '#login',
  // router,
  components: {
    Login
  }
})