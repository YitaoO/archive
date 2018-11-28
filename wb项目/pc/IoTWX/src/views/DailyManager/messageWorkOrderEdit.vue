<!-- 路由-新增工单 -->
<template>
<el-form v-loading="wrapLoading" :disabled="type ==3" class="primary-color-bg-white font-size-14 primary-color-02" ref="messageWokOrderForm" :model="temp" :rules="rules" label-width="100px" style="height:auto;">
  <el-row class="wordO-wrap over-height border ">
    <el-col :span="(type ==2 || temp.status ==2)?17:24" class="wordO-add over-height" :style="(type ==2 || temp.status ==2)?'border-right:1px solid #dcdfe1;':''">
      <p class="title boder-bottom padding">工单信息</p>
      <div class="item-wrap">
        <div class="workO-item">
          <el-form-item class="item-left" label="标题" prop="title">
            <el-input class="input" v-model="temp.title" :disabled="type ==2"></el-input>
          </el-form-item>
          <el-form-item class="" prop="userId" label="工单类型">
            <el-radio :disabled="type ==2" v-model="temp.woId" :label="item.typeId" v-for="(item,index) in typeWorkOrder" :key="item.typeId">{{item.typeName}}</el-radio>
          </el-form-item>
        </div>
        <div class="workO-item">
          <div class="grid-list">
            <div class="grid-list-item" style="width:300px;">
              <el-form-item label="所属区域">
                <el-select :disabled="type ==2" v-model="areaName" class="elselection input" filterable clearable @change="selectArea">
                  <el-option v-for="item in areaList" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                    <span :style="'display: block;color:#333333;padding-bottom:3px;margin-left:'+(item.type-1)*20+'px;'">{{ item.areaName }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="grid-list-item" style="width:300px;">
              <el-form-item label="设备名称" prop="devId">
                <el-select :disabled="type ==2" v-model="temp.devId" class="elselection input" filterable clearable @change="handleDevice(temp.devId)">
                  <el-option v-for="item in deviceList" :key="item.devId" :label="item.devName" :value="item.devId">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="grid-list-item" style="width:300px;" v-if="type !=2">
              <el-form-item label="所在位置" class="">
                <el-input :disabled="type ==2" v-model="locationName" readonly/></el-form-item>
            </div>
            <div class="grid-list-item"></div>
          </div>
          <div class="grid-list">
            <div class="grid-list-item" style="width:300px;">
              <el-form-item label="设备状态">
                <el-radio-group :disabled="type ==2" v-model="status1On">
                  <el-radio :label="0">不调整</el-radio>
                  <el-radio :label="1">调整</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="grid-list-item" style="width:300px;">
              <el-form-item prop="devStatus1">
                <el-select :disabled="type ==2" v-model="temp.devStatus1" class="elselection input" filterable clearable v-if="status1On ==1">
                  <el-option v-for="item in devStatusAll" :key="item.devStatus" :label="item.name" :value="item.devStatus">
                    {{item.name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="grid-list-item"></div>
          </div>

        </div>
        <div class="workO-item">
          <el-form-item label="指派给">
            <el-select :disabled="type ==2" v-model="temp.userId" class="elselection input" filterable clearable @change="handleChangeStatus">
              <el-option v-for="item in userList" :key="item.userId" :label="item.name" :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" class="item-desp" prop="description">
            <el-input :disabled="type ==2" type="textarea" v-model="temp.description" style="width:400px;" rows="5" placeholder="请输入描述内容..."></el-input>
          </el-form-item>
        </div>
        <div class="workO-item" :class="(type ==0 || type ==1)?'':'over-picture'">
          <el-form-item :label="(type ==0 || type ==1)?'上传图片':''" class="item-upload">
            <el-upload :action="uploadImageUrl" ref="plushUpload" :data="{recordId:kid}" :file-list="imageList" :on-preview="handlePictureCardPreview" list-type="picture-card">
              <i class="el-icon-plus" v-if="(type ==0 || type ==1)"></i>
              <div slot="tip" class="el-upload__tip" v-if="(type ==0 || type ==1)">图片大小不超过5M</div>
            </el-upload>
          </el-form-item>

        </div>
        <div class="item save-wrap" v-if="type ==0 || type ==1">
          <el-button type="primary" plain @click="handleAdd(0)">保存</el-button>

          <el-button plain @click="handleBack()">取消</el-button>
        </div>

      </div>
    </el-col>
    <el-col :span="7" v-if="(type == 2 || temp.status ==2)" class="wordO-save over-height font-size-14">
      <p class="title boder-bottom padding">处理情况</p>
      <div class="item-wrap">
        <div class="workO-item">
          <el-form-item class="item-left" label="更新设备状态">
            <el-select v-model="temp.devStatus2" class="elselection input" filterable clearable style="width:150px;">
              <el-option v-for="item in devStatusAll" :key="item.devStatus" :label="item.name" :value="item.devStatus">
                {{item.name}}
              </el-option>
            </el-select>
            <!-- <el-radio v-model="temp.devStatus2" :label="item.devStatus" v-for="(item,index) in devStatusAll" :key="item.devStatus" @change="handleOverStatus">{{item.name}}</el-radio> -->
            <p><i class="el-icon-warning" style="color:#d2d3d3;"></i>更改设备状态，在提交后会使设备发生对应改变。</p>
          </el-form-item>
          <el-form-item label="描述" class="item-desp" prop="dueResult">
            <el-input type="textarea" v-model="temp.dueResult" rows="5" placeholder="请输入结案内容..."></el-input>
          </el-form-item>
        </div>
        <el-form-item label="上传图片" class="item-upload" style="padding-top:10px;" v-if="temp.status ==1">
          <el-upload :action="uploadImageUrl" :data="{recordId:kid}" list-type="picture-card">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">图片大小不超过5M</div>
          </el-upload>
        </el-form-item>
        <div class="save-wrap" v-if="temp.status ==1">
          <el-button type="primary" plain @click="handleAdd(1)">保存</el-button>

          <el-button plain @click="handleBack()">取消</el-button>
        </div>
      </div>
    </el-col>

    <el-dialog :visible.sync="openPhoneShow">
      <img width="100%" :src="openPhoneUrl" alt="">
    </el-dialog>
  </el-row>

</el-form>
</template>

<script>
export default {
  name: "MessageWorkOrderEdit",
  components: {

  },
  data() {
    var validateStatus = (rule, value, callback) => {
      if (this.status1On == 0) {
        this.temp.devStatus1 = 0
        callback();
      } else {
        if (value == undefined || value == '') {
          callback(new Error('请选择设备状态'));
        }
        callback();
      }
    };
    return {
      value: '',
      kid: '',
      name: '',
      areaName: '',
      status1On: 0,
      status1Name: '',
      locationName: '',
      devStatusAll: [{
        name: '启用',
        devStatus: 3
      }, {
        name: '停用',
        devStatus: 4
      }, {
        name: '维修',
        devStatus: 5
      }, {
        name: '报废',
        devStatus: 6
      }],
      imageList: [],
      workOrderItem: [],
      areaList: [],
      deviceList: [],
      userList: [],
      typeWorkOrder: [],
      wrapLoading: true,
      rules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'change'
        }],
        devId: [{
          required: true,
          message: '请选择设备',
          trigger: 'change'
        }],
        devStatus1: [{
          validator: validateStatus,
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入描述信息',
          trigger: 'change'
        }]
      },
      temp: {}, //提交参数
      dialogshow: {
        show: false
      },
      uploadImageUrl: '',
      baseUrl: '',
      openPhoneShow: false,
      openPhoneUrl: '',
      kid: '',
    }
  },
  created() {
    let that = this
    // type说明(0:新增;1:编辑；2:结案；3:查看)
    that.type = that.$route.params.type
    if (that.type == 0) { //发布
      that.isNew = true
      that.kid = that.$utils.getNum()
      that.temp = {
        compId: that.$cookies.getJSON('userInfo').compId,
        addUserName: that.$cookies.getJSON('userInfo').name,
        addUserId: that.$cookies.getJSON('userInfo').UserID,
        kid: that.kid,
        status: 0,
      }
      that.getAreaList()
    } else { //修改或者结案
      that.kid = that.$route.params.kid
      that.getWorkOrderByKid()
    }
    that.optionUrl()


    that.getTypeWorkOrder()
    that.getUsersByMap()
  },
  methods: {
    // 配置URL
    optionUrl() {
      let that = this

      if (process.env.NODE_ENV !== 'development') { // 这里开发环境因为要跨域，所以开发环境不用这个配置,后期看下可以优化吗
        let url = window.location.href
        let index = (url.indexOf('login') > 0) ? url.indexOf('login') : url.indexOf('index')
        that.baseUrl = `${url.slice(0, index)}equipment/`
        that.uploadImageUrl = `${that.baseUrl}wpFileImage/upload`
      } else {
        that.uploadImageUrl = 'wpFileImage/upload'
        that.baseUrl = 'http://192.168.1.15:9023//portal-equipment/equipment/'
      }
    },
    /**
     * 获取区域列表
     */
    getAreaList() {
      this.$customAxios.get('area/getAreaTree', {
        params: {
          userId: this.$cookies.getJSON('userInfo').UserID
        }
      }).then(resq => {

        var num = 1
        for (var i = 0; i < resq.length; i++) {
          this.areaList.push({
            areaId: resq[i].areaId,
            areaName: resq[i].areaName,
            type: num,
            isLastChild: resq[i].listAreaUser.length === 0 ? 1 : 0
          })
          this.createTree(resq[i].listAreaUser, num + 1)
        }
        this.getDeviceByareaID(this.areaList[0].areaId)
      }).catch(error => {});
    },
    // 用于构造出上级区域的组件的tab效果
    createTree(second, num2) {
      if (second.length > 0) {
        for (var i = 0; i < second.length; i++) {
          this.areaList.push({
            areaId: second[i].areaId,
            areaName: second[i].areaName,
            type: num2,
            isLastChild: second[i].listAreaUser.length === 0 ? 1 : 0
          })
          this.createTree(second[i].listAreaUser, num2 + 1)
        }
      }
    },
    /**
     * 获取工单类型
     */
    getTypeWorkOrder() {
      this.$customAxios.get('typeWorkOrder/getAll', {
        params: {
          userId: this.$cookies.getJSON('userInfo').UserID
        }
      }).then(resq => {
        this.typeWorkOrder = resq
        this.temp.woId = this.typeWorkOrder[0].typeId
      }).catch(error => {});
    },
    /**
     * 获取当前区域下的设备列表
     */
    getDeviceByareaID(areaId) {
      this.$customAxios.get('device/getDeviceByareaID', {
        params: {
          areaID: areaId
        }
      }).then(resq => {
        this.deviceList = resq
        if (!!this.temp.devId && this.temp.devId != '') {
          this.handleDevice(this.temp.devId)
        }
        this.wrapLoading = false
      }).catch(error => {});
    },
    /**
     * 获取工单信息
     */
    getWorkOrderByKid() {
      let that = this
      that.$customAxios.get('workOrder/getByKid', {
        params: {
          kid: that.kid
        }
      }).then(resq => {

        that.temp = {
          kid: resq.kid,
          title: resq.title,
          devId: resq.devId,
          userId: resq.userId,
          status: resq.status,
          woId: resq.woId,
          devStatus1: resq.devStatus1,

          dueResult: resq.dueResult,
          description: resq.description
        }
        that.areaName = resq.areaName

        resq.imageList.forEach(function(item) {
          that.imageList.push({
            url: `${that.baseUrl}wpFileImage/f?p=${item.svrPathMIamge}`
          })
        })
        if (that.temp.devStatus1 != 0) {
          that.status1On = 1
        } else {
          that.temp.devStatus1 = ''
        }
        that.wrapLoading = false


        that.getAreaList()

      }).catch(error => {});
    },
    selectArea(areaId) {
      this.temp.devId = ''
      this.locationName = ''
      this.getDeviceByareaID(areaId)
    },
    /**
     * 获取指派人列表
     */
    getUsersByMap() {
      this.$customAxios.get('users/selectByMap', {
        params: {
          kid: this.kid
        }
      }).then(resq => {
        this.userList = resq.data

      }).catch(error => {});
    },

    handleDevice(devId) { //所在位置的改变
      let that = this
      if (!!that.$utils.isNull(devId)) {
        this.locationName = ''
        return
      }
      if (that.deviceList.length == 0) return
      that.deviceList.forEach(function(item) {
        if (!!that.$utils.isNull(item.location)) return
        that.locationName = item.location
      })
    },
    handleChangeStatus(userId) { //指派人修改
      let that = this
      if (userId == undefined || userId == '') {
        that.temp.status = 0
      } else {
        that.temp.userId = userId
        that.userList.forEach(function(item) {
          if (userId == item.userId) {
            that.temp.userName = item.name
          }
        })
        that.temp.status = 1
      }

    },
    handleOverStatus(e) { //结案状态修改
      this.temp.devStatus2 = e
    },
    handlePictureCardPreview(file) {
      this.openPhoneUrl = file.url;
      this.openPhoneShow = true;
    },

    /**
     * [handleAdd 添加修改计划]
     * @param  {[type]} hashPublish [0:不发布;1发布]
     * @param  {[type]} type        [0:保存;1结案]
     * @return {[type]}             [description]
     */
    handleAdd(types) {
      let that = this
      let url = (!!that.isNew) ? 'workOrder/add' : 'workOrder/update'
      let params = that.temp
      if (types == 1) { //结案
        if (params.dueResult == '') {
          that.$ele.Notification({
            title: "警告",
            message: `请输入结案说明！`,
            type: 'warning'
          })
        }
        params.status = 2
        params.endDate = that.$utils.formate(new Date())

      } else {
        if (!that.$utils.isNull(params.userId)) {
          params.status = 1
        }
      }

      this.$refs.messageWokOrderForm.validate((valid) => {
        if (valid) {
          that.wrapLoading = true
          this.$customAxios.post(url, params).then(resq => {
            that.wrapLoading = false
            that.$ele.Notification({
              title: "成功",
              message: `发布成功！`,
              type: 'success'
            })
            that.$router.go(-1)
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
.wordO-wrap {
    .item-wrap {

        padding: 0 10px;

        .workO-item {
            padding-top: 25px;
            border-bottom: 1px dashed #dcdfe1;

            .input {
                width: 200px;
            }
            .item-line {
                padding-bottom: 10px;
                .line-item {
                    width: 150px;
                }
            }
        }
        .item-desp {
            textarea {}
        }
    }
    .save-wrap {
        padding: 20px;
    }

}
</style>
