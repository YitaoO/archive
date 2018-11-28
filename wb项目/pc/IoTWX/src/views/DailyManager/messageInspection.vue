<!-- 路由-设备巡检 -->
<template>
<el-container id="msInspection-wrap" class="over-height" v-loading="loading">
  <el-header class="ins-tabs border primary-color-bg-white margin-bottom grid-list font-size-14">
    <div class="tab-item tab-left grid-list-item text-right cursor-point" :class="tabIndex == 0?'active':''" @click="bindTabs(0)">
      计划巡检
    </div>
    <div class="tab-item tab-right grid-list-item text-left cursor-point" :class="tabIndex == 1?'active':''" @click="bindTabs(1)">
      巡检记录
    </div>
  </el-header>
  <div class="insp-conter border primary-color-bg-white over-height">
    <el-header class="conter-header clearfix" v-if="tabIndex == 0">
      <div class="header-right">
        <el-input class="right-search" v-model="searchParams.searchName" placeholder="请输入计划名称..." size="small" clearable @clear="handleReset">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch()"></el-button>
        </el-input>
        <span class="insp-btn" v-if="tabIndex == 0 && !!btnPromise">
          <el-button icon="el-icon-setting" size="small" @click="handleEditInsp(0)">添加方案</el-button>
          <el-button icon="el-icon-setting" size="small" @click="handleAddPlan(0)">添加计划</el-button>
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
    <el-row v-if="isHiddenSearch" class="search-wrap text-left">
      <el-row>
        <el-col :span="18">
          <div class="grid-list " style="padding-bottom: 10px;">
            <div class="grid-list-item " style="width:300px;">
              <span>标题</span>
              <el-input class="input" v-model="searchParams.title"></el-input>
            </div>
            <div class="grid-list-item">
              <span>巡检日期</span>
              <el-date-picker class="time-item" v-model="searchParams.startDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="开始日期">
              </el-date-picker>
              <el-date-picker class="time-item" v-model="searchParams.endDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="结束日期">
              </el-date-picker>

            </div>
          </div>
          <div class="grid-list" style="padding-bottom: 10px;">
            <div class="grid-list-item " style="width:300px;">
              <span>巡检人</span>
              <el-input class="input" v-model="searchParams.userName"></el-input>
              </el-form-item>
            </div>
            <div class="grid-list-item">
              <span>状态</span>
              <el-select v-model="searchParams.isPublish" placeholder="请选择">
                <el-option v-for="item in isPublishs" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>

            </div>
            <!-- <div class="grid-list-item"></div> -->
          </div>
        </el-col>
        <el-col :span="6" class="text-right">
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button type="primary" size="small" icon="el-icon-refresh" @click="handleReset">重置</el-button>
          <el-button type="primary" size="small" icon="el-icon-close" @click="handleClose">关闭</el-button>
        </el-col>

      </el-row>
    </el-row>
    <el-row class="" class="conterContain" :style="(tabIndex == 0)?{height:containHeight+'px'}:{height:'100%'}">
      <el-col :span="4" class="wrap-tree primary-color-bg-white over-height">
        <Tree :type="tabIndex == 0?4:3" v-if="treeShow"></Tree>
      </el-col>

      <el-col :span="20" class="wrap-right over-height">
        <!-- 巡检方案 -->
        <div class="" v-if="tabIndex==0" class="over-height">
          <div class="right-top boder-bottom font-size-14" style="height:120px;">
            <p class="primary-color-02 ">巡检方案</p>
            <p class="top-name">{{name}}</p>
            <div class="top-list primary-color-03">
              <el-row>
                <el-col :span="2"><span>设备列表:</span></el-col>
                <el-col :span="22"><span class="list-item" v-for="(item,index) in routerList">{{item.devName}}</span></el-col>
              </el-row>
              <i class="btn-delect el-icon-delete" @click="handleDelectInsp()"></i>
              <i class="btn-edit el-icon-edit-outline" @click="handleEditInsp(1)"></i>
            </div>

          </div>
          <!-- <div class="right-table"> -->
          <el-table :data="checkPlanPage" style="border-bottom:none;height100%;" height="calc(100% - 200px)">
            <el-table-column type="index" label="序号" min-width="50"></el-table-column>
            <el-table-column prop="title" label="设备名称" min-width="100">
            </el-table-column>
            <el-table-column prop="ckDate" label="日期" min-width="200">
            </el-table-column>
            <el-table-column prop="userName" label="巡检人" min-width="80">
            </el-table-column>
            <el-table-column prop="statusName" label="状态" min-width="80">
              <template slot-scope="scope">
                  <span class="table-cell-statue" :class="!!scope.row.hashPublish?'comped':'uncomped'">  {{!!scope.row.hashPublish?'已发布':'未发布'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="任务进度" min-width="110">
              <template slot-scope="scope">
                  <el-progress type="circle" :width=30 :stroke-width=5 color="#fd7762" :show-text='false' :percentage="scope.row.realityTimes/scope.row.planTimes" style="vertical-align: middle;"></el-progress>
                  <span >{{(scope.row.realityTimes/scope.row.planTimes)*100}}%</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180 ">
              <template slot-scope="scope">
                <el-button size="mini" type="text" :class="(scope.row.hashPublish !=2)?'':'handleNoMore'" class="handleButton" @click="handleReviseInsp(2,scope.row.kid)">查看</el-button>
                <template v-if="!!btnPromise" >
                  <el-button size="mini" type="text" class="handleButton" v-if="scope.row.hashPublish ==0" @click="handleReviseInsp(1,scope.row.kid)">编辑</el-button>
                  <el-dropdown @command="handleCommands(scope.row, $event)" v-if="scope.row.hashPublish !=2">
                    <el-button size="mini" type="primary">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="scope.row.hashPublish == 0" command="publish">发布</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.hashPublish ==1 && (scope.row.sumCheckRecord ==0 || scope.row.sumCheckRecord ==null)" command="goBack">撤销</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.hashPublish ==1 && scope.row.sumCheckRecord >0" command="stop">中止</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.hashPublish == 0" command="delete">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  </template>
              </template>
            </el-table-column>
          </el-table>
          <el-footer class="right-footer primary-color-bg-white">
            <Pagination :child-option="pageOption"></Pagination>
          </el-footer>
          <Dialog :dialogOption="dialogOption"></Dialog>
          <!-- </div> -->
        </div>
        <!-- 巡检记录 -->
        <!-- <div class="" > -->
        <el-table v-if="tabIndex==1" :data="checkRecordList" style="border-bottom:none;" height="calc(100% - 60px)">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="devName" label="设备名称" min-width="150">
          </el-table-column>
          <el-table-column prop="location" label="所在位置" min-width="210">
          </el-table-column>
          <el-table-column prop="addDate" label="巡检时间" min-width="200">
          </el-table-column>
          <el-table-column prop="userName" label="巡检人" min-width="100">
          </el-table-column>
          <el-table-column label="工单" min-width="80">
            <template slot-scope="scope">
              {{scope.row.woId !=null?'有':'--'}}
              </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
                <el-button size="mini" type="text" @click="hanleCheck(scope.row.kid)">查看</el-button>
              </template>
          </el-table-column>
        </el-table>
        <!-- 底部 -->
        <el-footer class="right-footer" v-if="tabIndex ==1">
          <Pagination :child-option="pageOption"></Pagination>
        </el-footer>
      </el-col>

    </el-row>
  </div>
</el-container>
</template>

<script>
// 组件 - 树
import Tree from '../Common/tree.vue'
// 组件 - 分页
import Pagination from '@/components/Pagination/pagination'
// 组件 - Dialog
import Dialog from '@/components/Dialog/dialog.vue'
import searchMixin from './searchMixin'
export default {
  name: "IndexDailyManager",
  mixins: [searchMixin],
  data() {
    return {
      loading: true,
      tabIndex: 0,
      crKid: '',
      pageOption: {
        page: 1,
        limit: 10,
        total: 0
      },
      page1: 1,
      page2: 1,
      name: '',
      routerList: [],
      checkPlanPage: [],
      containHeight: 0,
      dialogOption: {
        dialogShow: false,
        warmExplain: '此操作会删除当前巡检方案,您是否要进行此操作？'
      },
      //按钮权限
      btnPromise: (this.$store.state.promise.update == undefined) ? false : this.$store.state.promise.update,
      checkRecordList: [], //巡检记录
      isPublishs: [{
          value: '',
          label: '全部'
        }, {
          value: 0,
          label: '未发布'
        },
        {
          value: 1,
          label: '已发布'
        }
      ],
      treeShow: true
    }
  },
  components: {
    Tree,
    Pagination,
    Dialog
  },
  mounted() {
    this.setStyle()
  },
  created() {
    let that = this

    that.$bus.$off('getCheckRoutesFirst')
    that.$bus.$off('getFirstArea')

    // 监听树组件
    that.$bus.$on('getCheckRoutesFirst', (backParam) => {
      if(backParam ==null){
        this.loading = false
        return 
      }
      this.loading = true
      let crKid = that.$route.params.crKid
      if (crKid != undefined) {
        that.getCheckRouteData(crKid)
      } else {
        that.getCheckRouteData(backParam)
      }


    })
    that.$bus.$on('getFirstArea', (backParam) => {
       if(backParam ==null){
        this.loading = false
        return 
      }
      this.loading = true

      that.getCheckRecordData(backParam)
    })
    // 监听分页组件
    that.$bus.$on('paginationChange', (page) => {
      this.loading = true
      if (this.tabIndex == 0) {
        that.page1 = page
        that.getCheckRouteData(this.crKid)
      } else {
        that.page2 = page
        that.getCheckRecordData()
      }
    })

  },
  methods: {
    // 设置样式
    setStyle() {
      let allHeight = document.getElementsByClassName('insp-conter')[0].offsetHeight
      let headerHeight = document.getElementsByClassName('conter-header')[0].offsetHeight
      let searchWrap = (!!this.isHiddenSearch) ? document.getElementsByClassName('search-wrap')[0].offsetHeight : 0

      this.containHeight = allHeight - headerHeight - searchWrap
    },
    // 获取巡检方案数据
    getCheckRouteData(crKid) {
      this.$customAxios.get('checkRoute/getCheckRouteById', {
        params: {
          crKid: crKid,
          page: this.page1,
          limit: this.pageOption.limit
        }

      }).then(resq => {
        this.pageOption.total = resq.checkPlanPage.total
        this.name = resq.name
        this.routerList = resq.checkRoutesList
        this.checkPlanPage = resq.checkPlanPage.data
        this.crKid = resq.crKid

        this.loading = false
      }).catch(error => {})
    },
    // 获取巡检记录数据
    getCheckRecordData(areaId) {
      this.$customAxios.get('checkRecord/selectByMap', {
        params: {
          areaId: areaId,
          page: this.page2,
          limit: this.pageOption.limit
        }

      }).then(resq => {
        this.pageOption.total = resq.total
        this.checkRecordList = resq.data
        this.loading = false
      }).catch(error => {})
    },
    // tab事件
    bindTabs(index) {
      let that = this
      if (that.tabIndex == index) return
      that.tabIndex = index
      that.handleClose()
    },
    // 更多事件
    handleCommands(row, command) {
      let url = ''
      let params = ''
      let dialogWarn = ''
      switch (command) {
        case 'delete': //删除
          url = 'checkPlan/delete'
          params = {
            kid: row.kid,
            isDel: 1,
            delUserId: this.$cookies.getJSON('userInfo').UserID,
            delUserName: this.$cookies.getJSON('userInfo').name
          }
          dialogWarn = '是否要进行删除操作？'
          break;
        case 'goBack': // 撤销
          url = 'checkPlan/updateCheckPlan'
          params = {
            kid: row.kid,
            hashPublish: 0,
            userId: row.userId,
            crKid: this.crKid
          }
          dialogWarn = '是否要进行撤销操作？'
          break;
        case 'stop': // 中止
          url = 'checkPlan/updateCheckPlan'
          params = {
            kid: row.kid,
            hashPublish: 2,
            userId: row.userId
          }
          dialogWarn = '是否要进行中止操作？'
          break;
        case 'publish': // 发布
          url = 'checkPlan/updateCheckPlan'
          params = {
            kid: row.kid,
            hashPublish: 1,
            crKid: this.crKid,
            userId: row.userId
          }
          dialogWarn = '是否要进行发布操作？'
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

          this.getCheckRouteData(this.crKid)
        }).catch(error => {
          this.loading = false
        });
      })
    },

    // 跳转-添加修改方案
    handleEditInsp(type) {
      this.$router.push({
        name: 'MessageInsEdit',
        params: {
          status: type,
          crKid: this.crKid
        }

      });
    },
    // 跳转-巡检详情
    hanleCheck(kid) {
      if (!!kid) {
        this.$router.push({
          name: 'MessageCheckRecord',
          params: {
            kid: kid
          }
        })
      }
    },
    // 跳转-添加计划
    handleAddPlan(type) {
      this.$router.push({
        name: 'MessagePlan',
        params: {
          status: type
        }

      });
    },
    // 跳转-修改计划
    handleReviseInsp(type, kid) {
      this.$router.push({
        name: 'MessagePlan',
        params: {
          status: type,
          kid: kid
        }

      });
    },
    // 删除方案
    handleDelectInsp() {
      this.dialogOption.dialogShow = true

      this.$bus.$off('dialogConfim')
      this.$bus.$on('dialogConfim', () => {
        this.loading = true
        this.treeShow = false
        this.$customAxios.post('checkRoute/delete', {
          crKid: this.crKid,
          isDel: 1,
          delUserId: this.$cookies.getJSON('userInfo').UserID,
          delUserName: this.$cookies.getJSON('userInfo').name
        }).then(resq => {
          this.treeShow = true
        }).catch(error => {});

      })

    },

    /**
     * 搜索模块
     */
    handleReset() { //重置
      this.searchParams = {}
      this.getCheckRouteData(this.crKid)
    },
    getSearchList() { //搜索筛选
      let params = this.searchParams
      params.crKid = this.crKid
      this.loading = false
      this.$customAxios.get('checkRoute/getCheckRouteById', {
        params: params
      }).then(resq => {

        this.pageOption.total = resq.checkPlanPage.total
        this.checkPlanPage = resq.checkPlanPage.data
        this.loading = false
      }).catch(error => {
        this.loading = false
      });

    }



  }
}
</script>

