<!-- 路由-工单列表 -->
<template>
<el-container class="msWorkOrder-wrap over-height" v-loading="loading">
  <!-- <div class="top-wrap"> -->
  <el-header class="conter-header primary-color-bg-white border clearfix">
    <div class="header-right ">
      <el-input class="right-search" v-model="searchParams.key" placeholder="请输入..." size="small" clearable @clear="handleReset">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch()"></el-button>
      </el-input>
      <span class="insp-btn" v-if="!!btnPromise">
          <el-button icon="el-icon-setting" size="small" @click="handleWorkOrder(0)">添加工单</el-button>
        </span>

      <el-dropdown @command="handleCommand">
        <el-button size="small">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item size="small" command="highsearch">高级搜索</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </el-header>
  <!-- 搜索 -->
  <el-row v-if="isHiddenSearch" class="search-wrap primary-color-bg-white">
    <el-col :span="18">
      <div class="grid-list" style="padding-bottom: 15px;">
        <div class="grid-list-item" style="width:300px;">
          <span>设备名称</span>
          <el-input class="input" v-model="searchParams.key_devName"></el-input>

        </div>
        <div class="grid-list-item">
          <span>指派给</span>
          <el-input class="input" v-model="searchParams.key_userName"></el-input>
        </div>
        <div class="grid-list-item"></div>
      </div>

      <div class="grid-list" style="padding-bottom: 15px;">
        <div class="grid-list-item" style="width:300px;">
          <span>状态</span>
          <el-select class="input" v-model="searchParams.status" placeholder="请选择">
            <el-option v-for="item in searchStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="grid-list-item">
          <span>添加人</span>
          <el-input class="input" v-model="searchParams.key_addUserName"></el-input>
        </div>
      </div>
    </el-col>
    <el-col :span="6" class="text-right">
      <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="handleReset">重置</el-button>
      <el-button type="primary" size="small" icon="el-icon-close" @click="handleClose">关闭</el-button>
    </el-col>
  </el-row>
  <!-- </div> -->


  <el-row class="elrow content">
    <el-col :span="4" class="over-height" style="padding-right:10px">
      <Tree :type="3"></Tree>
    </el-col>
    <el-col :span="20" class="wrap-right over-height primary-color-bg-white">
      <el-table class="right-table " :data="workOrderLists" style="border:1px solid rgb(220, 223, 225);border-bottom:none;" height="calc(100% - 60px)">
        <el-table-column type="index" label="序号 " min-width="60 ">
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="150 ">
        </el-table-column>
        <el-table-column prop="devName" label="设备名称" min-width="150 ">
        </el-table-column>
        <el-table-column prop="typeName" label="工单类型 " min-width="100 ">
        </el-table-column>
        <el-table-column prop="userName" label="指派给 " min-width="100 ">
        </el-table-column>
        <el-table-column prop="intoTem" label="状态" min-width="100 ">
          <template slot-scope="scope ">
                <span class="status " :class="scope.row.status== 0 ?'status0':scope.row.status ==1?'status1':'status2'">{{scope.row.status== 0 ?'未指派':scope.row.status ==1?'处理中':'已结办'}}</span>

              </template>
        </el-table-column>
        <el-table-column prop="addUserName" label="增加人" min-width="70 ">
        </el-table-column>
        <el-table-column prop="addDate" label="创建时间 " min-width="150 ">
        </el-table-column>
        <el-table-column label="操作 " min-width="180 ">
          <template slot-scope="scope ">
            <el-button size="mini" type="text" :class="(!!scope.row.showDropdown)?'':'handleNoMore'" class="handleButton" @click="handleWorkOrder(3,scope.row.kid)">查看</el-button>

            <template v-if="!!btnPromise" >
              <el-button size="mini" type="text" class="handleButton" v-if="!!scope.row.saveUser && scope.row.status ==0" @click="handleWorkOrder(1,scope.row.kid)">编辑</el-button>
              <el-dropdown @command="handleCommands(scope.row, $event)" v-if="!!scope.row.showDropdown">
                <el-button size="mini" type="primary">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="!!scope.row.overUser && scope.row.status ==1" command="over">结案</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.status==1" command="goBack">撤销</el-dropdown-item>
                  <el-dropdown-item v-if="!!scope.row.saveUser" command="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              </template>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :child-option="pageOption"></Pagination>

    </el-col>
  </el-row>
  <Dialog :dialogOption="dialogOption "></Dialog>
</el-container>
</template>



