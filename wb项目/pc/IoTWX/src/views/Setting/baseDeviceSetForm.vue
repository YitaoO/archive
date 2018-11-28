<template>
<div class="area">
  <p>设备信息</p>
  <el-row>
    <el-col :span="18">
      <el-form ref="baseDeviceSetForm" :model="temp" :rules="rules?rules1:rules2" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="devType">
              <el-select v-model="temp.devType" class="elselection" @change="selectTypeDevice" :disabled="isReadonly">
                <el-option v-for="item in typeDeviceList" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格型号" prop="devModel">
              <el-select v-model="temp.devModel" class="elselection" :disabled="isReadonly">
                <el-option v-for="item in typeModelList" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备ID" prop="devId">
              <el-input v-model="temp.devId" readonly/></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备名称" prop="devName">
              <el-input v-model="temp.devName" :readonly="isReadonly"/></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备代码" prop="devCode">
              <el-input v-model="temp.devCode" :readonly="isReadonly"/></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属区域" prop="areaID">
              <el-select v-model="temp.areaID" class="elselection" @change="changeArea" filterable clearable :disabled="isReadonly">
                <el-option v-for="item in areaList" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                  <span :style="'display: block;color:#333333;padding-bottom:3px;margin-left:'+(item.type-1)*20+'px;'">{{ item.areaName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="mqtt服务器" prop="mqttId">
              <el-select v-model="temp.mqttId" @change="selectMqtt" class="elselection" :disabled="isReadonly">
                <el-option v-for="item in mqttserverList" :key="item.mqttId" :label="item.mqttAddress" :value="item.mqttId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="轮询频率" prop="rotationTime">
              <el-input-number v-model="temp.rotationTime" :min="0" :max="999" :disabled="isReadonly"></el-input-number> 秒/次
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="showGateway" class="personalized">
          <el-col :span="12">
            <el-form-item label="网关属性" prop="parent">
              <el-select v-model="temp.parent" class="elselection" clearable :disabled="isReadonly">
                <el-option v-for="item in gatewayList" :key="item.devId" :label="item.devName" :value="item.devId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通讯地址" prop="addr">
              <el-input v-model="temp.addr" :readonly="isReadonly"/>
              <!-- <el-input-number v-model="temp.addr" :min="1" :max="255" :disabled="isReadonly"></el-input-number> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!showGateway" class="personalized">
          <el-col :span="12">
            <el-form-item label="网关发布" prop="gateWayPush">
              <el-input v-model="temp.gateWayPush" :readonly="isReadonly"/></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网关订阅" prop="gatewaySub">
              <el-input v-model="temp.gatewaySub" :readonly="isReadonly"/></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生产厂家" prop="manufacturer">
              <el-input v-model="temp.manufacturer" :readonly="isReadonly"/></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维保年限" prop="maintainPeriod">
              <el-input-number v-model="temp.maintainPeriod" :min="0" :max="999" :disabled="isReadonly"></el-input-number> 年
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生产日期" prop="madeDate">
              <el-date-picker v-model="temp.madeDate" type="date" :disabled="isReadonly"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="厂商联系人" prop="mlinkman">
              <el-input v-model="temp.mlinkman" :readonly="isReadonly"/></el-form-item>
          </el-col>
        </el-row>
        <el-row class="row1">
          <el-col :span="12">
            <el-form-item label="折旧年限" prop="depreciationPeriod">
              <el-input-number v-model="temp.depreciationPeriod" :min="0" :max="999" :disabled="isReadonly"></el-input-number> 年
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="厂商联系电话" prop="mlinkTel">
              <el-input v-model="temp.mlinkTel" :readonly="isReadonly"/></el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
    <el-col :span="6" style="height:467px;position:relative;margin:0 auto;">
      <div ref="qrcodeQs" v-if="!isAdd" style="width:150px; height:150px;margin:auto;position:absolute;top:0;bottom:0;left:0;right:0;">
        <div style="margin-bottom:10px;">
          <span>二维码</span>
          <el-button type="text" style="border:0;padding:0;margin:0;height:17px;float:right;" @click="uploadQr">下载</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-button type="primary" @click="onSubmit" v-if="!isReadonly">保存</el-button>
    <el-button style="border: 1px solid #17b990;color:#17b990;" @click="callOf">取消</el-button>
  </el-row>
</div>
</template>

<script>
import QRCode from '@/components/Tools/qrcode'
import baseDeviceSetmixins from '@/views/Setting/baseDeviceSetmixins'
export default {
  name: "baseDeviceSetForm",
  mixins: [baseDeviceSetmixins],
  data() {
    let validateAddr = (rule, value, callback) => {
      var isReg = /^[1-9]$|^[1-9]\d$|^1\d{2}$|^2[0-1]\d$|^2[2][0-5]$/.test(value);
      if(isReg){
        if(!this.$utils.isNull(this.temp.parent)){
          this.$customAxios.get(`device/hasAddrInGateWay?addr=${value}&parent=${this.temp.parent}&devID=${this.temp.devId}`)
          .then(resq => {
            if(!resq) callback(new Error('该通讯地址重复！'))
            else callback()
          }).catch(() => {})
        }
      }else{
        callback(new Error('请输入正确的通讯地址格式：1-225！'))
      }
    }
    let validateParent = (rule, value, callback) => {
      if(!this.$utils.isNull(this.temp.addr)){
        this.$customAxios.get(`device/hasAddrInGateWay?addr=${this.temp.addr}&parent=${value}&devID=${this.temp.devId}`)
        .then(resq => {
          if(!resq) callback(new Error('该网关属性重复！'))
          else callback()
        }).catch(() => {})
      }
    }

    return {
      temp: {},
      isAdd: true,
      rules1: {
        devName: [{ required: true, message: '请输入设备名称', trigger: 'change' },
          { max: 50, message: '长度至多不超过 50 个字符', trigger: 'change' }],
        devType: [{ type: 'number', required: true, message: '请选择设备类型', trigger: 'change' }],
        devModel: [{ type: 'number', required: true, message: '请选择规格型号', trigger: 'change' }],
        areaID: [{ required: true, message: '请选择所属区域', trigger: 'change' }],
        gateWayPush: [{ required: true, message: '请输入网关发布', trigger: 'change' },
          { max: 100, message: '长度至多不超过 100 个字符', trigger: 'change' }],
        gatewaySub: [{ required: true, message: '请输入网关订阅', trigger: 'change' },
          { max: 100, message: '长度至多不超过 100 个字符', trigger: 'change' }],
        mqttId: [{ required: true, message: '请选择mqtt服务器', trigger: 'change' }]
      },
      rules2: {
        devName: [{ required: true, message: '请输入设备名称', trigger: 'change' },
          { max: 50, message: '长度至多不超过 50 个字符', trigger: 'change' }],
        devType: [{ type: 'number', required: true, message: '请选择设备类型', trigger: 'change' }],
        devModel: [{ type: 'number', required: true, message: '请选择规格型号', trigger: 'change' }],
        areaID: [{ required: true, message: '请选择所属区域', trigger: 'change' }],
        addr: [{ required: true, message: '请输入通讯地址', trigger: 'change' },
          { validator: validateAddr, trigger: 'change' }],
        parent: [{ required: true, message: '请选择网关属性', trigger: 'change' },
          { validator: validateParent, trigger: 'change' }],
        mqttId: [{ required: true, message: '请选择mqtt服务器', trigger: 'change' }]
      },
      rules: true,
      typeModelList: [],
      showGateway: false,
      isReadonly: false,
      defaultDevtype: 0
    }
  },
  created() {
    var loading = this.$utils.loading(document.getElementsByClassName('area')[0]);
    this.isAdd = this.$route.query.isAdd;
    var devId = this.$route.query.devId;
    this.isReadonly = this.$route.query.isReadonly;

    if (!this.isAdd) {
      this.$customAxios.get('device/getPcOneDevice', {
        params: {
          iDevId: devId
        }
      }).then(resq => {
        this.temp = resq;
        this.getAreaList();
        this.getAllTypeModelList();
        this.getTypeDeviceList();
        this.getMqttserver();
        this.createQrcode();
        this.getDevGatewayList(resq.mqttId)
        loading.close()
      }).catch(error => {
        loading.close()
      });
    } else {
      this.$customAxios.get('device/getNextKey').then(resq => {
        this.temp = {
          devId: resq, // 设备ID
          devType: null, // 设备类型
          devName: '', // 设备名称
          devModel: null, // 规格型号
          devCode: '', // 设备代码
          areaID: '', // 所属区域
          parent: '', // 网关属性
          addr: '', // 通讯地址
          gateWayPush: '', // 网关发布
          gatewaySub: '', // 网关订阅
          status: 3, // 状态
          manufacturer: '', // 生产厂家
          maintainPeriod: null, // 维保年限
          madeDate: null, // 生产日期
          mlinkman: '', // 厂商联系人
          depreciationPeriod: null, // 折旧年限
          mlinkTel: '', // 厂商联系电话
          rotationTime: 0,
          compId: this.$cookies.getJSON('userInfo').compId, // 公司
          addUserId: this.$cookies.getJSON('userInfo').UserID, // 用户
          addUserName: this.$cookies.getJSON('userInfo').name // 用户名
        }
        this.getAreaList();
        this.getAllTypeModelList();
        this.getTypeDeviceList();
        this.getMqttserver();
        loading.close()
      }).catch(error => {
        loading.close()
      });
    }
  },
  methods: {
    AllTypeModelListFunc() {
      if (!this.$utils.isNull(this.temp.devType)) {
        this.getTypeModelList(this.temp.devType); // 检索规格型号
      }
    },
    TypeDeviceListFunc() {
      if (!this.$utils.isNull(this.temp.devType)) {
        // 判断设备类型，从而个性化页面
        const obj = this.typeDeviceList.find(item => item.typeId === this.temp.devType)
        if (obj) {
          if(obj.visible === 0) {
            this.showGateway = false;
            this.rules = true
          }else {
            this.showGateway = true;
            this.rules = false
          }
          this.defaultDevtype = obj.visible
        }
      }
    },
    uploadQr() {
      const aLink = document.createElement('a');
      aLink.href = this.$refs.qrcodeQs.querySelectorAll('img')[0].src
      aLink.download = '二维码'; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      let event;
      if (window.MouseEvent) event = new MouseEvent('click');
      else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      }
      aLink.dispatchEvent(event);
    },
    createQrcode() {
      this.$nextTick(() => {
        this.qrcode = new QRCode(this.$refs.qrcodeQs, {
          width: 150, //设置宽高
          height: 150
        });
        this.qrcode.clear(); // 清除二维码
        this.qrcode.makeCode(`devId=${this.temp.devId}`); // 设置二维码内容
      })
    },
    changeArea(value) {
      const obj = this.areaList.find(item => item.areaId === value)
      if (obj) {
        if (obj.isLastChild === 0) {
          // 提示
          this.$notify.error({
            title: "提示",
            message: `请选择末级区域`
          });
          this.temp.areaID = '';
        }
      }
    },
    getTypeModelList(devType) {
      this.typeModelList = [];
      if (!this.$utils.isNull(devType)) {
        for (var i = 0; i < this.allTypeModelList.length; i++) {
          if (this.allTypeModelList[i].tdId === devType) {
            this.typeModelList.push(this.allTypeModelList[i]);
          }
        }
      }
    },
    selectMqtt(select){
      this.temp.parent = '';
      this.temp.addr = '';
      this.getDevGatewayList(select)
      // 1.切换 mqtt 时，自动清除网关属性两个值；不清除网关发布两个值
      // 保存时，把 mqttid 传到后台
      // 选择网关属性两个值时要提示先选择 mqtt、网关发布的不需要
    },
    selectTypeDevice(select) {
      // 规格型号
      this.temp.devModel = null;
      const obj = this.typeDeviceList.find(item => item.typeId === select)
      this.temp.devTypeName = ''
      if (obj) {
        this.temp.devTypeName = obj.typeName;
        if (obj.visible === 0) { // 网关
          this.$refs.baseDeviceSetForm.clearValidate()
          this.rules = true;
          this.temp.parent = '';
          this.temp.addr = '';
          if(this.$utils.isNull(this.defaultDevtype) || this.defaultDevtype !== obj.visible){
            this.temp.gateWayPush = '';
            this.temp.gatewaySub = '';
          }
          this.showGateway = false;
        } else { // 设备
          this.$refs.baseDeviceSetForm.clearValidate()
          this.rules = false;
          if(this.$utils.isNull(this.defaultDevtype) || this.defaultDevtype !== obj.visible){
            this.temp.parent = '';
            this.temp.addr = '';
          }
          this.temp.gateWayPush = '';
          this.temp.gatewaySub = '';
          this.showGateway = true;
        }
        this.defaultDevtype = obj.visible
      }
      this.getTypeModelList(select);
    },
    onSubmit() {
      this.$refs.baseDeviceSetForm.validate((valid) => {
        if (valid) {
          var loading = this.$utils.loading(document.getElementsByClassName('area')[0]);
          var temp2 = Object.assign({}, this.temp)
          if (!this.$utils.isNull(temp2.madeDate)) {
            temp2.madeDate = this.$moment(temp2.madeDate).format('YYYY-MM-DD') + ' 00:00:00';
          }
          if(this.$utils.isNull(temp2.parent)){
            temp2.parent = '0';
          }
          let url = 'device/add';
          if (!this.isAdd) url = 'device/update';
          this.$customAxios.post(url, temp2).then(resq => {
            this.callOf();
            this.$bus.$emit('saveDevice');
            loading.close()
          }).catch(error => {
            loading.close()
          });
        }
      });
    },
    callOf() {
      this.$router.go(-1)
      // this.$router.push({
      //   name: 'BaseDeviceSet'
      // });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
