<template>
  <div>
    <el-dialog class="rolePermissionForm" :title="title" :visible.sync="dialog.show" @open="getDictionary" 
      :before-close='callOf' :close-on-click-modal="false">
      <el-form :model="temp" :rules="rules" ref="rolePermissionForm" label-position="right" label-width="86px">
        <el-form-item  label="名称" prop="name"><el-input v-model="temp.name" :readonly="isReadonly"/></el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="temp.type" @change="changeType" :disabled="isReadonly">
            <el-radio :label="0">分组</el-radio>
            <el-radio :label="1">角色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上级分组" prop="parent">
          <el-select v-model="temp.parent" class="elselection" filterable clearable :disabled="isReadonly">
            <el-option v-for="item in roleList" :key="item.roleId" :label="item.name" :value="item.roleId" :disabled="item.type===1">
              <span class="selectOption" :style="'display: block;color:#333333;padding-bottom:3px;margin-left:'+(item.depth*20)+'px;'">
                <i class="icon-left icon icon-setting-group" v-if="item.type===0"></i>
                <i class="icon-left icon icon-setting-person" v-else></i>
                {{ item.name }}
              </span>
            </el-option>
          </el-select>
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
export default {
  mixins: [baseDeviceSetmixins],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'change'},
          { max: 20, message: '至多 20 个字符', trigger: 'change' }],
        type: [{ type: 'number', required: true, message: '请选择类型', trigger: 'change'}]
      },
    };
  },
  methods: {
    getDictionary(){
      this.getRoleList(0);
    },
    changeType(label){
      this.temp.parent = null;
      this.$refs.rolePermissionForm.clearValidate()
      if(label===0){ // 分组
        this.rules = {
          name: [
            { required: true, message: '请输入名称', trigger: 'change'},
            { max: 20, message: '至多 20 个字符', trigger: 'change' }],
          type: [{ type: 'number', required: true, message: '请选择类型', trigger: 'change'}]
        }
      }else{
        this.rules = {
          name: [
            { required: true, message: '请输入名称', trigger: 'change'},
            { max: 20, message: '至多 20 个字符', trigger: 'change' }],
          type: [{ type: 'number', required: true, message: '请选择类型', trigger: 'change'}],
          parent: [{ type: 'number', required: true, message: '请选择上级分组', trigger: 'change,blur'}]
        }
      }
    },
    save() {
       this.$refs.rolePermissionForm.validate((valid) => {
        if (valid) {
          var temp2 = Object.assign({}, this.temp)
          if(this.$utils.isNull(temp2.parent)){
            temp2.parent = 0;
          }
          if(temp2.roleId === temp2.parent){
            this.$notify.error({
              title: "提示",
              message: `上级分组不能选择${temp2.name}`
            });
            return;
          }
          var loading = this.$utils.loading(document.getElementsByClassName('rolePermissionForm')[0]);
          let url = 'role/add';
          if (!this.isAdd) url = 'role/update';
          this.$customAxios.post(url, temp2).then(resq => {
            this.callOf();
            this.$bus.$emit('addRole', null); // 保存成功后，编辑和删除按钮不能点击
            this.$bus.$emit('getTreeData2'); // 刷新角色树
            this.$bus.$emit('getTreeData3', []); // 清空所有模块树
            this.$bus.$emit('getTreeData4', []);
            this.$bus.$emit('getTreeData5', []);
            this.$bus.$emit('getTreeData6', []);
            loading.close()
          }).catch(error => {
            loading.close()
          });
        }
      });
    },
    callOf() {
      this.dialog.show=false;
      this.$refs.rolePermissionForm.resetFields();
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