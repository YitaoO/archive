<!-- 这是主页模块 -->
<template>
<div id="home">
  <el-container class="home-wrap">
    <!-- 头部菜单 -->
    <el-header class="home-header">
      <Header :mainMenu="mainMenu"></Header>
    </el-header>
    <el-container class="content">
      <!-- 侧边导航栏 -->
      <Navbar></Navbar>
      <el-main class="elmain">
        <!-- 主要内容 -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>

</div>
</template>

<script>
import {
  renderMenuData
} from '@/components/Datas/renderMenu.js'
import Header from "../Common/header.vue"; //左边tab
import Navbar from "../Common/navbar.vue"; //头部tab
export default {
  name: "Home",
  components: {
    Header,
    Navbar
  },
  data() {
    return {
      mainMenu: []
    }
  },
  created() {
    this.initMenu()

  },
  methods: {
    //初始化菜单
    initMenu() {
      let that = this
      if (that.$store.state.mainMenu.length != 0) {
        that.mainMenu = that.$store.state.mainMenu
      } else {
        renderMenuData(that, 0).then(function(datas) {
          that.mainMenu = datas
          that.$store.state.mainMenu = datas
        })
      }
    }

  }

};
</script>

<style rel="stylesheet/scss" lang="scss">
#home {
    height: 100%;
}
.home-wrap {
    height: 100%;
}
.home-header {
    height: 50px !important;
    line-height: 50px !important;
    box-shadow: 0 2px 10px 0 rgba(92, 92, 92, 0.1);
    // border: solid 1px #dcdfe1;
    background: #1faa7c;
}
</style>
