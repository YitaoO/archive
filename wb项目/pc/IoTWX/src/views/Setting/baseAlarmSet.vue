<template>
<div class="first">
  <el-row>
    <el-col :span="24" class="tempcol2">
      <div class="search">
        <el-input @keyup.enter.native="handleSearch()" placeholder="请输入告警等级..." v-model="searchCondition.searchName">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch()"></el-button>
        </el-input>
        <el-button v-if="!!btnPromise" @click="handleAdd" icon="el-icon-setting">添加告警</el-button>
      </div>
    </el-col>
  </el-row>
  <el-row class="history" style="margin-top:10px;">
    <el-table :data="list" height="100%">
      <el-table-column type="index" label="序号" :index="indexMethod" width="100"></el-table-column>
      <el-table-column prop="typeName" label="告警等级" min-width="100">
        <template slot-scope="scope">
            <el-tag :type="scope.row.warnLevel | statusFilter()">{{scope.row.typeName}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="name" label="通知角色" min-width="120"></el-table-column>
      <el-table-column prop="pushWay" label="通知方式" min-width="120"></el-table-column>
      <el-table-column prop="interval" label="提醒频率" min-width="80">
        <template slot-scope="scope">
            {{scope.row.interval === 0 ? 1 : '每隔'+scope.row.interval+'分钟'}}
          </template>
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
  <dialogform :dialog.sync="showornot" :temp="temp" :isAdd="isAdd" :isReadonly="isReadonly"></dialogform>
</div>
</template>

<script>
import dialogform from '@/views/Setting/baseAlarmSetForm'
import commonmixins from '@/views/Setting/commonmixins'
import pagination from '@/components/Pagination/pagination'
export default {
  name: "baseAlarmSet",
  mixins: [commonmixins],
  components: {
    dialogform,
    pagination
  },
  data() {
    return {
      list: [],
      showornot: {
        show: false
      },
      searchCondition: {
        searchName: null
      },
      temp: {},
      isAdd: false,
      isReadonly: false,
      pageOption: {
        page: 1,
        limit: 10,
        total: 0
      },
      //按钮权限
      btnPromise: (this.$store.state.promise.update == undefined) ? false : this.$store.state.promise.update
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'primary',
        2: 'warning',
        3: 'danger'
      }
      return statusMap[status]
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
      var loading = this.$utils.loading(document.getElementsByClassName('first')[0]);
      this.searchCondition.page = this.pageOption.page
      this.searchCondition.limit = this.pageOption.limit
      this.$customAxios.get('warnSet/selectByMap', {
        params: this.searchCondition
      }).then(resq => {
        this.list = resq.data;
        this.pageOption.total = resq.total
        loading.close()
      }).catch(error => {
        loading.close()
      });
    },
    handleCommands(row, command){
      if(command === "delete"){
        this.handleDelete(row);
      }
    },
    handleAdd() {
      this.isAdd = true;
      this.isReadonly = false
      this.temp = {
        warnLevel: null,
        typeName: '',
        types: [],
        roleIds: '',
        name: '',
        compId: this.$cookies.getJSON('userInfo').compId
      }
      this.showornot.show = true;
    },
    handleUpdate(row, isUpdate) {
      this.isAdd = false;
      this.$customAxios.get('warnSet/getByKid', {
        params: {
          kid: row.kid
        }
      }).then(resq => {
        if (!this.$utils.isNull(resq.roleId)) {
          resq.types = [resq.roleId];
          resq.roleIds = resq.roleId + '';
        } else resq.types = [];
        this.temp = resq;
        this.isReadonly = isUpdate?false:true
        this.showornot.show = true;
      }).catch(error => {});
    },
    handleDelete(row) {
      this.$confirm('确定删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$customAxios.post('warnSet/delete', {
          compId: this.$cookies.getJSON('userInfo').compId,
          kid: row.kid,
        }).then(result => {
          if (result === 1) {
            this.getList();
          }
        }).catch(error => {});
      }).catch(() => {});
    },
    // changeWarnLevel(){
    //   this.pageOption.page = 1
    //   if(this.$utils.isNull(this.searchCondition.warnLevel)){
    //     this.searchCondition.warnLevel = null;
    //   }
    //   this.getList();
    // }
  }
}
</script>

<style lang="scss">
</style>
