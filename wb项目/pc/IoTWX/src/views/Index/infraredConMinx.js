/**
 * 红外控制逻辑
 */
// 功能 - 控制空调
import ControlAir from "@/components/WebSocket/controlAir";
export default {
  data() {
    return {};
  },
  methods: {
    // Selected控制
    infrSelectChange(items) {
      let params = {
        mqttId: this.deviceItem.mqttId,
        DevID: this.deviceItem.devId,
        value: items.valueObj.controlNumber
      };
      items.controlList.forEach(item => {
        if (item.controlNumber == items.valueObj.controlNumber) {
          params.colName = item.controlCol;
        }
      });
      this.loading = true;
      ControlAir.hindleControl(params);
    },
    // 基础控制
    infrBaseChange(item) {
      let params = {
        mqttId: this.deviceItem.mqttId,
        DevID: this.deviceItem.devId,
        colName: item.controlCol,
        value: item.controlNumber
      };

      this.loading = true;
      ControlAir.hindleControl(params);
    },
    // 开启自控
    infrConstrolChange() {
      let item = this.deviceItem;

      let params = {
        mqttId: item.mqttId,
        DevID: item.devId,
        colName: "col1",
        value: !!item.constrolState ? 0 : 65280
      };

      this.loading = true;
      ControlAir.hindleControl(params);
    },
    // 状态控制
    infrTimeStateChange(type) {
      let item = this.deviceItem;

      let params = {
        mqttId: item.mqttId,
        DevID: item.devId,
        colName:
          type == 0
            ? "col20"
            : type == 1
              ? "col23"
              : type == 2
                ? "col16"
                : type == 3
                  ? "col17"
                  : "",
        value:
          type == 0
            ? item.TimeStartState
            : type == 1
              ? item.TimeEndState
              : type == 2
                ? item.rankTopState
                : type == 3
                  ? item.rankLowState
                  : ""
      };

      this.loading = true;
      ControlAir.hindleControl(params);
    },
    // 时间和范围控制
    infrTimeAndTempChange(type) {
      let item = this.deviceItem;

      let params = {
        mqttId: item.mqttId,
        DevID: item.devId,
        colName:
          type == 0
            ? "col18"
            : type == 1
              ? "col19"
              : type == 2
                ? "col21"
                : type == 3
                  ? "col22"
                  : "",
        value:
          type == 0
            ? item.TimeStartHour
            : type == 1
              ? item.TimeStarMin
              : type == 2
                ? item.TimeEndHour
                : type == 3
                  ? item.TimeEndMin
                  : ""
      };

      this.loading = true;
      ControlAir.hindleControl(params);
    },
    // 温度范围控制
    infrTempRankChange(e) {
      let item = this.deviceItem;
      let value = e.currentTarget.value;
      let type = e.currentTarget.dataset.type; //0:上限;1:下限

      let rank = type == 0 ? [1, 50] : [0, 49];
      if (Number(value) < rank[0] || Number(value) > rank[1]) {
        e.currentTarget.value = type == 0 ? item.rankTop : item.rankLow;
        this.$ele.Notification.warning({
          title: "错误",
          message: `取值范围为${rank[0]}℃-${rank[1]}℃,请输入有效的值!`
        });

        return;
      }
      let params = {
        mqttId: item.mqttId,
        DevID: item.devId,
        colName: type == 0 ? "col14" : "col15",
        value: value
      };

      this.loading = true;
      ControlAir.hindleControl(params);
    }
  }
};
