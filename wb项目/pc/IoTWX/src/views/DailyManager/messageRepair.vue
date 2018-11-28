<!-- 路由-维修列表 -->
<template>
<el-container class="msWorkOrder-wrap over-height" v-loading="loading">
  <!-- <div class="top-wrap"> -->
  <el-header class="conter-header primary-color-bg-white border clearfix">
    <div class="header-right ">
      <el-input class="right-search" v-model="searchParams.key" placeholder="请输入..." size="small" clearable @clear="handleReset">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch()"></el-button>
      </el-input>
      <span class="insp-btn" v-if="!!btnPromise">
        <el-button icon="el-icon-setting" size="small" @click="handleWorkOrder(0)">添加维修</el-button>
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
      <div class="grid-list " style="padding-bottom: 15px;">
        <div class="grid-list-item" style="width:300px;">
          <span>标题</span>
          <el-input class="input" v-model="searchParams.key_title"></el-input>

        </div>
        <!-- <div class="grid-list-item" style="width:250px;">
            <span>工单标题</span>
            <el-input class="input" v-model="searchParams.key_title"></el-input>
          </div> -->
        <div class="grid-list-item ">
          <span>设备名称</span>
          <el-input class="input" v-model="searchParams.key_devName"></el-input>
        </div>
      </div>

      <div class="grid-list" style="padding-bottom: 10px;">
        <div class="grid-list-item" style="width:300px;">
          <span>费用</span>
          <el-input class="input" v-model="searchParams.key_cost"></el-input>
        </div>
        <div class="grid-list-item">
          <span>创建人</span>
          <el-input class="input" v-model="searchParams.key_addUserName"></el-input>
        </div>
        <!-- <div class="grid-list-item">
            <span>维修日期</span>
            <el-input class="input" v-model="searchParams.key_addUserName"></el-input>
          </div> -->
      </div>
    </el-col>
    <el-col :span="6" class="text-right">
      <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="handleReset">重置</el-button>
      <el-button type="primary" size="small" icon="el-icon-close" @click="handleClose">关闭</el-button>
    </el-col>
  </el-row>
  <!-- </div> -->
  <el-row class="elrow" v-bind:style="{height:containHeight+'px'}" style="padding-top:15px;">
    <el-col :span="4" class="over-height" style="padding-right:10px">
      <Tree :type="3"></Tree>
    </el-col>
    <el-col :span="20" class="wrap-right over-height border primary-color-bg-white">
      <el-table class="right-table" :data="workOrderLists">
        <el-table-column type="index" label="序号 " min-width="60 ">
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="120 ">
        </el-table-column>
        <el-table-column prop="devName" label="设备名称" min-width="100 ">
        </el-table-column>
        <el-table-column prop="cost" label="费用" min-min-width="50 ">
        </el-table-column>
        <el-table-column prop="times" label="维修时间 " min-width="200 ">
          <template slot-scope="scope ">
            {{scope.row.bdate}} 至 {{scope.row.edate}}

              </template>
        </el-table-column>
        <el-table-column prop="addUserName" label="增加人 " min-width="100 ">
        </el-table-column>
        </el-table-column>
        <el-table-column label="操作 " min-width="150 ">
          <template slot-scope="scope ">
            <el-button size="mini" type="text" class="handleButton" @click="handleWorkOrder(2,scope.row.kid)">查看</el-button>
            <template v-if="btnPromise">
              <el-button size="mini" type="text" class="handleButton"  @click="handleWorkOrder(1,scope.row.kid)">编辑</el-button>
              <el-button size="mini" type="text" @click="handleDelect(scope.row.kid)">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部 -->

      <div class="list-footer">
        <Pagination :child-option="pageOption"></Pagination>
      </div>
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
      containHeight: 0,
      pageOption: {
        page: 1,
        limit: 10,
        total: 0
      },
      workOrderLists: [], //工单列表
      dialogOption: { //dialog配置
        dialogShow: false,
        warmExplain: '是否要删除操作？'
      },
      //按钮权限
      btnPromise: (this.$store.state.promise.update == undefined) ? false : this.$store.state.promise.update,
    }
  },
  mounted() {
    this.setStyle()
  },
  created() {
    let that = this

    this.$bus.$off('getFirstArea')
    // 监听树组件
    this.$bus.$on('getFirstArea', (params) => {
      this.areaId = params.areaId;
      that.getRepairOrderList()
    })
    // 监听分页组件
    that.$bus.$on('paginationChange', (page) => {
      this.loading = true
      this.pageOption.page = page
      this.getRepairOrderList()
    })

  },
  methods: {
    // 获取维修列表
    getRepairOrderList(searchParams) {
      let that = this
      this.$customAxios.get('repairOrder/selectByMap', {
        params: {
          userId: this.$cookies.getJSON('userInfo').UserID,
          areaId: this.areaId,
          page: this.pageOption.page,
          limit: this.pageOption.limit,
          ...searchParams
        }

      }).then(resq => {
        this.loading = false
        that.pageOption.total = resq.total
        that.workOrderLists = resq.data
      }).catch(error => {});
    },
    // 设置样式
    setStyle() {
      let allHeight = document.getElementsByClassName('msWorkOrder-wrap')[0].offsetHeight
      let headerHeight = document.getElementsByClassName('conter-header')[0].offsetHeight
      this.containHeight = allHeight - headerHeight
    },
    // 删除维修
    handleDelect(kid) {
      if (!kid) return
      this.dialogOption.dialogShow = true

      this.$bus.$off('dialogConfim')
      this.$bus.$on('dialogConfim', () => {
        this.wrapLoading = true
        this.$customAxios.post('repairOrder/delete', {
          kid: kid,
          delDate: 1

        }).then(resq => {
          this.loading = false
          this.$ele.Notification({
            title: "成功",
            message: `删除成功！`,
            type: 'success'
          })
          this.getRepairOrderList()
        }).catch(error => {
          this.loading = false
        });


      })
    },
    /**
     * [handleWorkOrder 路由 - 添加修改工单]
     * @param  {[type]} type [0:新增;1:编辑;2查看]
     * @param  {[type]} kid  [唯一标示]
     */
    handleWorkOrder(type, kid) {
      this.$router.push({
        name: 'MessageRepairEdit',
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
      this.getRepairOrderList()
      this.loading = false
    },
    getSearchList() { //搜索筛选
      this.getRepairOrderList(this.searchParams)
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
    border-bottom: solid 1px #dcdfe1;
    .header-right {
        float: right;
        display: inline-block;
        .right-search {
            width: 250px!important;
        }
    }
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
    // padding-top: 10px;
    #pagination {
        border: none !important;
    }
}
.search-wrap {
    font-size: 14px;
    color: #999;
    padding: 10px;
    background-color: #ffffff;
    border-right: 1px solid #dcdfe1;
    border-left: 1px solid #dcdfe1;
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
