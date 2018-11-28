<!-- 路由-新增报错巡检  -->
<template>
<el-container v-loading="wrapLoading" id="editInsp-wrap" class="center-wrap   over-height  font-size-14">
  <el-header class="header-wrap border margin-bottom primary-color-bg-white padding">
    <p class="primary-color-02">方案信息</p>
    <div class="input-wrap">
      <span class="input-title">方案名称</span>
      <el-input class="input" v-model="name" placeholder="请输入方案名称..."></el-input>
    </div>

  </el-header>
  <el-main class="data-wrap border primary-color-bg-white padding-reset over-height">
    <div class="data-top boder-bottom ">
      <span class="primary-color-02">设备明细</span>
      <el-button icon="el-icon-setting" size="small" class="btn-right add" @click="toMessageInsEdit()">添加设备</el-button>
      <el-button icon="el-icon-setting" class="btn-right delect" size="small" @click="handleDelectDevice()">删除设备</el-button>
    </div>
    <el-table :data="checkRoutesList" style="width: 100%;" height="calc(100% - 110px)" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="devName" label="设备名称" min-width="100">
      </el-table-column>
      <el-table-column prop="areaName" label="所在位置" min-width="110">
      </el-table-column>
      <el-table-column prop="time" label="巡检时间" width="400">
        <template slot-scope="scope">
          <el-time-picker class="timer-wrap left" v-model="scope.row.time"  value-format="HH:mm" format="HH:mm" placeholder="选择时间" >
          </el-time-picker>
        <!-- <el-input class="input" placeholder="请选择巡检时间..."></el-input> -->
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDelectDevices(scope.$index, scope.row.devId)" type="danger" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-footer class="data-footer grid-list">
      <div class="btn-wrap grid-list-item">
        <el-button type="success" plain v-if="status ==0" @click="handleAdd(0)">新增</el-button>
        <el-button type="primary" plain v-if="status ==1" @click="handleAdd(1)">保存</el-button>

        <el-button plain v-if="status !=0" @click="handleBack()">取消</el-button>

      </div>
      <Pagination class="grid-list-item" :child-option="pageOption" v-if="status !=0"></Pagination>
    </el-footer>
  </el-main>
  <DialogTransfer :dialog.sync="dialogshow"></DialogTransfer>

</el-container>
</template>

<script>
// 组件 - 分页
import Pagination from '@/components/Pagination/pagination'
// 组件 - 穿梭框
import DialogTransfer from './transfer'
export default {
  name: "MessageInsEdit",
  components: {
    Pagination,
    DialogTransfer
  },
  data() {
    return {
      value1: '',
      name: '',
      checkRoutesList: [], //设备列表
      pickerDara: '',
      status: 0, //0:新增；1：修改
      pageOption: {
        page: 1,
        limit: 10,
        total: 0
      },
      wrapLoading: false,
      dialogshow: {
        show: false
      },
      delectDeviceList: [] //需要删除的设备
    }
  },
  created() {
    let that = this

    that.status = that.$route.params.status
    that.crKid = that.$route.params.crKid
    if (that.status == 1) {
      that.getRouteById()
    }

    that.$bus.$off('getDeviceList')
    // 监听设备选项
    that.$bus.$on('getDeviceList', (deviceList) => {
      deviceList.forEach(function(item) {
        item.areaId = item.areaID
        that.checkRoutesList.push(item)
      })
      that.checkRoutesList = that.$utils.arrDistinct(that.checkRoutesList, 'devId');

    })
  },
  methods: {
    /**
     * 保存模块
     */
    getRouteById() { // 获取设备信息
      let that = this
      that.$customAxios.get('checkRoute/getOneCheckRouteById', {
        params: {
          crkid: that.crKid
        }
      }).then(resq => {
        that.pageOption.total = resq.total
        that.name = resq.name
        this.crKid = resq.crKid
        that.checkRoutesList = resq.checkRoutesList
      }).catch(error => {});
    },
    /**
     * 添加模块
     */
    toMessageInsEdit() { // 添加设备信息
      let that = this
      that.dialogshow.show = true
    },
    handleDelectDevices(index, devId) { // 单独删除设备

      this.checkRoutesList.splice(index, 1)
    },
    handleSelectionChange(e) {
      this.delectDeviceList = e

    },
    handleDelectDevice() { // 批量删除
      let that = this
      if (that.delectDeviceList.length == 0) {
        that.$ele.Notification({
          title: "警告",
          message: `请选中要删除的设备`,
          type: 'warning'
        })
        return
      }
      that.delectDeviceList.forEach(function(item) {
        that.removeObjWithArr(that.checkRoutesList, item)
      })

    },
    removeObjWithArr(_arr, _obj) {
      var length = _arr.length;
      for (var i = 0; i < length; i++) {
        if (_arr[i] == _obj) {
          if (i == 0) {
            _arr.shift(); //删除并返回数组的第一个元素
            return;
          } else if (i == length - 1) {
            _arr.pop(); //删除并返回数组的最后一个元素
            return;
          } else {
            _arr.splice(i, 1); //删除下标为i的元素
            return;
          }
        }
      }
    },
    handleBack() { //返回
      this.$router.go(-1)
    },
    handleAdd(type) { // 添加更新巡检方案
      let that = this

      if (!!that.$utils.isNull(that.name)) {
        that.$ele.Notification({
          title: "警告",
          message: `请输入巡检方案名称！`,
          type: 'warning'
        })
        return
      }

      for (let i = 0; i < that.checkRoutesList.length; i++) {
        if (!!that.$utils.isNull(that.checkRoutesList[i].time)) {
          that.$ele.Notification({
            title: "警告",
            message: `请输入各个设备巡检时间！`,
            type: 'warning'
          })
          return

        }
      }
      let deviceList = []
      that.checkRoutesList.forEach(function(item) {
        deviceList.push({
          areaId: item.areaId,
          devId: item.devId,
          time: item.time
        })
      })
      if (deviceList.length == 0) {
        that.$ele.Notification({
          title: "警告",
          message: `请添加巡检设备！`,
          type: 'warning'
        })
        return
      }
      let url = (type == 0) ? 'checkRoute/adddCheckRoute' : 'checkRoute/updateCheckRoute'
      let params = {
        name: that.name,
        checkRoutesList: deviceList,
        compId: that.$cookies.getJSON('userInfo').compId
      }
      if (type == 1) {
        params.crKid = this.crKid
      }
      console.log(params);

      that.wrapLoading = true
      that.$customAxios.post(url, params).then(resq => {
        that.wrapLoading = false
        that.$ele.Notification({
          title: "成功",
          message: `发布成功！`,
          type: 'success'
        })
        that.$router.go(-1)
      }).catch(error => {});

    }
  }
}
</script>

<style lang="scss"scoped>
.header-wrap {
    height: auto !important;

    .input-wrap {
        padding-top: 20px;
        padding-bottom: 30px;
        .input-title {
            padding-right: 10px;
        }
        .input {
            width: 200px;
        }
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
        width: 100%;
        position: absolute;
        bottom: 0;
        .btn-wrap {
            text-align: left;
        }
    }
}
</style>
