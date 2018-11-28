<template>
<div class="area">
  <p>区域信息</p>
  <el-row>
    <el-form ref="baseAreaSetForm" :model="temp" :rules="rules" label-width="150px">
      <el-row :gutter="20" class="row1">
        <el-col :span="8">
          <el-form-item label="区域名称" prop="areaName">
            <el-input v-model="temp.areaName" :readonly="isReadonly" /></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上级区域" prop="parent">
            <el-select v-model="temp.parent" class="elselection" filterable clearable @change="selectArea" :disabled="isReadonly">
              <el-option v-for="item in areaList" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                <span :style="'display: block;color:#333333;padding-bottom:3px;margin-left:'+(item.type-1)*20+'px;'">{{ item.areaName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row2">
        <el-col :span="16">
          <el-form-item label="区域管理人员" prop="types">
            <el-select v-model="temp.types" class="elselection" @change="selectPerson" multiple :disabled="isReadonly">
              <el-option v-for="item in personList" :key="item.userId" :label="item.name" :value="item.userId" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="所在区域" prop="location">
            <el-input v-model="temp.location" readonly/></el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
  <el-row style="height: 400px;border:1px solid #dcdfe1;width:80%;">
    <BaiduMap :mapSearch="true"></BaiduMap>
  </el-row>
  <el-row>
    <el-button type="primary" @click="onSubmit" v-if="!isReadonly">保存</el-button>
    <el-button style="border: 1px solid #17b990;color:#17b990;" @click="callOf">取消</el-button>
  </el-row>
</div>
</template>

<script>
// 组件 - 百度地图
import BaiduMap from '../../components/BaiduMap/baiduMap'
import baseDeviceSetmixins from '@/views/Setting/baseDeviceSetmixins'
export default {
  mixins: [baseDeviceSetmixins],
  name: "IndexDailyManager",
  components: {
    BaiduMap
  },
  data() {
    return {
      temp: {},
      isAdd: true,
      isReadonly: false,
      rules: {
        areaName: [{
            required: true,
            message: '请输入区域名称',
            trigger: 'change'
          },
          {
            min: 3,
            max: 50,
            message: '长度在 3 到 50 个字符',
            trigger: 'change'
          }
        ],
        // types: [{
        //   type: 'array',
        //   required: true,
        //   message: '请选择区域管理人员',
        //   trigger: 'change'
        // }],
        location: [{
          required: true,
          message: '请输入所在区域',
          trigger: 'change'
        }]
      },
      personList: [],
      areaList: []
    }
  },
  destroyed() {
    this.$bus.$off('getMap')
  },
  created() {
    this.isAdd = this.$route.query.isAdd;
    var areaId = this.$route.query.areaId;
    this.isReadonly = this.$route.query.isReadonly;
    if (!this.isReadonly) {
      //监听marker点击
      this.$bus.$on('getMap', (searchInput, latLog) => {
        this.temp.location = searchInput;
        this.temp.longitude = latLog.lng;
        this.temp.latitude = latLog.lat;
      });
    }

    var loading = this.$utils.loading(document.getElementsByClassName('area')[0]);
    // 上级区域list
    this.getAreaList();
    // 人员list
    this.$customAxios.get('users/selectByMap', {
      params: {}
    }).then(resq => {
      this.personList = resq.data;
      if (!this.isAdd) {
        this.$customAxios.get('area/getById', {
          params: {
            kid: areaId
          }
        }).then(resq => {
          // 把userIds转换成types数组
          if (!this.$utils.isNull(resq.userIds)) {
            resq.types = resq.userIds.split(',');
            for (var i = 0; i < resq.types.length; i++) {
              resq.types[i] = parseInt(resq.types[i]); // 把string转换成int，不然组件翻译不了
            }
          } else resq.types = [];
          // 转换parent.  =root时转成''
          resq.parent = resq.parent === 'root' ? '' : resq.parent;
          this.temp = resq;
          this.$bus.$emit('mapMarkers', [{
            longitude: resq.longitude,
            latitude: resq.latitude,
            name: resq.location
          }]);
          this.$bus.$emit('setCenter', [{
            longitude: resq.longitude,
            latitude: resq.latitude,
            name: resq.location
          }]);
          loading.close()
        }).catch(error => {
          loading.close()
        });
      } else {
        this.temp = {
          areaId: this.$utils.getNum(),
          parent: '',
          areaName: '',
          compId: this.$cookies.getJSON('userInfo').compId,
          location: '',
          longitude: '',
          latitude: '',
          types: [], // 用来存储区域管理人员组件的数组
          userIds: '',
          userNames: '',
          addUserId: this.$cookies.getJSON('userInfo').UserID,
          addUserName: this.$cookies.getJSON('userInfo').name
        }
        loading.close()
      }
    }).catch(error => {
      loading.close()
    });
  },
  methods: {
    selectArea(value) {
      if (this.temp.areaId === value) {
        this.$notify.warning({
          title: "提示",
          message: `不允许设置自己的区域为自己的上级`
        });
        this.temp.parent = ''
      }
    },
    selectPerson(selects) {
      if (selects.length > 0) {
        let name = '',
          id = '';
        for (var i = 0; i < selects.length; i++) {
          const obj = this.personList.find(item => item.userId === selects[i])
          name += obj.name + ','
        }
        for (var i = 0; i < selects.length; i++) {
          id += selects[i] + ','
        }
        this.temp.userNames = name.substring(0, name.length - 1)
        this.temp.userIds = id.substring(0, id.length - 1)
      } else {
        this.temp.userIds = ''
        this.temp.userNames = ''
      }
    },
    onSubmit() {
      this.$refs.baseAreaSetForm.validate((valid) => {
        if (valid) {
          var loading = this.$utils.loading(document.getElementsByClassName('area')[0]);
          var temp2 = Object.assign({}, this.temp)
          temp2.parent = this.$utils.isNull(this.temp.parent) ? 'root' : this.temp.parent;
          let url = 'area/add';
          if (!this.isAdd) url = 'area/update';
          this.$customAxios.post(url, temp2).then(resq => {
            this.callOf();
            this.$bus.$emit('saveArea');
            loading.close()
          }).catch(error => {
            loading.close()
          });
        }
      });
    },
    callOf() {
      this.$router.push({
        name: 'BaseAreaSet'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.area {
    // height: 100%;
    box-sizing: border-box;
}
</style>
