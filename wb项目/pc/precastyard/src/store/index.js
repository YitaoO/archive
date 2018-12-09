/**
 * 状态管理模式
 * 注:不能直接改变状态(store.state.count),需要通过mutation方式
 */
import "babel-polyfill" //兼容IE
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    pageWidth: 0
  },
  mutations: {
    UPDATE_PageWidth: (state, params) => {
      state.pageWidth = params
    }
  }
})
export default store
