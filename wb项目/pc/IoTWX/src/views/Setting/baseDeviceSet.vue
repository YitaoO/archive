<template>
<div class="baseDeviceSet">
  <el-row>
    <el-col :span="24" class="tempcol2">
      <div class="search">
        <el-input @keyup.enter.native="handleHighSearch()" placeholder="请输入设备名称..." v-model="searchCondition.devName">
          <el-button slot="append" icon="el-icon-search" @click="handleHighSearch()"></el-button>
        </el-input>
        <el-button v-if="!!btnPromise" @click="handleAdd" icon="el-icon-setting">添加设备</el-button>
        <el-button @click="handleStartAllsensor" icon="el-icon-caret-right">全部设备开始读取</el-button>
        <el-button @click="handlePauseAllDevice" icon="el-icon-caret-top">全部设备暂停读取</el-button>
        <el-button @click="handleReStartAllDevice" icon="el-icon-arrow-right">全部设备恢复读取</el-button>
        <!-- <el-button @click="handleShutdownAllDevice" icon="el-icon-close">全部设备停止(需重启项目)</el-button> -->
        <el-dropdown @command="handleCommand">
          <el-button type="primary">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="highsearch">高级搜索</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
  <el-row v-if="isHiddenSearch" class="tempcol3">
    <el-form :model="searchCondition" label-width="150px">
      <el-row style="margin-bottom:10px;">
        <el-col :span="8">
          <el-form-item label="设备ID">
            <el-input v-model="searchCondition.devId" /></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备代码">
            <el-input v-model="searchCondition.devCode" /></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备状态">
            <el-select v-model="searchCondition.status" class="elselection" clearable>
              <el-option v-for="item in stateList" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="设备类型">
            <el-select v-model="searchCondition.devType" class="elselection" clearable>
              <el-option v-for="item in typeDeviceList" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属区域">
            <el-input v-model="searchCondition.areaName" /></el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: right;">
          <el-button type="success" icon="el-icon-search" @click="handleHighSearch">搜索</el-button>
          <el-button type="success" icon="el-icon-refresh" @click="handleReset">重置</el-button>
          <el-button type="success" icon="el-icon-close" @click="handleClose">关闭</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
  <el-row class="elrow">
    <el-col :span="5" style="padding-right:10px;height:100%;" v-if="showtree">
      <Tree :type="1"></Tree>
    </el-col>
    <el-col :span="showtree?19:24" style="height: 100%;">
      <tabletree :columns="columns" :tree-structure="true" :data-source="dataSource" :btnPromise="btnPromise"></tabletree>
    </el-col>
  </el-row>
</div>
</template>

<script>
// 通用组件  - 树形结构
import Tree from '../Common/tree.vue'
import baseDeviceSetmixins from '@/views/Setting/baseDeviceSetmixins'
import commonmixins from '@/views/Setting/commonmixins'
import pagination from '@/components/Pagination/pagination'
import tabletree from "@/views/Setting/baseDeviceSetTabletree";
export default {
  name: "baseDeviceSet",
  mixins: [baseDeviceSetmixins, commonmixins],
  components: {
    Tree, pagination, tabletree
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '启用': 'primary',
        '停用': 'gray',
        '报废': 'danger',
        '维修': 'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      searchCondition: {
        areaIds: '',
        devName: '',
        devId: '',
        devCode: '',
        status: '',
        devType: '',
        areaName: ''
      },
      showtree: true,
      //按钮权限
      btnPromise: false,
      dataSource: [],
      columns: [],
    }
  },
  watch: {
    isHiddenSearch: function(val) {
      var items = document.querySelectorAll('.baseDeviceSet .elrow');
      if (!val) {
        items[0].style.height = 'calc(100% - 81px)'
      } else {
        items[0].style.height = 'calc(100% - 192px)'
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == 'BaseDeviceSetForm') {
      to.meta.isBack = true;
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$bus.$off('paginationChange');
    next();
  },
  created() {
    this.isFirstEnter = true;
    this.getTypeDeviceList();
    this.getTypeDeviceStatus();
    this.$bus.$on('getAreaId', (areaId) => { // 点击树的时候
      this.searchCondition.areaIds = areaId;
      this.getList();
    })
    this.$bus.$on('saveDevice', () => { // 监听成功删除和保存后，刷新页面数据
      this.getList()
    });
    this.getList();
  },
  activated() {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.btnPromise = (this.$store.state.promise.update == undefined) ? false : this.$store.state.promise.update
      this.searchCondition.areaIds = '';
      this.handleClose();
      this.getList();
      this.$bus.$emit('getTreeData');
      this.$bus.$emit('searchDevice', this.searchCondition);
    }
    this.$route.meta.isBack = false;
    this.isFirstEnter = false; 
  },
  methods: {
    getList() {
      var loading = this.$utils.loading(document.getElementsByClassName('baseDeviceSet')[0]);
      this.$customAxios.get('device/getPcDeviceByareaID', {
        params: this.searchCondition // 首次load默认第一个
      }).then(resq => {
        this.dataSource = resq.data;
        this.columns = [{
          text: '设备ID',
          dataIndex: 'devId',
          height: 80
        }, {
          text: '设备名称',
          dataIndex: 'devName',
          height: 200
        },{
          text: '设备类型',
          dataIndex: 'devTypeName',
          height: 150
        }, {
          text: '设备代码',
          dataIndex: 'devCode',
          height: 120
        }, {
          text: '所属区域',
          dataIndex: 'areaName',
          height: 200
        }, {
          text: '状态',
          dataIndex: 'newStatus',
          height: 80
        },{
          text: '读取状态',
          dataIndex: 'pollStatus',
          height: 80
        }];
        loading.close()
      }).catch(error => {
        loading.close()
      });
    },
    handleAdd() {
      this.$router.push({
        name: 'BaseDeviceSetForm',
        query: {
          isAdd: true,
          isReadonly: false
        }
      });
    },
    handleReset() {
      this.searchCondition.devName = '';
      this.searchCondition.devId = '';
      this.searchCondition.devCode = '';
      this.searchCondition.status = '';
      this.searchCondition.devType = '';
      this.searchCondition.areaName = '';
    },
    handleHighSearch() {
      this.$bus.$emit('searchDevice', this.searchCondition);
    },
    handleStartAllsensor(){
      this.handleDeviceCommon('deviceSettingTing/StartAllsensor', `全部设备已成功读取`);
    },
    handlePauseAllDevice(){
      this.handleDeviceCommon('deviceSettingTing/pauseAllDevice', `全部设备已暂停读取`);
    },
    handleReStartAllDevice(){
      this.handleDeviceCommon('deviceSettingTing/reStartAllDevice', `全部设备已恢复读取`);
    },
    // handleShutdownAllDevice(){
    //   this.handleDeviceCommon('deviceSettingTing/shutdownAllDevice', `全部设备已停止`);
    // },
    handleDeviceCommon(url, message){
      var loading = this.$utils.loading(document.getElementsByClassName('baseDeviceSet')[0]);
      this.$customAxios.get(url)
      .then(resq => {
        this.$ele.Notification.success({
          title: "成功",
          message: message
        });
        this.getList();
        loading.close()
      }).catch(() => loading.close());
    }
  }
}
</script>

<style lang="scss" scoped>
.baseDeviceSet {
  height: 100%;
  .elrow {
    margin-top: 10px;
    height: calc(100% - 81px);
  }
  .search .el-button {
  margin-left: 0;
}
}
</style>
