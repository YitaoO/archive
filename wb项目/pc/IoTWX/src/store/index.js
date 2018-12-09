import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    // 用户数据
    userInfo: {},
    // 主菜单
    mainMenu: [],
    // 侧边菜单
    navbarMenu: [],
    // 实时情况tab
    indexStateTabIndex: 0,
    // webSocket状态
    websocketOn: false,
    // 按钮权限
    promise: {},
    // 权限模块   3 首页 4 日常管理 5 统计报表 6 设置
    treeDate3: [],
    treeDate4: [],
    treeDate5: [],
    treeDate6: []
  },
  mutations: {
    setTreeDate3 (state, value) {
      state.treeDate3 = value
    },
    setTreeDate4 (state, value) {
      state.treeDate4 = value
    },
    setTreeDate5 (state, value) {
      state.treeDate5 = value
    },
    setTreeDate6 (state, value) {
      state.treeDate6 = value
    },
    setPromise (state, value) {
      state.promise = value
    }
  }
})

export default store
