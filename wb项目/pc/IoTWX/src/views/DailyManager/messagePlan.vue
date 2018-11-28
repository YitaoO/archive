<!-- 路由 - 巡检计划 -->
<template>
<el-form v-loading="wrapLoading" :disabled="status ==2" class="over-height" ref="messagePlanForm" :model="temp" :rules="rules" label-width="100px">
  <el-container id="editInsp-wrap" class="center-wrap   over-height  font-size-14">
    <el-header class="header-wrap border margin-bottom primary-color-bg-white font-size-14 primary-color-02">
      <p class="header-title ">计划信息</p>

      <div class="item wrap-first grid-list">
        <el-form-item class="item-left  grid-list-item" label="计划名称" prop="title">
          <el-input class="item-change" v-model="temp.title" placeholder="请输入计划名称..."></el-input>
        </el-form-item>
        <el-form-item class=" grid-list-item" prop="userId" label="巡检人">
          <el-select class="item-change" v-model="userName" placeholder="选择巡检人" @change="selectPerson">
            <el-option v-for="item in userList" :key="item.userId" :label="item.name" :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item wrap-second grid-list">
        <el-form-item class="item-left  grid-list-item" label="巡检方案" prop="crKid">
          <el-select class="item-change" v-model="crKidName" placeholder="选择巡检方案" @change="selectRoutes">
            <el-option v-for="item in checkRoutesList" :key="item.crKid" :label="item.name" :value="item.crKid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class=" grid-list-item" label="计划日期" prop="ckDate">
          <el-date-picker class="item-timer" type="dates" v-model="ckDate" align="right" placeholder="选择日期" @change="changeTime">
          </el-date-picker>
        </el-form-item>
      </div>

    </el-header>
    <el-main class="data-wrap over-height border primary-color-bg-white padding-reset">
      <div class="data-top boder-bottom ">
        <span class="primary-color-02">方案明细</span>
      </div>
      <el-table :data="deviceList" style="width: 100%" height="calc(100% - 120px)">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="devName" label="设备名称" width="200">
        </el-table-column>
        <el-table-column prop="areaName" label="所在位置" width="200">
        </el-table-column>
        <el-table-column prop="time" label="巡检时间" min-width="600">
          <template slot-scope="scope">
          <el-time-picker class="timer-wrap left" readonly v-model="scope.row.time"  value-format="HH:mm" format="HH:mm" placeholder="选择时间" >
          </el-time-picker>
        </template>
        </el-table-column>
      </el-table>
      <el-footer class="data-footer grid-list">
        <div class="btn-wrap grid-list-item">
          <el-button type="success" plain v-if="status ==0" @click="handleAdd(0,0)">新增</el-button>
          <el-button type="success" plain v-if="status ==0" @click="handleAdd(1,0)">新增 & 发布</el-button>
          <el-button type="primary" plain v-if="status ==1" @click="handleAdd(0,1)">保存</el-button>
          <el-button type="success" plain v-if="status ==1" @click="handleAdd(1,1)">保存 & 发布</el-button>

          <el-button plain v-if="status !=0" @click="handleBack()">取消</el-button>

        </div>

      </el-footer>
    </el-main>
    <DialogTransfer :dialog.sync="dialogshow"></DialogTransfer>

  </el-container>
</el-form>
</template>

