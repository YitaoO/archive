<template>
<div class="first">
  <el-row>
    <el-col :span="24" class="tempcol2">
      <div class="search">
        <el-input @keyup.enter.native="handleHighSearch()" placeholder="请输入区域名称..." v-model="searchCondition.areaName">
          <el-button slot="append" icon="el-icon-search" @click="handleHighSearch()"></el-button>
        </el-input>
        <el-button v-if="!!btnPromise" @click="handleAdd" icon="el-icon-setting">添加区域</el-button>
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
    <el-form :model="searchCondition" label-width="150px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="区域管理人员">
            <el-input v-model="searchCondition.userNames" /></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="区域地址">
            <el-input v-model="searchCondition.location" /></el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: right;">
          <el-button type="success" icon="el-icon-search" @click="handleHighSearch">搜索</el-button>
          <el-button type="success" icon="el-icon-refresh" @click="handleReset">重置</el-button>
          <el-button type="success" icon="el-icon-close" @click="handleClose">关闭</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
  <el-row style="margin-top: 10px;" class="history">
    <tabletree :columns="columns" :tree-structure="true" :data-source="dataSource" :btnPromise="btnPromise"></tabletree>
  </el-row>
</div>
</template>

<script>
import tabletree from "@/views/Setting/baseAreaSetTabletree";
import commonmixins from '@/views/Setting/commonmixins'
export default {
  name: "baseAreaSet",
  mixins: [commonmixins],
  components: {
    tabletree
  },
  data() {
    return {
      searchCondition: {
        areaName: '',
        userNames: '',
        location: ''
      },
      dataSource: [],
      columns: [],
      isFirstEnter: false,
      //按钮权限
      btnPromise: false
    }
  },
  watch: {
    isHiddenSearch: function(val) {
      var items = document.querySelectorAll('.first .history');
      if (!val) {
        items[0].style.height = 'calc(100% - 81px)'
      } else {
        items[0].style.height = 'calc(100% - 142px)'
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == 'BaseAreaSetForm') {
      to.meta.isBack = true;
    }
    next();
  },
  created() {
    this.isFirstEnter = true;
    this.$bus.$on('saveArea', () => { // 监听成功删除和保存后，刷新页面数据
      this.getList()
    });
  },
  activated() {
    // 不是从form调过来 || 第一次进这个路由
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.btnPromise = (this.$store.state.promise.update == undefined) ? false : this.$store.state.promise.update
      this.getList();
      this.handleReset();
      this.$bus.$emit('searchArea', this.searchCondition);
      this.handleClose();
    }
    this.$route.meta.isBack = false;
    this.isFirstEnter = false;
  },
  methods: {
    getList() {
      var loading = this.$utils.loading(document.getElementsByClassName('first')[0]);
      this.$customAxios.get('area/selectAreaTree', {
        params: {
          userId: this.$cookies.getJSON('userInfo').UserID
        }
      }).then(resq => {
        this.dataSource = resq;
        this.columns = [{
            text: '区域名称',
            dataIndex: 'areaName'
          },
          {
            text: '区域管理人员',
            dataIndex: 'userNames'
          },
          {
            text: '区域地址',
            dataIndex: 'location'
          }
        ];
        loading.close()
      }).catch(error => {
        loading.close()
      });
    },
    handleHighSearch() {
      this.$bus.$emit('searchArea', this.searchCondition);
    },
    handleReset() {
      this.searchCondition.areaName = '';
      this.searchCondition.userNames = '';
      this.searchCondition.location = '';
    },
    handleAdd() {
      this.$router.push({
        name: 'BaseAreaSetForm',
        query: {
          isAdd: true,
          isReadonly: false
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.first .history {
  height: calc(100% - 81px);
}
</style>
