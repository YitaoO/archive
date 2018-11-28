<!-- 组件 - 封装dialog -->
<template>
<el-dialog title="提示" :visible.sync="dialogOption.dialogShow" width="30%">
  <span>{{dialogOption.warmExplain}}</span>
  <span slot="footer" class="dialog-footer">
  <el-button @click="dialogOption.dialogShow = false">取 消</el-button>
  <el-button type="primary"  @click="submitConfirm()">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  /**
   * [props 参数配置说明]
   * @dialogShow {Object} 是否显示
   * @warmExplain {Object} 是否显示
   */

  props: {
    dialogOption: {
      type: Object
    },
  },
  data() {
    return {};
  },
  destroyed() {
    this.$bus.$off('dialogConfim');
  },
  created() {},
  methods: {

    // 确认监听,把控制权交给父组件
    submitConfirm() {

      this.dialogOption.dialogShow = false
      // let that = this
      this.$bus.$emit('dialogConfim', {})

    }
  }

};
</script>
<style lang="scss">

</style>