<script>
// 组件 - 树
import Tree from '../Common/tree.vue'
// 组件 - Dialog
import Dialog from '@/components/Dialog/dialog.vue'
// 组件 - 分页
import Pagination from '@/components/Pagination/pagination.vue'
import searchMixin from './searchMixin'
export default {
  name: "messageWorkOrderList",
  mixins: [searchMixin],
  components: {
    Tree,
    Dialog,
    Pagination
  },
  data() {
    return {
      loading: true,
      areaId: '',
      pageOption: {
        page: 1,
        limit: 10,
        total: 0
      },
      page1: 1,
      page2: 1,
      workOrderLists: [], //工单列表
      dialogOption: { //dialog配置
        dialogShow: false,
        warmExplain: '是否要删除操作？'
      },
      searchParams: {},
      searchStatus: [{
          value: 0,
          label: '未指派'
        }, {
          value: 1,
          label: '指派'
        },
        {
          value: 2,
          label: '已结案'
        }
      ],
      //按钮权限
      btnPromise: (this.$store.state.promise.update == undefined) ? false : this.$store.state.promise.update,
    }
  },
  created() {
    let that = this

    this.$bus.$off('getFirstArea')
    // 监听树组件
    this.$bus.$on('getFirstArea', (params) => {
      if (params == null) {
        this.type = 1
        this.loading = false
        return
      }
      this.areaId = params.areaId;
      that.getWorkerOrderList()
    })
    this.$bus.$off('paginationChange')
    // 监听分页组件
    that.$bus.$on('paginationChange', (page) => {
      this.loading = true
      this.pageOption.page = page
      this.getWorkerOrderList(this.searchParams)
    })

  },
  methods: {
    // 获取工单列表
    getWorkerOrderList(searchParams) {
      let that = this

      this.$customAxios.get('workOrder/selectByMap', {
        params: {
          userId: that.$cookies.getJSON('userInfo').UserID,
          areaId: that.areaId,
          page: that.pageOption.page,
          limit: that.pageOption.limit,
          ...searchParams
        }

      }).then(resq => {
        that.loading = false

        that.workOrderLists = resq.data
        that.pageOption.total = resq.total
        for (let i = 0; i < that.workOrderLists.length; i++) {
          //是否提交人
          if (that.workOrderLists[i].addUserId == that.$cookies.getJSON('userInfo').UserID) {
            that.workOrderLists[i].saveUser = true
          } else {
            that.workOrderLists[i].saveUser = false
          }
          //是否指派人
          if (that.workOrderLists[i].userId == that.$cookies.getJSON('userInfo').UserID) {
            that.workOrderLists[i].overUser = true
          } else {
            that.workOrderLists[i].overUser = false
          }
          // 是否隐藏更多
          if (!!that.workOrderLists[i].saveUser || that.workOrderLists[i].status == 1) {
            that.workOrderLists[i].showDropdown = true
          } else {
            that.workOrderLists[i].showDropdown = false
          }
        }

      }).catch(error => {});
    },
    // 更多事件
    handleCommands(row, command) {
      let url = ''
      let params = ''
      let dialogWarn = ''
      switch (command) {
        case 'delete': //删除
          url = 'workOrder/delete'
          params = {
            kid: row.kid,
            isDel: 1,
            delUserId: this.$cookies.getJSON('userInfo').UserID,
            delUserName: this.$cookies.getJSON('userInfo').name
          }
          dialogWarn = '撤销操作会删除当前工单，是否要进行此操作？'
          break;
        case 'goBack': // 撤销
          url = 'workOrder/revokeWorkOrder'
          params = {
            kid: row.kid,
            status: 0,
            userId: '',
            devId: row.devId,
            devStatus1: 0
          }
          dialogWarn = '撤销操作会清空指派人，是否要进行此操作？'
          break;
        case 'over': // 结案
          this.handleWorkOrder(2, row.kid)
          return
          break;
        default:

      }
      this.dialogOption.dialogShow = true
      this.dialogOption.warmExplain = dialogWarn

      this.$bus.$off('dialogConfim')
      this.$bus.$on('dialogConfim', () => {
        this.loading = true
        this.$customAxios.post(url, params).then(resq => {
          this.loading = false
          this.$ele.Notification({
            title: "成功",
            message: `操作成功！`,
            type: 'success'
          })

          this.getWorkerOrderList()
        }).catch(error => {
          this.loading = false
        });
      })
    },
    // 路由 - 添加修改工单
    handleWorkOrder(type, kid) {
      // t.$cookies.set('renderRouter', false, 7)
      /**
       * type说明(0:新增;1:编辑；2:结案；3:查看)
       */
      this.$router.push({
        name: 'MessageWorkOrderEdit',
        params: {
          type: type,
          kid: kid
        }

      });
    },
    /**
     * 搜索模块
     */
    handleReset() { //重置
      this.searchParams = {}
      this.getWorkerOrderList()
      this.loading = false
    },
    getSearchList() { //搜索筛选
      this.getWorkerOrderList(this.searchParams)
      this.loading = false
    }

  }
}
</script>

<style lang="scss" scoped>
.top-wrap {
    border: solid 1px #dcdfe1;
    margin-bottom: 10px;
}
.conter-header {
    height: 50px !important;
    line-height: 50px !important;

    .header-right {
        float: right;
        display: inline-block;
        .right-search {
            width: 250px!important;
        }
    }
}
.content {
    padding-top: 15px;
    height: calc(100% - 60px);
}
.wrap-right {
    position: relative;
    .right-table {
        width: 100%;
        .status {
            padding: 8px 6px;
            border-radius: 4px;
            color: #fff;
            &.status0 {
                background: #fd7762;
            }
            &.status1 {
                background: #ffc000;
            }
            &.status2 {
                background: #17b990;
            }
        }
    }
}
.list-footer {
    width: 100%;
    border-top: solid 1px #dcdfe1;
    position: absolute;
    bottom: 0;
    padding-top: 10px;
    #pagination {
        border: none !important;
    }
}
.search-wrap {
    font-size: 14px;
    color: #999;
    padding: 10px;
    background-color: #ffffff;
    border-left: 1px solid #dcdfe1;
    border-right: 1px solid #dcdfe1;
    border-bottom: 1px solid #dcdfe1;
    span {
        display: inline-block;
        width: 60px;
        text-align: right;
    }
    .time-item {
        padding-right: 20px;
        width: 150px !important;
    }
    .item {
        text-align: left;
        width: 33%;
    }
    .input {
        width: 200px !important;
        height: 36px;
    }
}
</style>
