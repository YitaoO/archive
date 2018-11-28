export default {
  data () {
    return {
      typeDeviceList: [], // 设备类型
      stateList: [], // 设备状态
      areaList: [], // 所属区域
      allTypeModelList: [], // 规格型号
      gatewayList: [], // 网关属性
      roleList: [], // 角色
      levelList: [], // 告警等级
      mqttserverList: [] // mqtt设备接口
    }
  },
  methods: {
    getMqttserver (type) {
      this.$customAxios.get('mqttServer/getAll').then(resq => {
        this.mqttserverList = resq
      }).catch(() => {})
    },
    getRoleList (type) {
      this.$customAxios.get('role/selectRoleTree', {
        params: {
          compId: this.$cookies.getJSON('userInfo').compId,
          type: this.$utils.isNull(type) ? null : type
        }
      }).then(resq => {
        this.roleList = []
        for (var i = 0; i < resq.length; i++) {
          resq[i].depth = 1
          this.roleList.push(resq[i])
          this.createGroupList(resq[i].listRole, 2)
        }
      }).catch(() => {})
    },
    createGroupList (arr, dep) {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          arr[i].depth = dep
          this.roleList.push(arr[i])
          this.createGroupList(arr[i].listRole, dep + 1)
        }
      }
    },
    getLevelList () {
      this.$customAxios.get('typeWarnLevel/getAll').then(res => {
        this.levelList = res
      }).catch(() => {})
    },
    getAllTypeModelList () {
      this.$customAxios.get('typeModel/getAll').then(res => {
        this.allTypeModelList = res
        if (typeof this.AllTypeModelListFunc !== 'undefined') this.AllTypeModelListFunc()
      }).catch(() => {})
    },
    getTypeDeviceList () {
      this.$customAxios.get('typeDevice/getAll').then(res => {
        this.typeDeviceList = res
        if (typeof this.TypeDeviceListFunc !== 'undefined') this.TypeDeviceListFunc()
      }).catch(() => {})
    },
    getDevGatewayList (mqttId) {
      this.$customAxios.get('devGateway/selectByMap', {
        params: {
          userId: this.$cookies.getJSON('userInfo').UserID,
          mqttId: mqttId
        }
      }).then(resq => {
        this.gatewayList = resq.data
      }).catch(() => {})
    },
    getTypeDeviceStatus () {
      this.$customAxios.get('typeDeviceStatus/getAll').then(res => {
        this.stateList = res
      }).catch(() => {})
    },
    getAreaList () {
      this.$customAxios.get('area/selectAreaTree', {
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
            isLastChild: resq[i].areaList.length === 0 ? 1 : 0
          })
          this.createTree(resq[i].areaList, num + 1)
        }
      }).catch(() => {})
    },
    // 用于构造出上级区域的组件的tab效果
    createTree (second, num2) {
      if (second.length > 0) {
        for (var i = 0; i < second.length; i++) {
          this.areaList.push({
            areaId: second[i].areaId,
            areaName: second[i].areaName,
            type: num2,
            isLastChild: second[i].areaList.length === 0 ? 1 : 0
          })
          this.createTree(second[i].areaList, num2 + 1)
        }
      }
    }
  }
}
