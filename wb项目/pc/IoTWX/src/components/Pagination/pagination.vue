<!-- 组件 - 分页 -->
<template>
<div id="pagination">
  <el-pagination 
  background 
  @current-change="handleCurrentChange" 
  :page-size="childOption.limit" 
  layout="total, prev, pager, next, jumper" 
  :total="childOption.total" 
  :current-page="childOption.page">
  </el-pagination>
</div>
</template>

<script>
export default {
  props: {
    childOption: Object
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    // 页码改变
    handleCurrentChange(val) {
      this.$bus.$emit('paginationChange', val);
    }
  }
}
</script>
<style>

</style>