<style lang="scss"scoped>
.ins-tabs {
    color: #999;
    height: 44px !important;
    line-height: 44px !important;
    .tab-left {
        padding-right: 20px;
    }
    .tab-left::after {
        right: 25px;
    }
    .tab-right {
        padding-left: 20px;
    }
    .tab-right::after {
        left: 25px;
    }
    .tab-item {

        position: relative;
        &.active {
            color: #17b990;

        }
        &.active::after {
            position: absolute;
            width: 43px;
            height: 3px;
            background-color: #17b990;
            bottom: 0;

            content: '';
        }
    }

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
.insp-conter {

    .common-tree {
        border: none !important;
        border-right: solid 1px #dcdfe1 !important;

    }
    .wrap-right {
        position: relative;
        .right-top {
            position: relative;
            padding: 10px;
            .top-name {
                color: #292f2d;
                font-size: 28px;
                padding: 5px 5px 20px 0;
            }
            .top-list {
                padding-bottom: 10px;
            }
            .list-item {
                display: inline-block;
                background-color: #e6e9ea;
                padding: 7px 5px;
                border-radius: 4px;
                @include oneLine;
                margin-right: 8px;
            }
            .btn-edit {
                position: absolute;
                top: 10px;
                right: 40px;

            }
            .btn-delect {
                position: absolute;
                top: 10px;
                right: 10px;
            }
        }
        .right-footer {
            text-align: right;
            width: 100%;
            // height:
            position: absolute;
            bottom: 0;
            padding-top: 10px;
        }
        .right-table {
            padding: 10px;
            .table-cell-statue {
                color: #fff;
                border-radius: 8px;
                padding: 5px;
                &.comped {
                    background: #17b990;
                }
                &.uncomped {
                    background: #fd7762;
                }
            }
            .table-btn {}
        }
    }
}
.search-wrap {
    font-size: 14px;
    color: #999;
    padding: 10px;
    background-color: #ffffff;
    border-top: 1px solid #dcdfe1;
    border-bottom: 1px solid #dcdfe1;
    border-top: none;
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
