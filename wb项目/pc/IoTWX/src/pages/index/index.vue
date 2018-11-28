<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style rel="stylesheet/scss" lang="scss">
// 清除默认样式
@import '../../css/reset.scss';
// elem样式
@import '../../css/element-variables.scss';
// 引用通用样式
@import '../../css/common.scss';
// 统计报表的样式
@import '../../views/Report/reportCommon.scss';
</style>
