<template>
<div class="first">
  <el-row>
    <el-col :span="24" class="tempcol2">
      <div class="search">
        <el-input @keyup.enter.native="handleSearch()" placeholder="请输入姓名..." v-model="searchCondition.key_userName">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch()"></el-button>
        </el-input>
        <el-button v-if="!!btnPromise" @click="handleAdd" icon="el-icon-setting">添加人员</el-button>
        <el-dropdown @command="handleCommand">
          <el-button type="primary">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="highsearch">高级搜索</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
  <el-row v-if="isHiddenSearch" class="tempcol3">
    <el-form :model="searchCondition" label-width="90px">
      <el-row style="margin-bottom:10px;">
        <el-col :span="12">
          <el-form-item label="ID">
            <el-input v-model="searchCondition.key_userId" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input v-model="searchCondition.key_telephone" /></el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="系统角色">
            <el-input v-model="searchCondition.key_roleName" /></el-form-item>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-button type="success" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button type="success" icon="el-icon-refresh" @click="handleReset">重置</el-button>
          <el-button type="success" icon="el-icon-close" @click="handleClose">关闭</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
  <el-row class="history" style="margin-top:10px;">
    <el-table :data="list" height="100%">
      <el-table-column type="index" label="序号" :index="indexMethod" width="100"></el-table-column>
      <el-table-column prop="userId" label="ID" min-width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="120"></el-table-column>
      <el-table-column prop="telephone" label="联系电话" min-width="120"></el-table-column>
      <el-table-column prop="roleName" label="系统角色" min-width="120"></el-table-column>
      <el-table-column label="系统管理员" min-width="120" align="center">
        <template slot-scope="scope">{{ scope.row.admin===true?'是':'否' }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="handleUpdate(scope.row, false)" class="handleButton">查看</el-button>
          <span v-if="!!btnPromise">
            <el-button type="text" @click="handleUpdate(scope.row, true)" class="handleButton">编辑</el-button>
            <el-dropdown @command="handleCommands(scope.row, $event)">
              <el-button type="primary">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <el-row>
    <pagination :child-option="pageOption"></pagination>
  </el-row>
  <dialogform :dialog.sync="showornot" :temp="temp" :isAdd="isAdd" :title="title" :isReadonly="isReadonly"></dialogform>
</div>
</template>

<script>
import dialogform from '@/views/Setting/personManagementForm'
import commonmixins from '@/views/Setting/commonmixins'
import pagination from '@/components/Pagination/pagination'
export default {
  name: "personManagement",
  mixins: [commonmixins],
  components: {
    dialogform,
    pagination
  },
  data() {
    return {
      searchCondition: {
        key_userName: '',
        key_userId: null,
        key_telephone: '',
        key_roleName: ''
      },
      pageOption: {
        page: 1,
        limit: 10,
        total: 0
      },
      //按钮权限
      btnPromise: (this.$store.state.promise.update == undefined) ? false : this.$store.state.promise.update
    }
  },
  watch: {
    isHiddenSearch: function(val) {
      var items = document.querySelectorAll('.first .history');
      if (!val) {
        items[0].style.height = 'calc(100% - 81px - 61px)'
      } else {
        items[0].style.height = 'calc(100% - 192px - 61px)'
      }
    }
  },
  destroyed() {
    this.$bus.$off('paginationChange');
  },
  mounted() {
    this.getList();
    // 监听分页组件
    this.$bus.$on('paginationChange', page => {
      this.pageOption.page = page
      this.getList()
    })
  },
  methods: {
    getList() {
      var loading = this.$utils.loading(document.getElementsByClassName('first')[1] || document.getElementsByClassName('first')[0]);
      this.searchCondition.page = this.pageOption.page
      this.searchCondition.limit = this.pageOption.limit
      this.$customAxios.get('users/selectByMap', {
        params: this.searchCondition
      }).then(resq => {
        this.list = resq.data;
        this.pageOption.total = resq.total
        loading.close()
      }).catch(error => {
        loading.close()
      });
    },
    handleAdd() {
      this.isAdd = true;
      this.isReadonly = false;
      this.title = '添加人员信息';
      this.$customAxios.get('users/getNextKey').then(resq => {
        this.temp = {
          userId: resq,
          name: '',
          telephone: '',
          roleId: null,
          passwordInput: '',
          password: '',
          state: 1,
          compId: this.$cookies.getJSON('userInfo').compId,
          addDate: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          isDel: 0,
          addUserId: this.$cookies.getJSON('userInfo').UserID,
          addUserName: this.$cookies.getJSON('userInfo').name
        }
        this.showornot.show = true;
      }).catch(error => {});
    },
    handleUpdate(row, isUpdate) {
      this.isAdd = false;
      this.title = `${!!isUpdate?'编辑':'查看'}${row.name}人员信息`;
      this.$customAxios.get('users/getByMap', {
        params: {
          userId: row.userId,
          compId: this.$cookies.getJSON('userInfo').compId
        }
      }).then(resq => {
        resq.passwordInput = resq.password;
        this.temp = resq;
        this.isReadonly = isUpdate ? false : true,
          this.showornot.show = true;
      }).catch(error => {});
    },
    handleCommands(row, command) {
      if (command === "delete") {
        this.handleDelete(row);
      }
    },
    handleDelete(row) {
      if(!row.admin){
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$customAxios.post('users/delete', {
            userId: row.userId,
            isDel: 1,
            delDate: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            delUserId: this.$cookies.getJSON('userInfo').UserID,
            delUserName: this.$cookies.getJSON('userInfo').name
          }).then(result => {
            if (result === 1) {
              this.getList();
            }
          }).catch(error => {});
        }).catch(() => {});
      }else{
        this.$notify.error({
          title: "提示",
          message: `该人员为系统管理员，不可删除！`
        });
      }
    },
    handleReset() {
      this.searchCondition.key_userName = ''
      this.searchCondition.key_userId = null
      this.searchCondition.key_telephone = ''
      this.searchCondition.key_roleName = ''
    },
  }
}
</script>

<style lang="scss">
</style>