<script>
// 组件 - 穿梭框
import DialogTransfer from './transfer'
export default {
  name: "MessageInsEdit",
  components: {
    DialogTransfer
  },
  data() {
    return {
      value1: '',
      name: '',
      checkRoutesList: [], //方案列表
      userList: [],
      deviceList: [],
      userName: '',
      ckDate: [],
      crKidName: '',
      status: 0, //0:新增；1：修改
      wrapLoading: true,
      rules: { //验证规则
        title: [{
          required: true,
          message: '请输入计划名称',
          trigger: 'change'
        }],
        userId: [{
          required: true,
          message: '请选择巡检人',
          trigger: 'change'
        }],
        crKid: [{
          required: true,
          message: '请选择巡检方案',
          trigger: 'change'
        }],
        ckDate: [{
          required: true,
          message: '请选择计划日期',
          trigger: 'change'
        }]
      },
      temp: {}, //提交参数
      dialogshow: {
        show: false
      },
    }
  },
  mounted() {
    let that = this
    that.status = that.$route.params.status
    if (that.status == 0) { //发布

    } else { //修改,查看
      this.kid = that.$route.params.kid
      this.getOneCheckRouteById()
    }
    this.getCheckRoutes()
    this.getUserList()


  },
  methods: {
    /**
     * 获取巡检计划信息
     */
    getOneCheckRouteById() {
      this.$customAxios.get('checkPlan/getCheckPlanByKid', {
        params: {
          kid: this.kid
        }
      }).then(resq => {
        this.wrapLoading = false
        this.temp = {
          title: resq.title,
          userId: resq.userId,
          crKid: resq.crKid,
          ckDate: resq.ckDate
        }
        let times = resq.ckDate.split(',')
        for (let i = 0; i < times.length; i++) {
          this.ckDate.push(new Date(times[i]))
        }

        this.userName = resq.userName
        this.crKidName = resq.name
        this.deviceList = resq.checkRoutesList

      }).catch(error => {});
    },
    /**
     * 获取方案信息
     */
    getCheckRoutes() {
      this.$customAxios.get('checkRoute/getCheckRoutes', {}).then(resq => {
        this.checkRoutesList = resq
        this.wrapLoading = false
      }).catch(error => {});
    },
    /**
     * 人员列表
     */
    getUserList() {
      this.$customAxios.get('users/selectByMap', {
        params: {}
      }).then(resq => {
        this.userList = resq.data;

      }).catch(error => {
        loading.close()
      });
    },
    getRouteById(crKid) { // 获取设备信息
      let that = this
      that.$customAxios.get('checkRoute/getOneCheckRouteById', {
        params: {
          crkid: crKid
        }
      }).then(resq => {
        that.deviceList = resq.checkRoutesList
      }).catch(error => {});
    },
    selectPerson(selects) { //选择巡检人
      const obj = this.userList.find(item => item.userId === selects)
      this.userName = obj.name
      this.temp.userId = obj.userId

    },
    selectRoutes(crKid) { //选择方案
      this.temp.crKid = crKid
      this.getRouteById(crKid)
    },
    changeTime(times) {
      let that = this
      if (!times) {
        that.temp.ckDate = ''
        return
      }
      if (times.length == 0) return
      let timeArr = []
      for (let i = 0; i < times.length; i++) {
        timeArr.push(that.$moment(times[i]).format('YYYY-MM-DD'))
      }
      that.ckDate = times
      that.temp.ckDate = timeArr.join()

    },
    /**
     * [handleAdd 添加修改计划]
     * @param  {[type]} hashPublish [0:不发布;1发布]
     * @param  {[type]} type        [0:新增;1更新]
     * @return {[type]}             [description]
     */
    handleAdd(hashPublish, type) {
      let that = this
      let params = that.temp
      let url = (type == 0) ? 'checkPlan/addCheckPlan' : 'checkPlan/updateCheckPlan'
      params.hashPublish = hashPublish
      if (type == 1) {
        params.kid = that.kid
      }

      that.$refs.messagePlanForm.validate((valid) => {
        if (valid) {
          that.wrapLoading = true
          that.$customAxios.post(url, params).then(resq => {
            that.wrapLoading = false
            that.$ele.Notification({
              title: "成功",
              message: `操作成功！`,
              type: 'success'
            })
            that.$router.push({
              name: 'MessageInspection',
              params: {
                crKid: that.temp.crKid
              }
            });
          }).catch(error => {
            that.wrapLoading = false
          });
        }
      });

    },
    handleBack() { //返回
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="scss"scoped>
.header-wrap {
    height: auto !important;
    padding: 10px 10px 30px;
    .header-title {
        padding-bottom: 20px;
    }
    .wrap-first {
        padding-bottom: 10px;
    }
    .item {
        height: 60px;
        .item-left {
            width: 600px;
            padding-right: 10px;
        }
        .item-change {
            width: 200px;
        }
        .item-timer {
            min-width: 300px;
        }
    }
    .el-form-item__error {
        display: inline-block;
    }

}
.data-wrap {
    position: relative;
    .data-top {
        line-height: 55px;
        height: 55px;
        padding-left: 10px;
        position: relative;
        .btn-right {
            position: absolute;
            top: 10px;
            &.add {
                right: 120px;

            }
            &.delect {
                right: 10px;

            }
        }
    }
    .data-footer {
        text-align: right;
        position: absolute;
        bottom: 0;
        .btn-wrap {
            text-align: left;
        }
    }
}
</style>
