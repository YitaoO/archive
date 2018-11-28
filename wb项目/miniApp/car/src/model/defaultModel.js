/**
 * 初始化状态
 */
let DefaultModel = {
  treeList: {
    carListTree: [], //车辆
    projectList: [], // 项目
    isMultiSelect: true, //是否多选(调试完改为true)
    choiceCarItem: null, //选中的单个车辆信息
    choiceProjectItem: null, //选中单个项目信息
    choiceFatherId: [], //选中父集合
    choiceChildId: [] //选中集合
  },
  projectType: {
    projectTypeList: [],
    choiceProjectType: null,
    typeArr: []
  },
  statistics: {
    echartLists: [
      {
        name: "使用率统计图",
        index: 0,
        isUp: true,
        height: "300px"
      },
      {
        name: "洒水量统计",
        index: 1,
        isUp: true,
        height: "300px"
      },
      {
        name: "耗油量/行驶里程统计图",
        index: 2,
        isUp: true,
        height: "300px"
      },
      {
        name: "油费",
        index: 5,
        isUp: true,
        height: "300px"
      },
      {
        name: "百公里耗油量统计",
        index: 3,
        isUp: true,
        height: "300px"
      },
      {
        name: "告警统计",
        index: 4,
        isUp: true,
        height: "300px"
      }
    ],
    UseEffic: [], //使用率
    FuelPerOneHunKm: [], //蚝油
    WarningReports: [] //告警
  }
};
export default DefaultModel;
