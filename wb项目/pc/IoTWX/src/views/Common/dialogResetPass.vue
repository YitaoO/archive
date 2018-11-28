<!-- 组件 - 重置密码 -->
<template>
<div>
  <el-dialog class="" title="重置密码" v-loading="loading" :visible.sync="dialog.show" :before-close='callOf' :close-on-click-modal="false">
    <el-form ref="resetPassForm" label-position="right" label-width="86px">
      <el-form-item label="旧密码">
        <el-input class="input" v-model="oldPassword" type="password" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input class="input" v-model="newPassword" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input class="input" type="password" placeholder="请再次输入新密码" v-model="newPasswordAgain"></el-input>
      </el-form-item>


    </el-form>
    <span slot="footer">
        <el-button @click="save" type="primary">保存</el-button>
        <el-button @click="callOf">取消</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
import md5 from 'md5'
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
      loading: false
    };
  },
  methods: {
    save() {
      let that = this
      if (this.oldPassword === '') {
        that.$ele.Message({
          message: '旧密码不能为空,请重新输入!',
          type: 'error'
        });
        this.oldPassword = ''
        return;
      }
      if (this.newPassword === '') {
        this.$ele.Message({
          message: '新密码不能为空,请重试!',
          type: 'error'
        });
        return;
      }
      if (this.newPassword.length < 6 || this.newPassword.length > 23) {
        this.$ele.Message({
          message: '新密码长度范围在6-23,请重新输入新密码!',
          type: 'error'
        });
        this.newPassword = ''
        this.newPasswordAgain = ''
        return;
      }

      if (this.newPassword !== this.newPasswordAgain) {
        this.$ele.Message({
          message: '两次输入的新密码不一致,请重试!',
          type: 'error'
        });
        return;
      }
      this.loading = true
      this.$customAxios.post('equipmentUpdatePassword', {
        oldPassword: md5(this.oldPassword),
        newPassword: md5(this.newPassword)
      }).then(resq => {
        this.$ele.Notification({
          message: "修改密码成功",
          type: 'success'
        })
        this.callOf();
      }).catch(error => {
        this.loading = false
      });
    },
    callOf() {
      this.oldPassword = ''
      this.newPassword = ''
      this.newPasswordAgain = ''
      this.loading = false
      this.dialog.show = false;
    }
  },
  props: {
    dialog: {
      type: Object
    }
  }
};
</script>
<style lang="scss">
</style>
