<template>
  <div>
    <el-dialog class="companyManagementForm"  :title="title" :visible.sync="dialog.show" @open="getDictionary" 
      :before-close='callOf' :close-on-click-modal="false">
      <el-form class="company-form" :model="temp" :rules="rules" :disabled="!!isReadonly" ref="companyManagementForm" label-position="right" label-width="100px">
        <el-form-item label="公司名称" prop="compName"><el-input v-model="temp.compName" /></el-form-item>
        <el-form-item label="所在位置" prop="location">
         <el-input v-model="temp.location"/>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId"><el-input v-model="temp.userId" readonly/></el-form-item>
        <el-form-item label="姓名" prop="userName"><el-input v-model="temp.userName" :readonly="isReadonly"/></el-form-item>
        <el-form-item label="手机号" prop="telephone"><el-input v-model="temp.telephone" :readonly="isReadonly"/></el-form-item>
        <el-form-item label="系统角色" prop="roleName" style="margin-bottom:0;">
         <el-input value="系统管理员" v-model="temp.roleName" />
        </el-form-item>
         
        <el-form-item label="密码" prop="passwordInput" style="margin-top:19px;">
          <el-input type="password" v-model="temp.passwordInput" :readonly="isReadonly" />
        </el-form-item>
        <el-form-item label="确认密码" prop="password" style="border-bottom:1px solid #f5f8fa;padding-bottom:22px;margin-bottom:0;">
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
import baseDeviceSetmixins from "@/views/Setting/baseDeviceSetmixins";
import md5 from "md5";
export default {
  mixins: [baseDeviceSetmixins],
  data() {
    return {
      rules: {
        compName: [
          { required: true, message: "请输入公司名称", trigger: "change" },
          { max: 20, message: "至多 20 个字符", trigger: "change" }
        ],
        userName: [
          { required: true, message: "请输入姓名", trigger: "change" },
          { max: 20, message: "至多 20 个字符", trigger: "change" }
        ],
        roleName: [
          { required: true, message: "请输入系统角色", trigger: "change" },
          { max: 20, message: "至多 20 个字符", trigger: "change" }
        ],
        telephone: [
          { required: true, message: "请输入联系电话", trigger: "change" },
          { max: 20, message: "至多 20 个字符", trigger: "change" },
          {
            validator: this.$utils.newMobile("请输入正确的联系电话"),
            trigger: "change"
          }
        ],
        passwordInput: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 32,
            message: "长度在 6 到 32 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入确认密码", trigger: "change" },
          {
            min: 6,
            max: 32,
            message: "长度在 6 到 32 个字符",
            trigger: "change"
          }
        ]
      },
      passwordDemo: ""
    };
  },
  methods: {
    getDictionary() {
      this.getRoleList();
      this.passwordDemo = this.temp.password;
    },
    save() {
      this.$refs.companyManagementForm.validate(valid => {
        if (valid) {
          var temp2 = Object.assign({}, this.temp);
          if (temp2.passwordInput !== temp2.password) {
            this.$notify.error({
              title: "提示",
              message: `请重新确认密码`
            });
            return;
          }
          if (this.passwordDemo !== temp2.password) {
            temp2.password = md5(temp2.password);
          }
          var loading = this.$utils.loading(
            document.getElementsByClassName("personManagementForm")[0]
          );
          let url = "company/addCompanyAndUser";
          if (!this.isAdd) url = "company/update";

          console.log(temp2);
          // return;

          this.$customAxios
            .post(url, temp2)
            .then(resq => {
              this.callOf();
              this.$parent.getList();
              loading.close();
            })
            .catch(error => {
              loading.close();
            });
        }
      });
    },
    callOf() {
      this.dialog.show = false;
      this.$refs.companyManagementForm.clearValidate();
    }
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
  }
};
</script>
<style lang="scss">
.company-form {
  .el-form-item {
    margin-bottom: 17px !important;
  }
}
.companyManagementForm {
  .el-dialog__body {
    padding: 30px 20px 0px 20px !important;
  }
}
</style>