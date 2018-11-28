<template>
<div class="rolePermission">
  <el-row>
    <el-col :span="24" class="tempcol2">
      <div class="search" v-if="!!btnPromise">
        <el-button @click="handleAdd" icon="el-icon-setting">添加角色</el-button>
        <!-- <span class="rolePermissionButton"> -->
        <el-button @click="handleUpdate(false)" icon="el-icon-document">查看</el-button>
        <el-button @click="handleUpdate(true)" icon="el-icon-edit">编辑</el-button>
        <el-button @click="handleDelete" icon="el-icon-delete">删除</el-button>
        <!-- <el-button @click="onSubmit" icon="el-icon-circle-plus-outline">保存</el-button> -->
        <!-- </span> -->
      </div>
    </el-col>
  </el-row>
  <el-row class="elrow">
    <el-col :span="6" style="height:100%;" v-if="showtree">
      <Tree :type="2"></Tree>
    </el-col>
    <el-col :span="18" style="height: 100%;overflow:auto;">
      <el-row>
        <el-col :span="12">
          <el-row :span="12">
            <settree :type="3" moduletree="moduletree3"></settree>
          </el-row>
          <el-row :span="12">
            <settree :type="6" moduletree="moduletree6"></settree>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row :span="12">
            <settree :type="4" moduletree="moduletree4"></settree>
          </el-row>
          <el-row :span="12">
            <settree :type="5" moduletree="moduletree5"></settree>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <dialogform :dialog.sync="showornot" :temp="temp" :isAdd="isAdd" :title="title" :isReadonly="isReadonly"></dialogform>
</div>
</template>

<script>
// 通用组件  - 树形结构
import Tree from '../Common/tree.vue'
import baseDeviceSetmixins from '@/views/Setting/baseDeviceSetmixins'
import settree from '@/views/Setting/settingtree'
import dialogform from '@/views/Setting/rolePermissionForm'
export default {
  name: "rolePermission",
  mixins: [baseDeviceSetmixins],
  components: {
    Tree,
    settree,
    dialogform
  },
  data() {
    return {
      list: [],
      temp: {},
      title: '',
      showtree: true,
      data: null,
      isAdd: false,
      isReadonly: false,
      showornot: {
        show: false
      },
      arr3: [],
      arr4: [],
      arr5: [],
      arr6: [],
      //按钮权限
      btnPromise: (this.$store.state.promise.update == undefined) ? false : this.$store.state.promise.update
    }
  },
  destroyed() {
    this.$bus.$off('getModuleData3');
    this.$bus.$off('getModuleData4');
    this.$bus.$off('getModuleData5');
    this.$bus.$off('getModuleData6');
  },
  created() {
    this.$bus.$on('addRole', data => this.data = data);
  },
  methods: {
    handleUpdate(isUpdate) {
      if (this.$utils.isNull(this.data) || this.$utils.isNull(this.data.roleId)) {
        this.$notify.error({
          title: "提示",
          message: `请先选择角色，再进行编辑操作`
        });
        return
      }
      this.$customAxios.get('role/getByRoleId', {
        params: {
          roleId: this.data.roleId
        }
      }).then(resq => {
        resq.parent = resq.parent === 0 ? null : resq.parent;
        this.temp = resq;
        this.isAdd = false;
        this.isReadonly = isUpdate ? false : true,
          this.title = `${!!isUpdate?'编辑':'查看'}${this.data.name}的角色信息`
        this.showornot.show = true;
      }).catch(error => {});
    },
    handleAdd() {
      this.isAdd = true;
      this.isReadonly = false
      this.title = '添加角色信息';
      this.temp = {
        compId: this.$cookies.getJSON('userInfo').compId,
        parent: null,
        name: '',
        type: 0,
      }
      this.showornot.show = true;
    },
    handleDelete() {
      if (this.$utils.isNull(this.data) || this.$utils.isNull(this.data.roleId)) {
        this.$notify.error({
          title: "提示",
          message: `请先选择角色，再进行删除操作`
        });
        return
      }
      this.$confirm('确定删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var loading = this.$utils.loading(document.getElementsByClassName('rolePermission')[0]);
        this.$customAxios.post('role/delete', {
          roleId: this.data.roleId
        }).then(result => {
          if (result === 1) {
            this.$bus.$emit('getTreeData3', []);
            this.$bus.$emit('getTreeData4', []);
            this.$bus.$emit('getTreeData5', []);
            this.$bus.$emit('getTreeData6', []);
            this.$bus.$emit('getTreeData2'); // 刷新角色树
            this.$bus.$emit('addRole', null);
          }
          loading.close()
        }).catch(error => loading.close());
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
.rolePermission {
    height: 100%;
    .elrow {
        height: calc(100% - 91px);
        margin-top: 10px;
        // .el-col {
        //   height: 100%;
        // }
    }
}
</style>
