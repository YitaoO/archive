<template>
  <div>
    <el-dialog class="personManagementForm" :title="title" :visible.sync="dialog.show" @open="getDictionary" 
      :before-close='callOf' :close-on-click-modal="false">
      <el-form :model="temp" :rules="rules" ref="personManagementForm" label-position="right" label-width="100px">
        <el-form-item label="ID" prop="userId"><el-input v-model="temp.userId" readonly/></el-form-item>
        <el-form-item label="姓名" prop="name"><el-input v-model="temp.name" :readonly="isReadonly"/></el-form-item>
        <el-form-item label="手机号" prop="telephone"><el-input v-model="temp.telephone" :readonly="isReadonly"/></el-form-item>
        <el-form-item label="系统角色" prop="roleId" style="border-bottom:1px solid #f5f8fa;padding-bottom:28px;margin-bottom:0;">
          <el-select v-model="temp.roleId" class="elselection" filterable clearable :disabled="isReadonly">
            <el-option v-for="item in roleList" :key="item.roleId" :label="item.name" :value="item.roleId" :disabled="item.type===0">
              <span class="selectOption" :style="'display: block;color:#333333;padding-bottom:3px;margin-left:'+(item.depth*20)+'px;'">
                <i class="icon-left icon icon-setting-group" v-if="item.type===0"></i>
                <i class="icon-left icon icon-setting-person" v-else></i>
                {{ item.name }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="passwordInput" style="margin-top:19px;">
          <el-input type="password" v-model="temp.passwordInput" :readonly="isReadonly" />
        </el-form-item>
        <el-form-item label="确认密码" prop="password" style="border-bottom:1px solid #f5f8fa;padding-bottom:28px;margin-bottom:0;">
          <el-input type="password" v-model="temp.password" :readonly="isReadonly" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="save" type="primary" v-if="!isReadonly">保存</el-button>
        <el-button @click="callOf">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import baseDeviceSetmixins from '@/views/Setting/baseDeviceSetmixins'
import md5 from 'md5'
export default {
  mixins: [baseDeviceSetmixins],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change'},
          { max: 20, message: '至多 20 个字符', trigger: 'change' }],
        telephone: [
          { required: true, message: '请输入联系电话', trigger: 'change'},
          { max: 20, message: '至多 20 个字符', trigger: 'change' },
          { validator: this.$utils.newMobile('请输入正确的联系电话'), trigger: 'change' }],
        roleId: [{ type: 'number', required: true, message: '请选择系统角色', trigger: 'change'}],
        passwordInput: [
          { required: true, message: '请输入密码', trigger: 'change'},
          { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'change' }],
        password: [
          { required: true, message: '请输入确认密码', trigger: 'change'},
          { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'change' }],
      },
      passwordDemo: ''
    };
  },
  methods: {
    getDictionary(){
      this.getRoleList();
      this.passwordDemo = this.temp.password;
    },
    save() {
      this.$refs.personManagementForm.validate((valid) => {
        if (valid) {
          var temp2 = Object.assign({}, this.temp)
          if(temp2.passwordInput !== temp2.password){
            this.$notify.error({
              title: "提示",
              message: `请重新确认密码`
            });
            return
          }
          if(this.passwordDemo !== temp2.password){
            temp2.password = md5(temp2.password);
          }
          var loading = this.$utils.loading(document.getElementsByClassName('personManagementForm')[0]);
          let url = 'users/add';
          if (!this.isAdd) url = 'users/update';
          this.$customAxios.post(url, temp2).then(resq => {
            this.callOf();
            this.$parent.getList();
            loading.close()
          }).catch(error => {
            loading.close()
          });
        }
      });
    },
    callOf() {
      this.dialog.show=false;
      this.$refs.personManagementForm.clearValidate();
    },
  },
  props: {
    dialog: {
      type: Object
    },
    temp: {
      type: Object
    },
    isAdd: {
      type: Boolean
    },
    title: {
      type: String
    },
    isReadonly: {
      type: Boolean,
      default: false
    }
  },
};
</script>
<style lang="scss">
</style>